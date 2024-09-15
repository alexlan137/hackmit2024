import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate, Link } from "react-router-dom";
import "../stylesheets/Header.css";
import logo from "../../dist/assets/ssot_logo_transparent.png";

const Header = ({ loggedIn, handleLogin, handleLogout }) => {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="Company Logo" className="footer-logo" />
      </div>
      <nav className="nav">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/portfolio">Portfolio</Link>
          </li>
          <li>
            <Link to="/chat/new_chat">Chat</Link>
          </li>
          {loggedIn ? (
            <button
              onClick={() => {
                handleLogout();
                navigate("/");
              }}
            >
              Logout
            </button>
          ) : (
            <GoogleLogin
              onSuccess={handleLogin}
              onError={(err) => console.log(err)}
              id="GoogleLogin"
            />
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
