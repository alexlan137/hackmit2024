import React from 'react';
import logo from '../..dist/favicon.ico'; // Adjust the path as needed
import '../stylesheets/Footer.css'; // We'll create this next

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <img src={logo} alt="Company Logo" className="footer-logo" />
      </div>
    </footer>
  );
};

export default Footer;
