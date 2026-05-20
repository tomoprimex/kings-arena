"use client";
import React, { useState, useEffect } from "react";
import "../styles/players.css";
import "../styles/cards.css";
import "../styles/leaderboard.css";

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeFilter, setTimeFilter] = useState("all-time");
  const [gameFilter, setGameFilter] = useState("all");
  const [category, setCategory] = useState("global");
  const [season, setSeason] = useState("current");

  // Mock data - replace with actual API call
  useEffect(() => {
    const mockLeaderboard = [
      {
        rank: 1,
        username: "KingSlayer99",
        points: 12500,
        level: 45,
        winRate: 78.5,
        totalMatches: 234,
        games: ["eFootball", "FIFA"],
        avatar: "/images/player1.jpg",
        trend: "up",
        change: 2
      },
      {
        rank: 2,
        username: "ProGamer2026",
        points: 11800,
        level: 42,
        winRate: 75.2,
        totalMatches: 198,
        games: ["Call of Duty", "eFootball"],
        avatar: "/images/player2.jpg",
        trend: "up",
        change: 1
      },
      {
        rank: 3,
        username: "ArenaMaster",
        points: 10900,
        level: 40,
        winRate: 72.8,
        totalMatches: 167,
        games: ["FIFA", "Call of Duty"],
        avatar: "/images/player3.jpg",
        trend: "down",
        change: 1
      },
      {
        rank: 4,
        username: "ChampionX",
        points: 9800,
        level: 38,
        winRate: 70.1,
        totalMatches: 145,
        games: ["eFootball"],
        avatar: "/images/player4.jpg",
        trend: "same",
        change: 0
      },
      {
        rank: 5,
        username: "ElitePlayer",
        points: 8900,
        level: 36,
        winRate: 68.9,
        totalMatches: 132,
        games: ["Call of Duty"],
        avatar: "/images/player5.jpg",
        trend: "up",
        change: 3
      },
      {
        rank: 6,
        username: "RisingStar",
        points: 7600,
        level: 34,
        winRate: 66.4,
        totalMatches: 118,
        games: ["FIFA", "eFootball", "Call of Duty"],
        avatar: "/images/player6.jpg",
        trend: "same",
        change: 0
      },
      {
        rank: 7,
        username: "ShadowNinja",
        points: 7200,
        level: 33,
        winRate: 65.1,
        totalMatches: 105,
        games: ["eFootball"],
        avatar: "/images/player7.jpg",
        trend: "down",
        change: 2
      },
      {
        rank: 8,
        username: "ThunderBolt",
        points: 6800,
        level: 31,
        winRate: 63.8,
        totalMatches: 98,
        games: ["FIFA", "Call of Duty"],
        avatar: "/images/player8.jpg",
        trend: "up",
        change: 4
      }
    ];

    setTimeout(() => {
      setLeaderboard(mockLeaderboard);
      setLoading(false);
    }, 1000);
  }, []);

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
            <div className="crown">👑</div>
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
              <span className="performer-title">🏆 Most Wins</span>
              <span className="performer-name">KingSlayer99</span>
            </div>
            <div className="performer-item">
              <span className="performer-title">🎯 Highest Win Rate</span>
              <span className="performer-name">ProGamer2026</span>
            </div>
            <div className="performer-item">
              <span className="performer-title">⚡ Most Active</span>
              <span className="performer-name">ArenaMaster</span>
            </div>
            <div className="performer-item">
              <span className="performer-title">🔥 Rising Star</span>
              <span className="performer-name">RisingStar</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
