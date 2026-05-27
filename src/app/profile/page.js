"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Trophy, Heart, Gamepad2, Users, BarChart3 } from "lucide-react";
import "../styles/cards.css";
import "../styles/profile.css";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/contexts/AuthContext";

export default function Profile() {
  const router = useRouter();
  const authUser = useAuth();
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

  // Immediate redirect if not authenticated
  useEffect(() => {
    if (!authUser.loading && !authUser.user) {
      router.replace("/auth/login");
    }
  }, [authUser.loading, authUser.user, router]);

  useEffect(() => {
    if (authUser.user) {
      fetchProfileData();
    }
  }, [authUser.user]);



  const fetchProfileData = async () => {
    try {
      // Fetch profile from Supabase
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authUser.user.id)
        .single();

      if (profileError) throw profileError;
      setProfile(profileData);
      setEditProfile({
        bio: profileData?.bio || "",
        banner_url: profileData?.banner_url || "",
        avatar_url: profileData?.avatar_url || "",
        favorite_games: profileData?.favorite_games || [],
        clan_tag: profileData?.clan_tag || ""
      });

      // Fetch posts (placeholder - create posts table later)
      setPosts([]);

      // Fetch friends (placeholder - create friends table later)
      setFriends([]);

      // Fetch achievements (placeholder - create achievements table later)
      setAchievements([]);

      // Fetch match history (placeholder - create matches table later)
      setMatchHistory([]);

    } catch (error) {
      console.error('Error fetching profile data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (!newPost.trim() || !authUser.user) return;

    try {
      // Placeholder for post creation - create posts table later
      setNewPost("");
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    if (!authUser.user) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          bio: editProfile.bio,
          banner_url: editProfile.banner_url,
          avatar_url: editProfile.avatar_url,
          clan_tag: editProfile.clan_tag,
          updated_at: new Date().toISOString()
        })
        .eq('id', authUser.user.id);

      if (error) throw error;

      setProfile({
        ...profile,
        bio: editProfile.bio,
        banner_url: editProfile.banner_url,
        avatar_url: editProfile.avatar_url,
        clan_tag: editProfile.clan_tag
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleChallenge = async (friendId) => {
    try {
      // Mock challenge creation
      console.log('Challenge sent to friend:', friendId);
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
            src={profile?.banner_url || "https://tfcofdicqfwlocuuzqli.supabase.co/storage/v1/object/public/avatars/bio.jpg"} 
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
              src={profile?.avatar_url || "https://tfcofdicqfwlocuuzqli.supabase.co/storage/v1/object/public/avatars/bio.jpg"} 
              alt="Profile Avatar" 
            />
          </div>
          
          <div className="profile-details">
            <h1 className="profile-username">
              {profile?.username || authUser?.user_metadata?.username || 'Player'}
              {profile?.clan_tag && <span className="clan-tag">[{profile.clan_tag}]</span>}
            </h1>
            <p className="profile-bio">{profile?.bio || 'No bio yet'}</p>
            
            <div className="profile-stats">
              <div className="stat-item">
                <span className="stat-number">{profile?.tournaments_won || 0}</span>
                <span className="stat-label">Wins</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{profile?.tournaments_played || 0}</span>
                <span className="stat-label">Tournaments</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{profile?.rank_points || 0}</span>
                <span className="stat-label">Points</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{profile?.role || 'player'}</span>
                <span className="stat-label">Role</span>
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
                        {match.winner_id === authUser.user.id ? <><Trophy size={16} /> Victory</> : <><Heart size={16} /> Defeat</>}
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
                    <div className="achievement-icon"><Trophy size={24} /></div>
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
              <button className="action-card"><Gamepad2 size={20} /> Find Match</button>
              <button className="action-card"><Trophy size={20} /> Join Tournament</button>
              <button className="action-card"><Users size={20} /> Create Team</button>
              <button className="action-card"><BarChart3 size={20} /> View Stats</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}