import React from "react";
import "./about.css";

const About = () => {
  return (
    <div className="about-head">
      <header className="about-header">
        <h1>About Us</h1>
      </header>
      <main>
        <section className="about-section">
          <h2>Our Story</h2>
          <p>
            Welcome to our e-commerce website. We are dedicated to providing
            high-quality products to our customers...
          </p>
        </section>
        <section className="team-section">
          <h2>Our Team</h2>
          <ul>
            <li>Abhishek Sahu - Founder</li>
            <li>Abhishek Sahu - CEO</li>
          </ul>
        </section>
      </main>
    </div>
  );
};

export default About;
