'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { createLogger } from '@/lib/logger';

const logger = createLogger('StadiumReviews');

interface ReviewRow {
  id: string;
  user_id: string;
  stadium_id: string;
  content: string;
  rating: number | null;
  visit_date: string | null;
  event_attended: string | null;
  would_return: boolean | null;
  created_at: string;
  updated_at: string;
}

interface ProfileRow {
  user_id: string;
  username: string;
  display_name: string | null;
  avatar_url: string | null;
}

export interface StadiumReview {
  id: string;
  user_id: string;
  stadium_id: string;
  content: string;
  rating: number | null;
  visit_date: string | null;
  event_attended: string | null;
  would_return: boolean | null;
  created_at: string;
  updated_at: string;
  profile?: {
    username: string;
    display_name: string | null;
    avatar_url: string | null;
  };
}

export function useStadiumReviews(stadiumId: string | undefined, userId?: string) {
  const [reviews, setReviews] = useState<StadiumReview[]>([]);
  const [userReview, setUserReview] = useState<StadiumReview | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReviews = useCallback(async () => {
    if (!stadiumId) {
      setLoading(false);
      return;
    }

    const supabase = createClient();
    setLoading(true);

    try {
      // Fetch reviews
      const { data, error: fetchError } = await supabase
        .from('stadium_reviews')
        .select('*')
        .eq('stadium_id', stadiumId)
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;

      const reviewsData = (data || []) as unknown as ReviewRow[];

      if (reviewsData.length === 0) {
        setReviews([]);
        setUserReview(null);
        return;
      }

      // Fetch profiles for all user_ids
      const userIds = [...new Set(reviewsData.map(r => r.user_id))];
      const { data: profilesData } = await supabase
        .from('profiles')
        .select('user_id, username, display_name, avatar_url')
        .in('user_id', userIds);

      const profiles = (profilesData || []) as unknown as ProfileRow[];
      const profileMap = new Map(profiles.map(p => [p.user_id, p]));

      const reviewsWithProfiles: StadiumReview[] = reviewsData.map(r => ({
        ...r,
        profile: profileMap.get(r.user_id)
      }));

      setReviews(reviewsWithProfiles);

      // Find user's review if logged in
      if (userId) {
        const myReview = reviewsWithProfiles.find(r => r.user_id === userId) || null;
        setUserReview(myReview);
      }
    } catch (err: unknown) {
      // Handle table not existing gracefully
      const errorObj = err as { code?: string; message?: string };
      if (errorObj?.code === '42P01' || errorObj?.message?.includes('does not exist')) {
        // Table doesn't exist yet - fail silently
        setReviews([]);
        setUserReview(null);
      } else {
        logger.error('Error fetching reviews', err);
        setError(errorObj?.message || 'Failed to load');
      }
    } finally {
      setLoading(false);
    }
  }, [stadiumId, userId]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const addOrUpdateReview = async (
    content: string,
    rating?: number,
    visitDate?: string,
    eventAttended?: string,
    wouldReturn?: boolean
  ) => {
    if (!userId || !stadiumId) return { error: 'Not authenticated' };

    const supabase = createClient();

    const reviewData = {
      user_id: userId,
      stadium_id: stadiumId,
      content,
      rating: rating || null,
      visit_date: visitDate || null,
      event_attended: eventAttended || null,
      would_return: wouldReturn ?? null,
      updated_at: new Date().toISOString()
    };

    const { data, error: upsertError } = await supabase
      .from('stadium_reviews')
      .upsert(reviewData as never, { onConflict: 'user_id,stadium_id' })
      .select()
      .single();

    if (upsertError) {
      const errorMsg = upsertError.message || 'Failed to save review';
      if (upsertError.code !== '42P01') {
        logger.error('Error saving review', upsertError);
      }
      return { error: errorMsg };
    }

    await fetchReviews();
    return { data };
  };

  const deleteReview = async () => {
    if (!userId || !userReview) return { error: 'No review to delete' };

    const supabase = createClient();
    const { error: deleteError } = await supabase
      .from('stadium_reviews')
      .delete()
      .eq('id', userReview.id)
      .eq('user_id', userId);

    if (deleteError) {
      return { error: deleteError.message };
    }

    setUserReview(null);
    setReviews(prev => prev.filter(r => r.id !== userReview.id));
    return { success: true };
  };

  return {
    reviews,
    userReview,
    loading,
    error,
    addOrUpdateReview,
    deleteReview,
    refetch: fetchReviews
  };
}
