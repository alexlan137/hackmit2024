import React, { useState, useEffect } from "react";
import Message from "./Message";
import "../stylesheets/ChatBot.css"; // Add CSS styles for chatbot
import { get, post, generateRandomString } from "../utilities.js";

function ChatBot({ props_chat_id }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [chatID, setChatID] = useState(props_chat_id);

  const initChat = (chat_id) => {
    setInput("");
    setChatID(chat_id);
    if (chat_id == "new_chat") {
      setMessages([]);
      return;
    }
    get("/api/chat", { chat_id: chat_id }).then(({ prompts, responses }) => {
      if (prompts == undefined) return;
      let message_list = [];
      for (let i = 0; i < prompts.length; i++) {
        message_list.push({ content: prompts[i], isUser: true });
        message_list.push({ content: responses[i], isUser: false });
      }
      setMessages(message_list);
    });
  };
  useEffect(() => {
    console.log("called");
    initChat(props_chat_id);
  }, [props_chat_id]);

  const handleSend = () => {
    if (input.trim() === "") return;

    setInput("");
    setMessages([...messages, { content: input, isUser: true }]);
    setTimeout(
      () =>
        setMessages([
          ...messages,
          { content: input, isUser: true },
          {
            content: "Generating response...",
            isUser: false,
          },
        ]),
      500
    );
    if (chatID == "new_chat") {
      const new_chat_id = generateRandomString(10);
      console.log(new_chat_id);
      post("/api/prompt", { prompt: input, chat_id: new_chat_id }).then(() =>
        initChat(new_chat_id)
      );
    } else {
      post("/api/prompt", { prompt: input, chat_id: chatID }).then(() => initChat(chatID));
    }
  };

  return (
    <div className="message-container">
      {messages.map((msg, index) => (
        <Message key={index} content={msg.content} isUser={msg.isUser} />
      ))}
      <div className="chatbot-container">
        <div className="chatbot-input">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type a message..."
          />
          <br />
          <div className="u-flex u-justify-end">
            <button onClick={handleSend} className="send-button">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatBot;
