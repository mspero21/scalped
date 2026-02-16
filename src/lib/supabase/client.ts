import { createBrowserClient } from '@supabase/ssr';
import type { Database, TypedSupabaseClient } from './types';
import { dbLogger } from '@/lib/logger';

// Check if Supabase is properly configured
export function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  // Allow both https:// (production) and http:// (local development)
  return !!(url && key && url.trim() !== '' && key.trim() !== '' && (url.startsWith('https://') || url.startsWith('http://')));
}

// Singleton client instance with proper typing
let clientInstance: TypedSupabaseClient | null = null;

/**
 * Creates or returns the singleton Supabase browser client
 * with full type safety for the database schema
 */
export function createClient(): TypedSupabaseClient {
  if (!isSupabaseConfigured()) {
    const error = 'Supabase is not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables.';
    dbLogger.error(error);
    throw new Error(error);
  }

  if (clientInstance) {
    return clientInstance;
  }

  dbLogger.debug('Creating new Supabase browser client');

  clientInstance = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  return clientInstance;
}

/**
 * Safe version that returns null if not configured
 * Useful for optional Supabase features
 */
export function getClientOrNull(): TypedSupabaseClient | null {
  if (!isSupabaseConfigured()) {
    dbLogger.warn('Supabase is not configured, returning null client');
    return null;
  }
  return createClient();
}

