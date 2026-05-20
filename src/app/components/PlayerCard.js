"use client";
import React from "react";
import Link from "next/link";
import "../styles/players.css";
import "../styles/cards.css";

export default function PlayerCard({ player }) {
  return (
    <div className="playerCard">
      <div className="playerAvatar">
        <img 
          src={player.avatar || "/images/default-avatar.png"} 
          alt={player.username}
          onError={(e) => {
            e.target.src = "/images/default-avatar.png";
          }}
        />
        <div className={`playerStatus ${player.online ? "online" : "offline"}`}></div>
      </div>
      
      <div className="playerInfo">
        <h3>{player.username}</h3>
        <p className="playerRank">Rank: #{player.rank}</p>
        <p className="playerLevel">Level {player.level}</p>
        
        <div className="playerStats">
          <div className="stat">
            <span className="statLabel">Win Rate</span>
            <span className="statValue">{player.winRate}%</span>
          </div>
          <div className="stat">
            <span className="statLabel">Matches</span>
            <span className="statValue">{player.totalMatches}</span>
          </div>
          <div className="stat">
            <span className="statLabel">Points</span>
            <span className="statValue">{player.points}</span>
          </div>
        </div>
        
        <div className="playerGames">
          {player.games.map((game, index) => (
            <span key={index} className="gameTag">
              {game}
            </span>
          ))}
        </div>
      </div>
      
      <div className="playerActions">
        <Link href={`/players/${player.username}`} className="profileBtn">
          View Profile
        </Link>
        <button className="challengeBtn">Challenge</button>
      </div>
    </div>
  );
}
