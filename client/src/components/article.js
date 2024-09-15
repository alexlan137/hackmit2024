import React from "react";
import "../stylesheets/article.css"
import { useLocation } from 'react-router-dom';

const Article = () => {
  const location = useLocation();
  const { state } = location;

  const { loggedIn, user, article } = state || {};

  return <div className="article-container">
    <h1 className="article-title"> {article?.title || "Default Title"} </h1>
    <h2 className="article-subtitle"> {link} </h2>
    <div className="article">
        <h1>{curr_article.title}</h1>
    </div>
  </div>;
};

export default Article;
