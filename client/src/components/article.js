import React from "react";
import "../stylesheets/article.css"

const Article = ({ loggedIn, user }) => {
    const curr_article = [
        {title: "Hello world!", body: "This is my current article"}
    ]
  return <div className="article-container">
    <h1 className="article-title"> This Article</h1> {}
    <h1 className="article-subtitle"> Subtitle</h1>
    <div className="article">
        <h1>{curr_article.title}</h1>
    </div>
  </div>;
};

export default Article;
