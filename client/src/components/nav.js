import React from 'react';
import '../stylesheets/nav.css'; // Import the CSS file
import Grid from './grid';

const Nav = ({ loggedIn, handleLogin, handleLogout }) => {
  return (
    <div className="navbar">
      { /* content */
      }
      {loggedIn ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
};

export default Nav;

