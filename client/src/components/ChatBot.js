import React, { useState } from 'react';
import Message from './Message';
import '../stylesheets/ChatBot.css'; // Add CSS styles for chatbot

function ChatBot() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const handleSend = () => {
        if (input.trim() === '') return;

        setMessages([...messages, { text: input, isUser: true }]);
        setInput('');

        setTimeout(() => {
            setMessages([...messages, { text: input, isUser: true }, { text: `You said: "${input}"`, isUser: false }]);
        }, 1000);
    };

    return (
        <div className="message-container">
            {messages.map((msg, index) => (
                <Message key={index} text={msg.text} isUser={msg.isUser} />
            ))}
            <div className="chatbot-container">
                <div className="chatbot-input">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Type a message..."
                    />
                    <button onClick={handleSend}>Send</button>
                </div>
            </div>
        </div>
    );
}

export default ChatBot;
