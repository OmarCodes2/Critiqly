// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, useLocation } from 'react-router-dom';
import './App.css';
import SignUpForm from './components/Forms/SignUpForm';
import LoginForm from './components/Forms/LoginForm';
import Home from './components/Homepage/Home';
import Dashboard from './components/Dashboard/Dashboard';
import Codereview from './components/Codereview/Codereview';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/codereview" element={<Codereview />} />
        </Routes>
    </Router>
  );
}


export default App;
