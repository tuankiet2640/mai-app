import { useState } from 'react';
import ChatHeader from './ChatHeader';
import Sidebar from './SideBar';
import ChatWindow from './ChatWindow';

export default function ChatPage() {
    const [messages, setMessages] = useState([{ 
        role: 'ai', 
        content: 'Hello! How can I help you today?', 
        timestamp: new Date() 
    }]);

    const sendMessage = (content) => {
        const newMessage = { role: 'user', content, timestamp: new Date() };
        setMessages([...messages, newMessage]);
    };

    return (
        <div className="flex h-full bg-white dark:bg-gray-900">
            <Sidebar />
            <div className="flex-1 flex flex-col relative border-l border-gray-200 dark:border-gray-700">
                <ChatHeader />
                <ChatWindow messages={messages} sendMessage={sendMessage} />
            </div>
        </div>
    );
}