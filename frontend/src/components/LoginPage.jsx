import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../style/LoginPage.css";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/api/login/", {
        username,
        password,
      });
      localStorage.setItem("token", res.data.token);
      navigate("/home");
    } catch (err) {
      alert("Login failed: " + (err.response?.data?.detail || "Unknown error"));
    }
  };

  return (
    <div className="login-bg">
      <div className="login-card">
        <h1 className="login-welcome-title">Welcome to JobPortal</h1>
        <h3 className="login-title">Login to Your JobPortal Account</h3>
        <form className="login-form" onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Email ID or Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="login-input"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
            required
          />
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
        <div className="login-footer">
          <Link to="/forgot-password" className="login-link">
            Forgot Password?
          </Link>
          <span> | </span>
          <Link to="/register" className="login-link">
            Register for free
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
