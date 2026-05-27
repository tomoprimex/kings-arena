"use client";
import React from "react";

const LoadingSkeleton = () => {
  return (
    <div className="tournaments-grid">
      {[...Array(6)].map((_, index) => (
        <div key={index} className="tournament-card-skeleton">
          <div className="skeleton-image"></div>
          <div className="skeleton-content">
            <div className="skeleton-game"></div>
            <div className="skeleton-title"></div>
            <div className="skeleton-description"></div>
            <div className="skeleton-details">
              <div className="skeleton-detail"></div>
              <div className="skeleton-detail"></div>
              <div className="skeleton-detail"></div>
            </div>
            <div className="skeleton-actions">
              <div className="skeleton-button"></div>
              <div className="skeleton-button"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
