"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import TournamentForm from "@/components/TournamentForm";
import TournamentPreview from "@/components/TournamentPreview";
import Toast from "@/components/Toast";
import { supabase } from "@/lib/supabaseClient";
import AuthGuard from "@/components/AuthGuard";
import "../../../styles/admin.css";

export default function CreateTournament() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    game: "",
    image: "",
    prize_pool: "",
    start_date: "",
    registration_deadline: "",
    max_players: "",
    status: "upcoming",
    rules: "",
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = "Tournament name is required";
    }

    if (!formData.description.trim()) {
      errors.description = "Description is required";
    } else if (formData.description.length > 500) {
      errors.description = "Description must be less than 500 characters";
    }

    if (!formData.game.trim()) {
      errors.game = "Game name is required";
    }

    if (!formData.prize_pool.trim()) {
      errors.prize_pool = "Prize pool is required";
    }

    if (!formData.start_date) {
      errors.start_date = "Start date is required";
    }

    if (!formData.registration_deadline) {
      errors.registration_deadline = "Registration deadline is required";
    } else if (formData.start_date && new Date(formData.registration_deadline) > new Date(formData.start_date)) {
      errors.registration_deadline = "Registration deadline must be before start date";
    }

    if (!formData.max_players) {
      errors.max_players = "Max players is required";
    } else if (parseInt(formData.max_players) < 2) {
      errors.max_players = "Max players must be at least 2";
    }

    if (!formData.status) {
      errors.status = "Status is required";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      setToast({
        type: "error",
        message: Object.values(errors)[0],
      });
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase
        .from("tournaments")
        .insert([
          {
            name: formData.name,
            description: formData.description,
            game: formData.game,
            image: formData.image || "/images/default-tournament.jpg",
            prize_pool: formData.prize_pool,
            start_date: formData.start_date,
            registration_deadline: formData.registration_deadline,
            max_players: parseInt(formData.max_players),
            status: formData.status,
            rules: formData.rules,
          },
        ])
        .select();

      if (error) throw error;

      setToast({
        type: "success",
        message: "Tournament created successfully!",
      });

      // Reset form
      setFormData({
        name: "",
        description: "",
        game: "",
        image: "",
        prize_pool: "",
        start_date: "",
        registration_deadline: "",
        max_players: "",
        status: "upcoming",
        rules: "",
      });

      // Redirect after 2 seconds
      setTimeout(() => {
        router.push("/dashboard/tournaments");
      }, 2000);
    } catch (error) {
      console.error("Error creating tournament:", error);
      setToast({
        type: "error",
        message: "Failed to create tournament. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthGuard>
      <div className="admin-page">
        <div className="admin-container">
          <div className="admin-header">
            <h1 className="admin-title">Create Tournament</h1>
            <p className="admin-subtitle">
              Create a new tournament for the platform
            </p>
          </div>

          <div className="admin-layout">
            <div className="admin-form-section">
              <TournamentForm
                formData={formData}
                onChange={handleChange}
                onSubmit={handleSubmit}
                loading={loading}
                errors={validateForm()}
              />
            </div>

            <div className="admin-preview-section">
              <div className="preview-header">
                <h2>Live Preview</h2>
              </div>
              <TournamentPreview tournament={formData} />
            </div>
          </div>
        </div>

        {toast && (
          <Toast
            type={toast.type}
            message={toast.message}
            onClose={() => setToast(null)}
          />
        )}
      </div>
    </AuthGuard>
  );
}
