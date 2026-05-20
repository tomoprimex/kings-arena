"use client";
import React from "react";
import Link from "next/link";
import "../styles/tournaments.css";

export default function TournamentCard({ 
  id, 
  name, 
  game, 
  prizePool, 
  date, 
  status, 
  participants 
}) {
  return (
    <div className="tournament-card">
      {/* Tournament Image */}
      <div className="tournament-image">
        <div className="tournament-image-placeholder">
          🎮
        </div>
      </div>

      {/* Tournament Content */}
      <div className="tournament-content">
        <h3 className="tournament-name">{name}</h3>
        
        <div className="tournament-prize">
          <span className="prize-label">Prize Pool:</span>
          <span className="prize-amount">{prizePool}</span>
        </div>

        <div className="tournament-date">
          <span className="date-icon">📅</span>
          <span>{date}</span>
        </div>
      </div>

      {/* Tournament Footer */}
      <div className="tournament-footer">
        <span className={`tournament-status status-${status}`}>
          {status}
        </span>
        <Link href={`/tournaments/${id}`} className="join-btn">
          Join Now
        </Link>
      </div>
    </div>
  );
}
