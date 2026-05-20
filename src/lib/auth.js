// Authentication utilities for Kings Arena

export const authConfig = {
  // Password requirements
  passwordMinLength: 8,
  passwordRequireUppercase: true,
  passwordRequireLowercase: true,
  passwordRequireNumbers: true,
  passwordRequireSpecialChars: false,
  
  // Session settings
  sessionTimeout: 24 * 60 * 60 * 1000, // 24 hours
  
  // Rate limiting
  maxLoginAttempts: 5,
  lockoutDuration: 15 * 60 * 1000, // 15 minutes
};

export const validatePassword = (password) => {
  const errors = [];
  
  if (password.length < authConfig.passwordMinLength) {
    errors.push(`Password must be at least ${authConfig.passwordMinLength} characters long`);
  }
  
  if (authConfig.passwordRequireUppercase && !/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter");
  }
  
  if (authConfig.passwordRequireLowercase && !/[a-z]/.test(password)) {
    errors.push("Password must contain at least one lowercase letter");
  }
  
  if (authConfig.passwordRequireNumbers && !/\d/.test(password)) {
    errors.push("Password must contain at least one number");
  }
  
  if (authConfig.passwordRequireSpecialChars && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push("Password must contain at least one special character");
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateUsername = (username) => {
  const errors = [];
  
  if (username.length < 3) {
    errors.push("Username must be at least 3 characters long");
  }
  
  if (username.length > 20) {
    errors.push("Username must be no more than 20 characters long");
  }
  
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    errors.push("Username can only contain letters, numbers, and underscores");
  }
  
  if (/^[0-9]/.test(username)) {
    errors.push("Username cannot start with a number");
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export const generateSecurePassword = () => {
  const length = authConfig.passwordMinLength;
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let password = "";
  
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  
  return password;
};

export const hashPassword = async (password) => {
  // This would typically use bcrypt or another secure hashing library
  // For now, we'll use a simple hash (NOT PRODUCTION READY)
  const encoder = new TextEncoder();
  const data = encoder.encode(password + "kings-arena-salt");
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

export const generateSessionToken = () => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

export const isAuthenticated = (user) => {
  return user && user.id && user.email;
};

export const hasRole = (user, role) => {
  return user && user.role === role;
};

export const isAdmin = (user) => {
  return hasRole(user, 'admin');
};

export const isModerator = (user) => {
  return hasRole(user, 'moderator') || isAdmin(user);
};

// Rate limiting utilities
const loginAttempts = new Map();

export const checkRateLimit = (identifier) => {
  const now = Date.now();
  const attempts = loginAttempts.get(identifier) || { count: 0, lastAttempt: 0 };
  
  // Reset if lockout period has passed
  if (now - attempts.lastAttempt > authConfig.lockoutDuration) {
    loginAttempts.set(identifier, { count: 0, lastAttempt: 0 });
    return { allowed: true };
  }
  
  // Check if max attempts reached
  if (attempts.count >= authConfig.maxLoginAttempts) {
    const remainingTime = authConfig.lockoutDuration - (now - attempts.lastAttempt);
    return { 
      allowed: false, 
      remainingTime: Math.ceil(remainingTime / 1000 / 60) // minutes
    };
  }
  
  return { allowed: true };
};

export const recordLoginAttempt = (identifier) => {
  const attempts = loginAttempts.get(identifier) || { count: 0, lastAttempt: 0 };
  loginAttempts.set(identifier, {
    count: attempts.count + 1,
    lastAttempt: Date.now()
  });
};

export const clearLoginAttempts = (identifier) => {
  loginAttempts.delete(identifier);
};
