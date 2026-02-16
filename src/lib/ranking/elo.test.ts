/**
 * Tests for Elo Rating Algorithm
 *
 * Testing the core business logic for stadium rankings.
 * This is critical functionality that must work correctly.
 */

import { describe, it, expect } from 'vitest';
import {
  calculateNewRatings,
  getStartingPosition,
  rankToScore,
  initBinarySearch,
  updateBinarySearch,
  getFinalPosition,
  INITIAL_TIERS,
  TIER_STARTING_ELO,
  type InitialTier,
  type BinarySearchState,
} from './elo';
import { K_FACTOR, BASE_ELO } from './constants';

describe('Elo Algorithm - Core Calculations', () => {
  describe('calculateNewRatings', () => {
    it('should increase winner rating and decrease loser rating', () => {
      const result = calculateNewRatings(1500, 1500);

      expect(result.winnerNewRating).toBeGreaterThan(1500);
      expect(result.loserNewRating).toBeLessThan(1500);
    });

    it('should have symmetric rating changes', () => {
      const result = calculateNewRatings(1500, 1500);
      const increase = result.winnerNewRating - 1500;
      const decrease = 1500 - result.loserNewRating;

      // Rating changes should be equal and opposite
      expect(Math.abs(increase - decrease)).toBeLessThan(0.01);
    });

    it('should give larger rating changes when underdog wins', () => {
      // Lower rated team (1300) beats higher rated team (1700)
      const underdogWins = calculateNewRatings(1300, 1700);
      const underdogGain = underdogWins.winnerNewRating - 1300;

      // Higher rated team (1700) beats lower rated team (1300)
      const favoriteWins = calculateNewRatings(1700, 1300);
      const favoriteGain = favoriteWins.winnerNewRating - 1700;

      // Underdog should gain more points
      expect(underdogGain).toBeGreaterThan(favoriteGain);
    });

    it('should use K-factor of 32', () => {
      // With equal ratings (50% expected), winner should gain exactly K/2 = 16 points
      const result = calculateNewRatings(1500, 1500);
      const gain = result.winnerNewRating - 1500;

      expect(Math.abs(gain - K_FACTOR / 2)).toBeLessThan(0.01);
    });

    it('should handle very different ratings correctly', () => {
      // 2000 vs 1000 (1000 point difference)
      const result = calculateNewRatings(2000, 1000);

      // Winner should gain very little (expected to win)
      const gain = result.winnerNewRating - 2000;
      expect(gain).toBeLessThan(1); // Should gain less than 1 point

      // Loser should lose very little (expected to lose)
      const loss = 1000 - result.loserNewRating;
      expect(loss).toBeLessThan(1);
    });
  });

  describe('getStartingPosition', () => {
    it('should return position near top for LOVED tier', () => {
      const position = getStartingPosition('LOVED', 100);
      // Should start in top 10%
      expect(position).toBeLessThanOrEqual(10);
    });

    it('should return position in upper third for LIKED tier', () => {
      const position = getStartingPosition('LIKED', 100);
      // Should start around top 25%
      expect(position).toBeLessThanOrEqual(25);
    });

    it('should return middle position for OKAY tier', () => {
      const position = getStartingPosition('OKAY', 100);
      // Should start around middle
      expect(position).toBeGreaterThanOrEqual(40);
      expect(position).toBeLessThanOrEqual(60);
    });

    it('should return position in lower third for DISLIKED tier', () => {
      const position = getStartingPosition('DISLIKED', 100);
      // Should start in lower third
      expect(position).toBeGreaterThanOrEqual(70);
    });

    it('should handle empty list', () => {
      const position = getStartingPosition('LOVED', 0);
      expect(position).toBeGreaterThanOrEqual(1);
    });

    it('should have descending starting positions', () => {
      // LOVED should start higher (lower position number) than others
      expect(getStartingPosition('LOVED', 100)).toBeLessThan(getStartingPosition('LIKED', 100));
      expect(getStartingPosition('LIKED', 100)).toBeLessThan(getStartingPosition('OKAY', 100));
      expect(getStartingPosition('OKAY', 100)).toBeLessThan(getStartingPosition('DISLIKED', 100));
    });
  });

  describe('rankToScore', () => {
    it('should convert rank 1 to score 10', () => {
      expect(rankToScore(1, 100)).toBe(10);
    });

    it('should convert last rank to score 1', () => {
      expect(rankToScore(100, 100)).toBe(1);
    });

    it('should return scores between 1 and 10', () => {
      for (let rank = 1; rank <= 100; rank++) {
        const score = rankToScore(rank, 100);
        expect(score).toBeGreaterThanOrEqual(1);
        expect(score).toBeLessThanOrEqual(10);
      }
    });

    it('should be monotonically decreasing', () => {
      const scores = Array.from({ length: 10 }, (_, i) => rankToScore(i + 1, 10));

      for (let i = 1; i < scores.length; i++) {
        expect(scores[i]).toBeLessThanOrEqual(scores[i - 1]);
      }
    });

    it('should handle single stadium', () => {
      expect(rankToScore(1, 1)).toBe(10);
    });

    it('should return mid-range score for middle rank', () => {
      const score = rankToScore(50, 100);
      expect(score).toBeGreaterThan(4);
      expect(score).toBeLessThan(7);
    });
  });
});

