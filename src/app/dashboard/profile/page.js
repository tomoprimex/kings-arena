"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "../../styles/dashboard.css";
import { supabase } from "../../../lib/supabase";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: "",
    bio: "",
    favoriteGames: [],
    country: "",
    socialLinks: {
      discord: "",
      twitter: "",
      youtube: ""
    }
  });

  useEffect(() => {
    const fetchProfile = async () => {
      // Mock data - replace with actual API call
      const mockProfile = {
        username: "KingSlayer99",
        bio: "Professional esports player specializing in football games. 3-time champion and current #1 ranked player.",
        favoriteGames: ["eFootball", "FIFA"],
        country: "United States",
        socialLinks: {
          discord: "kingslayer99",
          twitter: "@kingslayer99",
          youtube: "KingsGaming"
        },
        stats: {
          totalMatches: 234,
          wins: 184,
          losses: 50,
          winRate: 78.5,
          level: 45,
          points: 12500,
          rank: 1
        }
      };

      setTimeout(() => {
        setProfile(mockProfile);
        setFormData({
          username: mockProfile.username,
          bio: mockProfile.bio,
          favoriteGames: mockProfile.favoriteGames,
          country: mockProfile.country,
          socialLinks: mockProfile.socialLinks
        });
        setLoading(false);
      }, 1000);
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes("socialLinks.")) {
      const socialField = name.split(".")[1];
      setFormData(prev => ({
        ...prev,
        socialLinks: {
          ...prev.socialLinks,
          [socialField]: value
        }
      }));
    } else if (name === "favoriteGames") {
      const games = value.split(",").map(game => game.trim()).filter(game => game);
      setFormData(prev => ({
        ...prev,
        favoriteGames: games
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      // Mock API call - replace with actual update
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setProfile(prev => ({
        ...prev,
        ...formData
      }));
      
      setMessage("Profile updated successfully!");
    } catch (error) {
      setMessage("Error updating profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="dashboard">
        <div className="dashboardContainer">
          <h1>Loading profile...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboardContainer">
        <div className="dashboardHeader">
          <h1 className="dashboardTitle">Edit Profile</h1>
          <p className="dashboardSubtitle">
            Update your profile information and preferences
          </p>
        </div>

        <div className="profileGrid">
          <div className="profileMain">
            <form onSubmit={handleSubmit} className="profileForm">
              <div className="formSection">
                <h3>Basic Information</h3>
                
                <div className="formGroup">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="formGroup">
                  <label htmlFor="bio">Bio</label>
                  <textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Tell us about yourself..."
                  />
                </div>

                <div className="formGroup">
                  <label htmlFor="country">Country</label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                  />
                </div>

                <div className="formGroup">
                  <label htmlFor="favoriteGames">Favorite Games</label>
                  <input
                    type="text"
                    id="favoriteGames"
                    name="favoriteGames"
                    value={formData.favoriteGames.join(", ")}
                    onChange={handleChange}
                    placeholder="eFootball, FIFA, Call of Duty"
                  />
                  <small>Separate games with commas</small>
                </div>
              </div>

              <div className="formSection">
                <h3>Social Links</h3>
                
                <div className="formGroup">
                  <label htmlFor="socialLinks.discord">Discord</label>
                  <input
                    type="text"
                    id="socialLinks.discord"
                    name="socialLinks.discord"
                    value={formData.socialLinks.discord}
                    onChange={handleChange}
                    placeholder="Your Discord username"
                  />
                </div>

                <div className="formGroup">
                  <label htmlFor="socialLinks.twitter">Twitter</label>
                  <input
                    type="text"
                    id="socialLinks.twitter"
                    name="socialLinks.twitter"
                    value={formData.socialLinks.twitter}
                    onChange={handleChange}
                    placeholder="@yourusername"
                  />
                </div>

                <div className="formGroup">
                  <label htmlFor="socialLinks.youtube">YouTube</label>
                  <input
                    type="text"
                    id="socialLinks.youtube"
                    name="socialLinks.youtube"
                    value={formData.socialLinks.youtube}
                    onChange={handleChange}
                    placeholder="Your YouTube channel"
                  />
                </div>
              </div>

              {message && (
                <div className={`message ${message.includes("success") ? "success" : "error"}`}>
                  {message}
                </div>
              )}

              <div className="formActions">
                <button type="submit" className="saveBtn" disabled={saving}>
                  {saving ? "Saving..." : "Save Changes"}
                </button>
                <button type="button" className="cancelBtn" onClick={() => router.back()}>
                  Cancel
                </button>
              </div>
            </form>
          </div>

          <div className="profileSidebar">
            <div className="statsCard">
              <h3>Your Stats</h3>
              <div className="statsList">
                <div className="statItem">
                  <span className="statLabel">Rank:</span>
                  <span className="statValue">#{profile.stats.rank}</span>
                </div>
                <div className="statItem">
                  <span className="statLabel">Level:</span>
                  <span className="statValue">{profile.stats.level}</span>
                </div>
                <div className="statItem">
                  <span className="statLabel">Points:</span>
                  <span className="statValue">{profile.stats.points.toLocaleString()}</span>
                </div>
                <div className="statItem">
                  <span className="statLabel">Win Rate:</span>
                  <span className="statValue">{profile.stats.winRate}%</span>
                </div>
                <div className="statItem">
                  <span className="statLabel">Total Matches:</span>
                  <span className="statValue">{profile.stats.totalMatches}</span>
                </div>
              </div>
            </div>

            <div className="quickLinks">
              <h3>Quick Links</h3>
              <div className="linksList">
                <a href="/dashboard/settings">Account Settings</a>
                <a href="/dashboard/tournaments">My Tournaments</a>
                <a href="/players/king-slayer-99">View Public Profile</a>
                <a href="/auth/forgot-password">Change Password</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
