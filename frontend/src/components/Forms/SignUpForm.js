import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Form.css';

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
  );
}

export default SignUpForm;
