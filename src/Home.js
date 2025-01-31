// Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from './UserContext'; // Import useUser hook
import Header from './Header';
import './Home.css';

function Home() {
  const { user } = useUser(); // Get user from context

  return (
    <div className="home-container">
      <Header />
      <main className="home-main">
        <div className="features">
          <div className="feature">
            <img src="feature1.jpg" alt="Feature 1"/>
            <h3>Transaction</h3>
            <p>Transfer your currencies safely</p>
            <Link to="/transaction">
              <button className="feature-button">Go to Transaction</button>
            </Link>
          </div>
          <div className="feature">
            <img src="feature2.jpg" alt="Feature 2"/>
            <h3>Top Currencies</h3>
            <p>Check out what are the strong currencies</p>
            <Link to="/exchange">
              <button className="feature-button">View Exchange Rates</button>
            </Link>
          </div>
          <div className="feature">
            <img src="feature3.jpg" alt="Feature 3"/>
            <h3>Currency Calculator</h3>
            <p>Compare the Currency Pairs</p>
            <Link to="/exchange-rates">
              <button className="feature-button">Use Calculator</button>
            </Link>
          </div>
          <div className="feature">
            <img src="feature4.jpg" alt="Feature 4"/>
            <h3>User Info</h3>
            <p>View your user information</p>
            <Link to={`/userinfo/${user ? user.userId : ''}`}>
              <button className="feature-button">Go to User Info</button>
            </Link>
          </div>
        </div>
      </main>
      <footer className="home-footer">
        <p>&copy; 2024 Currency Exchange Market. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
