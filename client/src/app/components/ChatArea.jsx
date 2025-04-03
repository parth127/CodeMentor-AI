"use client";

import React, { useRef, useEffect, useState } from "react";
import Message from "./Message";
import MessageInput from "./MessageInput";
import Cookies from "js-cookie";

const ChatArea = ({ activeChat }) => {
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Fetch messages when active chat changes
  useEffect(() => {
    const fetchMessages = async () => {
      if (!activeChat) return;

      const token = Cookies.get("accessToken");
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/v1/ai/conversations/${activeChat}/messages`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch messages");
        }

        const data = await response.json();
        console.log("Messages:", data);

        // Format the messages array
        const formattedMessages = data
          .map((item) => [
            {
              text: item.query, // User message
              time: item.created_at,
              isUser: true,
            },
            {
              text: item.response, // AI response
              time: new Date().toISOString(), // You can adjust the time as needed
              isUser: false,
            },
          ])
          .flat(); // Flatten the array

        setMessages(formattedMessages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [activeChat]);

  const handleSendMessage = async (message) => {
    if (!activeChat) return;

    const userMessage = {
      text: message,
      time: new Date().toISOString(),
      isUser: true,
    };

    // Add loading message for AI
    const loadingMessage = {
      text: "",
      time: new Date().toISOString(),
      isUser: false,
    };

    setMessages((prev) => [...prev, userMessage, loadingMessage]);
  };

  const handleAIResponse = (aiResponse) => {
    setMessages((prev) => {
      const updatedMessages = [...prev];
      // Update the last message if it's from AI
      if (
        updatedMessages.length > 0 &&
        !updatedMessages[updatedMessages.length - 1].isUser
      ) {
        updatedMessages[updatedMessages.length - 1].text = aiResponse;
      }
      return updatedMessages;
    });
  };

  return (
    <div className="w-4/5 h-full bg-[#1A1A1A] rounded-xl p-6 flex flex-col">
      {activeChat ? (
        <>
          <div className="flex-1 overflow-y-auto mb-4 space-y-6">
            {messages.map((msg, index) => (
              <Message
                key={index}
                text={msg.text}
                time={msg.time}
                isUser={msg.isUser}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
          <MessageInput
            onSend={handleSendMessage}
            conversationId={activeChat}
            onAIResponse={handleAIResponse}
          />
        </>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-white text-xl">
            Select a chat or start a new conversation
          </p>
        </div>
      )}
    </div>
  );
};

export default ChatArea;
