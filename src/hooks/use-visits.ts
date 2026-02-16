'use client';

import { useEffect, useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Visit, VisitWithStadium } from '@/types/database';
import toast from 'react-hot-toast';

export function useVisits(userId?: string) {
  const [visits, setVisits] = useState<VisitWithStadium[]>([]);
  const [visitsByStadium, setVisitsByStadium] = useState<Record<string, Visit>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVisits = useCallback(async () => {
    if (!userId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const supabase = createClient();
      
      const { data, error } = await supabase
        .from('visits')
        .select(`
          *,
          stadium:stadiums(*)
        `)
        .eq('user_id', userId)
        .order('visited_at', { ascending: false });

      if (error) throw error;

      const typedData = (data || []) as unknown as VisitWithStadium[];
      setVisits(typedData);

      // Create a lookup map by stadium_id for quick access
      const byStadium: Record<string, Visit> = {};
      typedData.forEach((visit: VisitWithStadium) => {
        // If multiple visits to same stadium, keep the most recent
        if (!byStadium[visit.stadium_id]) {
          byStadium[visit.stadium_id] = visit;
        }
      });
      setVisitsByStadium(byStadium);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch visits');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchVisits();
  }, [fetchVisits]);

  async function addVisit(
    stadiumId: string,
    details?: {
      visited_at?: string;
      section?: string;
      event_type?: string;
      notes?: string;
    }
  ): Promise<{ success: boolean; error?: string }> {
    if (!userId) return { success: false, error: 'Not logged in' };

    try {
      const supabase = createClient();
      
      const { data, error } = await supabase
        .from('visits')
        .insert({
          user_id: userId,
          stadium_id: stadiumId,
          visited_at: details?.visited_at || new Date().toISOString().split('T')[0],
          section: details?.section || null,
          event_type: details?.event_type || null,
          notes: details?.notes || null,
        } as never)
        .select(`
          *,
          stadium:stadiums(*)
        `)
        .single();

      if (error) throw error;

      const typedItem = data as unknown as VisitWithStadium;
      setVisits((prev) => [typedItem, ...prev]);
      setVisitsByStadium((prev) => ({ ...prev, [stadiumId]: typedItem }));

      toast.success('Visit added!');
      return { success: true };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to add visit';
      setError(message);
      toast.error(message);
      return { success: false, error: message };
    }
  }

  async function removeVisit(visitId: string, stadiumId: string): Promise<{ success: boolean; error?: string }> {
    if (!userId) return { success: false, error: 'Not logged in' };

    try {
      const supabase = createClient();
      
      const { error } = await supabase
        .from('visits')
        .delete()
        .eq('id', visitId);

      if (error) throw error;
      
      setVisits((prev) => prev.filter((v) => v.id !== visitId));
      setVisitsByStadium((prev) => {
        const updated = { ...prev };
        delete updated[stadiumId];
        return updated;
      });

      toast.success('Visit removed');
      return { success: true };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to remove visit';
      setError(message);
      toast.error(message);
      return { success: false, error: message };
    }
  }

  function hasVisited(stadiumId: string): boolean {
    return !!visitsByStadium[stadiumId];
  }

  function getVisit(stadiumId: string): Visit | undefined {
    return visitsByStadium[stadiumId];
  }

  return {
    visits,
    visitsByStadium,
    loading,
    error,
    addVisit,
    removeVisit,
    hasVisited,
    getVisit,
    refetch: fetchVisits,
  };
}

