import React, { useState } from "react";
import "./ResetPassword.css";

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    alert(`Password reset successful for ${formData.email}`);
    setFormData({ email: "", newPassword: "", confirmPassword: "" });
  };

  return (
    <div className="reset-container">
      <div className="reset-box">
        <h1 className="reset-title">Reset Your Password</h1>
        <p className="reset-subtitle">
          Enter your email and new password to reset your account.
        </p>

        <form className="reset-form" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={formData.newPassword}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <button type="submit">Reset Password</button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
