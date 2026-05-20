"use client";
import React, { useState, useEffect } from "react";
import TournamentCard from "../../components/TournamentCard";
import "../../styles/tournaments.css";

export default function MyTournaments() {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("participating");

  useEffect(() => {
    // Mock data - replace with actual API call
    const mockTournaments = {
      participating: [
        {
          id: 1,
          name: "Kings Championship Season 1",
          game: "eFootball",
          gameIcon: "⚽",
          status: "ongoing",
          prizePool: "$10,000",
          participants: 45,
          maxParticipants: 64,
          startDate: "2026-05-15",
          yourPosition: "Round of 32",
          nextMatch: "vs ProGamer2026"
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
          startDate: "2026-05-20",
          yourPosition: "Registered",
          nextMatch: "TBD"
        }
      ],
      hosting: [
        {
          id: 7,
          name: "Custom Arena - KingSlayer99",
          game: "FIFA",
          gameIcon: "🏈",
          status: "open",
          prizePool: "$500",
          participants: 8,
          maxParticipants: 16,
          startDate: "2026-05-12",
          yourRole: "Host"
        }
      ],
      completed: [
        {
          id: 4,
          name: "Friendly Arena Championship",
          game: "eFootball",
          gameIcon: "⚽",
          status: "completed",
          prizePool: "$2,000",
          participants: 16,
          maxParticipants: 16,
          startDate: "2026-05-01",
          yourResult: "3rd Place",
          earnings: "$500"
        }
      ]
    };

    setTimeout(() => {
      setTournaments(mockTournaments);
      setLoading(false);
    }, 1000);
  }, []);

  const currentTournaments = tournaments[activeTab] || [];

  if (loading) {
    return (
      <div className="tournaments">
        <div className="tournamentsContainer">
          <h1>Loading your tournaments...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="tournaments">
      <div className="tournamentsContainer">
        <div className="tournamentsHeader">
          <h1 className="tournamentsTitle">My Tournaments</h1>
          <p className="tournamentsSubtitle">
            Manage your tournament participation and hosting
          </p>
        </div>

        <div className="tournamentTabs">
          <button 
            className={`tabBtn ${activeTab === "participating" ? "active" : ""}`}
            onClick={() => setActiveTab("participating")}
          >
            Participating ({tournaments.participating?.length || 0})
          </button>
          <button 
            className={`tabBtn ${activeTab === "hosting" ? "active" : ""}`}
            onClick={() => setActiveTab("hosting")}
          >
            Hosting ({tournaments.hosting?.length || 0})
          </button>
          <button 
            className={`tabBtn ${activeTab === "completed" ? "active" : ""}`}
            onClick={() => setActiveTab("completed")}
          >
            Completed ({tournaments.completed?.length || 0})
          </button>
        </div>

        <div className="tournamentsGrid">
          {currentTournaments.map((tournament) => (
            <div key={tournament.id} className="myTournamentCard">
              <div className="tournamentHeader">
                <h3>{tournament.name}</h3>
                <span className={`tournamentStatus ${tournament.status}`}>
                  {tournament.status}
                </span>
              </div>
              
              <div className="tournamentInfo">
                <div className="tournamentGame">
                  <span className="gameIcon">{tournament.gameIcon}</span>
                  <span>{tournament.game}</span>
                </div>
                
                <div className="tournamentDetails">
                  <p>
                    <strong>Prize Pool:</strong> {tournament.prizePool}
                  </p>
                  <p>
                    <strong>Participants:</strong> {tournament.participants}/{tournament.maxParticipants}
                  </p>
                  <p>
                    <strong>Start Date:</strong> {tournament.startDate}
                  </p>
                  
                  {tournament.yourPosition && (
                    <p>
                      <strong>Your Position:</strong> {tournament.yourPosition}
                    </p>
                  )}
                  
                  {tournament.nextMatch && (
                    <p>
                      <strong>Next Match:</strong> {tournament.nextMatch}
                    </p>
                  )}
                  
                  {tournament.yourResult && (
                    <p>
                      <strong>Your Result:</strong> {tournament.yourResult}
                    </p>
                  )}
                  
                  {tournament.earnings && (
                    <p>
                      <strong>Earnings:</strong> {tournament.earnings}
                    </p>
                  )}
                  
                  {tournament.yourRole && (
                    <p>
                      <strong>Your Role:</strong> {tournament.yourRole}
                    </p>
                  )}
                </div>
              </div>
              
              <div className="tournamentActions">
                <button className="viewBtn">View Details</button>
                {tournament.status === "ongoing" && (
                  <button className="actionBtn">View Bracket</button>
                )}
                {tournament.status === "open" && activeTab === "participating" && (
                  <button className="actionBtn">Withdraw</button>
                )}
                {activeTab === "hosting" && (
                  <button className="actionBtn">Manage</button>
                )}
              </div>
            </div>
          ))}
        </div>

        {currentTournaments.length === 0 && (
          <div className="noTournaments">
            <h3>No tournaments found</h3>
            <p>
              {activeTab === "participating" && "You haven't joined any tournaments yet."}
              {activeTab === "hosting" && "You haven't hosted any tournaments yet."}
              {activeTab === "completed" && "You haven't completed any tournaments yet."}
            </p>
            <button className="browseBtn">Browse Tournaments</button>
          </div>
        )}

        <div className="quickActions">
          <button className="createTournamentBtn">Create Tournament</button>
          <button className="browseTournamentsBtn">Browse More</button>
        </div>
      </div>
    </div>
  );
}
