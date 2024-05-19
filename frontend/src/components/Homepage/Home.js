import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import imagePath from './Group 1597880729.png';
import logoPath from './Vector (1).png';
import logoPath2 from './Vector.png';

const Home = () => {
  return (
    <div className="home-container">
      <header className="header">
        <img src={logoPath} alt="Logo" className="logo-image" />
        <div className="logo">Critqly</div>
      </header>
      <main className="main-content">
        <h1 className="title">Review <span className="highlight">Better</span><br />Code <span className="highlight">Smarter</span></h1>
        <p className="subtitle">
          Take your code review to the next level with the help of AI-powered feedback
        </p>
        <Link to="/signup">
          <button className="start-button">
            <img src={logoPath2} alt="Logo" className="logo-image" />
            <span className="button-text">Start your journey</span>
          </button>
        </Link>
        <img src={imagePath} alt="Bottom Image" className="bottom-image" />
      </main>
    </div>
  );
};

export default Home;
