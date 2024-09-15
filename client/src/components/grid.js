import React, {useState} from 'react';
import '../stylesheets/grid.css';
import { useNavigate } from 'react-router-dom'; 

const Grid = () => {
  const items = [
    { src: "https://www.livemint.com/lm-img/img/2024/09/11/600x338/AP09-11-2024-000003B-0_1726024287672_1726024301546.jpg", title: 'Presidential Debate', text: 'Donald Trump vs. Kamala Harris debate goes viral - conflicting views on the recent presidential debate raises concerns over...' },
    { src: "https://www.bankatfirst.com/content/dam/bankatfirst/personal/discover/flourish/interest-rates-rising-article-1536x755.jpg", title: 'Interest Rates', text: "Central Bank Raises Interest Rates in a Bold Move to Combat Inflation. The new rate hike will impact borrowing costs..." },
    { src: 'https://a57.foxnews.com/static.foxbusiness.com/foxbusiness.com/content/uploads/2021/05/1862/1012/Credible-home-mortgage-rate-iStock-640163076.jpg?ve=1&tl=1', title: 'Mortgage Rates', text: 'When applying for a home loan, one of the most important factors you should pay attention to is your interest rate. Having...' },
    { src: 'https://www.ft.com/__origami/service/image/v2/images/raw/ftcms%3Ab51b0bf4-b4fe-11e8-a1d8-15c2dd1280ff?source=next-article&fit=scale-down&quality=highest&width=700&dpr=2', title: 'US-China Trade War', 
      text: "Trade wars are good, and easy to win. Donald Trump's breezy tweet of last..." },
    { src: "https://d9-wret.s3.us-west-2.amazonaws.com/assets/palladium/production/s3fs-public/styles/full_width/public/media/images/20240810_20240822_seismo%2Bifg.png?itok=XMyolNz6", title: 'Volcanic Watch', text: "Since July 2024 activity, at Kīlauea has been punctuated by two periods of intense..." },
    { src: "https://media.cnn.com/api/v1/images/stellar/prod/whatsapp-image-2024-09-13-at-8-55-21-am.jpg?q=w_1110,c_fill/f_webp", title: 'North Korea', text: "North Korea releases images of Kim Jong Un visiting a uranium enrichment site, giving rare glimpse..." },
    { src: "https://media.cnn.com/api/v1/images/stellar/prod/gettyimages-2169500008.jpg?c=16x9&q=h_653,w_1160,c_fill/f_webp", title: 'Mexican Elections', text: "Mexican President Andrés Manuel López Obrador has long been critical of his country's..."},
    { src: "https://media.cnn.com/api/v1/images/stellar/prod/credit-denise-baker-image-juststopoil-chrispcressie021-49.jpg?q=w_2000,c_fill/f_webp", title: 'Climate Change', text: "As right-wing rioters attacked communities with racist violence across parts of the UK last..." },
    { src: "https://media.cnn.com/api/v1/images/stellar/prod/still-20942651-1577572-5999999999-still.jpg?c=16x9&q=h_653,w_1160,c_fill/f_webp", title: 'Voters', text: "Nearing the end of the annual Navajo Nation parade route last Saturday, the Arizona Republican..." },
  ];

  const navigate = useNavigate();
  const [popupContent, setPopUpContent] = useState(null);

  const handleclick = (details) => {
    setPopUpContent(details);
    navigate('/article'); 
  };

  const handleclose = () => {
    setPopUpContent(null);
  };

  return (
    <div className="grid-container">
      <h1 className ="page-title">Portfolio</h1> {}
      <h1 className="page-subtitle">Saved articles & research</h1> {}
      <div className="grid">
      {items.map((item, index) => (
        <button className="grid-item" onClick={() => handleclick()} key={index}>
          <img src={item.src} alt={item.title} />
          <h3> {item.title} </h3>
          <p> {item.text} </p>
        </button>
      ))}
    </div>
    popupContent && (
        <div className="popup-overlay" onClick={handleclose}>
            <div className="popup-content" onClick={e => e.stopPropagation()}>
                <span className="popup-close" onClick={handleclose}>&times;</span>
                <div>{popupContent}</div>
            </div>
        </div>
      )
    </div>
  );
};

export default Grid;
