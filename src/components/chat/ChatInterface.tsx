import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Send,
    Plus,
    RefreshCw,
    Clock,
    MessageSquare,
    Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ChatBubble from "./ChatBubble";

// Define the webhook URL
const N8N_WEBHOOK_URL =
    "https://leotekg.app.n8n.cloud/webhook/f298d6c0-d7c8-4ee4-9703-278436367d82";

// Define message type
interface ChatMessage {
    id: string;
    content: string;
    sender: "user" | "bot";
    timestamp: number;
}

// Suggested prompts for users to try
const SUGGESTED_PROMPTS = [
    "How does the AI receptionist work?",
    "What features does Kraftodent offer?",
    "How much can I save with your service?",
    "Do you support multiple languages?",
    "How long does setup take?",
];

// Welcome message from the chatbot
const WELCOME_MESSAGE = `
Hello! I'm Kraftodent's AI dental receptionist demo. I can help answer your questions about our service.

I can help you understand:
• How our AI receptionist works
• The benefits for your dental practice
• How we integrate with your existing systems
• Cost savings and ROI
• Setup and implementation process

What would you like to know about Kraftodent?
`;

// Helper functions for localStorage
function saveToLocalStorage(key: string, value: any): boolean {
    try {
        const serializedValue = JSON.stringify(value);
        localStorage.setItem(key, serializedValue);
        return true;
    } catch (error) {
        console.error(`Error saving to localStorage: ${error}`);
        return false;
    }
}

function getFromLocalStorage<T>(key: string, defaultValue: T): T {
    try {
        const serializedValue = localStorage.getItem(key);
        if (serializedValue === null) {
            return defaultValue;
        }
        return JSON.parse(serializedValue) as T;
    } catch (error) {
        console.error(`Error retrieving from localStorage: ${error}`);
        return defaultValue;
    }
}

