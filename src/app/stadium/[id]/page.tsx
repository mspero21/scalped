'use client';

import { use, useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, MapPin, Users, Calendar, Building, CheckCircle2, Bookmark, BookmarkCheck, Star, Loader2, X, Trophy, Trash2, Heart } from 'lucide-react';
import { PageContainer } from '@/components/layout/page-container';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ConfirmationModal } from '@/components/ui/confirmation-modal';
import { TierSelector } from '@/components/ranking/tier-selector';
import { PairwiseComparison } from '@/components/ranking/pairwise-comparison';
import { VisitModal } from '@/components/visits/visit-modal';
import { StadiumImageGallery } from '@/components/stadiums/stadium-image-gallery';
import { FoodSection } from '@/components/stadiums/food-section';
import { TipsSection } from '@/components/stadiums/tips-section';
import { ReviewsSection } from '@/components/stadiums/reviews-section';
import { useStadium } from '@/hooks/use-stadiums';
import { useAuth } from '@/hooks/use-auth';
import { usePairwiseRanking } from '@/hooks/use-pairwise-ranking';
import { useBucketList } from '@/hooks/use-bucket-list';
import { useVisits } from '@/hooks/use-visits';
import { useStadiumImages } from '@/hooks/use-stadium-images';
import { useConfirmation } from '@/hooks/use-confirmation';
import { getSportLabel, formatNumber } from '@/lib/utils';
import { InitialTier, rankToScore } from '@/lib/ranking/elo';
import { getTeamColors, isLightColor } from '@/lib/team-colors';

interface StadiumPageProps {
  params: Promise<{ id: string }>;
}

