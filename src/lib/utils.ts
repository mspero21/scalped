import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date));
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function getSportEmoji(sport: string): string {
  const sportEmojis: Record<string, string> = {
    NFL: '🏈',
    NBA: '🏀',
    MLB: '⚾',
    NHL: '🏒',
    MLS: '⚽',
    NCAA_FOOTBALL: '🏈',
    NCAA_BASKETBALL: '🏀',
    SOCCER: '⚽',
    RUGBY: '🏉',
    CRICKET: '🏏',
    MOTORSPORT: '🏎️',
    AFL: '🏉',
    CFL: '🏈',
    XFL: '🏈',
    OTHER: '🏟️',
  };
  return sportEmojis[sport] || '🏟️';
}

export function getSportLabel(sport: string): string {
  const sportLabels: Record<string, string> = {
    NFL: 'NFL',
    NBA: 'NBA',
    MLB: 'MLB',
    NHL: 'NHL',
    MLS: 'MLS',
    NCAA_FOOTBALL: 'College Football',
    NCAA_BASKETBALL: 'College Basketball',
    SOCCER: 'Soccer',
    RUGBY: 'Rugby',
    CRICKET: 'Cricket',
    MOTORSPORT: 'Motorsport',
    AFL: 'AFL',
    CFL: 'CFL',
    XFL: 'XFL',
    OTHER: 'Other',
  };
  return sportLabels[sport] || sport;
}

// Sport categories for grouping in UI
export const SPORT_CATEGORIES = {
  'US Sports': ['NFL', 'NBA', 'MLB', 'NHL', 'MLS'],
  'College': ['NCAA_FOOTBALL', 'NCAA_BASKETBALL'],
  'International Soccer': ['SOCCER'],
  'Other Sports': ['RUGBY', 'CRICKET', 'MOTORSPORT', 'AFL', 'CFL', 'XFL'],
} as const;

// All sports in display order
export const ALL_SPORTS = [
  'NFL', 'NBA', 'MLB', 'NHL', 'MLS',
  'SOCCER',
  'NCAA_FOOTBALL', 'NCAA_BASKETBALL',
  'RUGBY', 'CRICKET', 'MOTORSPORT',
  'AFL', 'CFL', 'XFL',
  'OTHER',
] as const;

