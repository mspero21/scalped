'use server';

import { createClient } from '@supabase/supabase-js';

interface SignupInput {
  email: string;
  password: string;
  username: string;
  displayName: string;
}

interface SignupResult {
  success?: boolean;
  error?: string;
}

export async function signupUser(input: SignupInput): Promise<SignupResult> {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
      return { error: 'Server configuration error' };
    }

    const adminClient = createClient(supabaseUrl, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    // Check if username is taken
    const { data: existingProfile } = await adminClient
      .from('profiles')
      .select('id')
      .eq('username', input.username.trim())
      .single();

    if (existingProfile) {
      return { error: 'Username is already taken' };
    }

    // Create user with admin API (auto-confirmed, no email needed)
    const { data: authData, error: authError } = await adminClient.auth.admin.createUser({
      email: input.email,
      password: input.password,
      email_confirm: true,
    });

    if (authError) {
      return { error: authError.message };
    }

    if (!authData.user) {
      return { error: 'Failed to create account' };
    }

    // Create profile
    const { error: profileError } = await adminClient.from('profiles').upsert(
      {
        user_id: authData.user.id,
        username: input.username.trim(),
        display_name: input.displayName.trim(),
        email: input.email,
      },
      { onConflict: 'user_id' }
    );

    if (profileError) {
      console.error('Error creating profile:', profileError);
      // User was created but profile failed - still return success
      // Profile can be created later during login
    }

    return { success: true };
  } catch (err) {
    console.error('Signup error:', err);
    return { error: err instanceof Error ? err.message : 'Failed to create account' };
  }
}
