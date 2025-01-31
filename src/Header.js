import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { useUser } from './UserContext';
function Header() {
  const { user } = useUser();
  return (
    <header className="home-header">
      <img src="logo.png" alt="Currency Exchange Market" className="logo"/>
      <h1>Currency Exchange Market</h1>
      <nav>
        <button>
          <Link to="/home">Home</Link>
        </button>
        <button>
          <Link to="/exchange">Top Exchange Rates</Link>
        </button>
        <button>
          <Link to="/transaction">Transaction Page</Link>
        </button>
        <button>
          <Link to="/exchange-rates">Exchange Rates Calculator</Link>
        </button>
        <button>
          <Link to={`/userinfo/${user ? user.userId : ''}`}>User Info</Link>
        </button>
      </nav>
    </header>
  );
}

export default Header;
