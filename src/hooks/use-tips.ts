'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { createLogger } from '@/lib/logger';

const logger = createLogger('Tips');

interface TipRow {
  id: string;
  user_id: string;
  stadium_id: string;
  content: string;
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

export interface Tip {
  id: string;
  user_id: string;
  stadium_id: string;
  content: string;
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

export function useTips(stadiumId: string | undefined, userId?: string) {
  const [tips, setTips] = useState<Tip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTips = useCallback(async () => {
    if (!stadiumId) {
      setLoading(false);
      return;
    }

    const supabase = createClient();
    setLoading(true);

    try {
      // Fetch tips
      const { data, error: fetchError } = await supabase
        .from('tips')
        .select('*')
        .eq('stadium_id', stadiumId)
        .order('upvotes', { ascending: false });

      if (fetchError) throw fetchError;

      const tipsData = (data || []) as unknown as TipRow[];

      if (tipsData.length === 0) {
        setTips([]);
        return;
      }

      // Fetch profiles for all user_ids
      const userIds = [...new Set(tipsData.map(t => t.user_id))];
      const { data: profilesData } = await supabase
        .from('profiles')
        .select('user_id, username, display_name, avatar_url')
        .in('user_id', userIds);

      const profiles = (profilesData || []) as unknown as ProfileRow[];
      const profileMap = new Map(profiles.map(p => [p.user_id, p]));

      // Check if user has upvoted each tip
      let upvotedIds = new Set<string>();
      if (userId) {
        const { data: upvotesData } = await supabase
          .from('content_upvotes')
          .select('content_id')
          .eq('user_id', userId)
          .eq('content_type', 'tip')
          .in('content_id', tipsData.map(t => t.id));

        const upvotes = (upvotesData || []) as unknown as UpvoteRow[];
        upvotedIds = new Set(upvotes.map(u => u.content_id));
      }

      const tipsWithProfiles: Tip[] = tipsData.map(t => ({
        ...t,
        profile: profileMap.get(t.user_id),
        user_upvoted: upvotedIds.has(t.id)
      }));

      setTips(tipsWithProfiles);
    } catch (err: unknown) {
      // Handle table not existing gracefully
      const errorObj = err as { code?: string; message?: string };
      if (errorObj?.code === '42P01' || errorObj?.message?.includes('does not exist')) {
        // Table doesn't exist yet - fail silently
        setTips([]);
      } else {
        logger.error('Error fetching tips', err);
        setError(errorObj?.message || 'Failed to load');
      }
    } finally {
      setLoading(false);
    }
  }, [stadiumId, userId]);

  useEffect(() => {
    fetchTips();
  }, [fetchTips]);

  const addTip = async (content: string, category?: string) => {
    if (!userId || !stadiumId) return { error: 'Not authenticated' };

    const supabase = createClient();
    const { data, error: insertError } = await supabase
      .from('tips')
      .insert({
        user_id: userId,
        stadium_id: stadiumId,
        content,
        category: category || 'general'
      } as never)
      .select()
      .single();

    if (insertError) {
      const errorMsg = insertError.message || 'Failed to add tip';
      if (insertError.code !== '42P01') {
        logger.error('Error adding tip', insertError);
      }
      return { error: errorMsg };
    }

    await fetchTips();
    return { data };
  };

  const deleteTip = async (id: string) => {
    if (!userId) return { error: 'Not authenticated' };

    const supabase = createClient();
    const { error: deleteError } = await supabase
      .from('tips')
      .delete()
      .eq('id', id)
      .eq('user_id', userId);

    if (deleteError) {
      return { error: deleteError.message };
    }

    setTips(prev => prev.filter(t => t.id !== id));
    return { success: true };
  };

  const toggleUpvote = async (id: string) => {
    if (!userId) return { error: 'Not authenticated' };

    const supabase = createClient();
    const tip = tips.find(t => t.id === id);
    if (!tip) return { error: 'Not found' };

    if (tip.user_upvoted) {
      await supabase.from('content_upvotes').delete()
        .eq('user_id', userId).eq('content_type', 'tip').eq('content_id', id);
      await supabase.from('tips').update({ upvotes: tip.upvotes - 1 } as never).eq('id', id);
    } else {
      await supabase.from('content_upvotes').insert({ user_id: userId, content_type: 'tip', content_id: id } as never);
      await supabase.from('tips').update({ upvotes: tip.upvotes + 1 } as never).eq('id', id);
    }

    await fetchTips();
    return { success: true };
  };

  return { tips, loading, error, addTip, deleteTip, toggleUpvote, refetch: fetchTips };
}
