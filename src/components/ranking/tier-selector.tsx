'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Heart, ThumbsUp, Meh, ThumbsDown, X, CalendarDays } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Stadium } from '@/types/database';
import { getSportEmoji } from '@/lib/utils';
import { cn } from '@/lib/utils';
import { InitialTier } from '@/lib/ranking/elo';

interface TierSelectorProps {
  stadium: Stadium;
  onSelect: (tier: InitialTier, logVisit: boolean) => void;
  onSkip: () => void;
  isLoading?: boolean;
  showVisitOption?: boolean;
}

const tiers: Array<{ value: InitialTier; label: string; icon: typeof Heart; color: string; bgColor: string }> = [
  { value: 'LOVED', label: 'Loved it!', icon: Heart, color: 'text-rose-400', bgColor: 'hover:bg-rose-950/40' },
  { value: 'LIKED', label: 'Liked it', icon: ThumbsUp, color: 'text-amber-400', bgColor: 'hover:bg-amber-950/40' },
  { value: 'OKAY', label: "It was okay", icon: Meh, color: 'text-orange-400', bgColor: 'hover:bg-orange-950/40' },
  { value: 'DISLIKED', label: "Didn't like it", icon: ThumbsDown, color: 'text-zinc-400', bgColor: 'hover:bg-zinc-800/50' },
];

export function TierSelector({ stadium, onSelect, onSkip, isLoading, showVisitOption = true }: TierSelectorProps) {
  const [selectedTier, setSelectedTier] = useState<InitialTier | null>(null);
  const [logVisit, setLogVisit] = useState(false);

  const handleSubmit = () => {
    if (selectedTier) {
      onSelect(selectedTier, logVisit);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 no-overscroll">
      <Card className="w-full max-w-md overflow-hidden rounded-t-3xl sm:rounded-2xl">
        {/* Header */}
        <div className="relative">
          <div className="h-32 bg-[var(--card-bg)] relative">
            {stadium.image_url ? (
              <Image
                src={stadium.image_url}
                alt={stadium.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-5xl">
                {getSportEmoji(stadium.sport)}
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] to-transparent" />
          </div>
          <button
            onClick={onSkip}
            className="absolute top-3 right-3 text-white/80 hover:text-white bg-black/30 rounded-full p-1.5 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="absolute bottom-3 left-4 right-4">
            <h3 className="font-semibold text-[var(--foreground)] text-lg truncate">{stadium.name}</h3>
            <p className="text-[var(--foreground-muted)] text-sm">{stadium.team_name}</p>
          </div>
        </div>

        {/* Tier Selection */}
        <div className="p-6">
          <h2 className="text-lg font-semibold text-[var(--foreground)] mb-1">
            How was your experience?
          </h2>
          <p className="text-sm text-[var(--foreground-muted)] mb-4">
            This helps us start your ranking
          </p>

          <div className="space-y-2">
            {tiers.map((tier) => {
              const Icon = tier.icon;
              const isSelected = selectedTier === tier.value;

              return (
                <button
                  key={tier.value}
                  onClick={() => setSelectedTier(tier.value)}
                  disabled={isLoading}
                  className={cn(
                    'w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all',
                    tier.bgColor,
                    isSelected
                      ? 'border-[var(--accent)] bg-[var(--accent-bg)]'
                      : 'border-[var(--card-border)]',
                    'disabled:opacity-50 disabled:cursor-not-allowed'
                  )}
                >
                  <Icon className={cn('h-6 w-6', tier.color)} />
                  <span className={cn(
                    'font-medium',
                    isSelected ? 'text-[var(--accent)]' : 'text-[var(--foreground)]'
                  )}>
                    {tier.label}
                  </span>
                  {isSelected && (
                    <span className="ml-auto text-[var(--accent)]">✓</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Optional Visit Toggle */}
          {showVisitOption && (
            <button
              onClick={() => setLogVisit(!logVisit)}
              className={cn(
                'mt-4 w-full flex items-center gap-3 p-3 rounded-xl border transition-all',
                logVisit
                  ? 'border-[var(--accent)] bg-[var(--accent-bg)]'
                  : 'border-[var(--card-border)] hover:bg-[var(--card-bg)]'
              )}
            >
              <CalendarDays className={cn('h-5 w-5', logVisit ? 'text-[var(--accent)]' : 'text-[var(--foreground-muted)]')} />
              <span className={cn(
                'text-sm',
                logVisit ? 'text-[var(--accent)]' : 'text-[var(--foreground-muted)]'
              )}>
                Also log this as a visit
              </span>
              <div className={cn(
                'ml-auto w-10 h-6 rounded-full transition-colors relative',
                logVisit ? 'bg-[var(--accent)]' : 'bg-[var(--card-border)]'
              )}>
                <div className={cn(
                  'absolute top-1 w-4 h-4 rounded-full bg-white transition-transform',
                  logVisit ? 'translate-x-5' : 'translate-x-1'
                )} />
              </div>
            </button>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 pb-safe bg-[var(--card-bg-secondary)] border-t border-[var(--card-border)] flex gap-3">
          <Button variant="ghost" onClick={onSkip} className="flex-1 min-h-[48px]" disabled={isLoading}>
            Skip
          </Button>
          <Button
            onClick={handleSubmit}
            className="flex-1 min-h-[48px]"
            disabled={!selectedTier || isLoading}
            isLoading={isLoading}
          >
            Continue
          </Button>
        </div>
      </Card>
    </div>
  );
}
