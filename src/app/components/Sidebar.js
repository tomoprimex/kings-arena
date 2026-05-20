"use client";
import React, { useState } from "react";
import Link from "next/link";
import "../styles/sidebar.css";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button className="sidebarToggle" onClick={toggleSidebar}>
        ☰
      </button>
      
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebarHeader">
          <h3>Kings Arena</h3>
          <button className="closeSidebar" onClick={toggleSidebar}>
            ×
          </button>
        </div>
        
        <nav className="sidebarNav">
          <Link href="/" onClick={toggleSidebar}>Home</Link>
          <Link href="/tournaments" onClick={toggleSidebar}>Tournaments</Link>
          <Link href="/players" onClick={toggleSidebar}>Players</Link>
          <Link href="/leaderboard" onClick={toggleSidebar}>Leaderboard</Link>
          <Link href="/news" onClick={toggleSidebar}>News</Link>
          <Link href="/dashboard" onClick={toggleSidebar}>Dashboard</Link>
          <Link href="/contact" onClick={toggleSidebar}>Contact</Link>
        </nav>
        
        <div className="sidebarFooter">
          <Link href="/auth/login" className="loginBtn">Sign In</Link>
          <Link href="/auth/signup" className="signupBtn">Sign Up</Link>
        </div>
      </div>
      
      {isOpen && (
        <div className="sidebarOverlay" onClick={toggleSidebar}></div>
      )}
    </>
  );
}
