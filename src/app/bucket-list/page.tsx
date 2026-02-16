'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Bookmark, MapPin, X, ChevronRight, Plus, Check } from 'lucide-react';
import { PageContainer } from '@/components/layout/page-container';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/use-auth';
import { useBucketList } from '@/hooks/use-bucket-list';
import { useVisits } from '@/hooks/use-visits';
import { getSportEmoji, getSportLabel } from '@/lib/utils';
import { cn } from '@/lib/utils';

export default function BucketListPage() {
  const { user, loading: authLoading } = useAuth();
  const { items, loading: bucketLoading, removeItem } = useBucketList(user?.id);
  const { hasVisited } = useVisits(user?.id);
  const [removingId, setRemovingId] = useState<string | null>(null);

  const loading = authLoading || bucketLoading;

  async function handleRemove(itemId: string, stadiumId: string) {
    setRemovingId(itemId);
    await removeItem(itemId, stadiumId);
    setRemovingId(null);
  }

  if (loading) {
    return (
      <PageContainer>
        <div className="flex items-center gap-3 mb-6">
          <Bookmark className="h-6 w-6 text-blue-500" />
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Bucket List</h1>
        </div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 bg-[var(--card-bg-secondary)] rounded-xl animate-pulse" />
          ))}
        </div>
      </PageContainer>
    );
  }

  if (!user) {
    return (
      <PageContainer>
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6">
            <Bookmark className="h-10 w-10 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">
            Sign in to Create Your Bucket List
          </h2>
          <p className="text-[var(--foreground-muted)] mb-6">
            Create an account to save stadiums you want to visit.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/login">
              <Button>Sign In</Button>
            </Link>
            <Link href="/signup">
              <Button variant="outline">Create Account</Button>
            </Link>
          </div>
        </div>
      </PageContainer>
    );
  }

  // Separate visited vs not visited
  const visitedItems = items.filter((item) => hasVisited(item.stadium_id));
  const notVisitedItems = items.filter((item) => !hasVisited(item.stadium_id));

  if (items.length === 0) {
    return (
      <PageContainer>
        <div className="flex items-center gap-3 mb-6">
          <Bookmark className="h-6 w-6 text-blue-500" />
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Bucket List</h1>
        </div>
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-6xl mb-4">📍</p>
            <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">
              Your bucket list is empty
            </h3>
            <p className="text-[var(--foreground-muted)] mb-6">
              Browse stadiums and add the ones you want to visit!
            </p>
            <Link href="/stadiums">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Explore Stadiums
              </Button>
            </Link>
          </CardContent>
        </Card>
      </PageContainer>
    );
  }

  const renderItem = (item: typeof items[0], isVisited: boolean) => (
    <Link key={item.id} href={`/stadium/${item.stadium_id}`}>
      <Card className={cn(
        'flex items-center gap-4 p-4 hover:shadow-md transition-all duration-200',
        'hover:bg-[var(--card-hover)] group',
        isVisited && 'opacity-75'
      )}>
        {/* Stadium Image */}
        <div className="relative h-14 w-14 rounded-lg overflow-hidden bg-[var(--card-bg-secondary)] flex-shrink-0">
          {item.stadium?.image_url ? (
            <Image
              src={item.stadium.image_url}
              alt={item.stadium.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-2xl">
              {getSportEmoji(item.stadium?.sport || 'OTHER')}
            </div>
          )}
          {isVisited && (
            <div className="absolute inset-0 bg-emerald-500/80 flex items-center justify-center">
              <Check className="h-6 w-6 text-white" />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h3 className={cn(
            'font-semibold text-[var(--foreground)] truncate',
            isVisited && 'line-through'
          )}>
            {item.stadium?.name}
          </h3>
          <div className="flex items-center gap-2 text-sm text-[var(--foreground-muted)]">
            <MapPin className="h-3 w-3" />
            <span className="truncate">
              {item.stadium?.city}, {item.stadium?.state}
            </span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="sport" className="text-xs">
              {getSportLabel(item.stadium?.sport || 'OTHER')}
            </Badge>
            {isVisited && (
              <Badge variant="outline" className="text-xs text-emerald-600 border-emerald-600">
                Visited!
              </Badge>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleRemove(item.id, item.stadium_id);
            }}
            disabled={removingId === item.id}
            className="p-2 text-[var(--foreground-muted)] hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
          >
            <X className="h-4 w-4" />
          </button>
          <ChevronRight className="h-5 w-5 text-[var(--foreground-muted)]" />
        </div>
      </Card>
    </Link>
  );

  return (
    <PageContainer>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Bookmark className="h-6 w-6 text-blue-500" />
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Bucket List</h1>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-sm">
            {visitedItems.length}/{items.length} visited
          </Badge>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-6">
        <div className="h-2 bg-[var(--card-bg-secondary)] rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-500 transition-all duration-500"
            style={{ width: `${(visitedItems.length / items.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="space-y-6">
        {/* Not visited */}
        {notVisitedItems.length > 0 && (
          <div>
            <h2 className="text-sm font-semibold text-[var(--foreground-muted)] mb-3 uppercase tracking-wide">
              To Visit ({notVisitedItems.length})
            </h2>
            <div className="space-y-2">
              {notVisitedItems.map((item) => renderItem(item, false))}
            </div>
          </div>
        )}

        {/* Visited */}
        {visitedItems.length > 0 && (
          <div>
            <h2 className="text-sm font-semibold text-emerald-600 mb-3 uppercase tracking-wide">
              ✓ Completed ({visitedItems.length})
            </h2>
            <div className="space-y-2">
              {visitedItems.map((item) => renderItem(item, true))}
            </div>
          </div>
        )}
      </div>
    </PageContainer>
  );
}

