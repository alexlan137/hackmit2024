import React from "react";
import { Link } from "react-router-dom";
import "../stylesheets/HomePage.css";
import image from "../../dist/assets/rotating_globe.png";

const HomePage = () => {
  return (
    <div className="home-page-container">
      <h1 className="title">Clarity.ai</h1>
      <p className="subheader">debiasing modern media.</p>
      <Link to="/chat/new_chat" className="button">
        GET STARTED
      </Link>
      <div className="image-container">
        <img src={image} alt="Main home page img" className="image" />
      </div>
    </div>
  );
};

export default HomePage;