export default function StadiumPage({ params }: StadiumPageProps) {
  const router = useRouter();
  const { id } = use(params);
  const { stadium, loading, error } = useStadium(id);
  const { images } = useStadiumImages(id);

  // Get team colors for dynamic theming
  const teamColors = stadium?.team_name ? getTeamColors(stadium.team_name) : null;
  const primaryColor = teamColors?.primary || '#b8860b';
  const secondaryColor = teamColors?.secondary || '#8b5a2b';
  const textOnPrimary = isLightColor(primaryColor) ? '#000000' : '#ffffff';
  const { user } = useAuth();
  const {
    ratings,
    hasVisited: hasRating,
    getRating,
    comparisonState,
    addStadiumToRankings,
    submitComparison,
    skipComparisons,
    removeFromRankings
  } = usePairwiseRanking(user?.id);
  const { isInBucketList, toggleItem } = useBucketList(user?.id);
  const { hasVisited, addVisit } = useVisits(user?.id);

  const [showTierSelector, setShowTierSelector] = useState(false);
  const [showVisitModal, setShowVisitModal] = useState(false);
  const [tierLoading, setTierLoading] = useState(false);
  const [comparisonLoading, setComparisonLoading] = useState(false);
  const [removeLoading, setRemoveLoading] = useState(false);
  const [bucketLoading, setBucketLoading] = useState(false);
  const [visitLoading, setVisitLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const confirmation = useConfirmation();

  // hasRating = has ranked this stadium
  // hasVisited = has logged a visit (separate concept)
  const isRanked = hasRating(id);
  const isVisited = hasVisited(id);
  const currentRating = getRating(id);
  const inBucketList = isInBucketList(id);

  // Tier priority order (higher = better)
  const TIER_ORDER: Record<string, number> = {
    LOVED: 4,
    LIKED: 3,
    OKAY: 2,
    DISLIKED: 1,
  };

  // Calculate rank and score for this stadium (overall ranking across all stadiums)
  const rankInfo = useMemo(() => {
    if (!currentRating || !stadium) return null;

    // Get ALL ratings sorted by tier, then global Elo for overall rank
    const allSorted = [...ratings].sort((a, b) => {
      const tierDiff = (TIER_ORDER[b.initial_tier] || 0) - (TIER_ORDER[a.initial_tier] || 0);
      if (tierDiff !== 0) return tierDiff;
      return (b.global_elo_rating || 0) - (a.global_elo_rating || 0);
    });

    const overallRank = allSorted.findIndex((r) => r.stadium_id === id) + 1;
    const overallTotal = ratings.length;

    return {
      rank: overallRank,
      total: overallTotal,
      score: rankToScore(overallRank, overallTotal),
    };
  }, [currentRating, stadium, ratings, id]);

  // Sport-specific rank
  const sportRankInfo = useMemo(() => {
    if (!currentRating || !stadium) return null;
    const sameSport = ratings.filter(r => r.sport === stadium.sport);
    const sorted = [...sameSport].sort((a, b) => {
      const tierDiff = (TIER_ORDER[b.initial_tier] || 0) - (TIER_ORDER[a.initial_tier] || 0);
      if (tierDiff !== 0) return tierDiff;
      return (b.global_elo_rating || 0) - (a.global_elo_rating || 0);
    });
    const sportRank = sorted.findIndex(r => r.stadium_id === id) + 1;
    return { rank: sportRank, total: sameSport.length };
  }, [currentRating, stadium, ratings, id]);

  const tierLabel = currentRating?.initial_tier || '';

  // Open tier selector to add to rankings
  function handleRateStadium() {
    if (!isRanked) {
      setShowTierSelector(true);
    }
  }

  // When user selects a tier, add to rankings (and optionally log a visit)
  async function handleTierSelect(tier: InitialTier, logVisit: boolean) {
    if (!stadium) return;

    setTierLoading(true);
    try {
      const result = await addStadiumToRankings(stadium, tier);
      if (result.success) {
        // Optionally log a visit
        if (logVisit) {
          await addVisit(stadium.id);
        }
        setShowTierSelector(false);
        if (!result.needsComparisons) {
          const msg = logVisit ? 'Added to rankings and logged visit!' : 'Added to your rankings!';
          setMessage({ type: 'success', text: msg });
          setTimeout(() => setMessage(null), 3000);
        }
      }
    } catch {
      setMessage({ type: 'error', text: 'Failed to add to rankings' });
      setTimeout(() => setMessage(null), 3000);
    } finally {
      setTierLoading(false);
    }
  }

  // Open visit modal to log a visit with date
  function handleOpenVisitModal() {
    setShowVisitModal(true);
  }

  // Submit visit with details from modal
  async function handleSubmitVisit(details: { visited_at: string; event_type?: string; notes?: string }) {
    if (!stadium) return;

    setVisitLoading(true);
    try {
      const result = await addVisit(stadium.id, details);
      if (result.success) {
        setShowVisitModal(false);
        setMessage({ type: 'success', text: 'Visit logged!' });
        setTimeout(() => setMessage(null), 3000);
      } else {
        setMessage({ type: 'error', text: result.error || 'Failed to log visit' });
        setTimeout(() => setMessage(null), 3000);
      }
    } finally {
      setVisitLoading(false);
    }
  }

  async function handleComparison(winnerId: string) {
    setComparisonLoading(true);
    try {
      await submitComparison(winnerId);
    } finally {
      setComparisonLoading(false);
    }
  }

  function handleSkipRanking() {
    setShowTierSelector(false);
  }

  async function handleRemoveFromRankings() {
    await confirmation.confirm({
      title: 'Remove Stadium?',
      message: 'Are you sure you want to remove this stadium from your rankings?',
      confirmText: 'Remove',
      variant: 'danger',
      onConfirm: async () => {
        setRemoveLoading(true);
        try {
          await removeFromRankings(id);
        } finally {
          setRemoveLoading(false);
        }
      },
    });
  }

  async function handleBucketListToggle() {
    setBucketLoading(true);
    try {
      const result = await toggleItem(id);
      if (result.success) {
        setMessage({
          type: 'success',
          text: result.added ? 'Added to bucket list!' : 'Removed from bucket list'
        });
        setTimeout(() => setMessage(null), 3000);
      }
    } finally {
      setBucketLoading(false);
    }
  }

  if (loading) {
    return (
      <PageContainer>
        <div className="animate-pulse">
          <div className="h-64 bg-[var(--skeleton)] rounded-2xl mb-6" />
          <div className="h-8 w-64 bg-[var(--skeleton)] rounded mb-2" />
          <div className="h-6 w-48 bg-[var(--skeleton)] rounded mb-4" />
          <div className="h-24 bg-[var(--skeleton)] rounded-xl" />
        </div>
      </PageContainer>
    );
  }

  if (error || !stadium) {
    return (
      <PageContainer>
        <div className="text-center py-16">
          <p className="text-6xl mb-4">🏟️</p>
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">
            Stadium Not Found
          </h2>
          <Link href="/stadiums">
            <Button variant="outline">Back to Stadiums</Button>
          </Link>
        </div>
      </PageContainer>
    );
  }

  const details = [
    { icon: MapPin, label: 'Location', value: `${stadium.city}, ${stadium.state}` },
    { icon: Users, label: 'Capacity', value: formatNumber(stadium.capacity) },
    { icon: Calendar, label: 'Year Built', value: stadium.year_built.toString() },
    { icon: Building, label: 'Roof', value: stadium.roof_type.charAt(0) + stadium.roof_type.slice(1).toLowerCase() },
  ];

  return (
    <PageContainer>
      {/* Back Button - floats over content */}
      <button
        onClick={() => router.back()}
        className="inline-flex items-center gap-2 text-[var(--foreground-muted)] hover:text-[var(--foreground)] mb-4 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        <span className="text-sm">Back</span>
      </button>

      {/* Image Gallery with gradient overlay */}
      <div className="relative mb-5 -mx-4 md:mx-0 md:rounded-2xl overflow-hidden">
        <StadiumImageGallery
          images={images}
          stadiumName={stadium.name}
          sport={stadium.sport}
          fallbackImageUrl={stadium.image_url}
        />
        {/* Gradient overlay at bottom */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[var(--background)] to-transparent pointer-events-none" />
        <span className="absolute top-3 left-3 md:left-3 bg-black/60 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full z-10">
          {getSportLabel(stadium.sport)}
        </span>
        {/* Status badges on image */}
        <div className="absolute top-3 right-3 md:right-3 flex gap-2 z-10">
          {isVisited && (
            <span className="bg-emerald-500/90 backdrop-blur-sm text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3" /> Visited
            </span>
          )}
          {isRanked && (
            <span
              className="backdrop-blur-sm text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1"
              style={{ backgroundColor: `${primaryColor}cc` }}
            >
              <Trophy className="h-3 w-3" /> #{rankInfo?.rank}
            </span>
          )}
        </div>
      </div>

      {/* Stadium Info */}
      <div className="mb-2">
        <h1 className="text-2xl md:text-3xl font-extrabold text-[var(--foreground)] leading-tight">
          {stadium.name}
        </h1>
        <p className="font-semibold text-lg mt-1" style={{ color: primaryColor }}>
          {stadium.team_name}
        </p>
      </div>

      {/* Quick Stats - horizontal scroll on mobile */}
      <div className="flex flex-wrap gap-x-4 gap-y-1.5 mb-5 text-sm text-[var(--foreground-muted)]">
        <span className="flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5" />
          {stadium.city}, {stadium.state}
        </span>
        <span className="flex items-center gap-1.5">
          <Users className="h-3.5 w-3.5" />
          {formatNumber(stadium.capacity)}
        </span>
        <span className="flex items-center gap-1.5">
          <Calendar className="h-3.5 w-3.5" />
          {stadium.year_built}
        </span>
        <span className="flex items-center gap-1.5">
          <Building className="h-3.5 w-3.5" />
          {stadium.roof_type.charAt(0) + stadium.roof_type.slice(1).toLowerCase()}
        </span>
      </div>

      {/* Rank Card - Only show if ranked */}
      {isRanked && rankInfo && (
        <div
          className="rounded-2xl p-4 mb-5 border"
          style={{
            background: `linear-gradient(135deg, ${primaryColor}15, ${secondaryColor}10)`,
            borderColor: `${primaryColor}30`,
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-[var(--foreground-muted)] uppercase tracking-wider">Overall Rank</p>
              <p className="text-3xl font-extrabold text-[var(--foreground)] mt-0.5">#{rankInfo.rank} <span className="text-base font-normal text-[var(--foreground-muted)]">/ {rankInfo.total}</span></p>
            </div>
            {sportRankInfo && (
              <div className="text-right">
                <p className="text-xs font-medium text-[var(--foreground-muted)] uppercase tracking-wider">{getSportLabel(stadium.sport)}</p>
                <p className="text-2xl font-bold text-[var(--foreground)] mt-0.5">#{sportRankInfo.rank} <span className="text-sm font-normal text-[var(--foreground-muted)]">/ {sportRankInfo.total}</span></p>
              </div>
            )}
          </div>
          <div className="mt-3 flex items-center gap-2">
            <span
              className="px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1"
              style={{ backgroundColor: `${primaryColor}25`, color: primaryColor }}
            >
              <Heart className="h-3 w-3 fill-current" /> {tierLabel}
            </span>
          </div>
        </div>
      )}

      {/* Feedback Message */}
      {message && (
        <div
          className="mb-4 p-3 rounded-lg flex items-center justify-between"
          style={{
            backgroundColor: message.type === 'success' ? `${primaryColor}20` : 'rgba(220, 38, 38, 0.2)',
            color: message.type === 'success' ? primaryColor : '#f87171'
          }}
        >
          <span>{message.text}</span>
          <button onClick={() => setMessage(null)} className="p-1 hover:opacity-70">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Action Buttons */}
      {user ? (
        <div className="flex gap-2 mb-6">
          {isRanked ? (
            <Link href="/rankings" className="flex-1">
              <Button
                className="w-full text-white font-semibold shadow-lg"
                style={{ backgroundColor: primaryColor, boxShadow: `0 4px 14px ${primaryColor}40` }}
              >
                <Trophy className="h-4 w-4 mr-2" />
                View in Rankings
              </Button>
            </Link>
          ) : (
            <Button
              className="flex-1 text-white font-semibold shadow-lg"
              onClick={handleRateStadium}
              style={{ backgroundColor: primaryColor, boxShadow: `0 4px 14px ${primaryColor}40` }}
            >
              <Star className="h-4 w-4 mr-2" />
              Rate This Stadium
            </Button>
          )}
          {!isVisited && (
            <Button variant="outline" onClick={handleOpenVisitModal} title="Log a visit">
              <CheckCircle2 className="h-4 w-4" />
            </Button>
          )}
          <Button
            variant="outline"
            onClick={handleBucketListToggle}
            disabled={bucketLoading}
            title={inBucketList ? 'Remove from bucket list' : 'Add to bucket list'}
            style={inBucketList ? { color: primaryColor, borderColor: primaryColor } : {}}
          >
            {bucketLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : (
              <Bookmark className={`h-4 w-4 ${inBucketList ? 'fill-current' : ''}`} />
            )}
          </Button>
          {isRanked && (
            <Button
              variant="outline"
              onClick={handleRemoveFromRankings}
              disabled={removeLoading}
              title="Remove from rankings"
              className="text-red-400 border-red-400/30 hover:bg-red-950/30"
            >
              {removeLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
            </Button>
          )}
        </div>
      ) : (
        <div className="rounded-2xl p-5 mb-6 text-center border border-[var(--card-border)] bg-[var(--card-bg-secondary)]/60">
          <p className="text-[var(--foreground-muted)] mb-3 text-sm">Sign in to rate stadiums and track visits</p>
          <Link href="/login">
            <Button className="text-white font-semibold" style={{ backgroundColor: primaryColor }}>Sign In</Button>
          </Link>
        </div>
      )}

      {/* Tier Selector Modal */}
      {showTierSelector && stadium && (
        <TierSelector
          stadium={stadium}
          onSelect={handleTierSelect}
          onSkip={handleSkipRanking}
          isLoading={tierLoading}
          showVisitOption={!isVisited}
        />
      )}

      {/* Visit Modal */}
      {showVisitModal && stadium && (
        <VisitModal
          stadium={stadium}
          onSubmit={handleSubmitVisit}
          onClose={() => setShowVisitModal(false)}
          isLoading={visitLoading}
        />
      )}

      {/* Pairwise Comparison Modal */}
      {comparisonState && (
        <PairwiseComparison
          newStadium={comparisonState.newStadium}
          compareAgainst={comparisonState.compareAgainst}
          onSelect={handleComparison}
          onSkip={skipComparisons}
          isLoading={comparisonLoading}
        />
      )}

      {/* Food & Drinks Section */}
      <FoodSection stadiumId={id} userId={user?.id} />

      {/* Tips Section */}
      <TipsSection stadiumId={id} userId={user?.id} />

      {/* Reviews Section */}
      <ReviewsSection stadiumId={id} userId={user?.id} />

      {/* Confirmation Modal */}
      <ConfirmationModal {...confirmation} />
    </PageContainer>
  );
}

