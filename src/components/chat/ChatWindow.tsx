// src/components/chat/ChatWindow.tsx

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, HelpCircle, X, User, RotateCcw, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ChatBubble from "./ChatBubble";
import { ChatWindowProps, ChatMessage, LOCAL_STORAGE_KEYS } from "@/types/chat";
import { sendToWebhook } from "@/lib/api";
import { saveToLocalStorage, getFromLocalStorage } from "@/lib/localStorage";

export default function ChatWindow({
    userData,
    onClearSession,
}: ChatWindowProps) {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [inputMessage, setInputMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showHelp, setShowHelp] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Load chat history on component mount
    useEffect(() => {
        loadChatHistory();
        sendWelcomeMessage();
    }, []);

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const loadChatHistory = () => {
        const savedMessages = getFromLocalStorage<ChatMessage[]>(
            LOCAL_STORAGE_KEYS.CHAT_MESSAGES,
            []
        );
        setMessages(savedMessages);
    };

    const saveChatHistory = (newMessages: ChatMessage[]) => {
        saveToLocalStorage(LOCAL_STORAGE_KEYS.CHAT_MESSAGES, newMessages);
    };
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "nearest",
        });
    };

    const sendWelcomeMessage = () => {
        if (messages.length === 0) {
            const welcomeMessage: ChatMessage = {
                id: `msg_${Date.now()}`,
                content: `Hello ${userData.name}! 👋\n\nWelcome to Kraftodent! I'm your AI dental assistant. I can help you with:\n\n• Booking appointments\n• Answering questions about our services\n• Providing clinic information\n• Handling emergencies\n\nHow can I assist you today?`,
                sender: "bot",
                timestamp: Date.now(),
            };
            setMessages([welcomeMessage]);
            saveChatHistory([welcomeMessage]);
        }
    };

    const generateMessageId = (): string => {
        return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    };

    const addMessage = (
        content: string,
        sender: "user" | "bot",
        isBookingConfirmation = false
    ) => {
        const newMessage: ChatMessage = {
            id: generateMessageId(),
            content,
            sender,
            timestamp: Date.now(),
            isBookingConfirmation,
        };

        setMessages((prev) => {
            const updated = [...prev, newMessage];
            saveChatHistory(updated);
            return updated;
        });

        return newMessage;
    };
    const sendMessage = async (content: string) => {
        if (!content.trim() || isLoading) return;

        // Add user message
        addMessage(content, "user");
        setInputMessage("");
        setIsLoading(true);

        // Send to webhook and get AI response
        const aiResponse = await sendToWebhook(content, userData);

        // Check if this is a booking confirmation
        const isBookingConfirmation =
            aiResponse.toLowerCase().includes("appointment") &&
            (aiResponse.toLowerCase().includes("confirmed") ||
                aiResponse.toLowerCase().includes("booked"));

        // Add AI response
        addMessage(aiResponse, "bot", isBookingConfirmation);
        setIsLoading(false);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        sendMessage(inputMessage);
    };
    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage(inputMessage);
        }
    };

    const clearChat = () => {
        setMessages([]);
        saveChatHistory([]);
        sendWelcomeMessage();
    };

    const helpContent = [
        {
            title: "Booking Appointments",
            content:
                "Say 'I want to book an appointment' or click the Book Appointment button.",
        },
        {
            title: "Emergency Help",
            content:
                "For dental emergencies, click the Emergency button or say 'I have a dental emergency'.",
        },
        {
            title: "Services Information",
            content:
                "Ask about specific treatments like 'What is root canal?' or 'Do you do teeth whitening?'",
        },
        {
            title: "Clinic Details",
            content:
                "Ask about hours, location, contact information, or insurance acceptance.",
        },
        {
            title: "Speaking Tips",
            content:
                "Be specific about your needs. For example: 'I need a cleaning appointment next week' instead of just 'appointment'.",
        },
    ];

    return (
        <div className="flex flex-col h-[600px] bg-white rounded-lg shadow-lg border border-gray-200">
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-blue-600 text-white rounded-t-lg">
                <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                        <User size={16} />
                    </div>
                    <div>
                        <h3 className="font-medium">{userData.name}</h3>
                        <p className="text-xs text-blue-100">
                            {userData.contact}
                        </p>
                    </div>
                </div>

                <div className="flex items-center space-x-2">
                    <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setShowHelp(!showHelp)}
                        className="text-white hover:bg-blue-500"
                        title="Show help"
                    >
                        <HelpCircle size={16} />
                    </Button>
                    <Button
                        size="sm"
                        variant="ghost"
                        onClick={clearChat}
                        className="text-white hover:bg-blue-500"
                        title="Clear chat"
                    >
                        <RotateCcw size={16} />
                    </Button>
                    <Button
                        size="sm"
                        variant="ghost"
                        onClick={onClearSession}
                        className="text-white hover:bg-blue-500"
                        title="End session"
                    >
                        <X size={16} />
                    </Button>
                </div>
            </div>

            {/* Help Panel */}
            <AnimatePresence>
                {showHelp && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-blue-50 border-b border-gray-200 overflow-hidden"
                    >
                        <div className="p-4">
                            <div className="flex items-center justify-between mb-3">
                                <h4 className="font-medium text-gray-800">
                                    How to use the chat
                                </h4>
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => setShowHelp(false)}
                                >
                                    <ChevronUp size={16} />
                                </Button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {helpContent.map((item, index) => (
                                    <div
                                        key={index}
                                        className="bg-white p-3 rounded-lg"
                                    >
                                        <h5 className="font-medium text-sm text-gray-800 mb-1">
                                            {item.title}
                                        </h5>
                                        <p className="text-xs text-gray-600">
                                            {item.content}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {messages.map((message) => (
                    <ChatBubble key={message.id} message={message} />
                ))}
                {/* Loading indicator */}
                {isLoading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex justify-start"
                    >
                        <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-md px-4 py-3 max-w-xs">
                            <div className="flex items-center space-x-2">
                                <div className="flex space-x-1">
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                    <div
                                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                        style={{ animationDelay: "0.1s" }}
                                    ></div>
                                    <div
                                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                        style={{ animationDelay: "0.2s" }}
                                    ></div>
                                </div>
                                <span className="text-xs text-gray-500">
                                    AI is typing...
                                </span>
                            </div>
                        </div>
                    </motion.div>
                )}{" "}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-gray-200">
                <form onSubmit={handleSubmit} className="flex space-x-2">
                    <div className="flex-1 relative">
                        <Input
                            ref={inputRef}
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Type your message here..."
                            disabled={isLoading}
                        />
                    </div>
                    <Button
                        type="submit"
                        disabled={!inputMessage.trim() || isLoading}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                        <Send size={16} />
                    </Button>
                </form>

                <div className="mt-2 text-center">
                    <p className="text-xs text-gray-500">
                        Press Enter to send • Shift+Enter for new line
                    </p>
                </div>
            </div>
        </div>
    );
}
