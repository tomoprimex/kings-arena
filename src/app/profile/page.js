"use client";
import React, { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import "../styles/cards.css";
import "../styles/profile.css";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [friends, setFriends] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [matchHistory, setMatchHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newPost, setNewPost] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editProfile, setEditProfile] = useState({
    bio: "",
    banner_url: "",
    avatar_url: "",
    favorite_games: [],
    clan_tag: ""
  });

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      // Get current user
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      if (!currentUser) {
        // Redirect to login if not authenticated
        window.location.href = '/auth/login';
        return;
      }
      setUser(currentUser);

      // Fetch profile data
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', currentUser.id)
        .single();

      setProfile(profileData);
      setEditProfile({
        bio: profileData?.bio || "",
        banner_url: profileData?.banner_url || "",
        avatar_url: profileData?.avatar_url || "",
        favorite_games: profileData?.favorite_games || [],
        clan_tag: profileData?.clan_tag || ""
      });

      // Fetch user's posts
      const { data: postsData } = await supabase
        .from('posts')
        .select('*')
        .eq('user_id', currentUser.id)
        .order('created_at', { ascending: false });

      setPosts(postsData || []);

      // Fetch friends
      const { data: friendsData } = await supabase
        .from('friends')
        .select('profiles(*)')
        .or(`user_id.eq.${currentUser.id},friend_id.eq.${currentUser.id}`);

      setFriends(friendsData || []);

      // Fetch achievements
      const { data: achievementsData } = await supabase
        .from('user_achievements')
        .select('achievements(*)')
        .eq('user_id', currentUser.id);

      setAchievements(achievementsData || []);

      // Fetch match history
      const { data: matchData } = await supabase
        .from('matches')
        .select('*')
        .or(`player1_id.eq.${currentUser.id},player2_id.eq.${currentUser.id}`)
        .order('created_at', { ascending: false })
        .limit(10);

      setMatchHistory(matchData || []);

    } catch (error) {
      console.error('Error fetching profile data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (!newPost.trim() || !user) return;

    try {
      const { data } = await supabase
        .from('posts')
        .insert({
          user_id: user.id,
          content: newPost,
          type: 'status'
        })
        .select();

      setPosts([data[0], ...posts]);
      setNewPost("");
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    if (!user) return;

    try {
      const { data } = await supabase
        .from('profiles')
        .upsert({
          user_id: user.id,
          ...editProfile,
          updated_at: new Date().toISOString()
        })
        .select();

      setProfile(data[0]);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleChallenge = async (friendId) => {
    try {
      await supabase
        .from('challenges')
        .insert({
          challenger_id: user.id,
          challenged_id: friendId,
          status: 'pending'
        });
    } catch (error) {
      console.error('Error sending challenge:', error);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      {/* Profile Header */}
      <div className="card profile-header">
        <div className="profile-banner">
          <img 
            src={profile?.banner_url || "/images/default-banner.jpg"} 
            alt="Profile Banner" 
          />
          <button 
            className="edit-banner-btn"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>
        
        <div className="profile-info">
          <div className="profile-avatar">
            <img 
              src={profile?.avatar_url || "/images/default-avatar.jpg"} 
              alt="Profile Avatar" 
            />
          </div>
          
          <div className="profile-details">
            <h1 className="profile-username">
              {user?.user_metadata?.username || 'Player'}
              {profile?.clan_tag && <span className="clan-tag">[{profile.clan_tag}]</span>}
            </h1>
            <p className="profile-bio">{profile?.bio || 'No bio yet'}</p>
            
            <div className="profile-stats">
              <div className="stat-item">
                <span className="stat-number">{profile?.wins || 0}</span>
                <span className="stat-label">Wins</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{profile?.losses || 0}</span>
                <span className="stat-label">Losses</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{profile?.rank || 'Unranked'}</span>
                <span className="stat-label">Rank</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{profile?.level || 1}</span>
                <span className="stat-label">Level</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Form */}
      {isEditing && (
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Edit Profile</h2>
          </div>
          <form onSubmit={handleProfileUpdate} className="profile-edit-form">
            <div className="form-group-card">
              <label>Bio</label>
              <textarea
                value={editProfile.bio}
                onChange={(e) => setEditProfile({...editProfile, bio: e.target.value})}
                className="input-card"
                rows={3}
                placeholder="Tell us about yourself..."
              />
            </div>
            
            <div className="form-group-card">
              <label>Banner URL</label>
              <input
                type="url"
                value={editProfile.banner_url}
                onChange={(e) => setEditProfile({...editProfile, banner_url: e.target.value})}
                className="input-card"
                placeholder="https://example.com/banner.jpg"
              />
            </div>
            
            <div className="form-group-card">
              <label>Avatar URL</label>
              <input
                type="url"
                value={editProfile.avatar_url}
                onChange={(e) => setEditProfile({...editProfile, avatar_url: e.target.value})}
                className="input-card"
                placeholder="https://example.com/avatar.jpg"
              />
            </div>
            
            <div className="form-group-card">
              <label>Clan Tag</label>
              <input
                type="text"
                value={editProfile.clan_tag}
                onChange={(e) => setEditProfile({...editProfile, clan_tag: e.target.value})}
                className="input-card"
                placeholder="[TAG]"
                maxLength={6}
              />
            </div>
            
            <button type="submit" className="submitBtn">Save Changes</button>
          </form>
        </div>
      )}

      <div className="profile-content">
        {/* Activity Feed */}
        <div className="profile-main">
          {/* Create Post */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Share Update</h3>
            </div>
            <form onSubmit={handlePostSubmit} className="post-form">
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                className="input-card"
                placeholder="What's on your mind?"
                rows={3}
              />
              <button type="submit" className="submitBtn">Post</button>
            </form>
          </div>

          {/* Posts Feed */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Activity Feed</h3>
            </div>
            <div className="posts-feed">
              {posts.length === 0 ? (
                <p className="no-posts">No posts yet. Share your first update!</p>
              ) : (
                posts.map((post) => (
                  <div key={post.id} className="post-card">
                    <div className="post-content">
                      <p>{post.content}</p>
                      <span className="post-time">
                        {new Date(post.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="post-actions">
                      <button className="action-btn">👍 Like</button>
                      <button className="action-btn">💬 Comment</button>
                      <button className="action-btn">🔗 Share</button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Match History */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Recent Matches</h3>
            </div>
            <div className="match-history">
              {matchHistory.length === 0 ? (
                <p className="no-matches">No matches played yet</p>
              ) : (
                matchHistory.map((match) => (
                  <div key={match.id} className="match-card">
                    <div className="match-info">
                      <span className="match-result">
                        {match.winner_id === user.id ? '🏆 Victory' : '💔 Defeat'}
                      </span>
                      <span className="match-game">{match.game}</span>
                      <span className="match-time">
                        {new Date(match.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Profile Sidebar */}
        <div className="profile-sidebar">
          {/* Friends */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Friends ({friends.length})</h3>
            </div>
            <div className="friends-list">
              {friends.length === 0 ? (
                <p className="no-friends">No friends yet</p>
              ) : (
                friends.map((friend) => (
                  <div key={friend.id} className="friend-card">
                    <img 
                      src={friend.profiles?.avatar_url || "/images/default-avatar.jpg"} 
                      alt={friend.profiles?.username} 
                    />
                    <div className="friend-info">
                      <span className="friend-name">{friend.profiles?.username}</span>
                      <button 
                        className="challenge-btn"
                        onClick={() => handleChallenge(friend.id)}
                      >
                        ⚔️ Challenge
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Achievements */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Achievements ({achievements.length})</h3>
            </div>
            <div className="achievements-grid">
              {achievements.length === 0 ? (
                <p className="no-achievements">No achievements unlocked yet</p>
              ) : (
                achievements.map((achievement) => (
                  <div key={achievement.id} className="achievement-card">
                    <div className="achievement-icon">🏆</div>
                    <div className="achievement-info">
                      <span className="achievement-name">{achievement.achievements?.name}</span>
                      <span className="achievement-desc">{achievement.achievements?.description}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Quick Actions</h3>
            </div>
            <div className="quick-actions">
              <button className="action-card">🎮 Find Match</button>
              <button className="action-card">🏆 Join Tournament</button>
              <button className="action-card">👥 Create Team</button>
              <button className="action-card">📊 View Stats</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}