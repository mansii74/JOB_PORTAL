import React, { useEffect, useState } from 'react';
import '../style/Profile.css';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');

  const fetchProfile = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('You are not logged in.');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/profile/', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch profile');
      }

      const data = await response.json();
      setProfile(data);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="profile-container">
      <h2>👤 Your Profile</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {profile ? (
        <ul>
          <li><strong>Username:</strong> {profile.username}</li>
          <li><strong>Email:</strong> {profile.email}</li>
        </ul>
      ) : (
        !error && <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
