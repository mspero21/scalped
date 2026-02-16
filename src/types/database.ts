// Database types for Supabase

// Sport types - includes US major sports, international soccer, and other global sports
export type Sport =
  | 'NFL'
  | 'NBA'
  | 'MLB'
  | 'NHL'
  | 'MLS'
  | 'NCAA_FOOTBALL'
  | 'NCAA_BASKETBALL'
  | 'SOCCER'        // International soccer/football
  | 'RUGBY'         // Rugby union/league
  | 'CRICKET'       // Cricket
  | 'MOTORSPORT'    // F1, NASCAR, etc.
  | 'AFL'           // Australian Football League
  | 'CFL'           // Canadian Football League
  | 'XFL'           // XFL
  | 'OTHER';

export type RoofType = 'OPEN' | 'DOME' | 'RETRACTABLE';

// Team that plays at a stadium
export interface Team {
  id: string;
  name: string;
  sport: Sport;
  league: string | null;
  stadium_id: string | null;
  primary_color: string | null;
  secondary_color: string | null;
  tertiary_color: string | null;
  created_at: string;
  updated_at: string;
}

// Stadium with sport and team info (denormalized for query efficiency)
export interface Stadium {
  id: string;
  name: string;
  city: string;
  state: string;
  country: string;
  capacity: number;
  year_built: number;
  roof_type: RoofType;
  image_url: string | null;
  latitude: number | null;
  longitude: number | null;
  sport: Sport;
  team_name: string;
  league: string | null;
  sportsdb_venue_id?: string | null;
  created_at: string;
  updated_at: string;
}

// Stadium with its teams loaded
export interface StadiumWithTeams extends Stadium {
  teams: Team[];
}

export interface Profile {
  id: string;
  user_id: string;
  username: string;
  display_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  email: string | null;
  favorite_team_id?: string | null; // Not in remote DB yet
  created_at: string;
  updated_at: string;
}

export interface Visit {
  id: string;
  user_id: string;
  stadium_id: string;
  visited_at: string;
  section: string | null;
  event_type: string | null;
  notes: string | null;
  photos: string[];
  created_at: string;
}

export interface Ranking {
  id: string;
  user_id: string;
  stadium_id: string;
  rank_position: number;
  created_at: string;
  updated_at: string;
}

// Pairwise ranking types
export interface StadiumRating {
  id: string;
  user_id: string;
  stadium_id: string;
  // Elo-based schema (original)
  elo_rating?: number;              // Elo rating (higher = better)
  global_elo_rating?: number;       // Global Elo rating (higher = better)
  // Position-based schema (new)
  rank_position?: number;           // Position within sport (1 = best)
  global_rank_position?: number;    // Position across all sports (1 = best)
  comparisons_count: number;        // Number of comparisons this stadium has been in
  initial_tier: 'LOVED' | 'LIKED' | 'OKAY' | 'DISLIKED';
  sport?: string;                   // Sport type for this rating
  created_at: string;
  updated_at: string;
}

export interface Comparison {
  id: string;
  user_id: string;
  winner_stadium_id: string;
  loser_stadium_id: string;
  is_same_sport: boolean;       // Whether this was a same-sport comparison
  created_at: string;
}

export interface StadiumRatingWithStadium extends StadiumRating {
  stadium: Stadium;
}

export interface Review {
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
}

export interface BucketListItem {
  id: string;
  user_id: string;
  stadium_id: string;
  priority: number;
  notes: string | null;
  created_at: string;
}

export interface Follow {
  id: string;
  follower_id: string;
  following_id: string;
  created_at: string;
}

// Extended types with relations
export interface StadiumWithVisit extends Stadium {
  visit?: Visit;
  review?: Review;
  user_ranking?: number;
}

export interface ProfileWithStats extends Profile {
  stadiums_visited: number;
  stadiums_ranked: number;
  followers_count: number;
  following_count: number;
}

export interface RankingWithStadium extends Ranking {
  stadium: Stadium;
}

export interface VisitWithStadium extends Visit {
  stadium: Stadium;
}

// Activity feed types
export interface Activity {
  id: string;
  type: 'visit' | 'ranking' | 'review' | 'bucket_list';
  user: Profile;
  stadium: Stadium;
  data: Visit | Ranking | Review | BucketListItem;
  created_at: string;
}

