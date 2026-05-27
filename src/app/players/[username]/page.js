"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Crown, Trophy, Star, Flame, Target, Medal, Gamepad2, Users, BarChart3 } from "lucide-react";
import "../../styles/players.css";
import "../../styles/cards.css";
import "../../styles/profile.css";

// Skill Progress Bar Component
const SkillBar = ({ label, value, delay }) => {
  return (
    <div className="skill-bar-container">
      <div className="skill-bar-label">
        <span>{label}</span>
        <span className="skill-value">{value}</span>
      </div>
      <div className="skill-bar-bg">
        <motion.div
          className="skill-bar-fill"
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, delay, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

// Stat Card Component
const StatCard = ({ icon, label, value, delay }) => {
  return (
    <motion.div
      className="stat-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.05 }}
    >
      <div className="stat-card-icon">{icon}</div>
      <div className="stat-card-value">{value}</div>
      <div className="stat-card-label">{label}</div>
    </motion.div>
  );
};

export default function PlayerProfile() {
  const params = useParams();
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - replace with actual API call
    const mockPlayer = {
      username: params.username,
      nickname: "The King",
      position: "Forward",
      age: 24,
      nationality: "🇬🇧 United Kingdom",
      club: "Royal FC",
      rating: 95,
      rank: 1,
      level: 45,
      winRate: 78.5,
      totalMatches: 234,
      points: 12500,
      games: ["eFootball", "FIFA"],
      avatar: null,
      online: true,
      bio: "Professional esports player specializing in football games. 3-time champion and current #1 ranked player.",
      stats: {
        goals: 456,
        assists: 123,
        matches: 234,
        winRate: 78.5,
        mvp: 42
      },
      skills: {
        pace: 92,
        shooting: 95,
        passing: 88,
        dribbling: 90,
        defense: 75,
        physical: 82
      },
      achievements: [
        { icon: <Trophy size={24} />, name: "Kings Championship Season 1 Winner" },
        { icon: <Star size={24} />, name: "National League MVP" },
        { icon: <Flame size={24} />, name: "100 Win Streak" },
        { icon: <Crown size={24} />, name: "Player of the Year 2025" },
        { icon: <Target size={24} />, name: "Golden Boot Winner" },
        { icon: <Medal size={24} />, name: "Top Scorer 2024" }
      ],
      matchHistory: [
        { opponent: "ProGamer2026", score: "3-1", result: "win", date: "2026-05-07" },
        { opponent: "ArenaMaster", score: "2-0", result: "win", date: "2026-05-06" },
        { opponent: "ChampionX", score: "1-1", result: "draw", date: "2026-05-05" },
        { opponent: "ElitePlayer", score: "0-1", result: "loss", date: "2026-05-04" },
        { opponent: "RisingStar", score: "4-2", result: "win", date: "2026-05-03" }
      ],
      formation: "4-3-3",
      favoriteTeam: "Real Madrid",
      social: {
        twitter: "@kingplayer",
        instagram: "@kingplayer_official",
        twitch: "kingplayer",
        youtube: "KingPlayer"
      }
    };

    setTimeout(() => {
      setPlayer(mockPlayer);
      setLoading(false);
    }, 1000);
  }, [params.username]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading player profile...</p>
      </div>
    );
  }

  if (!player) {
    return (
      <div className="player-profile-container">
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Player Not Found</h2>
          </div>
          <p>The player profile you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="player-profile-container">
      {/* Hero Section */}
      <div className="profile-hero">
        <div className="profile-banner">
          <div className="banner-gradient"></div>
        </div>
        
        <div className="profile-hero-content">
          <motion.div
            className="profile-avatar-large"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            {player.avatar}
          </motion.div>
          
          <motion.div
            className="profile-hero-info"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h1 className="profile-hero-name">{player.username}</h1>
            <p className="profile-hero-nickname">"{player.nickname}"</p>
            <div className="profile-hero-details">
              <span className="detail-item">🎂 {player.age} years</span>
              <span className="detail-item">{player.nationality}</span>
              <span className="detail-item">⚽ {player.position}</span>
              <span className="detail-item">🏟️ {player.club}</span>
            </div>
            <div className="rating-badge">
              <span className="rating-number">{player.rating}</span>
              <span className="rating-label">OVR</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="profile-stats-section">
        <StatCard icon={<Target size={24} />} label="Goals" value={player.stats.goals} delay={0.1} />
        <StatCard icon={<Target size={24} />} label="Assists" value={player.stats.assists} delay={0.2} />
        <StatCard icon={<Gamepad2 size={24} />} label="Matches" value={player.stats.matches} delay={0.3} />
        <StatCard icon={<BarChart3 size={24} />} label="Win Rate" value={`${player.stats.winRate}%`} delay={0.4} />
        <StatCard icon={<Trophy size={24} />} label="MVP Awards" value={player.stats.mvp} delay={0.5} />
      </div>

      <div className="profile-content">
        {/* Main Content */}
        <div className="profile-main">
          {/* Skills Section */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Player Attributes</h3>
            </div>
            <div className="skills-section">
              <SkillBar label="Pace" value={player.skills.pace} delay={0.1} />
              <SkillBar label="Shooting" value={player.skills.shooting} delay={0.2} />
              <SkillBar label="Passing" value={player.skills.passing} delay={0.3} />
              <SkillBar label="Dribbling" value={player.skills.dribbling} delay={0.4} />
              <SkillBar label="Defense" value={player.skills.defense} delay={0.5} />
              <SkillBar label="Physical" value={player.skills.physical} delay={0.6} />
            </div>
          </div>

          {/* Recent Matches */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Recent Matches</h3>
            </div>
            <div className="match-history">
              {player.matchHistory.map((match, index) => (
                <motion.div
                  key={index}
                  className="match-card"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="match-info">
                    <span className="match-opponent">vs {match.opponent}</span>
                    <span className="match-date">{match.date}</span>
                  </div>
                  <div className="match-result">
                    <span className="match-score">{match.score}</span>
                    <span className={`match-status ${match.result}`}>
                      {match.result.toUpperCase()}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Trophies & Achievements</h3>
            </div>
            <div className="achievements-grid">
              {player.achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  className="achievement-card"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="achievement-icon">{achievement.icon}</div>
                  <div className="achievement-info">
                    <span className="achievement-name">{achievement.name}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="profile-sidebar">
          {/* Formation & Team */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Formation & Team</h3>
            </div>
            <div className="formation-section">
              <div className="formation-display">
                <span className="formation-label">Formation</span>
                <span className="formation-value">{player.formation}</span>
              </div>
              <div className="team-display">
                <span className="team-label">Favorite Team</span>
                <span className="team-value">{player.favoriteTeam}</span>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Social Media</h3>
            </div>
            <div className="social-links">
              <a href="#" className="social-link">
                <span className="social-icon">🐦</span>
                <span>Twitter</span>
              </a>
              <a href="#" className="social-link">
                <span className="social-icon">📸</span>
                <span>Instagram</span>
              </a>
              <a href="#" className="social-link">
                <span className="social-icon">📺</span>
                <span>Twitch</span>
              </a>
              <a href="#" className="social-link">
                <span className="social-icon">▶️</span>
                <span>YouTube</span>
              </a>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Actions</h3>
            </div>
            <div className="quick-actions">
              <motion.button
                className="action-card"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                ⚔️ Challenge Player
              </motion.button>
              <motion.button
                className="action-card"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                💬 Send Message
              </motion.button>
              <motion.button
                className="action-card"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                👤 Add Friend
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
