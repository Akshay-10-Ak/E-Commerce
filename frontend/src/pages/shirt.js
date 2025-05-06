// import React from "react";
// import ProductCard from "../components/productcard";
// import shirt1 from "../images/shirt1.webp";
// import shirt2 from "../images/shirt2.webp";
// import shirt3 from "../images/shirt3.avif";
// import shirt4 from "../images/shirt4.webp";
// import shirt5 from "../images/shirt5.webp";
// import shirt6 from "../images/shirt6.webp";
// import shirt7 from "../images/shirt7.webp";
// import shirt8 from "../images/shirt8.jpg";
// import shirt9 from "../images/shirt9.webp";
// import shirt10 from "../images/shirt10.webp";
// import shirt11 from "../images/shirt11.webp";
// import shirt12 from "../images/shirt12.webp";
// import shirt13 from "../images/shirt13.jpeg";
// import shirt14 from "../images/shirt14.webp";
// import shirt15 from "../images/shirt15.webp";
// import shirt16 from "../images/shirt16.webp";
// import shirt17 from "../images/shirt17.webp";
// import shirt18 from "../images/shirt18.webp";
// import "../components/productcard.css"; 

// const Shirt = () => {
//   const products = [
//     { name: "Brown Formal Shirt", price: 999, image: shirt1 },
//     { name: "Printed 5 Sleeve Shirt", price: 799, image: shirt2 },
//     { name: "Striped Shirt", price: 599, image: shirt3 },
//     { name: " Printed Half Sleeve Shirt", price: 799, image: shirt4 },
//     { name: " 5 sleeve Shirt", price: 699, image: shirt5 },
//     { name: " Drop Shoulder Shirt", price: 799, image: shirt6 },
//     { name: " Printed Shirt", price: 499, image: shirt7},
//     { name: " Plain Shirt", price: 499, image: shirt8 },
//     { name: " Black Plain Shirt", price: 399, image: shirt9 },
//     { name: " Black & White Checked Shirt", price: 599, image: shirt10 },
//     { name: " Dark-Tone Brushed  Shirt", price: 600, image: shirt11 },
//     { name: " Checked Shirt", price: 499, image: shirt12 },
//     { name: " Denim Shirt", price: 899, image: shirt13 },
//     { name: " White 5-Sleeve Shirt", price: 399, image: shirt14 },
//     { name: "White 7-Sleeve Shirt", price: 799, image: shirt15 },
//     { name: " Blue Checked Shirt", price: 799, image: shirt16 },
//     { name: " Regular Shirt", price: 399, image: shirt17 },
//     { name: " Round Neck Short Shirt", price: 599, image: shirt18 },
//   ];

//   return (
//     <div className="category-page">
//       <h2>Welcome to Shirt Collection</h2>
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

// export default Shirt;




















import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaRegHeart, FaHeart } from 'react-icons/fa'; // Import filled heart icon
import './shirt.css';
import './notification.css';

const ShirtsPage = () => {
  const [categories, setCategories] = useState([]);
  const [notification, setNotification] = useState({ message: '', type: '' });
  const [wishlistItems, setWishlistItems] = useState([]);  // Track wishlist items
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
    fetchWishlist();  // Fetch wishlist on load
  }, []);

  const fetchCategories = async () => {
    try {
      const productRes = await axios.get('http://localhost:5000/api/products');
      const shirtProduct = productRes.data.find(p =>
        p.name.toLowerCase().includes('shirt')
      );

      if (!shirtProduct) {
        setCategories([]);
        return;
      }

      const shirtProductId = shirtProduct._id;
      const categoryRes = await axios.get('http://localhost:5000/api/categories');
      const filteredCategories = categoryRes.data.filter(cat =>
        cat.product?._id === shirtProductId
      );

      setCategories(filteredCategories);
    } catch (err) {
      console.error('Error fetching categories:', err);
      setNotification({ message: 'Error fetching shirts', type: 'error' });
      setTimeout(() => setNotification({ message: '', type: '' }), 3000);
    }
  };

  const fetchWishlist = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/wishlist');
      setWishlistItems(res.data);  // Set wishlist items from the backend
    } catch (err) {
      console.error('Error fetching wishlist:', err);
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

  // const handleAddToWishlist = async (product) => {
  //   try {
  //     const isProductInWishlist = wishlistItems.some(item => item._id === product._id);

  //     if (isProductInWishlist) {
  //       // If it's already in the wishlist, remove it
  //       await axios.delete(`http://localhost:5000/api/wishlist/${product._id}`);
  //       setWishlistItems(wishlistItems.filter(item => item._id !== product._id));
  //       setNotification({ message: `${product.name} removed from Wishlist`, type: 'success' });
  //     } else {
  //       // If it's not in the wishlist, add it
  //       const wishlistProduct = {
  //         name: product.name,
  //         price: product.price,
  //         image: product.image,
  //         description: product.description,
  //       };

  //       await axios.post('http://localhost:5000/api/wishlist', wishlistProduct, {
  //         headers: { 'Content-Type': 'application/json' },
  //       });

  //       // Add to the wishlist state and update UI
  //       setWishlistItems((prev) => [...prev, wishlistProduct]);
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

  const handleBuyNow = (product) => {
    setNotification({ message: `Redirecting to checkout for ${product.name}...`, type: 'info' });
    setTimeout(() => {
      navigate('/buy', {
        state: {
          name: product.name,
          price: product.price,
          image: `http://localhost:5000/uploads/${product.image}`,
        },
      });
    }, 1000);
  };

  const isInWishlist = (product) => {
    return wishlistItems.some((item) => item.name === product.name);  // Check if product is in the wishlist
  };

  return (
    <div className="shirts-container">
      <h2>Welcome to Shirts Collection</h2>
      {notification.message && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}
      <div className="shirts-grid">
        {categories.length === 0 ? (
          <p>No shirts found</p>
        ) : (
          categories.map((category) => (
            <div key={category._id} className="shirt-card">
              <div
                className="wishlist-icon"
                onClick={() => handleAddToWishlist(category)}  // Toggle wishlist on click
              >
                {isInWishlist(category) ? (
                  <FaHeart color="red" />  // Filled heart (red)
                ) : (
                  <FaRegHeart />  // Empty heart
                )}
              </div>

              {category.image ? (
                <img
                  src={`http://localhost:5000/uploads/${category.image}`}
                  alt={category.name}
                  className="shirt-image"
                />
              ) : (
                <div className="no-image">No Image</div>
              )}

              <h3 className="shirt-name">{category.name}</h3>
              <p className="shirt-price">₹{category.price}</p>
              <p className="shirt-description">
                {category.description?.slice(0, 50)}...
              </p>
              <div className="shirt-buttons">
                <button className="cart-btn" onClick={() => handleAddToCart(category)}>
                  Add to Cart
                </button>
                <button className="buy-btn" onClick={() => handleBuyNow(category)}>
                  Buy Now
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ShirtsPage;
