import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Form.css';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
        navigate('/dashboard');
      } else {
        console.error('Sign in failed');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
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
      <button className="submit-btn" type="submit">Sign In</button>
    </form>
  );
}

export default LoginForm;
