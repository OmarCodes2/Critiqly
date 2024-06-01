import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import logoPath from '../../assets/images/Homepage/logo.png';
import imagePath from '../../assets/images/Homepage/buttom_image.png';

const Home = () => {
  return (
    <div className="home-container">
      <header className="header">
        <div className="left-container">
        <img src={logoPath} alt="Logo" className="logo-image" />
        <div className="logo">Critqly</div>
        </div>
      </header>
      <main className="main-content">
        <h1 className="title">Review <span className="highlight">Better</span><br />Code <span className="highlight">Smarter</span></h1>
        <p className="text-[18px] text-black text-opacity-80">
          Take your code review to the next level with the help of AI-powered feedback
        </p>
        <Link to="/signup">
          <button className="start-button">
            <img src={logoPath} alt="Logo" className="logo-image" />
            <span className="button-text">Start your journey</span>
          </button>
        </Link>
        <img src={imagePath} alt="" className="bottom-image" />
      </main>
    </div>
  );
};

export default Home;
