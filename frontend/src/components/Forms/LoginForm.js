import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import './Form.css';
import { NavLink, useLocation } from 'react-router-dom';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const { login } = useContext(AuthContext);
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
        const errorData = await response.json();
        const newErrors = { ...formErrors };
        if (errorData.detail === 'Sign in failed.') {
          newErrors.password = 'Email or password are incorrect';
        } else {
          newErrors.password = 'Please try again later';
        }
        setErrors(newErrors);
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
