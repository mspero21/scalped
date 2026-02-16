'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { History, MapPin, Calendar, Trash2, ChevronRight, Plus, StickyNote, Armchair } from 'lucide-react';
import { PageContainer } from '@/components/layout/page-container';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/use-auth';
import { useVisits } from '@/hooks/use-visits';
import { getSportEmoji, getSportLabel } from '@/lib/utils';
import { format, parseISO } from 'date-fns';
import { cn } from '@/lib/utils';

export default function HistoryPage() {
  const { user, loading: authLoading } = useAuth();
  const { visits, loading: visitsLoading, removeVisit } = useVisits(user?.id);
  const [removingId, setRemovingId] = useState<string | null>(null);

  const loading = authLoading || visitsLoading;

  async function handleRemove(visitId: string, stadiumId: string) {
    setRemovingId(visitId);
    await removeVisit(visitId, stadiumId);
    setRemovingId(null);
  }

  if (loading) {
    return (
      <PageContainer>
        <div className="flex items-center gap-3 mb-6">
          <History className="h-6 w-6 text-emerald-500" />
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Visit History</h1>
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
          <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 rounded-full mb-6">
            <History className="h-10 w-10 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">
            Sign in to Track Your Visits
          </h2>
          <p className="text-[var(--foreground-muted)] mb-6">
            Create an account to log every stadium you visit.
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

  if (visits.length === 0) {
    return (
      <PageContainer>
        <div className="flex items-center gap-3 mb-6">
          <History className="h-6 w-6 text-emerald-500" />
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Visit History</h1>
        </div>
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-6xl mb-4">🏟️</p>
            <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">
              No visits yet
            </h3>
            <p className="text-[var(--foreground-muted)] mb-6">
              Start exploring stadiums and mark them as visited!
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

  // Group visits by year/month
  const groupedVisits: Record<string, typeof visits> = {};
  visits.forEach((visit) => {
    const date = parseISO(visit.visited_at);
    const key = format(date, 'MMMM yyyy');
    if (!groupedVisits[key]) groupedVisits[key] = [];
    groupedVisits[key].push(visit);
  });

  return (
    <PageContainer>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <History className="h-6 w-6 text-emerald-500" />
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Visit History</h1>
        </div>
        <Badge variant="outline" className="text-sm">
          {visits.length} {visits.length === 1 ? 'visit' : 'visits'}
        </Badge>
      </div>

      <div className="space-y-6">
        {Object.entries(groupedVisits).map(([monthYear, monthVisits]) => (
          <div key={monthYear}>
            <h2 className="text-sm font-semibold text-[var(--foreground-muted)] mb-3 uppercase tracking-wide">
              {monthYear}
            </h2>
            <div className="space-y-2">
              {monthVisits.map((visit) => (
                <Link key={visit.id} href={`/stadium/${visit.stadium_id}`}>
                  <Card className={cn(
                    'flex items-center gap-4 p-4 hover:shadow-md transition-all duration-200',
                    'hover:bg-[var(--card-hover)] group'
                  )}>
                    {/* Stadium Image */}
                    <div className="relative h-14 w-14 rounded-lg overflow-hidden bg-[var(--card-bg-secondary)] flex-shrink-0">
                      {visit.stadium?.image_url ? (
                        <Image
                          src={visit.stadium.image_url}
                          alt={visit.stadium.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-2xl">
                          {getSportEmoji(visit.stadium?.sport || 'OTHER')}
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-[var(--foreground)] truncate">
                        {visit.stadium?.name}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-[var(--foreground-muted)]">
                        <MapPin className="h-3 w-3" />
                        <span className="truncate">
                          {visit.stadium?.city}, {visit.stadium?.state}
                        </span>
                      </div>
                      <div className="flex items-center flex-wrap gap-2 mt-1">
                        <Badge variant="sport" className="text-xs">
                          {getSportLabel(visit.stadium?.sport || 'OTHER')}
                        </Badge>
                        {visit.event_type && (
                          <span className="text-xs text-[var(--foreground-muted)]">{visit.event_type}</span>
                        )}
                        {visit.section && (
                          <div className="flex items-center gap-1 text-xs text-[var(--foreground-muted)]">
                            <Armchair className="h-3 w-3" />
                            <span>Section {visit.section}</span>
                          </div>
                        )}
                      </div>
                      {visit.notes && (
                        <div className="flex items-start gap-1 mt-1 text-xs text-[var(--foreground-muted)]">
                          <StickyNote className="h-3 w-3 mt-0.5 flex-shrink-0" />
                          <span className="line-clamp-1">{visit.notes}</span>
                        </div>
                      )}
                    </div>

                    {/* Date & Actions */}
                    <div className="flex items-center gap-2">
                      <div className="text-right mr-2">
                        <div className="flex items-center gap-1 text-sm text-[var(--foreground-muted)]">
                          <Calendar className="h-3 w-3" />
                          {format(parseISO(visit.visited_at), 'MMM d, yyyy')}
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleRemove(visit.id, visit.stadium_id);
                        }}
                        disabled={removingId === visit.id}
                        className="p-2 text-[var(--foreground-muted)] hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <ChevronRight className="h-5 w-5 text-[var(--foreground-muted)]" />
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </PageContainer>
  );
}