export default function ChatInterface() {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [inputMessage, setInputMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messageEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const messageContainerRef = useRef<HTMLDivElement>(null);

    // Load messages from localStorage
    useEffect(() => {
        const savedMessages = getFromLocalStorage<ChatMessage[]>(
            "kraftodentChatMessages",
            []
        );

        // If no messages, add welcome message
        if (savedMessages.length === 0) {
            const welcomeMessage: ChatMessage = {
                id: "welcome",
                content: WELCOME_MESSAGE,
                sender: "bot",
                timestamp: Date.now(),
            };
            setMessages([welcomeMessage]);
            saveToLocalStorage("kraftodentChatMessages", [welcomeMessage]);
        } else {
            setMessages(savedMessages);
        }
    }, []);

    // Scroll to bottom when messages change
    useEffect(() => {
        const container = messageContainerRef.current;
        if (container) {
            container.scrollTop = container.scrollHeight;
        }
    }, [messages]);

    const sendMessage = async (content: string) => {
        if (!content.trim()) return;

        // Create user message
        const userMessage: ChatMessage = {
            id: `user-${Date.now()}`,
            content,
            sender: "user",
            timestamp: Date.now(),
        };

        // Add user message to chat
        const updatedMessages = [...messages, userMessage];
        setMessages(updatedMessages);
        saveToLocalStorage("kraftodentChatMessages", updatedMessages);

        // Clear input
        setInputMessage("");

        // Show loading indicator
        setIsLoading(true);

        try {
            // Send request to n8n webhook
            const response = await fetch(N8N_WEBHOOK_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: content,
                    userId: "demo-user",
                    timestamp: Date.now(),
                }),
            });

            // Get response from n8n webhook
            let data;
            try {
                data = await response.text();
            } catch (error) {
                console.error("Error parsing response:", error);
                data =
                    "I'm sorry, I couldn't process your request. Please try again.";
            }

            // Create bot response message
            const botMessage: ChatMessage = {
                id: `bot-${Date.now()}`,
                content:
                    data ||
                    "I'm sorry, I couldn't process your request. Please try again.",
                sender: "bot",
                timestamp: Date.now(),
            };

            // Add bot message to chat
            const newMessages = [...updatedMessages, botMessage];
            setMessages(newMessages);
            saveToLocalStorage("kraftodentChatMessages", newMessages);
        } catch (error) {
            console.error("Error sending message:", error);

            // Create error message
            const errorMessage: ChatMessage = {
                id: `error-${Date.now()}`,
                content:
                    "I'm sorry, there was an error connecting to the server. Please try again later.",
                sender: "bot",
                timestamp: Date.now(),
            };

            // Add error message to chat
            const newMessages = [...updatedMessages, errorMessage];
            setMessages(newMessages);
            saveToLocalStorage("kraftodentChatMessages", newMessages);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        sendMessage(inputMessage);
    };

    const clearChat = () => {
        // Keep only welcome message
        const welcomeMessage = messages.find((msg) => msg.id === "welcome");
        const newMessages = welcomeMessage ? [welcomeMessage] : [];

        setMessages(newMessages);
        saveToLocalStorage("kraftodentChatMessages", newMessages);
    };

    return (
        <div className="flex flex-col h-[600px] md:h-[700px] bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg">
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-blue-600 text-white">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                        <Sparkles size={18} className="text-white" />
                    </div>
                    <div>
                        <h3 className="font-medium">Kraftodent AI Assistant</h3>
                        <p className="text-xs text-blue-100">
                            Dental AI receptionist
                        </p>
                    </div>
                </div>

                <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearChat}
                    className="flex items-center text-xs text-blue-100 hover:text-white hover:bg-blue-700"
                >
                    <RefreshCw size={14} className="mr-1" />
                    Clear chat
                </Button>
            </div>

            {/* Chat Messages */}
            <div
                ref={messageContainerRef}
                className="flex-grow overflow-y-auto p-4 space-y-4 bg-gray-50"
            >
                <AnimatePresence initial={false}>
                    {messages.map((message) => (
                        <motion.div
                            key={message.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <ChatBubble message={message} />
                        </motion.div>
                    ))}
                </AnimatePresence>

                {/* Loading indicator */}
                {isLoading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center space-x-2 text-sm text-gray-500"
                    >
                        <div className="flex space-x-1">
                            <span className="animate-pulse bg-blue-600 rounded-full w-2 h-2"></span>
                            <span
                                className="animate-pulse bg-blue-600 rounded-full w-2 h-2"
                                style={{ animationDelay: "0.2s" }}
                            ></span>
                            <span
                                className="animate-pulse bg-blue-600 rounded-full w-2 h-2"
                                style={{ animationDelay: "0.4s" }}
                            ></span>
                        </div>
                        <span>Thinking...</span>
                    </motion.div>
                )}

                <div ref={messageEndRef} />
            </div>

            {/* Suggested Prompts - show only at the beginning */}
            {messages.length <= 2 && (
                <div className="px-4 py-3 border-t border-gray-200 bg-white">
                    <h4 className="text-xs font-medium text-gray-500 mb-2 flex items-center">
                        <MessageSquare size={12} className="mr-1" />
                        Suggested questions
                    </h4>
                    <div className="flex flex-wrap gap-2">
                        {SUGGESTED_PROMPTS.slice(0, 3).map((prompt, index) => (
                            <Button
                                key={index}
                                variant="outline"
                                size="sm"
                                className="text-xs py-1 h-auto text-blue-600 border-blue-200 hover:bg-blue-50"
                                onClick={() => sendMessage(prompt)}
                            >
                                {prompt}
                            </Button>
                        ))}
                    </div>
                </div>
            )}

            {/* Chat Input */}
            <form
                onSubmit={handleSubmit}
                className="p-4 border-t border-gray-200 bg-white"
            >
                <div className="flex space-x-2">
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="flex-shrink-0 text-gray-400"
                        disabled
                    >
                        <Plus size={18} />
                    </Button>

                    <Input
                        ref={inputRef}
                        value={inputMessage}
                        onChange={(e: {
                            target: { value: React.SetStateAction<string> };
                        }) => setInputMessage(e.target.value)}
                        placeholder="Type your question..."
                        className="bg-white border-gray-200"
                        disabled={isLoading}
                    />

                    <Button
                        type="submit"
                        variant="default"
                        size="icon"
                        className="flex-shrink-0 bg-blue-600 hover:bg-blue-700"
                        disabled={!inputMessage.trim() || isLoading}
                    >
                        <Send size={18} />
                    </Button>
                </div>

                <div className="flex items-center justify-center mt-3">
                    <Clock size={12} className="text-gray-400 mr-1" />
                    <span className="text-xs text-gray-400">
                        This is a demo of our AI receptionist capabilities
                    </span>
                </div>
            </form>
        </div>
    );
}
