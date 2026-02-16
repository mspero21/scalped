/**
 * Supabase Database Type Definitions
 *
 * Defines the database schema types for Supabase client.
 * These match the actual database columns.
 */

type StadiumRow = {
  id: string;
  name: string;
  city: string;
  state: string;
  country: string;
  capacity: number;
  year_built: number;
  roof_type: 'OPEN' | 'DOME' | 'RETRACTABLE';
  image_url: string | null;
  latitude: number | null;
  longitude: number | null;
  sportsdb_venue_id: string | null;
  team_name: string | null;
  sport: string;
  league: string | null;
  created_at: string;
  updated_at: string;
};

type ProfileRow = {
  id: string;
  user_id: string;
  username: string;
  display_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  email: string | null;
  favorite_team_id: string | null;
  created_at: string;
  updated_at: string;
};

type StadiumRatingRow = {
  id: string;
  user_id: string;
  stadium_id: string;
  elo_rating: number | null;
  global_elo_rating: number | null;
  rank_position: number | null;
  global_rank_position: number | null;
  comparisons_count: number;
  initial_tier: 'LOVED' | 'LIKED' | 'OKAY' | 'DISLIKED';
  sport: string | null;
  created_at: string;
  updated_at: string;
};

type ComparisonRow = {
  id: string;
  user_id: string;
  winner_stadium_id: string;
  loser_stadium_id: string;
  is_same_sport: boolean;
  created_at: string;
};

type VisitRow = {
  id: string;
  user_id: string;
  stadium_id: string;
  visited_at: string;
  section: string | null;
  event_type: string | null;
  notes: string | null;
  photos: string[];
  created_at: string;
};

type BucketListRow = {
  id: string;
  user_id: string;
  stadium_id: string;
  priority: number;
  notes: string | null;
  created_at: string;
};

type ReviewRow = {
  id: string;
  user_id: string;
  stadium_id: string;
  atmosphere_rating: number;
  food_rating: number;
  sightlines_rating: number;
  accessibility_rating: number;
  value_rating: number;
  overall_rating: number;
  review_text: string | null;
  created_at: string;
  updated_at: string;
};

type FollowRow = {
  id: string;
  follower_id: string;
  following_id: string;
  created_at: string;
};

type TeamRow = {
  id: string;
  name: string;
  sport: string;
  league: string | null;
  stadium_id: string | null;
  primary_color: string | null;
  secondary_color: string | null;
  tertiary_color: string | null;
  created_at: string;
  updated_at: string;
};

export type Database = {
  public: {
    Tables: {
      stadiums: {
        Row: StadiumRow;
        Insert: Omit<StadiumRow, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<StadiumRow, 'id' | 'created_at' | 'updated_at'>>;
        Relationships: [];
      };
      profiles: {
        Row: ProfileRow;
        Insert: Omit<ProfileRow, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<ProfileRow, 'id' | 'created_at' | 'updated_at'>>;
        Relationships: [];
      };
      stadium_ratings: {
        Row: StadiumRatingRow;
        Insert: Omit<StadiumRatingRow, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<StadiumRatingRow, 'id' | 'created_at' | 'updated_at'>>;
        Relationships: [];
      };
      comparisons: {
        Row: ComparisonRow;
        Insert: Omit<ComparisonRow, 'id' | 'created_at'>;
        Update: Partial<Omit<ComparisonRow, 'id' | 'created_at'>>;
        Relationships: [];
      };
      visits: {
        Row: VisitRow;
        Insert: Omit<VisitRow, 'id' | 'created_at'>;
        Update: Partial<Omit<VisitRow, 'id' | 'created_at'>>;
        Relationships: [];
      };
      bucket_list: {
        Row: BucketListRow;
        Insert: Omit<BucketListRow, 'id' | 'created_at'>;
        Update: Partial<Omit<BucketListRow, 'id' | 'created_at'>>;
        Relationships: [];
      };
      reviews: {
        Row: ReviewRow;
        Insert: Omit<ReviewRow, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<ReviewRow, 'id' | 'created_at' | 'updated_at'>>;
        Relationships: [];
      };
      follows: {
        Row: FollowRow;
        Insert: Omit<FollowRow, 'id' | 'created_at'>;
        Update: Partial<Omit<FollowRow, 'id' | 'created_at'>>;
        Relationships: [];
      };
      teams: {
        Row: TeamRow;
        Insert: Omit<TeamRow, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<TeamRow, 'id' | 'created_at' | 'updated_at'>>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
};

/**
 * Type-safe Supabase client type
 */
export type TypedSupabaseClient = import('@supabase/supabase-js').SupabaseClient<Database>;
