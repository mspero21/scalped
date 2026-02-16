'use client';

import Image from 'next/image';
import { X, Trophy, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Stadium } from '@/types/database';
import { getSportEmoji } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface PairwiseComparisonProps {
  newStadium: Stadium;           // The stadium being added
  compareAgainst: Stadium;       // The existing stadium to compare against
  isCrossSport?: boolean;        // Whether comparing across sports
  onSelect: (winnerId: string) => void;
  onSkip: () => void;
  isLoading?: boolean;
}

export function PairwiseComparison({
  newStadium,
  compareAgainst,
  isCrossSport: isCrossSportProp,
  onSelect,
  onSkip,
  isLoading = false,
}: PairwiseComparisonProps) {
  const isCrossSport = isCrossSportProp ?? (newStadium.sport !== compareAgainst.sport);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 no-overscroll">
      <Card className="w-full max-w-2xl overflow-hidden rounded-t-3xl sm:rounded-2xl max-h-[95vh] sm:max-h-none overflow-y-auto">
        {/* Header */}
        <div className="bg-[var(--accent)] px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-white" />
              <h2 className="text-lg font-semibold text-white">Which stadium did you prefer?</h2>
            </div>
            <button
              onClick={onSkip}
              className="text-white/80 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <p className="text-white/80 text-sm mt-1">
            {isCrossSport
              ? 'Comparing across sports to refine your global ranking'
              : 'Pick your favorite to set your ranking'
            }
          </p>
        </div>

        {/* Comparison Cards */}
        <div className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <StadiumOption
              stadium={newStadium}
              onSelect={() => onSelect(newStadium.id)}
              isLoading={isLoading}
              isNew
            />

            <div className="flex items-center justify-center">
              <div className="hidden sm:flex h-full items-center">
                <span className="text-[var(--foreground-muted)] font-bold text-xl">VS</span>
              </div>
              <div className="sm:hidden py-2">
                <span className="text-[var(--foreground-muted)] font-bold text-lg">VS</span>
              </div>
            </div>

            <StadiumOption
              stadium={compareAgainst}
              onSelect={() => onSelect(compareAgainst.id)}
              isLoading={isLoading}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 sm:px-6 py-4 pb-safe bg-[var(--card-bg-secondary)] border-t border-[var(--card-border)]">
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs sm:text-sm text-[var(--foreground-muted)] flex-1">
              Your pick helps rank your visited stadiums
            </p>
            <Button variant="ghost" size="sm" onClick={onSkip} className="min-h-[44px] flex-shrink-0">
              Skip all <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

interface StadiumOptionProps {
  stadium: Stadium;
  onSelect: () => void;
  isLoading?: boolean;
  isNew?: boolean;
}

function StadiumOption({ stadium, onSelect, isLoading, isNew }: StadiumOptionProps) {
  return (
    <button
      onClick={onSelect}
      disabled={isLoading}
      className={cn(
        'flex-1 group relative overflow-hidden rounded-xl border-2 border-[var(--card-border)]',
        'hover:border-[var(--accent)] hover:shadow-lg transition-all duration-200',
        'disabled:opacity-50 disabled:cursor-not-allowed'
      )}
    >
      {/* New Badge */}
      {isNew && (
        <div className="absolute top-2 left-2 z-10 bg-[var(--accent)] text-white text-xs font-bold px-2 py-1 rounded-full">
          NEW
        </div>
      )}

      {/* Image */}
      <div className="relative h-32 sm:h-40 bg-[var(--card-bg)]">
        {stadium.image_url ? (
          <Image
            src={stadium.image_url}
            alt={stadium.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-5xl">
            {getSportEmoji(stadium.sport)}
          </div>
        )}
        {/* Hover Overlay */}
        <div className="absolute inset-0 group-hover:bg-[var(--accent-bg)] transition-colors flex items-center justify-center">
          <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white font-bold text-lg drop-shadow-lg">
            Pick this one
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-4 text-left bg-[var(--card-bg-secondary)]">
        <h3 className="font-semibold text-[var(--foreground)] truncate">
          {stadium.name}
        </h3>
        <p className="text-sm text-[var(--foreground-muted)] truncate">
          {stadium.team_name}
        </p>
        <p className="text-xs text-[var(--foreground-muted)] mt-1">
          {stadium.city}, {stadium.state}
        </p>
      </div>
    </button>
  );
}
