'use client';

import { useEffect, useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { BucketListItem, Stadium } from '@/types/database';
import toast from 'react-hot-toast';

export interface BucketListItemWithStadium extends BucketListItem {
  stadium: Stadium;
}

export function useBucketList(userId?: string) {
  const [items, setItems] = useState<BucketListItemWithStadium[]>([]);
  const [itemsByStadium, setItemsByStadium] = useState<Record<string, BucketListItem>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    if (!userId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const supabase = createClient();
      
      const { data, error } = await supabase
        .from('bucket_list')
        .select(`
          *,
          stadium:stadiums(*)
        `)
        .eq('user_id', userId)
        .order('priority', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) throw error;

      const typedData = (data || []) as unknown as BucketListItemWithStadium[];
      setItems(typedData);

      // Create a lookup map by stadium_id
      const byStadium: Record<string, BucketListItem> = {};
      typedData.forEach((item: BucketListItemWithStadium) => {
        byStadium[item.stadium_id] = item;
      });
      setItemsByStadium(byStadium);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch bucket list');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  async function addItem(
    stadiumId: string,
    details?: { priority?: number; notes?: string }
  ): Promise<{ success: boolean; error?: string }> {
    if (!userId) return { success: false, error: 'Not logged in' };

    // Optimistic update: create temporary item
    const tempId = `temp-${Date.now()}`;
    const optimisticItem: Partial<BucketListItemWithStadium> = {
      id: tempId,
      user_id: userId,
      stadium_id: stadiumId,
      priority: details?.priority || 0,
      notes: details?.notes || null,
      created_at: new Date().toISOString(),
    };

    // Update UI immediately
    setItems((prev) => [optimisticItem as BucketListItemWithStadium, ...prev]);
    setItemsByStadium((prev) => ({ ...prev, [stadiumId]: optimisticItem as BucketListItem }));

    try {
      const supabase = createClient();

      const { data, error } = await supabase
        .from('bucket_list')
        .insert({
          user_id: userId,
          stadium_id: stadiumId,
          priority: details?.priority || 0,
          notes: details?.notes || null,
        } as never)
        .select(`
          *,
          stadium:stadiums(*)
        `)
        .single();

      if (error) throw error;

      // Replace optimistic item with real data
      const typedItem = data as unknown as BucketListItemWithStadium;
      setItems((prev) => prev.map(item => item.id === tempId ? typedItem : item));
      setItemsByStadium((prev) => ({ ...prev, [stadiumId]: typedItem }));

      toast.success('Added to bucket list!');
      return { success: true };
    } catch (err) {
      // Rollback optimistic update on error
      setItems((prev) => prev.filter(item => item.id !== tempId));
      setItemsByStadium((prev) => {
        const updated = { ...prev };
        delete updated[stadiumId];
        return updated;
      });

      const message = err instanceof Error ? err.message : 'Failed to add to bucket list';
      setError(message);
      toast.error(message);
      return { success: false, error: message };
    }
  }

  async function removeItem(itemId: string, stadiumId: string): Promise<{ success: boolean; error?: string }> {
    if (!userId) return { success: false, error: 'Not logged in' };

    // Store item for rollback
    const removedItem = items.find(item => item.id === itemId);
    const removedLookup = itemsByStadium[stadiumId];

    // Optimistic update: remove immediately
    setItems((prev) => prev.filter((item) => item.id !== itemId));
    setItemsByStadium((prev) => {
      const updated = { ...prev };
      delete updated[stadiumId];
      return updated;
    });

    try {
      const supabase = createClient();

      const { error } = await supabase
        .from('bucket_list')
        .delete()
        .eq('id', itemId);

      if (error) throw error;

      toast.success('Removed from bucket list');
      return { success: true };
    } catch (err) {
      // Rollback optimistic update on error
      if (removedItem) {
        setItems((prev) => [removedItem, ...prev]);
      }
      if (removedLookup) {
        setItemsByStadium((prev) => ({ ...prev, [stadiumId]: removedLookup }));
      }

      const message = err instanceof Error ? err.message : 'Failed to remove from bucket list';
      setError(message);
      toast.error(message);
      return { success: false, error: message };
    }
  }

  async function toggleItem(stadiumId: string): Promise<{ success: boolean; added: boolean; error?: string }> {
    const existing = itemsByStadium[stadiumId];
    if (existing) {
      const result = await removeItem(existing.id, stadiumId);
      return { ...result, added: false };
    } else {
      const result = await addItem(stadiumId);
      return { ...result, added: true };
    }
  }

  function isInBucketList(stadiumId: string): boolean {
    return !!itemsByStadium[stadiumId];
  }

  function getItem(stadiumId: string): BucketListItem | undefined {
    return itemsByStadium[stadiumId];
  }

  return {
    items,
    itemsByStadium,
    loading,
    error,
    addItem,
    removeItem,
    toggleItem,
    isInBucketList,
    getItem,
    refetch: fetchItems,
  };
}

