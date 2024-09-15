import React from 'react';
import '../stylesheets/ChatLayout.css';
import ChatBot from './ChatBot.js';
import '../stylesheets/ChatBot.css';

const ChatLayout = () => {
    return (
      <div className='chat'>
        <div className='row'>
          <div className='left-column'>
          <h1 className="right-column-title">Library</h1>
          <div className="subtitle-section">
              <p className="hover-text">Trump-Harris debate</p>
            </div>
            <div className="subtitle-section">
              <p className="hover-text">Climate change lawsuit</p>
            </div>
            <div className="subtitle-section">
              <p className="hover-text">Gun control</p>
            </div>
            <div className="subtitle-section">
              <p className="hover-text">Healthcare reform</p>
            </div>
            <div className="subtitle-section">
              <p className="hover-text">Waivers for DACA</p>
            </div>
          </div>
          <div className='middle-column'>
            <h2 className='middle-column-title'>Chat now</h2>
            <ChatBot />
          </div>
          <div className='right-column'>
            <h1 className="right-column-title">Trending Topics</h1>
            <div className="subtitle-section">
              <h2 className="right-subtitle">Google Ad Auction Technology</h2>
              <p className="right-subtitle-text">Can you summarize the key points of the antitrust case against Google regarding its ad auction technology?</p>
            </div>
            <div className='hr'/>
            <div className="subtitle-section">
              <h2 className="right-subtitle">Boeing Worker Strike</h2>
              <p className="right-subtitle-text">What are the main reasons behind the ongoing Boeing strike, and what are the workers and union leaders demanding?</p>
            </div>
            <div className='hr'/>
            <div className="subtitle-section">
              <h2 className="right-subtitle">NYPD Commissioner Resigns</h2>
              <p className="right-subtitle-text">Can you provide details on the recent resignation of New York City Police Commissioner Edward Caban?</p>
            </div>
          </div>
        </div>
      </div>
    );
};

export default ChatLayout;
