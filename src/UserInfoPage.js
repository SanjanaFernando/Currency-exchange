import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './UserInfoPage.css';
import Header from './Header';
const UserInfoPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve the token from localStorage
        const response = await fetch(`http://localhost:5000/user/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch user information');
        }
        const data = await response.json();
        setUser(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token'); // Retrieve the token from localStorage
      const response = await fetch(`http://localhost:5000/user/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to delete user');
      }
      navigate('/login'); // Redirect to login page after deletion
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    
    <div className="UserInfoPage">
      
      <h1>User Info</h1>
      <div>
        
        <p><strong>User ID:</strong> {user.userId}</p>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Amount:</strong> ${user.amount}</p>
        <button className="delete-button" onClick={handleDelete}>Delete Account</button>
      </div>
    </div>
  );
};

export default UserInfoPage;
