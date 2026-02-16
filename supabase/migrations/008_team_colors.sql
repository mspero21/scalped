-- Add team color columns to teams table
-- These colors are used for dynamic theming in the UI

-- Add color columns
ALTER TABLE teams ADD COLUMN IF NOT EXISTS primary_color text;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS secondary_color text;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS tertiary_color text;

-- Create index for faster lookups when joining with profiles
CREATE INDEX IF NOT EXISTS idx_teams_name_lower ON teams(LOWER(name));

-- Comment on columns
COMMENT ON COLUMN teams.primary_color IS 'Primary brand color in hex format (e.g., #CE1141)';
COMMENT ON COLUMN teams.secondary_color IS 'Secondary brand color in hex format';
COMMENT ON COLUMN teams.tertiary_color IS 'Optional tertiary brand color in hex format';

