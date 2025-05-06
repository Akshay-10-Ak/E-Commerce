import React, { useState, useEffect } from "react";
import "./productcard.css";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ name, price, image }) => {
  const [wishlisted, setWishlisted] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const wishlistItems = JSON.parse(localStorage.getItem("wishlist")) || [];
    const isWishlisted = wishlistItems.some((item) => item.name === name);
    setWishlisted(isWishlisted);
  }, [name]);

  const toggleWishlist = () => {
    let wishlistItems = JSON.parse(localStorage.getItem("wishlist")) || [];

    if (wishlisted) {
      // Remove from wishlist
      wishlistItems = wishlistItems.filter((item) => item.name !== name);
    } else {
      // Add to wishlist
      wishlistItems.push({ name, price, image });
    }

    localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
    setWishlisted(!wishlisted);
  };

  const handleBuy = () => {
    navigate("/buy", {
      state: { name, price, image },
    });
  };

  const handleAddToCart = () => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    cartItems.push({ name, price, image, quantity: 1 });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    setMessage(`🛒 ${name} added to cart!`);
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="product-card">
      <div className="wishlist-icon" onClick={toggleWishlist}>
        {wishlisted ? <FaHeart color="red" /> : <FaRegHeart />}
      </div>
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p>₹{price}</p>
      <div className="product-buttons">
        <button className="buy-btn" onClick={handleBuy}>Buy Now</button>
        <button className="cart-btn" onClick={handleAddToCart}>Add to Cart</button>
      </div>
      {message && <p className="cart-message">{message}</p>}
    </div>
  );
};

export default ProductCard;
