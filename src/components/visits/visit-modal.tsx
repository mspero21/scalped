'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X, CalendarDays, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Stadium } from '@/types/database';
import { getSportEmoji } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface VisitModalProps {
  stadium: Stadium;
  onSubmit: (details: { visited_at: string; event_type?: string; notes?: string }) => void;
  onClose: () => void;
  isLoading?: boolean;
}

export function VisitModal({ stadium, onSubmit, onClose, isLoading }: VisitModalProps) {
  const [visitDate, setVisitDate] = useState(new Date().toISOString().split('T')[0]);
  const [eventType, setEventType] = useState('');
  const [notes, setNotes] = useState('');
  const [showDetails, setShowDetails] = useState(false);

  const handleSubmit = () => {
    onSubmit({
      visited_at: visitDate,
      event_type: eventType || undefined,
      notes: notes || undefined,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 no-overscroll">
      <Card className="w-full max-w-md overflow-hidden rounded-t-3xl sm:rounded-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="relative">
          <div className="h-24 bg-[var(--card-bg)] relative">
            {stadium.image_url ? (
              <Image
                src={stadium.image_url}
                alt={stadium.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-4xl">
                {getSportEmoji(stadium.sport)}
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] to-transparent" />
          </div>
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-white/80 hover:text-white bg-black/30 rounded-full p-1.5 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="absolute bottom-3 left-4 right-4">
            <h3 className="font-semibold text-[var(--foreground)] text-lg truncate">{stadium.name}</h3>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <h2 className="text-lg font-semibold text-[var(--foreground)]">
            Log Your Visit
          </h2>

          {/* Date Picker */}
          <div>
            <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
              <CalendarDays className="h-4 w-4 inline mr-2" />
              When did you visit?
            </label>
            <input
              type="date"
              value={visitDate}
              onChange={(e) => setVisitDate(e.target.value)}
              max={new Date().toISOString().split('T')[0]}
              className={cn(
                'w-full px-4 py-3 rounded-xl border',
                'bg-[var(--card-bg-secondary)]',
                'border-[var(--card-border)]',
                'text-[var(--foreground)]',
                'focus:outline-none focus:ring-2 focus:ring-[var(--accent-ring)] focus:border-transparent'
              )}
            />
          </div>

          {/* Optional Details Toggle */}
          <button
            type="button"
            onClick={() => setShowDetails(!showDetails)}
            className="text-sm text-[var(--accent)] hover:underline"
          >
            {showDetails ? '− Hide details' : '+ Add event details'}
          </button>

          {/* Optional Details */}
          {showDetails && (
            <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
              <div>
                <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
                  Event/Game (optional)
                </label>
                <input
                  type="text"
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                  placeholder="e.g., vs. Cowboys, Playoff Game"
                  className={cn(
                    'w-full px-4 py-3 rounded-xl border',
                    'bg-[var(--card-bg-secondary)]',
                    'border-[var(--card-border)]',
                    'text-[var(--foreground)] placeholder:text-[var(--foreground-muted)]',
                    'focus:outline-none focus:ring-2 focus:ring-[var(--accent-ring)] focus:border-transparent'
                  )}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
                  <MessageSquare className="h-4 w-4 inline mr-2" />
                  Notes (optional)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="How was the experience?"
                  rows={3}
                  className={cn(
                    'w-full px-4 py-3 rounded-xl border resize-none',
                    'bg-[var(--card-bg-secondary)]',
                    'border-[var(--card-border)]',
                    'text-[var(--foreground)] placeholder:text-[var(--foreground-muted)]',
                    'focus:outline-none focus:ring-2 focus:ring-[var(--accent-ring)] focus:border-transparent'
                  )}
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 pb-safe bg-[var(--card-bg-secondary)] border-t border-[var(--card-border)] flex gap-3">
          <Button variant="ghost" onClick={onClose} className="flex-1 min-h-[48px]" disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="flex-1 min-h-[48px]" isLoading={isLoading}>
            Log Visit
          </Button>
        </div>
      </Card>
    </div>
  );
}
