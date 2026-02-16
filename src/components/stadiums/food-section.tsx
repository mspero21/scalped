'use client';

import { useState } from 'react';
import { UtensilsCrossed, Send, ThumbsUp, Trash2, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { useFoodRecommendations } from '@/hooks/use-food-recommendations';
import { cn } from '@/lib/utils';

interface FoodSectionProps {
  stadiumId: string;
  userId?: string;
}

export function FoodSection({ stadiumId, userId }: FoodSectionProps) {
  const { recommendations, loading, addRecommendation, deleteRecommendation, toggleUpvote } = useFoodRecommendations(stadiumId, userId);
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit() {
    if (!content.trim()) return;
    setSubmitting(true);
    await addRecommendation(content.trim());
    setContent('');
    setSubmitting(false);
  }

  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-base">
          <UtensilsCrossed className="h-5 w-5 text-orange-500" />
          Food & Drinks
          {recommendations.length > 0 && (
            <span className="text-xs text-[var(--foreground-muted)] font-normal">({recommendations.length})</span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {userId ? (
          <div className="flex gap-2 mb-4">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's the must-try food here? Best beer? Hidden gems?"
              className="flex-1 p-3 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg-secondary)] text-sm text-[var(--foreground)] placeholder:text-[var(--foreground-muted)] resize-none focus:outline-none focus:ring-2 focus:ring-[var(--accent-ring)]"
              rows={2}
            />
            <Button
              size="sm"
              onClick={handleSubmit}
              disabled={!content.trim() || submitting}
              className="self-end"
            >
              {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </div>
        ) : (
          <p className="text-sm text-[var(--foreground-muted)] italic mb-4">Sign in to add food recommendations</p>
        )}

        {loading ? (
          <div className="text-center py-4">
            <Loader2 className="h-5 w-5 animate-spin mx-auto text-[var(--foreground-muted)]" />
          </div>
        ) : recommendations.length === 0 ? (
          <div className="text-center text-[var(--foreground-muted)] text-sm py-2">
            No recommendations yet — be the first!
          </div>
        ) : (
          <div className="space-y-3">
            {recommendations.map((rec) => (
              <div key={rec.id} className="flex gap-3 p-3 bg-[var(--card-bg-secondary)] rounded-xl">
                <Avatar
                  src={rec.profile?.avatar_url}
                  name={rec.profile?.display_name || rec.profile?.username || 'User'}
                  size="sm"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-[var(--foreground-muted)] mb-1">
                    {rec.profile?.display_name || rec.profile?.username || 'Anonymous'}
                  </p>
                  <p className="text-sm text-[var(--foreground)]">{rec.content}</p>
                </div>
                <div className="flex items-start gap-1">
                  <button
                    onClick={() => toggleUpvote(rec.id)}
                    disabled={!userId}
                    className={cn(
                      'flex items-center gap-1 px-2 py-1 rounded-full text-xs transition-colors',
                      rec.user_upvoted
                        ? 'bg-[var(--accent-bg)] text-[var(--accent)]'
                        : 'bg-[var(--card-border)] text-[var(--foreground-muted)] hover:bg-[var(--card-hover)]'
                    )}
                  >
                    <ThumbsUp className="h-3 w-3" />
                    {rec.upvotes > 0 && rec.upvotes}
                  </button>
                  {rec.user_id === userId && (
                    <button
                      onClick={() => deleteRecommendation(rec.id)}
                      className="p-1 text-[var(--foreground-muted)] hover:text-red-400"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
