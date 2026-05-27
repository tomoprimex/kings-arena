-- Create tournament_players table
CREATE TABLE IF NOT EXISTS tournament_players (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  tournament_id UUID REFERENCES tournaments(id) ON DELETE CASCADE NOT NULL,
  player_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(tournament_id, player_id)
);

-- Enable Row Level Security
ALTER TABLE tournament_players ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Allow public read access to tournament players
CREATE POLICY "Tournament players are viewable by everyone"
  ON tournament_players FOR SELECT
  USING (true);

-- Allow authenticated users to join tournaments
CREATE POLICY "Authenticated users can join tournaments"
  ON tournament_players FOR INSERT
  WITH CHECK (
    auth.uid() = player_id AND
    -- Check tournament exists and has space
    EXISTS (
      SELECT 1 FROM tournaments
      WHERE tournaments.id = tournament_id
      AND tournaments.current_players < tournaments.max_players
      AND tournaments.status = 'upcoming'
    )
  );

-- Allow users to leave tournaments
CREATE POLICY "Users can leave tournaments"
  ON tournament_players FOR DELETE
  USING (
    auth.uid() = player_id
  );

-- Create index on tournament_id for faster lookups
CREATE INDEX IF NOT EXISTS tournament_players_tournament_id_idx ON tournament_players(tournament_id);

-- Create index on player_id for faster lookups
CREATE INDEX IF NOT EXISTS tournament_players_player_id_idx ON tournament_players(player_id);

-- Create function to increment tournament player count when someone joins
CREATE OR REPLACE FUNCTION increment_tournament_players()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE tournaments
  SET current_players = current_players + 1
  WHERE id = NEW.tournament_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create function to decrement tournament player count when someone leaves
CREATE OR REPLACE FUNCTION decrement_tournament_players()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE tournaments
  SET current_players = current_players - 1
  WHERE id = OLD.tournament_id;
  RETURN OLD;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for player count management
CREATE TRIGGER on_tournament_player_join
  AFTER INSERT ON tournament_players
  FOR EACH ROW
  EXECUTE FUNCTION increment_tournament_players();

CREATE TRIGGER on_tournament_player_leave
  AFTER DELETE ON tournament_players
  FOR EACH ROW
  EXECUTE FUNCTION decrement_tournament_players();

-- Create function to increment user's tournaments played count
CREATE OR REPLACE FUNCTION increment_user_tournaments_played()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE profiles
  SET tournaments_played = tournaments_played + 1
  WHERE id = NEW.player_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to update user's tournaments played count
CREATE TRIGGER on_user_join_tournament
  AFTER INSERT ON tournament_players
  FOR EACH ROW
  EXECUTE FUNCTION increment_user_tournaments_played();
