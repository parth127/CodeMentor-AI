'use client';

import React from 'react';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from "remark-gfm";

const Message = ({ text, time, isUser = false }) => {
    return (
        <div className={`flex flex-row items-start mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
            {!isUser && (
                <div className="w-10 h-10 rounded-full bg-[#666666] mr-3 flex items-center justify-center">
                    <Image 
                        src="/images/message-circle.svg"
                        alt="AI"
                        width={24}
                        height={24}
                        className='text-black'
                    />
                </div>
            )}
            <div className="flex flex-col justify-start">
                <div className={`rounded-md bg-[#232323] px-3 py-2 max-w-[1000px]`}>
                    <div className="text-[16px] text-white tracking-tighter">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {text}
                        </ReactMarkdown>
                    </div>
                </div>
                <p className="text-[12px] text-[#666666] mt-1 tracking-tighter">{time}</p>
            </div>
        </div>
    );
};

export default Message;
