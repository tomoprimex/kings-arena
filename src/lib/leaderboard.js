import { supabase } from './supabaseClient';

// Get global leaderboard
export async function getGlobalLeaderboard(limit = 100) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .order('rank_points', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data;
}

// Get leaderboard by game (requires game-specific data)
export async function getGameLeaderboard(gameId, limit = 100) {
  // This would require a game-specific stats table
  // For now, return global leaderboard filtered by favorite_game
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('favorite_game', gameId)
    .order('rank_points', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data;
}

// Get user's rank
export async function getUserRank(userId) {
  const { data, error } = await supabase
    .from('profiles')
    .select('rank_points')
    .order('rank_points', { ascending: false });

  if (error) throw error;

  const userRank = data.findIndex(profile => profile.id === userId) + 1;
  return userRank;
}

// Update user rank points
export async function updateRankPoints(userId, points) {
  const { data, error } = await supabase
    .from('profiles')
    .select('rank_points')
    .eq('id', userId)
    .single();

  if (error) throw error;

  const newPoints = (data.rank_points || 0) + points;

  const { error: updateError } = await supabase
    .from('profiles')
    .update({ rank_points: newPoints })
    .eq('id', userId);

  if (updateError) throw updateError;

  return newPoints;
}
