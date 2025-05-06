// import React from "react";
// import ProductCard from "../components/productcard";
// import "../components/productcard.css";

// import acc1 from "../images/acc1.webp";
// import acc2 from "../images/acc2.webp";
// import acc3 from "../images/acc3.webp";
// import acc4 from "../images/acc4.webp";
// import acc5 from "../images/acc5.webp";
// import acc6 from "../images/acc6.webp";
// import acc7 from "../images/acc7.webp";
// import acc8 from "../images/acc8.webp";
// import acc9 from "../images/acc9.webp";
// import acc10 from "../images/acc10.jpg";
// import acc11 from "../images/acc11.jpg";
// import acc12 from "../images/acc12.jpg";
// import acc13 from "../images/acc13.webp";
// import acc14 from "../images/acc14.jpg";
// import acc15 from "../images/acc15.webp";
// import acc16 from "../images/acc16.jpg";
// import acc17 from "../images/acc17.webp";
// import acc18 from "../images/acc18.avif";
// import acc19 from "../images/acc19.webp";
// import acc20 from "../images/acc20.webp";
// import acc21 from "../images/acc21.webp";
// import acc22 from "../images/acc22.webp";
// import acc23 from "../images/acc23.webp";
// import acc24 from "../images/acc24.avif";
// import acc25 from "../images/acc25.webp";
// import acc26 from "../images/acc26.webp";
// import acc27 from "../images/acc27.webp";
// import acc28 from "../images/acc28.webp";
// import acc29 from "../images/acc29.webp";
// import acc30 from "../images/acc30.webp";

// const Accessories = () => {
//   const products = [
//     { name: "Chain", price: 799, image: acc1 },
//     { name: "Golden Chain", price: 1299, image: acc2 },
//     { name: "Silver Ring", price: 499, image: acc3 },
//     { name: "Ring", price: 2199, image: acc4 },
//     { name: "Black Ring", price: 1599, image: acc5 },
//     { name: "Sliver Chain", price: 699, image: acc6 },
//     { name: "Black Bracelet", price: 499, image: acc7 },
//     { name: "Silver Bracelet", price: 999, image: acc8 },
//     { name: "Leather Bracelet", price: 399, image: acc9 },
//     { name: "Buckle Belt", price: 799, image: acc10 },
//     { name: "Black Belt", price: 1199, image: acc11 },
//     { name: "Golden Buckle Belt", price: 1899, image: acc12 },
//     { name: "Brown Wallet", price: 1399, image: acc13 },
//     { name: "Black & Brown Wallet", price: 499, image: acc14 },
//     { name: "Brown Wallet", price: 599, image: acc15 },
//     { name: "Chain Watch", price: 2799, image: acc16 },
//     { name: "Smart Watch", price: 3999, image: acc17 },
//     { name: "Digital Watch", price: 2299, image: acc18 },
//     { name: "Black Cap", price: 299, image: acc19 },
//     { name: "Vintage Cap", price: 599, image: acc20 },
//     { name: "Winter Cap", price: 799, image: acc21},
//     { name: "Black Coolers", price: 499, image: acc22 },
//     { name: "Black Grey Coolers", price: 599, image: acc23 },
//     { name: "Rounded Collers", price: 650, image: acc24 },
//     { name: "Boxed Coolers", price: 1199, image: acc25 },
//     { name: "Tom Ford Perfume", price: 1299, image: acc26 },
//     { name: "Yves Saint Laurent Perfume", price: 5299, image: acc27 },
//     { name: "Gentleman Perfume", price: 4899, image: acc28 },
//     { name: "Triumph", price: 1599, image: acc29 },
//     { name: "Creed Oudh Perfume", price: 3199, image: acc30 },
//   ];

//   return (
//     <div className="category-page">
//       <h2>Welcome to Accessories Collection</h2>
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

// export default Accessories;













import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import './shirt.css';
import './notification.css';

const Accessories = () => {
  const [categories, setCategories] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [notification, setNotification] = useState({ message: '', type: '' });
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
    fetchWishlist();
  }, []);

  const fetchCategories = async () => {
    try {
      const productRes = await axios.get('http://localhost:5000/api/products');
      const allProducts = productRes.data;

      const accessoriesProductIds = allProducts
        .filter((p) => p.name && p.name.toLowerCase().includes('accessories'))
        .map((p) => p._id);

      if (accessoriesProductIds.length === 0) {
        console.warn('No Accessories products found.');
        setNotification({ message: 'No Accessories products found', type: 'info' });
        setCategories([]);
        return;
      }

      const categoryRes = await axios.get('http://localhost:5000/api/categories');
      const filteredCategories = categoryRes.data.filter((cat) =>
        cat.product && accessoriesProductIds.includes(cat.product._id)
      );

      setCategories(filteredCategories);
    } catch (err) {
      console.error('Error:', err);
      setNotification({ message: 'Failed to load accessories categories', type: 'error' });
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
      const isProductInWishlist = wishlistItems.some((item) => item.name === product.name);

      if (isProductInWishlist) {
        const existingItem = wishlistItems.find((item) => item.name === product.name);
        await axios.delete(`http://localhost:5000/api/wishlist/${existingItem._id}`);
        setWishlistItems(wishlistItems.filter((item) => item.name !== product.name));
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
      },
    }), 1000);
  };

  const isInWishlist = (product) => {
    return wishlistItems.some((item) => item.name === product.name);
  };

  return (
    <div className="shirts-container">
      <h2>Welcome to Accessories Collection</h2>
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
                <button className="cart-btn" onClick={() => handleAddToCart(cat)}>
                  Add to Cart
                </button>
                <button className="buy-btn" onClick={() => handleBuyNow(cat)}>
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

export default Accessories;
