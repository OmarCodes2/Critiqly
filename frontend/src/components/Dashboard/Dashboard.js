import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLevelClick = async (level) => {
    try {
      // const response = await fetch(`${process.env.REACT_APP_API_URL}/LoadLevel`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({level}),
      // });
      // const data = await response.json();
      // console.log(data)
      let data = "hello"
      navigate('/codereview', { state: { data } });
    } catch (error) {
      console.error('Error fetching level data:', error);
    }
  };

  return (
    <div className="dashboard-container">
      <h1>
        Ready to step up your <span className="highlight">code review</span> game?
      </h1>
      <h2>Choose your level!</h2>
      <div className="levels">
        <div className="level beginner" onClick={() => handleLevelClick('easy')}>
          <span className="level-tag">Beginner</span>
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
