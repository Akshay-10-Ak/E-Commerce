// import React from "react";
// import ProductCard from "../components/productcard";
// import trouser1 from "../images/trouser1.webp";
// import trouser2 from "../images/trouser2.webp";
// import trouser3 from "../images/trouser3.webp";
// import trouser4 from "../images/trouser4.webp";
// import trouser5 from "../images/trouser5.webp";
// import trouser6 from "../images/trouser6.webp";
// import trouser7 from "../images/trouser7.webp";
// import trouser8 from "../images/trouser8.webp";
// import trouser9 from "../images/trouser9.webp";
// import trouser10 from "../images/trouser10.webp";
// import trouser11 from "../images/trouser11.webp";
// import trouser12 from "../images/trouser12.webp";
// import trouser13 from "../images/trouser13.webp";
// import trouser14 from "../images/trouser14.webp";
// import trouser15 from "../images/trouser15.webp";
// import trouser16 from "../images/trouser16.webp";
// import trouser17 from "../images/trouser17.webp";
// import trouser18 from "../images/trouser18.webp";
// import "../components/productcard.css"; // for consistent styling

// const Trouser = () => {
//   const products = [
//     { name: "Formal Black Trouser", price: 899, image: trouser1 },
//     { name: "Loose Fit Beige Trouser", price: 999, image: trouser2 },
//     { name: "Chino Trouser", price: 799, image: trouser3 },
//     { name: "Beige Cotton Trouser", price: 699, image: trouser4 },
//     { name: "Classic Fit Navy Trouser", price: 1099, image: trouser5 },
//     { name: "Linen White Trouser", price: 1199, image: trouser6 },
//     { name: "Casual Parachute Baggy Trouser", price: 899, image: trouser7 },
//     { name: "Grey Slim Trouser", price: 799, image: trouser8 },
//     { name: "Tapered Grey Trouser", price: 999, image: trouser9 },
//     { name: "Baggy Trouser", price: 699, image: trouser10 },
//     { name: "Green Oversized Trouser", price: 799, image: trouser11 },
//     { name: "Grey Baggy Trouser", price: 899, image: trouser12 },
//     { name: "Cargo Black Trouser", price: 699, image: trouser13 },
//     { name: "Cargo Straight Baggy Trouser", price: 899, image: trouser14 },
//     { name: "White Baggy Trouser", price: 999, image: trouser15 },
//     { name: "Grey Baggy Trouser", price: 699, image: trouser16 },
//     { name: "Pure White Baggy Trouser", price: 1199, image: trouser17 },
//     { name: "Elastic Grey Waist Trouser", price: 999, image: trouser18 },
//   ];

//   return (
//     <div className="category-page">
//       <h2>Welcome to Trouser Collection</h2>
//       <div className="products-grid">
//         {products.map((item, index) => (
//           <ProductCard
//             key={index}
//             name={item.name}
//             price={item.price}
//             image={item.image}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Trouser;









import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import './shirt.css';
import './notification.css';

const Trouser = () => {
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

      const trouserProductIds = allProducts
        .filter(p => p.name && p.name.toLowerCase().includes('trouser'))
        .map(p => p._id);

      if (trouserProductIds.length === 0) {
        console.warn("No Trouser products found.");
        setNotification({ message: 'No Trouser products found', type: 'info' });
        setCategories([]);
        return;
      }

      const categoryRes = await axios.get('http://localhost:5000/api/categories');
      const filteredCategories = categoryRes.data.filter(cat =>
        cat.product && trouserProductIds.includes(cat.product._id)
      );

      setCategories(filteredCategories);
    } catch (err) {
      console.error('Error:', err);
      setNotification({ message: 'Failed to load trouser categories', type: 'error' });
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

  const isInWishlist = (product) => {
    return wishlistItems.some((item) => item.name === product.name);
  };

  const handleAddToWishlist = async (product) => {
    try {
      const isProductInWishlist = isInWishlist(product);

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

  return (
    <div className="shirts-container">
      <h2>Welcome to Trouser Collection</h2>

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

export default Trouser;