describe('Elo Algorithm - Binary Search', () => {
  describe('initBinarySearch', () => {
    it('should initialize with tier-based starting position', () => {
      const state = initBinarySearch('LOVED', 100);

      // Should start near top for LOVED (upper half, so position <= 50)
      expect(state.currentPosition).toBeLessThanOrEqual(50);
      expect(state.low).toBeDefined();
      expect(state.high).toBeDefined();
    });

    it('should initialize for DISLIKED at lower position', () => {
      const state = initBinarySearch('DISLIKED', 100);

      // Should start near bottom for DISLIKED
      expect(state.currentPosition).toBeGreaterThan(50);
    });

    it('should handle empty list', () => {
      const state = initBinarySearch('LOVED', 0);

      expect(state.currentPosition).toBeGreaterThanOrEqual(0);
    });

    it('should set proper search bounds', () => {
      const state = initBinarySearch('OKAY', 50);

      // low should be less than or equal to current
      expect(state.low).toBeLessThanOrEqual(state.currentPosition);
      // high should be greater than or equal to current
      expect(state.high).toBeGreaterThanOrEqual(state.currentPosition);
    });
  });

  describe('updateBinarySearch', () => {
    it('should move search window up when new stadium wins', () => {
      const initial = initBinarySearch('OKAY', 20);
      const startPos = initial.currentPosition;

      const updated = updateBinarySearch(initial, true);

      // New stadium won, so it should rank higher (lower index)
      // New high should be less than or equal to currentPosition
      expect(updated.high).toBeLessThanOrEqual(startPos);
    });

    it('should move search window down when new stadium loses', () => {
      const initial = initBinarySearch('OKAY', 20);
      const startPos = initial.currentPosition;

      const updated = updateBinarySearch(initial, false);

      // New stadium lost, so it should rank lower (higher index)
      // New low should be greater than or equal to currentPosition
      expect(updated.low).toBeGreaterThanOrEqual(startPos);
    });

    it('should converge the search window', () => {
      let state = initBinarySearch('OKAY', 20);
      const initialWindow = state.high - state.low;

      // Simulate a series of comparisons
      state = updateBinarySearch(state, true);  // Won, search higher
      state = updateBinarySearch(state, false); // Lost, search lower
      state = updateBinarySearch(state, true);  // Won, search higher

      // Search window should be narrower
      const finalWindow = state.high - state.low;
      expect(finalWindow).toBeLessThanOrEqual(initialWindow);
    });
  });


  describe('getFinalPosition', () => {
    it('should return current position when new stadium won', () => {
      const state: BinarySearchState = {
        low: 2,
        high: 2,
        currentPosition: 2,
      };

      const position = getFinalPosition(state, true);

      expect(position).toBe(2);
    });

    it('should return position+1 when new stadium lost', () => {
      const state: BinarySearchState = {
        low: 2,
        high: 2,
        currentPosition: 2,
      };

      const position = getFinalPosition(state, false);

      expect(position).toBe(3);
    });

    it('should insert at beginning when winning all comparisons', () => {
      const state: BinarySearchState = {
        low: 0,
        high: 0,
        currentPosition: 0,
      };

      const position = getFinalPosition(state, true);

      expect(position).toBe(0);
    });

    it('should insert at end when losing all comparisons', () => {
      const state: BinarySearchState = {
        low: 9,
        high: 9,
        currentPosition: 9,
      };

      const position = getFinalPosition(state, false);

      expect(position).toBe(10);
    });
  });
});

