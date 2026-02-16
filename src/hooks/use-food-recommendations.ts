'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';

interface FoodRecommendationRow {
  id: string;
  user_id: string;
  stadium_id: string;
  content: string;
  item_name: string | null;
  category: string;
  upvotes: number;
  created_at: string;
  updated_at: string;
}

interface ProfileRow {
  user_id: string;
  username: string;
  display_name: string | null;
  avatar_url: string | null;
}

interface UpvoteRow {
  content_id: string;
}

export interface FoodRecommendation {
  id: string;
  user_id: string;
  stadium_id: string;
  content: string;
  item_name: string | null;
  category: string;
  upvotes: number;
  created_at: string;
  updated_at: string;
  profile?: {
    username: string;
    display_name: string | null;
    avatar_url: string | null;
  };
  user_upvoted?: boolean;
}

export function useFoodRecommendations(stadiumId: string | undefined, userId?: string) {
  const [recommendations, setRecommendations] = useState<FoodRecommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRecommendations = useCallback(async () => {
    if (!stadiumId) {
      setLoading(false);
      return;
    }

    const supabase = createClient();
    setLoading(true);

    try {
      // Fetch recommendations
      const { data, error: fetchError } = await supabase
        .from('food_recommendations')
        .select('*')
        .eq('stadium_id', stadiumId)
        .order('upvotes', { ascending: false });

      if (fetchError) throw fetchError;

      const recommendations = (data || []) as unknown as FoodRecommendationRow[];

      if (recommendations.length === 0) {
        setRecommendations([]);
        return;
      }

      // Fetch profiles for all user_ids
      const userIds = [...new Set(recommendations.map(r => r.user_id))];
      const { data: profilesData } = await supabase
        .from('profiles')
        .select('user_id, username, display_name, avatar_url')
        .in('user_id', userIds);

      const profiles = (profilesData || []) as unknown as ProfileRow[];
      const profileMap = new Map(profiles.map(p => [p.user_id, p]));

      // Check if user has upvoted each recommendation
      let upvotedIds = new Set<string>();
      if (userId) {
        const { data: upvotesData } = await supabase
          .from('content_upvotes')
          .select('content_id')
          .eq('user_id', userId)
          .eq('content_type', 'food')
          .in('content_id', recommendations.map(r => r.id));

        const upvotes = (upvotesData || []) as unknown as UpvoteRow[];
        upvotedIds = new Set(upvotes.map(u => u.content_id));
      }

      const recommendationsWithProfiles: FoodRecommendation[] = recommendations.map(r => ({
        ...r,
        profile: profileMap.get(r.user_id),
        user_upvoted: upvotedIds.has(r.id)
      }));

      setRecommendations(recommendationsWithProfiles);
    } catch (err: unknown) {
      // Handle table not existing gracefully
      const errorObj = err as { code?: string; message?: string };
      if (errorObj?.code === '42P01' || errorObj?.message?.includes('does not exist')) {
        // Table doesn't exist yet - fail silently
        setRecommendations([]);
      } else {
        console.error('Error fetching food recommendations:', errorObj?.message || err);
        setError(errorObj?.message || 'Failed to load');
      }
    } finally {
      setLoading(false);
    }
  }, [stadiumId, userId]);

  useEffect(() => {
    fetchRecommendations();
  }, [fetchRecommendations]);

  const addRecommendation = async (content: string, itemName?: string, category?: string) => {
    if (!userId || !stadiumId) return { error: 'Not authenticated' };

    const supabase = createClient();
    const { data, error: insertError } = await supabase
      .from('food_recommendations')
      .insert({
        user_id: userId,
        stadium_id: stadiumId,
        content,
        item_name: itemName || null,
        category: category || 'general'
      } as never)
      .select()
      .single();

    if (insertError) {
      const errorMsg = insertError.message || 'Failed to add recommendation';
      if (insertError.code !== '42P01') {
        console.error('Error adding food recommendation:', errorMsg);
      }
      return { error: errorMsg };
    }

    await fetchRecommendations();
    return { data };
  };

  const deleteRecommendation = async (id: string) => {
    if (!userId) return { error: 'Not authenticated' };

    const supabase = createClient();
    const { error: deleteError } = await supabase
      .from('food_recommendations')
      .delete()
      .eq('id', id)
      .eq('user_id', userId);

    if (deleteError) {
      return { error: deleteError.message };
    }

    setRecommendations(prev => prev.filter(r => r.id !== id));
    return { success: true };
  };

  const toggleUpvote = async (id: string) => {
    if (!userId) return { error: 'Not authenticated' };

    const supabase = createClient();
    const rec = recommendations.find(r => r.id === id);
    if (!rec) return { error: 'Not found' };

    if (rec.user_upvoted) {
      // Remove upvote
      await supabase.from('content_upvotes').delete()
        .eq('user_id', userId).eq('content_type', 'food').eq('content_id', id);
      await supabase.from('food_recommendations').update({ upvotes: rec.upvotes - 1 } as never).eq('id', id);
    } else {
      // Add upvote
      await supabase.from('content_upvotes').insert({ user_id: userId, content_type: 'food', content_id: id } as never);
      await supabase.from('food_recommendations').update({ upvotes: rec.upvotes + 1 } as never).eq('id', id);
    }

    await fetchRecommendations();
    return { success: true };
  };

  return { recommendations, loading, error, addRecommendation, deleteRecommendation, toggleUpvote, refetch: fetchRecommendations };
}
