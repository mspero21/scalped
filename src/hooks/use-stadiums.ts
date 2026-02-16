'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Stadium, Sport } from '@/types/database';

export function useStadiums(sport?: Sport | 'ALL' | Sport[]) {
  const [stadiums, setStadiums] = useState<Stadium[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStadiums() {
      try {
        setLoading(true);
        const supabase = createClient();

        let query = supabase.from('stadiums').select('*').order('name');

        // Handle array of sports (for BIG4)
        if (Array.isArray(sport)) {
          query = query.in('sport', sport);
        } else if (sport && sport !== 'ALL') {
          query = query.eq('sport', sport);
        }

        const { data, error } = await query;

        if (error) throw error;
        setStadiums((data as unknown as Stadium[]) || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch stadiums');
        setStadiums([]);
      } finally {
        setLoading(false);
      }
    }

    fetchStadiums();
  }, [Array.isArray(sport) ? sport.join(',') : sport]);

  return { stadiums, loading, error };
}

export function useStadium(id: string) {
  const [stadium, setStadium] = useState<Stadium | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStadium() {
      try {
        setLoading(true);
        const supabase = createClient();

        const { data, error } = await supabase
          .from('stadiums')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setStadium(data as unknown as Stadium);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch stadium');
        setStadium(null);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchStadium();
    }
  }, [id]);

  return { stadium, loading, error };
}

