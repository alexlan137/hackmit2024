import React from 'react';
import '../stylesheets/Chat.css';

const Chat = () => {
    return (
      <div className='chat'>
        <div className='row'>
          <div className='left-column'>
            Some Text in Column One
          </div>
          <div className='middle-column'>
            <h2 className='Chat now'>Title</h2>
            <h3 className='middle-column-subtitle'>Subtitle</h3>
            Some Text in Column Two
          </div>
          <div className='right-column'>
            Some Text in Column Three
          </div>
        </div>
      </div>
    );
  };

export default Chat;
