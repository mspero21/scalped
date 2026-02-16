'use client';

import { cn } from '@/lib/utils';
import { getSportEmoji, getSportLabel, ALL_SPORTS } from '@/lib/utils';
import { Sport } from '@/types/database';

export type SportFilterValue = Sport | 'ALL' | 'BIG4' | 'SUGGESTED';

// Primary sports shown by default (Suggested first, then BIG4, then individual sports)
const primarySports: SportFilterValue[] = ['SUGGESTED', 'BIG4', 'NFL', 'NBA', 'MLB', 'NHL', 'MLS', 'SOCCER'];

// All sports for expanded view
const allSports: SportFilterValue[] = ['SUGGESTED', 'BIG4', 'ALL', ...ALL_SPORTS] as SportFilterValue[];

interface SportFilterProps {
  selected: SportFilterValue;
  onChange: (sport: SportFilterValue) => void;
  expanded?: boolean;
}

export function SportFilter({ selected, onChange, expanded = false }: SportFilterProps) {
  const sportsToShow = expanded ? allSports : primarySports;

  const getLabel = (sport: SportFilterValue) => {
    if (sport === 'SUGGESTED') return 'For You';
    if (sport === 'BIG4') return 'Big 4';
    if (sport === 'ALL') return 'All Sports';
    return getSportLabel(sport);
  };

  const getEmoji = (sport: SportFilterValue) => {
    if (sport === 'SUGGESTED') return '⭐';
    if (sport === 'BIG4') return '🏆';
    if (sport === 'ALL') return null;
    return getSportEmoji(sport);
  };

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
      {sportsToShow.map((sport) => (
        <button
          key={sport}
          onClick={() => onChange(sport)}
          className={cn(
            'flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all',
            selected === sport
              ? 'bg-[var(--accent)] text-white'
              : 'bg-[var(--card-bg)] text-[var(--foreground-muted)] hover:bg-[var(--card-hover)]'
          )}
        >
          {getEmoji(sport) && <span>{getEmoji(sport)}</span>}
          <span>{getLabel(sport)}</span>
        </button>
      ))}
    </div>
  );
}

// Expanded sport filter with categories
export function SportFilterExpanded({ selected, onChange }: SportFilterProps) {
  const getLabel = (sport: SportFilterValue) => {
    if (sport === 'SUGGESTED') return 'For You';
    if (sport === 'BIG4') return 'Big 4';
    if (sport === 'ALL') return 'All Sports';
    return getSportLabel(sport);
  };

  const getEmoji = (sport: SportFilterValue) => {
    if (sport === 'SUGGESTED') return '⭐';
    if (sport === 'BIG4') return '🏆';
    if (sport === 'ALL') return null;
    return getSportEmoji(sport);
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
        {allSports.map((sport) => (
          <button
            key={sport}
            onClick={() => onChange(sport)}
            className={cn(
              'flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all',
              selected === sport
                ? 'bg-[var(--accent)] text-white'
                : 'bg-[var(--card-bg)] text-[var(--foreground-muted)] hover:bg-[var(--card-hover)]'
            )}
          >
            {getEmoji(sport) && <span>{getEmoji(sport)}</span>}
            <span>{getLabel(sport)}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
