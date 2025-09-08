import React from "react";
import { useNavigate } from "react-router-dom";
import "./PaymentSuccess.css";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/"); // Redirect to homepage
  };

  return (
    <div className="success-container">
      <div className="success-box">
        <div className="checkmark">✔</div>
        <h1 className="success-title">Payment Successful!</h1>
        <p className="success-text">
          Thank you for your payment. Your transaction has been completed
          successfully.
        </p>

        <div className="transaction-details">
          <p><strong>Transaction ID:</strong> #123456789</p>
          <p><strong>Amount Paid:</strong> ₹7,990</p>
          <p><strong>Plan:</strong> Basic + Framer</p>
        </div>

        <button className="home-btn" onClick={handleGoHome}>
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
