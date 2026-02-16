'use client';

import { useState } from 'react';
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
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { RankingWithStadium } from '@/types/database';
import { RankingItem } from './ranking-item';

interface RankingListProps {
  initialRankings: RankingWithStadium[];
  onReorder: (rankings: RankingWithStadium[]) => void;
  isEditing?: boolean;
}

export function RankingList({ initialRankings, onReorder, isEditing = false }: RankingListProps) {
  const [rankings, setRankings] = useState(initialRankings);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setRankings((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        const newItems = arrayMove(items, oldIndex, newIndex);
        
        // Update rank positions
        const updatedItems = newItems.map((item, index) => ({
          ...item,
          rank_position: index + 1,
        }));
        
        onReorder(updatedItems);
        return updatedItems;
      });
    }
  }

  if (rankings.length === 0) {
    return (
      <div className="text-center py-12 bg-[var(--background-secondary)] rounded-2xl">
        <p className="text-6xl mb-4">🏟️</p>
        <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">
          No rankings yet
        </h3>
        <p className="text-[var(--foreground-muted)]">
          Start visiting stadiums to build your rankings!
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
      <SortableContext items={rankings.map((r) => r.id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-2">
          {rankings.map((ranking) => (
            <RankingItem
              key={ranking.id}
              ranking={ranking}
              isEditing={isEditing}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}

