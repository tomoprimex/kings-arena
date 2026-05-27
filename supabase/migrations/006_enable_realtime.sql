-- Enable realtime for tournaments table
alter publication supabase_realtime add table tournaments;

-- Enable realtime for tournament_players table
alter publication supabase_realtime add table tournament_players;

-- Enable realtime for profiles table
alter publication supabase_realtime add table profiles;
