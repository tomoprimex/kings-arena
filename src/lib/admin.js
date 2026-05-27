import { supabase } from './supabaseClient';

// Check if user is admin
export async function isAdmin(userId) {
  const { data, error } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', userId)
    .single();

  if (error) return false;
  return data?.role === 'admin';
}

// Check if user is moderator or admin
export async function isModeratorOrAdmin(userId) {
  const { data, error } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', userId)
    .single();

  if (error) return false;
  return data?.role === 'admin' || data?.role === 'moderator';
}

// Create tournament (admin only)
export async function createTournament(tournamentData, userId) {
  const adminCheck = await isAdmin(userId);
  if (!adminCheck) {
    throw new Error('Unauthorized: Admin access required');
  }

  const { data, error } = await supabase
    .from('tournaments')
    .insert({
      title: tournamentData.title,
      game_id: tournamentData.game_id,
      tournament_type: tournamentData.tournament_type,
      description: tournamentData.description,
      entry_fee: tournamentData.entry_fee,
      prize_pool: tournamentData.prize_pool,
      max_players: tournamentData.max_players,
      status: tournamentData.status || 'upcoming',
      banner_image: tournamentData.banner_image,
      start_date: tournamentData.start_date,
      end_date: tournamentData.end_date
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Update tournament (admin only)
export async function updateTournament(tournamentId, tournamentData, userId) {
  const adminCheck = await isAdmin(userId);
  if (!adminCheck) {
    throw new Error('Unauthorized: Admin access required');
  }

  const { data, error } = await supabase
    .from('tournaments')
    .update(tournamentData)
    .eq('id', tournamentId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Delete tournament (admin only)
export async function deleteTournament(tournamentId, userId) {
  const adminCheck = await isAdmin(userId);
  if (!adminCheck) {
    throw new Error('Unauthorized: Admin access required');
  }

  const { error } = await supabase
    .from('tournaments')
    .delete()
    .eq('id', tournamentId);

  if (error) throw error;
  return true;
}

// Update user role (admin only)
export async function updateUserRole(targetUserId, newRole, userId) {
  const adminCheck = await isAdmin(userId);
  if (!adminCheck) {
    throw new Error('Unauthorized: Admin access required');
  }

  const validRoles = ['player', 'moderator', 'admin'];
  if (!validRoles.includes(newRole)) {
    throw new Error('Invalid role');
  }

  const { data, error } = await supabase
    .from('profiles')
    .update({ role: newRole })
    .eq('id', targetUserId)
    .select()
    .single();

  if (error) throw error;
  return data;
}
