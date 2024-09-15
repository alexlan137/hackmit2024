import React from 'react';
import '../stylesheets/ChatLayout.css';
import ChatBot from './ChatBot.js';
import '../stylesheets/ChatBot.css';

const ChatLayout = () => {
    return (
      <div className='chat'>
        <div className='row'>
          <div className='left-column'>
          </div>
          <div className='middle-column'>
            <h2 className='middle-column-title'>Chat now</h2>
            <ChatBot />
          </div>
          <div className='right-column'>
            Some Text in Column Three
          </div>
        </div>
      </div>
    );
  };

export default ChatLayout;
