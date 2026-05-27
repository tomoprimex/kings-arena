"use client";
import React from "react";
import { Trophy, Calendar, Users, Gamepad2, ArrowRight } from "lucide-react";

const TournamentCard = ({ tournament, onJoin }) => {
  const {
    id,
    name,
    description,
    game,
    image,
    prize_pool,
    start_date,
    registration_deadline,
    max_players,
    status,
  } = tournament;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "ongoing":
        return "text-green-400";
      case "upcoming":
        return "text-blue-400";
      case "completed":
        return "text-gray-400";
      case "registration_open":
        return "text-yellow-400";
      default:
        return "text-gray-400";
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "ongoing":
        return "Ongoing";
      case "upcoming":
        return "Upcoming";
      case "completed":
        return "Completed";
      case "registration_open":
        return "Registration Open";
      default:
        return status;
    }
  };

  const isRegistrationOpen = status === "registration_open" || status === "upcoming";

  return (
    <div className="tournament-card">
      <div className="tournament-card-image">
        <img
          src={image || "/images/default-tournament.jpg"}
          alt={name}
          className="tournament-banner"
        />
        <div className={`tournament-status-badge ${getStatusColor(status)}`}>
          {getStatusLabel(status)}
        </div>
      </div>

      <div className="tournament-card-content">
        <div className="tournament-game">
          <Gamepad2 size={16} />
          <span>{game}</span>
        </div>

        <h3 className="tournament-name">{name}</h3>
        <p className="tournament-description">{description}</p>

        <div className="tournament-details">
          <div className="detail-item">
            <Trophy size={16} />
            <span>Prize Pool: {prize_pool}</span>
          </div>
          <div className="detail-item">
            <Calendar size={16} />
            <span>Starts: {formatDate(start_date)}</span>
          </div>
          <div className="detail-item">
            <Users size={16} />
            <span>Max Players: {max_players}</span>
          </div>
        </div>

        {isRegistrationOpen && registration_deadline && (
          <div className="registration-deadline">
            <span>Registration closes: {formatDate(registration_deadline)}</span>
          </div>
        )}

        <div className="tournament-card-actions">
          <button className="tournament-view-btn">
            View Details
            <ArrowRight size={16} />
          </button>
          {isRegistrationOpen && (
            <button className="tournament-join-btn" onClick={() => onJoin?.(id)}>
              Join Tournament
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TournamentCard;
