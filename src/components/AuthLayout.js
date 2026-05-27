"use client";

import { useEffect } from "react";

export default function AuthLayout({ children }) {
  useEffect(() => {
    // Create gold particles dynamically
    const createParticles = () => {
      const background = document.querySelector('.auth-background');
      if (!background) return;

      for (let i = 0; i < 10; i++) {
        const particle = document.createElement('div');
        particle.className = 'gold-particle';
        background.appendChild(particle);
      }
    };

    createParticles();

    return () => {
      // Cleanup particles on unmount
      const background = document.querySelector('.auth-background');
      if (background) {
        background.innerHTML = '';
      }
    };
  }, []);

  return (
    <div className="auth-layout">
      <div className="auth-background"></div>
      {children}
    </div>
  );
}
