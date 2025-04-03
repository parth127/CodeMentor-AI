'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Cookies from 'js-cookie';

const Sidebar = ({ onNewChat, activeChat }) => {
    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        const fetchConversations = async () => {
            try {
                const token = Cookies.get('accessToken');
                const response = await fetch('http://127.0.0.1:8000/api/v1/conversations/', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch conversations');
                }

                const data = await response.json();
                setConversations(data);
            } catch (error) {
                console.error('Error fetching conversations:', error);
            }
        };

        fetchConversations();
    }, []);

    // Helper function to group conversations by date
    const groupConversationsByDate = (conversations) => {
        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);
        const last30Days = new Date();
        last30Days.setDate(today.getDate() - 30);

        const grouped = {
            today: [],
            yesterday: [],
            last30Days: [],
            previousMonths: [],
        };

        conversations.forEach((chat) => {
            const chatDate = new Date(chat.createdAt);
            if (chatDate.toDateString() === today.toDateString()) {
                grouped.today.push(chat);
            } else if (chatDate.toDateString() === yesterday.toDateString()) {
                grouped.yesterday.push(chat);
            } else if (chatDate >= last30Days) {
                grouped.last30Days.push(chat);
            } else {
                grouped.previousMonths.push(chat);
            }
        });

        return grouped;
    };

    const { today, yesterday, last30Days, previousMonths } = groupConversationsByDate(conversations);

    // Function to handle new chat creation
    const handleNewChat = async () => {
        const token = Cookies.get('accessToken');
        try {
            const response = await fetch('http://127.0.0.1:8000/api/v1/conversations/', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title: "New Chat" }), // Default title
            });

            if (!response.ok) {
                throw new Error('Failed to create conversation');
            }

            const newConversation = await response.json();
            setConversations(prev => [newConversation, ...prev]);
            onNewChat(newConversation.id); // Pass the new chat ID to the parent
        } catch (error) {
            console.error('Error creating new chat:', error);
        }
    };

    return (
        <div className="w-1/5 h-full bg-[#1A1A1A] rounded-xl p-6 overflow-y-auto">
            {/* New Chat Button */}
            <div 
                className="bg-[#14AE5C] rounded-[12px] p-2 flex items-center justify-between mb-8 cursor-pointer"
                onClick={handleNewChat}
            >
                <div className="flex w-full justify-center items-center gap-2">
                    <div className="w-6 h-6">
                        <Image 
                            src="/images/plus-circle.svg"
                            alt="New Chat"
                            width={24}
                            height={24}
                        />
                    </div>
                    <span className="text-[24px] font-medium text-white tracking-tighter">New Chat</span>
                </div>
            </div>
            <div>
                {/* Today's Chats */}
                {today.length > 0 && (
                    <div className="mb-8">
                        <h3 className="text-[12px] font-semibold text-white mb-4">Today</h3>
                        <div className="space-y-4">
                            {today.map((chat, index) => (
                                <ChatItem 
                                    key={chat.id} 
                                    title={chat.title || "Untitled Chat"}
                                    time={chat.createdAt || "Just now"}
                                    isActive={activeChat?.id === chat.id}
                                    onClick={() => onNewChat(chat.id)}
                                />
                            ))}
                        </div>
                    </div>
                )}
                
                {/* Yesterday's Chats */}
                {yesterday.length > 0 && (
                    <div className="mb-8">
                        <h3 className="text-[12px] font-semibold text-white mb-4">Yesterday</h3>
                        <div className="space-y-4">
                            {yesterday.map((chat, index) => (
                                <ChatItem 
                                    key={chat.id}
                                    title={chat.title || "Untitled Chat"}
                                    time={chat.createdAt || "Just now"}
                                    isActive={activeChat?.id === chat.id}
                                    onClick={() => onNewChat(chat.id)}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* Last 30 Days Chats */}
                {last30Days.length > 0 && (
                    <div className="mb-8">
                        <h3 className="text-[12px] font-semibold text-white mb-4">Last 30 Days</h3>
                        <div className="space-y-4">
                            {last30Days.map((chat, index) => (
                                <ChatItem 
                                    key={chat.id}
                                    title={chat.title || "Untitled Chat"}
                                    time={chat.createdAt || "Just now"}
                                    isActive={activeChat?.id === chat.id}
                                    onClick={() => onNewChat(chat.id)}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* Previous Months Chats */}
                {previousMonths.length > 0 && (
                    <div>
                        <h3 className="text-[12px] font-semibold text-white mb-4">Previous Months</h3>
                        <div className="space-y-4">
                            {previousMonths.map((chat, index) => (
                                <ChatItem 
                                    key={chat.id}
                                    title={chat.title || "Untitled Chat"}
                                    time={chat.createdAt || "Just now"}
                                    isActive={activeChat?.id === chat.id}
                                    onClick={() => onNewChat(chat.id)}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// Chat Item Component
const ChatItem = ({ title, time, isActive, onClick }) => {
    return (
        <div 
            className={`flex items-center justify-between cursor-pointer p-2 rounded-lg ${
                isActive ? 'bg-[#232323]' : 'hover:bg-[#232323]'
            }`}
            onClick={onClick}
        >
            <div className="flex items-center gap-2">
                <div className="w-5 h-5">
                    <Image 
                        src="/images/message-circle.svg"
                        alt="Chat"
                        width={20}
                        height={20}
                    />
                </div>
                <div>
                    <p className="text-[16px] text-white tracking-tighter">{title}</p>
                    <p className="text-[12px] text-[#666666] tracking-tighter">{time}</p>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
