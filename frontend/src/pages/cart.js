// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./cart.css";

// const CartPage = () => {
//   const navigate = useNavigate();
//   const [cartItems, setCartItems] = useState([]);

//   useEffect(() => {
//     const storedItems = JSON.parse(localStorage.getItem("cartItems")) || [];
//     setCartItems(storedItems);
//   }, []);

//   const getTotalPrice = () => {
//     return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
//   };

//   const handleRemove = (index) => {
//     const updatedItems = [...cartItems];
//     updatedItems.splice(index, 1);
//     setCartItems(updatedItems);
//     localStorage.setItem("cartItems", JSON.stringify(updatedItems));
//   };

//   const handleCheckout = () => {
//     if (cartItems.length === 0) {
//       alert("Your cart is empty.");
//       return;
//     }
//     navigate("/buy", { state: cartItems[0] }); // Pass the first item or modify this as needed
//   };

//   const handleQuantityChange = (index, value) => {
//     const updatedItems = [...cartItems];
//     updatedItems[index].quantity = Math.max(1, parseInt(value));
//     setCartItems(updatedItems);
//     localStorage.setItem("cartItems", JSON.stringify(updatedItems));
//   };

//   return (
//     <div className="cart-container">
//       <h2>Your Cart</h2>
//       {cartItems.length === 0 ? (
//         <p>Your cart is empty.</p>
//       ) : (
//         <>
//           <div className="cart-list">
//             {cartItems.map((item, index) => (
//               <div key={index} className="cart-item">
//                 <img src={item.image} alt={item.name} />
//                 <div className="item-info">
//                   <h4>{item.name}</h4>
//                   <p>Price: ₹{item.price}</p>
//                   <label>
//                     Quantity:
//                     <input
//                       type="number"
//                       min={1}
//                       value={item.quantity}
//                       onChange={(e) => handleQuantityChange(index, e.target.value)}
//                     />
//                   </label>
//                   <p>Subtotal: ₹{item.price * item.quantity}</p>
//                   <button onClick={() => handleRemove(index)}>Remove</button>
//                 </div>
//               </div>
//             ))}
//           </div>
//           <div className="cart-summary">
//             <h3>Total: ₹{getTotalPrice()}</h3>
//             <button className="checkout-btn" onClick={handleCheckout}>
//               Proceed to Checkout
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default CartPage;








// src/pages/CartPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./cart.css";
import "./notification.css"; // Import CSS for notification

const CartPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [notification, setNotification] = useState({ message: "", type: "" });

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const serverCart = await axios.get("http://localhost:5000/api/cart");
      const localCart = JSON.parse(localStorage.getItem("cartItems")) || [];

      // Merge server cart and local cart (you might want to handle duplicates)
      const mergedCart = [...serverCart.data, ...localCart];
      setCartItems(mergedCart);
    } catch (err) {
      console.error("Error fetching cart items:", err);
      setNotification({ message: "Failed to load cart.", type: "error" });
      setTimeout(() => setNotification({ message: "", type: "" }), 3000);
    }
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * (item.quantity || 1), 0);
  };

  const handleRemove = async (index) => {
    try {
      const updatedItems = [...cartItems];
      const removedItem = updatedItems.splice(index, 1)[0];
      setCartItems(updatedItems);
      localStorage.setItem("cartItems", JSON.stringify(updatedItems));

      // Remove from server
      await axios.delete(`http://localhost:5000/api/cart/${removedItem.name}`);

      setNotification({ message: `${removedItem.name} removed from cart.`, type: "success" });
      setTimeout(() => setNotification({ message: "", type: "" }), 3000);
    } catch (err) {
      console.error("Failed to remove item:", err);
      setNotification({ message: "Failed to remove item.", type: "error" });
      setTimeout(() => setNotification({ message: "", type: "" }), 3000);
    }
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      setNotification({ message: "Your cart is empty.", type: "warning" });
      setTimeout(() => setNotification({ message: "", type: "" }), 3000);
      return;
    }
    navigate("/buy", { state: cartItems }); // Passing the entire cart
  };

  const handleQuantityChange = (index, value) => {
    const updatedItems = [...cartItems];
    updatedItems[index].quantity = Math.max(1, parseInt(value) || 1);
    setCartItems(updatedItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedItems));
  };

  return (
    <div className="page-container">
      <h2>Your Cart</h2>
      {notification.message && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="card-grid">
            {cartItems.map((item, index) => (
              <div key={item._id || index} className="card">
                <img
                  src={
                    item.image?.startsWith('http')
                      ? item.image
                      : `http://localhost:5000/uploads/${item.image}`
                  }
                  alt={item.name}
                  className="card-image"
                />
                <div className="card-details">
                  <h3>{item.name}</h3>
                  <p className="price">₹{item.price}</p>
                  <p>{item.description?.slice(0, 50)}...</p>

                  <div className="quantity-control">
                    <label>
                      Quantity:
                      <input
                        type="number"
                        min="1"
                        value={item.quantity || 1}
                        onChange={(e) => handleQuantityChange(index, e.target.value)}
                      />
                    </label>
                  </div>

                  <p className="subtotal">Subtotal: ₹{item.price * (item.quantity || 1)}</p>

                  <button className="remove-btn" onClick={() => handleRemove(index)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Total: ₹{getTotalPrice()}</h3>
            <button className="checkout-btn" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;