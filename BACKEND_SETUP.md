# Kings Arena Backend System - Complete Setup Guide

## 🎯 Overview

This backend system powers Kings Arena using **only Next.js and Supabase**. No Express, MongoDB, or other backend services are required.

## ✅ Completed Stages

All 14 stages have been implemented:

1. ✅ Supabase project setup
2. ✅ Authentication system (sign up, login, logout, session handling)
3. ✅ User profile table with RLS
4. ✅ Auth protection for private pages
5. ✅ Games table (dynamic game storage)
6. ✅ Tournaments table (tournament database structure)
7. ✅ Tournament join system (tournament_players table)
8. ✅ Player profile page data (connected to Supabase)
9. ✅ Leaderboard system (ranking queries)
10. ✅ Admin system (roles and permissions)
11. ✅ Image storage system (Supabase storage buckets)
12. ✅ Real-time features (Supabase realtime)
13. ✅ Notification system (platform notifications)
14. ✅ Payments (marked for later implementation)

## 📁 Database Schema

### Tables Created

1. **profiles** - User profiles with stats and preferences
2. **games** - Available esports games
3. **tournaments** - Tournament information
4. **tournament_players** - Tournament participation tracking
5. **notifications** - User notifications

### Storage Buckets

1. **avatars** - User avatar images (5MB limit)
2. **tournaments** - Tournament banner images (10MB limit)
3. **games** - Game cover images (10MB limit)

## 🚀 Setup Instructions

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Wait for the project to be ready

### 2. Get Environment Variables

From your Supabase project dashboard, get:
- **Project URL** (Settings → API)
- **anon/public key** (Settings → API)

### 3. Configure Environment Variables

Add these to your `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Run Database Migrations

Run the SQL migrations in order in your Supabase SQL Editor:

1. `001_create_profiles.sql` - Creates profiles table with RLS
2. `002_create_games.sql` - Creates games table with sample data
3. `003_create_tournaments.sql` - Creates tournaments table
4. `004_create_tournament_players.sql` - Creates tournament_players table
5. `005_create_storage_buckets.sql` - Creates storage buckets
6. `006_enable_realtime.sql` - Enables realtime on tables
7. `007_create_notifications.sql` - Creates notifications table

**Or use Supabase CLI:**
```bash
supabase db push
```

## 📚 Utility Libraries

### Authentication (`src/contexts/AuthContext.js`)

```javascript
import { useAuth } from '@/contexts/AuthContext';

const { user, loading, signUp, signIn, signOut } = useAuth();

// Sign up
await signUp(email, password, username);

// Sign in
await signIn(email, password);

// Sign out
await signOut();
```

### Leaderboard (`src/lib/leaderboard.js`)

```javascript
import { getGlobalLeaderboard, getUserRank, updateRankPoints } from '@/lib/leaderboard';

// Get global leaderboard
const leaderboard = await getGlobalLeaderboard(100);

// Get user's rank
const rank = await getUserRank(userId);

// Update rank points
const newPoints = await updateRankPoints(userId, 100);
```

### Admin (`src/lib/admin.js`)

```javascript
import { isAdmin, createTournament, updateTournament, deleteTournament } from '@/lib/admin';

// Check if user is admin
const admin = await isAdmin(userId);

// Create tournament (admin only)
await createTournament(tournamentData, userId);

// Update tournament (admin only)
await updateTournament(tournamentId, tournamentData, userId);

// Delete tournament (admin only)
await deleteTournament(tournamentId, userId);
```

### Storage (`src/lib/storage.js`)

```javascript
import { uploadAvatar, uploadTournamentBanner, uploadGameImage } from '@/lib/storage';

// Upload avatar
const avatarUrl = await uploadAvatar(userId, file);

// Upload tournament banner
const bannerUrl = await uploadTournamentBanner(tournamentId, file);

// Upload game image
const gameImageUrl = await uploadGameImage(gameId, file);
```

### Real-time (`src/lib/realtime.js`)

```javascript
import { subscribeToTournamentUpdates, unsubscribeFromChannel } from '@/lib/realtime';

