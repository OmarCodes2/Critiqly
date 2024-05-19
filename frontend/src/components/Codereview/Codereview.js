import React from 'react';
import { useLocation  } from 'react-router-dom';
import './Codereview.css';

const Codereview = () => {
  const location = useLocation();
  const { code } = location.state || {};  // Destructure code from location.state
  return (
    <div className="app">
      hi
    </div>
  );
};

export default Codereview;
