'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, ChevronRight, Search } from 'lucide-react';
import { PageContainer } from '@/components/layout/page-container';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { useFavoriteTeam } from '@/hooks/use-favorite-team';
import { createClient } from '@/lib/supabase/client';

interface TeamOption {
  name: string;
  sport: string;
}

export default function OnboardingPage() {
  const { user, profile, loading: authLoading, refreshProfile } = useAuth();
  const { setFavoriteTeam } = useFavoriteTeam();
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [username, setUsername] = useState('');
  const [selectedTeam, setSelectedTeam] = useState<TeamOption | null>(null);
  const [teams, setTeams] = useState<TeamOption[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingTeams, setLoadingTeams] = useState(true);

  // Fetch distinct team names from stadiums
  useEffect(() => {
    async function fetchTeams() {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from('stadiums')
          .select('team_name, sport')
          .order('team_name');

        if (error) throw error;

        // Deduplicate by team_name
        const seen = new Set<string>();
        const teamList: TeamOption[] = [];
        for (const row of data as unknown as { team_name: string; sport: string }[]) {
          if (!seen.has(row.team_name)) {
            seen.add(row.team_name);
            teamList.push({ name: row.team_name, sport: row.sport });
          }
        }
        setTeams(teamList);
      } catch (err) {
        console.error('Error fetching teams:', err);
      } finally {
        setLoadingTeams(false);
      }
    }
    fetchTeams();
  }, []);

  // Redirect if already has username (onboarding done)
  useEffect(() => {
    if (!authLoading && profile?.username) {
      router.push('/');
    }
  }, [authLoading, profile, router]);

  // Pre-fill username from email if available
  useEffect(() => {
    if (user?.email && !username) {
      setUsername(user.email.split('@')[0].toLowerCase().replace(/[^a-z0-9_]/g, ''));
    }
  }, [user, username]);

  if (authLoading) {
    return (
      <PageContainer>
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-[var(--accent)]" />
        </div>
      </PageContainer>
    );
  }

  if (!user) {
    router.push('/login');
    return null;
  }

  const filteredTeams = teams.filter(team =>
    team.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  async function handleComplete() {
    if (!user) return;

    setError(null);
    setSaving(true);

    try {
      const supabase = createClient();

      // Check if username is taken
      const { data: existing } = await supabase
        .from('profiles')
        .select('id')
        .eq('username', username.trim())
        .neq('user_id', user.id)
        .single();

      if (existing) {
        setError('Username is already taken');
        setSaving(false);
        return;
      }

      // Save favorite team to localStorage
      if (selectedTeam) {
        setFavoriteTeam(selectedTeam.name);
      }

      // Upsert profile
      const { error: upsertError } = await supabase
        .from('profiles')
        .upsert({
          user_id: user.id,
          username: username.trim(),
          updated_at: new Date().toISOString(),
        } as never, {
          onConflict: 'user_id'
        });

      if (upsertError) throw upsertError;

      await refreshProfile();
      router.push('/');
    } catch (err) {
      console.error('Error saving profile:', err);
      setError(err instanceof Error ? err.message : 'Failed to save');
      setSaving(false);
    }
  }

  return (
    <PageContainer className="min-h-[80vh] flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardContent className="pt-8 pb-6">
          {/* Progress indicator */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className={`h-2 w-16 rounded-full ${step >= 1 ? 'bg-[var(--accent)]' : 'bg-[var(--skeleton)]'}`} />
            <div className={`h-2 w-16 rounded-full ${step >= 2 ? 'bg-[var(--accent)]' : 'bg-[var(--skeleton)]'}`} />
          </div>

          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="text-5xl mb-4">👋</div>
                <h1 className="text-2xl font-bold text-[var(--foreground)] mb-2">
                  Welcome to Scalped!
                </h1>
                <p className="text-[var(--foreground-muted)]">
                  Let&apos;s set up your profile. Choose a username.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-2">
                  Username
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--input-placeholder)]">@</span>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                    className="w-full pl-10 pr-4 py-3 bg-[var(--input-bg)] border border-[var(--input-border)] rounded-xl text-[var(--input-text)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-ring)]"
                    placeholder="yourname"
                  />
                </div>
                <p className="text-xs text-[var(--foreground-muted)] mt-2">
                  This is how others will find you
                </p>
              </div>

              <Button
                onClick={() => setStep(2)}
                disabled={!username.trim() || username.length < 3}
                className="w-full"
              >
                Continue
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="text-5xl mb-4">🏈</div>
                <h1 className="text-2xl font-bold text-[var(--foreground)] mb-2">
                  Pick Your Favorite Team
                </h1>
                <p className="text-[var(--foreground-muted)]">
                  This helps personalize your experience (optional)
                </p>
              </div>

              {/* Search */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--input-placeholder)]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-[var(--input-bg)] border border-[var(--input-border)] rounded-xl text-[var(--input-text)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-ring)]"
                  placeholder="Search teams..."
                />
              </div>

              {/* Team list */}
              <div className="max-h-72 overflow-y-auto space-y-1 -mx-2 px-2">
                {loadingTeams ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin text-[var(--accent)]" />
                  </div>
                ) : filteredTeams.length === 0 ? (
                  <p className="text-center text-[var(--foreground-muted)] py-4">No teams found</p>
                ) : (
                  filteredTeams.slice(0, 50).map((team) => (
                    <button
                      key={team.name}
                      onClick={() => {
                        const isDeselecting = selectedTeam?.name === team.name;
                        setSelectedTeam(isDeselecting ? null : team);
                        setFavoriteTeam(isDeselecting ? null : team.name);
                      }}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                        selectedTeam?.name === team.name
                          ? 'bg-[var(--accent-bg)] border-2 border-[var(--accent)]'
                          : 'bg-[var(--input-bg)] border-2 border-transparent hover:bg-[var(--card-hover)]'
                      }`}
                    >
                      <p className="font-medium text-[var(--foreground)]">{team.name}</p>
                      <p className="text-xs text-[var(--foreground-muted)]">{team.sport}</p>
                    </button>
                  ))
                )}
              </div>

              {error && (
                <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg">
                  {error}
                </div>
              )}

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                  Back
                </Button>
                <Button onClick={handleComplete} disabled={saving} className="flex-1">
                  {saving ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      {selectedTeam ? 'Complete' : 'Skip'}
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </PageContainer>
  );
}
