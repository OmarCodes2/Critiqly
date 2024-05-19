import React from 'react';
import { useLocation  } from 'react-router-dom';
import './Codereview.css';

const Codereview = () => {
  const location = useLocation();
  const { code } = location.state || {};  // Destructure code from location.state

  return (
    <div className="container">
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
                  <div key={cIndex} className={codes.length > 1 && cIndex === 0 ? 'highlight_red' : (codes.length > 1 && cIndex === 1 ? 'hightlight_green' : '')}>
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
        <div className="chat-window">
          <div className="chat-message">
            <strong>Sarah:</strong> How do I improve this function?
          </div>
          <div className="chat-message">
            <strong>Bot:</strong> You can start by adding docstrings and type hints.
          </div>
        </div>
        <div className="chat-input">
          <input type="text" placeholder="Type your message..." />
          <button>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Codereview;

