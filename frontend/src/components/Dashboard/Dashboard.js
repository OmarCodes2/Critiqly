import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import imagepath from './codereview.png';
import imagepath1 from './codereview (1).png';
import imagepath2 from './codereview (2).png';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLevelClick = async (level) => {
    console.log(process.env.REACT_APP_API_URL)
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/LoadLevel?repo=${level}`);
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
        <div className="level easy" onClick={() => handleLevelClick('easy_example')}>
          <span className="level-tag">Easy</span>
          <img src={imagepath} alt="Logo" style={{ width: '75%', height: '75%', objectFit: 'contain' }}/>
        </div>
        <div className="level medium" onClick={() => handleLevelClick('medium')}>
          <span className="level-tag">Medium</span>
          <img src={imagepath1} alt="Logo" style={{ width: '75%', height: '75%', objectFit: 'contain' }}/>
        </div>
        <div className="level hard" onClick={() => handleLevelClick('hard')}>
          <span className="level-tag">Hard</span>
          <img src={imagepath2} alt="Logo" style={{ width: '75%', height: '75%', objectFit: 'contain' }}/>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
