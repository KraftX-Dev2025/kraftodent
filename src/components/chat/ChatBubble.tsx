import React from "react";
import { User, Bot } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatMessage {
    id: string;
    content: string;
    sender: "user" | "bot";
    timestamp: number;
    isBookingConfirmation?: boolean;
}

interface ChatBubbleProps {
    message: ChatMessage;
}

export default function ChatBubble({ message }: ChatBubbleProps) {
    const isUser = message.sender === "user";

    // Process message content to add formatting
    const processContent = (content: string) => {
        // Replace newlines with <br>
        let processedContent = content.replace(/\n/g, "<br>");

        // Format bullet points
        processedContent = processedContent.replace(
            /^• (.+)$/gm,
            '<div class="flex items-start my-1"><span class="mr-1">•</span><span>$1</span></div>'
        );

        return processedContent;
    };

    return (
        <div
            className={cn(
                "flex items-start",
                isUser ? "justify-end" : "justify-start"
            )}
        >
            {/* Avatar for bot messages */}
            {!isUser && (
                <div className="flex-shrink-0 mr-2">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <Bot size={16} className="text-blue-600" />
                    </div>
                </div>
            )}

            <div className="max-w-[85%]">
                <div
                    className={cn(
                        "rounded-lg",
                        isUser
                            ? "bg-blue-600 text-white rounded-tr-none px-3 py-2"
                            : "bg-gray-100 text-gray-800 rounded-tl-none px-3 py-2"
                    )}
                >
                    <div
                        className="text-sm"
                        dangerouslySetInnerHTML={{
                            __html: processContent(message.content),
                        }}
                    />
                </div>
            </div>

            {/* Avatar for user messages */}
            {isUser && (
                <div className="flex-shrink-0 ml-2">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                        <User size={16} className="text-gray-500" />
                    </div>
                </div>
            )}
        </div>
    );
}
