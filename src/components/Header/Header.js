import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <Link to="/">Survey Builder</Link>
        </div>
        
        <nav className="nav-menu">
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/insights">Insights</Link>
            <Link to="/pricing">Pricing</Link>
            <Link to="/setting">Setting</Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header; 