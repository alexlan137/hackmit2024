import React from 'react';
import { Link } from 'react-router-dom';
import '../stylesheets/HomePage.css';
import image from '../../dist/assets/rotating_globe.png';

const HomePage = () => {
  return (
    <div className="home-page-container">
      <h1 className="title">Single Source of Truth</h1>
      <p className="subheader">Unbiasing today's media</p>
      <Link to="/chat" className="button">ACCESS NOW</Link>
      <div className="image-container">
        <img src={image} alt="Main home page img" className="image" />
      </div>
    </div>
  );
};

export default HomePage;
