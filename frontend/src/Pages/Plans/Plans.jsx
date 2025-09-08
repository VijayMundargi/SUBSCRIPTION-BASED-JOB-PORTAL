import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./Plans.css"; // Import CSS

const Plans = () => {
  const navigate = useNavigate();

  const plans = [
    {
      id: "free",
      title: "Free",
      price: "₹0",
      desc: "Get started for free with limited features.",
      features: ["Limited access", "Community support"],
    },
    {
      id: "basic",
      title: "Basic",
      price: "₹1,229/m",
      desc: "Affordable plan for individuals.",
      features: ["One request", "Cancel anytime", "Email support"],
    },
    {
      id: "premium",
      title: "Premium",
      price: "₹2,499/m",
      desc: "Full access with premium features.",
      features: [
        "Unlimited requests",
        "Priority support",
        "Access to premium tools",
      ],
    },
  ];

  const handleStart = async (planId) => {
    try {
      const res = await fetch("http://localhost:4000/api/v1/subscription", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: planId }),
      });

      const data = await res.json();
      if (!data.success) {
        alert(data.message || "Failed to create order");
        return;
      }

      // Free plan → skip Razorpay
      if (planId === "free") {
        alert(" Free plan activated! Redirecting to dashboard...");
        navigate("admin/dashboard");
        return;
      }

      const { order } = data;

      const options = {
        key: "rzp_test_AIEfgCrKyUEdo8", // test key
        amount: order.amount,
        currency: order.currency,
        name: "My App",
        description: `Payment for ${planId} plan`,
        order_id: order.id,
        handler: async function (response) {
          const verifyRes = await fetch(
            "http://localhost:4000/api/v1/payment/verify",
            {
              method: "POST",
              credentials: "include",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                plan: planId,
              }),
            }
          );

          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            alert(" Payment successful! Subscription activated.");
            navigate("/admin/dashboard");
          } else {
            alert("❌ Payment verification failed!");
          }
        },
        theme: { color: "#fbbf24" },

        //  Enable all payment methods
        method: {
          upi: true,
          card: true,
          netbanking: true,
          wallet: true,
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="pricing-container">
      <h1 className="main-title">Membership Plans</h1>
      <p className="subtitle">Choose a plan that's right for you</p>

      <div className="plans">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.id}
            className="plan-card"
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <h3>{plan.title}</h3>
            <h2>{plan.price}</h2>
            <p>{plan.desc}</p>
            <ul>
              {plan.features.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
            <button onClick={() => handleStart(plan.id)}>
              {plan.id === "free" ? "Start Free" : "Get Started"}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Plans;
