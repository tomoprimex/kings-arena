"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Users, Trophy, ChevronDown, Settings, LogOut, User, X, Menu } from "lucide-react";
import "../styles/navbar.css";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  const closeUserDropdown = () => {
    setIsUserDropdownOpen(false);
  };

  const handleLogout = async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);
    const { error } = await signOut();

    if (!error) {
      router.push('/');
    }

    setIsLoggingOut(false);
  };

  // Handle scroll effect for sticky navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isUserDropdownOpen && !event.target.closest('.user-dropdown-container')) {
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isUserDropdownOpen]);

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="navbar-container">
          {/* Logo */}
          <Link href="/" className="navbar-logo">
            <img src="/images/logo.png" alt="Kings Arena" className="navbar-logo-image" />
          </Link>

          {/* Desktop Navigation */}
          <ul className="navbar-links">
            <li>
              <Link href="/" className={`navbar-link ${pathname === '/' ? 'active' : ''}`}>Home</Link>
            </li>
            <li>
              <Link href="/tournaments" className={`navbar-link ${pathname === '/tournaments' ? 'active' : ''}`}>Tournaments</Link>
            </li>
            <li>
              <Link href="/leaderboard" className={`navbar-link ${pathname === '/leaderboard' ? 'active' : ''}`}>Leaderboard</Link>
            </li>
            <li>
              <Link href="/contact" className={`navbar-link ${pathname === '/contact' ? 'active' : ''}`}>Community</Link>
            </li>
          </ul>

          {/* Auth Section */}
          {loading ? (
            <div className="navbar-auth-loading">Loading...</div>
          ) : user ? (
            <div className="user-dropdown-container">
              <button
                className="user-menu-button"
                onClick={toggleUserDropdown}
              >
                <div className="user-avatar">
                  <img
                    src={user.user_metadata?.avatar_url || "/images/banner.jfif"}
                    alt="User avatar"
                  />
                </div>
                <div className="user-greeting">
                  Hi, {user.user_metadata?.username || user.email?.split('@')[0]} 👋
                </div>
                <ChevronDown
                  size={16}
                  className={`dropdown-arrow ${isUserDropdownOpen ? 'open' : ''}`}
                />
              </button>

              <AnimatePresence>
                {isUserDropdownOpen && (
                  <motion.div
                    className="user-dropdown-menu"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link href="/profile" className="dropdown-item" onClick={closeUserDropdown}>
                      <User size={18} />
                      Profile
                    </Link>
                    <Link href="/dashboard/tournaments" className="dropdown-item" onClick={closeUserDropdown}>
                      <Trophy size={18} />
                      My Tournaments
                    </Link>
                    <Link href="/dashboard/settings" className="dropdown-item" onClick={closeUserDropdown}>
                      <Settings size={18} />
                      Settings
                    </Link>
                    <div className="dropdown-divider"></div>
                    <button className="dropdown-item dropdown-logout" onClick={handleLogout}>
                      <LogOut size={18} />
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="navbar-auth-buttons">
              <Link href="/auth/login" className="navbar-signin-btn">
                Sign In
              </Link>
              <Link href="/auth/signup" className="navbar-signup-btn">
                Sign Up
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <motion.button
            className="navbar-toggle"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Menu size={24} />
          </motion.button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="navbar-overlay"
              onClick={closeMobileMenu}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            ></motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="navbar-mobile"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              <div className="mobile-menu-header">
                <Link href="/" className="navbar-logo" onClick={closeMobileMenu}>
                  <img src="/images/logo.png" alt="Kings Arena" className="navbar-logo-image" />
                </Link>
                <motion.button
                  className="mobile-close-btn"
                  onClick={closeMobileMenu}
                  aria-label="Close menu"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="close-icon">×</span>
                </motion.button>
              </div>
              
              <ul className="navbar-mobile-links">
                {[
                  { href: "/", icon: <Home size={20} />, label: "Home" },
                  { href: "/tournaments", icon: <Trophy size={20} />, label: "Tournaments" },
                  { href: "/leaderboard", icon: <Users size={20} />, label: "Leaderboard" },
                  { href: "/contact", icon: <X size={20} />, label: "Community" }
                ].map((item, index) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link href={item.href} className="navbar-mobile-link" onClick={closeMobileMenu}>
                      <span className="link-icon">{item.icon}</span>
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                className="mobile-menu-footer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {loading ? (
                  <div className="mobile-auth-loading">Loading...</div>
                ) : user ? (
                  <>
                    <div className="mobile-user-section">
                      <div className="mobile-user-avatar">
                        <img
                          src={user.user_metadata?.avatar_url || "/images/default-avatar.jpg"}
                          alt="User avatar"
                        />
                      </div>
                      <div className="mobile-user-info">
                        <div className="mobile-user-name">
                          {user.user_metadata?.username || user.email?.split('@')[0]}
                        </div>
                        <div className="mobile-user-greeting">Welcome back!</div>
                      </div>
                    </div>
                    <div className="mobile-user-menu">
                      <Link href="/profile" className="mobile-user-link" onClick={closeMobileMenu}>
                        <User size={18} />
                        Profile
                      </Link>
                      <Link href="/dashboard/tournaments" className="mobile-user-link" onClick={closeMobileMenu}>
                        <Trophy size={18} />
                        My Tournaments
                      </Link>
                      <Link href="/dashboard/settings" className="mobile-user-link" onClick={closeMobileMenu}>
                        <Settings size={18} />
                        Settings
                      </Link>
                      <button
                        className="mobile-logout-btn"
                        onClick={() => {
                          handleLogout();
                          closeMobileMenu();
                        }}
                        disabled={isLoggingOut}
                      >
                        <LogOut size={18} />
                        {isLoggingOut ? 'Logging out...' : 'Logout'}
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="mobile-auth-buttons">
                    <Link href="/auth/login" className="mobile-signin-btn" onClick={closeMobileMenu}>
                      Sign In
                    </Link>
                    <Link href="/auth/signup" className="mobile-signup-btn" onClick={closeMobileMenu}>
                      Sign Up
                    </Link>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Spacer for fixed navbar */}
      <div className="navbar-spacer"></div>
    </>
  );
};

export default Navbar;