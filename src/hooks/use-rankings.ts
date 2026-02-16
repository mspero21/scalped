'use client';

import { useEffect, useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { RankingWithStadium } from '@/types/database';

export function useRankings(userId?: string) {
  const [rankings, setRankings] = useState<RankingWithStadium[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRankings = useCallback(async () => {
    if (!userId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const supabase = createClient();
      
      const { data, error } = await supabase
        .from('rankings')
        .select(`
          *,
          stadium:stadiums(*)
        `)
        .eq('user_id', userId)
        .order('rank_position');

      if (error) throw error;
      setRankings((data || []) as unknown as RankingWithStadium[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch rankings');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchRankings();
  }, [fetchRankings]);

  async function updateRankings(newRankings: RankingWithStadium[]) {
    if (!userId) return;

    try {
      const supabase = createClient();
      
      // Update each ranking's position
      const updates = newRankings.map((ranking, index) => ({
        id: ranking.id,
        user_id: userId,
        stadium_id: ranking.stadium_id,
        rank_position: index + 1,
        updated_at: new Date().toISOString(),
      }));

      const { error } = await supabase
        .from('rankings')
        .upsert(updates as never);

      if (error) throw error;
      setRankings(newRankings);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update rankings');
      // Refresh to get correct state
      fetchRankings();
    }
  }

  async function addToRankings(stadiumId: string) {
    if (!userId) return;

    try {
      const supabase = createClient();
      
      // Get current max position
      const nextPosition = rankings.length + 1;

      const { data, error } = await supabase
        .from('rankings')
        .insert({
          user_id: userId,
          stadium_id: stadiumId,
          rank_position: nextPosition,
        } as never)
        .select(`
          *,
          stadium:stadiums(*)
        `)
        .single();

      if (error) throw error;
      setRankings([...rankings, data as unknown as RankingWithStadium]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add to rankings');
    }
  }

  async function removeFromRankings(rankingId: string) {
    if (!userId) return;

    try {
      const supabase = createClient();
      
      const { error } = await supabase
        .from('rankings')
        .delete()
        .eq('id', rankingId);

      if (error) throw error;
      
      // Remove and reorder
      const newRankings = rankings
        .filter((r) => r.id !== rankingId)
        .map((r, i) => ({ ...r, rank_position: i + 1 }));
      
      await updateRankings(newRankings);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to remove from rankings');
    }
  }

  return {
    rankings,
    loading,
    error,
    updateRankings,
    addToRankings,
    removeFromRankings,
    refetch: fetchRankings,
  };
}

