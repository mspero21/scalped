'use client';

import { useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Profile } from '@/types/database';

export function useUserSearch() {
  const [results, setResults] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchUsers = useCallback(async (query: string) => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const supabase = createClient();

      // Search by username or display name
      const { data, error: searchError } = await supabase
        .from('profiles')
        .select('id, user_id, username, display_name, avatar_url, bio')
        .or(`username.ilike.%${query}%,display_name.ilike.%${query}%`)
        .limit(20);

      if (searchError) throw searchError;

      setResults((data || []) as unknown as Profile[]);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to search users';
      setError(message);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearResults = useCallback(() => {
    setResults([]);
    setError(null);
  }, []);

  return {
    results,
    loading,
    error,
    searchUsers,
    clearResults,
  };
}
