-- Insert storage buckets
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('avatars', 'avatars', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']),
  ('tournaments', 'tournaments', true, 10485760, ARRAY['image/jpeg', 'image/png', 'image/webp']),
  ('games', 'games', true, 10485760, ARRAY['image/jpeg', 'image/png', 'image/webp'])
ON CONFLICT (id) DO NOTHING;

-- Enable Row Level Security on storage
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Policies for avatars bucket
CREATE POLICY "Public read access to avatars"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'avatars');

CREATE POLICY "Users can upload their own avatar"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'avatars' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can update their own avatar"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'avatars' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete their own avatar"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'avatars' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Policies for tournaments bucket
CREATE POLICY "Public read access to tournament images"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'tournaments');

CREATE POLICY "Admins can upload tournament images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'tournaments' AND
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can update tournament images"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'tournaments' AND
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can delete tournament images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'tournaments' AND
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Policies for games bucket
CREATE POLICY "Public read access to game images"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'games');

CREATE POLICY "Admins can upload game images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'games' AND
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can update game images"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'games' AND
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can delete game images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'games' AND
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );
