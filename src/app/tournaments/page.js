"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Crown } from "lucide-react";
import TournamentCard from "../components/TournamentCard";
import "../styles/tournaments.css";
import "../styles/cards.css";

export default function Tournaments() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  // Mock data - replace with actual API call
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const handleViewTournament = (tournamentId) => {
    router.push(`/tournaments/${tournamentId}`);
  };

  const handleViewGameTournaments = (gameName) => {
    router.push(`/tournaments/${encodeURIComponent(gameName)}`);
  };

  // Games data for the games section with tournament tiers
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

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading tournaments...</p>
      </div>
    );
  }

  return (
    <div className="tournaments-container">
      <div className="card">
        <div className="card-header">
          <h1 className="card-title">Tournaments</h1>
          <p className="card-subtitle">
            Join competitive tournaments and prove your skills against the best players
          </p>
        </div>

        {/* Games Section */}
        <div className="games-section">
          <h2 className="section-title">Select a Game</h2>
          <div className="games-grid">
            {games.map((game) => (
              <div key={game.id} className="game-card-expanded">
                <div className="game-card-header">
                  <img src={game.image} alt={game.name} className="game-card-image" />
                  <div className="game-card-overlay"></div>
                  <div className="game-card-title-section">
                    <h3 className="game-card-name">{game.name}</h3>
                    <button className="game-card-explore-btn" onClick={() => handleViewGameTournaments(game.name)}>View All Tournaments</button>
                  </div>
                </div>
                <div className="game-tiers-container">
                  {Object.entries(game.tiers).map(([tierName, tournaments]) => (
                    <div key={tierName} className="tier-section">
                      <h4 className="tier-title">{tierName}</h4>
                      <div className="tier-tournaments">
                        {tournaments.map((tournament) => (
                          <div key={tournament.id} className="mini-tournament-card" onClick={() => handleViewTournament(tournament.id)}>
                            <div className="mini-tournament-header">
                              <span className={`mini-tournament-status ${tournament.status}`}>{tournament.status}</span>
                            </div>
                            <h5 className="mini-tournament-name">{tournament.name}</h5>
                            <div className="mini-tournament-stats">
                              <span className="mini-stat">{tournament.prizePool}</span>
                              <span className="mini-stat">{tournament.participants}/{tournament.maxParticipants}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hall of Champions Section */}
        <div className="hall-of-champions-section">
          <h2 className="section-title">Hall of Champions</h2>
          <div className="champions-grid">
            {[1, 2, 3, 4].map((id) => (
              <div key={id} className="champion-card">
                <div className="champion-image-placeholder">
                  <Crown className="placeholder-icon" size={48} />
                </div>
                <div className="champion-info">
                  <h3 className="champion-name">Coming Soon</h3>
                  <p className="champion-game">TBD</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}