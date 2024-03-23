import React, { useState } from 'react'
import './Maintenance.css'
import axios from 'axios';

const Maintenance = () => {
    
    const [messages, setMessages] = useState([{sender:'chatbot', text: 'Hi, How can I help you?'}]);
    const [userInput, setUserInput] = useState("");

    const handleSendMessage = async () => {
        if (!userInput.trim()) return;

        const newMessage = { sender: 'user', text: userInput };
        setMessages(messages => [...messages, newMessage]);
        setUserInput("");
        try {
            // const response = await axios.post(process.env.REACT_APP_BACKEND_URI+'/chat', { message: userInput, email : localStorage.getItem('loggedEmail')});
            const response = await axios.post(process.env.REACT_APP_BACKEND_URI+'/chat');
            const botMessage = { sender: 'chatbot', text: response.data.message };
            setMessages(messages => [...messages, botMessage]);
        } catch (error) {
            console.error('Error sending message:', error);
        }

        // setUserInput("");
    };

    return (
        <div className="chatbot-container">
            <div className='chatbot-title'>
                its A Chatbot
            </div>
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
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
            </div>
        </div>
    );
};

export default Maintenance