// import React, { useEffect, useState } from "react";
// import "./wishlist.css";

// const Wishlist = () => {
//   const [wishlist, setWishlist] = useState([]);

//   useEffect(() => {
//     const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
//     setWishlist(storedWishlist);
//   }, []);

//   const removeFromWishlist = (name) => {
//     const updatedWishlist = wishlist.filter((item) => item.name !== name);
//     localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
//     setWishlist(updatedWishlist);
//   };

//   return (
//     <div className="wishlist-container">
//       <h2>Your Wishlist</h2>
//       <div className="wishlist-grid">
//         {wishlist.length === 0 ? (
//           <p>No items in your wishlist.</p>
//         ) : (
//           wishlist.map((item, index) => (
//             <div className="wishlist-item" key={index}>
//               <img src={item.image} alt={item.name} />
//               <h3>{item.name}</h3>
//               <p>₹{item.price}</p>
//               <button onClick={() => removeFromWishlist(item.name)}>Remove</button>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default Wishlist;





















import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './wishlist.css';

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(false); // Add loading state
  const [error, setError] = useState(''); // Add error state

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    setLoading(true); // Set loading to true when fetching data
    try {
      const res = await axios.get('http://localhost:5000/api/wishlist');
      setWishlistItems(res.data);
      setError(''); // Clear error if fetch is successful
    } catch (err) {
      console.error('Failed to fetch wishlist:', err);
      setError('Failed to load wishlist');
    } finally {
      setLoading(false); // Set loading to false after fetch attempt
    }
  };

  const handleRemove = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:5000/api/wishlist/${id}`);
      // Re-fetch the wishlist after removing an item to ensure data is up-to-date
      fetchWishlist(); // Instead of filtering out locally, re-fetch to get the latest state
      setError(''); // Clear error if removal is successful
    } catch (err) {
      console.error('Failed to remove item:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Failed to remove item');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="wishlist-container">
      <h2>Your Wishlist</h2>
      {loading && <div className="loading-spinner">Loading...</div>}
      {error && <div className="error-message">{error}</div>}

      {wishlistItems.length === 0 ? (
        <p>No items in your wishlist.</p>
      ) : (
        <div className="wishlist-grid">
          {wishlistItems.map((item) => (
            <div className="wishlist-card" key={item._id}>
              <img
                src={`http://localhost:5000/uploads/${item.image}`}
                alt={item.name}
                className="wishlist-image"
              />
              <h3>{item.name}</h3>
              <p>₹{item.price}</p>
              <p>{item.description?.slice(0, 60)}...</p>
              <button onClick={() => handleRemove(item._id)}>Remove</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
