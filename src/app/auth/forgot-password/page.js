"use client";
import React, { useState } from "react";
import Link from "next/link";
import "../../styles/auth.css";
import { supabase } from "../../../lib/supabase";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      if (error) throw error;

      setSuccess(true);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="wrapper">
        <div className="form-box login">
          <h2>Reset Password</h2>
          {!success ? (
            <form onSubmit={handleResetPassword}>
              <div className="input-box">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label>Email</label>
              </div>
              {error && <p className="error-message">{error}</p>}
              <button type="submit" className="btn" disabled={loading}>
                {loading ? "Sending..." : "Send Reset Link"}
              </button>
              <div className="logreg-link">
                <p>
                  Remember your password?{" "}
                  <Link href="/auth/login">Sign In</Link>
                </p>
                <p>
                  Don't have an account?{" "}
                  <Link href="/auth/signup">Sign Up</Link>
                </p>
              </div>
            </form>
          ) : (
            <div className="success-message">
              <p>Password reset link has been sent to your email!</p>
              <div className="logreg-link">
                <p>
                  <Link href="/auth/login">Back to Sign In</Link>
                </p>
              </div>
            </div>
          )}
        </div>
        <div className="info-text login">
          <h2>Recover Access</h2>
          <p>Enter your email address and we'll send you a link to reset your password.</p>
        </div>
        <div className="bg-animate"></div>
        <div className="bg-animate2"></div>
      </div>
    </div>
  );
}
