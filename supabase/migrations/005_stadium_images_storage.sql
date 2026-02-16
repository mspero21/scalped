-- Stadium Images Storage and Multiple Images Support
-- Creates storage bucket and stadium_images table for multiple images per stadium

-- Create storage bucket for stadium images (if not exists)
INSERT INTO storage.buckets (id, name, public)
VALUES ('stadium-images', 'stadium-images', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access to stadium images
CREATE POLICY "Stadium images are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'stadium-images');

-- Allow authenticated users to upload images (for admin purposes)
CREATE POLICY "Authenticated users can upload stadium images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'stadium-images' AND auth.role() = 'authenticated');

-- Stadium images table - supports multiple images per stadium
CREATE TABLE IF NOT EXISTS stadium_images (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  stadium_id uuid REFERENCES stadiums(id) ON DELETE CASCADE NOT NULL,
  image_url text NOT NULL,
  storage_path text, -- Path in Supabase storage (null if external URL)
  caption text,
  source text, -- e.g., 'wikipedia', 'user', 'official'
  source_url text, -- Original source URL for attribution
  is_primary boolean DEFAULT false,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Index for fast lookups
CREATE INDEX IF NOT EXISTS idx_stadium_images_stadium ON stadium_images(stadium_id);
CREATE INDEX IF NOT EXISTS idx_stadium_images_primary ON stadium_images(stadium_id, is_primary) WHERE is_primary = true;

-- Enable RLS
ALTER TABLE stadium_images ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Stadium images are viewable by everyone" 
ON stadium_images FOR SELECT USING (true);

-- Only allow insert/update via service role (admin)
CREATE POLICY "Service role can manage stadium images"
ON stadium_images FOR ALL
USING (auth.jwt() ->> 'role' = 'service_role');

