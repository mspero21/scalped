'use client';

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { getTeamColors, isLightColor, TeamColors, hexToRgb, adjustColor, ensureAccentContrast } from '@/lib/team-colors';
import { useFavoriteTeam } from '@/hooks/use-favorite-team';

// ============ ThemeProvider (global, auto-reads favorite team) ============

export function ThemeProvider({ children }: { children: ReactNode }) {
  // CSS variable application is now handled directly in FavoriteTeamProvider's
  // setFavoriteTeam function (synchronous, no effect timing issues).
  // This component is kept as a wrapper for backwards compatibility.
  return <>{children}</>;
}

// ============ TeamThemeContext (for per-page overrides like stadium detail) ============

interface TeamThemeContextType {
  teamName: string | null;
  teamColors: TeamColors | null;
  setTeamTheme: (teamName: string | null) => void;
  clearTeamTheme: () => void;
  primaryTextClass: string;
  secondaryTextClass: string;
}

const TeamThemeContext = createContext<TeamThemeContextType | undefined>(undefined);

export function TeamThemeProvider({ children }: { children: ReactNode }) {
  const [teamName, setTeamName] = useState<string | null>(null);
  const [teamColors, setTeamColors] = useState<TeamColors | null>(null);

  const setTeamTheme = useCallback((name: string | null) => {
    setTeamName(name);
    if (name) {
      const colors = getTeamColors(name);
      setTeamColors(colors);
    } else {
      setTeamColors(null);
    }
  }, []);

  const clearTeamTheme = useCallback(() => {
    setTeamTheme(null);
  }, [setTeamTheme]);

  const primaryTextClass = teamColors && isLightColor(teamColors.primary)
    ? 'text-gray-900'
    : 'text-white';

  const secondaryTextClass = teamColors && isLightColor(teamColors.secondary)
    ? 'text-gray-900'
    : 'text-white';

  return (
    <TeamThemeContext.Provider
      value={{ teamName, teamColors, setTeamTheme, clearTeamTheme, primaryTextClass, secondaryTextClass }}
    >
      {children}
    </TeamThemeContext.Provider>
  );
}

export function useTeamTheme() {
  const context = useContext(TeamThemeContext);
  if (context === undefined) {
    throw new Error('useTeamTheme must be used within a TeamThemeProvider');
  }
  return context;
}

/**
 * Hook for local team theming without context (for isolated components like signup)
 */
export function useLocalTeamTheme() {
  const [teamName, setTeamName] = useState<string | null>(null);
  const [teamColors, setTeamColors] = useState<TeamColors | null>(null);

  const setTeamTheme = useCallback((name: string | null) => {
    setTeamName(name);
    if (name) {
      const colors = getTeamColors(name);
      setTeamColors(colors);
    } else {
      setTeamColors(null);
    }
  }, []);

  const clearTeamTheme = useCallback(() => {
    setTeamTheme(null);
  }, [setTeamTheme]);

  const primaryTextClass = teamColors && isLightColor(teamColors.primary)
    ? 'text-gray-900'
    : 'text-white';

  const secondaryTextClass = teamColors && isLightColor(teamColors.secondary)
    ? 'text-gray-900'
    : 'text-white';

  return {
    teamName,
    teamColors,
    setTeamTheme,
    clearTeamTheme,
    primaryTextClass,
    secondaryTextClass,
  };
}
