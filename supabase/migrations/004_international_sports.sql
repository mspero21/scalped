-- Migration: Add international sport types for global venues
-- This adds support for Soccer (Football), Rugby, Cricket, Motorsport, etc.

-- Add new sport types to the enum
-- Note: In PostgreSQL, we need to add new values to an existing enum
ALTER TYPE sport_type ADD VALUE IF NOT EXISTS 'SOCCER';
ALTER TYPE sport_type ADD VALUE IF NOT EXISTS 'RUGBY';
ALTER TYPE sport_type ADD VALUE IF NOT EXISTS 'CRICKET';
ALTER TYPE sport_type ADD VALUE IF NOT EXISTS 'MOTORSPORT';
ALTER TYPE sport_type ADD VALUE IF NOT EXISTS 'AFL';
ALTER TYPE sport_type ADD VALUE IF NOT EXISTS 'CFL';
ALTER TYPE sport_type ADD VALUE IF NOT EXISTS 'XFL';

-- Add sportsdb_venue_id column for tracking external IDs (optional but useful for updates)
ALTER TABLE stadiums ADD COLUMN IF NOT EXISTS sportsdb_venue_id text;

-- Add league column for better categorization
ALTER TABLE stadiums ADD COLUMN IF NOT EXISTS league text;

-- Create index on sportsdb_venue_id for lookups
CREATE INDEX IF NOT EXISTS idx_stadiums_sportsdb_venue_id ON stadiums(sportsdb_venue_id);

-- Create index on league for filtering
CREATE INDEX IF NOT EXISTS idx_stadiums_league ON stadiums(league);

-- Update existing stadiums to have league info based on sport
UPDATE stadiums SET league = 'NFL' WHERE sport = 'NFL' AND league IS NULL;
UPDATE stadiums SET league = 'NBA' WHERE sport = 'NBA' AND league IS NULL;
UPDATE stadiums SET league = 'MLB' WHERE sport = 'MLB' AND league IS NULL;
UPDATE stadiums SET league = 'NHL' WHERE sport = 'NHL' AND league IS NULL;
UPDATE stadiums SET league = 'MLS' WHERE sport = 'MLS' AND league IS NULL;

