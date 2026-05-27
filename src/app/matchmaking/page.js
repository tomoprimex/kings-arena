"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Trophy } from "lucide-react";
import "../styles/matchmaking.css";
import "../styles/cards.css";
import AuthGuard from "@/components/AuthGuard";

export default function Matchmaking() {
  const [availablePlayers, setAvailablePlayers] = useState([]);
  const [myChallenges, setMyChallenges] = useState([]);
  const [incomingChallenges, setIncomingChallenges] = useState([]);
  const [matchHistory, setMatchHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  // Mock data
  useEffect(() => {
    const mockAvailablePlayers = [
      {
        id: 1,
        username: "EliteSniper",
        rank: 2,
        level: 45,
        winRate: 78,
        games: "FIFA 24",
        status: "online",
        avatar: null
      },
      {
        id: 2,
        username: "ProGamer2024",
        rank: 5,
        level: 38,
        winRate: 72,
        games: "eFootball",
        status: "online",
        avatar: null
      },
      {
        id: 3,
        username: "ArenaKing",
        rank: 8,
        level: 32,
        winRate: 65,
        games: "Call of Duty",
        status: "online",
        avatar: null
      },
      {
        id: 4,
        username: "ChampionElite",
        rank: 12,
        level: 28,
        winRate: 58,
        games: "FIFA 24",
        status: "in-game",
        avatar: null
      },
      {
        id: 5,
        username: "SkillMaster",
        rank: 15,
        level: 25,
        winRate: 55,
        games: "eFootball",
        status: "online",
        avatar: null
      }
    ];

    const mockMyChallenges = [
      {
        id: 1,
        opponent: "EliteSniper",
        game: "FIFA 24",
        status: "pending",
        date: "2026-05-22",
        time: "18:00"
      },
      {
        id: 2,
        opponent: "ProGamer2024",
        game: "eFootball",
        status: "accepted",
        date: "2026-05-23",
        time: "20:00"
      }
    ];

    const mockIncomingChallenges = [
      {
        id: 1,
        challenger: "ArenaKing",
        game: "Call of Duty",
        status: "pending",
        date: "2026-05-22",
        time: "19:00"
      }
    ];

    const mockMatchHistory = [
      {
        id: 1,
        opponent: "xXDragonSlayerXx",
        game: "FIFA 24",
        result: "win",
        score: "3-1",
        date: "2026-05-20"
      },
      {
        id: 2,
        opponent: "BattleKing",
        game: "eFootball",
        result: "loss",
        score: "1-2",
        date: "2026-05-19"
      },
      {
        id: 3,
        opponent: "TournamentPro",
        game: "Call of Duty",
        result: "win",
        score: "2-0",
        date: "2026-05-18"
      }
    ];

    setTimeout(() => {
      setAvailablePlayers(mockAvailablePlayers);
      setMyChallenges(mockMyChallenges);
      setIncomingChallenges(mockIncomingChallenges);
      setMatchHistory(mockMatchHistory);
      setLoading(false);
    }, 1000);
  }, []);

  const handleChallenge = (playerId) => {
    const player = availablePlayers.find(p => p.id === playerId);
    if (player) {
      const newChallenge = {
        id: Date.now(),
        opponent: player.username,
        game: player.games,
        status: "pending",
        date: new Date().toISOString().split('T')[0],
        time: "18:00"
      };
      setMyChallenges([...myChallenges, newChallenge]);
      setAvailablePlayers(availablePlayers.filter(p => p.id !== playerId));
    }
  };

  const handleAcceptChallenge = (challengeId) => {
    setIncomingChallenges(incomingChallenges.filter(c => c.id !== challengeId));
    const acceptedChallenge = incomingChallenges.find(c => c.id === challengeId);
    if (acceptedChallenge) {
      setMyChallenges([...myChallenges, { ...acceptedChallenge, status: "accepted" }]);
    }
  };

  const handleDeclineChallenge = (challengeId) => {
    setIncomingChallenges(incomingChallenges.filter(c => c.id !== challengeId));
  };

  const filteredPlayers = availablePlayers.filter(player => {
    if (filter === "all") return true;
    if (filter === "online") return player.status === "online";
    if (filter === "in-game") return player.status === "in-game";
    return true;
  });

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading matchmaking...</p>
      </div>
    );
  }

  return (
    <AuthGuard>
      <div className="matchmaking-container">
        <div className="card">
        <div className="card-header">
          <h1 className="card-title">Matchmaking & Challenges</h1>
          <p className="card-subtitle">
            Find opponents, challenge players, and track your matches
          </p>
        </div>

        {/* Tabs */}
        <div className="matchmaking-tabs">
          <button 
            className={`tab-btn ${filter === "all" ? "active" : ""}`}
            onClick={() => setFilter("all")}
          >
            Find Players
          </button>
          <button 
            className={`tab-btn ${filter === "my-challenges" ? "active" : ""}`}
            onClick={() => setFilter("my-challenges")}
          >
            My Challenges ({myChallenges.length})
          </button>
          <button 
            className={`tab-btn ${filter === "incoming" ? "active" : ""}`}
            onClick={() => setFilter("incoming")}
          >
            Incoming ({incomingChallenges.length})
          </button>
          <button 
            className={`tab-btn ${filter === "history" ? "active" : ""}`}
            onClick={() => setFilter("history")}
          >
            Match History
          </button>
        </div>

        {/* Find Players Tab */}
        {filter === "all" && (
          <div className="tab-content">
            <div className="players-filter">
              <button 
                className={`filter-chip ${filter === "all" ? "active" : ""}`}
                onClick={() => setFilter("all")}
              >
                All Players
              </button>
              <button 
                className={`filter-chip ${filter === "online" ? "active" : ""}`}
                onClick={() => setFilter("online")}
              >
                Online Only
              </button>
              <button 
                className={`filter-chip ${filter === "in-game" ? "active" : ""}`}
                onClick={() => setFilter("in-game")}
              >
                In Game
              </button>
            </div>

            <div className="players-grid">
              {filteredPlayers.map((player) => (
                <div key={player.id} className="player-match-card">
                  <div className="player-header">
                    <span className="player-avatar">{player.avatar}</span>
                    <div className={`status-indicator ${player.status}`}></div>
                  </div>
                  <h3 className="player-name">{player.username}</h3>
                  <p className="player-game">{player.games}</p>
                  <div className="player-stats">
                    <div className="stat-item">
                      <span className="stat-value">#{player.rank}</span>
                      <span className="stat-label">Rank</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-value">{player.level}</span>
                      <span className="stat-label">Level</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-value">{player.winRate}%</span>
                      <span className="stat-label">Win Rate</span>
                    </div>
                  </div>
                  <button 
                    className="challenge-btn"
                    onClick={() => handleChallenge(player.id)}
                    disabled={player.status === "in-game"}
                  >
                    {player.status === "in-game" ? "In Game" : "Challenge"}
                  </button>
                </div>
              ))}
            </div>

            {filteredPlayers.length === 0 && (
              <div className="no-players">
                <h3>No players found</h3>
                <p>Try a different filter or check back later.</p>
              </div>
            )}
          </div>
        )}

        {/* My Challenges Tab */}
        {filter === "my-challenges" && (
          <div className="tab-content">
            <div className="challenges-list">
              {myChallenges.map((challenge) => (
                <div key={challenge.id} className="challenge-card">
                  <div className="challenge-info">
                    <h3 className="challenge-opponent">vs {challenge.opponent}</h3>
                    <p className="challenge-game">{challenge.game}</p>
                    <div className="challenge-details">
                      <span className="challenge-date">{challenge.date}</span>
                      <span className="challenge-time">{challenge.time}</span>
                    </div>
                  </div>
                  <div className={`challenge-status ${challenge.status}`}>
                    {challenge.status}
                  </div>
                </div>
              ))}
            </div>

            {myChallenges.length === 0 && (
              <div className="no-challenges">
                <h3>No active challenges</h3>
                <p>Challenge other players to start competing!</p>
              </div>
            )}
          </div>
        )}

        {/* Incoming Challenges Tab */}
        {filter === "incoming" && (
          <div className="tab-content">
            <div className="challenges-list">
              {incomingChallenges.map((challenge) => (
                <div key={challenge.id} className="challenge-card incoming">
                  <div className="challenge-info">
                    <h3 className="challenge-opponent">{challenge.challenger} challenged you!</h3>
                    <p className="challenge-game">{challenge.game}</p>
                    <div className="challenge-details">
                      <span className="challenge-date">{challenge.date}</span>
                      <span className="challenge-time">{challenge.time}</span>
                    </div>
                  </div>
                  <div className="challenge-actions">
                    <button 
                      className="accept-btn"
                      onClick={() => handleAcceptChallenge(challenge.id)}
                    >
                      Accept
                    </button>
                    <button 
                      className="decline-btn"
                      onClick={() => handleDeclineChallenge(challenge.id)}
                    >
                      Decline
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {incomingChallenges.length === 0 && (
              <div className="no-challenges">
                <h3>No incoming challenges</h3>
                <p>Wait for other players to challenge you!</p>
              </div>
            )}
          </div>
        )}

        {/* Match History Tab */}
        {filter === "history" && (
          <div className="tab-content">
            <div className="history-list">
              {matchHistory.map((match) => (
                <div key={match.id} className={`history-card ${match.result}`}>
                  <div className="history-info">
                    <h3 className="history-opponent">vs {match.opponent}</h3>
                    <p className="history-game">{match.game}</p>
                    <div className="history-details">
                      <span className="history-date">{match.date}</span>
                      <span className="history-score">{match.score}</span>
                    </div>
                  </div>
                  <div className={`history-result ${match.result}`}>
                    {match.result.toUpperCase()}
                  </div>
                </div>
              ))}
            </div>

            {matchHistory.length === 0 && (
              <div className="no-history">
                <h3>No match history</h3>
                <p>Start challenging players to build your history!</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
    </AuthGuard>
  );
}
