"use client";
import React, { useState, useEffect } from "react";
import { Crown, Trophy, Target, Zap, Flame } from "lucide-react";
import "../styles/players.css";
import "../styles/cards.css";
import "../styles/leaderboard.css";
import { getGlobalLeaderboard } from "@/lib/leaderboard";

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeFilter, setTimeFilter] = useState("all-time");
  const [gameFilter, setGameFilter] = useState("all");
  const [category, setCategory] = useState("global");
  const [season, setSeason] = useState("current");

  useEffect(() => {
    fetchLeaderboard();
  }, [category]);

  const fetchLeaderboard = async () => {
    try {
      const data = await getGlobalLeaderboard(100);
      const formattedData = data.map((player, index) => ({
        rank: index + 1,
        username: player.username,
        points: player.rank_points || 0,
        level: 1,
        winRate: 0,
        totalMatches: player.tournaments_played || 0,
        games: player.favorite_game ? [player.favorite_game] : [],
        avatar: player.avatar_url || "/images/default-avatar.jpg",
        trend: "same",
        change: 0
      }));
      setLeaderboard(formattedData);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case "up":
        return "📈";
      case "down":
        return "📉";
      default:
        return "➡️";
    }
  };

  const getRankColor = (rank) => {
    if (rank === 1) return "#FFD700"; // Gold
    if (rank === 2) return "#C0C0C0"; // Silver
    if (rank === 3) return "#CD7F32"; // Bronze
    return "#ffffff";
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading Leaderboard...</p>
      </div>
    );
  }

  return (
    <div className="leaderboard-container">
      {/* Header */}
      <div className="card leaderboard-header">
        <div className="header-content">
          <h1 className="page-title">Leaderboard</h1>
          <p className="page-subtitle">Top players competing for the crown of Kings Arena</p>
        </div>
        
        <div className="header-stats">
          <div className="stat-item">
            <span className="stat-number">1,247</span>
            <span className="stat-label">Total Players</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">892</span>
            <span className="stat-label">Active This Week</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">5,432</span>
            <span className="stat-label">Matches Played</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card leaderboard-filters">
        <div className="filter-row">
          <div className="filter-group">
            <label>Category</label>
            <select 
              value={category} 
              onChange={(e) => setCategory(e.target.value)}
              className="input-card"
            >
              <option value="global">Global Rankings</option>
              <option value="efootball">eFootball</option>
              <option value="fifa">FIFA</option>
              <option value="cod">Call of Duty</option>
              <option value="clan">Clan Rankings</option>
              <option value="seasonal">Seasonal</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Time Period</label>
            <select 
              value={timeFilter} 
              onChange={(e) => setTimeFilter(e.target.value)}
              className="input-card"
            >
              <option value="all-time">All Time</option>
              <option value="monthly">This Month</option>
              <option value="weekly">This Week</option>
              <option value="daily">Today</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Season</label>
            <select 
              value={season} 
              onChange={(e) => setSeason(e.target.value)}
              className="input-card"
            >
              <option value="current">Current Season</option>
              <option value="season1">Season 1</option>
              <option value="season2">Season 2</option>
              <option value="season3">Season 3</option>
            </select>
          </div>
        </div>
      </div>

      {/* Top 3 Podium */}
      <div className="card top-podium">
        <div className="podium-content">
          <div className="podium-item second">
            <div className="rank-badge silver">2</div>
            <img 
              src={leaderboard[1]?.avatar || "/images/default-avatar.jpg"} 
              alt={leaderboard[1]?.username}
              className="podium-avatar"
            />
            <h3>{leaderboard[1]?.username || "Player 2"}</h3>
            <div className="podium-stats">
              <span className="points">{leaderboard[1]?.points.toLocaleString() || "0"} pts</span>
              <span className="win-rate">{leaderboard[1]?.winRate || "0"}% WR</span>
            </div>
          </div>

          <div className="podium-item first">
            <div className="rank-badge gold">1</div>
            <div className="crown"><Crown size={32} /></div>
            <img 
              src={leaderboard[0]?.avatar || "/images/default-avatar.jpg"} 
              alt={leaderboard[0]?.username}
              className="podium-avatar"
            />
            <h3>{leaderboard[0]?.username || "Player 1"}</h3>
            <div className="podium-stats">
              <span className="points">{leaderboard[0]?.points.toLocaleString() || "0"} pts</span>
              <span className="win-rate">{leaderboard[0]?.winRate || "0"}% WR</span>
            </div>
          </div>

          <div className="podium-item third">
            <div className="rank-badge bronze">3</div>
            <img 
              src={leaderboard[2]?.avatar || "/images/default-avatar.jpg"} 
              alt={leaderboard[2]?.username}
              className="podium-avatar"
            />
            <h3>{leaderboard[2]?.username || "Player 3"}</h3>
            <div className="podium-stats">
              <span className="points">{leaderboard[2]?.points.toLocaleString() || "0"} pts</span>
              <span className="win-rate">{leaderboard[2]?.winRate || "0"}% WR</span>
            </div>
          </div>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="card leaderboard-table">
        <div className="table-header">
          <div className="header-rank">Rank</div>
          <div className="header-player">Player</div>
          <div className="header-stats">Stats</div>
          <div className="header-points">Points</div>
          <div className="header-trend">Trend</div>
          <div className="header-actions">Actions</div>
        </div>

        <div className="table-body">
          {leaderboard.slice(3).map((player) => (
            <div key={player.rank} className="table-row">
              <div className="rank-cell">
                <span className="rank-number">#{player.rank}</span>
              </div>
              
              <div className="player-cell">
                <img 
                  src={player.avatar} 
                  alt={player.username}
                  className="player-avatar"
                  onError={(e) => {
                    e.target.src = "/images/default-avatar.jpg";
                  }}
                />
                <div className="player-info">
                  <div className="player-name">{player.username}</div>
                  <div className="player-games">
                    {player.games.join(", ")}
                  </div>
                </div>
              </div>

              <div className="stats-cell">
                <div className="mini-stats">
                  <span>Lv.{player.level}</span>
                  <span>{player.winRate}% WR</span>
                  <span>{player.totalMatches} M</span>
                </div>
              </div>

              <div className="points-cell">
                <span className="points-value">{player.points.toLocaleString()}</span>
              </div>

              <div className="trend-cell">
                <div className="trend-indicator">
                  <span className="trend-icon">{getTrendIcon(player.trend)}</span>
                  {player.change !== 0 && (
                    <span className="trend-change">{player.change}</span>
                  )}
                </div>
              </div>

              <div className="actions-cell">
                <button className="action-btn profile-btn">👤 Profile</button>
                <button className="action-btn challenge-btn">⚔️ Challenge</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Statistics */}
      <div className="leaderboard-stats-grid">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Season Overview</h3>
          </div>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">52.3%</span>
              <span className="stat-label">Average Win Rate</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">15.2K</span>
              <span className="stat-label">Total Matches</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">234</span>
              <span className="stat-label">Tournaments</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">$125K</span>
              <span className="stat-label">Prize Pool</span>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Top Performers</h3>
          </div>
          <div className="performers-list">
            <div className="performer-item">
              <span className="performer-title"><Trophy size={16} /> Most Wins</span>
              <span className="performer-name">KingSlayer99</span>
            </div>
            <div className="performer-item">
              <span className="performer-title"><Target size={16} /> Highest Win Rate</span>
              <span className="performer-name">ProGamer2026</span>
            </div>
            <div className="performer-item">
              <span className="performer-title"><Zap size={16} /> Most Active</span>
              <span className="performer-name">ArenaMaster</span>
            </div>
            <div className="performer-item">
              <span className="performer-title"><Flame size={16} /> Rising Star</span>
              <span className="performer-name">RisingStar</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
