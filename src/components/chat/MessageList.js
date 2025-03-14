import React from 'react';
import MessageItem from './MessageItem';

const MessageList = ({ messages }) => {
    return (
        <div className="flex-1 overflow-y-auto mb-4 p-4 bg-white rounded-lg shadow-inner">
            {messages.map((msg, index) => (
                <MessageItem key={index} message={msg} />
            ))}
        </div>
    );
};

export default MessageList;
