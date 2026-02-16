'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Profile } from '@/types/database';
import toast from 'react-hot-toast';

export interface FollowWithProfile {
  id: string;
  follower_id: string;
  following_id: string;
  created_at: string;
  profile: Profile;
}

export function useFollows(userId: string | undefined) {
  const [followers, setFollowers] = useState<FollowWithProfile[]>([]);
  const [following, setFollowing] = useState<FollowWithProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFollows = useCallback(async () => {
    if (!userId) {
      setLoading(false);
      return;
    }
    
    const supabase = createClient();
    setLoading(true);
    
    try {
      // Fetch followers (people who follow this user)
      const { data: followersData, error: followersError } = await supabase
        .from('follows')
        .select(`
          *,
          profile:profiles!follows_follower_id_fkey(*)
        `)
        .eq('following_id', userId);

      if (followersError) throw followersError;

      // Fetch following (people this user follows)
      const { data: followingData, error: followingError } = await supabase
        .from('follows')
        .select(`
          *,
          profile:profiles!follows_following_id_fkey(*)
        `)
        .eq('follower_id', userId);

      if (followingError) throw followingError;

      setFollowers((followersData || []) as unknown as FollowWithProfile[]);
      setFollowing((followingData || []) as unknown as FollowWithProfile[]);
    } catch (err) {
      console.error('Error fetching follows:', err);
      setError(err instanceof Error ? err.message : 'Failed to load');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchFollows();
  }, [fetchFollows]);

  const followUser = async (targetUserId: string) => {
    if (!userId) {
      toast.error('Not authenticated');
      return { error: 'Not authenticated' };
    }
    if (userId === targetUserId) {
      toast.error('Cannot follow yourself');
      return { error: 'Cannot follow yourself' };
    }

    const supabase = createClient();
    const { error: insertError } = await supabase
      .from('follows')
      .insert({
        follower_id: userId,
        following_id: targetUserId
      } as never);

    if (insertError) {
      if (insertError.code === '23505') {
        toast.error('Already following');
        return { error: 'Already following' };
      }
      toast.error(insertError.message);
      return { error: insertError.message };
    }

    await fetchFollows();
    toast.success('Following user!');
    return { success: true };
  };

  const unfollowUser = async (targetUserId: string) => {
    if (!userId) {
      toast.error('Not authenticated');
      return { error: 'Not authenticated' };
    }

    const supabase = createClient();
    const { error: deleteError } = await supabase
      .from('follows')
      .delete()
      .eq('follower_id', userId)
      .eq('following_id', targetUserId);

    if (deleteError) {
      toast.error(deleteError.message);
      return { error: deleteError.message };
    }

    setFollowing(prev => prev.filter(f => f.following_id !== targetUserId));
    toast.success('Unfollowed user');
    return { success: true };
  };

  const isFollowing = (targetUserId: string): boolean => {
    return following.some(f => f.following_id === targetUserId);
  };

  return { 
    followers, 
    following, 
    followersCount: followers.length,
    followingCount: following.length,
    loading, 
    error, 
    followUser, 
    unfollowUser, 
    isFollowing,
    refetch: fetchFollows 
  };
}

