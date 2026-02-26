'use client';

import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import { Flame } from 'lucide-react';
import { useFavoriteTeam } from '@/hooks/use-favorite-team';
import { getTeamTagline } from '@/lib/team-taglines';

export function TaglineBanner() {
  const pathname = usePathname();
  const { teamName, teamColors } = useFavoriteTeam();

  // Random tagline — picks once per page load, changes on refresh
  const tagline = useMemo(
    () => teamName ? getTeamTagline(teamName) : null,
    [teamName]
  );

  const hideOn = ['/login', '/signup', '/onboarding'];
  if (hideOn.some(path => pathname.startsWith(path))) return null;
  if (!tagline) return null;

  const accentColor = teamColors?.primary || 'var(--accent)';

  return (
    <div className="hidden md:flex justify-center py-2.5">
      <div
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider border"
        style={{
          borderColor: `${accentColor}40`,
          color: accentColor,
          backgroundColor: `${accentColor}10`,
          backdropFilter: 'blur(8px)',
        }}
      >
        <Flame className="h-3.5 w-3.5" />
        {tagline}
      </div>
    </div>
  );
}
