"use client";
import "./styles/page.css";
import React from "react";
import Link from "next/link";
import Navbar from "./components/navbar";
import Hero from "./components/hero";
import TournamentCard from "./components/TournamentCard";
import Footer from "./components/footer";
import "./styles/animations.css";
import "./styles/leaderboard.css";
import "./styles/about.css";

export default function Home() {
  // Mock tournament data
  
  // State for animated counting
  const [playersCount, setPlayersCount] = React.useState(0);
  const [prizeCount, setPrizeCount] = React.useState(0);
  const [tournamentsCount, setTournamentsCount] = React.useState(0);
  
  // Counting animation effect
  React.useEffect(() => {
    const targetPlayers = 50000;
    const targetPrize = 500000;
    const targetTournaments = 1000;
    
    const playersInterval = setInterval(() => {
      setPlayersCount(prev => {
        const next = prev + Math.ceil((targetPlayers - prev) / 50);
        return next >= targetPlayers ? targetPlayers : next;
      });
    }, 30);
    
    const prizeInterval = setInterval(() => {
      setPrizeCount(prev => {
        const next = prev + Math.ceil((targetPrize - prev) / 50);
        return next >= targetPrize ? targetPrize : next;
      });
    }, 30);
    
    const tournamentsInterval = setInterval(() => {
      setTournamentsCount(prev => {
        const next = prev + Math.ceil((targetTournaments - prev) / 30);
        return next >= targetTournaments ? targetTournaments : next;
      });
    }, 30);
    
    return () => {
      clearInterval(playersInterval);
      clearInterval(prizeInterval);
      clearInterval(tournamentsInterval);
    };
  }, []);
  const tournaments = [
    {
      id: 1,
      name: "Kings Championship Season 1",
      game: "FIFA 24",
      prizePool: "$10,000",
      date: "Dec 15, 2024",
      status: "open",
      participants: 128
    },
    {
      id: 2,
      name: "Elite Warriors Tournament",
      game: "Call of Duty",
      prizePool: "$5,000",
      date: "Dec 20, 2024",
      status: "open",
      participants: 64
    },
    {
      id: 3,
      name: "Valorant Masters Cup",
      game: "Valorant",
      prizePool: "$7,500",
      date: "Dec 18, 2024",
      status: "ongoing",
      participants: 96
    }
  ];

  // Mock leaderboard data
  const topPlayers = [
    { rank: 1, username: "xXDragonSlayerXx", points: 2847, wins: 142 },
    { rank: 2, username: "ProGamer2024", points: 2756, wins: 138 },
    { rank: 3, username: "EliteSniper", points: 2698, wins: 129 },
    { rank: 4, username: "ChampionKing", points: 2634, wins: 125 },
    { rank: 5, username: "MasterPlayer", points: 2587, wins: 121 }
  ];

  return (
    <div>
      <Navbar />
      <Hero />

      {/* About Section */}
      <section className="about-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">About Kings Arena</h2>
            <p className="section-subtitle">
              Discover the ultimate competitive gaming platform
            </p>
          </div>

          <div className="about-content">
            <div className="about-text">
              <h3 className="about-title">Where Champions Are Made</h3>
              <p className="about-description">
                Kings Arena is the premier esports platform where competitive gamers from around the world 
                come together to compete, showcase their skills, and claim their throne. We host tournaments 
                across multiple games, providing players with the opportunity to earn recognition, prizes, and 
                the respect they deserve.
              </p>
              <div className="about-features">
                <div className="feature-item">
                  <span className="feature-icon">🏆</span>
                  <h4>Competitive Tournaments</h4>
                  <p>Regular tournaments with massive prize pools and professional organization</p>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">🌍</span>
                  <h4>Global Community</h4>
                  <p>Connect with players from every corner of the world</p>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">📊</span>
                  <h4>Ranking System</h4>
                  <p>Climb the leaderboards and prove your dominance</p>
                </div>
              </div>
            </div>
            <div className="about-stats">
              <div className="stat-card">
                <div className="stat-number">{playersCount.toLocaleString()}+</div>
                <div className="stat-label">Active Players</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">${(prizeCount / 1000).toFixed(0)}K+</div>
                <div className="stat-label">Prize Money</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">{tournamentsCount.toLocaleString()}+</div>
                <div className="stat-label">Tournaments</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">24/7</div>
                <div className="stat-label">Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tournaments Section */}
      <section className="featured-tournaments">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Featured Tournaments</h2>
            <p className="section-subtitle">
              Join the most competitive tournaments and compete for glory and prizes
            </p>
          </div>

          <div className="tournaments-grid">
            {tournaments.map((tournament) => (
              <TournamentCard
                key={tournament.id}
                id={tournament.id}
                name={tournament.name}
                game={tournament.game}
                prizePool={tournament.prizePool}
                date={tournament.date}
                status={tournament.status}
                participants={tournament.participants}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Leaderboard Preview Section */}
      <section className="leaderboard-preview">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Top Players</h2>
            <p className="section-subtitle">
              Meet the champions dominating the leaderboard this season
            </p>
          </div>

          <div className="leaderboard-grid">
            {topPlayers.map((player) => (
              <div key={player.rank} className="leaderboard-card">
                <div className="player-card-header">
                  <div className="rank-badge">
                    #{player.rank}
                  </div>
                  <div className="player-avatar">
                    👤
                  </div>
                </div>
                <div className="player-info">
                  <h3 className="player-username">{player.username}</h3>
                  <div className="player-stats">
                    <div className="stat-item">
                      <span className="stat-label">Points</span>
                      <span className="stat-value">{player.points}</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">Wins</span>
                      <span className="stat-value">{player.wins}</span>
                    </div>
                  </div>
                </div>
                <div className="player-card-footer">
                  <Link href={`/players/${player.username}`} className="view-profile-btn">
                    View Profile
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="leaderboard-footer">
            <Link href="/leaderboard" className="view-all-btn">
              View Full Leaderboard
            </Link>
          </div>
        </div>
      </section>

      </div>
  );
}