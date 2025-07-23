import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/Register.css';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/register/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, email }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        navigate('/');
      } else {
        setError(data?.error || 'Something went wrong. Please try with a different username.');
      }
    } catch (err) {
      setError('Server error. Please try again.');
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2 className="text-2xl font-bold mb-6 text-blue-700 text-center">
          Create a JobPortal Account
        </h2>

        <form className="register-form" onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Username"
            className="block border border-gray-300 p-2 mb-4 w-full rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="block border border-gray-300 p-2 mb-4 w-full rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            className="block border border-gray-300 p-2 mb-4 w-full rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded w-full transition"
          >
            Register
          </button>

          {error && <p className="text-red-600 mt-4 text-sm">⚠ {error}</p>}
        </form>
      </div>
    </div>
  );
}

export default Register;