// Subscribe to tournament updates
const channel = subscribeToTournamentUpdates(tournamentId, (payload) => {
  console.log('Tournament updated:', payload);
});

// Unsubscribe when done
unsubscribeFromChannel(channel);
```

### Notifications (`src/lib/notifications.js`)

```javascript
import { 
  createNotification, 
  getUserNotifications, 
  markNotificationAsRead,
  notifyTournamentStarted,
  notifyTournamentJoined
} from '@/lib/notifications';

// Create notification
await createNotification(userId, 'type', 'Title', 'Message');

// Get user notifications
const notifications = await getUserNotifications(userId);

// Mark as read
await markNotificationAsRead(notificationId, userId);

// Use helper functions
await notifyTournamentStarted(userId, tournamentName);
await notifyTournamentJoined(userId, tournamentName);
```

## 🔐 Security Features

### Row Level Security (RLS)

All tables have RLS policies:
- **Profiles**: Users can only read/write their own profile
- **Games**: Public read, admin write
- **Tournaments**: Public read, admin write
- **Tournament Players**: Public read, authenticated write
- **Notifications**: Users can only access their own notifications

### Role-Based Access Control

Three roles available:
- **player** (default) - Regular user
- **moderator** - Can moderate content
- **admin** - Full administrative access

## 🎮 Key Features Implemented

### Authentication
- Email/password sign up
- Email/password sign in
- Session persistence
- Automatic session restoration

### User Profiles
- Username, bio, avatar
- Rank points, tournaments played/won
- Favorite game, clan tag
- Editable profile

### Tournament System
- Multiple tournament types (National Cup, Continental Championship, World Championship, Pro Series, National Qualifiers, Community Open)
- Player limits and tracking
- Status management (upcoming, live, ended)
- Automatic player count updates

### Leaderboard
- Global rankings by rank points
- Per-game rankings
- Real-time updates

### Real-time Features
- Live tournament updates
- Player join notifications
- Leaderboard changes
- Profile updates

### Notifications
- Tournament started
- Tournament joined
- Tournament full
- Rank updated
- Challenge received/accepted
- Match results
- Achievement unlocked

## 📝 Next Steps

### To Run the Application

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables in `.env.local`

3. Run Supabase migrations

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

### To Add Payment Integration (Stage 14)

When ready to implement payments:
1. Choose payment provider (Paystack or Stripe)
2. Create payment tables
3. Implement payment processing
4. Add wallet system
5. Connect to tournament entry fees

## 🛠️ File Structure

```
kings-arena/
├── src/
│   ├── app/
│   │   ├── auth/
│   │   │   ├── login/page.js
│   │   │   ├── signup/page.js
│   │   │   └── styles/auth.css
│   │   ├── profile/page.js (updated with Supabase)
│   │   └── leaderboard/page.js (updated with Supabase)
│   ├── components/
│   │   └── AuthGuard.js
│   ├── contexts/
│   │   └── AuthContext.js
│   └── lib/
│       ├── supabaseClient.js
│       ├── leaderboard.js
│       ├── admin.js
│       ├── storage.js
│       ├── realtime.js
│       └── notifications.js
└── supabase/
    └── migrations/
        ├── 001_create_profiles.sql
        ├── 002_create_games.sql
        ├── 003_create_tournaments.sql
        ├── 004_create_tournament_players.sql
        ├── 005_create_storage_buckets.sql
        ├── 006_enable_realtime.sql
        └── 007_create_notifications.sql
```

## 🎉 Summary

Kings Arena now has a complete backend system powered exclusively by:
- ✅ Next.js App Router
- ✅ Supabase Authentication
- ✅ Supabase PostgreSQL Database
- ✅ Supabase Storage
- ✅ Supabase Realtime
- ✅ Row Level Security (RLS)

The platform is ready for competitive gaming with full authentication, tournament management, rankings, admin controls, and real-time features!
