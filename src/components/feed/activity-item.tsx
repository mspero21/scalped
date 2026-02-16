'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { MapPin, Trophy, Star, ListPlus } from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { formatDistanceToNow } from 'date-fns';

// Local type definitions to avoid import issues
type ActivityType = 'visit' | 'ranking' | 'review' | 'bucket_list';

interface StadiumInfo {
  id: string;
  name: string;
  city: string;
  state: string;
  sport: string;
  image_url: string | null;
  teams?: Array<{ name: string; primary_color: string | null }>;
}

interface ProfileInfo {
  id: string;
  username: string;
  display_name: string | null;
  avatar_url: string | null;
}

interface ActivityItem {
  id: string;
  type: ActivityType;
  user_id: string;
  stadium_id: string;
  created_at: string;
  data: Record<string, unknown>;
  profile?: ProfileInfo;
  stadium?: StadiumInfo;
}

interface ActivityItemProps {
  activity: ActivityItem;
}

function getActivityIcon(type: ActivityType) {
  switch (type) {
    case 'visit':
      return MapPin;
    case 'ranking':
      return Trophy;
    case 'review':
      return Star;
    case 'bucket_list':
      return ListPlus;
    default:
      return MapPin;
  }
}

function getActivityColor(type: ActivityType): string {
  switch (type) {
    case 'visit':
      return '#f97316'; // orange
    case 'ranking':
      return '#eab308'; // yellow
    case 'review':
      return '#8b5cf6'; // purple
    case 'bucket_list':
      return '#06b6d4'; // cyan
    default:
      return '#71717a'; // zinc
  }
}

function getActivityText(activity: ActivityItem): string {
  switch (activity.type) {
    case 'visit':
      return 'visited';
    case 'ranking':
      return 'ranked';
    case 'review':
      return 'reviewed';
    case 'bucket_list':
      return 'added to bucket list';
    default:
      return 'interacted with';
  }
}

function getActivityDetails(activity: ActivityItem): string | null {
  switch (activity.type) {
    case 'visit':
      if (activity.data.event_name) {
        return `for ${activity.data.event_name}`;
      }
      return null;
    case 'ranking':
      const tier = activity.data.tier as string;
      if (tier) {
        const tierLabels: Record<string, string> = {
          LOVED: 'Loved it!',
          LIKED: 'Liked it',
          OKAY: 'It was okay',
          DISLIKED: "Didn't love it"
        };
        return `as "${tierLabels[tier] || tier}"`;
      }
      return null;
    case 'review':
      const rating = activity.data.rating as number;
      if (rating) {
        return `${rating}/5 stars`;
      }
      return null;
    default:
      return null;
  }
}

function isStadiumInfo(value: unknown): value is StadiumInfo {
  return value !== null && typeof value === 'object' && 'name' in value && 'city' in value;
}

function renderStadiumCard(stadium: unknown, stadiumId: string): ReactNode {
  if (isStadiumInfo(stadium)) {
    return <StadiumCard stadium={stadium} stadiumId={stadiumId} />;
  }
  return null;
}

function StadiumCard({ stadium, stadiumId }: { stadium: StadiumInfo; stadiumId: string }) {
  return (
    <Link
      href={`/stadium/${stadiumId}`}
      className="block mt-2"
    >
      <div className="flex items-center gap-3 p-2 rounded-lg bg-[var(--card-bg-secondary)] hover:bg-[var(--card-hover)] transition-colors">
        {stadium.image_url ? (
          <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-[var(--card-border)]">
            <img
              src={stadium.image_url}
              alt={stadium.name}
              className="w-full h-full object-cover"
            />
          </div>
        ) : null}
        <div className="flex-1 min-w-0">
          <p className="font-medium text-sm text-[var(--foreground)] truncate">
            {stadium.name}
          </p>
          <p className="text-xs text-[var(--foreground-muted)]">
            {stadium.city}, {stadium.state}
          </p>
          <p className="text-xs text-[var(--foreground-muted)]">
            {stadium.sport}
          </p>
        </div>
      </div>
    </Link>
  );
}

export function ActivityItemComponent({ activity }: ActivityItemProps) {
  const Icon = getActivityIcon(activity.type);
  const color = getActivityColor(activity.type);
  const actionText = getActivityText(activity);
  const details = getActivityDetails(activity);
  const timeAgo = formatDistanceToNow(new Date(activity.created_at), { addSuffix: true });

  const displayName = activity.profile?.display_name || activity.profile?.username || 'Unknown User';
  const username = activity.profile?.username || 'unknown';
  const stadium = activity.stadium as StadiumInfo | undefined;

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex gap-3">
          {/* Icon */}
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: `${color}20` }}
          >
            <Icon className="h-5 w-5" style={{ color }} />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start gap-2 mb-2">
              {/* User Avatar */}
              <Link href={`/profile/${username}`} className="flex-shrink-0">
                <Avatar
                  src={activity.profile?.avatar_url}
                  name={displayName}
                  size="sm"
                  className="h-6 w-6"
                />
              </Link>

              {/* Activity Text */}
              <div className="flex-1 min-w-0">
                <p className="text-sm text-[var(--foreground)]">
                  <Link
                    href={`/profile/${username}`}
                    className="font-semibold hover:underline text-[var(--foreground)]"
                  >
                    {displayName}
                  </Link>
                  {' '}
                  <span className="text-[var(--foreground-muted)]">{actionText}</span>
                  {' '}
                  <Link
                    href={`/stadium/${activity.stadium_id}`}
                    className="font-medium hover:underline text-[var(--accent)]"
                  >
                    {stadium?.name ?? 'Unknown Stadium'}
                  </Link>
                  {details && (
                    <span className="text-[var(--foreground-muted)]"> {details}</span>
                  )}
                </p>
                <p className="text-xs text-[var(--foreground-muted)] mt-0.5">
                  {timeAgo}
                </p>
              </div>
            </div>

            {/* Stadium Card - disabled for type debugging */}
            {/* {renderStadiumCard(activity.stadium, activity.stadium_id)} */}

            {/* Review content preview - disabled for type debugging */}
            {/* {activity.type === 'review' && activity.data.content && (
              <p className="text-sm text-[var(--foreground-muted)] mt-2 line-clamp-2">
                &ldquo;{activity.data.content as string}&rdquo;
              </p>
            )} */}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
