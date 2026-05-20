"use client";
import React, { useState, useEffect } from "react";
import TournamentCard from "../components/TournamentCard";
import "../styles/tournaments.css";

export default function Tournaments() {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  // Mock data - replace with actual API call
  useEffect(() => {
    const mockTournaments = [
      {
        id: 1,
        name: "Kings Championship Season 1",
        game: "eFootball",
        gameIcon: "⚽",
        status: "open",
        prizePool: "$10,000",
        participants: 45,
        maxParticipants: 64,
        startDate: "2026-05-15"
      },
      {
        id: 2,
        name: "National League Qualifiers",
        game: "FIFA",
        gameIcon: "🏈",
        status: "ongoing",
        prizePool: "$5,000",
        participants: 32,
        maxParticipants: 32,
        startDate: "2026-05-10"
      },
      {
        id: 3,
        name: "Continental Cup",
        game: "Call of Duty",
        gameIcon: "🎮",
        status: "open",
        prizePool: "$15,000",
        participants: 12,
        maxParticipants: 128,
        startDate: "2026-05-20"
      },
      {
        id: 4,
        name: "Friendly Arena Championship",
        game: "eFootball",
        gameIcon: "⚽",
        status: "completed",
        prizePool: "$2,000",
        participants: 16,
        maxParticipants: 16,
        startDate: "2026-05-01"
      },
      {
        id: 5,
        name: "Intercontinental Masters",
        game: "FIFA",
        gameIcon: "🏈",
        status: "open",
        prizePool: "$25,000",
        participants: 8,
        maxParticipants: 32,
        startDate: "2026-06-01"
      },
      {
        id: 6,
        name: "Hall of Champions Tournament",
        game: "Call of Duty",
        gameIcon: "🎮",
        status: "ongoing",
        prizePool: "$8,000",
        participants: 24,
        maxParticipants: 64,
        startDate: "2026-05-08"
      }
    ];

    setTimeout(() => {
      setTournaments(mockTournaments);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredTournaments = tournaments.filter(tournament => {
    if (filter === "all") return true;
    return tournament.status === filter;
  });

  if (loading) {
    return (
      <div className="tournaments">
        <div className="tournamentsContainer">
          <div className="tournamentsHeader">
            <h1 className="tournamentsTitle">Loading Tournaments...</h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="tournaments">
      <div className="tournamentsContainer">
        <div className="tournamentsHeader">
          <h1 className="tournamentsTitle">Tournaments</h1>
          <p className="tournamentsSubtitle">
            Join competitive tournaments and prove your skills against the best players
          </p>
        </div>

        <div className="tournamentsFilters">
          <button 
            className={`filterBtn ${filter === "all" ? "active" : ""}`}
            onClick={() => setFilter("all")}
          >
            All Tournaments
          </button>
          <button 
            className={`filterBtn ${filter === "open" ? "active" : ""}`}
            onClick={() => setFilter("open")}
          >
            Open for Registration
          </button>
          <button 
            className={`filterBtn ${filter === "ongoing" ? "active" : ""}`}
            onClick={() => setFilter("ongoing")}
          >
            In Progress
          </button>
          <button 
            className={`filterBtn ${filter === "completed" ? "active" : ""}`}
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
        </div>

        <div className="tournamentsGrid">
          {filteredTournaments.map((tournament) => (
            <TournamentCard key={tournament.id} tournament={tournament} />
          ))}
        </div>

        {filteredTournaments.length === 0 && (
          <div className="noTournaments">
            <h3>No tournaments found</h3>
            <p>Check back later for new tournaments or try a different filter.</p>
          </div>
        )}
      </div>
    </div>
  );
}