'use client';

import { useState } from 'react';
import { Users, UserPlus, Loader2 } from 'lucide-react';
import { PageContainer } from '@/components/layout/page-container';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { useActivityFeed } from '@/hooks/use-activity-feed';
import { ActivityItemComponent } from '@/components/feed/activity-item';
import { UserSearch } from '@/components/feed/user-search';
import Link from 'next/link';
import { cn } from '@/lib/utils';

type FeedTab = 'all' | 'following';

export default function FeedPage() {
  const [tab, setTab] = useState<FeedTab>('all');
  const { user } = useAuth();
  const { activities, loading, error } = useActivityFeed(user?.id, tab);

  // Not logged in
  if (!user) {
    return (
      <PageContainer>
        <div className="max-w-2xl mx-auto text-center py-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-purple-100 rounded-full mb-6">
            <Users className="h-10 w-10 text-purple-600" />
          </div>

          <h1 className="text-3xl font-bold text-[var(--foreground)] mb-4">
            Friends Feed
          </h1>

          <p className="text-lg text-[var(--foreground-muted)] mb-8">
            Log in to see activity from friends and discover new stadiums.
          </p>

          <div className="flex gap-4 justify-center">
            <Link href="/login">
              <Button>Log In</Button>
            </Link>
            <Link href="/stadiums">
              <Button variant="outline">Explore Stadiums</Button>
            </Link>
          </div>
        </div>
      </PageContainer>
    );
  }

  // Error state
  if (error) {
    return (
      <PageContainer>
        <div className="max-w-2xl mx-auto text-center py-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6">
            <Users className="h-10 w-10 text-red-600" />
          </div>

          <h1 className="text-3xl font-bold text-[var(--foreground)] mb-4">
            Oops!
          </h1>

          <p className="text-lg text-[var(--foreground-muted)] mb-8">
            {error}
          </p>

          <div className="flex gap-4 justify-center">
            <Button onClick={() => window.location.reload()}>Try Again</Button>
            <Link href="/stadiums">
              <Button variant="outline">Explore Stadiums</Button>
            </Link>
          </div>
        </div>
      </PageContainer>
    );
  }

  // Remove the old empty state gate — the main view now handles empty state with tabs

  // Feed with activities
  return (
    <PageContainer>
      <div className="max-w-2xl mx-auto">
        {/* Search Bar */}
        <div className="mb-4">
          <UserSearch currentUserId={user?.id} />
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-[var(--card-bg-secondary)] p-1 rounded-xl">
          <button
            onClick={() => setTab('all')}
            className={cn(
              'flex-1 py-2.5 text-sm font-medium rounded-lg transition-all',
              tab === 'all'
                ? 'bg-[var(--card-bg)] text-[var(--foreground)] shadow-sm'
                : 'text-[var(--foreground-muted)] hover:text-[var(--foreground)]'
            )}
          >
            All
          </button>
          <button
            onClick={() => setTab('following')}
            className={cn(
              'flex-1 py-2.5 text-sm font-medium rounded-lg transition-all',
              tab === 'following'
                ? 'bg-[var(--card-bg)] text-[var(--foreground)] shadow-sm'
                : 'text-[var(--foreground-muted)] hover:text-[var(--foreground)]'
            )}
          >
            Following
          </button>
        </div>

        {/* Activities List */}
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-[var(--foreground-muted)]" />
          </div>
        ) : activities.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-[var(--foreground-muted)]">
              {tab === 'following' ? 'No activity from people you follow yet.' : 'No activity yet.'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {activities.map((activity) => (
              <ActivityItemComponent key={activity.id} activity={activity} />
            ))}

            <div className="text-center py-8">
              <p className="text-sm text-[var(--foreground-muted)]">
                You&apos;re all caught up!
              </p>
            </div>
          </div>
        )}
      </div>
    </PageContainer>
  );
}
