import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleJobChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      jobProfile: { ...user.jobProfile, [name]: value },
    });
  };

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUser({ ...user, resume: file });
    }
  };

  const handleSave = async () => {
    try {
      // prepare formData for file + fields
      const formData = new FormData();
      formData.append("name", user.name);
      formData.append("email", user.email);
      formData.append("number", user.number);

      if (user.jobProfile) {
        formData.append("title", user.jobProfile.title || "");
        formData.append("company", user.jobProfile.company || "");
        formData.append("experience", user.jobProfile.experience || "");
        formData.append("skills", (user.jobProfile.skills || []).join(","));
      }

      if (user.resume) {
        formData.append("resume", user.resume);
      }

      await axios.put("http://localhost:4000/api/v1/me/update", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Profile updated successfully!");
      setEditing(false);
      fetchUser(); // reload data
    } catch (err) {
      console.error("Update failed", err);
      alert("Failed to update profile");
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
          <h2 className="profile-name">{user.name}</h2>
          <p className="profile-role">{user.role.toUpperCase()}</p>
        </div>

        {!editing ? (
          <>
            <div className="profile-details">
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Phone:</strong> {user.number}
              </p>
              <p>
                <strong>Joined:</strong>{" "}
                {new Date(user.createdAt).toLocaleDateString()}
              </p>

              {user.jobProfile && (
                <>
                  <p>
                    <strong>Title:</strong> {user.jobProfile.title}
                  </p>
                  <p>
                    <strong>Company:</strong> {user.jobProfile.company}
                  </p>
                  <p>
                    <strong>Experience:</strong>{" "}
                    {user.jobProfile.experience} years
                  </p>
                  <p>
                    <strong>Skills:</strong>{" "}
                    {user.jobProfile.skills?.join(", ")}
                  </p>
                </>
              )}
            </div>

            <div className="profile-actions">
              <button className="edit-btn" onClick={() => setEditing(true)}>
                Edit Profile
              </button>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </>
        ) : (
          <div className="edit-form">
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleChange}
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
              />
            </label>
            <label>
              Phone:
              <input
                type="text"
                name="number"
                value={user.number}
                onChange={handleChange}
              />
            </label>

            <h3>Job Profile</h3>
            <label>
              Title:
              <input
                type="text"
                name="title"
                value={user.jobProfile?.title || ""}
                onChange={handleJobChange}
              />
            </label>
            <label>
              Company:
              <input
                type="text"
                name="company"
                value={user.jobProfile?.company || ""}
                onChange={handleJobChange}
              />
            </label>
            <label>
              Experience (years):
              <input
                type="number"
                name="experience"
                value={user.jobProfile?.experience || ""}
                onChange={handleJobChange}
              />
            </label>
            <label>
              Skills (comma separated):
              <input
                type="text"
                name="skills"
                value={user.jobProfile?.skills?.join(", ") || ""}
                onChange={(e) =>
                  setUser({
                    ...user,
                    jobProfile: {
                      ...user.jobProfile,
                      skills: e.target.value.split(",").map((s) => s.trim()),
                    },
                  })
                }
              />
            </label>

            <label>
              Upload Resume:
              <input type="file" onChange={handleResumeUpload} />
            </label>

            <div className="profile-actions">
              <button className="save-btn" onClick={handleSave}>
                Save
              </button>
              <button className="cancel-btn" onClick={() => setEditing(false)}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
