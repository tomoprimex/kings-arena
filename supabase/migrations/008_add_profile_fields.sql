-- Add missing fields to profiles table
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS banner_url TEXT,
ADD COLUMN IF NOT EXISTS clan_tag TEXT,
ADD COLUMN IF NOT EXISTS favorite_games TEXT[] DEFAULT ARRAY[]::TEXT[];
