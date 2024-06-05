import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Form.css';
import { NavLink, useLocation } from 'react-router-dom';

function SignUpForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [preferredName, setPreferredName] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (!preferredName) {
      newErrors.preferredName = 'Preferred name is required';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, preferredName }),
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
        <div className="input-group">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div className="input-group">
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>
        <div className="input-group">
          <input
            placeholder="Enter your preferred name"
            value={preferredName}
            onChange={(e) => setPreferredName(e.target.value)}
          />
          {errors.preferredName && <p className="error">{errors.preferredName}</p>}
        </div>
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
