-- Social Feed RLS Policies
-- Allow users to view activity from people they follow

-- Stadium Ratings: Allow viewing ratings from followed users
CREATE POLICY "Users can view ratings from followed users"
  ON stadium_ratings FOR SELECT
  USING (
    user_id = auth.uid() OR
    user_id IN (
      SELECT following_id FROM follows WHERE follower_id = auth.uid()
    )
  );

-- Reviews: Update existing policy to allow viewing reviews from followed users
DROP POLICY IF EXISTS "Users can view their own reviews" ON reviews;
CREATE POLICY "Users can view own and followed users reviews"
  ON reviews FOR SELECT
  USING (
    user_id = auth.uid() OR
    user_id IN (
      SELECT following_id FROM follows WHERE follower_id = auth.uid()
    )
  );

-- Visits: Allow viewing visits from followed users
DROP POLICY IF EXISTS "Users can view their own visits" ON visits;
CREATE POLICY "Users can view own and followed users visits"
  ON visits FOR SELECT
  USING (
    user_id = auth.uid() OR
    user_id IN (
      SELECT following_id FROM follows WHERE follower_id = auth.uid()
    )
  );

-- Profiles: Allow viewing profiles of followed users (if not already allowed)
DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON profiles;
CREATE POLICY "Profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);
