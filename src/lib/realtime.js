import { supabase } from './supabaseClient';

// Subscribe to tournament updates
export function subscribeToTournamentUpdates(tournamentId, callback) {
  const channel = supabase
    .channel(`tournament:${tournamentId}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'tournaments',
        filter: `id=eq.${tournamentId}`
      },
      (payload) => callback(payload)
    )
    .subscribe();

  return channel;
}

// Subscribe to tournament player joins
export function subscribeToTournamentPlayers(tournamentId, callback) {
  const channel = supabase
    .channel(`tournament_players:${tournamentId}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'tournament_players',
        filter: `tournament_id=eq.${tournamentId}`
      },
      (payload) => callback(payload)
    )
    .subscribe();

  return channel;
}

// Subscribe to leaderboard updates
export function subscribeToLeaderboard(callback) {
  const channel = supabase
    .channel('leaderboard')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'profiles'
      },
      (payload) => callback(payload)
    )
    .subscribe();

  return channel;
}

// Subscribe to profile updates
export function subscribeToProfileUpdates(userId, callback) {
  const channel = supabase
    .channel(`profile:${userId}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'profiles',
        filter: `id=eq.${userId}`
      },
      (payload) => callback(payload)
    )
    .subscribe();

  return channel;
}

// Unsubscribe from a channel
export function unsubscribeFromChannel(channel) {
  if (channel) {
    supabase.removeChannel(channel);
  }
}

// Subscribe to all tournaments
export function subscribeToAllTournaments(callback) {
  const channel = supabase
    .channel('all_tournaments')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'tournaments'
      },
      (payload) => callback(payload)
    )
    .subscribe();

  return channel;
}
