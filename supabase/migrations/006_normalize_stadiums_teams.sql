-- Normalize stadiums and teams schema
-- Stadiums become unique venues, teams are stored separately
-- This allows ranking a VENUE once, while showing all teams that play there

-- ============================================
-- 1. Create teams table
-- ============================================
CREATE TABLE IF NOT EXISTS teams (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  sport sport_type NOT NULL,
  league text,
  stadium_id uuid, -- Will add FK after stadiums are normalized
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- ============================================
-- 2. Populate teams from existing stadium data
-- ============================================
INSERT INTO teams (name, sport, league, stadium_id)
SELECT DISTINCT ON (team_name, sport)
  team_name as name,
  sport,
  league,
  id as stadium_id
FROM stadiums
ORDER BY team_name, sport, created_at;

-- ============================================
-- 3. Create temp table with normalized stadiums (one per venue)
-- ============================================
CREATE TEMP TABLE normalized_stadiums AS
SELECT DISTINCT ON (name, city)
  id,
  name,
  city,
  state,
  country,
  capacity,
  year_built,
  roof_type,
  image_url,
  latitude,
  longitude,
  sportsdb_venue_id,
  created_at,
  updated_at
FROM stadiums
ORDER BY name, city, created_at;

-- ============================================
-- 4. Create mapping from old stadium IDs to normalized stadium IDs
-- ============================================
CREATE TEMP TABLE stadium_id_mapping AS
SELECT 
  s.id as old_id,
  ns.id as new_id
FROM stadiums s
JOIN normalized_stadiums ns ON s.name = ns.name AND s.city = ns.city;

-- ============================================
-- 5. Update teams to point to normalized stadium IDs
-- ============================================
UPDATE teams t
SET stadium_id = m.new_id
FROM stadium_id_mapping m
WHERE t.stadium_id = m.old_id;

-- ============================================
-- 6. Update all foreign key references to use normalized IDs
-- ============================================

-- Update visits
UPDATE visits v
SET stadium_id = m.new_id
FROM stadium_id_mapping m
WHERE v.stadium_id = m.old_id AND m.old_id != m.new_id;

-- Update rankings
UPDATE rankings r
SET stadium_id = m.new_id
FROM stadium_id_mapping m
WHERE r.stadium_id = m.old_id AND m.old_id != m.new_id;

-- Update reviews
UPDATE reviews r
SET stadium_id = m.new_id
FROM stadium_id_mapping m
WHERE r.stadium_id = m.old_id AND m.old_id != m.new_id;

-- Update bucket_list
UPDATE bucket_list b
SET stadium_id = m.new_id
FROM stadium_id_mapping m
WHERE b.stadium_id = m.old_id AND m.old_id != m.new_id;

-- Update stadium_ratings
UPDATE stadium_ratings sr
SET stadium_id = m.new_id
FROM stadium_id_mapping m
WHERE sr.stadium_id = m.old_id AND m.old_id != m.new_id;

-- Update comparisons (both winner and loser)
UPDATE comparisons c
SET winner_stadium_id = m.new_id
FROM stadium_id_mapping m
WHERE c.winner_stadium_id = m.old_id AND m.old_id != m.new_id;

UPDATE comparisons c
SET loser_stadium_id = m.new_id
FROM stadium_id_mapping m
WHERE c.loser_stadium_id = m.old_id AND m.old_id != m.new_id;

-- ============================================
-- 7. Remove duplicate stadium_ratings (keep best ranked)
-- ============================================
DELETE FROM stadium_ratings sr1
USING stadium_ratings sr2
WHERE sr1.user_id = sr2.user_id
  AND sr1.stadium_id = sr2.stadium_id
  AND sr1.id != sr2.id
  AND sr1.rank_position > sr2.rank_position;

-- ============================================
-- 8. Delete duplicate stadiums (keep the normalized ones)
-- ============================================
DELETE FROM stadiums 
WHERE id NOT IN (SELECT id FROM normalized_stadiums);

-- ============================================
-- 9. Remove sport and team_name columns from stadiums
-- ============================================
ALTER TABLE stadiums DROP COLUMN IF EXISTS sport;
ALTER TABLE stadiums DROP COLUMN IF EXISTS team_name;
ALTER TABLE stadiums DROP COLUMN IF EXISTS league;

-- ============================================
-- 10. Add foreign key from teams to stadiums
-- ============================================
ALTER TABLE teams 
ADD CONSTRAINT teams_stadium_id_fkey 
FOREIGN KEY (stadium_id) REFERENCES stadiums(id) ON DELETE SET NULL;

-- ============================================
-- 11. Remove sport column from stadium_ratings (rankings are venue-based now)
-- ============================================
ALTER TABLE stadium_ratings DROP COLUMN IF EXISTS sport;

-- ============================================
-- 12. Add indexes for teams
-- ============================================
CREATE INDEX IF NOT EXISTS idx_teams_stadium ON teams(stadium_id);
CREATE INDEX IF NOT EXISTS idx_teams_sport ON teams(sport);
CREATE INDEX IF NOT EXISTS idx_teams_name ON teams(name);

-- ============================================
-- 13. Drop old sport index on stadiums
-- ============================================
DROP INDEX IF EXISTS idx_stadiums_sport;

-- ============================================
-- 14. Add unique constraint on stadium name + city
-- ============================================
ALTER TABLE stadiums ADD CONSTRAINT stadiums_name_city_unique UNIQUE (name, city);

-- ============================================
-- 15. RLS for teams (public read)
-- ============================================
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Teams are viewable by everyone" ON teams FOR SELECT USING (true);

-- Clean up temp tables
DROP TABLE IF EXISTS normalized_stadiums;
DROP TABLE IF EXISTS stadium_id_mapping;

