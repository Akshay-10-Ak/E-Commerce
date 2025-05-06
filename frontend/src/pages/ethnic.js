// import React from "react";
// import ProductCard from "../components/productcard";
// import "../components/productcard.css";

// import ethnic1 from "../images/ethnic1.webp";
// import ethnic2 from "../images/ethnic2.webp";
// import ethnic3 from "../images/ethnic3.webp";
// import ethnic4 from "../images/ethnic4.webp";
// import ethnic5 from "../images/ethnic5.webp";
// import ethnic6 from "../images/ethnic6.webp";
// import ethnic7 from "../images/ethnic7.webp";
// import ethnic8 from "../images/ethnic8.webp";
// import ethnic9 from "../images/ethnic9.webp";
// import ethnic10 from "../images/ethnic10.webp";
// import ethnic11 from "../images/ethnic11.webp";
// import ethnic12 from "../images/ethnic12.webp";
// import ethnic13 from "../images/ethnic13.webp";
// import ethnic14 from "../images/ethnic14.webp";
// import ethnic15 from "../images/ethnic15.webp";
// import ethnic16 from "../images/ethnic16.webp";
// import ethnic17 from "../images/ethnic17.webp";
// import ethnic18 from "../images/ethnic18.webp";

// const Ethnic = () => {
//   const products = [
//     { name: "Traditional Kurta Set", price: 12999, image: ethnic1 },
//     { name: "Festive Suit", price: 29999, image: ethnic2 },
//     { name: "Silk Kurta Pajama", price: 18999, image: ethnic3 },
//     { name: "EmbrBlack Kurta Set", price: 16999, image: ethnic4 },
//     { name: "Wedding Sherwani", price: 23499, image: ethnic5 },
//     { name: "Casual Cotton Kurta", price: 15999, image: ethnic6 },
//     { name: "Printed Ethnic Set", price: 13999, image: ethnic7 },
//     { name: "Nehru Jacket with Kurta", price: 12199, image: ethnic8 },
//     { name: "Pathani Suit", price: 17999, image: ethnic9 },
//     { name: "Golden Kurta Set", price: 21599, image: ethnic10 },
//     { name: "Designer Kurta", price: 13999, image: ethnic11 },
//     { name: "Silk Blend Kurta", price: 18999, image: ethnic12 },
//     { name: "Navy Blue Ethnic Set", price: 14999, image: ethnic13 },
//     { name: "Black Suit", price: 19999, image: ethnic14 },
//     { name: "Royal  Kurta Pajama", price: 19599, image: ethnic15 },
//     { name: "Golden Wedding Sherwani", price: 24599, image: ethnic16 },
//     { name: "Kurta ", price: 19999, image: ethnic17 },
//     { name: "Traditional Festival Wear", price: 17999, image: ethnic18 },
//   ];

//   return (
//     <div className="category-page">
//       <h2>Welcome to Ethnic Wear Collection</h2>
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

// export default Ethnic;







import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import './shirt.css';
import './notification.css';

const Ethnic = () => {
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

      const ethnicProductIds = allProducts
        .filter(p =>
          p.name && p.name.toLowerCase().includes('ethnic')
        )
        .map(p => p._id);

      if (ethnicProductIds.length === 0) {
        console.warn("No Ethnic products found.");
        setNotification({ message: 'No Ethnic products found', type: 'info' });
        setCategories([]);
        return;
      }

      const categoryRes = await axios.get('http://localhost:5000/api/categories');
      const filteredCategories = categoryRes.data.filter(cat =>
        cat.product && ethnicProductIds.includes(cat.product._id)
      );

      setCategories(filteredCategories);
    } catch (err) {
      console.error('Error:', err);
      setNotification({ message: 'Failed to load ethnic categories', type: 'error' });
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
        setWishlistItems((prev) => [...prev, res.data]); // Add returned item with _id
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
      <h2>Welcome to Ethnic Wear Collection</h2>
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

export default Ethnic;
