import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000'); // Adjust the URL as needed

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            socket.off('message');
        };
    }, []);

    const sendMessage = () => {
        if (input.trim()) {
            socket.emit('message', input);
            setInput('');
        }
    };

    return (
        <div className="flex flex-col h-full p-4 bg-gray-100">
            <div className="flex-1 overflow-y-auto mb-4">
                {messages.map((msg, index) => (
                    <div key={index} className="p-2 mb-2 bg-white rounded shadow">
                        {msg}
                    </div>
                ))}
            </div>
            <div className="flex">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    className="flex-1 p-2 border rounded"
                />
                <button onClick={sendMessage} className="ml-2 p-2 bg-blue-500 text-white rounded">
                    Send
                </button>
            </div>
        </div>
    );
};

export default Chat;
