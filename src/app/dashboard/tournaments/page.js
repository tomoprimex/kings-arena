"use client";
import React, { useState, useEffect } from "react";
import TournamentCard from "@/components/TournamentCard";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import EmptyState from "@/components/EmptyState";
import { supabase } from "@/lib/supabaseClient";
import { Search } from "lucide-react";
import "../../styles/tournaments.css";
import AuthGuard from "@/components/AuthGuard";

export default function MyTournaments() {
  const [tournaments, setTournaments] = useState([]);
  const [filteredTournaments, setFilteredTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchTournaments();
  }, []);

  useEffect(() => {
    filterTournaments();
  }, [tournaments, activeFilter, searchQuery]);

  const fetchTournaments = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('tournaments')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setTournaments(data || []);
    } catch (error) {
      console.error('Error fetching tournaments:', error);
      setError('Failed to load tournaments. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const filterTournaments = () => {
    let filtered = [...tournaments];

    // Apply status filter
    if (activeFilter !== "all") {
      filtered = filtered.filter(tournament => {
        const status = tournament.status?.toLowerCase();
        return status === activeFilter;
      });
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(tournament =>
        tournament.name?.toLowerCase().includes(query) ||
        tournament.game?.toLowerCase().includes(query) ||
        tournament.description?.toLowerCase().includes(query)
      );
    }

    setFilteredTournaments(filtered);
  };

  const handleJoinTournament = (tournamentId) => {
    // TODO: Implement tournament join logic
    console.log('Join tournament:', tournamentId);
  };

  if (loading) {
    return (
      <AuthGuard>
        <div className="tournaments-page">
          <div className="tournaments-container">
            <LoadingSkeleton />
          </div>
        </div>
      </AuthGuard>
    );
  }

  if (error) {
    return (
      <AuthGuard>
        <div className="tournaments-page">
          <div className="tournaments-container">
            <EmptyState message={error} />
          </div>
        </div>
      </AuthGuard>
    );
  }

  return (
    <AuthGuard>
      <div className="tournaments-page">
        <div className="tournaments-container">
          <div className="tournaments-header">
            <h1 className="tournaments-title">Tournaments</h1>
            <p className="tournaments-subtitle">
              Browse and join competitive gaming tournaments
            </p>
          </div>

          <div className="tournaments-controls">
            <div className="filter-tabs">
              <button
                className={`filter-tab ${activeFilter === "all" ? "active" : ""}`}
                onClick={() => setActiveFilter("all")}
              >
                All ({tournaments.length})
              </button>
              <button
                className={`filter-tab ${activeFilter === "ongoing" ? "active" : ""}`}
                onClick={() => setActiveFilter("ongoing")}
              >
                Ongoing
              </button>
              <button
                className={`filter-tab ${activeFilter === "upcoming" ? "active" : ""}`}
                onClick={() => setActiveFilter("upcoming")}
              >
                Upcoming
              </button>
              <button
                className={`filter-tab ${activeFilter === "completed" ? "active" : ""}`}
                onClick={() => setActiveFilter("completed")}
              >
                Completed
              </button>
            </div>

            <div className="search-bar">
              <Search size={18} />
              <input
                type="text"
                placeholder="Search tournaments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
          </div>

          {filteredTournaments.length > 0 ? (
            <div className="tournaments-grid">
              {filteredTournaments.map((tournament) => (
                <TournamentCard
                  key={tournament.id}
                  tournament={tournament}
                  onJoin={handleJoinTournament}
                />
              ))}
            </div>
          ) : (
            <EmptyState message="No tournaments found matching your criteria" />
          )}
        </div>
      </div>
    </AuthGuard>
  );
}
