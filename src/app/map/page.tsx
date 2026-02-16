'use client';

import { useState } from 'react';
import { Globe as GlobeIcon } from 'lucide-react';
import { PageContainer } from '@/components/layout/page-container';
import { Button } from '@/components/ui/button';
import { StadiumGlobe } from '@/components/map/stadium-globe';
import { Sport } from '@/types/database';
import { getSportEmoji, getSportLabel } from '@/lib/utils';

const SPORTS: Array<Sport | 'ALL'> = ['ALL', 'NFL', 'NBA', 'MLB', 'NHL', 'MLS', 'NCAA_FOOTBALL', 'NCAA_BASKETBALL'];

export default function MapPage() {
  const [selectedSport, setSelectedSport] = useState<Sport | 'ALL'>('ALL');

  return (
    <PageContainer>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-[var(--foreground)] flex items-center gap-2">
          <GlobeIcon className="h-7 w-7 text-blue-500" />
          Stadium Globe
        </h1>
        <p className="text-[var(--foreground-muted)] mt-1">
          Explore stadiums around the world
        </p>
      </div>

      {/* Sport Filter */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2 -mx-4 px-4">
        {SPORTS.map((sport) => (
          <Button
            key={sport}
            variant={selectedSport === sport ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setSelectedSport(sport)}
            className="flex-shrink-0"
          >
            {sport === 'ALL' ? '🌍 All' : `${getSportEmoji(sport)} ${getSportLabel(sport)}`}
          </Button>
        ))}
      </div>

      {/* Globe */}
      <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] rounded-xl overflow-hidden border border-[var(--card-border)] bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950">
        <StadiumGlobe selectedSport={selectedSport} />
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap items-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-500" />
          <span className="text-[var(--foreground-muted)]">Visited</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <span className="text-[var(--foreground-muted)]">Not Visited</span>
        </div>
        <div className="flex items-center gap-2 text-[var(--foreground-muted)] text-xs ml-auto">
          <GlobeIcon className="h-3 w-3" />
          <span>Click and drag to rotate • Scroll to zoom • Click marker for details</span>
        </div>
      </div>
    </PageContainer>
  );
}
