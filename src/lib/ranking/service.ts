/**
 * Ranking Service
 *
 * Centralized utilities for ranking calculations, sorting,
 * and display logic used across the application.
 */

import { TIER_ORDER, type InitialTier } from './constants';
import { rankToScore } from './elo';
import type { StadiumRatingWithStadium } from '@/types/database';

/**
 * Ranking information for a stadium
 */
export interface RankInfo {
  overallRank: number;
  sportRank: number;
  sportTotal: number;
  score: number; // 1-10 scale
  tier: InitialTier;
  comparisonsCount: number;
}

/**
 * Sort ratings by tier priority first, then by Elo rating
 * This is the canonical sorting order used throughout the app
 */
export function sortRatingsByTierAndElo(
  ratings: StadiumRatingWithStadium[]
): StadiumRatingWithStadium[] {
  return [...ratings].sort((a, b) => {
    // Sort by tier priority first (higher = better)
    const tierDiff = (TIER_ORDER[b.initial_tier] || 0) - (TIER_ORDER[a.initial_tier] || 0);
    if (tierDiff !== 0) return tierDiff;

    // Then by Elo rating (higher = better)
    return (b.elo_rating || 0) - (a.elo_rating || 0);
  });
}

/**
 * Group ratings by sport
 */
export function groupRatingsBySport(
  ratings: StadiumRatingWithStadium[]
): Record<string, StadiumRatingWithStadium[]> {
  const bySport: Record<string, StadiumRatingWithStadium[]> = {};

  ratings.forEach((rating) => {
    const sport = rating.sport || 'UNKNOWN';
    if (!bySport[sport]) {
      bySport[sport] = [];
    }
    bySport[sport].push(rating);
  });

  // Sort each sport group
  Object.keys(bySport).forEach((sport) => {
    bySport[sport] = sortRatingsByTierAndElo(bySport[sport]);
  });

  return bySport;
}

/**
 * Build a lookup map of stadium IDs to their ranking information
 * This is used to display rankings on stadium cards and lists
 */
export function buildRankingLookup(
  ratings: StadiumRatingWithStadium[]
): Record<string, RankInfo> {
  if (ratings.length === 0) return {};

  // Sort overall ratings
  const sortedOverall = sortRatingsByTierAndElo(ratings);

  // Group by sport for sport-specific ranks
  const bySport = groupRatingsBySport(ratings);

  // Build lookup map
  const map: Record<string, RankInfo> = {};
  const totalCount = sortedOverall.length;

  sortedOverall.forEach((rating, index) => {
    const sport = rating.sport || 'UNKNOWN';
    const sportRatings = bySport[sport] || [];
    const sportRank = sportRatings.findIndex((r) => r.stadium_id === rating.stadium_id) + 1;
    const overallRank = index + 1;

    map[rating.stadium_id] = {
      overallRank,
      sportRank,
      sportTotal: sportRatings.length,
      score: rankToScore(overallRank, totalCount),
      tier: rating.initial_tier,
      comparisonsCount: rating.comparisons_count,
    };
  });

  return map;
}

/**
 * Get ranking information for a specific stadium
 */
export function getStadiumRankInfo(
  stadiumId: string,
  ratings: StadiumRatingWithStadium[]
): RankInfo | null {
  const lookup = buildRankingLookup(ratings);
  return lookup[stadiumId] || null;
}

/**
 * Filter ratings by sport
 */
export function filterRatingsBySport(
  ratings: StadiumRatingWithStadium[],
  sport: string
): StadiumRatingWithStadium[] {
  return ratings.filter((r) => r.sport === sport);
}

/**
 * Get the top N stadiums from rankings
 */
export function getTopStadiums(
  ratings: StadiumRatingWithStadium[],
  count: number
): StadiumRatingWithStadium[] {
  const sorted = sortRatingsByTierAndElo(ratings);
  return sorted.slice(0, count);
}

/**
 * Get stadiums by tier
 */
export function getStadiumsByTier(
  ratings: StadiumRatingWithStadium[],
  tier: InitialTier
): StadiumRatingWithStadium[] {
  return ratings.filter((r) => r.initial_tier === tier);
}

/**
 * Calculate tier distribution for statistics
 */
export interface TierDistribution {
  LOVED: number;
  LIKED: number;
  OKAY: number;
  DISLIKED: number;
}

export function calculateTierDistribution(
  ratings: StadiumRatingWithStadium[]
): TierDistribution {
  const distribution: TierDistribution = {
    LOVED: 0,
    LIKED: 0,
    OKAY: 0,
    DISLIKED: 0,
  };

  ratings.forEach((rating) => {
    distribution[rating.initial_tier]++;
  });

  return distribution;
}

/**
 * Get average Elo rating for a set of stadiums
 */
export function getAverageElo(ratings: StadiumRatingWithStadium[]): number {
  if (ratings.length === 0) return 0;

  const sum = ratings.reduce((acc, r) => acc + (r.elo_rating || 0), 0);
  return Math.round(sum / ratings.length);
}

/**
 * Format rank with ordinal suffix (1st, 2nd, 3rd, etc.)
 */
export function formatRankWithOrdinal(rank: number): string {
  const suffixes = ['th', 'st', 'nd', 'rd'];
  const value = rank % 100;

  return rank + (suffixes[(value - 20) % 10] || suffixes[value] || suffixes[0]);
}

/**
 * Format rank display string (e.g., "#1 of 50")
 */
export function formatRankDisplay(rank: number, total: number): string {
  return `#${rank} of ${total}`;
}

/**
 * Get tier color class for Tailwind
 */
export function getTierColorClass(tier: InitialTier, variant: 'bg' | 'text' | 'border' = 'bg'): string {
  const colors = {
    LOVED: {
      bg: 'bg-pink-500',
      text: 'text-pink-500',
      border: 'border-pink-500',
    },
    LIKED: {
      bg: 'bg-emerald-500',
      text: 'text-emerald-500',
      border: 'border-emerald-500',
    },
    OKAY: {
      bg: 'bg-amber-500',
      text: 'text-amber-500',
      border: 'border-amber-500',
    },
    DISLIKED: {
      bg: 'bg-zinc-500',
      text: 'text-zinc-500',
      border: 'border-zinc-500',
    },
  };

  return colors[tier][variant];
}

/**
 * Get tier label for display
 */
export function getTierLabel(tier: InitialTier): string {
  const labels: Record<InitialTier, string> = {
    LOVED: 'Loved it!',
    LIKED: 'Liked it',
    OKAY: 'It was okay',
    DISLIKED: "Didn't love it",
  };

  return labels[tier];
}

/**
 * Calculate completion percentage for a sport
 */
export function calculateSportCompletion(
  totalStadiums: number,
  visitedStadiums: number
): number {
  if (totalStadiums === 0) return 0;
  return Math.round((visitedStadiums / totalStadiums) * 100);
}

/**
 * Check if a stadium needs more comparisons to have a stable rating
 */
export function needsMoreComparisons(rating: StadiumRatingWithStadium, minComparisons: number = 3): boolean {
  return rating.comparisons_count < minComparisons;
}
