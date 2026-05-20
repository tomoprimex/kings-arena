"use client";
import { useState } from "react";
import Link from "next/link";
import "../styles/navbar.css";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          {/* Logo */}
          <Link href="/" className="navbar-logo">
            Kings <span>Arena</span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="navbar-links">
            <li>
              <Link href="/" className="navbar-link">Home</Link>
            </li>
            <li>
              <Link href="/tournaments" className="navbar-link">Tournaments</Link>
            </li>
            <li>
              <Link href="/players" className="navbar-link">Players</Link>
            </li>
            <li>
              <Link href="/leaderboard" className="navbar-link">Leaderboard</Link>
            </li>
            <li>
              <Link href="/profile" className="navbar-link">Profile</Link>
            </li>
            <li>
              <Link href="/news" className="navbar-link">News</Link>
            </li>
            <li>
              <Link href="/contact" className="navbar-link">Contact</Link>
            </li>
          </ul>

          {/* Login Button */}
          <Link href="/auth/login" className="navbar-login">
            Login
          </Link>

          {/* Mobile Menu Toggle */}
          <button 
            className="navbar-toggle"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`navbar-mobile ${isMobileMenuOpen ? 'active' : ''}`}>
          <ul className="navbar-mobile-links">
            <li>
              <Link href="/" className="navbar-mobile-link" onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/tournaments" className="navbar-mobile-link" onClick={closeMobileMenu}>
                Tournaments
              </Link>
            </li>
            <li>
              <Link href="/players" className="navbar-mobile-link" onClick={closeMobileMenu}>
                Players
              </Link>
            </li>
            <li>
              <Link href="/leaderboard" className="navbar-mobile-link" onClick={closeMobileMenu}>
                Leaderboard
              </Link>
            </li>
            <li>
              <Link href="/profile" className="navbar-mobile-link" onClick={closeMobileMenu}>
                Profile
              </Link>
            </li>
            <li>
              <Link href="/news" className="navbar-mobile-link" onClick={closeMobileMenu}>
                News
              </Link>
            </li>
            <li>
              <Link href="/contact" className="navbar-mobile-link" onClick={closeMobileMenu}>
                Contact
              </Link>
            </li>
            <li>
              <Link href="/auth/login" className="navbar-mobile-link" onClick={closeMobileMenu}>
                Login
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Spacer for fixed navbar */}
      <div style={{ height: '80px' }}></div>
    </>
  );
};

export default Navbar;