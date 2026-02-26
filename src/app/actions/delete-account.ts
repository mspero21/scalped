'use server';

import { createClient } from '@supabase/supabase-js';
import { createClient as createServerClient } from '@/lib/supabase/server';
import { createLogger } from '@/lib/logger';

const logger = createLogger('DeleteAccount');

export async function deleteAccount(): Promise<{ error?: string }> {
  try {
    // Check env vars
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
      logger.error('Missing env vars', undefined, { supabaseUrl: !!supabaseUrl, serviceRoleKey: !!serviceRoleKey });
      return { error: 'Server configuration error' };
    }

    // Get current user from session
    const supabase = await createServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return { error: 'Not authenticated' };
    }

    logger.info('Deleting account for user', { userId: user.id });

    // Delete profile first (this will cascade to related data)
    const { error: profileError } = await supabase.from('profiles').delete().eq('user_id', user.id);
    if (profileError) {
      logger.error('Error deleting profile', profileError);
    }

    // Use admin client to delete the auth user
    const adminClient = createClient(supabaseUrl, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false }
    });

    const { error } = await adminClient.auth.admin.deleteUser(user.id);

    if (error) {
      logger.error('Error deleting auth user', error);
      return { error: error.message };
    }

    logger.info('Successfully deleted user', { userId: user.id });
    return {};
  } catch (err) {
    logger.error('Delete account error', err);
    return { error: err instanceof Error ? err.message : 'Failed to delete account' };
  }
}

