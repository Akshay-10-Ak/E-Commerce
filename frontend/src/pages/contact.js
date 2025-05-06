import React from "react";
import "./contact.css";

const Contact = () => {
  return (
    <div className="contact-page">
      <h2>Contact Us</h2>
      <p>Have questions or need help? Reach out to us!</p>

      <div className="contact-container">
        <form className="contact-form">
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" rows="5" required></textarea>
          <button type="submit">Send Message</button>
        </form>

        <div className="contact-info">
          <h3>Customer Support</h3>
          <p>Email: support@viperclothings.com</p>
          <p>Phone: +91 98765 43210</p>
          <p>Address: Viper Clothings, Fashion Street, Palakkad, Kerala</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
