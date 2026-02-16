'use client';

import { X } from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { FollowButton } from './follow-button';
import type { FollowWithProfile } from '@/hooks/use-follows';

interface FollowersModalProps {
  followers: FollowWithProfile[];
  isOpen: boolean;
  onClose: () => void;
  currentUserId?: string;
}

export function FollowersModal({
  followers,
  isOpen,
  onClose,
  currentUserId
}: FollowersModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center no-overscroll">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-[var(--card-bg)] rounded-t-3xl sm:rounded-2xl shadow-2xl w-full max-w-md sm:mx-4 max-h-[85vh] sm:max-h-[80vh] flex flex-col border border-[var(--card-border)]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[var(--card-border)]">
          <h2 className="text-lg font-semibold text-[var(--foreground)]">Followers</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:bg-[var(--card-hover)]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 pb-safe scroll-smooth">
          {followers.length === 0 ? (
            <p className="text-center text-[var(--foreground-muted)] py-8">No followers yet</p>
          ) : (
            <div className="space-y-2">
              {followers.map((follow) => (
                <div
                  key={follow.id}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-[var(--card-hover)] min-h-[60px] active:bg-[var(--card-hover)]"
                >
                  <Avatar
                    src={follow.profile.avatar_url}
                    name={follow.profile.display_name || follow.profile.username}
                    size="md"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-[var(--foreground)]">
                      {follow.profile.display_name || follow.profile.username}
                    </p>
                    {follow.profile.display_name && (
                      <p className="text-xs text-[var(--foreground-muted)]">@{follow.profile.username}</p>
                    )}
                  </div>
                  <FollowButton
                    targetUserId={follow.follower_id}
                    currentUserId={currentUserId}
                    size="sm"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
