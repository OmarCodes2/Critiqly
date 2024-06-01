import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Form.css';
import { NavLink, useLocation } from 'react-router-dom';

function SignUpForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        navigate('/login');
      } else {
        console.error('Sign up failed');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div className="app-container">
      <h1 className="heading">
          <span className="blue">Better Reviews,</span>&nbsp;
          <span className="white">Better Code</span>
        </h1>
        <TabContainer />
    <form className="form-container" onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="submit-btn" type="submit">Sign Up</button>
    </form>
    </div>
  );
}

function TabContainer() {
  const location = useLocation();
  const showTabs = location.pathname === '/signup' || location.pathname === '/login';

  return (
    <div className="tab-container">
      {showTabs && (
        <>
          <NavLink
            to="/signup"
            className={({ isActive }) => (isActive ? 'tab-button active' : 'tab-button')}
          >
            Sign Up
          </NavLink>
          <NavLink
            to="/login"
            className={({ isActive }) => (isActive ? 'tab-button active' : 'tab-button')}
          >
            Login
          </NavLink>
        </>
      )}
    </div>
  );
}

export default SignUpForm;