describe('Elo Algorithm - Integration Tests', () => {
  describe('Complete ranking workflow', () => {
    it('should converge binary search to a position', () => {
      // Start with OKAY tier in a list of 10 stadiums
      let state: BinarySearchState | null = initBinarySearch('OKAY', 10);

      // Simulate comparisons until search converges
      let iterations = 0;
      const maxIterations = 10; // Safety limit

      while (state && state.low < state.high && iterations < maxIterations) {
        // Simulate winning half the time
        const won = iterations % 2 === 0;
        state = updateBinarySearch(state, won);
        iterations++;
      }

      // Should have converged (state is null or low >= high)
      expect(iterations).toBeLessThan(maxIterations);
      if (state) {
        expect(state.low).toBeLessThanOrEqual(state.high + 1);
      }
    });

    it('should require logarithmic comparisons for binary search', () => {
      const stadiumCount = 16; // 2^4
      let state = initBinarySearch('OKAY', stadiumCount);
      let comparisons = 0;

      // Simulate binary search until complete
      while (state.low < state.high) {
        comparisons++;
        // Simulate always winning (will end up near top)
        state = updateBinarySearch(state, true);

        // Safety limit
        if (comparisons > 20) break;
      }

      // Should need at most log2(16) + buffer = ~5 comparisons
      expect(comparisons).toBeLessThanOrEqual(Math.ceil(Math.log2(stadiumCount)) + 2);
    });
  });

  describe('Tier constants', () => {
    it('should have all four tiers defined', () => {
      const tierKeys = Object.keys(INITIAL_TIERS) as InitialTier[];
      expect(tierKeys).toHaveLength(4);
      expect(tierKeys).toContain('LOVED');
      expect(tierKeys).toContain('LIKED');
      expect(tierKeys).toContain('OKAY');
      expect(tierKeys).toContain('DISLIKED');
    });

    it('should have starting Elo for all tiers', () => {
      const tierKeys = Object.keys(INITIAL_TIERS) as InitialTier[];
      tierKeys.forEach(tier => {
        expect(TIER_STARTING_ELO[tier]).toBeDefined();
        expect(typeof TIER_STARTING_ELO[tier]).toBe('number');
      });
    });

    it('should have tier Elos in descending order', () => {
      expect(TIER_STARTING_ELO.LOVED).toBeGreaterThan(TIER_STARTING_ELO.LIKED);
      expect(TIER_STARTING_ELO.LIKED).toBeGreaterThan(TIER_STARTING_ELO.OKAY);
      expect(TIER_STARTING_ELO.OKAY).toBeGreaterThan(TIER_STARTING_ELO.DISLIKED);
    });
  });
});

describe('Elo Algorithm - Edge Cases', () => {
  it('should handle identical ratings', () => {
    const result = calculateNewRatings(1500, 1500);

    // Each player has 50% chance, so K/2 points exchanged
    expect(result.winnerNewRating).toBeCloseTo(1500 + K_FACTOR / 2, 0);
    expect(result.loserNewRating).toBeCloseTo(1500 - K_FACTOR / 2, 0);
  });

  it('should handle extreme rating differences', () => {
    const result = calculateNewRatings(2500, 500);

    // Winner gains almost nothing
    expect(result.winnerNewRating - 2500).toBeLessThan(0.1);
    // Loser loses almost nothing
    expect(500 - result.loserNewRating).toBeLessThan(0.1);
  });

  it('should handle rank 0 by treating it as rank 1', () => {
    const score = rankToScore(0, 100);
    // Should be clamped or handled gracefully, approximately 10
    expect(score).toBeGreaterThan(9);
  });

  it('should handle rank greater than total by treating as last', () => {
    const score = rankToScore(150, 100);
    // Should be clamped to minimum score (approximately 1)
    expect(score).toBeLessThan(2);
  });

  it('should handle binary search with 2 stadiums', () => {
    const state = initBinarySearch('OKAY', 2);

    // With 2 stadiums, search bounds should be reasonable (1-3 since new item can go at end)
    expect(state.low).toBeGreaterThanOrEqual(1);
    expect(state.high).toBeLessThanOrEqual(3); // Can be existingCount + 1
    expect(state.currentPosition).toBeGreaterThanOrEqual(1);
    expect(state.currentPosition).toBeLessThanOrEqual(3);
  });
});
