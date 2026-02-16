'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode, createElement } from 'react';
import { getTeamColors, TeamColors, ensureAccentContrast, hexToRgb, adjustColor, isLightColor } from '@/lib/team-colors';

const STORAGE_KEY = 'scalped_favorite_team';
export const FAVORITE_TEAM_CHANGED_EVENT = 'scalped_favorite_team_changed';

function applyThemeColors(colors: TeamColors | null) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;

  if (colors) {
    const accent = ensureAccentContrast(colors.primary);
    const rgb = hexToRgb(accent);
    const foreground = isLightColor(accent) ? '#000000' : '#ffffff';

    root.style.setProperty('--accent', accent);
    root.style.setProperty('--accent-light', adjustColor(accent, 40));
    root.style.setProperty('--accent-dark', adjustColor(accent, -30));
    root.style.setProperty('--accent-bg', `rgba(${rgb}, 0.1)`);
    root.style.setProperty('--accent-bg-strong', `rgba(${rgb}, 0.15)`);
    root.style.setProperty('--accent-ring', `rgba(${rgb}, 0.5)`);
    root.style.setProperty('--accent-foreground', foreground);
    root.style.setProperty('--nav-text-active', accent);
    root.style.setProperty('--nav-active-bg', `rgba(${rgb}, 0.1)`);
  } else {
    const props = [
      '--accent', '--accent-light', '--accent-dark', '--accent-bg',
      '--accent-bg-strong', '--accent-ring', '--accent-foreground',
      '--nav-text-active', '--nav-active-bg',
    ];
    props.forEach(p => root.style.removeProperty(p));
  }
}

interface FavoriteTeamData {
  teamName: string | null;
  teamColors: TeamColors | null;
  loading: boolean;
  setFavoriteTeam: (teamName: string | null) => void;
}

const FavoriteTeamContext = createContext<FavoriteTeamData | undefined>(undefined);

export function FavoriteTeamProvider({ children }: { children: ReactNode }) {
  const [teamName, setTeamName] = useState<string | null>(null);
  const [teamColors, setTeamColors] = useState<TeamColors | null>(null);
  const [loading, setLoading] = useState(true);

  // Load from localStorage on mount and listen for changes
  useEffect(() => {
    function syncFromStorage() {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const colors = getTeamColors(stored);
          setTeamName(stored);
          setTeamColors(colors);
          applyThemeColors(colors);
        } else {
          setTeamName(null);
          setTeamColors(null);
          applyThemeColors(null);
        }
      } catch {
        // localStorage not available
      }
    }

    syncFromStorage();
    setLoading(false);

    // Listen for cross-tab storage changes and same-tab custom events (e.g. sign out)
    window.addEventListener('storage', syncFromStorage);
    window.addEventListener(FAVORITE_TEAM_CHANGED_EVENT, syncFromStorage);
    return () => {
      window.removeEventListener('storage', syncFromStorage);
      window.removeEventListener(FAVORITE_TEAM_CHANGED_EVENT, syncFromStorage);
    };
  }, []);

  const setFavoriteTeam = useCallback((name: string | null) => {
    setTeamName(name);
    if (name) {
      const colors = getTeamColors(name);
      setTeamColors(colors);
      applyThemeColors(colors);
      try {
        localStorage.setItem(STORAGE_KEY, name);
      } catch {
        // localStorage not available
      }
    } else {
      setTeamColors(null);
      applyThemeColors(null);
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        // localStorage not available
      }
    }
  }, []);

  return createElement(
    FavoriteTeamContext.Provider,
    { value: { teamName, teamColors, loading, setFavoriteTeam } },
    children
  );
}

export function useFavoriteTeam(): FavoriteTeamData {
  const context = useContext(FavoriteTeamContext);
  if (context === undefined) {
    throw new Error('useFavoriteTeam must be used within a FavoriteTeamProvider');
  }
  return context;
}
