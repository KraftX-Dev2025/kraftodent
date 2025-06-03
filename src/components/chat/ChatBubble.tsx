// src/components/chat/ChatBubble.tsx

import React from "react";
import { motion } from "framer-motion";
import { Bot, User } from "lucide-react";
import { ChatBubbleProps } from "@/types/chat";

const processContent = (content: string): string => {
    // Handle newlines
    let processed = content.replace(/\n/g, "<br>");

    // Handle bullet points
    processed = processed.replace(/^\s*[\*\-\•]\s+(.+)$/gm, "<li>$1</li>");
    if (processed.includes("<li>")) {
        processed = processed.replace(/(<li>.*<\/li>)/, "<ul>$1</ul>");
    }

    // Handle markdown-style links [text](url)
    processed = processed.replace(
        /\[([^\]]+)\]\(([^)]+)\)/g,
        '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-blue-600 underline">$1</a>'
    );

    // Handle simple URLs
    processed = processed.replace(
        /(https?:\/\/[^\s]+)/g,
        '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-blue-600 underline">$1</a>'
    );

    return processed;
};

export default function ChatBubble({ message }: ChatBubbleProps) {
    const isBot = message.sender === "bot";
    const processedContent = processContent(message.content);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex ${isBot ? "justify-start" : "justify-end"} mb-4`}
        >
            <div
                className={`flex max-w-[85%] ${
                    isBot ? "flex-row" : "flex-row-reverse"
                }`}
            >
                {/* Avatar */}
                {isBot && (
                    <div className="flex-shrink-0 mr-3">
                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                            <Bot size={16} className="text-white" />
                        </div>
                    </div>
                )}

                {!isBot && (
                    <div className="flex-shrink-0 ml-3">
                        <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
                            <User size={16} className="text-white" />
                        </div>
                    </div>
                )}

                {/* Message Bubble */}
                <div
                    className={`
                        px-4 py-3 rounded-2xl shadow-sm
                        ${
                            isBot
                                ? "bg-white border border-gray-200 text-gray-800"
                                : "bg-blue-600 text-white"
                        }
                        ${
                            message.isBookingConfirmation
                                ? "border-green-500 bg-green-50 text-green-800"
                                : ""
                        }
                        ${isBot ? "rounded-bl-md" : "rounded-br-md"}
                    `}
                >
                    {/* Message Content */}
                    <div
                        className={`text-sm leading-relaxed ${
                            message.isBookingConfirmation ? "font-medium" : ""
                        }`}
                        dangerouslySetInnerHTML={{ __html: processedContent }}
                    />

                    {/* Timestamp */}
                    <div
                        className={`text-xs mt-1 ${
                            isBot ? "text-gray-500" : "text-blue-100"
                        }`}
                    >
                        {new Date(message.timestamp).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
