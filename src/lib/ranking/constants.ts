/**
 * Ranking System Constants
 *
 * Centralized constants for the stadium ranking system including
 * Elo ratings, tier definitions, and configuration values.
 */

// ============================================================================
// Elo Rating Configuration
// ============================================================================

/**
 * K-factor determines how much ratings change per comparison
 * Higher K = more volatile ratings, Lower K = more stable ratings
 */
export const K_FACTOR = 32;

/**
 * Base Elo rating - starting point before tier adjustment
 */
export const BASE_ELO = 1500;

/**
 * Elo divisor used in expected score calculation
 * Standard chess/Elo system uses 400
 */
export const ELO_DIVISOR = 400;

// ============================================================================
// Tier System
// ============================================================================

/**
 * Initial tier classifications with starting Elo ratings
 * Determines how users initially categorize stadiums they've visited
 */
export const INITIAL_TIERS = {
  LOVED: { label: 'Loved it!', eloBonus: 200, priority: 4 },
  LIKED: { label: 'Liked it', eloBonus: 50, priority: 3 },
  OKAY: { label: 'It was okay', eloBonus: 0, priority: 2 },
  DISLIKED: { label: "Didn't love it", eloBonus: -100, priority: 1 },
} as const;

export type InitialTier = keyof typeof INITIAL_TIERS;

/**
 * Tier ordering map - used for sorting stadiums by tier priority
 * Higher number = better tier
 */
export const TIER_ORDER: Record<InitialTier, number> = {
  LOVED: INITIAL_TIERS.LOVED.priority,
  LIKED: INITIAL_TIERS.LIKED.priority,
  OKAY: INITIAL_TIERS.OKAY.priority,
  DISLIKED: INITIAL_TIERS.DISLIKED.priority,
};

/**
 * Starting Elo ratings for each tier
 */
export const TIER_STARTING_ELO: Record<InitialTier, number> = {
  LOVED: BASE_ELO + INITIAL_TIERS.LOVED.eloBonus,   // 1700
  LIKED: BASE_ELO + INITIAL_TIERS.LIKED.eloBonus,   // 1550
  OKAY: BASE_ELO + INITIAL_TIERS.OKAY.eloBonus,     // 1500
  DISLIKED: BASE_ELO + INITIAL_TIERS.DISLIKED.eloBonus, // 1400
};

/**
 * Tier colors for UI display
 */
export const TIER_COLORS: Record<InitialTier, string> = {
  LOVED: 'pink',
  LIKED: 'emerald',
  OKAY: 'amber',
  DISLIKED: 'zinc',
};

// ============================================================================
// Sports Configuration
// ============================================================================

/**
 * Major US sports leagues (BIG4)
 */
export const BIG4_SPORTS = ['NFL', 'NBA', 'MLB', 'NHL'] as const;

/**
 * All supported sports
 */
export const ALL_SPORTS = [
  'NFL',
  'NBA',
  'MLB',
  'NHL',
  'MLS',
  'NCAA_FOOTBALL',
  'NCAA_BASKETBALL',
  'SOCCER',
  'RUGBY',
  'CRICKET',
  'MOTORSPORT',
  'AFL',
  'CFL',
  'XFL',
  'OTHER',
] as const;

/**
 * Sport display names for UI
 */
export const SPORT_LABELS: Record<string, string> = {
  NFL: 'NFL',
  NBA: 'NBA',
  MLB: 'MLB',
  NHL: 'NHL',
  MLS: 'MLS',
  NCAA_FOOTBALL: 'NCAA Football',
  NCAA_BASKETBALL: 'NCAA Basketball',
  SOCCER: 'Soccer',
  RUGBY: 'Rugby',
  CRICKET: 'Cricket',
  MOTORSPORT: 'Motorsport',
  AFL: 'AFL',
  CFL: 'CFL',
  XFL: 'XFL',
  OTHER: 'Other',
};

// ============================================================================
// Ranking Display Configuration
// ============================================================================

/**
 * Minimum Elo rating for display (1-10 scale)
 */
export const MIN_DISPLAY_SCORE = 1;

/**
 * Maximum Elo rating for display (1-10 scale)
 */
export const MAX_DISPLAY_SCORE = 10;

/**
 * Number of recent comparisons to show in history
 */
export const MAX_RECENT_COMPARISONS = 10;

/**
 * Minimum comparisons before showing Elo score
 */
export const MIN_COMPARISONS_FOR_SCORE = 3;

// ============================================================================
// Binary Search Configuration
// ============================================================================

/**
 * Maximum comparisons allowed per ranking session
 * Prevents infinite loops and ensures reasonable UX
 */
export const MAX_COMPARISONS_PER_SESSION = 20;

/**
 * Initial binary search range narrowing based on tier
 * Values represent what percentage of the list to consider
 */
export const TIER_SEARCH_RANGES: Record<InitialTier, { min: number; max: number }> = {
  LOVED: { min: 0, max: 0.5 },     // Top 50%
  LIKED: { min: 0.2, max: 0.8 },   // Middle 60%
  OKAY: { min: 0.4, max: 1.0 },    // Bottom 60%
  DISLIKED: { min: 0.5, max: 1.0 }, // Bottom 50%
};

// ============================================================================
// Pagination Configuration
// ============================================================================

/**
 * Default number of items per page for stadium lists
 */
export const DEFAULT_PAGE_SIZE = 20;

/**
 * Default number of items per page for reviews/tips/food
 */
export const DEFAULT_FEED_PAGE_SIZE = 10;

/**
 * Maximum items that can be requested in a single page
 */
export const MAX_PAGE_SIZE = 100;

// ============================================================================
// Validation Limits
// ============================================================================

/**
 * Maximum length for stadium names
 */
export const MAX_STADIUM_NAME_LENGTH = 200;

/**
 * Maximum length for review text
 */
export const MAX_REVIEW_LENGTH = 2000;

/**
 * Maximum length for visit notes
 */
export const MAX_VISIT_NOTES_LENGTH = 1000;

/**
 * Maximum length for bucket list notes
 */
export const MAX_BUCKET_LIST_NOTES_LENGTH = 500;

/**
 * Maximum length for user bio
 */
export const MAX_BIO_LENGTH = 500;

/**
 * Maximum number of photos per visit
 */
export const MAX_PHOTOS_PER_VISIT = 10;

/**
 * Username constraints
 */
export const USERNAME_MIN_LENGTH = 3;
export const USERNAME_MAX_LENGTH = 30;
export const USERNAME_REGEX = /^[a-zA-Z0-9_-]+$/;
