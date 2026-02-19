'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { createClient } from '@/lib/supabase/client';
import { Search, ChevronRight, ChevronLeft, Loader2 } from 'lucide-react';
import { useLocalTeamTheme } from '@/hooks/use-team-theme';
import { useFavoriteTeam } from '@/hooks/use-favorite-team';
import { signupUser } from '@/app/actions/signup';

interface TeamOption {
  id: string;
  name: string;
  sport: string;
}

export default function SignupPage() {
  const router = useRouter();
  const { signInWithGoogle } = useAuth();
  const { teamColors, setTeamTheme } = useLocalTeamTheme();
  const { setFavoriteTeam } = useFavoriteTeam();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [teams, setTeams] = useState<TeamOption[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<TeamOption | null>(null);
  const [teamSearch, setTeamSearch] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch teams from stadiums (distinct team_name + sport)
  useEffect(() => {
    async function fetchTeams() {
      const supabase = createClient();
      const { data } = await supabase
        .from('stadiums')
        .select('id, team_name, sport')
        .order('team_name');

      if (data) {
        const seen = new Set<string>();
        const teamList: TeamOption[] = [];
        for (const s of data) {
          if (s.team_name && !seen.has(s.team_name)) {
            seen.add(s.team_name);
            teamList.push({ id: s.id, name: s.team_name, sport: s.sport });
          }
        }
        setTeams(teamList);
      }
    }
    fetchTeams();
  }, []);

  // Update team theme when selection changes
  useEffect(() => {
    setTeamTheme(selectedTeam?.name || null);
  }, [selectedTeam, setTeamTheme]);

  const filteredTeams = teams.filter(t =>
    t.name.toLowerCase().includes(teamSearch.toLowerCase())
  );

  function handleStep1() {
    setError('');
    if (!email.trim()) {
      setError('Email is required');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setStep(2);
  }

  function handleStep2() {
    setError('');
    if (!displayName.trim()) {
      setError('Name is required');
      return;
    }
    if (!username.trim() || username.length < 3) {
      setError('Username must be at least 3 characters');
      return;
    }
    setStep(3);
  }

  async function handleComplete() {
    setError('');
    setLoading(true);

    // Use server action to create user (auto-confirmed, no email needed)
    const result = await signupUser({
      email,
      password,
      username: username.trim(),
      displayName: displayName.trim(),
    });

    if (result.error) {
      setError(result.error);
      setLoading(false);
      return;
    }

    // Account created and auto-confirmed - sign them in directly
    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      // Account was created but auto-sign-in failed - show success and redirect to login
      if (selectedTeam) setFavoriteTeam(selectedTeam.name);
      setSuccess(true);
      return;
    }

    // Save favorite team to localStorage
    if (selectedTeam) setFavoriteTeam(selectedTeam.name);

    router.push('/rankings');
  }

  async function handleGoogleSignIn() {
    const { error: googleError } = await signInWithGoogle();
    if (googleError) {
      setError(googleError.message);
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
        <div className="absolute top-10 left-10 w-24 h-24 bg-emerald-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-orange-200/30 rounded-full blur-3xl" />
        <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
          <div className="w-full max-w-md">
            <div style={{ filter: 'drop-shadow(0 8px 24px rgba(251, 146, 60, 0.25))' }}>
              {/* Stub on TOP with scalloped bottom edge */}
              <div className="relative">
                <svg className="w-full h-32" viewBox="0 0 400 120" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="stubGradSuccess" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#fef3c7" />
                      <stop offset="100%" stopColor="#fed7aa" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0,0 L400,0 L400,100 Q387.5,120 375,100 Q362.5,120 350,100 Q337.5,120 325,100 Q312.5,120 300,100 Q287.5,120 275,100 Q262.5,120 250,100 Q237.5,120 225,100 Q212.5,120 200,100 Q187.5,120 175,100 Q162.5,120 150,100 Q137.5,120 125,100 Q112.5,120 100,100 Q87.5,120 75,100 Q62.5,120 50,100 Q37.5,120 25,100 Q12.5,120 0,100 Z"
                    fill="url(#stubGradSuccess)"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center px-6 pb-4">
                  <div className="flex items-center gap-6">
                    <div className="text-5xl">🎫</div>
                    <div>
                      <p className="text-lg font-bold text-orange-800">{displayName || username}</p>
                      <p className="text-sm text-orange-600">@{username}</p>
                      {selectedTeam && <p className="text-sm text-orange-500">{selectedTeam.name}</p>}
                    </div>
                    <div className="ml-auto text-center bg-emerald-100 rounded-lg px-4 py-2">
                      <p className="text-2xl text-emerald-600">✓</p>
                      <p className="text-xs text-emerald-700 font-bold">CONFIRMED</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Perforation line */}
              <div className="h-2 bg-white flex justify-around items-center">
                {[...Array(20)].map((_, i) => (
                  <div key={i} className="w-2 h-2 rounded-full bg-orange-100" />
                ))}
              </div>

              {/* Main confirmation */}
              <div className="bg-white rounded-b-lg p-8 text-center">
                <div className="text-5xl mb-4">🎉</div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Account Created!</h2>
                <p className="text-gray-600 mb-6">
                  Your account has been created. Sign in to get started.
                </p>
                <Link href="/login">
                  <Button variant="outline" className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-8 py-3">
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Dynamic colors based on team selection
  const stubGradStart = teamColors?.primary || '#fef3c7';
  const stubGradEnd = teamColors?.secondary || '#fed7aa';
  const accentColor = teamColors?.primary || '#10b981';
  const accentColorEnd = teamColors?.secondary || '#14b8a6';

  return (
    <div
      className="min-h-screen transition-colors duration-500"
      style={{
        background: teamColors
          ? `linear-gradient(to bottom right, ${teamColors.primary}15, ${teamColors.secondary}10, ${teamColors.primary}08)`
          : 'linear-gradient(to bottom right, rgb(255 247 237), rgb(254 243 199), rgb(254 252 232))'
      }}
    >
      <div
        className="absolute top-10 left-10 w-24 h-24 rounded-full blur-3xl transition-colors duration-500"
        style={{ backgroundColor: teamColors ? `${teamColors.primary}30` : 'rgb(167 243 208 / 0.2)' }}
      />
      <div
        className="absolute bottom-20 right-20 w-32 h-32 rounded-full blur-3xl transition-colors duration-500"
        style={{ backgroundColor: teamColors ? `${teamColors.secondary}40` : 'rgb(254 215 170 / 0.3)' }}
      />

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-lg">
          <div style={{ filter: `drop-shadow(0 8px 24px ${teamColors ? teamColors.primary + '40' : 'rgba(251, 146, 60, 0.25)'})` }}>

            {/* STUB ON TOP - with scalloped bottom edge */}
            <div className="relative">
              <svg className="w-full h-28" viewBox="0 0 500 110" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="stubGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={stubGradStart} />
                    <stop offset="100%" stopColor={stubGradEnd} />
                  </linearGradient>
                </defs>
                <path
                  d="M0,0 L500,0 L500,90 Q487.5,110 475,90 Q462.5,110 450,90 Q437.5,110 425,90 Q412.5,110 400,90 Q387.5,110 375,90 Q362.5,110 350,90 Q337.5,110 325,90 Q312.5,110 300,90 Q287.5,110 275,90 Q262.5,110 250,90 Q237.5,110 225,90 Q212.5,110 200,90 Q187.5,110 175,90 Q162.5,110 150,90 Q137.5,110 125,90 Q112.5,110 100,90 Q87.5,110 75,90 Q62.5,110 50,90 Q37.5,110 25,90 Q12.5,110 0,90 Z"
                  fill="url(#stubGrad)"
                />
              </svg>
              {/* Stub content overlay */}
              <div className="absolute inset-0 px-6 py-4 flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-4xl">🏟️</div>
                  <div>
                    <p
                      className="text-sm font-bold tracking-widest transition-colors duration-300"
                      style={{ color: teamColors ? '#ffffff' : '#ea580c' }}
                    >SCALPED</p>
                    <p
                      className="text-xs transition-colors duration-300"
                      style={{ color: teamColors ? 'rgba(255,255,255,0.8)' : '#f97316' }}
                    >Your Ticket Preview</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 text-right">
                  <div>
                    <p
                      className="text-xs uppercase tracking-wide transition-colors duration-300"
                      style={{ color: teamColors ? 'rgba(255,255,255,0.8)' : '#f97316' }}
                    >Name</p>
                    <p
                      className="text-base font-bold transition-colors duration-300"
                      style={{ color: teamColors ? '#ffffff' : '#9a3412' }}
                    >{displayName || '—'}</p>
                  </div>
                  <div>
                    <p
                      className="text-xs uppercase tracking-wide transition-colors duration-300"
                      style={{ color: teamColors ? 'rgba(255,255,255,0.8)' : '#f97316' }}
                    >Username</p>
                    <p
                      className="text-base font-bold transition-colors duration-300"
                      style={{ color: teamColors ? '#ffffff' : '#9a3412' }}
                    >{username ? `@${username}` : '—'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Perforation line */}
            <div className="h-3 bg-white flex justify-around items-center">
              {[...Array(25)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full transition-colors duration-300"
                  style={{ backgroundColor: teamColors ? `${teamColors.primary}30` : 'rgb(255 237 213)' }}
                />
              ))}
            </div>

            {/* Main form section with scalloped top edge matching stub bottom */}
            <div className="bg-white rounded-b-lg overflow-hidden">
              {/* Accent bar - uses team colors */}
              <div
                className="h-2 transition-colors duration-500"
                style={{
                  background: `linear-gradient(to right, ${accentColor}, ${accentColorEnd})`
                }}
              />

              <div className="p-5">
                {/* Progress dots */}
                <div className="flex justify-center gap-2 mb-5">
                  <div
                    className="h-1.5 w-8 rounded-full transition-colors duration-300"
                    style={{ backgroundColor: step >= 1 ? (teamColors?.primary || '#34d399') : '#e5e7eb' }}
                  />
                  <div
                    className="h-1.5 w-8 rounded-full transition-colors duration-300"
                    style={{ backgroundColor: step >= 2 ? (teamColors?.primary || '#34d399') : '#e5e7eb' }}
                  />
                  <div
                    className="h-1.5 w-8 rounded-full transition-colors duration-300"
                    style={{ backgroundColor: step >= 3 ? (teamColors?.primary || '#34d399') : '#e5e7eb' }}
                  />
                </div>

                {error && (
                  <div className="p-2.5 bg-red-50 text-red-600 text-sm rounded-lg mb-4">
                    {error}
                  </div>
                )}

                {/* Step 1: Email & Password */}
                {step === 1 && (
                  <div className="space-y-4">
                    <div className="text-center">
                      <h2 className="text-lg font-bold text-gray-800">Create Account</h2>
                      <p className="text-gray-500 text-xs">Join Scalped and start ranking</p>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label htmlFor="email" className="block text-xs font-medium text-gray-500 mb-1">Email</label>
                        <input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all text-sm"
                          placeholder="you@example.com"
                        />
                      </div>

                      <div>
                        <label htmlFor="password" className="block text-xs font-medium text-gray-500 mb-1">Password</label>
                        <input
                          id="password"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all text-sm"
                          placeholder="••••••••"
                        />
                      </div>

                      <div>
                        <label htmlFor="confirmPassword" className="block text-xs font-medium text-gray-500 mb-1">Confirm Password</label>
                        <input
                          id="confirmPassword"
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all text-sm"
                          placeholder="••••••••"
                        />
                      </div>
                    </div>

                    <Button onClick={handleStep1} className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2.5 rounded-lg font-medium transition-all">
                      Continue
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>

                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200" />
                      </div>
                      <div className="relative flex justify-center text-xs">
                        <span className="px-3 bg-white text-gray-400">or</span>
                      </div>
                    </div>

                    <Button type="button" variant="outline" className="w-full bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 py-2.5 rounded-lg transition-all text-sm" onClick={handleGoogleSignIn}>
                      <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                      </svg>
                      Google
                    </Button>

                    <p className="text-center text-xs text-gray-500">
                      Already have an account?{' '}
                      <Link href="/login" className="text-emerald-600 hover:text-emerald-500 font-medium">
                        Sign in
                      </Link>
                    </p>
                  </div>
                )}

              {/* Step 2: Name & Username */}
              {step === 2 && (
                <div className="space-y-5">
                  <div className="text-center mb-2">
                    <h2 className="text-2xl font-bold text-gray-800">Your Profile</h2>
                    <p className="text-gray-500 text-sm">How should we identify you?</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label htmlFor="displayName" className="block text-sm font-medium text-gray-600 mb-1.5">Your Name</label>
                      <input
                        id="displayName"
                        type="text"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all"
                        placeholder="John Smith"
                      />
                    </div>

                    <div>
                      <label htmlFor="username" className="block text-sm font-medium text-gray-600 mb-1.5">Username</label>
                      <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl focus-within:ring-2 focus-within:ring-emerald-400 focus-within:border-transparent transition-all">
                        <span className="pl-4 text-gray-400 select-none">@</span>
                        <input
                          id="username"
                          type="text"
                          value={username}
                          onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                          className="flex-1 px-2 py-3 bg-transparent text-gray-800 placeholder-gray-400 focus:outline-none"
                          placeholder="username"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button variant="outline" onClick={() => setStep(1)} className="flex-1 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl transition-all">
                      <ChevronLeft className="h-4 w-4 mr-1" />
                      Back
                    </Button>
                    <Button onClick={handleStep2} className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-medium transition-all">
                      Continue
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Favorite Team */}
              {step === 3 && (
                <div className="space-y-5">
                  <div className="text-center mb-2">
                    <h2 className="text-2xl font-bold text-gray-800">Pick Your Team</h2>
                    <p className="text-gray-500 text-sm">Optional - you can skip this</p>
                  </div>

                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      value={teamSearch}
                      onChange={(e) => setTeamSearch(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                      style={{
                        '--tw-ring-color': teamColors?.primary || '#34d399'
                      } as React.CSSProperties}
                      placeholder="Search teams..."
                    />
                  </div>

                  <div className="max-h-72 overflow-y-auto space-y-1">
                    {filteredTeams.slice(0, 30).map((team) => {
                      const isSelected = selectedTeam?.id === team.id;
                      const teamSpecificColors = isSelected && teamColors ? teamColors : null;
                      return (
                        <button
                          key={team.id}
                          type="button"
                          onClick={() => setSelectedTeam(team)}
                          className="w-full px-4 py-2.5 text-left rounded-xl transition-all border"
                          style={{
                            backgroundColor: isSelected
                              ? (teamSpecificColors ? `${teamSpecificColors.primary}15` : '#ecfdf5')
                              : 'transparent',
                            borderColor: isSelected
                              ? (teamSpecificColors?.primary || '#6ee7b7')
                              : 'transparent',
                          }}
                        >
                          <div className="flex items-center gap-3">
                            {/* Team color indicator */}
                            {isSelected && teamSpecificColors && (
                              <div className="flex gap-1">
                                <div
                                  className="w-3 h-3 rounded-full"
                                  style={{ backgroundColor: teamSpecificColors.primary }}
                                />
                                <div
                                  className="w-3 h-3 rounded-full"
                                  style={{ backgroundColor: teamSpecificColors.secondary }}
                                />
                              </div>
                            )}
                            <div>
                              <p className="font-medium text-gray-800 text-sm">{team.name}</p>
                              <p className="text-xs text-gray-500">{team.sport}</p>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSelectedTeam(null);
                        setStep(2);
                      }}
                      className="flex-1 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl transition-all"
                    >
                      <ChevronLeft className="h-4 w-4 mr-1" />
                      Back
                    </Button>
                    <Button
                      onClick={handleComplete}
                      disabled={loading}
                      className="flex-1 text-white rounded-xl font-medium transition-all"
                      style={{
                        backgroundColor: teamColors?.primary || '#10b981',
                      }}
                    >
                      {loading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <>
                          {selectedTeam ? 'Complete' : 'Skip'}
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
