// // src/pages/BuyPage.jsx
// import React, { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import "./buy.css";

// const BuyPage = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { name, price, image } = location.state || {};

//   const [quantity, setQuantity] = useState(1);
//   const [userInfo, setUserInfo] = useState({
//     fullName: "",
//     address: "",
//     phone: "",
//     email: "",
//   });

//   const [paymentMethod, setPaymentMethod] = useState("card");
//   const [paymentDetails, setPaymentDetails] = useState({
//     cardNumber: "",
//     upiId: "",
//   });

//   const handleChange = (e) => {
//     setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
//   };

//   const handlePaymentChange = (e) => {
//     setPaymentMethod(e.target.value);
//   };

//   const handlePaymentDetailChange = (e) => {
//     setPaymentDetails({ ...paymentDetails, [e.target.name]: e.target.value });
//   };

//   const handleConfirm = () => {
//     if (!userInfo.fullName || !userInfo.address || !userInfo.phone || !userInfo.email) {
//       alert("Please fill in all shipping details.");
//       return;
//     }

//     if (
//       (paymentMethod === "card" && !paymentDetails.cardNumber) ||
//       (paymentMethod === "upi" && !paymentDetails.upiId)
//     ) {
//       alert("Please provide payment information.");
//       return;
//     }

//     alert(`✅ Order Confirmed for ${userInfo.fullName}! Payment via ${paymentMethod.toUpperCase()}`);
//     navigate("/");
//   };

//   if (!name || !price || !image) {
//     return <h2 style={{ textAlign: "center" }}>No product selected.</h2>;
//   }

//   return (
//     <div className="buy-container">
//       <h2>Checkout</h2>
//       <div className="buy-card">
//         <img src={image} alt={name} />
//         <div className="buy-details">
//           <h3>{name}</h3>
//           <p>Price per item: ₹{price}</p>

//           <label>
//             Quantity:
//             <input
//               type="number"
//               value={quantity}
//               min={1}
//               onChange={(e) => setQuantity(parseInt(e.target.value))}
//             />
//           </label>

//           <p>Total: ₹{price * quantity}</p>
//         </div>
//       </div>

//       {/* Shipping Details */}
//       <div className="user-info">
//         <h3>Shipping Details</h3>
//         <form>
//           <input
//             type="text"
//             name="fullName"
//             placeholder="Full Name"
//             value={userInfo.fullName}
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="text"
//             name="address"
//             placeholder="Address"
//             value={userInfo.address}
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="text"
//             name="phone"
//             placeholder="Phone Number"
//             value={userInfo.phone}
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={userInfo.email}
//             onChange={handleChange}
//             required
//           />
//         </form>
//       </div>

//       {/* Payment Details */}
//       <div className="payment-info">
//         <h3>Payment Method</h3>
//         <select value={paymentMethod} onChange={handlePaymentChange}>
//           <option value="card">Credit / Debit Card</option>
//           <option value="upi">UPI</option>
//           <option value="cod">Cash on Delivery</option>
//         </select>

//         {paymentMethod === "card" && (
//           <input
//             type="text"
//             name="cardNumber"
//             placeholder="Card Number"
//             maxLength={16}
//             value={paymentDetails.cardNumber}
//             onChange={handlePaymentDetailChange}
//           />
//         )}

//         {paymentMethod === "upi" && (
//           <input
//             type="text"
//             name="upiId"
//             placeholder="UPI ID (e.g., name@upi)"
//             value={paymentDetails.upiId}
//             onChange={handlePaymentDetailChange}
//           />
//         )}
//       </div>

//       <button className="confirm-btn" onClick={handleConfirm}>
//         Place Order
//       </button>
//     </div>
//   );
// };

// export default BuyPage;











// // src/pages/BuyPage.jsx
// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./buy.css";

// const BuyPage = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { name, price, image } = location.state || {}; // Getting passed product details (optional)

//   const [quantity, setQuantity] = useState(1);
//   const [userInfo, setUserInfo] = useState({
//     fullName: "",
//     address: "",
//     phone: "",
//     email: "",
//   });

//   const [paymentMethod, setPaymentMethod] = useState("");
//   const [paymentDetails, setPaymentDetails] = useState({
//     cardNumber: "",
//     upiId: "",
//   });

//   const [buyItems, setBuyItems] = useState([]);

//   useEffect(() => {
//     if (!location.state) {
//       fetchBuyItems();
//     }
//   }, [location.state]);

//   const fetchBuyItems = async () => {
//     try {
//       const res = await axios.get('http://localhost:5000/api/buy');
//       setBuyItems(res.data);
//     } catch (err) {
//       console.error('Error fetching buy items:', err);
//     }
//   };

//   const handleChange = (e) => {
//     setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
//   };

//   const handlePaymentChange = (e) => {
//     setPaymentMethod(e.target.value);
//   };

//   const handlePaymentDetailChange = (e) => {
//     setPaymentDetails({ ...paymentDetails, [e.target.name]: e.target.value });
//   };

//   const handleConfirm = () => {
//     if (!userInfo.fullName || !userInfo.address || !userInfo.phone || !userInfo.email) {
//       alert("Please fill in all shipping details.");
//       return;
//     }

//     if (
//       (paymentMethod === "card" && !paymentDetails.cardNumber) ||
//       (paymentMethod === "upi" && !paymentDetails.upiId)
//     ) {
//       alert("Please provide payment information.");
//       return;
//     }

//     alert(`✅ Order Confirmed for ${userInfo.fullName}! Payment via ${paymentMethod.toUpperCase()}`);
//     navigate("/");
//   };

