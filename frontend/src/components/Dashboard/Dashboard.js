import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h1>
        Hey <span className="highlight">Sarah!</span> Ready to step up your <span className="highlight">code review</span> game?
      </h1>
      <h2>Choose your level!</h2>
      <div className="levels">
        <div className="level beginner">
          <span className="level-tag">Beginner</span>
        </div>
        <div className="level medium">
          <span className="level-tag">Medium</span>
        </div>
        <div className="level hard">
          <span className="level-tag">Hard</span>
        </div>
      </div>
      <Link to="/codereview">
        <button className="next-button">
          <span className="button-text">Next</span>
        </button>
      </Link>
    </div>
  );
};

export default Dashboard;
