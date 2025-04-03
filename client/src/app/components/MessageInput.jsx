"use client";

import React, { useState } from "react";
import Image from "next/image";
import Cookies from "js-cookie";

const MessageInput = ({ onSend, conversationId, onAIResponse }) => {
  const [message, setMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSend = async () => {
    if (message.trim() && !isProcessing) {
      setIsProcessing(true);
      const token = Cookies.get("accessToken");

      try {
        // Call onSend immediately with the user's message
        onSend(message);

        // Create temporary message for AI response
        let tempResponse = "";
        onAIResponse(""); // Initialize empty AI response

        const response = await fetch(
          "http://127.0.0.1:8000/api/v1/ai/generate",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              prompt: message,
              conversation_id: conversationId,
            }),
          }
        );

        if (!response.ok) {
          const errorData = await response.text();
          throw new Error(`Failed to send message: ${errorData}`);
        }

        // Handle streaming response
        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        while (true) {
          const { value, done } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split("\n");

          for (const line of lines) {
            if (line.startsWith("data: ") && line.trim() !== "data: ") {
              try {
                const data = JSON.parse(line.slice(5));
                console.log("Received chunk:", data); // Debug log

                if (data.type === "chunk") {
                  tempResponse += data.content;
                  onAIResponse(tempResponse);
                } else if (data.type === "error") {
                  console.error("Error from server:", data.content);
                  throw new Error(data.content);
                }
              } catch (e) {
                console.error("Error parsing SSE data:", e, "Line:", line);
              }
            }
          }
        }

        setMessage("");
      } catch (error) {
        console.error("Error sending message:", error);
        // Show error to user
        onAIResponse("Sorry, there was an error processing your request.");
      } finally {
        setIsProcessing(false);
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex items-center px-4 py-3 bg-[#2D2D2D] rounded-md mt-auto">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your message."
        className="flex-1 bg-transparent border-none text-[16px] text-white outline-none placeholder-[#666666] tracking-tighter"
      />
      <button onClick={handleSend} className="ml-2 p-2 cursor-pointer">
        <Image src="/images/send-icon.svg" alt="Send" width={24} height={24} />
      </button>
    </div>
  );
};

export default MessageInput;
