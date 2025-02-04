import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <span className="logo-dot">●</span>
        <span className="logo-text"><i><h2>Diagram</h2></i></span>
      </div>
      
      <div className="nav-group">
        <Link to="/">Home</Link>
        <Link to="/insights">Insights</Link>
        <Link to="/pricing">Pricing</Link>
        <Link to="/setting">Setting</Link>
      </div>
      
      <button className="sign-up-btn">Sign up</button>
    </header>
  );
};

export default Header; 