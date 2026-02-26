-- Make stadium_ratings publicly readable for the "All" feed tab
-- Previously only visible to the user and their followers

DROP POLICY IF EXISTS "Users can view their own ratings" ON stadium_ratings;
DROP POLICY IF EXISTS "Users can view ratings from followed users" ON stadium_ratings;

CREATE POLICY "Stadium ratings are viewable by everyone"
  ON stadium_ratings FOR SELECT
  USING (true);
