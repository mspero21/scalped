-- Migration 013: Restore sport and team_name columns on stadiums table
-- Migration 006 moved these to the teams table, but the frontend relies on them
-- being directly on stadiums. We add them back and keep them as the "primary team"
-- for each venue (populated by seed or application logic).

ALTER TABLE stadiums
  ADD COLUMN IF NOT EXISTS sport sport_type,
  ADD COLUMN IF NOT EXISTS team_name text,
  ADD COLUMN IF NOT EXISTS league text;

-- Populate from teams table if teams already exist
-- (picks the first team alphabetically for each stadium as the primary)
UPDATE stadiums s
SET
  sport = t.sport,
  team_name = t.name,
  league = t.league
FROM (
  SELECT DISTINCT ON (stadium_id)
    stadium_id,
    sport,
    name,
    league
  FROM teams
  ORDER BY stadium_id, name
) t
WHERE s.id = t.stadium_id;
