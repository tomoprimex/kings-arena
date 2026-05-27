"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Crown, Zap } from "lucide-react";
import "../styles/players.css";
import "../styles/cards.css";

export default function Players() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [positionFilter, setPositionFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Mock data - replace with actual API call
  useEffect(() => {
    const mockPlayers = [
      {
        id: 1,
        username: "KingSlayer99",
        nickname: "The King",
        position: "Forward",
        team: "Royal FC",
        rating: 95,
        rank: 1,
        level: 45,
        winRate: 78.5,
        totalMatches: 234,
        points: 12500,
        games: ["eFootball", "FIFA"],
        avatar: null,
        online: true
      },
      {
        id: 2,
        username: "ProGamer2026",
        nickname: "Pro",
        position: "Midfielder",
        team: "Elite United",
        rating: 92,
        rank: 2,
        level: 42,
        winRate: 75.2,
        totalMatches: 198,
        points: 11800,
        games: ["Call of Duty", "eFootball"],
        avatar: null,
        online: true
      },
      {
        id: 3,
        username: "ArenaMaster",
        nickname: "Master",
        position: "Defender",
        team: "Champions City",
        rating: 90,
        rank: 3,
        level: 40,
        winRate: 72.8,
        totalMatches: 167,
        points: 10900,
        games: ["FIFA", "Call of Duty"],
        avatar: "🛡️",
        online: false
      },
      {
        id: 4,
        username: "ChampionX",
        nickname: "Champ",
        position: "Goalkeeper",
        team: "Victory FC",
        rating: 88,
        rank: 4,
        level: 38,
        winRate: 70.1,
        totalMatches: 145,
        points: 9800,
        games: ["eFootball"],
        avatar: "🏆",
        online: true
      },
      {
        id: 5,
        username: "ElitePlayer",
        nickname: "Elite",
        position: "Forward",
        team: "Premier Kings",
        rating: 87,
        rank: 5,
        level: 36,
        winRate: 68.9,
        totalMatches: 132,
        points: 8900,
        games: ["Call of Duty"],
        avatar: "⭐",
        online: false
      },
      {
        id: 6,
        username: "RisingStar",
        nickname: "Rising",
        position: "Midfielder",
        team: "Future FC",
        rating: 85,
        rank: 6,
        level: 34,
        winRate: 66.4,
        totalMatches: 118,
        points: 7600,
        games: ["FIFA", "eFootball", "Call of Duty"],
        avatar: "🌟",
        online: true
      },
      {
        id: 7,
        username: "GoldenBoot",
        nickname: "Boot",
        position: "Forward",
        team: "Scoring Legends",
        rating: 84,
        rank: 7,
        level: 32,
        winRate: 64.8,
        totalMatches: 105,
        points: 7200,
        games: ["FIFA", "eFootball"],
        avatar: "⚽",
        online: true
      },
      {
        id: 8,
        username: "DefensiveWall",
        nickname: "Wall",
        position: "Defender",
        team: "Iron Shield",
        rating: 83,
        rank: 8,
        level: 30,
        winRate: 63.2,
        totalMatches: 98,
        points: 6800,
        games: ["Call of Duty", "FIFA"],
        avatar: "🏰",
        online: false
      }
    ];

    setTimeout(() => {
      setPlayers(mockPlayers);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredPlayers = players.filter(player => {
    const matchesSearch = player.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         player.nickname.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         player.team.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPosition = positionFilter === "all" || player.position === positionFilter;
    
    const matchesStatus = statusFilter === "all" || 
                         (statusFilter === "online" && player.online) ||
                         (statusFilter === "offline" && !player.online);
    
    return matchesSearch && matchesPosition && matchesStatus;
  });

  if (loading) {
    return (
      <div className="players-container">
        <div className="card">
          <div className="card-header">
            <h1 className="card-title">Players</h1>
            <p className="card-subtitle">Meet the Kings Arena squad</p>
          </div>
          <div className="skeleton-grid">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="skeleton-card">
                <div className="skeleton-avatar"></div>
                <div className="skeleton-info">
                  <div className="skeleton-line skeleton-name"></div>
                  <div className="skeleton-line skeleton-text"></div>
                  <div className="skeleton-line skeleton-text"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="players-container">
      <div className="card">
        <div className="card-header">
          <h1 className="card-title">Players</h1>
          <p className="card-subtitle">Meet the Kings Arena squad</p>
        </div>

        <div className="players-filters">
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="Search players, nicknames, or teams..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="filter-dropdowns">
            <select 
              className="filter-select"
              value={positionFilter}
              onChange={(e) => setPositionFilter(e.target.value)}
            >
              <option value="all">All Positions</option>
              <option value="Forward">Forward</option>
              <option value="Midfielder">Midfielder</option>
              <option value="Defender">Defender</option>
              <option value="Goalkeeper">Goalkeeper</option>
            </select>
            
            <select 
              className="filter-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="online">Online</option>
              <option value="offline">Offline</option>
            </select>
          </div>
        </div>

        <div className="players-grid">
          {filteredPlayers.map((player, index) => (
            <motion.div
              key={player.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/players/${player.username}`} className="player-card-link">
                <div className="player-card">
                  <div className="player-header">
                    <div className="player-avatar">{player.avatar}</div>
                    <div className={`status-indicator ${player.online ? 'online' : 'offline'}`}></div>
                  </div>
                  <div className="player-info">
                    <h3 className="player-name">{player.username}</h3>
                    <p className="player-nickname">{player.nickname}</p>
                    <p className="player-position">{player.position}</p>
                    <p className="player-team">{player.team}</p>
                  </div>
                  <div className="player-rating">
                    <span className="rating-badge">{player.rating}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {filteredPlayers.length === 0 && (
          <div className="no-players">
            <h3>No players found</h3>
            <p>Try adjusting your search or filters to find players.</p>
          </div>
        )}
      </div>
    </div>
  );
}
