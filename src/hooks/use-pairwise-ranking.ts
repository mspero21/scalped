'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { createClient } from '@/lib/supabase/client';
import { StadiumRatingWithStadium, StadiumRating, Stadium } from '@/types/database';
import { InitialTier, TIER_STARTING_ELO, calculateNewRatings } from '@/lib/ranking/elo';
import { rankingLogger } from '@/lib/logger';

/**
 * Find sibling stadium rows that share the same physical venue (same name + city).
 * e.g. United Center has rows for Bulls (NBA) and Blackhawks (NHL).
 */
async function getSiblingStadiumIds(stadium: Stadium): Promise<Stadium[]> {
  const supabase = createClient();
  const { data } = await supabase
    .from('stadiums')
    .select('*')
    .eq('name', stadium.name)
    .eq('city', stadium.city)
    .neq('id', stadium.id);
  return (data as unknown as Stadium[]) || [];
}

export interface ComparisonState {
  newStadium: Stadium;           // The stadium being added
  compareAgainst: Stadium;       // The existing stadium to compare against
  tier: InitialTier;
  // Binary search bounds (indices into sorted ratings array)
  lowerBound: number;            // Can't be ranked higher than this index
  upperBound: number;            // Can't be ranked lower than this index
  currentIndex: number;          // Index of current comparison stadium
}

