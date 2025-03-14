import React from 'react';
import MessageList from './MessageList';
import InputBox from './InputBox';

const ChatContainer = () => {
    return (
        <div className="flex flex-col h-full p-4 bg-gray-100 rounded-lg shadow-lg">
            <MessageList />
            <InputBox />
        </div>
    );
};

export default ChatContainer;
