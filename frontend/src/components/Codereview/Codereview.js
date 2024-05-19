import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Codereview.css';
import logoPath from './Vector (1).png';

const Codereview = () => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'How do I improve this function?' },
    { sender: 'user', text: 'You can start by adding docstrings and type hints.' },
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      setMessages([...messages, { sender: 'user', text: inputValue }]);
      setInputValue('');
    }
  };
  const navigate = useNavigate();
  const handleProblemsClick = () => {
      navigate('/dashboard');
  };
  return (
    <div className="container">
      <header className="header">
        <div className="left-container">
          <img src={logoPath} alt="Logo" className="logo-image" />
          <div className="logo">critqly</div>
        </div>
        <button className="problems-button" onClick={handleProblemsClick}>Problems</button>
      </header>
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Hawkhacks</h2>
        <div className="file-list">
          <div className="file-item">review.py</div>
          <div className="file-item">README.md</div>
        </div>
      </div>
      
      {/* Code Review Section */}
      <div className="code-review">
        <h2>Code Review</h2>
        <pre>
          <code>
            {`
# Some example Python code for review
def example_function():
    print("Hello, world!")
    return True
            `}
          </code>
        </pre>
      </div>
      
      {/* Chatbot Section */}
      <div className="chatbot">
      <h2>Chatbot</h2>
        <div className="messages-container">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.sender}`}>
              {message.text}
            </div>
          ))}
        </div>
        <div className="input-container">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..."
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Codereview;

