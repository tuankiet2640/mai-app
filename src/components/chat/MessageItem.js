import React from 'react';

const MessageItem = ({ message }) => {
    return (
        <div className="p-2 mb-2 bg-blue-100 rounded-lg shadow">
            {message}
        </div>
    );
};

export default MessageItem;
