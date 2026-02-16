'use client';

import { cn } from '@/lib/utils';

interface LeagueFilterProps {
  leagues: string[];
  selected: string | 'ALL';
  onChange: (league: string | 'ALL') => void;
}

export function LeagueFilter({ leagues, selected, onChange }: LeagueFilterProps) {
  if (leagues.length === 0) return null;

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
      <button
        onClick={() => onChange('ALL')}
        className={cn(
          'px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all',
          selected === 'ALL'
            ? 'bg-[var(--accent)] text-white'
            : 'bg-[var(--card-bg)] text-[var(--foreground-muted)] hover:bg-[var(--card-hover)]'
        )}
      >
        All Leagues
      </button>
      {leagues.map((league) => (
        <button
          key={league}
          onClick={() => onChange(league)}
          className={cn(
            'px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all',
            selected === league
              ? 'bg-[var(--accent)] text-white'
              : 'bg-[var(--card-bg)] text-[var(--foreground-muted)] hover:bg-[var(--card-hover)]'
          )}
        >
          {league}
        </button>
      ))}
    </div>
  );
}
