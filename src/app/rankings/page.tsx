'use client';

import { useState } from 'react';
import { Trophy, Trash2 } from 'lucide-react';
import { PageContainer } from '@/components/layout/page-container';
import { EloRankingList } from '@/components/ranking/elo-ranking-list';
import { Button } from '@/components/ui/button';
import { ConfirmationModal } from '@/components/ui/confirmation-modal';
import { useAuth } from '@/hooks/use-auth';
import { usePairwiseRanking } from '@/hooks/use-pairwise-ranking';
import { useConfirmation } from '@/hooks/use-confirmation';
import { Sport } from '@/types/database';
import { getSportEmoji, getSportLabel } from '@/lib/utils';
import Link from 'next/link';

const SPORTS: Array<Sport | 'ALL'> = ['ALL', 'NFL', 'NBA', 'MLB', 'NHL', 'MLS', 'NCAA_FOOTBALL', 'NCAA_BASKETBALL'];

export default function RankingsPage() {
  const { user, loading: authLoading } = useAuth();
  const { ratings, loading, clearAllRankings, removeFromRankings, reorderRankings } = usePairwiseRanking(user?.id);
  const [selectedSport, setSelectedSport] = useState<Sport | 'ALL'>('ALL');
  const [clearing, setClearing] = useState(false);
  const confirmation = useConfirmation();

  async function handleClearRankings() {
    await confirmation.confirm({
      title: 'Clear All Rankings?',
      message: 'Are you sure you want to clear all your rankings? This action cannot be undone.',
      confirmText: 'Clear All',
      variant: 'danger',
      onConfirm: async () => {
        setClearing(true);
        await clearAllRankings();
        setClearing(false);
      },
    });
  }

  async function handleRemoveStadium(stadiumId: string) {
    await confirmation.confirm({
      title: 'Remove Stadium?',
      message: 'Are you sure you want to remove this stadium from your rankings?',
      confirmText: 'Remove',
      variant: 'danger',
      onConfirm: async () => {
        await removeFromRankings(stadiumId);
      },
    });
  }

  async function handleReorder(reorderedRatings: typeof ratings) {
    const result = await reorderRankings(reorderedRatings);
    if (result.error) {
      console.error('Failed to reorder rankings:', result.error);
    }
  }

  if (authLoading || loading) {
    return (
      <PageContainer>
        <div className="space-y-3 pt-4">
          <div className="h-8 w-48 bg-[var(--skeleton)] rounded-lg animate-pulse" />
          <div className="h-5 w-32 bg-[var(--skeleton)] rounded animate-pulse" />
          <div className="h-10 w-full bg-[var(--skeleton)] rounded-xl animate-pulse mt-4" />
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-20 bg-[var(--skeleton)] rounded-xl animate-pulse" />
          ))}
        </div>
      </PageContainer>
    );
  }

  if (!user) {
    return (
      <PageContainer>
        <div className="text-center py-20">
          <div className="w-16 h-16 rounded-2xl bg-[var(--accent-bg)] flex items-center justify-center mx-auto mb-5">
            <Trophy className="h-8 w-8 text-[var(--accent)]" />
          </div>
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-3">
            Sign in to See Your Rankings
          </h2>
          <p className="text-[var(--foreground-muted)] mb-8 max-w-sm mx-auto">
            Create an account to start ranking the stadiums you&apos;ve visited.
          </p>
          <div className="flex gap-3 justify-center">
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

  // Get unique sports that user has rated
  const availableSports = [...new Set(ratings.map((r) => r.sport))];

  // Deduplicate shared venues for the count (e.g. United Center = 1, not 2)
  const uniqueVenueCount = new Set(
    ratings.map((r) => `${r.stadium?.name}||${r.stadium?.city}`)
  ).size;

  return (
    <PageContainer>
      {/* Header */}
      <div className="flex items-center justify-between mb-5 pt-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[var(--foreground)] flex items-center gap-2.5">
            <Trophy className="h-7 w-7 text-[var(--accent)]" />
            My Rankings
          </h1>
          <p className="text-[var(--foreground-muted)] mt-1 text-sm">
            {uniqueVenueCount} stadium{uniqueVenueCount !== 1 ? 's' : ''} ranked
          </p>
        </div>
        {ratings.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearRankings}
            disabled={clearing}
            className="text-red-400/70 hover:text-red-400 hover:bg-red-950/20"
          >
            <Trash2 className="h-4 w-4 mr-1" />
            {clearing ? 'Clearing...' : 'Clear All'}
          </Button>
        )}
      </div>

      {ratings.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-5">🏟️</div>
          <h2 className="text-xl font-bold text-[var(--foreground)] mb-2">No Rankings Yet</h2>
          <p className="text-[var(--foreground-muted)] mb-6 max-w-sm mx-auto">
            Start by exploring stadiums and adding them to your rankings.
          </p>
          <Link href="/stadiums">
            <Button>Browse Stadiums</Button>
          </Link>
        </div>
      ) : (
        <>
          {/* Sport Filter Tabs */}
          <div className="flex gap-2 mb-5 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
            {SPORTS.filter((s) => s === 'ALL' || availableSports.includes(s as Sport)).map((sport) => (
              <button
                key={sport}
                onClick={() => setSelectedSport(sport)}
                className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedSport === sport
                    ? 'bg-[var(--accent-bg)] text-[var(--accent)] ring-1 ring-[var(--accent-ring)]/30'
                    : 'text-[var(--foreground-muted)] hover:text-[var(--foreground-muted)] hover:bg-white/5'
                }`}
              >
                {sport === 'ALL' ? '🏟️ All' : `${getSportEmoji(sport as Sport)} ${getSportLabel(sport as Sport)}`}
              </button>
            ))}
          </div>

          {/* Rankings List */}
          <EloRankingList ratings={ratings} selectedSport={selectedSport} onRemove={handleRemoveStadium} onReorder={handleReorder} />

          {/* CTA */}
          <div className="mt-8 p-5 rounded-2xl text-center border border-[var(--card-border)] bg-[var(--card-bg-secondary)]/60">
            <p className="text-[var(--foreground-muted)] text-sm mb-3">
              Want to rank more stadiums?
            </p>
            <Link href="/stadiums">
              <Button variant="outline" size="sm">
                Explore Stadiums
              </Button>
            </Link>
          </div>
        </>
      )}

      {/* Confirmation Modal */}
      <ConfirmationModal {...confirmation} />
    </PageContainer>
  );
}

