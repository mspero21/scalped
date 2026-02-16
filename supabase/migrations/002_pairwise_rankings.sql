-- Pairwise Rankings Schema
-- Implements Beli-style Elo-based pairwise comparison ranking system
-- Depends on: 001_base_schema.sql (sport_type enum, stadiums table)

-- Initial tier enum for quick categorization
DO $$ BEGIN
    CREATE TYPE initial_tier AS ENUM ('LOVED', 'LIKED', 'OKAY', 'DISLIKED');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Stadium ratings table - stores Elo ratings for each user's stadiums
CREATE TABLE IF NOT EXISTS stadium_ratings (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  stadium_id uuid REFERENCES stadiums(id) ON DELETE CASCADE NOT NULL,
  sport sport_type NOT NULL,
  elo_rating decimal(10, 2) NOT NULL DEFAULT 1500,
  global_elo_rating decimal(10, 2) NOT NULL DEFAULT 1500,
  comparisons_count integer NOT NULL DEFAULT 0,
  initial_tier initial_tier NOT NULL DEFAULT 'LIKED',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, stadium_id)
);

-- Comparisons table - stores history of all pairwise comparisons
CREATE TABLE IF NOT EXISTS comparisons (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  winner_stadium_id uuid REFERENCES stadiums(id) ON DELETE CASCADE NOT NULL,
  loser_stadium_id uuid REFERENCES stadiums(id) ON DELETE CASCADE NOT NULL,
  is_same_sport boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_stadium_ratings_user_id ON stadium_ratings(user_id);
CREATE INDEX IF NOT EXISTS idx_stadium_ratings_user_sport ON stadium_ratings(user_id, sport);
CREATE INDEX IF NOT EXISTS idx_stadium_ratings_elo ON stadium_ratings(user_id, elo_rating DESC);
CREATE INDEX IF NOT EXISTS idx_stadium_ratings_global_elo ON stadium_ratings(user_id, global_elo_rating DESC);
CREATE INDEX IF NOT EXISTS idx_comparisons_user_id ON comparisons(user_id);

-- RLS policies for stadium_ratings
ALTER TABLE stadium_ratings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own ratings"
  ON stadium_ratings FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own ratings"
  ON stadium_ratings FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own ratings"
  ON stadium_ratings FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own ratings"
  ON stadium_ratings FOR DELETE
  USING (auth.uid() = user_id);

-- RLS policies for comparisons
ALTER TABLE comparisons ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own comparisons"
  ON comparisons FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own comparisons"
  ON comparisons FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Function to get the next comparison pair for a user
-- Uses binary search logic to find the best comparison
CREATE OR REPLACE FUNCTION get_next_comparison(
  p_user_id uuid,
  p_new_stadium_id uuid,
  p_sport sport_type
)
RETURNS TABLE(compare_to_stadium_id uuid) AS $$
BEGIN
  -- Find a stadium to compare against using binary search
  -- Start with median-rated stadium of same sport
  RETURN QUERY
  SELECT sr.stadium_id
  FROM stadium_ratings sr
  WHERE sr.user_id = p_user_id
    AND sr.stadium_id != p_new_stadium_id
    AND sr.sport = p_sport
  ORDER BY ABS(sr.elo_rating - 1500)  -- Start with middle-rated stadiums
  LIMIT 1;
  
  -- If no same-sport stadiums, return any stadium
  IF NOT FOUND THEN
    RETURN QUERY
    SELECT sr.stadium_id
    FROM stadium_ratings sr
    WHERE sr.user_id = p_user_id
      AND sr.stadium_id != p_new_stadium_id
    ORDER BY ABS(sr.global_elo_rating - 1500)
    LIMIT 1;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

