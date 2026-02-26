-- User-generated content: Food recommendations, Tips, Reviews, and Follows
-- Migration 010

-- Food Recommendations table
CREATE TABLE IF NOT EXISTS food_recommendations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  stadium_id UUID NOT NULL REFERENCES stadiums(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  item_name VARCHAR(100), -- e.g., "Garlic Fries", "Craft Beer Stand"
  category VARCHAR(50) DEFAULT 'general', -- food, drink, snack, etc.
  upvotes INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, stadium_id, item_name)
);

-- Tips table
CREATE TABLE IF NOT EXISTS tips (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  stadium_id UUID NOT NULL REFERENCES stadiums(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  category VARCHAR(50) DEFAULT 'general', -- parking, seating, entry, transit, etc.
  upvotes INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Reviews table (more detailed than the existing simple review)
CREATE TABLE IF NOT EXISTS stadium_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  stadium_id UUID NOT NULL REFERENCES stadiums(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5), -- 1-5 stars optional
  visit_date DATE, -- optional: when they visited
  event_attended VARCHAR(200), -- optional: what event
  would_return BOOLEAN,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, stadium_id) -- one review per user per stadium
);

-- Upvotes tracking (to prevent duplicate upvotes)
CREATE TABLE IF NOT EXISTS content_upvotes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content_type VARCHAR(20) NOT NULL, -- 'food', 'tip'
  content_id UUID NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, content_type, content_id)
);

-- Follows table for social features
CREATE TABLE IF NOT EXISTS follows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  follower_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  following_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(follower_id, following_id),
  CHECK (follower_id != following_id) -- can't follow yourself
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_food_recommendations_stadium ON food_recommendations(stadium_id);
CREATE INDEX IF NOT EXISTS idx_food_recommendations_user ON food_recommendations(user_id);
CREATE INDEX IF NOT EXISTS idx_tips_stadium ON tips(stadium_id);
CREATE INDEX IF NOT EXISTS idx_tips_user ON tips(user_id);
CREATE INDEX IF NOT EXISTS idx_stadium_reviews_stadium ON stadium_reviews(stadium_id);
CREATE INDEX IF NOT EXISTS idx_stadium_reviews_user ON stadium_reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_follows_follower ON follows(follower_id);
CREATE INDEX IF NOT EXISTS idx_follows_following ON follows(following_id);
CREATE INDEX IF NOT EXISTS idx_content_upvotes_content ON content_upvotes(content_type, content_id);

-- RLS Policies
ALTER TABLE food_recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE tips ENABLE ROW LEVEL SECURITY;
ALTER TABLE stadium_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_upvotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE follows ENABLE ROW LEVEL SECURITY;

-- Food recommendations policies
CREATE POLICY "Anyone can view food recommendations" ON food_recommendations
  FOR SELECT USING (true);
CREATE POLICY "Users can insert own food recommendations" ON food_recommendations
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own food recommendations" ON food_recommendations
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own food recommendations" ON food_recommendations
  FOR DELETE USING (auth.uid() = user_id);

-- Tips policies
CREATE POLICY "Anyone can view tips" ON tips
  FOR SELECT USING (true);
CREATE POLICY "Users can insert own tips" ON tips
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own tips" ON tips
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own tips" ON tips
  FOR DELETE USING (auth.uid() = user_id);

-- Reviews policies
CREATE POLICY "Anyone can view reviews" ON stadium_reviews
  FOR SELECT USING (true);
CREATE POLICY "Users can insert own reviews" ON stadium_reviews
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own reviews" ON stadium_reviews
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own reviews" ON stadium_reviews
  FOR DELETE USING (auth.uid() = user_id);

-- Upvotes policies
CREATE POLICY "Anyone can view upvotes" ON content_upvotes
  FOR SELECT USING (true);
CREATE POLICY "Users can insert own upvotes" ON content_upvotes
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own upvotes" ON content_upvotes
  FOR DELETE USING (auth.uid() = user_id);

-- Follows policies (drop old broad policies from 001_base_schema, replace with granular ones)
DROP POLICY IF EXISTS "Follows are viewable by everyone" ON follows;
DROP POLICY IF EXISTS "Users can manage own follows" ON follows;
CREATE POLICY "Anyone can view follows" ON follows
  FOR SELECT USING (true);
CREATE POLICY "Users can follow others" ON follows
  FOR INSERT WITH CHECK (auth.uid() = follower_id);
CREATE POLICY "Users can unfollow" ON follows
  FOR DELETE USING (auth.uid() = follower_id);

