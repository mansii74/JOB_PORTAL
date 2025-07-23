import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // ✅ Add this line
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch('http://127.0.0.1:8000/api/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        navigate("/home");
      } else {
        setError(data?.detail || "Invalid username or password.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <h1 className="text-2xl font-bold text-blue-700 mb-4">Login to JobPortal</h1>

      <form onSubmit={handleLogin} className="flex flex-col w-full max-w-md bg-white p-8 border rounded shadow-md">
        <input
          className="mb-4 p-2 border border-gray-300 rounded"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          className="mb-4 p-2 border border-gray-300 rounded"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded transition">
          Login
        </button>

        {error && <p className="text-red-600 text-sm mt-3">⚠ {error}</p>}
      </form>

      <p className="mt-4 text-gray-600">
        New user?{" "}
        <Link className="text-blue-600 font-medium hover:underline" to="/register">
          Register here
        </Link>
      </p>
    </div>
  );
};

export default Login;
