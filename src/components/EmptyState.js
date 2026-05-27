"use client";
import React from "react";
import { Trophy } from "lucide-react";

const EmptyState = ({ message = "No tournaments available yet" }) => {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">
        <Trophy size={64} />
      </div>
      <h3 className="empty-state-title">{message}</h3>
      <p className="empty-state-description">
        Check back later or create your own tournament to get started
      </p>
      <button className="empty-state-button">Create Tournament</button>
    </div>
  );
};

export default EmptyState;
