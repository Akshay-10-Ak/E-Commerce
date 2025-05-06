import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/userslice";
import { useNavigate, Link } from "react-router-dom";
import "./auth.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // In real app, validate via backend
    const dummyUser = { email };
    dispatch(loginSuccess(dummyUser));

    // Store user info
    localStorage.setItem("user", JSON.stringify(dummyUser));

    // ✅ Navigate to Home Page
    navigate("/home");
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>

      <p>Don't have an account? <Link to="/register">Sign up</Link></p>
    </div>
  );
};

export default Login;
