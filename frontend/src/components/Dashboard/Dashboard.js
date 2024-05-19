import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLevelClick = async (level) => {
    console.log(process.env.REACT_APP_API_URL)
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/LoadLevel?difficulty=${level}`);
      const data = await response.json();
      const code = data[0]
      console.log(code);
      navigate('/codereview', { state: { code } });
    } catch (error) {
      console.error('Error fetching level data:', error);
    }
  };

  return (
    <div className="dashboard-container">
      <h1>
        Ready to step up your <span className="highlight">code review</span> game?
      </h1>
      <h2>Choose your <span className="highlight">level:</span></h2>
      <div className="levels">
        <div className="level easy" onClick={() => handleLevelClick('easy')}>
          <span className="level-tag">Easy</span>
        </div>
        <div className="level medium" onClick={() => handleLevelClick('medium')}>
          <span className="level-tag">Medium</span>
        </div>
        <div className="level hard" onClick={() => handleLevelClick('hard')}>
          <span className="level-tag">Hard</span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
