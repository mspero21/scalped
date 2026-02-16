'use client';

import { Settings, MapPin, Trophy, Bookmark, ChevronRight, Award, TrendingUp, Calendar, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { useAuth } from '@/hooks/use-auth';
import { useProfileStats } from '@/hooks/use-profile-stats';
import { useFavoriteTeam } from '@/hooks/use-favorite-team';
import { useFollows } from '@/hooks/use-follows';
import { FollowButton } from '@/components/profile/follow-button';
import { FollowersModal } from '@/components/profile/followers-modal';
import { FollowingModal } from '@/components/profile/following-modal';
import Link from 'next/link';
import { useState } from 'react';

export default function ProfilePage() {
  const { user, profile, loading } = useAuth();
  const { stats, loading: statsLoading } = useProfileStats(user?.id);
  const { teamName: favoriteTeam, teamColors } = useFavoriteTeam();
  const { followers, following, followersCount, followingCount } = useFollows(user?.id);

  const [followersModalOpen, setFollowersModalOpen] = useState(false);
  const [followingModalOpen, setFollowingModalOpen] = useState(false);

  if (loading || statsLoading) {
    return (
      <div className="min-h-screen pb-20">
        <div className="max-w-lg mx-auto px-4 pt-20">
          <div className="flex flex-col items-center py-8">
            <div className="h-24 w-24 rounded-full bg-[var(--skeleton)] animate-pulse mb-4" />
            <div className="h-6 w-32 bg-[var(--skeleton)] rounded animate-pulse mb-2" />
            <div className="h-4 w-48 bg-[var(--skeleton)] rounded animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen pb-20">
        <div className="max-w-lg mx-auto px-4 pt-20">
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-2xl bg-[var(--accent-bg)] flex items-center justify-center mx-auto mb-5">
              <Users className="h-8 w-8 text-[var(--accent)]" />
            </div>
            <h2 className="text-2xl font-bold text-[var(--foreground)] mb-3">
              Sign in to View Your Profile
            </h2>
            <p className="text-[var(--foreground-muted)] mb-8 max-w-sm mx-auto">
              Create an account to track your stadium visits and build your rankings.
            </p>
            <div className="flex gap-3 justify-center">
              <Link href="/login">
                <Button>Sign In</Button>
              </Link>
              <Link href="/signup">
                <Button variant="outline">Create Account</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const statItems = [
    { icon: MapPin, label: 'Visited', value: stats.stadiumsVisited },
    { icon: Trophy, label: 'Ranked', value: stats.stadiumsRanked },
    { icon: Bookmark, label: 'Bucket List', value: stats.bucketListCount },
  ];

  const memberSinceDate = stats.memberSince
    ? new Date(stats.memberSince).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    : null;

  // Dynamic colors based on team
  const stubGradStart = teamColors?.primary || '#fef3c7';
  const stubGradEnd = teamColors?.secondary || '#fed7aa';
  const accentColor = teamColors?.primary || '#10b981';

  return (
    <div className="min-h-screen pb-20">
      {/* Ambient team color glow */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none opacity-20 blur-3xl -z-10"
        style={{ background: `radial-gradient(ellipse at center, ${accentColor}60 0%, transparent 70%)` }}
      />

      <div className="relative z-10 max-w-lg mx-auto px-4 pt-20">
        {/* Profile Header */}
        <div className="rounded-2xl overflow-hidden mb-6 border border-[var(--card-border)] bg-[var(--card-bg-secondary)]/80">
          {/* Team color banner */}
          <div
            className="h-20 relative"
            style={{ background: `linear-gradient(135deg, ${stubGradStart}, ${stubGradEnd})` }}
          />

          {/* Avatar + Info */}
          <div className="px-5 -mt-10 relative">
            <div className="relative w-fit">
              <Avatar
                src={profile?.avatar_url}
                name={profile?.display_name || profile?.username || 'User'}
                size="xl"
                className="h-20 w-20 ring-4 ring-[var(--card-bg-secondary)]"
              />
              <Link href="/settings" className="absolute -bottom-1 -right-1 p-1.5 bg-[var(--skeleton)] rounded-full border border-[var(--card-border)]">
                <Settings className="h-3 w-3 text-[var(--foreground-muted)]" />
              </Link>
            </div>
            <div className="mt-2">
              <h1 className="text-xl font-extrabold text-[var(--foreground)] truncate">
                {profile?.display_name || profile?.username || 'Anonymous'}
              </h1>
              <p className="text-sm text-[var(--foreground-muted)]">@{profile?.username || 'user'}</p>
            </div>

            {/* Bio + Team */}
            <div className="mt-3 pb-4">
              {profile?.bio && (
                <p className="text-[var(--foreground-muted)] text-sm mb-2">{profile.bio}</p>
              )}
              <div className="flex items-center gap-3 text-xs text-[var(--foreground-muted)]">
                {favoriteTeam && (
                  <span className="flex items-center gap-1" style={{ color: accentColor }}>
                    {favoriteTeam}
                  </span>
                )}
                {memberSinceDate && (
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    Since {memberSinceDate}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Stats + Social Row */}
          <div className="grid grid-cols-5 border-t border-[var(--card-border)]">
            {statItems.map((stat) => (
              <div key={stat.label} className="py-3 text-center">
                <div className="text-lg font-bold text-[var(--foreground)]">{stat.value}</div>
                <div className="text-[10px] text-[var(--foreground-muted)] uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
            <button onClick={() => setFollowersModalOpen(true)} className="py-3 text-center hover:bg-white/5 transition-colors border-l border-[var(--card-border)]">
              <div className="text-lg font-bold text-[var(--foreground)]">{followersCount}</div>
              <div className="text-[10px] text-[var(--foreground-muted)] uppercase tracking-wider">Followers</div>
            </button>
            <button onClick={() => setFollowingModalOpen(true)} className="py-3 text-center hover:bg-white/5 transition-colors border-l border-[var(--card-border)]">
              <div className="text-lg font-bold text-[var(--foreground)]">{followingCount}</div>
              <div className="text-[10px] text-[var(--foreground-muted)] uppercase tracking-wider">Following</div>
            </button>
          </div>
        </div>

        {/* Achievements */}
        <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg-secondary)]/60 mb-5 p-4">
          <h3 className="text-sm font-bold text-[var(--foreground)] flex items-center gap-2 mb-3">
            <Award className="h-4 w-4" style={{ color: accentColor }} />
            Achievements
          </h3>
          <div className="flex flex-wrap gap-2">
            {stats.achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`px-3 py-1.5 rounded-full text-xs flex items-center gap-1.5 font-medium ${
                  achievement.earned ? '' : 'bg-[var(--skeleton)] text-[var(--foreground-muted)]'
                }`}
                style={achievement.earned ? {
                  backgroundColor: `${accentColor}15`,
                  color: accentColor,
                } : undefined}
                title={achievement.description}
              >
                <span>{achievement.emoji}</span>
                <span>{achievement.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sport Progress */}
        <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg-secondary)]/60 mb-5 p-4">
          <h3 className="text-sm font-bold text-[var(--foreground)] flex items-center gap-2 mb-3">
            <TrendingUp className="h-4 w-4" style={{ color: accentColor }} />
            League Progress
          </h3>
          {stats.sportProgress.length === 0 ? (
            <p className="text-sm text-[var(--foreground-muted)] text-center py-2">Visit stadiums to track your progress!</p>
          ) : (
            <div className="space-y-3">
              {stats.sportProgress.map((sp) => (
                <div key={sp.sport}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-medium text-[var(--foreground-muted)] flex items-center gap-1.5">
                      <span>{sp.emoji}</span>
                      {sp.label}
                    </span>
                    <span className="text-xs text-[var(--foreground-muted)]">
                      {sp.visited}/{sp.total} ({sp.percentage}%)
                    </span>
                  </div>
                  <div className="h-1.5 bg-[var(--skeleton)] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${sp.percentage}%`, backgroundColor: accentColor }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Top Ranked Stadiums */}
        {stats.topRanked.length > 0 && (
          <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg-secondary)]/60 mb-5 overflow-hidden">
            <div className="p-4 pb-2">
              <h3 className="text-sm font-bold text-[var(--foreground)] flex items-center gap-2">
                <Trophy className="h-4 w-4" style={{ color: accentColor }} />
                Top Ranked
              </h3>
            </div>
            {stats.topRanked.map((rating, index) => (
              <Link
                key={rating.id}
                href={`/stadium/${rating.stadium_id}`}
                className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors border-t border-[var(--card-border)]"
              >
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{
                    backgroundColor: index === 0 ? `${accentColor}20` : 'var(--skeleton)',
                    color: index === 0 ? accentColor : '#71717a',
                  }}
                >
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[var(--foreground)] truncate">{rating.stadium?.name}</p>
                  <p className="text-xs text-[var(--foreground-muted)]">{rating.stadium?.city}, {rating.stadium?.state}</p>
                </div>
                <ChevronRight className="h-4 w-4 text-[var(--foreground-muted)] flex-shrink-0" />
              </Link>
            ))}
            <Link
              href="/rankings"
              className="flex items-center justify-center p-3 text-sm font-medium border-t border-[var(--card-border)] hover:bg-white/5 transition-colors"
              style={{ color: accentColor }}
            >
              View All Rankings
            </Link>
          </div>
        )}

        {/* Recent Activity */}
        {stats.recentActivity.length > 0 && (
          <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg-secondary)]/60 mb-5 overflow-hidden">
            <div className="p-4 pb-2">
              <h3 className="text-sm font-bold text-[var(--foreground)] flex items-center gap-2">
                <MapPin className="h-4 w-4" style={{ color: accentColor }} />
                Recent Activity
              </h3>
            </div>
            {stats.recentActivity.map((activity) => (
              <Link
                key={activity.id}
                href={`/stadium/${activity.stadium_id}`}
                className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors border-t border-[var(--card-border)]"
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${accentColor}15` }}
                >
                  <MapPin className="h-4 w-4" style={{ color: accentColor }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[var(--foreground)] truncate">{activity.stadium?.name}</p>
                  <p className="text-xs text-[var(--foreground-muted)]">Added {new Date(activity.created_at).toLocaleDateString()}</p>
                </div>
                <ChevronRight className="h-4 w-4 text-[var(--foreground-muted)] flex-shrink-0" />
              </Link>
            ))}
          </div>
        )}

        {/* Quick Links */}
        <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg-secondary)]/60 overflow-hidden">
          <Link href="/rankings" className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors">
            <div className="flex items-center gap-3">
              <Trophy className="h-5 w-5" style={{ color: accentColor }} />
              <span className="text-[var(--foreground)] text-sm font-medium">My Rankings</span>
            </div>
            <ChevronRight className="h-4 w-4 text-[var(--foreground-muted)]" />
          </Link>
          <Link href="/stadiums" className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors border-t border-[var(--card-border)]">
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5" style={{ color: accentColor }} />
              <span className="text-[var(--foreground)] text-sm font-medium">Explore Stadiums</span>
            </div>
            <ChevronRight className="h-4 w-4 text-[var(--foreground-muted)]" />
          </Link>
          <Link href="/settings" className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors border-t border-[var(--card-border)]">
            <div className="flex items-center gap-3">
              <Settings className="h-5 w-5 text-[var(--foreground-muted)]" />
              <span className="text-[var(--foreground)] text-sm font-medium">Settings</span>
            </div>
            <ChevronRight className="h-4 w-4 text-[var(--foreground-muted)]" />
          </Link>
        </div>
      </div>

      {/* Followers Modal */}
      <FollowersModal
        followers={followers}
        isOpen={followersModalOpen}
        onClose={() => setFollowersModalOpen(false)}
        currentUserId={user?.id}
      />

      {/* Following Modal */}
      <FollowingModal
        following={following}
        isOpen={followingModalOpen}
        onClose={() => setFollowingModalOpen(false)}
        currentUserId={user?.id}
      />
    </div>
  );
}

