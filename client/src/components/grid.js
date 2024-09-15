// src/Grid.js
import React, {useState} from 'react';
import '../stylesheets/grid.css';
import { useNavigate } from 'react-router-dom';

const Grid = () => {
  const items = [
    { src: 'https://via.placeholder.com/150', title: 'Presidential Debate', text: 'Donald Trump vs. Kamala Harris debate goes viral - conflicting views on the recent presidential debate raises concerns over...' },
    { src: 'https://via.placeholder.com/150', title: 'Title 2', text: 'Description 2' },
    { src: 'https://via.placeholder.com/150', title: 'Title 3', text: 'Description 3' },
    { src: 'https://via.placeholder.com/150', title: 'Title 4', text: 'Description 4' },
    { src: 'https://via.placeholder.com/150', title: 'Title 4', text: 'Description 4' },
    { src: 'https://via.placeholder.com/150', title: 'Title 4', text: 'Description 4' },
    { src: 'https://via.placeholder.com/150', title: 'Title 4', text: 'Description 4' },
    { src: 'https://via.placeholder.com/150', title: 'Title 4', text: 'Description 4' },
    { src: 'https://via.placeholder.com/150', title: 'Title 4', text: 'Description 4' },
  ];

  const [popUpContent, setPopUpContent] = useState(null);

  const handleclick = (details) => {
    setPopUpContent(details);
  };

  const handleclose = () => {
    setPopUpContent(null);
  };

  return (
    <div className="grid-container">
      <h1 className ="page-title">Single Source of Truth</h1> {}
      <h1 className="page-subtitle">Discovering Politics in an Unbiased Way</h1> {}
      <div className="grid">
      {items.map((item, index) => (
        <button className="grid-item" onClick={() => handleclick(item.text)} key={index}>
          <img src={item.src} alt={item.title} />
          <h3> {item.title} </h3>
          <p> {item.text} </p>
        </button>
      ))}
    </div>
    {popupContent && (
        <div className="popup-overlay" onClick={handleclose}>
            <div className="popup-content" onClick={e => e.stopPropagation()}>
                <span className="popup-close" onClick={handleClosePopup}>&times;</span>
                <div>{popupContent}</div>
            </div>
        </div>
      )}
    </div>
  );
};

export default Grid;
