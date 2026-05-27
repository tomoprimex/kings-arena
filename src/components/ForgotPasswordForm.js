"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const validateForm = () => {
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!validateForm()) return;

    setLoading(true);

    try {
      // TODO: Implement actual password reset logic with Supabase
      // await supabase.auth.resetPasswordForEmail(email);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSuccess(true);
    } catch (err) {
      setError(err.message || "Failed to send reset email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="auth-card">
        <div className="success-state">
          <div className="success-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <h2 className="success-title">Email Sent!</h2>
          <p className="success-message">
            We've sent a password reset link to <strong>{email}</strong>. 
            Please check your inbox and follow the instructions.
          </p>
          <button
            className="auth-button"
            onClick={() => router.push("/auth/login")}
            aria-label="Return to login"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-card">
      <div className="auth-header">
        <h1 className="auth-title">Forgot Password?</h1>
        <p className="auth-subtitle">
          Enter your email address and we'll send you a link to reset your password
        </p>
      </div>

      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            id="email"
            type="email"
            className={`form-input ${error && !email ? "error" : ""}`}
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            aria-label="Email address"
            required
          />
        </div>

        {error && <div className="form-error">{error}</div>}

        <button
          type="submit"
          className={`auth-button ${loading ? "loading" : ""}`}
          disabled={loading}
          aria-label="Send reset link"
        >
          {loading ? (
            <>
              <span className="button-spinner"></span>
              Sending...
            </>
          ) : (
            "Send Reset Link"
          )}
        </button>
      </form>

      <div className="auth-toggle">
        Remember your password? <a href="/auth/login">Sign in</a>
      </div>
    </div>
  );
}
