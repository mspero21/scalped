-- Tighten RLS policies for production
-- Visits and legacy rankings should not be world-readable

-- Visits: only visible to the user themselves and their followers
DROP POLICY IF EXISTS "Visits are viewable by everyone" ON visits;
DROP POLICY IF EXISTS "Users can view own and followed users visits" ON visits;
CREATE POLICY "Users can view own and followed users visits"
  ON visits FOR SELECT
  USING (
    user_id = auth.uid() OR
    user_id IN (
      SELECT following_id FROM follows WHERE follower_id = auth.uid()
    )
  );

-- Legacy rankings table: user-only
DROP POLICY IF EXISTS "Rankings are viewable by everyone" ON rankings;
CREATE POLICY "Users can view their own rankings"
  ON rankings FOR SELECT
  USING (auth.uid() = user_id);

-- Add bio length constraint on profiles (UI enforces 160, DB gives safety margin)
ALTER TABLE profiles
  ADD CONSTRAINT profiles_bio_max_length CHECK (length(bio) <= 500);
