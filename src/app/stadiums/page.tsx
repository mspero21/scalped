'use client';

import { useState, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';
import { PageContainer } from '@/components/layout/page-container';
import { StadiumCard } from '@/components/stadiums/stadium-card';
import { SportFilter, SportFilterValue } from '@/components/stadiums/sport-filter';
import { LeagueFilter } from '@/components/stadiums/league-filter';
import { Sport, Stadium } from '@/types/database';
import { useStadiums } from '@/hooks/use-stadiums';
import { useAuth } from '@/hooks/use-auth';
import { useFavoriteTeam } from '@/hooks/use-favorite-team';
import { usePairwiseRanking } from '@/hooks/use-pairwise-ranking';
import { buildRankingLookup } from '@/lib/ranking/service';

const VALID_SPORTS: SportFilterValue[] = ['ALL', 'BIG4', 'SUGGESTED', 'NFL', 'NBA', 'MLB', 'NHL', 'MLS', 'NCAA_FOOTBALL', 'NCAA_BASKETBALL', 'SOCCER', 'RUGBY', 'CRICKET', 'AFL', 'OTHER'];
const BIG4_SPORTS: Sport[] = ['NFL', 'NBA', 'MLB', 'NHL'];

function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 3959; // Earth radius in miles
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function findReferenceLocation(allStadiums: Stadium[], favoriteTeamName: string): { lat: number; lng: number } | null {
  // 1. Try the team's own stadium
  const homeStadiums = allStadiums.filter(
    s => s.team_name.toLowerCase() === favoriteTeamName.toLowerCase()
  );
  for (const s of homeStadiums) {
    if (s.latitude && s.longitude) return { lat: s.latitude, lng: s.longitude };
  }

  // 2. No coords on the team's stadium — find any stadium in the same city/state that has coords
  const home = homeStadiums[0];
  if (!home) return null;

  if (home.city) {
    const sameCity = allStadiums.find(
      s => s.city?.toLowerCase() === home.city.toLowerCase()
        && s.state?.toLowerCase() === home.state?.toLowerCase()
        && s.latitude && s.longitude
    );
    if (sameCity) return { lat: sameCity.latitude!, lng: sameCity.longitude! };
  }

  // 3. Fall back to same state
  if (home.state) {
    const sameState = allStadiums.find(
      s => s.state?.toLowerCase() === home.state?.toLowerCase()
        && s.latitude && s.longitude
    );
    if (sameState) return { lat: sameState.latitude!, lng: sameState.longitude! };
  }

  return null;
}

function getSuggestedStadiums(allStadiums: Stadium[], favoriteTeamName: string | null): Stadium[] {
  if (!favoriteTeamName) {
    return allStadiums;
  }

  // Favorite team's own stadiums always come first
  const teamStadiums = allStadiums.filter(
    s => s.team_name.toLowerCase() === favoriteTeamName.toLowerCase()
  );
  const otherStadiums = allStadiums.filter(
    s => s.team_name.toLowerCase() !== favoriteTeamName.toLowerCase()
  );

  const ref = findReferenceLocation(allStadiums, favoriteTeamName);
  if (!ref) {
    return [...teamStadiums, ...otherStadiums];
  }

  // Sort the remaining stadiums by distance
  const withDistance = otherStadiums.map(s => ({
    stadium: s,
    distance: (s.latitude && s.longitude)
      ? haversineDistance(ref.lat, ref.lng, s.latitude, s.longitude)
      : Infinity,
  }));
  withDistance.sort((a, b) => a.distance - b.distance);

  return [...teamStadiums, ...withDistance.map(w => w.stadium)];
}

export default function StadiumsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get sport from URL, default to 'SUGGESTED'
  const sportParam = searchParams.get('sport');
  const selectedSport: SportFilterValue = VALID_SPORTS.includes(sportParam as SportFilterValue)
    ? (sportParam as SportFilterValue)
    : 'SUGGESTED';

  const [selectedLeague, setSelectedLeague] = useState<string | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAllSports, setShowAllSports] = useState(false);

  const { teamName: favoriteTeamName } = useFavoriteTeam();

  // For SUGGESTED/BIG4 or when searching, fetch ALL so we can filter/sort client-side
  const fetchSport = searchQuery.trim() || selectedSport === 'SUGGESTED'
    ? 'ALL'
    : (selectedSport === 'BIG4' ? BIG4_SPORTS : selectedSport);
  const { stadiums, loading, error } = useStadiums(fetchSport);
  const { user } = useAuth();
  const { ratings } = usePairwiseRanking(user?.id);

  // Use centralized ranking service for consistent sorting and lookup
  const visitedStadiums = useMemo(() => buildRankingLookup(ratings), [ratings]);

  // Get unique leagues from current stadiums
  const availableLeagues = useMemo(() => {
    const leagueSet = new Set<string>();
    stadiums.forEach((stadium) => {
      if (stadium.league) {
        leagueSet.add(stadium.league);
      }
    });
    return Array.from(leagueSet).sort();
  }, [stadiums]);

  // Reset league filter when sport changes and update URL
  const handleSportChange = (sport: SportFilterValue) => {
    setSelectedLeague('ALL');
    if (sport === 'SUGGESTED') {
      router.push('/stadiums', { scroll: false }); // SUGGESTED is the default
    } else if (sport === 'ALL') {
      router.push('/stadiums?sport=ALL', { scroll: false });
    } else {
      router.push(`/stadiums?sport=${sport}`, { scroll: false });
    }
  };

  // For SUGGESTED, compute proximity-sorted stadiums
  const suggestedStadiums = useMemo(
    () => selectedSport === 'SUGGESTED' ? getSuggestedStadiums(stadiums, favoriteTeamName) : [],
    [stadiums, favoriteTeamName, selectedSport]
  );

  const filteredStadiums = useMemo(() => {
    let filtered = selectedSport === 'SUGGESTED' ? suggestedStadiums : stadiums;

    // Filter by league if selected
    if (selectedLeague !== 'ALL') {
      filtered = filtered.filter((stadium) => stadium.league === selectedLeague);
    }

    // Filter and sort by search query — stadium name matches first
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (stadium) =>
          stadium.name.toLowerCase().includes(query) ||
          stadium.team_name.toLowerCase().includes(query) ||
          stadium.city.toLowerCase().includes(query) ||
          stadium.state.toLowerCase().includes(query)
      );
      filtered = [...filtered].sort((a, b) => {
        const aName = a.name.toLowerCase().includes(query) ? 0 : 1;
        const bName = b.name.toLowerCase().includes(query) ? 0 : 1;
        if (aName !== bName) return aName - bName;
        const aTeam = a.team_name.toLowerCase().includes(query) ? 0 : 1;
        const bTeam = b.team_name.toLowerCase().includes(query) ? 0 : 1;
        return aTeam - bTeam;
      });
    }

    return filtered;
  }, [stadiums, suggestedStadiums, selectedSport, selectedLeague, searchQuery]);

  return (
    <PageContainer>
      <div className="py-4">
        <h1 className="text-2xl md:text-3xl font-bold text-[var(--foreground)] mb-4">
          Explore Stadiums
        </h1>
        
        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[var(--foreground-muted)]" />
          <input
            type="text"
            placeholder="Search all stadiums, teams, or cities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl text-[var(--foreground)] placeholder:text-[var(--foreground-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-ring)] focus:border-transparent"
          />
        </div>

        {/* Sport Filter */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <SportFilter
              selected={selectedSport}
              onChange={handleSportChange}
              expanded={showAllSports}
            />
            <button
              onClick={() => setShowAllSports(!showAllSports)}
              className="flex-shrink-0 p-2 rounded-full bg-[var(--card-bg)] text-[var(--foreground-muted)] hover:bg-[var(--card-hover)] transition-colors"
              title={showAllSports ? 'Show fewer sports' : 'Show all sports'}
            >
              {showAllSports ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
          </div>

          {/* League Filter - shows when there are multiple leagues */}
          {availableLeagues.length > 1 && (
            <LeagueFilter
              leagues={availableLeagues}
              selected={selectedLeague}
              onChange={setSelectedLeague}
            />
          )}
        </div>
      </div>

      {/* Stadium Grid */}
      <div className="py-4">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-72 bg-[var(--skeleton)] rounded-2xl animate-pulse"
              />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500">Error: {error}</p>
          </div>
        ) : filteredStadiums.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-6xl mb-4">🏟️</p>
            <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">
              No stadiums found
            </h3>
            <p className="text-[var(--foreground-muted)]">
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {filteredStadiums.map((stadium) => {
              const rankInfo = visitedStadiums[stadium.id];
              return (
                <StadiumCard
                  key={stadium.id}
                  stadium={stadium}
                  hasVisited={!!rankInfo}
                  rankInfo={rankInfo}
                />
              );
            })}
          </div>
        )}
      </div>

      {!loading && filteredStadiums.length > 0 && (
        <div className="text-center py-4 text-sm text-[var(--foreground-muted)]">
          Showing {filteredStadiums.length} stadium{filteredStadiums.length !== 1 ? 's' : ''}
        </div>
      )}
    </PageContainer>
  );
}

