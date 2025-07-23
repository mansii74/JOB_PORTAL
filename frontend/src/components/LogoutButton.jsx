// src/components/LogoutButton.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear auth tokens / user data from localStorage or cookies
    localStorage.removeItem('token');

    // Optionally: clear other localStorage/sessionStorage keys if any
    // localStorage.clear();

    // Redirect user to login or landing page
    navigate('/login');
  };

  return (
    <button onClick={handleLogout} className="btn-logout">
      Logout
    </button>
  );
};

export default LogoutButton;
