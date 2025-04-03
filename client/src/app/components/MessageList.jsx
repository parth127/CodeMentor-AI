'use client';

import React from 'react';

const MessageList = ({ messages }) => {
    return (
        <div className="flex-1 overflow-y-auto p-4 bg-[#1A1A1A] rounded-lg shadow-lg">
            {messages.map((message, index) => (
                <div key={index} className="my-2 p-2 bg-gray-200 rounded text-black">
                    {message}
                </div>
            ))}
        </div>
    );
};

export default MessageList;
