"use client";
import React, { useState, useEffect } from "react";
import "../../styles/dashboard.css";
import { supabase } from "@/lib/supabaseClient";
import AuthGuard from "@/components/AuthGuard";

export default function Settings() {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    notifications: {
      email: true,
      push: true,
      tournamentReminders: true,
      matchInvites: true,
      newsUpdates: false
    },
    privacy: {
      profileVisibility: "public",
      showOnlineStatus: true,
      allowFriendRequests: true,
      showMatchHistory: true
    },
    preferences: {
      language: "en",
      timezone: "UTC",
      theme: "dark",
      autoJoinTournaments: false
    }
  });

  useEffect(() => {
    // Mock data - replace with actual API call
    const mockSettings = {
      notifications: {
        email: true,
        push: true,
        tournamentReminders: true,
        matchInvites: true,
        newsUpdates: false
      },
      privacy: {
        profileVisibility: "public",
        showOnlineStatus: true,
        allowFriendRequests: true,
        showMatchHistory: true
      },
      preferences: {
        language: "en",
        timezone: "UTC",
        theme: "dark",
        autoJoinTournaments: false
      }
    };

    setTimeout(() => {
      setSettings(mockSettings);
      setFormData(mockSettings);
      setLoading(false);
    }, 1000);
  }, []);

  const handleChange = (category, field, value) => {
    setFormData(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      // Mock API call - replace with actual update
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSettings(formData);
      setMessage("Settings updated successfully!");
    } catch (error) {
      setMessage("Error updating settings. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="dashboard">
        <div className="dashboardContainer">
          <h1>Loading settings...</h1>
        </div>
      </div>
    );
  }

  return (
    <AuthGuard>
      <div className="dashboard">
        <div className="dashboardContainer">
        <div className="dashboardHeader">
          <h1 className="dashboardTitle">Settings</h1>
          <p className="dashboardSubtitle">
            Manage your account settings and preferences
          </p>
        </div>

        <form onSubmit={handleSubmit} className="settingsForm">
          <div className="settingsSection">
            <h3>Notifications</h3>
            <div className="settingsGrid">
              <div className="settingItem">
                <label className="toggleLabel">
                  <input
                    type="checkbox"
                    checked={formData.notifications.email}
                    onChange={(e) => handleChange("notifications", "email", e.target.checked)}
                  />
                  <span className="toggleSlider"></span>
                  <span className="toggleText">Email Notifications</span>
                </label>
                <p className="settingDescription">Receive notifications via email</p>
              </div>

              <div className="settingItem">
                <label className="toggleLabel">
                  <input
                    type="checkbox"
                    checked={formData.notifications.push}
                    onChange={(e) => handleChange("notifications", "push", e.target.checked)}
                  />
                  <span className="toggleSlider"></span>
                  <span className="toggleText">Push Notifications</span>
                </label>
                <p className="settingDescription">Receive push notifications in your browser</p>
              </div>

              <div className="settingItem">
                <label className="toggleLabel">
                  <input
                    type="checkbox"
                    checked={formData.notifications.tournamentReminders}
                    onChange={(e) => handleChange("notifications", "tournamentReminders", e.target.checked)}
                  />
                  <span className="toggleSlider"></span>
                  <span className="toggleText">Tournament Reminders</span>
                </label>
                <p className="settingDescription">Get reminded about upcoming tournaments</p>
              </div>

              <div className="settingItem">
                <label className="toggleLabel">
                  <input
                    type="checkbox"
                    checked={formData.notifications.matchInvites}
                    onChange={(e) => handleChange("notifications", "matchInvites", e.target.checked)}
                  />
                  <span className="toggleSlider"></span>
                  <span className="toggleText">Match Invites</span>
                </label>
                <p className="settingDescription">Receive notifications for match invitations</p>
              </div>

              <div className="settingItem">
                <label className="toggleLabel">
                  <input
                    type="checkbox"
                    checked={formData.notifications.newsUpdates}
                    onChange={(e) => handleChange("notifications", "newsUpdates", e.target.checked)}
                  />
                  <span className="toggleSlider"></span>
                  <span className="toggleText">News Updates</span>
                </label>
                <p className="settingDescription">Get updates about Kings Arena news</p>
              </div>
            </div>
          </div>

          <div className="settingsSection">
            <h3>Privacy</h3>
            <div className="settingsGrid">
              <div className="settingItem">
                <label className="selectLabel">Profile Visibility</label>
                <select
                  value={formData.privacy.profileVisibility}
                  onChange={(e) => handleChange("privacy", "profileVisibility", e.target.value)}
                >
                  <option value="public">Public</option>
                  <option value="friends">Friends Only</option>
                  <option value="private">Private</option>
                </select>
                <p className="settingDescription">Control who can see your profile</p>
              </div>

              <div className="settingItem">
                <label className="toggleLabel">
                  <input
                    type="checkbox"
                    checked={formData.privacy.showOnlineStatus}
                    onChange={(e) => handleChange("privacy", "showOnlineStatus", e.target.checked)}
                  />
                  <span className="toggleSlider"></span>
                  <span className="toggleText">Show Online Status</span>
                </label>
                <p className="settingDescription">Let others see when you're online</p>
              </div>

              <div className="settingItem">
                <label className="toggleLabel">
                  <input
                    type="checkbox"
                    checked={formData.privacy.allowFriendRequests}
                    onChange={(e) => handleChange("privacy", "allowFriendRequests", e.target.checked)}
                  />
                  <span className="toggleSlider"></span>
                  <span className="toggleText">Allow Friend Requests</span>
                </label>
                <p className="settingDescription">Let other players send you friend requests</p>
              </div>

              <div className="settingItem">
                <label className="toggleLabel">
                  <input
                    type="checkbox"
                    checked={formData.privacy.showMatchHistory}
                    onChange={(e) => handleChange("privacy", "showMatchHistory", e.target.checked)}
                  />
                  <span className="toggleSlider"></span>
                  <span className="toggleText">Show Match History</span>
                </label>
                <p className="settingDescription">Display your match history on your profile</p>
              </div>
            </div>
          </div>

          <div className="settingsSection">
            <h3>Preferences</h3>
            <div className="settingsGrid">
              <div className="settingItem">
                <label className="selectLabel">Language</label>
                <select
                  value={formData.preferences.language}
                  onChange={(e) => handleChange("preferences", "language", e.target.value)}
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                  <option value="pt">Portuguese</option>
                </select>
                <p className="settingDescription">Choose your preferred language</p>
              </div>

              <div className="settingItem">
                <label className="selectLabel">Timezone</label>
                <select
                  value={formData.preferences.timezone}
                  onChange={(e) => handleChange("preferences", "timezone", e.target.value)}
                >
                  <option value="UTC">UTC</option>
                  <option value="EST">Eastern Time</option>
                  <option value="PST">Pacific Time</option>
                  <option value="GMT">Greenwich Mean Time</option>
                  <option value="CET">Central European Time</option>
                </select>
                <p className="settingDescription">Set your timezone for accurate scheduling</p>
              </div>

              <div className="settingItem">
                <label className="selectLabel">Theme</label>
                <select
                  value={formData.preferences.theme}
                  onChange={(e) => handleChange("preferences", "theme", e.target.value)}
                >
                  <option value="dark">Dark</option>
                  <option value="light">Light</option>
                  <option value="auto">Auto</option>
                </select>
                <p className="settingDescription">Choose your preferred theme</p>
              </div>

              <div className="settingItem">
                <label className="toggleLabel">
                  <input
                    type="checkbox"
                    checked={formData.preferences.autoJoinTournaments}
                    onChange={(e) => handleChange("preferences", "autoJoinTournaments", e.target.checked)}
                  />
                  <span className="toggleSlider"></span>
                  <span className="toggleText">Auto-join Tournaments</span>
                </label>
                <p className="settingDescription">Automatically join tournaments you're eligible for</p>
              </div>
            </div>
          </div>

          {message && (
            <div className={`message ${message.includes("success") ? "success" : "error"}`}>
              {message}
            </div>
          )}

          <div className="formActions">
            <button type="submit" className="saveBtn" disabled={saving}>
              {saving ? "Saving..." : "Save Settings"}
            </button>
            <button type="button" className="resetBtn" onClick={() => setFormData(settings)}>
              Reset to Defaults
            </button>
          </div>
        </form>
      </div>
    </div>
    </AuthGuard>
  );
}
