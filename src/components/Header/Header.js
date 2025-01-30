import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <h1><i>Diagram  </i></h1>
      </div>
      <div className="header-center">
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/insights">Insights</a></li>
            <li><a href="/pricing">Pricing</a></li>
            <li><a href="/login">Login</a></li>
          </ul>
        </nav>
      </div>
      <div className="header-right">
        <button className="signup-btn">Sign up</button>
      </div>
    </header>
  );
};

export default Header; 