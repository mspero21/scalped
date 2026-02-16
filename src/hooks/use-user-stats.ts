'use client';

import { useEffect, useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';

interface UserStats {
  stadiumsVisited: number;
  stadiumsRanked: number;
  bucketListCount: number;
}

export function useUserStats(userId?: string) {
  const [stats, setStats] = useState<UserStats>({
    stadiumsVisited: 0,
    stadiumsRanked: 0,
    bucketListCount: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    if (!userId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const supabase = createClient();
      
      // Fetch all counts in parallel
      // Use stadium_ratings for rankings count (the new pairwise system)
      const [visitsResult, rankingsResult, bucketListResult] = await Promise.all([
        supabase
          .from('stadium_ratings')
          .select('id', { count: 'exact', head: true })
          .eq('user_id', userId),
        supabase
          .from('stadium_ratings')
          .select('id', { count: 'exact', head: true })
          .eq('user_id', userId),
        supabase
          .from('bucket_list')
          .select('id', { count: 'exact', head: true })
          .eq('user_id', userId),
      ]);

      // Check for errors
      if (visitsResult.error) throw visitsResult.error;
      if (rankingsResult.error) throw rankingsResult.error;
      if (bucketListResult.error) throw bucketListResult.error;

      setStats({
        stadiumsVisited: visitsResult.count || 0,
        stadiumsRanked: rankingsResult.count || 0,
        bucketListCount: bucketListResult.count || 0,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch stats');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return {
    stats,
    loading,
    error,
    refetch: fetchStats,
  };
}

