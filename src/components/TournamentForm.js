"use client";
import React from "react";

const TournamentForm = ({ formData, onChange, onSubmit, loading, errors }) => {
  const descriptionLength = formData.description.length;
  const maxDescriptionLength = 500;

  return (
    <form onSubmit={onSubmit} className="tournament-form">
      <div className="form-group">
        <label htmlFor="name">Tournament Name *</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={onChange}
          placeholder="Enter tournament name"
          className={`form-input ${errors.name ? "error" : ""}`}
        />
        {errors.name && <span className="error-message">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="description">Description *</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={onChange}
          placeholder="Enter tournament description"
          rows={4}
          className={`form-input form-textarea ${errors.description ? "error" : ""}`}
        />
        <div className="character-counter">
          {descriptionLength}/{maxDescriptionLength}
        </div>
        {errors.description && <span className="error-message">{errors.description}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="game">Game Name *</label>
        <input
          type="text"
          id="game"
          name="game"
          value={formData.game}
          onChange={onChange}
          placeholder="e.g., FIFA, Call of Duty, eFootball"
          className={`form-input ${errors.game ? "error" : ""}`}
        />
        {errors.game && <span className="error-message">{errors.game}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="image">Tournament Banner/Image URL</label>
        <input
          type="url"
          id="image"
          name="image"
          value={formData.image}
          onChange={onChange}
          placeholder="https://example.com/image.jpg"
          className="form-input"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="prize_pool">Prize Pool *</label>
          <input
            type="text"
            id="prize_pool"
            name="prize_pool"
            value={formData.prize_pool}
            onChange={onChange}
            placeholder="$10,000"
            className={`form-input ${errors.prize_pool ? "error" : ""}`}
          />
          {errors.prize_pool && <span className="error-message">{errors.prize_pool}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="max_players">Max Players *</label>
          <input
            type="number"
            id="max_players"
            name="max_players"
            value={formData.max_players}
            onChange={onChange}
            placeholder="64"
            min="2"
            className={`form-input ${errors.max_players ? "error" : ""}`}
          />
          {errors.max_players && <span className="error-message">{errors.max_players}</span>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="start_date">Start Date *</label>
          <input
            type="date"
            id="start_date"
            name="start_date"
            value={formData.start_date}
            onChange={onChange}
            className={`form-input ${errors.start_date ? "error" : ""}`}
          />
          {errors.start_date && <span className="error-message">{errors.start_date}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="registration_deadline">Registration Deadline *</label>
          <input
            type="date"
            id="registration_deadline"
            name="registration_deadline"
            value={formData.registration_deadline}
            onChange={onChange}
            className={`form-input ${errors.registration_deadline ? "error" : ""}`}
          />
          {errors.registration_deadline && <span className="error-message">{errors.registration_deadline}</span>}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="status">Status *</label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={onChange}
          className={`form-input ${errors.status ? "error" : ""}`}
        >
          <option value="upcoming">Upcoming</option>
          <option value="ongoing">Ongoing</option>
          <option value="completed">Completed</option>
          <option value="registration_open">Registration Open</option>
        </select>
        {errors.status && <span className="error-message">{errors.status}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="rules">Tournament Rules</label>
        <textarea
          id="rules"
          name="rules"
          value={formData.rules}
          onChange={onChange}
          placeholder="Enter tournament rules and regulations"
          rows={6}
          className="form-input form-textarea"
        />
      </div>

      <div className="form-actions">
        <button
          type="submit"
          disabled={loading}
          className="submit-button"
        >
          {loading ? "Creating Tournament..." : "Create Tournament"}
        </button>
      </div>
    </form>
  );
};

export default TournamentForm;
