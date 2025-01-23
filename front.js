import React, { useState } from 'react';
import axios from 'axios';
import './app.css';

function Chatbot() {
  const [userMessage, setUserMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [language, setLanguage] = useState('en');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState('');

  const sendMessage = async () => {
    if (userMessage.trim() === '') {
      setError('Message cannot be empty.');
      return;
    }
    setError('');
    setChatHistory([...chatHistory, { sender: 'user', text: userMessage }]);

    setIsTyping(true);
    try {
      const response = await axios.post('http://localhost:5000/chat', {
        message: userMessage,
        language,
      });
      setChatHistory([
        ...chatHistory,
        { sender: 'user', text: userMessage },
        { sender: 'bot', text: response.data.response },
      ]);
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to connect to the server.');
    } finally {
      setIsTyping(false);
    }
    setUserMessage('');
  };

  return (
    <div className="chat-container">
      <div className="chat-window">
        {chatHistory.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
        {isTyping && <div className="message bot">Bot is typing...</div>}
      </div>
      {error && <div className="error">{error}</div>}
      <div className="input-area">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
          <option value="hi">Hindi</option>
          <option value="zh-cn">Chinese</option>
          <option value="ar">Arabic</option>
        </select>
        <input
          type="text"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Chatbot;
