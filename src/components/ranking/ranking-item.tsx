'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { RankingWithStadium } from '@/types/database';
import { cn, getSportEmoji } from '@/lib/utils';

interface RankingItemProps {
  ranking: RankingWithStadium;
  isEditing?: boolean;
}

export function RankingItem({ ranking, isEditing }: RankingItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: ranking.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const content = (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'flex items-center gap-4 p-4 bg-[var(--card-bg)] rounded-xl border border-[var(--card-border)]',
        isDragging && 'shadow-lg ring-2 ring-[var(--accent)] z-50',
        isEditing && 'cursor-grab active:cursor-grabbing'
      )}
    >
      {/* Rank Number */}
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[var(--accent)] flex items-center justify-center">
        <span className="text-white font-bold">{ranking.rank_position}</span>
      </div>

      {/* Drag Handle */}
      {isEditing && (
        <button
          className="flex-shrink-0 p-1 text-[var(--foreground-muted)] hover:text-[var(--foreground)] touch-none"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="h-5 w-5" />
        </button>
      )}

      {/* Stadium Image */}
      <div className="relative h-14 w-14 rounded-lg overflow-hidden bg-[var(--card-border)] flex-shrink-0">
        {ranking.stadium.image_url ? (
          <Image
            src={ranking.stadium.image_url}
            alt={ranking.stadium.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-2xl">
            {getSportEmoji(ranking.stadium.sport)}
          </div>
        )}
      </div>

      {/* Stadium Info */}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-[var(--foreground)] truncate">
          {ranking.stadium.name}
        </h3>
        <p className="text-sm text-[var(--foreground-muted)] truncate">
          {ranking.stadium.team_name} • {ranking.stadium.city}, {ranking.stadium.state}
        </p>
      </div>
    </div>
  );

  if (isEditing) {
    return content;
  }

  return (
    <Link href={`/stadium/${ranking.stadium.id}`}>
      {content}
    </Link>
  );
}
