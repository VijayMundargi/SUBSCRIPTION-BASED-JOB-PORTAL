import React from "react";
import "./About.css";

const About = () => {
  const aboutImg = "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=800&q=80"; // Example CDN image

  return (
    <div className="about-container">
      <div className="about-content">
        <h1 className="about-title">About JobPortal</h1>
        <p className="about-subtitle">
          Connecting talent with opportunity.
        </p>
        <p className="about-text">
          JobPortal is your one-stop destination to explore thousands of career
          opportunities across industries. Our mission is to empower job
          seekers with the tools and information they need to achieve their
          professional dreams. We collaborate with top employers to provide a
          seamless job search experience, tailored career guidance, and the
          latest industry insights. Join JobPortal today and take the next step
          in your career journey.
        </p>
        <p className="about-text">
          Our platform is designed for simplicity, accessibility, and efficiency.
          Whether you're a fresh graduate or an experienced professional, we
          ensure that finding your dream job has never been easier.
        </p>
      </div>

      <div className="about-image">
        <img src={aboutImg} alt="About JobPortal" />
      </div>
    </div>
  );
};

export default About;
