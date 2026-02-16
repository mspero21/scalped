-- Migration: Convert from Elo-based to Position-based Rankings
-- This migration replaces elo_rating and global_elo_rating with rank_position and global_rank_position

-- Add new position columns
ALTER TABLE stadium_ratings 
ADD COLUMN IF NOT EXISTS rank_position integer NOT NULL DEFAULT 1,
ADD COLUMN IF NOT EXISTS global_rank_position integer NOT NULL DEFAULT 1;

-- Migrate existing data: convert Elo ratings to positions
-- Higher Elo = better rank (lower position number)
-- For sport-specific positions
WITH ranked_sport AS (
  SELECT 
    id,
    ROW_NUMBER() OVER (
      PARTITION BY user_id, sport 
      ORDER BY elo_rating DESC
    ) as new_rank_position
  FROM stadium_ratings
)
UPDATE stadium_ratings sr
SET rank_position = rs.new_rank_position
FROM ranked_sport rs
WHERE sr.id = rs.id;

-- For global positions
WITH ranked_global AS (
  SELECT 
    id,
    ROW_NUMBER() OVER (
      PARTITION BY user_id 
      ORDER BY global_elo_rating DESC
    ) as new_global_rank_position
  FROM stadium_ratings
)
UPDATE stadium_ratings sr
SET global_rank_position = rg.new_global_rank_position
FROM ranked_global rg
WHERE sr.id = rg.id;

-- Drop old Elo columns
ALTER TABLE stadium_ratings 
DROP COLUMN IF EXISTS elo_rating,
DROP COLUMN IF EXISTS global_elo_rating;

-- Drop old Elo-based indexes
DROP INDEX IF EXISTS idx_stadium_ratings_elo;
DROP INDEX IF EXISTS idx_stadium_ratings_global_elo;

-- Create new position-based indexes
CREATE INDEX IF NOT EXISTS idx_stadium_ratings_position 
ON stadium_ratings(user_id, sport, rank_position);

CREATE INDEX IF NOT EXISTS idx_stadium_ratings_global_position 
ON stadium_ratings(user_id, global_rank_position);

-- Update the get_next_comparison function to use positions instead of Elo
CREATE OR REPLACE FUNCTION get_next_comparison(
  p_user_id uuid,
  p_new_stadium_id uuid,
  p_sport sport_type
)
RETURNS TABLE(compare_to_stadium_id uuid) AS $$
DECLARE
  total_count integer;
  mid_position integer;
BEGIN
  -- Count stadiums of same sport (excluding the new one)
  SELECT COUNT(*) INTO total_count
  FROM stadium_ratings sr
  WHERE sr.user_id = p_user_id
    AND sr.stadium_id != p_new_stadium_id
    AND sr.sport = p_sport;
  
  IF total_count > 0 THEN
    -- Find the middle position for binary search
    mid_position := (total_count + 1) / 2;
    
    RETURN QUERY
    SELECT sr.stadium_id
    FROM stadium_ratings sr
    WHERE sr.user_id = p_user_id
      AND sr.stadium_id != p_new_stadium_id
      AND sr.sport = p_sport
    ORDER BY sr.rank_position
    OFFSET mid_position - 1
    LIMIT 1;
  ELSE
    -- No same-sport stadiums, try global
    SELECT COUNT(*) INTO total_count
    FROM stadium_ratings sr
    WHERE sr.user_id = p_user_id
      AND sr.stadium_id != p_new_stadium_id;
    
    IF total_count > 0 THEN
      mid_position := (total_count + 1) / 2;
      
      RETURN QUERY
      SELECT sr.stadium_id
      FROM stadium_ratings sr
      WHERE sr.user_id = p_user_id
        AND sr.stadium_id != p_new_stadium_id
      ORDER BY sr.global_rank_position
      OFFSET mid_position - 1
      LIMIT 1;
    END IF;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

