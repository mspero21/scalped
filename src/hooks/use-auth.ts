'use client';

import { useEffect, useState } from 'react';
import { User, Session, AuthChangeEvent } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/client';
import { Profile } from '@/types/database';
import { FAVORITE_TEAM_CHANGED_EVENT } from '@/hooks/use-favorite-team';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    // Get initial session
    supabase.auth.getSession().then(({ data }: { data: { session: Session | null } }) => {
      const session = data.session;
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setLoading(false);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event: AuthChangeEvent, session: Session | null) => {
        setUser(session?.user ?? null);
        if (session?.user) {
          fetchProfile(session.user.id);
        } else {
          setProfile(null);
          setLoading(false);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  async function fetchProfile(userId: string) {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error && error.code !== 'PGRST116') {
      // PGRST116 = no rows returned, which is fine for new users
      console.error('Error fetching profile:', error);
    }

    setProfile((data as Profile | null) || null);
    setLoading(false);
  }

  async function signIn(email: string, password: string) {
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error };
  }

  async function signUp(email: string, password: string) {
    const supabase = createClient();
    const { error } = await supabase.auth.signUp({ email, password });
    return { error };
  }

  async function signOut() {
    const supabase = createClient();
    setUser(null);
    setProfile(null);
    try {
      localStorage.removeItem('scalped_favorite_team');
      window.dispatchEvent(new Event(FAVORITE_TEAM_CHANGED_EVENT));
    } catch {}
    await supabase.auth.signOut();
  }

  async function signInWithGoogle() {
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    return { error };
  }

  async function refreshProfile() {
    if (user) {
      await fetchProfile(user.id);
    }
  }

  // User needs onboarding if they're logged in but don't have a username set
  const needsOnboarding = Boolean(user && !loading && !profile?.username);

  return {
    user,
    profile,
    loading,
    needsOnboarding,
    signIn,
    signUp,
    signOut,
    signInWithGoogle,
    refreshProfile,
  };
}

