'use client';

import { useEffect, useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { StadiumRatingWithStadium, Sport } from '@/types/database';

interface SportProgress {
  sport: Sport;
  label: string;
  emoji: string;
  visited: number;
  total: number;
  percentage: number;
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  emoji: string;
  earned: boolean;
  earnedAt?: string;
}

interface ProfileStats {
  stadiumsVisited: number;
  stadiumsRanked: number;
  bucketListCount: number;
  sportProgress: SportProgress[];
  recentActivity: StadiumRatingWithStadium[];
  achievements: Achievement[];
  memberSince: string | null;
  topRanked: StadiumRatingWithStadium[];
}

const SPORT_CONFIG: { sport: Sport; label: string; emoji: string }[] = [
  { sport: 'NFL', label: 'NFL', emoji: '🏈' },
  { sport: 'NBA', label: 'NBA', emoji: '🏀' },
  { sport: 'MLB', label: 'MLB', emoji: '⚾' },
  { sport: 'NHL', label: 'NHL', emoji: '🏒' },
  { sport: 'MLS', label: 'MLS', emoji: '⚽' },
  { sport: 'NCAA_FOOTBALL', label: 'College Football', emoji: '🏈' },
  { sport: 'NCAA_BASKETBALL', label: 'College Basketball', emoji: '🏀' },
];

export function useProfileStats(userId?: string) {
  const [stats, setStats] = useState<ProfileStats>({
    stadiumsVisited: 0,
    stadiumsRanked: 0,
    bucketListCount: 0,
    sportProgress: [],
    recentActivity: [],
    achievements: [],
    memberSince: null,
    topRanked: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    if (!userId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const supabase = createClient();

      // Fetch all data in parallel
      const [ratingsResult, bucketListResult, stadiumsResult, profileResult] = await Promise.all([
        supabase
          .from('stadium_ratings')
          .select('*, stadium:stadiums(*)')
          .eq('user_id', userId)
          .order('created_at', { ascending: false }),
        supabase
          .from('bucket_list')
          .select('id', { count: 'exact', head: true })
          .eq('user_id', userId),
        supabase
          .from('stadiums')
          .select('id, sport'),
        supabase
          .from('profiles')
          .select('created_at')
          .eq('user_id', userId)
          .single(),
      ]);

      if (ratingsResult.error) throw ratingsResult.error;
      if (bucketListResult.error) throw bucketListResult.error;
      if (stadiumsResult.error) throw stadiumsResult.error;

      const ratings = (ratingsResult.data || []) as StadiumRatingWithStadium[];
      const allStadiums = (stadiumsResult.data || []) as { id: string; sport: string }[];

      // Calculate sport progress
      const sportProgress: SportProgress[] = SPORT_CONFIG.map(({ sport, label, emoji }) => {
        const totalForSport = allStadiums.filter(s => s.sport === sport).length;
        const visitedForSport = ratings.filter(r => r.stadium?.sport === sport).length;
        return {
          sport,
          label,
          emoji,
          visited: visitedForSport,
          total: totalForSport,
          percentage: totalForSport > 0 ? Math.round((visitedForSport / totalForSport) * 100) : 0,
        };
      }).filter(sp => sp.total > 0); // Only show sports with stadiums

      // Generate achievements
      const achievements = generateAchievements(ratings, sportProgress);

      // Get top ranked (sorted by Elo)
      const topRanked = [...ratings]
        .sort((a, b) => (b.elo_rating || 0) - (a.elo_rating || 0))
        .slice(0, 5);

      setStats({
        stadiumsVisited: ratings.length,
        stadiumsRanked: ratings.length,
        bucketListCount: bucketListResult.count || 0,
        sportProgress,
        recentActivity: ratings.slice(0, 5),
        achievements,
        memberSince: (profileResult.data as { created_at: string } | null)?.created_at || null,
        topRanked,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch stats');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return { stats, loading, error, refetch: fetchStats };
}

function generateAchievements(
  ratings: StadiumRatingWithStadium[],
  sportProgress: SportProgress[]
): Achievement[] {
  const achievements: Achievement[] = [];
  const now = new Date().toISOString();

  // First stadium
  achievements.push({
    id: 'first-stadium',
    name: 'First Visit',
    description: 'Visited your first stadium',
    emoji: '🎉',
    earned: ratings.length >= 1,
    earnedAt: ratings.length >= 1 ? ratings[ratings.length - 1]?.created_at : undefined,
  });

  // Milestone achievements
  const milestones = [5, 10, 25, 50, 100];
  milestones.forEach(m => {
    achievements.push({
      id: `visited-${m}`,
      name: `${m} Stadiums`,
      description: `Visited ${m} stadiums`,
      emoji: m >= 50 ? '🏆' : m >= 25 ? '🥇' : m >= 10 ? '🥈' : '🥉',
      earned: ratings.length >= m,
    });
  });

  return achievements;
}

