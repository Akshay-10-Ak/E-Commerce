import React from "react";
import "./about.css";

const About = () => {
  return (
    <div className="about-page">
      <div className="about-header">
        <h1>About Viper Clothings</h1>
        <p>Your ultimate destination for premium men's fashion</p>
      </div>

      <div className="about-content">
        <div className="about-section">
          <h2>Who We Are</h2>
          <p>
            Viper Clothings is a trend-forward men’s clothing brand dedicated to providing premium-quality, stylish, and affordable fashion wear. From casual t-shirts and jeans to elegant shirts and jackets, our collections are designed to bring out the confidence in every man.
          </p>
        </div>

        <div className="about-section">
          <h2>Our Mission</h2>
          <p>
            We aim to revolutionize men's fashion by offering clothing that blends comfort, style, and affordability. Whether you're dressing up for work or heading out for a night with friends, Viper Clothings has you covered.
          </p>
        </div>

        <div className="about-section">
          <h2>Why Choose Us?</h2>
          <ul>
            <li>✅ High-quality, durable fabrics</li>
            <li>✅ Trendy and timeless designs</li>
            <li>✅ Affordable prices</li>
            <li>✅ Fast shipping & reliable customer support</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
