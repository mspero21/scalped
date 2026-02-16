/**
 * Zod validation schemas for database types
 *
 * Provides runtime validation for data fetched from Supabase and user input.
 * These schemas ensure type safety beyond TypeScript's compile-time checks.
 */

import { z } from 'zod';

// ============================================================================
// Enums and Basic Types
// ============================================================================

export const SportSchema = z.enum([
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
]);

export const RoofTypeSchema = z.enum(['OPEN', 'DOME', 'RETRACTABLE']);

export const InitialTierSchema = z.enum(['LOVED', 'LIKED', 'OKAY', 'DISLIKED']);

export const ActivityTypeSchema = z.enum(['visit', 'ranking', 'review', 'bucket_list']);

// ============================================================================
// Core Entity Schemas
// ============================================================================

/**
 * Team schema - represents a sports team
 */
export const TeamSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(200),
  sport: SportSchema,
  league: z.string().nullable(),
  stadium_id: z.string().uuid().nullable(),
  primary_color: z.string().nullable(),
  secondary_color: z.string().nullable(),
  tertiary_color: z.string().nullable(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

/**
 * Stadium schema - represents a physical venue
 */
export const StadiumSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(200),
  city: z.string().min(1).max(100),
  state: z.string().max(100),
  country: z.string().min(1).max(100),
  capacity: z.number().int().positive(),
  year_built: z.number().int().min(1800).max(2100),
  roof_type: RoofTypeSchema,
  image_url: z.string().url().nullable(),
  latitude: z.number().min(-90).max(90).nullable(),
  longitude: z.number().min(-180).max(180).nullable(),
  sportsdb_venue_id: z.string().nullable().optional(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

/**
 * Stadium with teams relation
 */
export const StadiumWithTeamsSchema = StadiumSchema.extend({
  teams: z.array(TeamSchema),
});

/**
 * Profile schema - user profile information
 */
export const ProfileSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  username: z.string().min(3).max(30).regex(/^[a-zA-Z0-9_-]+$/),
  display_name: z.string().max(100).nullable(),
  avatar_url: z.string().url().nullable(),
  bio: z.string().max(500).nullable(),
  favorite_team_id: z.string().uuid().nullable(),
  onboarding_completed: z.boolean(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

/**
 * Profile with favorite team relation
 */
export const ProfileWithTeamSchema = ProfileSchema.extend({
  favorite_team: TeamSchema.nullable(),
});

/**
 * Profile with statistics
 */
export const ProfileWithStatsSchema = ProfileSchema.extend({
  stadiums_visited: z.number().int().nonnegative(),
  stadiums_ranked: z.number().int().nonnegative(),
  followers_count: z.number().int().nonnegative(),
  following_count: z.number().int().nonnegative(),
});

/**
 * Visit schema - stadium visit record
 */
export const VisitSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  stadium_id: z.string().uuid(),
  visited_at: z.string().datetime(),
  section: z.string().max(50).nullable(),
  event_type: z.string().max(100).nullable(),
  notes: z.string().max(1000).nullable(),
  photos: z.array(z.string().url()),
  created_at: z.string().datetime(),
});

/**
 * Visit with stadium relation
 */
export const VisitWithStadiumSchema = VisitSchema.extend({
  stadium: StadiumSchema,
});

/**
 * Stadium rating schema - Elo-based ranking
 */
export const StadiumRatingSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  stadium_id: z.string().uuid(),
  // Elo-based schema
  elo_rating: z.number().min(0).max(3000).optional(),
  global_elo_rating: z.number().min(0).max(3000).optional(),
  // Position-based schema
  rank_position: z.number().int().positive().optional(),
  global_rank_position: z.number().int().positive().optional(),
  comparisons_count: z.number().int().nonnegative(),
  initial_tier: InitialTierSchema,
  sport: z.string().optional(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

/**
 * Stadium rating with stadium relation
 */
export const StadiumRatingWithStadiumSchema = StadiumRatingSchema.extend({
  stadium: StadiumSchema,
});

/**
 * Ranking schema (position-based ranking)
 */
export const RankingSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  stadium_id: z.string().uuid(),
  rank_position: z.number().int().positive(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

/**
 * Ranking with stadium relation
 */
export const RankingWithStadiumSchema = RankingSchema.extend({
  stadium: StadiumSchema,
});

/**
 * Comparison schema - pairwise comparison record
 */
export const ComparisonSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  winner_stadium_id: z.string().uuid(),
  loser_stadium_id: z.string().uuid(),
  is_same_sport: z.boolean(),
  created_at: z.string().datetime(),
});

/**
 * Review schema - stadium review with ratings
 */
export const ReviewSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  stadium_id: z.string().uuid(),
  atmosphere_rating: z.number().int().min(1).max(5),
  food_rating: z.number().int().min(1).max(5),
  sightlines_rating: z.number().int().min(1).max(5),
  accessibility_rating: z.number().int().min(1).max(5),
  value_rating: z.number().int().min(1).max(5),
  overall_rating: z.number().int().min(1).max(5),
  review_text: z.string().max(2000).nullable(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

/**
 * Bucket list item schema
 */
export const BucketListItemSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  stadium_id: z.string().uuid(),
  priority: z.number().int().min(1).max(5),
  notes: z.string().max(500).nullable(),
  created_at: z.string().datetime(),
});

