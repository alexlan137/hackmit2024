import React from 'react';
import '../stylesheets/ChatBot.css';

function Message({ text, isUser }) {
    return (
            <div className={`message ${isUser ? 'user' : 'bot'}`}>
            {text} </div>
    );
}

export default Message;
