-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  type TEXT NOT NULL CHECK (
    type IN ('tournament_started', 'tournament_joined', 'tournament_full', 'rank_updated', 'challenge_received', 'challenge_accepted', 'match_result', 'achievement_unlocked')
  ),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  data JSONB,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Users can read their own notifications
CREATE POLICY "Users can read own notifications"
  ON notifications FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own notifications
CREATE POLICY "Users can insert own notifications"
  ON notifications FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own notifications (mark as read)
CREATE POLICY "Users can update own notifications"
  ON notifications FOR UPDATE
  USING (auth.uid() = user_id);

-- Users can delete their own notifications
CREATE POLICY "Users can delete own notifications"
  ON notifications FOR DELETE
  USING (auth.uid() = user_id);

-- Create index on user_id for faster lookups
CREATE INDEX IF NOT EXISTS notifications_user_id_idx ON notifications(user_id);

-- Create index on read status for filtering
CREATE INDEX IF NOT EXISTS notifications_read_idx ON notifications(read);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS notifications_created_at_idx ON notifications(created_at DESC);

-- Create index on type for filtering
CREATE INDEX IF NOT EXISTS notifications_type_idx ON notifications(type);
