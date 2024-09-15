import React from "react";

const NotLoggedIn = () => {
  return (
    <div className="page-container">
      <p className="u-xl u-fit-content">Not logged in!</p>
      <div className="linebreak-2"></div>
      <p className="u-mm">
        You are trying to access a page that is only accessible for logged in users. To access this
        page, please sign in using Touchstone.
      </p>
    </div>
  );
};

export default NotLoggedIn;
