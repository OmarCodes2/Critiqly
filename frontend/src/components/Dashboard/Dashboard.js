import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div>
        <Link to="/signup">
          <button className="start-button">
            <span className="button-text">Easy</span>
          </button>
        </Link>
    </div>
  );
};

export default Dashboard;
