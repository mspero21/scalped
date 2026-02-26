'use client';

import { useState } from 'react';
import { UserPlus, UserMinus, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useFollows } from '@/hooks/use-follows';
import { createLogger } from '@/lib/logger';

const logger = createLogger('FollowButton');

interface FollowButtonProps {
  targetUserId: string;
  currentUserId?: string;
  variant?: 'primary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export function FollowButton({
  targetUserId,
  currentUserId,
  variant = 'primary',
  size = 'sm'
}: FollowButtonProps) {
  const { isFollowing, followUser, unfollowUser } = useFollows(currentUserId);
  const [loading, setLoading] = useState(false);

  // Don't show button if not logged in or viewing own profile
  if (!currentUserId || currentUserId === targetUserId) {
    return null;
  }

  const following = isFollowing(targetUserId);

  async function handleToggleFollow() {
    setLoading(true);

    if (following) {
      const result = await unfollowUser(targetUserId);
      if (result.error) {
        logger.error('Failed to unfollow', result.error);
      }
    } else {
      const result = await followUser(targetUserId);
      if (result.error) {
        logger.error('Failed to follow', result.error);
      }
    }

    setLoading(false);
  }

  return (
    <Button
      onClick={handleToggleFollow}
      disabled={loading}
      variant={following ? 'outline' : variant}
      size={size}
      className="gap-2"
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : following ? (
        <>
          <UserMinus className="h-4 w-4" />
          Unfollow
        </>
      ) : (
        <>
          <UserPlus className="h-4 w-4" />
          Follow
        </>
      )}
    </Button>
  );
}
