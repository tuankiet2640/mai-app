import React, { useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000'); // Adjust the URL as needed

const InputBox = () => {
    const [input, setInput] = useState('');

    const sendMessage = () => {
        if (input.trim()) {
            socket.emit('message', input);
            setInput('');
        }
    };

    return (
        <div className="flex items-center">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                className="flex-1 p-2 border rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Type your message..."
            />
            <button onClick={sendMessage} className="ml-2 p-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600">
                Send
            </button>
        </div>
    );
};

export default InputBox;
