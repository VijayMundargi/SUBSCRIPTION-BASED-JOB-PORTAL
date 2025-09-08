import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch logged-in user
  const fetchUser = async () => {
    try {
      const { data } = await axios.get("http://localhost:4000/api/v1/me", {
        withCredentials: true,
      });
      setUser(data.user);
    } catch (err) {
      console.error(err);
      setUser(null);
      navigate("/login"); // redirect if not logged in
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:4000/api/v1/logout", {
        withCredentials: true,
      });
      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  if (!user) return <div className="loading">User not found.</div>;

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-header">
          <img
            src={user.avatar?.public_id || "https://via.placeholder.com/120"}
            alt={user.name}
            className="profile-img"
          />
          <h2>{user.name}</h2>
          <p className="profile-role">{user.role.toUpperCase()}</p>
        </div>

        <div className="profile-details">
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Phone:</strong> {user.number}
          </p>
          <p>
            <strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}
          </p>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
