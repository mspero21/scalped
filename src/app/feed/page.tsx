'use client';

import { Users, Construction, UserPlus, Loader2 } from 'lucide-react';
import { PageContainer } from '@/components/layout/page-container';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { useActivityFeed } from '@/hooks/use-activity-feed';
import { ActivityItemComponent } from '@/components/feed/activity-item';
import { UserSearch } from '@/components/feed/user-search';
import Link from 'next/link';

export default function FeedPage() {
  const { user } = useAuth();
  const { activities, loading, error } = useActivityFeed(user?.id);

  // Loading state
  if (loading) {
    return (
      <PageContainer>
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-[var(--foreground-muted)]" />
          </div>
        </div>
      </PageContainer>
    );
  }

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

  // Empty state - not following anyone
  if (activities.length === 0) {
    return (
      <PageContainer>
        <div className="max-w-2xl mx-auto">
          {/* Search Bar */}
          <div className="mb-8">
            <UserSearch currentUserId={user?.id} />
          </div>

          {/* Empty State */}
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-purple-100 rounded-full mb-6">
              <UserPlus className="h-10 w-10 text-purple-600" />
            </div>

            <h1 className="text-3xl font-bold text-[var(--foreground)] mb-4">
              Your Feed is Empty
            </h1>

            <p className="text-lg text-[var(--foreground-muted)] mb-8">
              Search for users above or follow people to see their stadium activity here.
            </p>

            <Card className="mb-8 max-w-md mx-auto">
              <CardContent className="py-8">
                <UserPlus className="h-12 w-12 text-purple-500 mx-auto mb-4" />
                <h2 className="text-lg font-semibold text-[var(--foreground)] mb-2">
                  Start Following
                </h2>
                <p className="text-sm text-[var(--foreground-muted)]">
                  Search for users by username and follow them to see their rankings and stadium visits.
                </p>
              </CardContent>
            </Card>

            <div className="flex gap-4 justify-center">
              <Link href="/stadiums">
                <Button>Explore Stadiums</Button>
              </Link>
              <Link href="/rankings">
                <Button variant="outline">My Rankings</Button>
              </Link>
            </div>
          </div>
        </div>
      </PageContainer>
    );
  }

  // Feed with activities
  return (
    <PageContainer>
      <div className="max-w-2xl mx-auto">
        {/* Search Bar */}
        <div className="mb-6">
          <UserSearch currentUserId={user?.id} />
        </div>

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[var(--foreground)] mb-2">
            Friends Feed
          </h1>
          <p className="text-sm text-[var(--foreground-muted)]">
            Recent activity from people you follow
          </p>
        </div>

        {/* Activities List */}
        <div className="space-y-4">
          {activities.map((activity) => (
            <ActivityItemComponent key={activity.id} activity={activity} />
          ))}
        </div>

        {/* End message */}
        {activities.length > 0 && (
          <div className="text-center py-8">
            <p className="text-sm text-[var(--foreground-muted)]">
              You&apos;re all caught up! 🎉
            </p>
          </div>
        )}
      </div>
    </PageContainer>
  );
}
