import { supabase } from './supabaseClient';

// Upload avatar image
export async function uploadAvatar(userId, file) {
  const fileExt = file.name.split('.').pop();
  const fileName = `${userId}/${Date.now()}.${fileExt}`;
  const filePath = `${fileName}`;

  const { data, error } = await supabase.storage
    .from('avatars')
    .upload(filePath, file);

  if (error) throw error;

  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from('avatars')
    .getPublicUrl(filePath);

  return publicUrl;
}

// Upload tournament banner
export async function uploadTournamentBanner(tournamentId, file) {
  const fileExt = file.name.split('.').pop();
  const fileName = `${tournamentId}/${Date.now()}.${fileExt}`;
  const filePath = `${fileName}`;

  const { data, error } = await supabase.storage
    .from('tournaments')
    .upload(filePath, file);

  if (error) throw error;

  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from('tournaments')
    .getPublicUrl(filePath);

  return publicUrl;
}

// Upload game image
export async function uploadGameImage(gameId, file) {
  const fileExt = file.name.split('.').pop();
  const fileName = `${gameId}/${Date.now()}.${fileExt}`;
  const filePath = `${fileName}`;

  const { data, error } = await supabase.storage
    .from('games')
    .upload(filePath, file);

  if (error) throw error;

  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from('games')
    .getPublicUrl(filePath);

  return publicUrl;
}

// Delete image from storage
export async function deleteImage(bucket, filePath) {
  const { error } = await supabase.storage
    .from(bucket)
    .remove([filePath]);

  if (error) throw error;
  return true;
}

// Update user avatar URL in profile
export async function updateUserAvatar(userId, avatarUrl) {
  const { error } = await supabase
    .from('profiles')
    .update({ avatar_url: avatarUrl })
    .eq('id', userId);

  if (error) throw error;
  return true;
}

// Update tournament banner URL
export async function updateTournamentBanner(tournamentId, bannerUrl) {
  const { error } = await supabase
    .from('tournaments')
    .update({ banner_image: bannerUrl })
    .eq('id', tournamentId);

  if (error) throw error;
  return true;
}

// Update game image URL
export async function updateGameImage(gameId, imageUrl) {
  const { error } = await supabase
    .from('games')
    .update({ image_url: imageUrl })
    .eq('id', gameId);

  if (error) throw error;
  return true;
}
