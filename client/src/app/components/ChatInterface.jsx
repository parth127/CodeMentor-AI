'use client';

import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import ChatArea from './ChatArea';

const ChatInterface = () => {
    const [messages, setMessages] = useState([
        {
            text: "Hello! How can I assist you today?",
            time: "2:30 PM",
            isUser: false
        },
        {
            text: "I need help with a React project setup.",
            time: "2:30 PM",
            isUser: true
        },
        {
            text: "I'd be happy to help you set up a React project. Would you like to use Create React App, Vite, or Next.js?",
            time: "2:31 PM",
            isUser: false
        },
        {
            text: "I prefer using Vite for better performance.",
            time: "2:32 PM",
            isUser: true
        },
        {
            text: "Great choice! Vite is indeed known for its fast development server and build times. Let me guide you through the setup process step by step.",
            time: "2:32 PM",
            isUser: false
        }
    ]);

    const [activeChat, setActiveChat] = useState(null);

    const handleSendMessage = (text) => {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12;
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        const time = `${formattedHours}:${formattedMinutes} ${ampm}`;

        const newMessage = {
            text,
            time,
            isUser: true
        };

        setMessages([...messages, newMessage]);

        // Simulate AI response
        setTimeout(() => {
            const aiResponse = {
                text: "I'm processing your request. I'll get back to you shortly.",
                time: `${formattedHours}:${formattedMinutes} ${ampm}`,
                isUser: false
            };
            setMessages(prevMessages => [...prevMessages, aiResponse]);
        }, 1000);
    };

    const handleNewChat = (chat) => {
        setActiveChat(chat);
    };

    return (
        <div className="flex flex-col h-screen bg-[#020D07]">
            <Header />
            <div className="flex flex-1 p-6 gap-6 overflow-hidden">
                <Sidebar onNewChat={handleNewChat} activeChat={activeChat} />
                <ChatArea 
                    messages={messages}
                    onSendMessage={handleSendMessage}
                    activeChat={activeChat}
                />
            </div>
        </div>
    );
};

export default ChatInterface;