//   if (!location.state) {
//     // No product selected => Show all available buy items from server
//     return (
//       <div className="page-container">
//         <h2>Buy Items</h2>
//         <div className="card-grid">
//           {buyItems.length === 0 ? (
//             <p>No items to buy</p>
//           ) : (
//             buyItems.map(item => (
//               <div key={item._id} className="card">
//                 <img src={`http://localhost:5000/uploads/${item.image}`} alt={item.name} className="card-image" />
//                 <div className="card-details">
//                   <h3>{item.name}</h3>
//                   <p className="price">₹{item.price}</p>
//                   <p>{item.description.slice(0, 50)}...</p>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     );
//   }

//   // If a product is selected => show checkout form
//   return (
//     <div className="buy-container">
//       <h2>Checkout</h2>
//       <div className="buy-card">
//         <img src={image} alt={name} />
//         <div className="buy-details">
//           <h3>{name}</h3>
//           <p>Price per item: ₹{price}</p>

//           <label>
//             Quantity:
//             <input
//               type="number"
//               value={quantity}
//               min={1}
//               onChange={(e) => setQuantity(parseInt(e.target.value))}
//             />
//           </label>

//           <p>Total: ₹{price * quantity}</p>
//         </div>
//       </div>

//       {/* Shipping Details */}
//       <div className="user-info">
//         <h3>Shipping Details</h3>
//         <form>
//           <input
//             type="text"
//             name="fullName"
//             placeholder="Full Name"
//             value={userInfo.fullName}
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="text"
//             name="address"
//             placeholder="Address"
//             value={userInfo.address}
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="text"
//             name="phone"
//             placeholder="Phone Number"
//             value={userInfo.phone}
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={userInfo.email}
//             onChange={handleChange}
//             required
//           />
//         </form>
//       </div>

//       {/* Payment Details */}
//       <div className="payment-info">
//         <h3>Payment Method</h3>
//         <select value={paymentMethod} onChange={handlePaymentChange}>
//           <option value="card">Credit / Debit Card</option>
//           <option value="upi">UPI</option>
//           <option value="cod">Cash on Delivery</option>
//         </select>

//         {paymentMethod === "card" && (
//           <input
//             type="text"
//             name="cardNumber"
//             placeholder="Card Number"
//             maxLength={16}
//             value={paymentDetails.cardNumber}
//             onChange={handlePaymentDetailChange}
//           />
//         )}

//         {paymentMethod === "upi" && (
//           <input
//             type="text"
//             name="upiId"
//             placeholder="UPI ID (e.g., name@upi)"
//             value={paymentDetails.upiId}
//             onChange={handlePaymentDetailChange}
//           />
//         )}
//       </div>

//       <button className="confirm-btn" onClick={handleConfirm}>
//         Place Order
//       </button>
//     </div>
//   );
// };

// export default BuyPage;










/// src/pages/BuyPage.jsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./buy.css";

const BuyPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { name, price, image } = location.state || {};

  const [quantity, setQuantity] = useState(1);
  const [userInfo, setUserInfo] = useState({
    fullName: "",
    address: "",
    phone: "",
    email: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    upiId: "",
  });

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handlePaymentDetailChange = (e) => {
    setPaymentDetails({ ...paymentDetails, [e.target.name]: e.target.value });
  };

  const handleConfirm = () => {
    if (!userInfo.fullName || !userInfo.address || !userInfo.phone || !userInfo.email) {
      alert("Please fill in all shipping details.");
      return;
    }

    if (
      (paymentMethod === "card" && !paymentDetails.cardNumber) ||
      (paymentMethod === "upi" && !paymentDetails.upiId)
    ) {
      alert("Please provide payment information.");
      return;
    }

    alert(`✅ Order Confirmed for ${userInfo.fullName}! Payment via ${paymentMethod.toUpperCase()}`);
    navigate("/");
  };

  if (!name || !price || !image) {
    return <h2 style={{ textAlign: "center" }}>No product selected for checkout.</h2>;
  }

  return (
    <div className="buy-container">
      <h2>Checkout</h2>
      <div className="buy-card">
        <img src={image} alt={name} />
        <div className="buy-details">
          <h3>{name}</h3>
          <p>Price per item: ₹{price}</p>

          <label>
            Quantity:
            <input
              type="number"
              value={quantity}
              min={1}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
            />
          </label>

          <p>Total: ₹{price * quantity}</p>
        </div>
      </div>

      {/* Shipping Details */}
      <div className="user-info">
        <h3>Shipping Details</h3>
        <form>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={userInfo.fullName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={userInfo.address}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={userInfo.phone}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={userInfo.email}
            onChange={handleChange}
            required
          />
        </form>
      </div>

      {/* Payment Details */}
      <div className="payment-info">
        <h3>Payment Method</h3>
        <select value={paymentMethod} onChange={handlePaymentChange}>
          <option value="card">Credit / Debit Card</option>
          <option value="upi">UPI</option>
          <option value="cod">Cash on Delivery</option>
        </select>

        {paymentMethod === "card" && (
          <input
            type="text"
            name="cardNumber"
            placeholder="Card Number"
            maxLength={16}
            value={paymentDetails.cardNumber}
            onChange={handlePaymentDetailChange}
          />
        )}

        {paymentMethod === "upi" && (
          <input
            type="text"
            name="upiId"
            placeholder="UPI ID (e.g., name@upi)"
            value={paymentDetails.upiId}
            onChange={handlePaymentDetailChange}
          />
        )}
      </div>

      <button className="confirm-btn" onClick={handleConfirm}>
        Place Order
      </button>
    </div>
  );
};

export default BuyPage;