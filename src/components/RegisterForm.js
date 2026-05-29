"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { signUp } = useAuth();
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
    if (!fullName || fullName.length < 2) {
      setError("Please enter your full name");
      return false;
    }
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address");
      return false;
    }
    if (!password || password.length < 8) {
      setError("Password must be at least 8 characters");
      return false;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    if (!agreeTerms) {
      setError("Please agree to the terms and conditions");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    setLoading(true);

    try {
      await signUp(fullName, email, password);
      router.push("/dashboard");
    } catch (err) {
      setError(err.message || "Failed to create account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    // TODO: Implement social login
    console.log(`Social login with ${provider}`);
  };

  return (
    <div className="auth-card">
      <div className="auth-header">
        <h1 className="auth-title">Create Account</h1>
        <p className="auth-subtitle">Join Kings Arena and start competing</p>
      </div>

      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fullName" className="form-label">Full Name</label>
          <input
            id="fullName"
            type="text"
            className={`form-input ${error && !fullName ? "error" : ""}`}
            placeholder="John Doe"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            disabled={loading}
            aria-label="Full name"
            required
          />
        </div>

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

        <div className="form-group">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            id="password"
            type="password"
            className={`form-input ${error && !password ? "error" : ""}`}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            aria-label="Password"
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
          <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            className={`form-input ${error && !confirmPassword ? "error" : ""}`}
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={loading}
            aria-label="Confirm password"
            required
          />
        </div>

        {error && <div className="form-error">{error}</div>}

        <label className="checkbox-group">
          <input
            type="checkbox"
            className="checkbox-input"
            checked={agreeTerms}
            onChange={(e) => setAgreeTerms(e.target.checked)}
            disabled={loading}
          />
          <span className="checkbox-label">
            I agree to the <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a>
          </span>
        </label>

        <button
          type="submit"
          className={`auth-button ${loading ? "loading" : ""}`}
          disabled={loading}
          aria-label="Create account"
        >
          {loading ? (
            <>
              <span className="button-spinner"></span>
              Creating account...
            </>
          ) : (
            "Create Account"
          )}
        </button>
      </form>

      <div className="social-divider">
        <span>or continue with</span>
      </div>

      <div className="social-login">
        <button
          type="button"
          className="social-button"
          onClick={() => handleSocialLogin("google")}
          aria-label="Sign up with Google"
        >
          <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Google
        </button>
        <button
          type="button"
          className="social-button"
          onClick={() => handleSocialLogin("github")}
          aria-label="Sign up with GitHub"
        >
          <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          GitHub
        </button>
      </div>

      <div className="auth-toggle">
        Already have an account? <a href="/auth/login">Sign in</a>
      </div>
    </div>
  );
}
