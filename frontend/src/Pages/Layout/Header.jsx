import React, { useState, useEffect } from "react";
import "./Header.css";
import { RiMenu5Fill, RiCloseLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check if user has valid token and fetch user data
  const fetchUser = async () => {
    try {
      // Check if token exists in localStorage/cookies first (optional optimization)
      const token = localStorage.getItem('token'); // if you store token in localStorage
      
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/me",
        { 
          withCredentials: true,
          headers: token ? { Authorization: `Bearer ${token}` } : {}
        }
      );
      
      if (data.success && data.user) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (err) {
      console.log("User not authenticated:", err.response?.status);
      setUser(null);
      // Clear any invalid tokens
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
    
    // Listen for storage changes (in case user logs out in another tab)
    const handleStorageChange = (e) => {
      if (e.key === 'token' && !e.newValue) {
        setUser(null);
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:4000/api/v1/logout", {
        withCredentials: true,
      });
      
      // Clear user data and token
      setUser(null);
      setShowDropdown(false);
      localStorage.removeItem('token'); // Clear token if stored locally
      
      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
      // Even if logout API fails, clear local data
      setUser(null);
      localStorage.removeItem('token');
      navigate("/login");
    }
  };

  const handleProfile = () => {
    setShowDropdown(false);
    navigate("/profile");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showDropdown && !event.target.closest('.profile-container')) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showDropdown]);

  return (
    <header className="header">
      <div className="logo">JobPortal</div>

      <nav className={`nav-links ${isOpen ? "open" : ""}`}>
        <a href="/">Home</a>
        <a href="/jobs">Jobs</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
      </nav>

      <div className="header-actions">
        {loading ? (
          // Show loading spinner or placeholder while checking auth
          <div className="auth-loading">Loading...</div>
        ) : user ? (
          // ✅ User is logged in: show profile
          <div className="profile-container">
            {user.avatar?.url || user.avatar?.public_id || user.profilePicture ? (
              <img
                src={user.avatar?.url || user.avatar?.public_id || user.profilePicture}
                alt={`${user.name || 'User'}'s Profile`}
                className="profile-img"
                onClick={toggleDropdown}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextElementSibling.style.display = 'flex';
                }}
              />
            ) : null}
            <div 
              className={`profile-initial ${!user.avatar?.url && !user.avatar?.public_id && !user.profilePicture ? 'visible' : 'hidden'}`}
              onClick={toggleDropdown}
            >
              {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
            {showDropdown && (
              <div className="dropdown">
                <div className="dropdown-header">
                  <p className="user-name">{user.name || 'User'}</p>
                  <p className="user-email">{user.email}</p>
                </div>
                <div className="dropdown-actions">
                  <button onClick={handleProfile} className="dropdown-btn">
                    Profile
                  </button>
                  <button onClick={handleLogout} className="dropdown-btn logout-btn">
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          // ✅ User is not logged in: show Register/Login buttons
          <div className="auth-buttons">
            <a href="/register" className="auth-btn register-btn">
              Register
            </a>
            <a href="/login" className="auth-btn login-btn">
              Login
            </a>
          </div>
        )}

        <button className="menu-btn" onClick={toggleMenu}>
          {isOpen ? <RiCloseLine size={24} /> : <RiMenu5Fill size={24} />}
        </button>
      </div>
    </header>
  );
};

export default Header;