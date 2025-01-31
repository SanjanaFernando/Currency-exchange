import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SignInPage.css';
import Header from './Header';

function SignInPage() {
  const [userId, setUserId] = useState('');
  const [username, setUsername] = useState(''); // Add this state
  const [pwd, setPwd] = useState('');
  const [message, setMessage] = useState('');

  const handleSignUp = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/signup', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, username, pwd }), // Include username
      });

      const result = await response.json();

      if (response.ok) {
        setMessage(result.message);
        // Optionally, redirect to the login page or another page
      } else {
        setMessage(result.message);
      }
    } catch (error) {
      setMessage('Error occurred while signing up');
    }
  };

  return (
    <div className="SignInPageContainer">
      <h1 className="MarketTitle">Currency Exchange Market</h1>
      <div className="SignInPage">
        <h2>Sign Up</h2>
        <form onSubmit={handleSignUp}>
          <div>
            <label>
              User ID:
              <input
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Username:
              <input
                type="text"
                value={username} // Bind the username state
                onChange={(e) => setUsername(e.target.value)} // Update the username state
                required
              />
            </label>
          </div>
          <div>
            <label>
              Password:
              <input
                type="password"
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
                required
              />
            </label>
          </div>
          <button type="submit">Sign Up</button>
        </form>
        {message && <p>{message}</p>}
        <p>Already have an account? <Link to="/">Login</Link></p>
      </div>
    </div>
  );
}

export default SignInPage;
