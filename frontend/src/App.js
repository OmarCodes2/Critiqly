// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, useLocation } from 'react-router-dom';
import './App.css';
import SignUpForm from './components/Forms/SignUpForm';
import LoginForm from './components/Forms/LoginForm';
import Home from './components/Homepage/Home';

function App() {
  return (
    <Router>
      <div className="app-container">
        <h1 className="heading">
          <span className="blue">Better Reviews,</span>&nbsp;
          <span className="white">Better Code</span>
        </h1>
        <TabContainer />
        <Routes>
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<div>Welcome to the dashboard!</div>} />
        </Routes>
      </div>
    </Router>
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

export default App;
