// import React from "react";
// import ProductCard from "../components/productcard";
// import tshirt1 from "../images/tshirt1.webp";
// import tshirt2 from "../images/tshirt2.webp";
// import tshirt3 from "../images/tshirt3.webp";
// import tshirt4 from "../images/tshirt4.webp";
// import tshirt5 from "../images/tshirt5.webp";
// import tshirt6 from "../images/tshirt6.webp";
// import tshirt7 from "../images/tshirt7.webp";
// import tshirt8 from "../images/tshirt8.jpg";
// import tshirt9 from "../images/tshirt9.webp";
// import tshirt10 from "../images/tshirt10.webp";
// import tshirt11 from "../images/tshirt11.webp";
// import tshirt12 from "../images/tshirt12.jpg";
// import tshirt13 from "../images/tshirt13.webp";
// import tshirt14 from "../images/tshirt14.jpg";
// import tshirt15 from "../images/tshirt15.webp";
// import tshirt16 from "../images/tshirt16.webp";
// import tshirt17 from "../images/tshirt17.webp";
// import tshirt18 from "../images/tshirt18.jpg";
// import "../components/productcard.css"; // Ensure styles apply

// const Tshirt = () => {
//   const products = [
//     { name: "Hoddie", price: 599, image: tshirt1 },
//     { name: "Black Sweat Shirt", price: 789, image: tshirt2 },
//     { name: "Black 5 Sleeve T-Shirt", price: 499, image: tshirt3 },
//     { name: "Polo T-Shirt", price: 699, image: tshirt4 },
//     { name: "Oversized Hoddie", price: 549, image: tshirt5 },
//     { name: "Oversized Black Tee", price: 449, image: tshirt6 },
//     { name: "5 Sleeve T-Shirt", price: 499, image: tshirt7 },
//     { name: "White Sweat T-Shirt", price: 599, image: tshirt8 },
//     { name: "Oversized 5 Sleeve T-Shirt", price: 699, image: tshirt9 },
//     { name: "Sweat Shirt", price: 499, image: tshirt10 },
//     { name: "Oversized Polo T-Shirt", price: 899, image: tshirt11 },
//     { name: "Oversized Hoodie", price: 999, image: tshirt12 },
//     { name: "Grey 5 Sleeve T-shirt", price: 599, image: tshirt13 },
//     { name: "Brown 5 Sleeve T-Shirt", price: 499, image: tshirt14 },
//     { name: "Grey Sweat Shirt", price: 479, image: tshirt15 },
//     { name: "Polo T-Shirt", price: 480, image: tshirt16 },
//     { name: "Polo T-Shirt", price: 399, image: tshirt17 },
//     { name: "Hoodie", price: 599, image: tshirt18 },
//   ];

//   return (
//     <div className="category-page">
//       <h2>Welcome to T-Shirt Collection</h2>
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

// export default Tshirt;













import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaRegHeart, FaHeart } from 'react-icons/fa'; // Import filled heart icon
import './shirt.css'; // Reusing shirt styles
import './notification.css';

const TshirtsPage = () => {
  const [categories, setCategories] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]); // Track wishlist items
  const [notification, setNotification] = useState({ message: '', type: '' });
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
    fetchWishlist(); // Fetch wishlist items on load
  }, []);

  const fetchCategories = async () => {
    try {
      // Fetch all products
      const productRes = await axios.get('http://localhost:5000/api/products');
      const tshirtProduct = productRes.data.find(p =>
        p.name.toLowerCase().includes('tshirt') || p.name.toLowerCase().includes('t-shirt')
      );

      if (!tshirtProduct) {
        setCategories([]);
        return;
      }

      const tshirtProductId = tshirtProduct._id;

      // Fetch categories that match the found product (T-shirt)
      const categoryRes = await axios.get('http://localhost:5000/api/categories');
      const filteredCategories = categoryRes.data.filter(cat =>
        cat.product?._id === tshirtProductId
      );

      setCategories(filteredCategories);
    } catch (err) {
      console.error('Error:', err);
      setNotification({ message: 'Failed to load T-shirt categories', type: 'error' });
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
    setTimeout(() => navigate('/buy', {
      state: {
        name: product.name,
        price: product.price,
        image: `http://localhost:5000/uploads/${product.image}`,
      }
    }), 1000);
  };

  const isInWishlist = (product) => {
    return wishlistItems.some((item) => item.name === product.name);  // Check if product is in the wishlist
  };

  return (
    <div className="shirts-container">
      <h2>Welcome to T-Shirts Collection</h2>
      {notification.message && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}
      <div className="shirts-grid">
        {categories.length === 0 ? (
          <p>No T-shirts found</p>
        ) : (
          categories.map((cat) => (
            <div key={cat._id} className="shirt-card">
              <div
                className="wishlist-icon"
                onClick={() => handleAddToWishlist(cat)} // Toggle wishlist on click
              >
                {isInWishlist(cat) ? (
                  <FaHeart color="red" />  // Filled heart (red) when in wishlist
                ) : (
                  <FaRegHeart />  // Empty heart when not in wishlist
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

export default TshirtsPage;
