import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from './UserContext';
import './LoginPage.css';

const LoginPage = () => {
  const [userId, setUserId] = useState('');
  const [pwd, setPwd] = useState('');
  const [error, setError] = useState(null);
  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, pwd }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Invalid credentials');
      }

      console.log('Login successful:', data); // Debugging log
      setUser({ userId: data.userId }); // Update the user context with userId
      localStorage.setItem('token', data.token); // Store the JWT token in local storage
      navigate('/home');
    } catch (error) {
      console.error('Login error:', error.message); // Debugging log
      setError(error.message);
    }
  };

  return (
    <div className="LoginPageContainer">
      <h1 className="MarketTitle">Currency Exchange Market</h1>
      <div className="LoginPage">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <label>
            User ID:
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              required
            />
          </label>
          <button type="submit">Login</button>
        </form>
        {error && <p>{error}</p>}
        <Link to="/signup">
          <button className="go-to-signup-button">Go to Sign In Page</button>
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
