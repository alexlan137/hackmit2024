import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "../stylesheets/ChatLayout.css";
import ChatBot from "./ChatBot.js";
import "../stylesheets/ChatBot.css";
import { get } from "../utilities.js";
import NotLoggedIn from "./not_logged_in.js";

const Library = ({ user }) => {
  const [chats, setChats] = useState([]);

  const GetChatLink = ({ chat_name, chat_id }) => {
    return (
      <div className="subtitle-section">
        <Link to={`/chat/${chat_id}`}>{chat_name}</Link>
        <br />
      </div>
    );
  };

  useEffect(() => {
    get("/api/chat_history").then((chat_headers) => {
      setChats(chat_headers.map(GetChatLink));
    });
  }, []);

  return (
    <div className="left-column">
      <h1 className="right-column-title">Library</h1>
      <div className="subtitle-section">
        {chats}
        <br />
      </div>
    </div>
  );
};

const ChatLayout = ({ user }) => {
  const { chatID } = useParams();

  if (!user._id) return <NotLoggedIn />;

  return (
    <div className="chat">
      <div className="row">
        <div className="left-column">
          <Library user={user} />
        </div>
        <div className="middle-column">
          <h2 className="middle-column-title">Chat now</h2>
          <ChatBot props_chat_id={chatID} />
        </div>
      </div>
    </div>
  );
};

export default ChatLayout;
