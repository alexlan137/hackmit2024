import React, { useState, useEffect, useCallback } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { GoogleOAuthProvider } from "@react-oauth/google";

import "../stylesheets/App.css";
import "../utilities.css";
// important that App.ccs and utilities.css are imported before React components! This is so that the "default" CSS files are compiled first, thus component-specific CSS files have higher precedence

import { get, post } from "../utilities.js";

import HomePage from "./HomePage.js";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import Grid from "./grid.js";
import ChatLayout from "./ChatLayout.jsx"

const GOOGLE_CLIENT_ID = "363037912379-0hk5ir8ntacgscrv0j3a3vkn2d4l8eef.apps.googleusercontent.com";

const App = () => {
  const [user, setUser] = useState({}); //user = {} if logged out; full object if logged in
  //to checked if logged in: check if user._id is truthy or falsy

  const init = () => {
    get("/api/who_am_i").then((user_doc) => setUser(user_doc));
  };

  useEffect(() => init(), []);

  const handleLogin = (credentialResponse) => {
    const userToken = credentialResponse.credential;
    const decodedCredential = jwt_decode(userToken);
    console.log(`Logged in as ${decodedCredential.name}`);
    post("/api/login", { token: userToken }).then(() => init());
  };

  const handleLogout = () => {
    post("/api/logout").then(() => init());
    console.log("Logged out successfully!");
  };

  return (
    <BrowserRouter>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <Header
          loggedIn={Boolean(user._id)}
          handleLogin={handleLogin}
          handleLogout={handleLogout}
        />
        <Routes>
          <Route path="/" element={<HomePage loggedIn={Boolean(user._id)} user={user} />} />
          <Route path="/portfolio" element={<Grid/>} />
          <Route path="/chat" element={<ChatLayout/>} />
          <Route path="/login" element={<HomePage/>} />
        </Routes>
        <Footer />
      </GoogleOAuthProvider>
    </BrowserRouter>
  );
};

export default App;
