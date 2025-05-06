import React from "react";
import "./footer.css";
import { FaFacebook, FaInstagram, FaTwitter, FaEnvelope, FaPhone } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-section about">
          <h3>ClothingStore</h3>
          <p>Explore our latest men's fashion trends and get the best quality products at affordable prices.</p>
        </div>

        <div className="footer-section links">
          <h4>Quick Links</h4>
          <div className="footer-links">
            <a href="/">Home</a>
            <a href="/category">Category</a>
            <a href="/wishlist">Wishlist</a>
            <a href="/cart">Cart</a>
            <a href="/contact">Contact</a>
          </div>
        </div>

        <div className="footer-section contact">
          <h4>Contact Us</h4>
          <p><FaEnvelope /> viper@clothingstore.com</p><br/>
          <p><FaPhone /> +91 98765 43210</p><br/>
          <div className="social-icons">
            <FaFacebook />
            <FaInstagram />
            <FaTwitter />
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} ClothingStore. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
