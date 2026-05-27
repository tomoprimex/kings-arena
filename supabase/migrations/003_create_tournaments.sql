-- Create tournaments table
CREATE TABLE IF NOT EXISTS tournaments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  game_id UUID REFERENCES games(id) ON DELETE CASCADE,
  tournament_type TEXT NOT NULL CHECK (
    tournament_type IN ('National Cup', 'Continental Championship', 'World Championship', 'Pro Series', 'National Qualifiers', 'Community Open')
  ),
  description TEXT,
  entry_fee DECIMAL(10, 2) DEFAULT 0.00,
  prize_pool DECIMAL(10, 2) DEFAULT 0.00,
  max_players INTEGER NOT NULL,
  current_players INTEGER DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'upcoming' CHECK (
    status IN ('upcoming', 'live', 'ended')
  ),
  banner_image TEXT,
  start_date TIMESTAMP WITH TIME ZONE,
  end_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE tournaments ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Allow public read access to tournaments
CREATE POLICY "Tournaments are viewable by everyone"
  ON tournaments FOR SELECT
  USING (true);

-- Allow admins to insert tournaments
CREATE POLICY "Admins can insert tournaments"
  ON tournaments FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Allow admins to update tournaments
CREATE POLICY "Admins can update tournaments"
  ON tournaments FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Allow admins to delete tournaments
CREATE POLICY "Admins can delete tournaments"
  ON tournaments FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Create trigger to update updated_at on tournament changes
CREATE TRIGGER update_tournaments_updated_at
  BEFORE UPDATE ON tournaments
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create index on game_id for faster lookups
CREATE INDEX IF NOT EXISTS tournaments_game_id_idx ON tournaments(game_id);

-- Create index on status for filtering
CREATE INDEX IF NOT EXISTS tournaments_status_idx ON tournaments(status);

-- Create index on tournament_type for filtering
CREATE INDEX IF NOT EXISTS tournaments_type_idx ON tournaments(tournament_type);

-- Create index on start_date for sorting
CREATE INDEX IF NOT EXISTS tournaments_start_date_idx ON tournaments(start_date);

-- Add check constraint for current_players <= max_players
ALTER TABLE tournaments ADD CONSTRAINT check_current_players 
  CHECK (current_players <= max_players);
