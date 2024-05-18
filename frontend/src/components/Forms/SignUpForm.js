import React, { useState } from 'react';
import './Form.css';

function SignUpForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dummy request for sign-up
    console.log('Sign Up', { email, password, name });
    // Add your sign-up request here
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
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button className="submit-btn" type="submit">Sign Up</button>
    </form>
  );
}

export default SignUpForm;
