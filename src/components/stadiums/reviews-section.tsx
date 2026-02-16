'use client';

import { useState } from 'react';
import { MessageSquare, Send, Star, Trash2, Loader2, Edit2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { ConfirmationModal } from '@/components/ui/confirmation-modal';
import { useStadiumReviews } from '@/hooks/use-stadium-reviews';
import { useConfirmation } from '@/hooks/use-confirmation';
import { cn } from '@/lib/utils';

interface ReviewsSectionProps {
  stadiumId: string;
  userId?: string;
}

const REVIEWS_PER_PAGE = 5;

export function ReviewsSection({ stadiumId, userId }: ReviewsSectionProps) {
  const { reviews, userReview, loading, addOrUpdateReview, deleteReview } = useStadiumReviews(stadiumId, userId);
  const [content, setContent] = useState('');
  const confirmation = useConfirmation();
  const [rating, setRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [editing, setEditing] = useState(false);
  const [displayCount, setDisplayCount] = useState(REVIEWS_PER_PAGE);

  async function handleSubmit() {
    if (!content.trim()) return;
    setSubmitting(true);
    await addOrUpdateReview(content.trim(), rating || undefined);
    setContent('');
    setRating(0);
    setEditing(false);
    setSubmitting(false);
  }

  function startEdit() {
    if (userReview) {
      setContent(userReview.content);
      setRating(userReview.rating || 0);
      setEditing(true);
    }
  }

  async function handleDelete() {
    await confirmation.confirm({
      title: 'Delete Review?',
      message: 'Are you sure you want to delete your review? This action cannot be undone.',
      confirmText: 'Delete',
      variant: 'danger',
      onConfirm: async () => {
        await deleteReview();
      },
    });
  }

  const showForm = userId && (!userReview || editing);
  const avgRating = reviews.length > 0
    ? reviews.filter(r => r.rating).reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.filter(r => r.rating).length
    : null;

  const displayedReviews = reviews.slice(0, displayCount);
  const hasMore = displayCount < reviews.length;

  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-base">
          <MessageSquare className="h-5 w-5 text-blue-500" />
          Reviews
          {reviews.length > 0 && (
            <span className="text-xs text-[var(--foreground-muted)] font-normal">({reviews.length})</span>
          )}
          {avgRating && (
            <span className="flex items-center gap-1 text-xs text-amber-500 font-normal ml-auto">
              <Star className="h-3 w-3 fill-current" /> {avgRating.toFixed(1)}
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {showForm ? (
          <div className="mb-4">
            <div className="flex gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} onClick={() => setRating(star)} className="p-0.5">
                  <Star className={cn('h-5 w-5', star <= rating ? 'fill-amber-400 text-amber-400' : 'text-[var(--foreground-subtle)]')} />
                </button>
              ))}
              <span className="text-xs text-[var(--foreground-muted)] ml-2 self-center">{rating > 0 ? `${rating}/5` : 'Rate it'}</span>
            </div>
            <div className="flex gap-2">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="How was your visit? What stood out? Would you go back?"
                className="flex-1 p-3 rounded-xl border border-[var(--input-border)] bg-[var(--input-bg)] text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[var(--accent-ring)]"
                rows={3}
              />
              <div className="flex flex-col gap-1 self-end">
                <Button size="sm" onClick={handleSubmit} disabled={!content.trim() || submitting} className="bg-blue-500 hover:bg-blue-600">
                  {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                </Button>
                {editing && (
                  <Button size="sm" variant="ghost" onClick={() => { setEditing(false); setContent(''); setRating(0); }}>
                    Cancel
                  </Button>
                )}
              </div>
            </div>
          </div>
        ) : !userId ? (
          <p className="text-sm text-[var(--foreground-muted)] italic mb-4">Sign in to write a review</p>
        ) : null}

        {loading ? (
          <div className="text-center py-4"><Loader2 className="h-5 w-5 animate-spin mx-auto text-[var(--foreground-muted)]" /></div>
        ) : reviews.length === 0 ? (
          <div className="text-center text-[var(--foreground-muted)] text-sm py-2">No reviews yet — be the first!</div>
        ) : (
          <>
            <div className="space-y-3">
              {displayedReviews.map((review) => (
                <div key={review.id} className={cn('flex gap-3 p-3 rounded-xl', review.user_id === userId ? 'bg-blue-50 ring-1 ring-blue-200' : 'bg-[var(--card-bg-secondary)]')}>
                  <Avatar src={review.profile?.avatar_url} name={review.profile?.display_name || review.profile?.username || 'User'} size="sm" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-xs text-[var(--foreground-muted)]">{review.profile?.display_name || review.profile?.username || 'Anonymous'}</p>
                      {review.rating && (
                        <span className="flex items-center gap-0.5 text-xs text-amber-500">
                          <Star className="h-3 w-3 fill-current" /> {review.rating}
                        </span>
                      )}
                      {review.user_id === userId && <span className="text-xs text-blue-500">(You)</span>}
                    </div>
                    <p className="text-sm text-[var(--foreground-muted)]">{review.content}</p>
                  </div>
                  {review.user_id === userId && !editing && (
                    <div className="flex items-start gap-1">
                      <button onClick={startEdit} className="p-1 text-[var(--foreground-muted)] hover:text-blue-500"><Edit2 className="h-3 w-3" /></button>
                      <button onClick={handleDelete} className="p-1 text-[var(--foreground-muted)] hover:text-red-500"><Trash2 className="h-3 w-3" /></button>
                    </div>
                  )}
                </div>
              ))}
            </div>
            {hasMore && (
              <div className="mt-3 text-center">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setDisplayCount(prev => prev + REVIEWS_PER_PAGE)}
                  className="text-xs"
                >
                  Load More ({reviews.length - displayCount} remaining)
                </Button>
              </div>
            )}
          </>
        )}
      </CardContent>

      {/* Confirmation Modal */}
      <ConfirmationModal {...confirmation} />
    </Card>
  );
}

