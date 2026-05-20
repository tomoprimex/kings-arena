"use client";
import React from "react";
import Link from "next/link";
import "../styles/hero.css";

export default function Hero() {
  return (
    <section className="hero">
      {/* Animated Background Elements */}
      <div className="hero-visual">
        <div className="hero-grid"></div>
        <div className="hero-glow"></div>
      </div>

      {/* Hero Content */}
      <div className="hero-content">
        <h1 className="hero-title">
          Enter The Ultimate Gaming Arena
        </h1>
        <p className="hero-subtitle">
          Experience the pinnacle of competitive gaming. Join tournaments, 
          compete with the best players, and claim your throne in the most 
          prestigious esports platform.
        </p>
        <div className="hero-buttons">
          <Link href="/tournaments" className="hero-cta">
            Join Tournament
          </Link>
          <Link href="/players" className="hero-cta-secondary">
            Explore Players
          </Link>
        </div>
      </div>
    </section>
  );
}
