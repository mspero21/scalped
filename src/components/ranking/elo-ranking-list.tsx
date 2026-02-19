'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Trophy, Star, X, GripVertical } from 'lucide-react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { StadiumRatingWithStadium, Sport } from '@/types/database';
import { getSportEmoji, getSportLabel } from '@/lib/utils';
import { cn } from '@/lib/utils';
import { rankToScore } from '@/lib/ranking/elo';

interface EloRankingListProps {
  ratings: StadiumRatingWithStadium[];
  selectedSport?: Sport | 'ALL';
  onRemove?: (stadiumId: string) => void;
  onReorder?: (reorderedRatings: StadiumRatingWithStadium[]) => void;
}

// Tier priority order (higher = better, should rank above lower tiers)
const TIER_ORDER: Record<string, number> = {
  LOVED: 4,
  LIKED: 3,
  OKAY: 2,
  DISLIKED: 1,
};

export function EloRankingList({ ratings, selectedSport = 'ALL', onRemove, onReorder }: EloRankingListProps) {
  // Deduplicate shared venues (e.g. United Center has Bulls NBA + Blackhawks NHL rows).
  // For sport-specific tabs, keep only that sport's entry.
  // For ALL, keep one entry per physical venue (first seen = highest Elo since list is pre-sorted).
  function deduplicateVenues(items: StadiumRatingWithStadium[]): StadiumRatingWithStadium[] {
    const seen = new Set<string>();
    return items.filter((r) => {
      const key = `${r.stadium.name}||${r.stadium.city}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  // Sort ALL ratings to get overall ranking (for score calculation)
  const allSorted = [...ratings].sort((a, b) => {
    const tierDiff = (TIER_ORDER[b.initial_tier] || 0) - (TIER_ORDER[a.initial_tier] || 0);
    if (tierDiff !== 0) return tierDiff;
    return (b.global_elo_rating || 0) - (a.global_elo_rating || 0);
  });

  // Deduplicate for display and ranking
  const dedupedAll = deduplicateVenues(allSorted);

  // Create lookup for overall rank (1-based)
  const overallRankMap: Record<string, number> = {};
  dedupedAll.forEach((r, idx) => {
    overallRankMap[r.stadium_id] = idx + 1;
  });
  const overallTotal = dedupedAll.length;

  // Filter/sort for display
  const initialFilteredRatings = selectedSport === 'ALL'
    ? dedupedAll
    : deduplicateVenues(
        ratings
          .filter((r) => r.sport === selectedSport)
          .sort((a, b) => {
            const tierDiff = (TIER_ORDER[b.initial_tier] || 0) - (TIER_ORDER[a.initial_tier] || 0);
            if (tierDiff !== 0) return tierDiff;
            return (b.elo_rating || 0) - (a.elo_rating || 0);
          })
      );

  // Local state for drag and drop reordering
  const [filteredRatings, setFilteredRatings] = useState(initialFilteredRatings);

  // Update filtered ratings when props change
  useEffect(() => {
    setFilteredRatings(initialFilteredRatings);
  }, [ratings, selectedSport]); // eslint-disable-line react-hooks/exhaustive-deps

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // 8px movement before drag starts
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = filteredRatings.findIndex((r) => r.id === active.id);
      const newIndex = filteredRatings.findIndex((r) => r.id === over.id);

      const newOrder = arrayMove(filteredRatings, oldIndex, newIndex);
      setFilteredRatings(newOrder);

      // If we're viewing all sports, use the reordered list as the new full order
      // Otherwise, we need to merge the reordered filtered list back into the full list
      if (onReorder) {
        if (selectedSport === 'ALL') {
          onReorder(newOrder);
        } else {
          // For filtered view, create a new full list with updated positions
          const reorderedFull = [...ratings];
          // Update the positions of the filtered items in the full list
          newOrder.forEach((item, newIdx) => {
            const fullIdx = reorderedFull.findIndex((r) => r.id === item.id);
            if (fullIdx !== -1) {
              // Temporarily store for reordering
              reorderedFull[fullIdx] = {
                ...reorderedFull[fullIdx],
                elo_rating: 2000 - (newIdx * 1000) / Math.max(newOrder.length - 1, 1),
              };
            }
          });
          // Re-sort by elo_rating and call onReorder
          reorderedFull.sort((a, b) => (b.elo_rating || 0) - (a.elo_rating || 0));
          onReorder(reorderedFull);
        }
      }
    }
  }

  if (filteredRatings.length === 0) {
    return (
      <div className="text-center py-12 bg-[var(--card-bg)] rounded-2xl">
        <p className="text-6xl mb-4">🏟️</p>
        <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">
          No rankings yet
        </h3>
        <p className="text-[var(--foreground-muted)]">
          {selectedSport === 'ALL'
            ? 'Start visiting stadiums to build your rankings!'
            : `No ${getSportLabel(selectedSport as Sport)} stadiums ranked yet.`}
        </p>
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={filteredRatings.map((r) => r.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-2">
          {onReorder && (
            <p className="text-xs text-[var(--foreground-muted)] mb-3 flex items-center gap-1">
              <GripVertical className="h-3 w-3" />
              Drag to reorder your rankings
            </p>
          )}
          {filteredRatings.map((rating, index) => (
            <SortableRankingItem
              key={rating.id}
              rating={rating}
              displayRank={index + 1}
              overallRank={overallRankMap[rating.stadium_id]}
              overallTotal={overallTotal}
              onRemove={onRemove}
              isDraggable={!!onReorder}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}

interface SortableRankingItemProps {
  rating: StadiumRatingWithStadium;
  displayRank: number;
  overallRank: number;
  overallTotal: number;
  onRemove?: (stadiumId: string) => void;
  isDraggable?: boolean;
}

function SortableRankingItem({
  rating,
  displayRank,
  overallRank,
  overallTotal,
  onRemove,
  isDraggable,
}: SortableRankingItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: rating.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : undefined,
  };

  const { stadium } = rating;
  const score = rankToScore(overallRank, overallTotal);

  // Determine rank badge color based on display rank
  const rankColor = displayRank === 1
    ? 'from-amber-400 to-amber-600'
    : displayRank === 2
    ? 'from-zinc-300 to-zinc-500'
    : displayRank === 3
    ? 'from-orange-400 to-orange-600'
    : 'from-amber-600 to-amber-800';

  function handleRemove(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (onRemove) {
      onRemove(stadium.id);
    }
  }

  return (
    <div ref={setNodeRef} style={style}>
      <Card
        className={cn(
          'flex items-center gap-3 p-4 transition-all duration-200 group',
          isDragging ? 'shadow-xl bg-[var(--card-hover)] scale-[1.02]' : 'hover:shadow-md hover:bg-[var(--card-hover)]'
        )}
      >
        {/* Drag Handle */}
        {isDraggable && (
          <button
            {...attributes}
            {...listeners}
            className="flex-shrink-0 p-1 -ml-1 cursor-grab active:cursor-grabbing text-[var(--foreground-muted)] hover:text-[var(--foreground-muted)] touch-none"
            aria-label="Drag to reorder"
          >
            <GripVertical className="h-5 w-5" />
          </button>
        )}

        {/* Rank Number */}
        <div className={cn(
          'flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br flex items-center justify-center',
          rankColor
        )}>
          {displayRank <= 3 ? (
            <Trophy className="h-5 w-5 text-white" />
          ) : (
            <span className="text-white font-bold">{displayRank}</span>
          )}
        </div>

        {/* Stadium Image */}
        <div className="relative h-14 w-14 rounded-lg overflow-hidden bg-[var(--card-border)] flex-shrink-0">
          {stadium.image_url ? (
            <Image
              src={stadium.image_url}
              alt={stadium.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-2xl">
              {getSportEmoji(stadium.sport)}
            </div>
          )}
        </div>

        {/* Stadium Info - wrapped in Link for navigation */}
        <Link href={`/stadium/${stadium.id}`} className="flex-1 min-w-0">
          <h3 className="font-semibold text-[var(--foreground)] truncate hover:underline">
            {stadium.name}
          </h3>
          <p className="text-sm text-[var(--foreground-muted)] truncate">
            <span className="text-[var(--accent)]">{stadium.team_name}</span> • {stadium.city}, {stadium.state}
          </p>
        </Link>

        {/* Score */}
        <div className="flex flex-col items-end flex-shrink-0">
          <div className="flex items-center gap-1 text-[var(--accent)]">
            <Star className="h-4 w-4 fill-current" />
            <span className="font-bold">{score}/10</span>
          </div>
          <Badge className="text-xs">
            {getSportEmoji(stadium.sport)} {getSportLabel(stadium.sport)}
          </Badge>
        </div>

        {/* Remove Button */}
        {onRemove && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRemove}
            className="opacity-0 group-hover:opacity-100 transition-opacity p-2 h-auto text-[var(--foreground-muted)] hover:text-red-400 hover:bg-red-950/30 flex-shrink-0"
            title="Remove from rankings"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </Card>
    </div>
  );
}
