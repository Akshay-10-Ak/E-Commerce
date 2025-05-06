import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHeart, FaShoppingCart, FaUser } from "react-icons/fa";
import "./navbar.css";
import logo from "../images/logo.jpg"; // Adjust path if needed

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const handleLoginClick = () => {
    navigate("/login");
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <Link to="/" className="logo" onClick={() => setMenuOpen(false)}>
        <img src={logo} alt="Viper Clothings Logo" className="logo-img" />
        Viper Clothings
      </Link>

      {/* Burger Icon */}
      <div className={`burger ${menuOpen ? "open" : ""}`} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Navigation Links */}
      <div className={`navbar-links ${menuOpen ? "active" : ""}`}>
        <Link to="/" onClick={toggleMenu}>Home</Link>
        <Link to="/category" onClick={toggleMenu}>Product</Link>
        <Link to="/about" onClick={toggleMenu}>About</Link>
        <Link to="/contact" onClick={toggleMenu}>Contact</Link>

        <Link to="/wishlist" onClick={toggleMenu}>
          <FaHeart className="icon" />
        </Link>
        <Link to="/cart" onClick={toggleMenu}>
          <FaShoppingCart className="icon" />
        </Link>
        <Link to="/loginpage" onClick={toggleMenu}>
          <FaUser className="icon" />
        </Link>

        <button className="login-btn" onClick={handleLoginClick}>
          Login
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
