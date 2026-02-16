-- Scalped Base Database Schema
-- This migration creates the core tables

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Custom types
DO $$ BEGIN
    CREATE TYPE sport_type AS ENUM ('NFL', 'NBA', 'MLB', 'NHL', 'MLS', 'NCAA_FOOTBALL', 'NCAA_BASKETBALL', 'SOCCER', 'RUGBY', 'CRICKET', 'MOTORSPORT', 'AFL', 'CFL', 'XFL', 'OTHER');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE roof_type AS ENUM ('OPEN', 'DOME', 'RETRACTABLE');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Stadiums table
CREATE TABLE IF NOT EXISTS stadiums (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  city text NOT NULL,
  state text NOT NULL,
  country text NOT NULL DEFAULT 'USA',
  sport sport_type NOT NULL,
  team_name text NOT NULL,
  capacity integer NOT NULL,
  year_built integer NOT NULL,
  roof_type roof_type NOT NULL DEFAULT 'OPEN',
  image_url text,
  latitude decimal(10, 8),
  longitude decimal(11, 8),
  league text,
  sportsdb_venue_id text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Profiles table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  username text UNIQUE NOT NULL,
  display_name text,
  avatar_url text,
  bio text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Visits table (track stadium visits)
CREATE TABLE IF NOT EXISTS visits (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  stadium_id uuid REFERENCES stadiums(id) ON DELETE CASCADE NOT NULL,
  visited_at date NOT NULL DEFAULT current_date,
  section text,
  event_type text,
  notes text,
  photos text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, stadium_id, visited_at)
);

-- Rankings table (user's ranked stadium list)
CREATE TABLE IF NOT EXISTS rankings (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  stadium_id uuid REFERENCES stadiums(id) ON DELETE CASCADE NOT NULL,
  rank_position integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, stadium_id),
  UNIQUE(user_id, rank_position)
);

-- Reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  stadium_id uuid REFERENCES stadiums(id) ON DELETE CASCADE NOT NULL,
  atmosphere_rating integer CHECK (atmosphere_rating BETWEEN 1 AND 5),
  food_rating integer CHECK (food_rating BETWEEN 1 AND 5),
  sightlines_rating integer CHECK (sightlines_rating BETWEEN 1 AND 5),
  accessibility_rating integer CHECK (accessibility_rating BETWEEN 1 AND 5),
  value_rating integer CHECK (value_rating BETWEEN 1 AND 5),
  overall_rating integer CHECK (overall_rating BETWEEN 1 AND 5) NOT NULL,
  review_text text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, stadium_id)
);

-- Bucket list table
CREATE TABLE IF NOT EXISTS bucket_list (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  stadium_id uuid REFERENCES stadiums(id) ON DELETE CASCADE NOT NULL,
  priority integer DEFAULT 0,
  notes text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, stadium_id)
);

-- Follows table (social features)
CREATE TABLE IF NOT EXISTS follows (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  follower_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  following_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(follower_id, following_id),
  CHECK (follower_id != following_id)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_stadiums_sport ON stadiums(sport);
CREATE INDEX IF NOT EXISTS idx_stadiums_city ON stadiums(city);
CREATE INDEX IF NOT EXISTS idx_visits_user ON visits(user_id);
CREATE INDEX IF NOT EXISTS idx_visits_stadium ON visits(stadium_id);
CREATE INDEX IF NOT EXISTS idx_rankings_user ON rankings(user_id);
CREATE INDEX IF NOT EXISTS idx_rankings_stadium ON rankings(stadium_id);
CREATE INDEX IF NOT EXISTS idx_reviews_stadium ON reviews(stadium_id);
CREATE INDEX IF NOT EXISTS idx_bucket_list_user ON bucket_list(user_id);
CREATE INDEX IF NOT EXISTS idx_follows_follower ON follows(follower_id);
CREATE INDEX IF NOT EXISTS idx_follows_following ON follows(following_id);

-- Row Level Security (RLS)
ALTER TABLE stadiums ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE visits ENABLE ROW LEVEL SECURITY;
ALTER TABLE rankings ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE bucket_list ENABLE ROW LEVEL SECURITY;
ALTER TABLE follows ENABLE ROW LEVEL SECURITY;

-- Stadiums: Public read access
CREATE POLICY "Stadiums are viewable by everyone" ON stadiums FOR SELECT USING (true);

-- Profiles: Public read, own write
CREATE POLICY "Profiles are viewable by everyone" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Visits: Public read, own write
CREATE POLICY "Visits are viewable by everyone" ON visits FOR SELECT USING (true);
CREATE POLICY "Users can manage own visits" ON visits FOR ALL USING (auth.uid() = user_id);

-- Rankings: Public read, own write
CREATE POLICY "Rankings are viewable by everyone" ON rankings FOR SELECT USING (true);
CREATE POLICY "Users can manage own rankings" ON rankings FOR ALL USING (auth.uid() = user_id);

-- Reviews: Public read, own write
CREATE POLICY "Reviews are viewable by everyone" ON reviews FOR SELECT USING (true);
CREATE POLICY "Users can manage own reviews" ON reviews FOR ALL USING (auth.uid() = user_id);

-- Bucket list: Public read, own write
CREATE POLICY "Bucket lists are viewable by everyone" ON bucket_list FOR SELECT USING (true);
CREATE POLICY "Users can manage own bucket list" ON bucket_list FOR ALL USING (auth.uid() = user_id);

-- Follows: Public read, own write
CREATE POLICY "Follows are viewable by everyone" ON follows FOR SELECT USING (true);
CREATE POLICY "Users can manage own follows" ON follows FOR ALL USING (auth.uid() = follower_id);

-- Function to create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (user_id, username, display_name)
  VALUES (new.id, new.email, split_part(new.email, '@', 1));
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to auto-create profile
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
