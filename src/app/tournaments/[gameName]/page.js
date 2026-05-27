"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import "../../styles/tournaments.css";

export default function GameTournaments() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [gameData, setGameData] = useState(null);

  // Games data with tournament tiers
  const games = [
    {
      id: 1,
      name: "FC 26",
      image: "/images/fc.jpeg",
      tiers: {
        "National Cup": [
          { id: 101, name: "Kings Arena National Cup", prizePool: "$50,000", participants: 128, maxParticipants: 256, status: "open", type: "solo", gameImage: "/images/fc.jpeg" }
        ],
        "Continental Championship": [
          { id: 102, name: "European FC Championship", prizePool: "$100,000", participants: 64, maxParticipants: 128, status: "ongoing", type: "team", gameImage: "/images/fc.jpeg" }
        ],
        "World Championship": [
          { id: 103, name: "FC 26 World Championship", prizePool: "$500,000", participants: 32, maxParticipants: 64, status: "ongoing", type: "team", gameImage: "/images/fc.jpeg" }
        ],
        "Pro Series": [
          { id: 104, name: "FC Pro Elite Series", prizePool: "$75,000", participants: 16, maxParticipants: 16, status: "ongoing", type: "solo", gameImage: "/images/fc.jpeg" }
        ],
        "National Qualifiers": [
          { id: 105, name: "National Cup Qualifiers", prizePool: "$5,000", participants: 256, maxParticipants: 512, status: "open", type: "solo", gameImage: "/images/fc.jpeg" }
        ],
        "Community": [
          { id: 106, name: "FC Community Cup", prizePool: "$2,000", participants: 64, maxParticipants: 128, status: "open", type: "solo", gameImage: "/images/fc.jpeg" }
        ]
      }
    },
    {
      id: 2,
      name: "Call of Duty",
      image: "/images/callofduty.webp",
      tiers: {
        "National Cup": [
          { id: 201, name: "COD National Championship", prizePool: "$40,000", participants: 64, maxParticipants: 128, status: "open", type: "team", gameImage: "/images/callofduty.webp" }
        ],
        "Continental Championship": [
          { id: 202, name: "COD Continental League", prizePool: "$80,000", participants: 32, maxParticipants: 64, status: "ongoing", type: "team", gameImage: "/images/callofduty.webp" }
        ],
        "World Championship": [
          { id: 203, name: "COD World Championship", prizePool: "$400,000", participants: 16, maxParticipants: 32, status: "ongoing", type: "team", gameImage: "/images/callofduty.webp" }
        ],
        "Pro Series": [
          { id: 204, name: "COD Pro Circuit", prizePool: "$60,000", participants: 12, maxParticipants: 12, status: "ongoing", type: "team", gameImage: "/images/callofduty.webp" }
        ],
        "National Qualifiers": [
          { id: 205, name: "COD National Qualifiers", prizePool: "$4,000", participants: 128, maxParticipants: 256, status: "open", type: "team", gameImage: "/images/callofduty.webp" }
        ],
        "Community": [
          { id: 206, name: "COD Community Tournament", prizePool: "$1,500", participants: 32, maxParticipants: 64, status: "open", type: "team", gameImage: "/images/callofduty.webp" }
        ]
      }
    },
    {
      id: 3,
      name: "eFootball",
      image: "/images/efootball.jpeg",
      tiers: {
        "National Cup": [
          { id: 301, name: "eFootball National Cup", prizePool: "$35,000", participants: 96, maxParticipants: 192, status: "open", type: "solo", gameImage: "/images/efootball.jpeg" }
        ],
        "Continental Championship": [
          { id: 302, name: "eFootball Continental Cup", prizePool: "$70,000", participants: 48, maxParticipants: 96, status: "ongoing", type: "solo", gameImage: "/images/efootball.jpeg" }
        ],
        "World Championship": [
          { id: 303, name: "eFootball World Cup", prizePool: "$350,000", participants: 24, maxParticipants: 48, status: "ongoing", type: "solo", gameImage: "/images/efootball.jpeg" }
        ],
        "Pro Series": [
          { id: 304, name: "eFootball Pro League", prizePool: "$55,000", participants: 16, maxParticipants: 16, status: "ongoing", type: "solo", gameImage: "/images/efootball.jpeg" }
        ],
        "National Qualifiers": [
          { id: 305, name: "eFootball Qualifiers", prizePool: "$3,500", participants: 192, maxParticipants: 384, status: "open", type: "solo", gameImage: "/images/efootball.jpeg" }
        ],
        "Community": [
          { id: 306, name: "eFootball Community Cup", prizePool: "$1,200", participants: 48, maxParticipants: 96, status: "open", type: "solo", gameImage: "/images/efootball.jpeg" }
        ]
      }
    },
    {
      id: 4,
      name: "Free Fire",
      image: "/images/freefire.webp",
      tiers: {
        "National Cup": [
          { id: 401, name: "Free Fire National Cup", prizePool: "$30,000", participants: 100, maxParticipants: 200, status: "open", type: "team", gameImage: "/images/freefire.webp" }
        ],
        "Continental Championship": [
          { id: 402, name: "Free Fire Continental", prizePool: "$60,000", participants: 50, maxParticipants: 100, status: "ongoing", type: "team", gameImage: "/images/freefire.webp" }
        ],
        "World Championship": [
          { id: 403, name: "Free Fire World Series", prizePool: "$300,000", participants: 25, maxParticipants: 50, status: "ongoing", type: "team", gameImage: "/images/freefire.webp" }
        ],
        "Pro Series": [
          { id: 404, name: "Free Fire Pro League", prizePool: "$45,000", participants: 12, maxParticipants: 12, status: "ongoing", type: "team", gameImage: "/images/freefire.webp" }
        ],
        "National Qualifiers": [
          { id: 405, name: "Free Fire Qualifiers", prizePool: "$3,000", participants: 200, maxParticipants: 400, status: "open", type: "team", gameImage: "/images/freefire.webp" }
        ],
        "Community": [
          { id: 406, name: "Free Fire Community Cup", prizePool: "$1,000", participants: 50, maxParticipants: 100, status: "open", type: "team", gameImage: "/images/freefire.webp" }
        ]
      }
    },
    {
      id: 5,
      name: "DLS 26",
      image: "/images/dls.jpeg",
      tiers: {
        "National Cup": [
          { id: 501, name: "DLS National Cup", prizePool: "$25,000", participants: 80, maxParticipants: 160, status: "open", type: "solo", gameImage: "/images/dls.jpeg" }
        ],
        "Continental Championship": [
          { id: 502, name: "DLS Continental Cup", prizePool: "$50,000", participants: 40, maxParticipants: 80, status: "ongoing", type: "solo", gameImage: "/images/dls.jpeg" }
        ],
        "World Championship": [
          { id: 503, name: "DLS World Championship", prizePool: "$250,000", participants: 20, maxParticipants: 40, status: "ongoing", type: "solo", gameImage: "/images/dls.jpeg" }
        ],
        "Pro Series": [
          { id: 504, name: "DLS Pro Series", prizePool: "$40,000", participants: 12, maxParticipants: 12, status: "ongoing", type: "solo", gameImage: "/images/dls.jpeg" }
        ],
        "National Qualifiers": [
          { id: 505, name: "DLS Qualifiers", prizePool: "$2,500", participants: 160, maxParticipants: 320, status: "open", type: "solo", gameImage: "/images/dls.jpeg" }
        ],
        "Community": [
          { id: 506, name: "DLS Community Cup", prizePool: "$800", participants: 40, maxParticipants: 80, status: "open", type: "solo", gameImage: "/images/dls.jpeg" }
        ]
      }
    }
  ];

  useEffect(() => {
    const gameName = decodeURIComponent(params.gameName);
    const selectedGame = games.find(g => g.name === gameName);
    setGameData(selectedGame);
    setLoading(false);
  }, [params.gameName]);

  const handleViewTournament = (tournamentId) => {
    router.push(`/tournaments/${tournamentId}`);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading tournaments...</p>
      </div>
    );
  }

  if (!gameData) {
    return (
      <div className="tournaments-container">
        <div className="card">
          <div className="card-header">
            <button className="back-btn" onClick={() => router.push('/tournaments')}>
              ← Back to Games
            </button>
            <h2 className="card-title">Game not found</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="tournaments-container">
      <div className="card">
        <div className="card-header">
          <button className="back-btn" onClick={() => router.push('/tournaments')}>
            ← Back to Games
          </button>
          <h2 className="card-title">{gameData.name} Tournaments</h2>
        </div>
        <div className="game-tiers-full-container">
          {Object.entries(gameData.tiers).map(([tierName, tournaments]) => (
            <div key={tierName} className="tier-section-full">
              <h3 className="tier-title-full">{tierName}</h3>
              <div className="tournaments-grid">
                {tournaments.map((tournament) => (
                  <div key={tournament.id} className="tournament-card" onClick={() => handleViewTournament(tournament.id)}>
                    <div className="tournament-header">
                      {tournament.gameImage && (
                        <div className="game-image-wrapper">
                          <img src={tournament.gameImage} alt={gameData.name} className="tournament-game-image" />
                          <div className="game-overlay"></div>
                        </div>
                      )}
                      <div className="tournament-type-badge">
                        {tournament.type === 'team' ? 'Team' : 'Solo'}
                      </div>
                    </div>
                    <div className="tournament-content">
                      <h3 className="tournament-game-title">{gameData.name}</h3>
                      <h4 className="tournament-name">{tournament.name}</h4>
                      <p className="tournament-description">
                        Compete in this exciting tournament and prove your skills against the best players.
                      </p>
                      <div className="tournament-stats">
                        <div className="stat">
                          <span className="stat-value">{tournament.prizePool}</span>
                          <span className="stat-label">Prize Pool</span>
                        </div>
                        <div className="stat">
                          <span className="stat-value">{tournament.participants}/{tournament.maxParticipants}</span>
                          <span className="stat-label">Players</span>
                        </div>
                      </div>
                      <div className="tournament-footer">
                        <span className={`tournament-status ${tournament.status}`}>
                          {tournament.status}
                        </span>
                        <button className="action-btn">
                          {tournament.status === 'open' ? 'Join' : 'View'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
