import React from 'react';
import '../stylesheets/ChatLayout.css';

const ChatLayout = () => {
    return (
      <div className='chat'>
        <div className='row'>
          <div className='left-column'>
            Some Text in Column One
          </div>
          <div className='middle-column'>
            <h2 className='middle-column-title'>Chat now</h2>
            <h3 className='middle-column-subtitle'>The latest unbiased news at your fingertips</h3>
            Some Text in Column Two
          </div>
          <div className='right-column'>
            Some Text in Column Three
          </div>
        </div>
      </div>
    );
  };

export default ChatLayout;
