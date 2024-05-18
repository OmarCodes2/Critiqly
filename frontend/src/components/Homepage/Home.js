import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <header className="header">
        <div className="logo">critqly</div>
      </header>
      <main className="main-content">
        <h1 className="title">Review better<br />Code Smarter</h1>
        <p className="subtitle">
          Take your code review to the next level with the help of AI-powered feedback
        </p>
        <Link to="/signup">
          <button className="start-button">
            <span className="button-text">Start your journey</span>
          </button>
        </Link>
      </main>
    </div>
  );
};

export default Home;
