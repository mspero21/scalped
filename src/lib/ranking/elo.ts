/**
 * Elo-Based Ranking Algorithm for Stadium Rankings
 *
 * Uses the Elo rating system to rank stadiums based on pairwise comparisons.
 * Each stadium starts with a base rating (modified by initial tier).
 * Comparisons update ratings using the standard Elo formula.
 */

import {
  K_FACTOR,
  BASE_ELO,
  ELO_DIVISOR,
  INITIAL_TIERS,
  TIER_STARTING_ELO,
  type InitialTier,
} from './constants';

// Re-export for backward compatibility
export { INITIAL_TIERS, TIER_STARTING_ELO, type InitialTier };

/**
 * Calculate expected score (probability of winning) for player A
 * Uses standard Elo formula with configurable divisor
 */
function getExpectedScore(ratingA: number, ratingB: number): number {
  return 1 / (1 + Math.pow(10, (ratingB - ratingA) / ELO_DIVISOR));
}

/**
 * Calculate new ratings after a comparison
 * @param winnerRating - Current Elo rating of winner
 * @param loserRating - Current Elo rating of loser
 * @returns Object with new ratings for winner and loser
 */
export function calculateNewRatings(
  winnerRating: number,
  loserRating: number
): { winnerNewRating: number; loserNewRating: number } {
  const expectedWinner = getExpectedScore(winnerRating, loserRating);
  const expectedLoser = 1 - expectedWinner;

  // Winner gets +K * (1 - expected), loser gets -K * expected
  const winnerNewRating = Math.round(winnerRating + K_FACTOR * (1 - expectedWinner));
  const loserNewRating = Math.round(loserRating + K_FACTOR * (0 - expectedLoser));

  return { winnerNewRating, loserNewRating };
}

/**
 * Convert rank position to a 1-10 score
 * #1 = 10, last place = 1, linearly interpolated
 */
export function rankToScore(rank: number, total: number): number {
  if (total <= 1) return 10; // Only one item = 10/10
  // Linear interpolation: rank 1 = 10, rank total = 1
  const score = 10 - ((rank - 1) / (total - 1)) * 9;
  return Math.round(score * 10) / 10;
}

/**
 * Get the starting position estimate based on tier and existing count
 * This determines where in the list to start the binary search
 */
export function getStartingPosition(tier: InitialTier, existingCount: number): number {
  if (existingCount === 0) return 1;

  switch (tier) {
    case 'LOVED':
      // Start near top (position 1-2)
      return Math.max(1, Math.floor(existingCount * 0.1));
    case 'LIKED':
      // Start in upper third
      return Math.max(1, Math.floor(existingCount * 0.25));
    case 'OKAY':
      // Start in middle
      return Math.max(1, Math.floor(existingCount * 0.5));
    case 'DISLIKED':
      // Start in lower third
      return Math.max(1, Math.floor(existingCount * 0.75));
    default:
      return Math.floor(existingCount / 2) + 1;
  }
}

/**
 * Determine how many comparisons are needed based on the number of existing stadiums
 * Uses binary search principle: ceil(log2(n)) comparisons to find exact position
 */
export function getRequiredComparisons(existingCount: number): number {
  if (existingCount === 0) return 0;
  if (existingCount === 1) return 1;

  // Binary search needs ceil(log2(n)) comparisons
  return Math.ceil(Math.log2(existingCount + 1));
}

/**
 * Binary search state for finding the correct position
 */
export interface BinarySearchState {
  low: number;      // Current lower bound (inclusive)
  high: number;     // Current upper bound (inclusive)
  currentPosition: number;  // Position of stadium we're comparing against
}

/**
 * Initialize binary search bounds based on tier
 */
export function initBinarySearch(tier: InitialTier, existingCount: number): BinarySearchState {
  if (existingCount === 0) {
    return { low: 1, high: 1, currentPosition: 1 };
  }

  // Start with full range but bias based on tier
  let low = 1;
  let high = existingCount + 1; // +1 because new item could go at the end

  // Narrow initial range based on tier (optimization)
  switch (tier) {
    case 'LOVED':
      high = Math.min(high, Math.ceil(existingCount * 0.5) + 1);
      break;
    case 'DISLIKED':
      low = Math.max(1, Math.floor(existingCount * 0.5));
      break;
  }

  const currentPosition = Math.floor((low + high) / 2);

  return { low, high, currentPosition };
}

/**
 * Update binary search bounds based on comparison result
 * @param state - Current binary search state
 * @param newStadiumWon - True if the new stadium was picked as better
 * @returns Updated state, or null if search is complete
 */
export function updateBinarySearch(
  state: BinarySearchState,
  newStadiumWon: boolean
): BinarySearchState | null {
  let { low, high, currentPosition } = state;

  if (newStadiumWon) {
    // New stadium is better, so it should be ranked higher (lower number)
    high = currentPosition - 1;
  } else {
    // Existing stadium is better, new stadium goes lower (higher number)
    low = currentPosition + 1;
  }

  // Search complete when bounds converge
  if (low > high) {
    return null;
  }

  // Next comparison target is middle of remaining range
  currentPosition = Math.floor((low + high) / 2);

  return { low, high, currentPosition };
}

/**
 * Get the final insertion position when binary search is complete
 */
export function getFinalPosition(state: BinarySearchState, newStadiumWon: boolean): number {
  if (newStadiumWon) {
    // New stadium won against current position, insert at that position
    return state.currentPosition;
  } else {
    // New stadium lost, insert after current position
    return state.currentPosition + 1;
  }
}

