import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import './App.css';
import SignUpForm from './components/Forms/SignUpForm';
import LoginForm from './components/Forms/LoginForm';

function App() {
  return (
    <Router>
      <div className="container">
        <h1>Better Reviews, Better Code</h1>
        <div className="tab-container">
          <NavLink
            to="/signup"
            className={({ isActive }) => isActive ? 'tab-button active' : 'tab-button'}
          >
            Sign Up
          </NavLink>
          <NavLink
            to="/login"
            className={({ isActive }) => isActive ? 'tab-button active' : 'tab-button'}
          >
            Login
          </NavLink>
        </div>
        <Routes>
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/" element={<SignUpForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
