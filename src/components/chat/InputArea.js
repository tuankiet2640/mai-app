import { useState } from 'react';
export default function InputArea({ sendMessage }) {
    const [input, setInput] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim()) {
            sendMessage(input); setInput('');

        }
    };
    return (
        <form onSubmit={handleSubmit} className="p-4 border-t bg-white">
            <div className="flex space-x-4">
                <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type your message..." className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <button type="submit" className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors" > Send </button>
            </div>
        </form>);
}