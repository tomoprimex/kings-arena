"use client";
import React, { useState, useEffect } from "react";
import PlayerCard from "../components/PlayerCard";
import "../styles/players.css";
import "../styles/cards.css";

export default function Players() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  // Mock data - replace with actual API call
  useEffect(() => {
    const mockPlayers = [
      {
        id: 1,
        username: "KingSlayer99",
        rank: 1,
        level: 45,
        winRate: 78.5,
        totalMatches: 234,
        points: 12500,
        games: ["eFootball", "FIFA"],
        avatar: "/images/player1.jpg",
        online: true
      },
      {
        id: 2,
        username: "ProGamer2026",
        rank: 2,
        level: 42,
        winRate: 75.2,
        totalMatches: 198,
        points: 11800,
        games: ["Call of Duty", "eFootball"],
        avatar: "/images/player2.jpg",
        online: true
      },
      {
        id: 3,
        username: "ArenaMaster",
        rank: 3,
        level: 40,
        winRate: 72.8,
        totalMatches: 167,
        points: 10900,
        games: ["FIFA", "Call of Duty"],
        avatar: "/images/player3.jpg",
        online: false
      },
      {
        id: 4,
        username: "ChampionX",
        rank: 4,
        level: 38,
        winRate: 70.1,
        totalMatches: 145,
        points: 9800,
        games: ["eFootball"],
        avatar: "/images/player4.jpg",
        online: true
      },
      {
        id: 5,
        username: "ElitePlayer",
        rank: 5,
        level: 36,
        winRate: 68.9,
        totalMatches: 132,
        points: 8900,
        games: ["Call of Duty"],
        avatar: "/images/player5.jpg",
        online: false
      },
      {
        id: 6,
        username: "RisingStar",
        rank: 6,
        level: 34,
        winRate: 66.4,
        totalMatches: 118,
        points: 7600,
        games: ["FIFA", "eFootball", "Call of Duty"],
        avatar: "/images/player6.jpg",
        online: true
      }
    ];

    setTimeout(() => {
      setPlayers(mockPlayers);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredPlayers = players.filter(player => {
    const matchesSearch = player.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         player.games.some(game => game.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = filter === "all" || 
                         (filter === "online" && player.online) ||
                         (filter === "offline" && !player.online);
    
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="players">
        <div className="playersContainer">
          <div className="playersHeader">
            <h1 className="playersTitle">Loading Players...</h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="players">
      <div className="playersContainer">
        <div className="playersHeader">
          <h1 className="playersTitle">Players</h1>
          <p className="playersSubtitle">
            Discover the best players in the arena and challenge them to epic battles
          </p>
        </div>

        <div className="playersFilters">
          <input
            type="text"
            className="searchBox"
            placeholder="Search players or games..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
          <button 
            className={`filterBtn ${filter === "all" ? "active" : ""}`}
            onClick={() => setFilter("all")}
          >
            All Players
          </button>
          <button 
            className={`filterBtn ${filter === "online" ? "active" : ""}`}
            onClick={() => setFilter("online")}
          >
            Online Now
          </button>
          <button 
            className={`filterBtn ${filter === "offline" ? "active" : ""}`}
            onClick={() => setFilter("offline")}
          >
            Offline
          </button>
        </div>

        <div className="playersGrid">
          {filteredPlayers.map((player) => (
            <PlayerCard key={player.id} player={player} />
          ))}
        </div>

        {filteredPlayers.length === 0 && (
          <div className="noPlayers">
            <h3>No players found</h3>
            <p>Try adjusting your search or filters to find players.</p>
          </div>
        )}
      </div>
    </div>
  );
}
