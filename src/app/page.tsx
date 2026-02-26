'use client';

import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import { Trophy, Bookmark, ChevronRight, TrendingUp, BarChart3, MapPin, Star, Flame, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { useFavoriteTeam } from "@/hooks/use-favorite-team";
import { useStadiums } from "@/hooks/use-stadiums";

function AnimatedCounter({ target, label }: { target: number; label: string }) {
  const [count, setCount] = useState(0);
  const [animatedTarget, setAnimatedTarget] = useState(0);

  useEffect(() => {
    if (target === 0 || target === animatedTarget) return;
    setAnimatedTarget(target);
    const duration = 1500;
    const steps = 40;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [target, animatedTarget]);

  return (
    <div className="text-center">
      <div className="text-3xl md:text-4xl font-bold text-[var(--accent)] tabular-nums">
        {count}+
      </div>
      <div className="text-xs text-[var(--foreground-muted)] mt-1 uppercase tracking-wider">{label}</div>
    </div>
  );
}

const features = [
  {
    icon: Trophy,
    title: "Rank Stadiums",
    description: "Head-to-head comparisons to build your ultimate rankings",
    href: "/stadiums",
    gradient: "from-amber-600 to-orange-700",
  },
  {
    icon: BarChart3,
    title: "View Rankings",
    description: "See your personal stadium tiers across every sport",
    href: "/rankings",
    gradient: "from-orange-600 to-red-700",
  },
  {
    icon: Bookmark,
    title: "Bucket List",
    description: "Track stadiums you need to visit before you die",
    href: "/bucket-list",
    gradient: "from-emerald-600 to-teal-700",
  },
  {
    icon: MapPin,
    title: "Explore",
    description: "Browse 300+ stadiums across NFL, NBA, MLB, NHL, and college",
    href: "/stadiums",
    gradient: "from-blue-600 to-indigo-700",
  },
];

export default function Home() {
  const { user, profile, loading } = useAuth();
  const { teamName: favoriteTeam, teamColors } = useFavoriteTeam();
  const { stadiums } = useStadiums('ALL');

  // Only show team theming when logged in
  const showTeam = !!user && !!favoriteTeam;
  const accentColor = (showTeam ? teamColors?.primary : null) || '#ea580c';

  const stadiumCounts = useMemo(() => {
    const counts = { nfl: 0, nba: 0, mlb: 0, nhl: 0, college: 0 };
    stadiums.forEach((s) => {
      if (s.sport === 'NFL') counts.nfl++;
      else if (s.sport === 'NBA') counts.nba++;
      else if (s.sport === 'MLB') counts.mlb++;
      else if (s.sport === 'NHL') counts.nhl++;
      else if (s.sport === 'NCAA_FOOTBALL' || s.sport === 'NCAA_BASKETBALL') counts.college++;
    });
    return counts;
  }, [stadiums]);

  // Get a few random stadium images for the hero showcase
  const showcaseStadiums = useMemo(() => {
    const big4: Set<string> = new Set(['NFL', 'NBA', 'MLB', 'NHL']);
    const withImages = stadiums.filter(s => s.image_url && big4.has(s.sport));
    const shuffled = [...withImages].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 5);
  }, [stadiums]);

  return (
    <div className="min-h-screen pb-24 overflow-hidden">
      {/* Ambient glow */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] pointer-events-none opacity-30 blur-3xl -z-10"
        style={{
          background: `radial-gradient(ellipse at center, ${accentColor}40 0%, transparent 70%)`
        }}
      />

      <div className="max-w-2xl mx-auto px-4 pt-20 md:pt-28">
        {/* Hero Section */}
        <section className="py-6 md:py-10">
          {/* "For Stadium Lovers" badge — only shown when no team is set (logged-out / no favorite team) */}
          {!showTeam && (
            <div className="flex justify-center mb-6">
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider border"
                style={{
                  borderColor: `${accentColor}40`,
                  color: accentColor,
                  backgroundColor: `${accentColor}10`,
                }}
              >
                <Flame className="h-3.5 w-3.5" />
                For Stadium Lovers
              </div>
            </div>
          )}

          {/* App Name */}
          <h1
            className="text-5xl md:text-7xl font-black text-center tracking-tight mb-4 bg-clip-text text-transparent"
            style={{
              backgroundImage: `linear-gradient(135deg, ${accentColor}, ${(showTeam ? teamColors?.secondary : null) || '#f59e0b'})`
            }}
          >
            Scalped
          </h1>

          {/* Headline */}
          <p className="text-2xl md:text-3xl font-extrabold text-center leading-[1.1] tracking-tight mb-6">
            <span className="text-[var(--foreground)]">Rank Every</span>
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(135deg, ${accentColor}, ${(showTeam ? teamColors?.secondary : null) || '#f59e0b'})`
              }}
            >
              Stadium
            </span>
            <span className="text-[var(--foreground)]"> You Visit</span>
          </p>

          <p className="text-center text-[var(--foreground-muted)] text-lg max-w-md mx-auto mb-10 leading-relaxed">
            The ultimate stadium tracker for sports fans. Rank, rate, and remember every venue.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            {!loading && user ? (
              <>
                <Link href="/stadiums" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="w-full text-white font-semibold shadow-lg shadow-amber-900/25"
                    style={{ backgroundColor: accentColor }}
                  >
                    <Star className="h-4 w-4 mr-2" />
                    Rate a Stadium
                  </Button>
                </Link>
                <Link href="/rankings" className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="w-full">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    My Rankings
                  </Button>
                </Link>
              </>
            ) : !loading ? (
              <>
                <Link href="/signup" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="w-full text-white font-semibold shadow-lg shadow-amber-900/25"
                    style={{ backgroundColor: accentColor }}
                  >
                    Get Started Free
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
                <Link href="/login" className="w-full sm:w-auto">
                  <Button size="lg" variant="ghost" className="w-full text-[var(--foreground-muted)]">
                    I have an account
                  </Button>
                </Link>
              </>
            ) : null}
          </div>

          {/* Welcome back pill */}
          {!loading && user && (
            <div className="flex justify-center mt-6">
              <div className="text-sm text-[var(--foreground-muted)]">
                Welcome back, <span className="text-[var(--foreground-muted)] font-medium">{profile?.display_name || profile?.username || 'friend'}</span> 👋
              </div>
            </div>
          )}
        </section>

        {/* Stadium Image Showcase */}
        {showcaseStadiums.length > 0 && (
          <section className="py-6">
            <div className="flex gap-3 overflow-hidden">
              {showcaseStadiums.map((stadium, i) => (
                <Link
                  key={stadium.id}
                  href={`/stadium/${stadium.id}`}
                  className="relative flex-shrink-0 w-32 h-44 md:w-40 md:h-52 rounded-2xl overflow-hidden group"
                  style={{
                    transform: `rotate(${(i - 2) * 3}deg)`,
                    marginTop: `${Math.abs(i - 2) * 8}px`,
                  }}
                >
                  <img
                    src={stadium.image_url || ''}
                    alt={stadium.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2">
                    <p className="text-[10px] font-bold text-white leading-tight truncate">{stadium.name}</p>
                    <p className="text-[9px] text-[var(--foreground-muted)] truncate">{stadium.team_name}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Stats */}
        <section className="py-8">
          <div className="grid grid-cols-5 gap-2 p-4 rounded-2xl bg-[var(--card-bg-secondary)]/80 border border-[var(--card-bg)]">
            <AnimatedCounter target={stadiumCounts.nfl} label="NFL" />
            <AnimatedCounter target={stadiumCounts.nba} label="NBA" />
            <AnimatedCounter target={stadiumCounts.mlb} label="MLB" />
            <AnimatedCounter target={stadiumCounts.nhl} label="NHL" />
            <AnimatedCounter target={stadiumCounts.college} label="College" />
          </div>
        </section>

        {/* Feature Grid */}
        <section className="py-8">
          <div className="grid grid-cols-2 gap-3">
            {features.map((feature) => (
              <Link key={feature.title} href={feature.href}>
                <div className="relative group rounded-2xl overflow-hidden border border-[var(--card-border)] bg-[var(--card-bg-secondary)]/60 p-5 h-full hover:border-[var(--card-border)] transition-all duration-300 hover:translate-y-[-2px]">
                  <div className={`inline-flex p-2.5 rounded-xl bg-gradient-to-br ${feature.gradient} mb-3`}>
                    <feature.icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-bold text-[var(--foreground)] text-sm mb-1">{feature.title}</h3>
                  <p className="text-xs text-[var(--foreground-muted)] leading-relaxed">{feature.description}</p>
                  <ChevronRight className="absolute top-5 right-4 h-4 w-4 text-[var(--foreground-muted)] group-hover:text-[var(--foreground-muted)] group-hover:translate-x-0.5 transition-all" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="py-10">
          <h2 className="text-xl font-bold text-[var(--foreground)] text-center mb-8">How It Works</h2>
          <div className="space-y-4">
            {[
              { step: "1", title: "Pick a stadium", desc: "Browse our database of 300+ venues across all major sports" },
              { step: "2", title: "Choose your tier", desc: "Rate it as Loved, Liked, Okay, or Disliked" },
              { step: "3", title: "Compare head-to-head", desc: "Quick A/B comparisons place it precisely in your rankings" },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-4">
                <div
                  className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white"
                  style={{ backgroundColor: accentColor }}
                >
                  {item.step}
                </div>
                <div className="pt-1">
                  <h3 className="font-semibold text-[var(--foreground)] text-sm">{item.title}</h3>
                  <p className="text-xs text-[var(--foreground-muted)] mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom CTA for logged out users */}
        {!loading && !user && (
          <section className="py-10 mb-8">
            <div
              className="rounded-2xl p-8 text-center"
              style={{
                background: `linear-gradient(135deg, ${accentColor}20, ${teamColors?.secondary || '#92400e'}20)`,
                borderColor: `${accentColor}30`,
                borderWidth: '1px',
              }}
            >
              <TrendingUp className="h-8 w-8 mx-auto mb-4" style={{ color: accentColor }} />
              <h2 className="text-xl font-bold text-[var(--foreground)] mb-2">Start Your Stadium Journey</h2>
              <p className="text-sm text-[var(--foreground-muted)] mb-6 max-w-sm mx-auto">
                Join sports fans who are ranking and tracking their stadium experiences.
              </p>
              <Link href="/signup">
                <Button
                  size="lg"
                  className="text-white font-semibold"
                  style={{ backgroundColor: accentColor }}
                >
                  Create Free Account
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
