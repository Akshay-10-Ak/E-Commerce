// import React from "react";
// import ProductCard from "../components/productcard";
// import jeans1 from "../images/jean1.webp";
// import jeans2 from "../images/jean2.webp";
// import jeans3 from "../images/jean3.webp";
// import jeans4 from "../images/jean4.webp";
// import jeans5 from "../images/jean5.webp";
// import jeans6 from "../images/jean6.webp";
// import jeans7 from "../images/jean7.webp";
// import jeans8 from "../images/jean8.webp";
// import jeans9 from "../images/jean9.webp";
// import jeans10 from "../images/jean10.webp";
// import jeans11 from "../images/jean11.webp";
// import jeans12 from "../images/jean12.webp";
// import jeans13 from "../images/jean13.webp";
// import jeans14 from "../images/jean14.webp";
// import jeans15 from "../images/jean15.webp";
// import jeans16 from "../images/jean16.webp";
// import jeans17 from "../images/jean17.webp";
// import jeans18 from "../images/jean18.webp";
// import "../components/productcard.css"; // for consistent styling

// const Jeans = () => {
//   const products = [
//     { name: "Classic Blue Baggy Jeans", price: 1999, image: jeans1 },
//     { name: "Black Baggy Jeans", price: 1199, image: jeans2 },
//     { name: "Distressed Blue Baggy Jeans", price: 1299, image: jeans3 },
//     { name: "Straight Fit Blue Jeans", price: 1099, image: jeans4 },
//     { name: "Washed Denim Baggy Jeans", price: 999, image: jeans5 },
//     { name: "Black Baggy Jeans", price: 899, image: jeans6 },
//     { name: "Faded Black Jeans", price: 1099, image: jeans7 },
//     { name: "Carot Fit Jeans", price: 1199, image: jeans8 },
//     { name: "Tapered Baggy Jeans", price: 999, image: jeans9 },
//     { name: "Straight Baggy Jeans", price: 1299, image: jeans10 },
//     { name: "Blue Jeans Shorts", price: 899, image: jeans11 },
//     { name: "Faded Jeans Shorts", price: 799, image: jeans12 },
//     { name: "Baggy Jeans", price: 999, image: jeans13 },
//     { name: "Cargo Baggy Jeans", price: 1399, image: jeans14 },
//     { name: "Cargo Blue Baggy Jeans", price: 1199, image: jeans15 },
//     { name: "Straight Cut Jeans", price: 799, image: jeans16 },
//     { name: "Loose Fit Jeans", price: 976, image: jeans17 },
//     { name: "Grey Carot Fit Jeans", price: 850, image: jeans18 },
//   ];

//   return (
//     <div className="category-page">
//       <h2>Welcome to Jeans Collection</h2>
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

// export default Jeans;








import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import './shirt.css';
import './notification.css';

const JeansPage = () => {
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
      const jeansProduct = productRes.data.find(p => p.name.toLowerCase() === 'jeans');

      if (!jeansProduct) {
        setCategories([]);
        return;
      }

      const jeansProductId = jeansProduct._id;

      const categoryRes = await axios.get('http://localhost:5000/api/categories');
      const filteredCategories = categoryRes.data.filter(cat =>
        cat.product?._id === jeansProductId
      );

      setCategories(filteredCategories);
    } catch (err) {
      console.error('Error:', err);
      setNotification({ message: 'Failed to load jeans categories', type: 'error' });
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

  // const handleAddToWishlist = async (product) => {
  //   try {
  //     const isProductInWishlist = wishlistItems.some(item => item._id === product._id);

  //     if (isProductInWishlist) {
  //       const existingItem = wishlistItems.find(item => item.name === product.name);
  //       await axios.delete(`http://localhost:5000/api/wishlist/${existingItem._id}`);
  //       setWishlistItems(wishlistItems.filter(item => item.name !== product.name));
  //       setNotification({ message: `${product.name} removed from Wishlist`, type: 'success' });
  //     } else {
  //       const wishlistProduct = {
  //         name: product.name,
  //         price: product.price,
  //         image: product.image,
  //         description: product.description,
  //       };
  //       const res = await axios.post('http://localhost:5000/api/wishlist', wishlistProduct, {
  //         headers: { 'Content-Type': 'application/json' },
  //       });
  //       setWishlistItems((prev) => [...prev, res.data]); // Add returned item with _id
  //       setNotification({ message: `${product.name} added to Wishlist`, type: 'success' });
  //     }

  //     setTimeout(() => setNotification({ message: '', type: '' }), 3000);
  //   } catch (err) {
  //     console.error('Wishlist Error:', err.response?.data || err.message);
  //     setNotification({ message: 'Failed to modify Wishlist', type: 'error' });
  //   }
  // };

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
      <h2>Welcome to Jeans Collection</h2>
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

export default JeansPage;
