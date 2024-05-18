import React, { useState } from 'react';
import './Form.css';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dummy request for login
    console.log('Login', { email, password });
    // Add your login request here
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
