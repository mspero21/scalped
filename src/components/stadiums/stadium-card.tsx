'use client';

import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Users, Calendar, CheckCircle2, Bookmark } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getSportEmoji, getSportLabel, formatNumber } from '@/lib/utils';
import { getTeamColors } from '@/lib/team-colors';
import { Stadium } from '@/types/database';

interface RankInfo {
  overallRank: number;
  sportRank: number;
  sportTotal: number;
  score: number;
}

interface StadiumCardProps {
  stadium: Stadium;
  hasVisited?: boolean;
  rankInfo?: RankInfo | null;
  isOnBucketList?: boolean;
  variant?: 'default' | 'compact' | 'list';
}

export function StadiumCard({
  stadium,
  hasVisited = false,
  rankInfo,
  isOnBucketList,
  variant = 'default',
}: StadiumCardProps) {
  // Get team colors for dynamic theming
  const teamColors = stadium.team_name ? getTeamColors(stadium.team_name) : null;
  const primaryColor = teamColors?.primary || '#b8860b';
  const secondaryColor = teamColors?.secondary || '#8b5a2b';

  if (variant === 'compact') {
    return (
      <Link href={`/stadium/${stadium.id}`}>
        <Card className="flex items-center gap-4 p-4 hover:bg-[var(--card-hover)] transition-colors">
          <div className="relative h-16 w-16 rounded-xl overflow-hidden bg-[var(--card-border)] flex-shrink-0">
            {stadium.image_url ? (
              <Image src={stadium.image_url} alt={stadium.name} fill className="object-cover" />
            ) : (
              <div className="flex items-center justify-center h-full text-2xl">
                {getSportEmoji(stadium.sport)}
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-[var(--foreground)] truncate">{stadium.name}</h3>
            <p className="text-sm text-[var(--accent)]">{stadium.team_name}</p>
          </div>
          {rankInfo && (
            <div className="text-right">
              <span className="text-2xl font-bold text-[var(--accent)]">{rankInfo.score}</span>
              <p className="text-xs text-[var(--foreground-muted)]">#{rankInfo.overallRank} overall</p>
            </div>
          )}
        </Card>
      </Link>
    );
  }

  if (variant === 'list') {
    return (
      <Link href={`/stadium/${stadium.id}`}>
        <div className="flex items-center gap-4 py-3 hover:bg-[var(--card-hover)] transition-colors rounded-xl px-2 -mx-2">
          <div className="relative h-12 w-12 rounded-lg overflow-hidden bg-[var(--card-border)] flex-shrink-0">
            {stadium.image_url ? (
              <Image src={stadium.image_url} alt={stadium.name} fill className="object-cover" />
            ) : (
              <div className="flex items-center justify-center h-full text-xl">
                {getSportEmoji(stadium.sport)}
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-[var(--foreground)] truncate">{stadium.name}</h3>
            <p className="text-sm text-[var(--foreground-muted)] truncate">
              {stadium.city}, {stadium.state}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {hasVisited && <CheckCircle2 className="h-5 w-5 text-[var(--accent)]" />}
            {isOnBucketList && <Bookmark className="h-5 w-5 text-[var(--accent)] fill-[var(--accent)]" />}
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/stadium/${stadium.id}`} className="block group touch-feedback">
      <div className="relative flex min-h-[180px] sm:min-h-0">
        {/* Main ticket section */}
        <div className="flex-1 bg-gradient-to-br from-[var(--card-bg)] to-[var(--card-bg-secondary)] rounded-l-xl overflow-hidden border border-[var(--card-border)] border-r-0 relative">
          {/* Team color accent */}
          <div
            className="absolute top-0 right-0 w-16 h-full blur-sm pointer-events-none"
            style={{
              background: `linear-gradient(to bottom, ${primaryColor}30, ${secondaryColor}20, ${primaryColor}15)`
            }}
          />

          <div className="relative">
            {/* Image section */}
            <div className="h-36 sm:h-32 relative overflow-hidden">
              {stadium.image_url ? (
                <Image
                  src={stadium.image_url}
                  alt={stadium.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-5xl bg-[var(--card-bg)]">
                  {getSportEmoji(stadium.sport)}
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--card-bg-secondary)] via-transparent to-transparent" />

              {/* Status badges */}
              <div className="absolute top-2 right-2 flex gap-1.5">
                {hasVisited && (
                  <div className="bg-[var(--accent)] text-white p-1 rounded-full">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  </div>
                )}
                {isOnBucketList && (
                  <div className="bg-[var(--accent)] text-white p-1 rounded-full">
                    <Bookmark className="h-3.5 w-3.5" />
                  </div>
                )}
              </div>
            </div>

            {/* Content section */}
            <div className="p-3 -mt-4 relative">
              <span className="inline-block bg-[var(--accent)] text-white text-[10px] font-bold px-2 py-0.5 rounded-full mb-1.5">
                {getSportLabel(stadium.sport)}
              </span>
              <h3 className="font-bold text-base text-[var(--foreground)] leading-tight mb-0.5 line-clamp-1">{stadium.name}</h3>
              <p className="text-[var(--accent)] text-sm line-clamp-1">{stadium.team_name}</p>

              {/* Location row */}
              <div className="mt-2 flex items-center gap-1 text-[var(--foreground-muted)] text-xs">
                <MapPin className="h-3 w-3" />
                <span>{stadium.city}, {stadium.state}</span>
              </div>
            </div>
          </div>

          {/* Perforated edge */}
          <div className="absolute right-0 top-0 bottom-0 flex flex-col justify-between py-2">
            {[...Array(14)].map((_, i) => (
              <div key={i} className="w-2.5 h-2.5 bg-[var(--background)] rounded-full -mr-1.5" />
            ))}
          </div>
        </div>

        {/* Ticket stub */}
        <div className="w-[70px] sm:w-16 bg-gradient-to-b from-[var(--card-bg)] to-[var(--card-bg-secondary)] rounded-r-xl border border-[var(--card-border)] border-l-0 ml-0.5 flex flex-col items-center justify-between py-3 px-1.5 sm:px-1">
          {rankInfo ? (
            <>
              <span className="text-[var(--foreground-muted)] text-[8px] font-mono uppercase">Rank</span>
              <span className="text-[var(--foreground)] font-bold text-lg">#{rankInfo.overallRank}</span>
              <div className="text-center">
                <span className="text-[var(--foreground-muted)] text-[8px] font-mono block">#{rankInfo.sportRank}/{rankInfo.sportTotal}</span>
                <span className="text-[var(--foreground-muted)] text-[7px] font-mono block">{getSportLabel(stadium.sport)}</span>
              </div>
            </>
          ) : (
            <>
              <span className="text-[var(--foreground-muted)] text-[8px] font-mono uppercase">Rank</span>
              <span className="text-[var(--foreground-muted)] font-medium text-[10px] text-center leading-tight">Not<br/>Ranked</span>
            </>
          )}

          {/* Barcode effect */}
          <div className="flex flex-col gap-0.5 mt-1">
            {[8, 12, 6, 14, 10, 8, 12, 6].map((w, i) => (
              <div key={i} className="h-0.5 bg-[var(--card-border)] rounded" style={{ width: `${w}px` }} />
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
