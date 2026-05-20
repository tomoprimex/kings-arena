"use client";
import React from "react";
import Link from "next/link";
import "../styles/footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand Section */}
        <div className="footer-brand">
          <Link href="/" className="footer-logo">
            Kings <span>Arena</span>
          </Link>
          <p className="footer-tagline">
            The ultimate competitive gaming platform where champions are made and legends are born.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-links">
          <h3>Quick Links</h3>
          <div className="footer-links-list">
            <Link href="/" className="footer-link">Home</Link>
            <Link href="/tournaments" className="footer-link">Tournaments</Link>
            <Link href="/players" className="footer-link">Players</Link>
            <Link href="/leaderboard" className="footer-link">Leaderboard</Link>
          </div>
        </div>

        {/* Games */}
        <div className="footer-games">
          <h3>Games</h3>
          <div className="footer-games-list">
            <Link href="/games/fifa" className="footer-game">
              <span className="footer-game-icon">⚽</span>
              FIFA
            </Link>
            <Link href="/games/cod" className="footer-game">
              <span className="footer-game-icon">🔫</span>
              Call of Duty
            </Link>
            <Link href="/games/valorant" className="footer-game">
              <span className="footer-game-icon">🎯</span>
              Valorant
            </Link>
          </div>
        </div>

        {/* Community */}
        <div className="footer-community">
          <h3>Community</h3>
          <div className="footer-social-links">
            <a href="#" className="footer-social-link">
              <span className="footer-social-icon">📘</span>
              Facebook
            </a>
            <a href="#" className="footer-social-link">
              <span className="footer-social-icon">🐦</span>
              Twitter
            </a>
            <a href="#" className="footer-social-link">
              <span className="footer-social-icon">📺</span>
              YouTube
            </a>
            <a href="#" className="footer-social-link">
              <span className="footer-social-icon">💬</span>
              Discord
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p className="footer-copyright">
          © 2024 Kings Arena. All rights reserved.
        </p>
        <div className="footer-bottom-links">
          <Link href="/privacy" className="footer-bottom-link">Privacy Policy</Link>
          <Link href="/terms" className="footer-bottom-link">Terms of Service</Link>
          <Link href="/contact" className="footer-bottom-link">Contact</Link>
        </div>
      </div>
    </footer>
  );
}