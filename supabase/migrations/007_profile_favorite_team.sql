-- Add favorite_team_id to profiles table
-- This allows users to specify their favorite team

-- Add the column
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS favorite_team_id uuid REFERENCES teams(id) ON DELETE SET NULL;

-- Add index for faster lookups
CREATE INDEX IF NOT EXISTS idx_profiles_favorite_team ON profiles(favorite_team_id);

-- Add onboarding_completed flag to track if user has completed onboarding
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS onboarding_completed boolean DEFAULT false;

