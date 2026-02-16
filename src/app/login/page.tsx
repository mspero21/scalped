'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { createClient } from '@/lib/supabase/client';
import { authLogger } from '@/lib/logger';

export default function LoginPage() {
  const router = useRouter();
  const { signIn, signInWithGoogle } = useAuth();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const supabase = createClient();
      let emailToUse = identifier;

      // If identifier is not an email, try to look up username -> email
      if (!identifier.includes('@')) {
        authLogger.debug('Looking up username', { username: identifier });

        const { data: profiles, error: profileError } = await supabase
          .from('profiles')
          .select('user_id, email')
          .eq('username', identifier) as { data: { user_id: string; email: string | null }[] | null; error: Error | null };

        if (profileError) {
          authLogger.error('Failed to look up username', { error: profileError.message });
          setError('Unable to verify username. Please try again.');
          setLoading(false);
          return;
        }

        if (!profiles || profiles.length === 0) {
          authLogger.debug('Username not found', { username: identifier });
          setError('Username or email not found. Please check and try again.');
          setLoading(false);
          return;
        }

        // Use the email stored on the profile
        if (profiles[0].email) {
          emailToUse = profiles[0].email;
        }
      }

      authLogger.debug('Attempting sign in');
      const { error: signInError } = await signIn(emailToUse, password);

      if (signInError) {
        authLogger.warn('Sign in failed', { error: signInError.message });

        if (signInError.message.includes('Invalid login credentials')) {
          setError('Incorrect email/username or password. Please try again.');
        } else if (signInError.message.includes('Email not confirmed')) {
          setError('Please confirm your email address before signing in.');
        } else {
          setError(signInError.message);
        }
        setLoading(false);
        return;
      }

      authLogger.debug('Login complete, redirecting to rankings');
      router.push('/rankings');
    } catch {
      authLogger.error('Unexpected error during login');
      setError('An unexpected error occurred. Please try again.');
      setLoading(false);
    }
  }

  async function handleGoogleSignIn() {
    const { error } = await signInWithGoogle();
    if (error) {
      setError(error.message);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <div className="absolute top-10 left-10 w-24 h-24 bg-emerald-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-32 h-32 bg-orange-200/30 rounded-full blur-3xl" />

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl">
          {/* Ticket container with drop shadow */}
          <div
            className="flex"
            style={{ filter: 'drop-shadow(0 8px 24px rgba(251, 146, 60, 0.25))' }}
          >
            {/* Main ticket with left scalloped edge - using SVG */}
            <div className="relative flex-1">
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 500" preserveAspectRatio="none">
                <path
                  d="M20,0 L400,0 L400,500 L20,500 Q0,487.5 20,475 Q0,462.5 20,450 Q0,437.5 20,425 Q0,412.5 20,400 Q0,387.5 20,375 Q0,362.5 20,350 Q0,337.5 20,325 Q0,312.5 20,300 Q0,287.5 20,275 Q0,262.5 20,250 Q0,237.5 20,225 Q0,212.5 20,200 Q0,187.5 20,175 Q0,162.5 20,150 Q0,137.5 20,125 Q0,112.5 20,100 Q0,87.5 20,75 Q0,62.5 20,50 Q0,37.5 20,25 Q0,12.5 20,0 Z"
                  fill="white"
                />
              </svg>
              <div className="relative z-10 p-8 pl-10">
                {/* Green stripe at top */}
                <div className="absolute top-0 left-5 right-0 h-3 bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-400 rounded-tr-sm" />

                <div className="pt-6">
                  {/* Header */}
                  <div className="text-center mb-6">
                    <div className="text-5xl mb-3">🏟️</div>
                    <h1 className="text-2xl font-bold text-gray-800">Welcome back</h1>
                    <p className="text-gray-500">Sign in to your account</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                      <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg">
                        {error}
                      </div>
                    )}

                    <div>
                      <label htmlFor="identifier" className="block text-sm font-medium text-gray-600 mb-1.5">
                        Email or Username
                      </label>
                      <input
                        id="identifier"
                        type="text"
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        required
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all"
                        placeholder="you@example.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-1.5">
                        Password
                      </label>
                      <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all"
                        placeholder="••••••••"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-xl font-medium transition-all text-base"
                      disabled={loading}
                    >
                      {loading ? 'Signing in...' : 'Sign In'}
                    </Button>
                  </form>

                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200" />
                    </div>
                    <div className="relative flex justify-center">
                      <span className="px-4 bg-white text-gray-400 text-sm">or</span>
                    </div>
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    className="w-full bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 py-3 rounded-xl transition-all"
                    onClick={handleGoogleSignIn}
                  >
                    <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    Continue with Google
                  </Button>

                  <p className="text-center text-sm text-gray-500 mt-6">
                    Don&apos;t have an account?{' '}
                    <Link href="/signup" className="text-emerald-600 hover:text-emerald-500 font-medium">
                      Sign up
                    </Link>
                  </p>
                </div>
              </div>
            </div>

            {/* Perforation dots */}
            <div className="w-2 bg-white flex flex-col justify-around items-center py-4">
              {[...Array(20)].map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-orange-200" />
              ))}
            </div>

            {/* Stub with right scalloped edge - using SVG */}
            <div className="relative w-44">
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 180 500" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="stubGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#fef3c7" />
                    <stop offset="50%" stopColor="#fed7aa" />
                    <stop offset="100%" stopColor="#fef3c7" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,0 L160,0 Q180,12.5 160,25 Q180,37.5 160,50 Q180,62.5 160,75 Q180,87.5 160,100 Q180,112.5 160,125 Q180,137.5 160,150 Q180,162.5 160,175 Q180,187.5 160,200 Q180,212.5 160,225 Q180,237.5 160,250 Q180,262.5 160,275 Q180,287.5 160,300 Q180,312.5 160,325 Q180,337.5 160,350 Q180,362.5 160,375 Q180,387.5 160,400 Q180,412.5 160,425 Q180,437.5 160,450 Q180,462.5 160,475 Q180,487.5 160,500 L0,500 Z"
                  fill="url(#stubGradient)"
                />
              </svg>
              <div className="relative z-10 p-5 pr-8 h-full flex flex-col justify-between">
                {/* Orange stripe at top */}
                <div className="absolute top-0 left-0 right-5 h-3 bg-gradient-to-r from-orange-400 via-amber-400 to-orange-400" />

                <div className="pt-6 space-y-4">
                  <div className="text-center">
                    <p className="text-sm text-orange-600 tracking-[0.2em] font-bold">SCALPED</p>
                    <div className="text-5xl mt-3">🏟️</div>
                  </div>

                  <div className="border-t border-dashed border-orange-300 pt-4">
                    <p className="text-xs text-orange-500 tracking-wider uppercase mb-1">Ticket Holder</p>
                    <p className="text-lg text-orange-800 font-bold truncate min-h-[28px]">
                      {identifier || '—'}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-2 text-center bg-white/60 rounded-lg p-3">
                    <div>
                      <p className="text-xs text-orange-500 font-medium">SEC</p>
                      <p className="text-xl text-orange-800 font-bold">VIP</p>
                    </div>
                    <div>
                      <p className="text-xs text-orange-500 font-medium">ROW</p>
                      <p className="text-xl text-orange-800 font-bold">A</p>
                    </div>
                    <div>
                      <p className="text-xs text-orange-500 font-medium">SEAT</p>
                      <p className="text-xl text-orange-800 font-bold">01</p>
                    </div>
                  </div>
                  <p className="text-center text-sm text-orange-600 tracking-widest font-bold">★ ADMIT ONE ★</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

