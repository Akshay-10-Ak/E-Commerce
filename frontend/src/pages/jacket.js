// import React from "react";
// import ProductCard from "../components/productcard";
// import "../components/productcard.css";

// import jacket1 from "../images/jacket1.webp";
// import jacket2 from "../images/jacket2.webp";
// import jacket3 from "../images/jacket3.jpg";
// import jacket4 from "../images/jacket4.avif";
// import jacket5 from "../images/jacket5.webp";
// import jacket6 from "../images/jacket6.webp";
// import jacket7 from "../images/jacket7.jpg";
// import jacket8 from "../images/jacket8.webp";
// import jacket9 from "../images/jacket9.webp";
// import jacket10 from "../images/jacket10.webp";
// import jacket11 from "../images/jacket11.webp";
// import jacket12 from "../images/jacket12.avif";
// import jacket13 from "../images/jacket13.webp";
// import jacket14 from "../images/jacket14.webp";
// import jacket15 from "../images/jacket15.webp";
// import jacket16 from "../images/jacket16.webp";
// import jacket17 from "../images/jacket17.webp";
// import jacket18 from "../images/jacket18.webp";

// const Jacket = () => {
//   const products = [
//     { name: "Black Jean Jacket", price: 2499, image: jacket1 },
//     { name: "Classic Bomber Jacket", price: 1999, image: jacket2 },
//     { name: "Denim Blue Jacket", price: 1799, image: jacket3 },
//     { name: "Winter Puffer Jacket", price: 2999, image: jacket4 },
//     { name: "Hooded Windbreaker", price: 1499, image: jacket5 },
//     { name: "Green Suede Jacket", price: 2299, image: jacket6 },
//     { name: "Black Denim Jacket", price: 1899, image: jacket7 },
//     { name: " Lightblue Jacket", price: 1599, image: jacket8 },
//     { name: "White Winter Jacket", price: 2099, image: jacket9 },
//     { name: "Casual  Jacket", price: 2699, image: jacket10 },
//     { name: "LightGreen Oversized Jacket", price: 1399, image: jacket11 },
//     { name: "Zip-Up Leather Jacket", price: 1699, image: jacket12 },
//     { name: "Black Zip-Up Jacket", price: 3699, image: jacket13 },
//     { name: "Sporty Track Jacket", price: 1899, image: jacket14 },
//     { name: "Oversized Streetwear Jacket", price: 1399, image: jacket15 },
//     { name: "Short Sized Jacket", price: 1899, image: jacket16 },
//     { name: "Zip-Up Hoodie Jacket", price: 1399, image: jacket17 },
//     { name: "Hoodie Jacket", price: 2199, image: jacket18 },
//   ];

//   return (
//     <div className="category-page">
//       <h2>Welcome to Jacket Collection</h2>
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

// export default Jacket;








import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import './shirt.css';
import './notification.css';

const Jacket = () => {
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

      const jacketProductIds = allProducts
        .filter(p =>
          p.name && p.name.toLowerCase().includes('jacket')
        )
        .map(p => p._id);

      if (jacketProductIds.length === 0) {
        setNotification({ message: 'No Jacket products found', type: 'info' });
        setCategories([]);
        return;
      }

      const categoryRes = await axios.get('http://localhost:5000/api/categories');
      const filteredCategories = categoryRes.data.filter(cat =>
        cat.product && jacketProductIds.includes(cat.product._id)
      );

      setCategories(filteredCategories);
    } catch (err) {
      console.error('Error:', err);
      setNotification({ message: 'Failed to load jacket categories', type: 'error' });
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
      const isInWishlist = wishlistItems.some(item => item.name === product.name);
      if (isInWishlist) {
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
        setWishlistItems([...wishlistItems, res.data]);
        setNotification({ message: `${product.name} added to Wishlist`, type: 'success' });
      }
      setTimeout(() => setNotification({ message: '', type: '' }), 3000);
    } catch (err) {
      console.error('Wishlist Error:', err);
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
      <h2>Welcome to Jacket Collection</h2>
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
              <div className="wishlist-icon" onClick={() => handleAddToWishlist(cat)}>
                {isInWishlist(cat) ? <FaHeart color="red" /> : <FaRegHeart />}
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

export default Jacket;