export function usePairwiseRanking(userId?: string) {
  const [ratings, setRatings] = useState<StadiumRatingWithStadium[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [comparisonState, setComparisonState] = useState<ComparisonState | null>(null);

  // Use ref to track latest ratings for use in callbacks
  const ratingsRef = useRef<StadiumRatingWithStadium[]>([]);
  ratingsRef.current = ratings;

  const fetchRatings = useCallback(async () => {
    if (!userId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const supabase = createClient();

      const { data, error } = await supabase
        .from('stadium_ratings')
        .select(`*, stadium:stadiums(*)`)
        .eq('user_id', userId)
        .order('elo_rating', { ascending: false });

      if (error) throw error;
      setRatings((data || []) as unknown as StadiumRatingWithStadium[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch ratings');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchRatings();
  }, [fetchRatings]);

  // Get all rankings sorted by position (lower position = better)
  const getRankings = useCallback(() => {
    return [...ratings].sort((a, b) => (a.rank_position || 0) - (b.rank_position || 0));
  }, [ratings]);

  // Check if a stadium has been visited (= has a rating)
  const hasVisited = useCallback((stadiumId: string) => {
    return ratings.some((r) => r.stadium_id === stadiumId);
  }, [ratings]);

  // Get a stadium's rating if it exists
  const getRating = useCallback((stadiumId: string) => {
    return ratings.find((r) => r.stadium_id === stadiumId);
  }, [ratings]);

  // Add a new stadium to rankings (= mark as visited) and start comparison flow
  async function addStadiumToRankings(
    stadium: Stadium,
    initialTier: InitialTier = 'LIKED'
  ): Promise<{ success: boolean; needsComparisons: boolean }> {
    if (!userId) return { success: false, needsComparisons: false };

    try {
      const supabase = createClient();

      // Get starting Elo based on tier
      const startingElo = TIER_STARTING_ELO[initialTier];

      rankingLogger.debug('Adding stadium to rankings', {
        stadium: stadium.name,
        startingElo,
        existingRatings: ratings.length,
      });

      // Insert the rating with Elo-based ranking
      const insertData = {
        user_id: userId,
        stadium_id: stadium.id,
        sport: stadium.sport,
        initial_tier: initialTier,
        comparisons_count: 0,
        elo_rating: startingElo,
        global_elo_rating: startingElo,
      };

      const { data: insertedData, error: insertError } = await supabase
        .from('stadium_ratings')
        .upsert(insertData as never, { onConflict: 'user_id,stadium_id' })
        .select()
        .single();

      if (insertError || !insertedData) {
        rankingLogger.error('Failed to upsert stadium rating', insertError);
        throw insertError || new Error('No data returned');
      }

      rankingLogger.debug('Stadium rating upserted successfully', { stadiumId: stadium.id });

      // Create the full rating object with the stadium data we already have
      const newRating: StadiumRatingWithStadium = {
        ...(insertedData as StadiumRating),
        stadium,
      };

      // Sync siblings (same venue, different team/sport)
      const siblings = await getSiblingStadiumIds(stadium);
      const siblingRatings: StadiumRatingWithStadium[] = [];
      for (const sibling of siblings) {
        const siblingInsert = {
          user_id: userId,
          stadium_id: sibling.id,
          sport: sibling.sport,
          initial_tier: initialTier,
          comparisons_count: 0,
          elo_rating: startingElo,
          global_elo_rating: startingElo,
        };
        const { data: sibData } = await supabase
          .from('stadium_ratings')
          .upsert(siblingInsert as never, { onConflict: 'user_id,stadium_id' })
          .select()
          .single();
        if (sibData) {
          siblingRatings.push({ ...(sibData as StadiumRating), stadium: sibling });
        }
      }

      setRatings((prev) => [...prev, newRating, ...siblingRatings]);

      // Check if comparisons are needed (need at least 1 other stadium)
      const needsComparisons = ratings.length > 0;
      rankingLogger.debug('Checking if comparisons needed', { needsComparisons });

      if (needsComparisons) {
        // Start comparison flow
        rankingLogger.debug('Starting comparison flow');
        startComparisonFlow(stadium, initialTier, ratings);
      }

      return { success: true, needsComparisons };
    } catch (err) {
      rankingLogger.error('Failed to add stadium to rankings', err);
      setError(err instanceof Error ? err.message : 'Failed to add stadium');
      return { success: false, needsComparisons: false };
    }
  }

  // Store sorted ratings for binary search reference
  const sortedRatingsRef = useRef<StadiumRatingWithStadium[]>([]);

  // Start the comparison flow for a new stadium using binary search
  // Only compares within the same tier - different tiers auto-sort by tier priority
  function startComparisonFlow(
    newStadium: Stadium,
    tier: InitialTier,
    allRatings: StadiumRatingWithStadium[]
  ) {
    rankingLogger.debug('Starting comparison flow', {
      newStadium: newStadium.name,
      tier,
      allRatingsCount: allRatings.length,
    });

    if (allRatings.length === 0) {
      rankingLogger.debug('No comparisons needed');
      setComparisonState(null);
      return;
    }

    // Get same-tier ratings, excluding the new stadium itself
    const sameTierRatings = allRatings.filter((r) => r.initial_tier === tier && r.stadium_id !== newStadium.id);
    rankingLogger.debug('Same tier ratings found', { count: sameTierRatings.length });

    if (sameTierRatings.length === 0) {
      // No other stadiums in this tier - auto-place based on tier priority
      rankingLogger.debug('No same-tier stadiums, auto-placing');
      setComparisonState(null);
      return;
    }

    // Sort by Elo rating (or by rank_position if using new schema)
    const hasEloRating = 'elo_rating' in sameTierRatings[0];
    const sorted = hasEloRating
      ? [...sameTierRatings].sort((a, b) => (b.elo_rating || 0) - (a.elo_rating || 0))
      : [...sameTierRatings].sort((a, b) => (a.rank_position || 0) - (b.rank_position || 0));
    sortedRatingsRef.current = sorted;

    rankingLogger.debug('Sorted stadiums for comparison', {
      stadiums: sorted.map(r => ({ name: r.stadium?.name, rating: r.elo_rating || r.rank_position })),
    });

    // Binary search within this pool
    const lowerBound = 0;
    const upperBound = sorted.length - 1;
    const midIndex = Math.floor((lowerBound + upperBound) / 2);
    const compareStadium = sorted[midIndex];

    rankingLogger.debug('First comparison selected', {
      against: compareStadium.stadium?.name,
      index: midIndex,
    });

    const state: ComparisonState = {
      newStadium,
      compareAgainst: compareStadium.stadium,
      tier,
      lowerBound,
      upperBound,
      currentIndex: midIndex,
    };
    setComparisonState(state);
  }

  // Submit a comparison result - update ratings based on winner
  async function submitComparison(winnerId: string): Promise<{ success: boolean }> {
    if (!userId || !comparisonState) return { success: false };

    const { newStadium, compareAgainst, tier, lowerBound, upperBound, currentIndex } = comparisonState;
    const loserId = winnerId === newStadium.id ? compareAgainst.id : newStadium.id;
    const newStadiumWon = winnerId === newStadium.id;

    rankingLogger.debug('Submitting comparison', {
      newStadiumWon,
      bounds: { lower: lowerBound, upper: upperBound, current: currentIndex },
    });

    try {
      const supabase = createClient();

      // Get current ratings
      const winnerRating = ratingsRef.current.find((r) => r.stadium_id === winnerId);
      const loserRating = ratingsRef.current.find((r) => r.stadium_id === loserId);

      if (!winnerRating || !loserRating) throw new Error('Rating not found');

      // Check if using Elo-based schema
      const hasEloRating = 'elo_rating' in winnerRating && winnerRating.elo_rating !== undefined;

      // Insert comparison record
      await supabase.from('comparisons').insert({
        user_id: userId,
        winner_stadium_id: winnerId,
        loser_stadium_id: loserId,
      } as never);

      if (hasEloRating) {
        // Calculate new Elo ratings
        const { winnerNewRating, loserNewRating } = calculateNewRatings(
          winnerRating.elo_rating || 1500,
          loserRating.elo_rating || 1500
        );

        // Update winner's Elo rating
        await supabase
          .from('stadium_ratings')
          .update({
            elo_rating: winnerNewRating,
            global_elo_rating: winnerNewRating,
            comparisons_count: winnerRating.comparisons_count + 1,
            updated_at: new Date().toISOString(),
          } as never)
          .eq('id', winnerRating.id);

        // Update loser's Elo rating
        await supabase
          .from('stadium_ratings')
          .update({
            elo_rating: loserNewRating,
            global_elo_rating: loserNewRating,
            comparisons_count: loserRating.comparisons_count + 1,
            updated_at: new Date().toISOString(),
          } as never)
          .eq('id', loserRating.id);
      } else {
        // Position-based - just update comparison counts for now
        await supabase
          .from('stadium_ratings')
          .update({
            comparisons_count: winnerRating.comparisons_count + 1,
            updated_at: new Date().toISOString(),
          } as never)
          .eq('id', winnerRating.id);

        await supabase
          .from('stadium_ratings')
          .update({
            comparisons_count: loserRating.comparisons_count + 1,
            updated_at: new Date().toISOString(),
          } as never)
          .eq('id', loserRating.id);
      }

      // Sync sibling stadiums (same venue, different team/sport)
      if (hasEloRating) {
        const { winnerNewRating: wElo, loserNewRating: lElo } = calculateNewRatings(
          winnerRating.elo_rating || 1500,
          loserRating.elo_rating || 1500
        );
        const winnerStadium = winnerRating.stadium;
        const loserStadium = loserRating.stadium;
        if (winnerStadium) {
          const winSiblings = await getSiblingStadiumIds(winnerStadium);
          for (const sib of winSiblings) {
            await supabase
              .from('stadium_ratings')
              .update({ elo_rating: wElo, global_elo_rating: wElo, updated_at: new Date().toISOString() } as never)
              .eq('user_id', userId)
              .eq('stadium_id', sib.id);
          }
        }
        if (loserStadium) {
          const loseSiblings = await getSiblingStadiumIds(loserStadium);
          for (const sib of loseSiblings) {
            await supabase
              .from('stadium_ratings')
              .update({ elo_rating: lElo, global_elo_rating: lElo, updated_at: new Date().toISOString() } as never)
              .eq('user_id', userId)
              .eq('stadium_id', sib.id);
          }
        }
      }

      // Refetch ratings to get updated Elo scores
      await fetchRatings();

      // Binary search logic:
      // - If new stadium WON, it should be ranked HIGHER (lower index), so search upper half
      // - If new stadium LOST, it should be ranked LOWER (higher index), so search lower half
      let newLowerBound: number;
      let newUpperBound: number;

      if (newStadiumWon) {
        // New stadium is better than current, search higher ranks (lower indices)
        newLowerBound = lowerBound;
        newUpperBound = currentIndex - 1;
      } else {
        // New stadium is worse than current, search lower ranks (higher indices)
        newLowerBound = currentIndex + 1;
        newUpperBound = upperBound;
      }

      rankingLogger.debug('New bounds after comparison', {
        lower: newLowerBound,
        upper: newUpperBound,
      });

      // Check if we've narrowed down to a position
      if (newLowerBound > newUpperBound) {
        rankingLogger.debug('Binary search complete, position found');
        setComparisonState(null);
        return { success: true };
      }

      // Get next comparison stadium from the middle of new range
      const sorted = sortedRatingsRef.current;
      const nextIndex = Math.floor((newLowerBound + newUpperBound) / 2);
      const nextStadium = sorted[nextIndex];

      if (!nextStadium) {
        rankingLogger.debug('No more stadiums to compare');
        setComparisonState(null);
        return { success: true };
      }

      rankingLogger.debug('Next comparison selected', {
        against: nextStadium.stadium?.name,
        index: nextIndex,
      });
      setComparisonState({
        newStadium,
        compareAgainst: nextStadium.stadium,
        tier,
        lowerBound: newLowerBound,
        upperBound: newUpperBound,
        currentIndex: nextIndex,
      });

      return { success: true };
    } catch (err) {
      rankingLogger.error('Failed to submit comparison', err);
      setError(err instanceof Error ? err.message : 'Failed to submit comparison');
      return { success: false };
    }
  }

  // Skip all remaining comparisons
  function skipComparisons() {
    setComparisonState(null);
  }

  // Clear all rankings for the user
  async function clearAllRankings(): Promise<{ success: boolean }> {
    if (!userId) return { success: false };

    try {
      const supabase = createClient();

      // Delete all comparisons for user
      await supabase.from('comparisons').delete().eq('user_id', userId);

      // Delete all stadium ratings for user
      await supabase.from('stadium_ratings').delete().eq('user_id', userId);

      // Clear local state
      setRatings([]);
      setComparisonState(null);

      return { success: true };
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to clear rankings');
      return { success: false };
    }
  }

  // Remove a single stadium from rankings
  async function removeFromRankings(stadiumId: string): Promise<{ success: boolean; error?: string }> {
    if (!userId) return { success: false, error: 'Not authenticated' };

    try {
      const supabase = createClient();

      // Get the rating being removed
      const ratingToRemove = ratings.find((r) => r.stadium_id === stadiumId);
      if (!ratingToRemove) {
        return { success: false, error: 'Stadium not found in rankings' };
      }

      // Find sibling stadiums to also remove
      const siblings = await getSiblingStadiumIds(ratingToRemove.stadium);
      const allIds = [stadiumId, ...siblings.map(s => s.id)];

      // Delete all comparisons involving this stadium and siblings
      for (const id of allIds) {
        await supabase
          .from('comparisons')
          .delete()
          .eq('user_id', userId)
          .or(`winner_stadium_id.eq.${id},loser_stadium_id.eq.${id}`);
      }

      // Delete the stadium rating and siblings
      for (const id of allIds) {
        await supabase
          .from('stadium_ratings')
          .delete()
          .eq('user_id', userId)
          .eq('stadium_id', id);
      }

      // With Elo, no need to recompute positions - just refetch
      await fetchRatings();

      return { success: true };
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to remove from rankings';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    }
  }

  // Reorder rankings by dragging (manual ordering)
  async function reorderRankings(
    reorderedRatings: StadiumRatingWithStadium[]
  ): Promise<{ success: boolean; error?: string }> {
    if (!userId) return { success: false, error: 'Not authenticated' };

    try {
      const supabase = createClient();

      // Calculate new Elo ratings based on position
      // Higher positions get higher Elo ratings
      // Use a simple linear distribution from 2000 (top) to 1000 (bottom)
      const totalItems = reorderedRatings.length;
      const updates = reorderedRatings.map((rating, index) => {
        // Position 0 (top) gets highest Elo, last position gets lowest
        const newElo = 2000 - (index * 1000) / Math.max(totalItems - 1, 1);
        return {
          id: rating.id,
          stadium_id: rating.stadium_id,
          newElo: Math.round(newElo),
        };
      });

      // Optimistically update local state first for instant feedback
      setRatings(
        reorderedRatings.map((rating, index) => ({
          ...rating,
          elo_rating: updates[index].newElo,
          global_elo_rating: updates[index].newElo,
        }))
      );

      // Update all ratings in the database and sync siblings
      for (const update of updates) {
        const rating = reorderedRatings.find(r => r.id === update.id);
        await supabase
          .from('stadium_ratings')
          .update({
            elo_rating: update.newElo,
            global_elo_rating: update.newElo,
            updated_at: new Date().toISOString(),
          } as never)
          .eq('id', update.id);

        // Sync siblings with same Elo
        if (rating?.stadium) {
          const siblings = await getSiblingStadiumIds(rating.stadium);
          for (const sib of siblings) {
            await supabase
              .from('stadium_ratings')
              .update({
                elo_rating: update.newElo,
                global_elo_rating: update.newElo,
                updated_at: new Date().toISOString(),
              } as never)
              .eq('user_id', userId)
              .eq('stadium_id', sib.id);
          }
        }
      }

      return { success: true };
    } catch (err) {
      // Revert on error
      await fetchRatings();
      const errorMsg = err instanceof Error ? err.message : 'Failed to reorder rankings';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    }
  }

  return {
    ratings,
    loading,
    error,
    comparisonState,
    hasVisited,
    getRating,
    getRankings,
    addStadiumToRankings,
    submitComparison,
    skipComparisons,
    removeFromRankings,
    clearAllRankings,
    reorderRankings,
    refetch: fetchRatings,
  };
}