/**
 * Follow relationship schema
 */
export const FollowSchema = z.object({
  id: z.string().uuid(),
  follower_id: z.string().uuid(),
  following_id: z.string().uuid(),
  created_at: z.string().datetime(),
});

/**
 * Activity feed item schema
 */
export const ActivitySchema = z.object({
  id: z.string().uuid(),
  type: ActivityTypeSchema,
  user: ProfileSchema,
  stadium: StadiumSchema,
  data: z.union([VisitSchema, RankingSchema, ReviewSchema, BucketListItemSchema]),
  created_at: z.string().datetime(),
});

// ============================================================================
// Input Validation Schemas (for user input)
// ============================================================================

/**
 * Create visit input schema
 */
export const CreateVisitInputSchema = z.object({
  stadium_id: z.string().uuid(),
  visited_at: z.string().datetime(),
  section: z.string().max(50).optional(),
  event_type: z.string().max(100).optional(),
  notes: z.string().max(1000).optional(),
  photos: z.array(z.string().url()).max(10).optional(),
});

/**
 * Create review input schema
 */
export const CreateReviewInputSchema = z.object({
  stadium_id: z.string().uuid(),
  atmosphere_rating: z.number().int().min(1).max(5),
  food_rating: z.number().int().min(1).max(5),
  sightlines_rating: z.number().int().min(1).max(5),
  accessibility_rating: z.number().int().min(1).max(5),
  value_rating: z.number().int().min(1).max(5),
  overall_rating: z.number().int().min(1).max(5),
  review_text: z.string().max(2000).optional(),
});

/**
 * Update profile input schema
 */
export const UpdateProfileInputSchema = z.object({
  display_name: z.string().max(100).optional(),
  bio: z.string().max(500).optional(),
  avatar_url: z.string().url().optional(),
  favorite_team_id: z.string().uuid().optional(),
});

/**
 * Create bucket list item input schema
 */
export const CreateBucketListInputSchema = z.object({
  stadium_id: z.string().uuid(),
  priority: z.number().int().min(1).max(5).default(3),
  notes: z.string().max(500).optional(),
});

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Validates data against a schema and returns typed result
 */
export function validate<T>(schema: z.ZodSchema<T>, data: unknown): T {
  return schema.parse(data);
}

/**
 * Safely validates data and returns result with error
 */
export function safeValidate<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; error: z.ZodError } {
  const result = schema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, error: result.error };
}

/**
 * Validates an array of data against a schema
 */
export function validateArray<T>(schema: z.ZodSchema<T>, data: unknown[]): T[] {
  return data.map((item) => schema.parse(item));
}

/**
 * Safely validates an array and returns partial results
 */
export function safeValidateArray<T>(
  schema: z.ZodSchema<T>,
  data: unknown[]
): { valid: T[]; invalid: Array<{ data: unknown; error: z.ZodError }> } {
  const valid: T[] = [];
  const invalid: Array<{ data: unknown; error: z.ZodError }> = [];

  data.forEach((item) => {
    const result = schema.safeParse(item);
    if (result.success) {
      valid.push(result.data);
    } else {
      invalid.push({ data: item, error: result.error });
    }
  });

  return { valid, invalid };
}

// Export type inference helpers
export type Sport = z.infer<typeof SportSchema>;
export type RoofType = z.infer<typeof RoofTypeSchema>;
export type InitialTier = z.infer<typeof InitialTierSchema>;
export type Team = z.infer<typeof TeamSchema>;
export type Stadium = z.infer<typeof StadiumSchema>;
export type StadiumWithTeams = z.infer<typeof StadiumWithTeamsSchema>;
export type Profile = z.infer<typeof ProfileSchema>;
export type ProfileWithTeam = z.infer<typeof ProfileWithTeamSchema>;
export type ProfileWithStats = z.infer<typeof ProfileWithStatsSchema>;
export type Visit = z.infer<typeof VisitSchema>;
export type VisitWithStadium = z.infer<typeof VisitWithStadiumSchema>;
export type StadiumRating = z.infer<typeof StadiumRatingSchema>;
export type StadiumRatingWithStadium = z.infer<typeof StadiumRatingWithStadiumSchema>;
export type Ranking = z.infer<typeof RankingSchema>;
export type RankingWithStadium = z.infer<typeof RankingWithStadiumSchema>;
export type Comparison = z.infer<typeof ComparisonSchema>;
export type Review = z.infer<typeof ReviewSchema>;
export type BucketListItem = z.infer<typeof BucketListItemSchema>;
export type Follow = z.infer<typeof FollowSchema>;
export type Activity = z.infer<typeof ActivitySchema>;
