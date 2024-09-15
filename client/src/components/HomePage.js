import React from 'react';
import { Link } from 'react-router-dom';
import '../stylesheets/HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page-container">
      <h1 className="title">Single Source of Truth</h1>
      <p className="subheader">Unbiasing today's media</p>
      <Link to="/chat" className="button">ACCESS NOW</Link>
      <div className="image-container">
        <img src="/path/to/your/image.jpg" alt="Large descriptive image" className="image" />
      </div>
    </div>
  );
};

export default HomePage;
