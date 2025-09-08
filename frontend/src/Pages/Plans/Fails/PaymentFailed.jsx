import React from "react";
import { useNavigate } from "react-router-dom";
import "./PaymentFailed.css";

const PaymentFailed = () => {
  const navigate = useNavigate();

  const handleRetry = () => {
    navigate("/plan"); // Redirect to membership plans page
  };

  const handleGoHome = () => {
    navigate("/"); // Redirect to homepage
  };

  return (
    <div className="failed-container">
      <div className="failed-box">
        <div className="crossmark">✖</div>
        <h1 className="failed-title">Payment Failed!</h1>
        <p className="failed-text">
          Unfortunately, your transaction could not be completed. Please try again or contact support.
        </p>

        <div className="transaction-details">
          <p><strong>Transaction ID:</strong> #123456789</p>
          <p><strong>Amount:</strong> ₹7,990</p>
          <p><strong>Plan:</strong> Basic + Framer</p>
        </div>

        <div className="btn-group">
          <button className="retry-btn" onClick={handleRetry}>Retry Payment</button>
          <button className="home-btn" onClick={handleGoHome}>Go to Homepage</button>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailed;
