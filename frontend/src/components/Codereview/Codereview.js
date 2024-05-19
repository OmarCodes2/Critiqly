import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Codereview.css';
import logoPath from './Vector (1).png';

const Codereview = () => {
  const location = useLocation();
  const { code } = location.state || {};  // Destructure code from location.state

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
        {/* <pre>
          <code>
            {`
# Some example Python code for review
def example_function():
    print("Hello, world!")
    return True
            `}
          </code>
        </pre> */}
        <div>
          {code.lines.map((line, index) => {
            let codes = [];
            if (line.is_modified) {
              if (line.is_correct) {
                codes.push(line.versions.find(version => version.id === 1).code);
                codes.push(line.versions.find(version => version.id === 3).code);
              } else {
                codes.push(line.versions.find(version => version.id === 1).code);
                codes.push(line.versions.find(version => version.id === 2).code);
              }
            } else {
              codes.push(line.versions[0].code);
            }

            return (
              <div key={index}>
                {codes.map((code, cIndex) => (
                  <div key={cIndex} className={codes.length > 1 && cIndex === 0 ? 'highlight_red' : (codes.length > 1 && cIndex === 1 ? 'highlight_green' : '')}>
                    <code>{line.line_number} {code}</code>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
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

