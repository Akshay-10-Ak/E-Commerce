// import React from "react";
// import ProductCard from "../components/productcard";
// import "../components/productcard.css";

// import footwear1 from "../images/footwear1.jpg";
// import footwear2 from "../images/footwear2.jpeg";
// import footwear3 from "../images/footwear3.webp";
// import footwear4 from "../images/footwear4.webp";
// import footwear5 from "../images/footwear5.jpeg";
// import footwear6 from "../images/footwear6.webp";
// import footwear7 from "../images/footwear7.webp";
// import footwear8 from "../images/footwear8.webp";
// import footwear9 from "../images/footwear9.webp";
// import footwear10 from "../images/footwear10.webp";
// import footwear11 from "../images/footwear11.avif";
// import footwear12 from "../images/footwear12.avif";
// import footwear13 from "../images/footwear13.webp";
// import footwear14 from "../images/footwear14.webp";
// import footwear15 from "../images/footwear15.webp";
// import footwear16 from "../images/footwear16.webp";
// import footwear17 from "../images/footwear17.jpg";
// import footwear18 from "../images/footwear18.webp";

// const Footwear = () => {
//   const products = [
//     { name: "Black Casual Converse", price: 1499, image: footwear1 },
//     { name: "Casual Shoes", price: 1799, image: footwear2 },
//     { name: "Running Shoes", price: 2499, image: footwear3 },
//     { name: "Prada Loafers", price: 999, image: footwear4 },
//     { name: "Casual Sports Shoes", price: 1699, image: footwear5 },
//     { name: "Classic Brown Shoes", price: 2299, image: footwear6 },
//     { name: "Brown Derby Boots", price: 1899, image: footwear7 },
//     { name: "Black Boots", price: 1999, image: footwear8 },
//     { name: "Jordan Shoes", price: 1599, image: footwear9 },
//     { name: "Retro Sneakers", price: 2699, image: footwear10 },
//     { name: "High Top Sneakers", price: 1399, image: footwear11 },
//     { name: "Sandals", price: 2999, image: footwear12 },
//     { name: "Black Sandals", price: 1799, image: footwear13 },
//     { name: "Sports Sandals", price: 1899, image: footwear14 },
//     { name: "Flip-Flop", price: 1499, image: footwear15 },
//     { name: "Slip-On Loafers", price: 1999, image: footwear16 },
//     { name: "Clogs", price: 999, image: footwear17 },
//     { name: "Streetwear Clogs", price: 1899, image: footwear18 },
//   ];

//   return (
//     <div className="category-page">
//       <h2>Welcome to Footwear Collection</h2>
//       <div className="products-grid">
//         {products.map((product, index) => (
//           <ProductCard
//             key={index}
//             name={product.name}
//             price={product.price}
//             image={product.image}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Footwear;







import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import './shirt.css';
import './notification.css';

const Footwear = () => {
  const [categories, setCategories] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [notification, setNotification] = useState({ message: "", type: "" });
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
    fetchWishlist();
  }, []);

  const fetchCategories = async () => {
    try {
      const productRes = await axios.get('http://localhost:5000/api/products');
      const allProducts = productRes.data;

      const footwearProductIds = allProducts
        .filter(p =>
          p.name && p.name.toLowerCase().includes('footwear')
        )
        .map(p => p._id);

      if (footwearProductIds.length === 0) {
        console.warn("No Footwear products found.");
        setNotification({ message: 'No Footwear products found', type: 'info' });
        setCategories([]);
        return;
      }

      const categoryRes = await axios.get('http://localhost:5000/api/categories');
      const filteredCategories = categoryRes.data.filter(cat =>
        cat.product && footwearProductIds.includes(cat.product._id)
      );

      setCategories(filteredCategories);
    } catch (err) {
      console.error('Error:', err);
      setNotification({ message: 'Failed to load footwear categories', type: 'error' });
      setTimeout(() => setNotification({ message: '', type: '' }), 3000);
    }
  };

  const fetchWishlist = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/wishlist');
      setWishlistItems(res.data);
    } catch (err) {
      console.error('Error fetching wishlist:', err);
    }
  };

  const handleAddToWishlist = async (product) => {
    try {
      const isProductInWishlist = wishlistItems.some(item => item.name === product.name);

      if (isProductInWishlist) {
        const existingItem = wishlistItems.find(item => item.name === product.name);
        await axios.delete(`http://localhost:5000/api/wishlist/${existingItem._id}`);
        setWishlistItems(wishlistItems.filter(item => item.name !== product.name));
        setNotification({ message: `${product.name} removed from Wishlist`, type: 'success' });
      } else {
        const wishlistProduct = {
          name: product.name,
          price: product.price,
          image: product.image,
          description: product.description,
        };
        const res = await axios.post('http://localhost:5000/api/wishlist', wishlistProduct, {
          headers: { 'Content-Type': 'application/json' },
        });
        setWishlistItems((prev) => [...prev, res.data]);
        setNotification({ message: `${product.name} added to Wishlist`, type: 'success' });
      }

      setTimeout(() => setNotification({ message: '', type: '' }), 3000);
    } catch (err) {
      console.error('Wishlist Error:', err.response?.data || err.message);
      setNotification({ message: 'Failed to modify Wishlist', type: 'error' });
    }
  };

  const handleAddToCart = async (product) => {
    try {
      const cartProduct = {
        name: product.name,
        price: product.price,
        image: product.image,
        description: product.description,
        quantity: 1,
      };

      await axios.post('http://localhost:5000/api/cart', cartProduct, {
        headers: { 'Content-Type': 'application/json' },
      });

      setNotification({ message: `${product.name} added to Cart`, type: 'success' });
      setTimeout(() => setNotification({ message: '', type: '' }), 3000);
    } catch (err) {
      console.error(err);
      setNotification({ message: 'Failed to add to Cart', type: 'error' });
      setTimeout(() => setNotification({ message: '', type: '' }), 3000);
    }
  };

  const handleBuyNow = (product) => {
    setNotification({ message: `Redirecting to checkout for ${product.name}...`, type: 'info' });
    setTimeout(() => navigate('/buy', {
      state: {
        name: product.name,
        price: product.price,
        image: `http://localhost:5000/uploads/${product.image}`,
      }
    }), 1000);
  };

  const isInWishlist = (product) => {
    return wishlistItems.some((item) => item.name === product.name);
  };

  return (
    <div className="shirts-container">
      <h2>Welcome to Footwear Collection</h2>
      {notification.message && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}
      <div className="shirts-grid">
        {categories.length === 0 ? (
          <p>No products found</p>
        ) : (
          categories.map((cat) => (
            <div key={cat._id} className="shirt-card">
              <div
                className="wishlist-icon"
                onClick={() => handleAddToWishlist(cat)}
              >
                {isInWishlist(cat) ? (
                  <FaHeart color="red" />
                ) : (
                  <FaRegHeart />
                )}
              </div>

              {cat.image ? (
                <img
                  src={`http://localhost:5000/uploads/${cat.image}`}
                  alt={cat.name}
                  className="shirt-image"
                />
              ) : (
                <div className="no-image">No Image</div>
              )}
              <h3 className="shirt-name">{cat.name}</h3>
              <p className="shirt-price">₹{cat.price}</p>
              <p className="shirt-description">{cat.description.slice(0, 50)}...</p>
              <div className="shirt-buttons">
                <button className="cart-btn" onClick={() => handleAddToCart(cat)}>Add to Cart</button>
                <button className="buy-btn" onClick={() => handleBuyNow(cat)}>Buy Now</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Footwear;
