"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import "../../styles/tournaments.css";

export default function TournamentDetail() {
  const params = useParams();
  const [tournament, setTournament] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - replace with actual API call
    const mockTournament = {
      id: params.id,
      name: "Kings Championship Season 1",
      game: "eFootball",
      gameIcon: "⚽",
      status: "open",
      prizePool: "$10,000",
      participants: 45,
      maxParticipants: 64,
      startDate: "2026-05-15",
      endDate: "2026-05-20",
      description: "The ultimate eFootball championship where the best players compete for glory and massive prizes.",
      rules: [
        "All matches are played on official eFootball servers",
        "Each match consists of two 10-minute halves",
        "Players must use default teams and settings",
        "No cheating or exploits allowed",
        "Tournament officials have final say on disputes"
      ],
      prizes: [
        { position: "1st", amount: "$5,000", description: "Champion's Crown + Trophy" },
        { position: "2nd", amount: "$3,000", description: "Silver Medal" },
        { position: "3rd", amount: "$2,000", description: "Bronze Medal" }
      ],
      bracket: [
        {
          round: "Round of 64",
          matches: [
            { player1: "Player1", player2: "Player2", score: "2-1", winner: "Player1" },
            { player1: "Player3", player2: "Player4", score: "TBD", winner: null }
          ]
        },
        {
          round: "Round of 32",
          matches: [
            { player1: "TBD", player2: "TBD", score: "TBD", winner: null }
          ]
        }
      ]
    };

    setTimeout(() => {
      setTournament(mockTournament);
      setLoading(false);
    }, 1000);
  }, [params.id]);

  if (loading) {
    return (
      <div className="tournaments">
        <div className="tournamentsContainer">
          <h1>Loading tournament...</h1>
        </div>
      </div>
    );
  }

  if (!tournament) {
    return (
      <div className="tournaments">
        <div className="tournamentsContainer">
          <h1>Tournament not found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="tournaments">
      <div className="tournamentsContainer">
        <div className="tournamentDetails">
          <div className="tournamentMain">
            <div className="tournamentHeader">
              <h1>{tournament.name}</h1>
              <span className={`tournamentStatus ${tournament.status}`}>
                {tournament.status}
              </span>
            </div>

            <div className="tournamentGame">
              <span className="gameIcon">{tournament.gameIcon}</span>
              <span>{tournament.game}</span>
            </div>

            <div className="tournamentDescription">
              <h3>About Tournament</h3>
              <p>{tournament.description}</p>
            </div>

            <div className="tournamentInfo">
              <div className="infoGrid">
                <div className="infoItem">
                  <strong>Prize Pool:</strong> {tournament.prizePool}
                </div>
                <div className="infoItem">
                  <strong>Participants:</strong> {tournament.participants}/{tournament.maxParticipants}
                </div>
                <div className="infoItem">
                  <strong>Start Date:</strong> {tournament.startDate}
                </div>
                <div className="infoItem">
                  <strong>End Date:</strong> {tournament.endDate}
                </div>
              </div>
            </div>

            <div className="tournamentRules">
              <h3>Tournament Rules</h3>
              <ul>
                {tournament.rules.map((rule, index) => (
                  <li key={index}>{rule}</li>
                ))}
              </ul>
            </div>

            <div className="bracket">
              <h3>Tournament Bracket</h3>
              {tournament.bracket.map((round, index) => (
                <div key={index} className="bracketRound">
                  <h4 className="roundTitle">{round.round}</h4>
                  {round.matches.map((match, matchIndex) => (
                    <div key={matchIndex} className="match">
                      <div className="matchPlayers">
                        <span>{match.player1}</span>
                        <span>vs</span>
                        <span>{match.player2}</span>
                      </div>
                      <div className="matchScore">{match.score}</div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="tournamentSidebar">
            <div className="sidebarSection">
              <h3>Prize Distribution</h3>
              {tournament.prizes.map((prize, index) => (
                <div key={index} className="prizeItem">
                  <div className="prizePosition">{prize.position}</div>
                  <div className="prizeAmount">{prize.amount}</div>
                  <div className="prizeDescription">{prize.description}</div>
                </div>
              ))}
            </div>

            <div className="sidebarSection">
              <h3>Registration</h3>
              {tournament.status === "open" ? (
                <button className="joinBtn">Join Tournament</button>
              ) : (
                <p>Registration is currently {tournament.status}</p>
              )}
            </div>

            <div className="sidebarSection">
              <h3>Tournament Organizer</h3>
              <div className="organizer">
                <p>Kings Arena Team</p>
                <p>contact@kingsarena.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
