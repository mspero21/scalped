'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';

export type ActivityType = 'visit' | 'ranking' | 'review' | 'bucket_list';

export interface ActivityItem {
  id: string;
  type: ActivityType;
  user_id: string;
  stadium_id: string;
  created_at: string;
  data: Record<string, unknown>;
  profile?: {
    id: string;
    username: string;
    display_name: string | null;
    avatar_url: string | null;
  };
  stadium?: {
    id: string;
    name: string;
    city: string;
    state: string;
    sport: string;
    image_url: string | null;
    teams?: Array<{ name: string; primary_color: string | null }>;
  };
}

export function useActivityFeed(userId: string | undefined) {
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFeed = useCallback(async () => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const supabase = createClient();
    setLoading(true);

    try {
      // Get who this user follows
      const { data: follows, error: followsError } = await supabase
        .from('follows')
        .select('following_id')
        .eq('follower_id', userId)
        .returns<{ following_id: string }[]>();

      if (followsError) throw followsError;

      const followingIds = follows?.map(f => f.following_id) || [];

      // Include the user's own activity in the feed
      const allUserIds = [...followingIds, userId];

      // Fetch rankings data
      interface RatingRow {
        id: string;
        user_id: string;
        stadium_id: string;
        initial_tier: 'LOVED' | 'LIKED' | 'OKAY' | 'DISLIKED';
        elo_rating: number;
        created_at: string;
        updated_at: string;
      }
      const { data: ratingsData, error: rankingsError } = await supabase
        .from('stadium_ratings')
        .select('id, user_id, stadium_id, initial_tier, elo_rating, created_at, updated_at')
        .in('user_id', allUserIds)
        .order('updated_at', { ascending: false })
        .limit(20)
        .returns<RatingRow[]>();

      if (rankingsError) {
        console.error('Rankings query error:', rankingsError);
        throw rankingsError;
      }

      // Get unique user IDs and stadium IDs from the ratings
      const userIds = [...new Set(ratingsData?.map(r => r.user_id) || [])];
      const stadiumIds = [...new Set(ratingsData?.map(r => r.stadium_id) || [])];

      // Fetch profiles for these users
      interface ProfileRow {
        id: string;
        user_id: string;
        username: string;
        display_name: string | null;
        avatar_url: string | null;
      }
      const { data: profilesData } = await supabase
        .from('profiles')
        .select('id, user_id, username, display_name, avatar_url')
        .in('user_id', userIds)
        .returns<ProfileRow[]>();

      // Fetch stadiums
      interface StadiumRow {
        id: string;
        name: string;
        city: string;
        state: string;
        sport: string;
        image_url: string | null;
      }
      const { data: stadiumsData } = await supabase
        .from('stadiums')
        .select('id, name, city, state, sport, image_url')
        .in('id', stadiumIds)
        .returns<StadiumRow[]>();

      // Combine the data
      const rankings = ratingsData?.map(r => ({
        ...r,
        profiles: profilesData?.find(p => p.user_id === r.user_id),
        stadiums: stadiumsData?.find(s => s.id === r.stadium_id)
      })) || [];

      // Skip visits and reviews for now
      const visits: any[] = [];
      const reviews: any[] = [];

      // Combine and sort all activities
      const allActivities: ActivityItem[] = [
        ...(visits || []).map(v => ({
          id: `visit-${v.id}`,
          type: 'visit' as ActivityType,
          user_id: v.user_id,
          stadium_id: v.stadium_id,
          created_at: v.created_at,
          data: { visited_at: v.visited_at, event_name: v.event_name },
          profile: v.profile,
          stadium: v.stadium
        })),
        ...(rankings || []).map(r => ({
          id: `ranking-${r.id}`,
          type: 'ranking' as ActivityType,
          user_id: r.user_id,
          stadium_id: r.stadium_id,
          created_at: r.updated_at || r.created_at,
          data: { tier: r.initial_tier, elo_score: r.elo_rating },
          profile: Array.isArray(r.profiles) ? r.profiles[0] : r.profiles,
          stadium: Array.isArray(r.stadiums) ? r.stadiums[0] : r.stadiums
        })),
        ...(reviews || []).map(r => ({
          id: `review-${r.id}`,
          type: 'review' as ActivityType,
          user_id: r.user_id,
          stadium_id: r.stadium_id,
          created_at: r.created_at,
          data: { content: r.content, rating: r.overall_rating },
          profile: r.profile,
          stadium: r.stadium
        }))
      ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
       .slice(0, 50);

      setActivities(allActivities);
    } catch (err) {
      // Supabase errors are objects, not Error instances
      let errorMessage = 'Failed to load feed';

      if (err && typeof err === 'object') {
        if ('message' in err) {
          errorMessage = String(err.message);
        } else if ('error' in err) {
          errorMessage = String(err.error);
        }
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }

      console.error('Error fetching activity feed:', errorMessage, 'Full error:', JSON.stringify(err, null, 2));
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchFeed();
  }, [fetchFeed]);

  return { activities, loading, error, refetch: fetchFeed };
}

