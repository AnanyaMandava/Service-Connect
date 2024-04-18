import React, { useState } from 'react';
import axios from 'axios';
import './Maintenance.css';

const Maintenance = () => {
    const [messages, setMessages] = useState([{ sender: 'chatbot', text: 'Hi, How can I help you?' }]);
    const [userInput, setUserInput] = useState("");

    const handleSendMessage = async () => {
        if (!userInput.trim()) return;

        const newUserMessage = { sender: 'user', text: userInput };
        setMessages(messages => [...messages, newUserMessage]);

        try {
            // Send the entire message history to maintain context
            const response = await axios.post('http://localhost:3001/all/chat', { 
                message: userInput, 
                conversation: messages,  // Include the full conversation history
                email: localStorage.getItem('loggedEmail'), 
                userId: localStorage.getItem('userId') 
            });

            const botMessage = { sender: 'chatbot', text: response.data.message }; // Ensure backend sends back 'message'
            setMessages(messages => [...messages, botMessage]);
        } catch (error) {
            console.error('Error sending message:', error);
            setMessages(messages => [...messages, { sender: 'chatbot', text: 'Sorry, there was an error processing your message.' }]);
        }

        setUserInput(""); // Clear the input after sending the message
    };

    return (
        <div className="chatbot-container">
            <div className='chatbot-title'>It's A Chatbot</div>
            <div className="chat-window">
                <div className="messages">
                    {messages.map((msg, index) => (
                        <div key={index} className={`message ${msg.sender}`}>
                            {msg.text}
                        </div>
                    ))}
                </div>
                <div className="input-area">
                    <input
                        type="text"
                        placeholder="Type your message here..."
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <button onClick={handleSendMessage}>Send</button>
                </div>
            </div>
        </div>
    );
};

export default Maintenance;
