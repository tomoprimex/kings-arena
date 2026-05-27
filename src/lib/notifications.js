import { supabase } from './supabaseClient';

// Create notification
export async function createNotification(userId, type, title, message, data = {}) {
  const { data: notification, error } = await supabase
    .from('notifications')
    .insert({
      user_id: userId,
      type,
      title,
      message,
      data
    })
    .select()
    .single();

  if (error) throw error;
  return notification;
}

// Get user notifications
export async function getUserNotifications(userId, limit = 20, unreadOnly = false) {
  let query = supabase
    .from('notifications')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (unreadOnly) {
    query = query.eq('read', false);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

// Mark notification as read
export async function markNotificationAsRead(notificationId, userId) {
  const { error } = await supabase
    .from('notifications')
    .update({ read: true })
    .eq('id', notificationId)
    .eq('user_id', userId);

  if (error) throw error;
  return true;
}

// Mark all notifications as read
export async function markAllNotificationsAsRead(userId) {
  const { error } = await supabase
    .from('notifications')
    .update({ read: true })
    .eq('user_id', userId)
    .eq('read', false);

  if (error) throw error;
  return true;
}

// Delete notification
export async function deleteNotification(notificationId, userId) {
  const { error } = await supabase
    .from('notifications')
    .delete()
    .eq('id', notificationId)
    .eq('user_id', userId);

  if (error) throw error;
  return true;
}

// Get unread notification count
export async function getUnreadNotificationCount(userId) {
  const { data, error } = await supabase
    .from('notifications')
    .select('id', { count: 'exact' })
    .eq('user_id', userId)
    .eq('read', false);

  if (error) throw error;
  return data.length;
}

// Notification helpers for common events
export async function notifyTournamentStarted(userId, tournamentName) {
  return createNotification(
    userId,
    'tournament_started',
    'Tournament Started!',
    `The tournament "${tournamentName}" has started. Good luck!`,
    { tournamentName }
  );
}

export async function notifyTournamentJoined(userId, tournamentName) {
  return createNotification(
    userId,
    'tournament_joined',
    'Successfully Joined!',
    `You have successfully joined the tournament "${tournamentName}".`,
    { tournamentName }
  );
}

export async function notifyTournamentFull(userId, tournamentName) {
  return createNotification(
    userId,
    'tournament_full',
    'Tournament Full',
    `The tournament "${tournamentName}" is now full.`,
    { tournamentName }
  );
}

export async function notifyRankUpdated(userId, newRank, points) {
  return createNotification(
    userId,
    'rank_updated',
    'Rank Updated!',
    `Your rank has been updated to #${newRank} with ${points} points.`,
    { newRank, points }
  );
}

export async function notifyChallengeReceived(userId, challengerName) {
  return createNotification(
    userId,
    'challenge_received',
    'Challenge Received!',
    `${challengerName} has challenged you to a match.`,
    { challengerName }
  );
}

export async function notifyChallengeAccepted(userId, opponentName) {
  return createNotification(
    userId,
    'challenge_accepted',
    'Challenge Accepted!',
    `${opponentName} has accepted your challenge.`,
    { opponentName }
  );
}

export async function notifyMatchResult(userId, opponentName, result, score) {
  return createNotification(
    userId,
    'match_result',
    result === 'win' ? 'Victory!' : 'Defeat',
    `Your match against ${opponentName} ended ${result}. Score: ${score}`,
    { opponentName, result, score }
  );
}

export async function notifyAchievementUnlocked(userId, achievementName, description) {
  return createNotification(
    userId,
    'achievement_unlocked',
    'Achievement Unlocked!',
    `You've unlocked the achievement: ${achievementName}`,
    { achievementName, description }
  );
}
