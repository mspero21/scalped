'use client';

import Link from "next/link";
import { MapPin, Trophy, Users, Bookmark, ChevronRight, TrendingUp, BarChart3, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PageContainer } from "@/components/layout/page-container";
import { useAuth } from "@/hooks/use-auth";

const features = [
  {
    icon: Trophy,
    title: "Rank Your Stadiums",
    description: "Build your personal ranking of every stadium you've visited",
    color: "text-amber-500",
    bg: "bg-amber-50 dark:bg-amber-900/20",
    href: "/stadiums",
  },
  {
    icon: BarChart3,
    title: "View Your Rankings",
    description: "See your personal stadium rankings across all sports",
    color: "text-orange-500",
    bg: "bg-orange-50 dark:bg-orange-900/20",
    href: "/rankings",
  },
  {
    icon: History,
    title: "Track Visits",
    description: "Log every game, concert, and event at stadiums across the country",
    color: "text-emerald-500",
    bg: "bg-emerald-50 dark:bg-emerald-900/20",
    href: "/history",
    comingSoon: true,
  },
  {
    icon: Bookmark,
    title: "Build Your Bucket List",
    description: "Keep track of stadiums you're dying to visit",
    color: "text-blue-500",
    bg: "bg-blue-50 dark:bg-blue-900/20",
    href: "/bucket-list",
  },
  {
    icon: Users,
    title: "Share With Friends",
    description: "See where your friends have been and discover new venues",
    color: "text-purple-500",
    bg: "bg-purple-50 dark:bg-purple-900/20",
    href: "/feed",
    comingSoon: true,
  },
];

const stats = [
  { value: "30+", label: "NFL Stadiums" },
  { value: "30+", label: "NBA Arenas" },
  { value: "30+", label: "MLB Parks" },
  { value: "100+", label: "College Venues" },
];

export default function Home() {
  const { user, profile, loading } = useAuth();

  return (
    <PageContainer>
      {/* Hero Section */}
      <section className="text-center py-12 md:py-20">
        <div className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
          <TrendingUp className="h-4 w-4" />
          The Beli for Sports Stadiums
        </div>

        <h1 className="text-4xl md:text-6xl font-bold text-zinc-900 dark:text-white mb-6 leading-tight">
          Rank Every Stadium<br />
          <span className="text-emerald-600">You&apos;ve Ever Visited</span>
        </h1>

        <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto mb-8">
          Track your stadium visits, build your rankings, and share your experiences
          with fellow sports fans. From NFL to college, we&apos;ve got every venue covered.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/stadiums">
            <Button size="lg" className="w-full sm:w-auto">
              Explore Stadiums
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
          {!loading && (
            user ? (
              <div className="flex items-center gap-2 px-6 py-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl">
                <span className="text-zinc-600 dark:text-zinc-400">Welcome back,</span>
                <span className="font-semibold text-zinc-900 dark:text-white">
                  {profile?.display_name || profile?.username || 'friend'}
                </span>
                <span className="text-xl">👋</span>
              </div>
            ) : (
              <Link href="/signup">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Create Account
                </Button>
              </Link>
            )
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center p-4">
              <div className="text-3xl md:text-4xl font-bold text-emerald-600 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-zinc-600 dark:text-zinc-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white text-center mb-8">
          Everything You Need to Track Your Stadium Journey
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((feature) => (
            <Link key={feature.title} href={feature.href}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardContent className="flex items-start gap-4 p-6">
                  <div className={`p-3 rounded-xl ${feature.bg}`}>
                    <feature.icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-zinc-900 dark:text-white">
                        {feature.title}
                      </h3>
                      {feature.comingSoon && (
                        <span className="text-xs bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-400 px-2 py-0.5 rounded-full">
                          Coming Soon
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      {feature.description}
                    </p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-zinc-400 flex-shrink-0" />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      {!user && (
        <section className="py-12">
          <Card className="bg-gradient-to-br from-emerald-500 to-emerald-700 border-0">
            <CardContent className="text-center py-12 px-6">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Ready to Start Your Stadium Journey?
              </h2>
              <p className="text-emerald-100 mb-6 max-w-lg mx-auto">
                Join thousands of sports fans tracking their stadium experiences.
                It&apos;s free to get started.
              </p>
              <Link href="/signup">
                <Button size="lg" variant="secondary">
                  Get Started Free
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </section>
      )}
    </PageContainer>
  );
}
