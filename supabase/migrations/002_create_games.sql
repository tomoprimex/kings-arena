-- Create games table
CREATE TABLE IF NOT EXISTS games (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  image_url TEXT,
  genre TEXT,
  active_players INTEGER DEFAULT 0,
  tournament_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE games ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Allow public read access to games
CREATE POLICY "Games are viewable by everyone"
  ON games FOR SELECT
  USING (true);

-- Allow admins to insert games
CREATE POLICY "Admins can insert games"
  ON games FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Allow admins to update games
CREATE POLICY "Admins can update games"
  ON games FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Allow admins to delete games
CREATE POLICY "Admins can delete games"
  ON games FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Create trigger to update updated_at on game changes
CREATE TRIGGER update_games_updated_at
  BEFORE UPDATE ON games
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create index on slug for faster lookups
CREATE INDEX IF NOT EXISTS games_slug_idx ON games(slug);

-- Create index on name for faster searches
CREATE INDEX IF NOT EXISTS games_name_idx ON games(name);

-- Insert initial game data
INSERT INTO games (name, slug, image_url, genre, active_players, tournament_count) VALUES
  ('FC 26', 'fc-26', '/images/fc.jpeg', 'Sports', 15000, 50),
  ('Call of Duty', 'call-of-duty', '/images/callofduty.webp', 'FPS', 25000, 80),
  ('eFootball', 'efootball', '/images/efootball.jpeg', 'Sports', 12000, 45),
  ('Free Fire', 'free-fire', '/images/freefire.webp', 'Battle Royale', 30000, 60),
  ('DLS 26', 'dls-26', '/images/dls.jpeg', 'Sports', 8000, 30)
ON CONFLICT (name) DO NOTHING;
