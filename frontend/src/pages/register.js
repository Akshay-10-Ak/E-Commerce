import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/userslice";
import { useNavigate } from "react-router-dom";
import "./auth.css";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    address: "",
    gender: "",
    dob: "",
    country: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, mobile, password, confirmPassword } = formData;

    if (!name || !email || !mobile || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const newUser = { name, email, mobile };
    dispatch(loginSuccess(newUser));
    navigate("/");
  };

  return (
    <div className="auth-container">
      <h2>Create Account</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Full Name" name="name" value={formData.name} onChange={handleChange} />
        <input type="email" placeholder="Email" name="email" value={formData.email} onChange={handleChange} />
        <input type="tel" placeholder="Mobile Number" name="mobile" value={formData.mobile} onChange={handleChange} />
        <input type="password" placeholder="Password" name="password" value={formData.password} onChange={handleChange} />
        <input type="password" placeholder="Confirm Password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
        <textarea placeholder="Address" name="address" value={formData.address} onChange={handleChange}></textarea>
        
        <div className="gender-group">
          <label><input type="radio" name="gender" value="Male" onChange={handleChange} /> Male</label>
          <label><input type="radio" name="gender" value="Female" onChange={handleChange} /> Female</label>
          <label><input type="radio" name="gender" value="Other" onChange={handleChange} /> Other</label>
        </div>

        <input type="date" name="dob" value={formData.dob} onChange={handleChange} />

        <select name="country" value={formData.country} onChange={handleChange}>
          <option value="">Select Country</option>
          <option value="India">India</option>
          <option value="USA">USA</option>
          <option value="UK">UK</option>
          <option value="Canada">Canada</option>
        </select><br/><br/>

        <button type="submit">Sign Up</button>
      </form>
      <p>Already registered? <a href="/login">Log in</a></p>
    </div>
  );
};

export default Signup;
