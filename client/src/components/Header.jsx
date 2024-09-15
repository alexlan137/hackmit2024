import React from 'react';
import { Link } from 'react-router-dom';
import '../stylesheets/Header.css'
import logo from '../../dist/assets/ssot_logo_transparent.png';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
      <img src={logo} alt="Company Logo" className="footer-logo" />
      </div>
      <nav className="nav">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/portfolio">Portfolio</Link></li>
          <li><Link to="/article">Article</Link></li>
          <li><Link to="/chat">Chat</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
