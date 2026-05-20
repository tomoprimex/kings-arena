"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import "../../styles/players.css";

export default function PlayerProfile() {
  const params = useParams();
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - replace with actual API call
    const mockPlayer = {
      username: params.username,
      rank: 1,
      level: 45,
      winRate: 78.5,
      totalMatches: 234,
      points: 12500,
      games: ["eFootball", "FIFA"],
      avatar: "/images/player1.jpg",
      online: true,
      bio: "Professional esports player specializing in football games. 3-time champion and current #1 ranked player.",
      stats: {
        wins: 184,
        losses: 50,
        draws: 0,
        goals: 456,
        assists: 123,
        cleanSheets: 89
      },
      achievements: [
        "Kings Championship Season 1 Winner",
        "National League MVP",
        "100 Win Streak",
        "Player of the Year 2025"
      ],
      matchHistory: [
        { game: "eFootball", opponent: "ProGamer2026", result: "win", score: "3-1", date: "2026-05-07" },
        { game: "FIFA", opponent: "ArenaMaster", result: "win", score: "2-0", date: "2026-05-06" },
        { game: "eFootball", opponent: "ChampionX", result: "draw", score: "1-1", date: "2026-05-05" },
        { game: "Call of Duty", opponent: "ElitePlayer", result: "loss", score: "0-1", date: "2026-05-04" }
      ]
    };

    setTimeout(() => {
      setPlayer(mockPlayer);
      setLoading(false);
    }, 1000);
  }, [params.username]);

  if (loading) {
    return (
      <div className="players">
        <div className="playersContainer">
          <h1>Loading player profile...</h1>
        </div>
      </div>
    );
  }

  if (!player) {
    return (
      <div className="players">
        <div className="playersContainer">
          <h1>Player not found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="players">
      <div className="playersContainer">
        <div className="playerProfile">
          <div className="playerProfileSidebar">
            <div className="profileAvatar">
              <img 
                src={player.avatar} 
                alt={player.username}
                onError={(e) => {
                  e.target.src = "/images/default-avatar.png";
                }}
              />
              <h2 className="profileName">{player.username}</h2>
              <div className={`playerStatus ${player.online ? "online" : "offline"}`}>
                {player.online ? "Online" : "Offline"}
              </div>
            </div>

            <div className="profileBio">
              <p>{player.bio}</p>
            </div>

            <div className="profileStats">
              <div className="profileStat">
                <div className="profileStatValue">#{player.rank}</div>
                <div className="profileStatLabel">Rank</div>
              </div>
              <div className="profileStat">
                <div className="profileStatValue">{player.level}</div>
                <div className="profileStatLabel">Level</div>
              </div>
              <div className="profileStat">
                <div className="profileStatValue">{player.winRate}%</div>
                <div className="profileStatLabel">Win Rate</div>
              </div>
              <div className="profileStat">
                <div className="profileStatValue">{player.points}</div>
                <div className="profileStatLabel">Points</div>
              </div>
            </div>

            <div className="playerGames">
              <h3>Games</h3>
              <div className="gameTags">
                {player.games.map((game, index) => (
                  <span key={index} className="gameTag">{game}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="playerProfileMain">
            <div className="detailedStats">
              <h3>Detailed Statistics</h3>
              <div className="statsGrid">
                <div className="statItem">
                  <strong>Total Matches:</strong> {player.totalMatches}
                </div>
                <div className="statItem">
                  <strong>Wins:</strong> {player.stats.wins}
                </div>
                <div className="statItem">
                  <strong>Losses:</strong> {player.stats.losses}
                </div>
                <div className="statItem">
                  <strong>Draws:</strong> {player.stats.draws}
                </div>
                <div className="statItem">
                  <strong>Goals Scored:</strong> {player.stats.goals}
                </div>
                <div className="statItem">
                  <strong>Assists:</strong> {player.stats.assists}
                </div>
                <div className="statItem">
                  <strong>Clean Sheets:</strong> {player.stats.cleanSheets}
                </div>
              </div>
            </div>

            <div className="achievements">
              <h3>Achievements</h3>
              <div className="achievementsList">
                {player.achievements.map((achievement, index) => (
                  <div key={index} className="achievementItem">
                    <span className="achievementIcon">🏆</span>
                    <span>{achievement}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="matchHistory">
              <h3 className="matchHistoryTitle">Recent Matches</h3>
              <div className="matchHistoryList">
                {player.matchHistory.map((match, index) => (
                  <div key={index} className="matchItem">
                    <div className="matchInfo">
                      <div className="matchGame">{match.game}</div>
                      <div className="matchOpponent">vs {match.opponent}</div>
                    </div>
                    <div className="matchResult">{match.score}</div>
                    <span className={`matchResult ${match.result}`}>
                      {match.result}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="profileActions">
              <button className="challengeBtn">Challenge Player</button>
              <button className="messageBtn">Send Message</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
