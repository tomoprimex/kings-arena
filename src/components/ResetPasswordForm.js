"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ResetPasswordForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const calculatePasswordStrength = (pwd) => {
    let strength = 0;
    if (pwd.length >= 8) strength += 1;
    if (pwd.length >= 12) strength += 1;
    if (/[a-z]/.test(pwd)) strength += 1;
    if (/[A-Z]/.test(pwd)) strength += 1;
    if (/[0-9]/.test(pwd)) strength += 1;
    if (/[^a-zA-Z0-9]/.test(pwd)) strength += 1;
    return strength;
  };

  const getPasswordStrengthLabel = (strength) => {
    if (strength <= 2) return "Weak";
    if (strength <= 4) return "Medium";
    return "Strong";
  };

  const passwordStrength = calculatePasswordStrength(password);

  const validateForm = () => {
    if (!password || password.length < 8) {
      setError("Password must be at least 8 characters");
      return false;
    }
    if (passwordStrength < 3) {
      setError("Password is too weak. Please add more complexity.");
      return false;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
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
      // await supabase.auth.updateUser({ password: password });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSuccess(true);
    } catch (err) {
      setError(err.message || "Failed to reset password. Please try again.");
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
          <h2 className="success-title">Password Reset!</h2>
          <p className="success-message">
            Your password has been successfully reset. You can now sign in with your new password.
          </p>
          <button
            className="auth-button"
            onClick={() => router.push("/auth/login")}
            aria-label="Sign in with new password"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-card">
      <div className="auth-header">
        <h1 className="auth-title">Reset Password</h1>
        <p className="auth-subtitle">
          Create a new secure password for your account
        </p>
      </div>

      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="password" className="form-label">New Password</label>
          <input
            id="password"
            type="password"
            className={`form-input ${error && !password ? "error" : ""}`}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            aria-label="New password"
            required
          />
          {password && (
            <div className="password-strength">
              <div className="strength-bar">
                <div
                  className={`strength-fill ${
                    passwordStrength <= 2 ? "weak" : passwordStrength <= 4 ? "medium" : "strong"
                  }`}
                ></div>
              </div>
              <div className="strength-text">
                Password strength: {getPasswordStrengthLabel(passwordStrength)}
              </div>
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword" className="form-label">Confirm New Password</label>
          <input
            id="confirmPassword"
            type="password"
            className={`form-input ${error && !confirmPassword ? "error" : ""}`}
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={loading}
            aria-label="Confirm new password"
            required
          />
        </div>

        {error && <div className="form-error">{error}</div>}

        <button
          type="submit"
          className={`auth-button ${loading ? "loading" : ""}`}
          disabled={loading}
          aria-label="Reset password"
        >
          {loading ? (
            <>
              <span className="button-spinner"></span>
              Resetting...
            </>
          ) : (
            "Reset Password"
          )}
        </button>
      </form>

      <div className="auth-toggle">
        Remember your password? <a href="/auth/login">Sign in</a>
      </div>
    </div>
  );
}
