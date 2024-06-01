// src/components/Forms/LoginForm.js
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import './Form.css';
import { NavLink, useLocation } from 'react-router-dom';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        const data = await response.json();
        login(data.user);
        navigate('/dashboard');
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div className="app-container">
      <h1 className="heading">
        <span className="blue">Welcome Back,</span>&nbsp;
        <span className="white">Log In</span>
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
        <button className="submit-btn" type="submit">Log In</button>
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

export default LoginForm;
