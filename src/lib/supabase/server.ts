import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import type { Database, TypedSupabaseClient } from './types';
import { dbLogger } from '@/lib/logger';

// Check if Supabase is properly configured
export function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  // Allow both https:// (production) and http:// (local dev)
  return !!(url && key && url.trim() !== '' && key.trim() !== '' && (url.startsWith('https://') || url.startsWith('http://')));
}

/**
 * Creates a Supabase server client with full type safety
 * for use in Server Components and Server Actions
 */
export async function createClient(): Promise<TypedSupabaseClient> {
  if (!isSupabaseConfigured()) {
    const error = 'Supabase is not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables.';
    dbLogger.error(error);
    throw new Error(error);
  }

  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch (error) {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing user sessions.
            // However, we should log it for debugging purposes
            dbLogger.debug('Cookie setAll called from Server Component', {
              error: error instanceof Error ? error.message : 'Unknown error',
              cookieCount: cookiesToSet.length,
            });
          }
        },
      },
    }
  );
}

/**
 * Safe version that returns null if not configured
 * Useful for optional Supabase features in server context
 */
export async function getClientOrNull(): Promise<TypedSupabaseClient | null> {
  if (!isSupabaseConfigured()) {
    dbLogger.warn('Supabase is not configured, returning null client (server)');
    return null;
  }
  return createClient();
}

