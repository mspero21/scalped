/**
 * Generic data fetching hook
 *
 * Consolidates the common pattern of loading/error/data state
 * used across multiple hooks in the application.
 */

'use client';

import { useEffect, useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { dbLogger } from '@/lib/logger';

export interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export interface FetchOptions {
  /**
   * Skip the initial fetch on mount
   * Useful when you want to manually trigger the fetch
   */
  skip?: boolean;
  /**
   * Error message to show if fetch fails
   */
  errorMessage?: string;
  /**
   * Enable debug logging
   */
  debug?: boolean;
}

/**
 * Generic hook for fetching data from Supabase
 *
 * @param fetcher - Async function that fetches the data
 * @param deps - Dependencies array for useEffect (like sport, userId, etc.)
 * @param options - Optional configuration
 *
 * @example
 * ```ts
 * const { data, loading, error, refetch } = useFetch(
 *   async () => {
 *     const supabase = createClient();
 *     const { data } = await supabase.from('stadiums').select('*');
 *     return data;
 *   },
 *   []
 * );
 * ```
 */
export function useFetch<T>(
  fetcher: () => Promise<T | null>,
  deps: React.DependencyList,
  options: FetchOptions = {}
): FetchState<T> {
  const { skip = false, errorMessage = 'Failed to fetch data', debug = false } = options;

  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(!skip);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      if (debug) {
        dbLogger.debug('useFetch: Starting fetch');
      }

      const result = await fetcher();
      setData(result);

      if (debug) {
        dbLogger.debug('useFetch: Fetch successful', { hasData: !!result });
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : errorMessage;
      setError(errorMsg);
      setData(null);

      dbLogger.error('useFetch: Fetch failed', err, { errorMessage: errorMsg });
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    if (!skip) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skip, ...deps]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
}

/**
 * Specialized hook for fetching a list of items
 * Returns an empty array instead of null when no data
 */
export function useFetchList<T>(
  fetcher: () => Promise<T[] | null>,
  deps: React.DependencyList,
  options: FetchOptions = {}
): Omit<FetchState<T[]>, 'data'> & { data: T[] } {
  const state = useFetch(fetcher, deps, options);

  return {
    data: state.data || [],
    loading: state.loading,
    error: state.error,
    refetch: state.refetch,
  };
}

/**
 * Hook for fetching data with a Supabase query builder
 * Provides a more declarative API for common Supabase patterns
 *
 * @example
 * ```ts
 * const { data, loading } = useSupabaseFetch({
 *   table: 'stadiums',
 *   select: '*',
 *   filters: [{ column: 'sport', value: 'NFL' }],
 *   orderBy: { column: 'name', ascending: true }
 * }, [sport]);
 * ```
 */
export interface SupabaseFetchConfig {
  table: string;
  select?: string;
  filters?: Array<{ column: string; value: unknown; operator?: 'eq' | 'neq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' }>;
  orderBy?: { column: string; ascending?: boolean };
  limit?: number;
  single?: boolean;
}

export function useSupabaseFetch<T>(
  config: SupabaseFetchConfig,
  deps: React.DependencyList,
  options: FetchOptions = {}
): FetchState<T> {
  return useFetch<T>(
    async () => {
      const supabase = createClient();
      let query = supabase.from(config.table).select(config.select || '*');

      // Apply filters
      if (config.filters) {
        config.filters.forEach((filter) => {
          const operator = filter.operator || 'eq';
          query = (query as any)[operator](filter.column, filter.value);
        });
      }

      // Apply ordering
      if (config.orderBy) {
        query = query.order(config.orderBy.column, {
          ascending: config.orderBy.ascending ?? true,
        });
      }

      // Apply limit
      if (config.limit) {
        query = query.limit(config.limit);
      }

      // Execute query
      if (config.single) {
        const { data, error } = await query.single();
        if (error) throw error;
        return data as T;
      } else {
        const { data, error } = await query;
        if (error) throw error;
        return data as T;
      }
    },
    deps,
    options
  );
}

/**
 * Standard result type for async operations
 * Provides a consistent return shape across the app
 */
export interface AsyncResult<T = void> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Helper to create a consistent async result
 */
export function createAsyncResult<T = void>(
  success: boolean,
  data?: T,
  error?: string
): AsyncResult<T> {
  return { success, data, error };
}
