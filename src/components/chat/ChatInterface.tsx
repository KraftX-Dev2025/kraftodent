import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, RefreshCw, HelpCircle, Clock, Sparkles } from "lucide-react";
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
    isBookingConfirmation?: boolean;
}

// Simplified welcome message
const WELCOME_MESSAGE = `Hi! I'm Kraftodent's AI assistant. I can help with scheduling appointments and answering questions about our dental practice services. What can I help you with today?`;

// Mock appointment booking flow
const mockScheduleAppointment = async (date?: string, time?: string) => {
    return new Promise<string>((resolve) => {
        setTimeout(() => {
            if (!date && !time) {
                resolve(`I can help you schedule an appointment. We have the following slots available:

- Tomorrow (May 22) at 10:00 AM
- Tomorrow (May 22) at 2:30 PM
- Thursday (May 23) at 11:15 AM
- Friday (May 24) at 9:30 AM

Which time works best for you?`);
            } else {
                resolve(`Great! Your appointment is scheduled for ${
                    date || "tomorrow"
                } at ${time || "10:00 AM"}.

Here's your confirmation:
• Date: ${date || "May 22, 2025"}
• Time: ${time || "10:00 AM"}
• Clinic: Kraftodent Dental Clinic

You'll receive a reminder 24 hours before your appointment.`);
            }
        }, 1000);
    });
};

// Helper functions for localStorage
function saveToLocalStorage(key: string, value: any): boolean {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (error) {
        console.error(`Error saving to localStorage: ${error}`);
        return false;
    }
}

function getFromLocalStorage<T>(key: string, defaultValue: T): T {
    try {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : defaultValue;
    } catch (error) {
        console.error(`Error retrieving from localStorage: ${error}`);
        return defaultValue;
    }
}

export default function ChatInterface() {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [inputMessage, setInputMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isBookingFlow, setIsBookingFlow] = useState(false);
    const [bookingStage, setBookingStage] = useState(0);
    const [showHelp, setShowHelp] = useState(false);

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
        if (messageContainerRef.current) {
            messageContainerRef.current.scrollTop =
                messageContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const handleBookingFlow = async (message: string) => {
        // Initial booking request
        if (
            message.toLowerCase().includes("appointment") ||
            message.toLowerCase().includes("schedule") ||
            message.toLowerCase().includes("book")
        ) {
            setIsBookingFlow(true);
            setBookingStage(1);
            const response = await mockScheduleAppointment();
            return response;
        }

        // If in booking flow, process next steps
        if (isBookingFlow) {
            if (bookingStage === 1) {
                // User selected a time
                if (
                    message.toLowerCase().includes("tomorrow") ||
                    message.toLowerCase().includes("thursday") ||
                    message.toLowerCase().includes("friday") ||
                    message.toLowerCase().includes("next")
                ) {
                    setBookingStage(2);

                    // Extract date and time information from the message
                    let date = "tomorrow";
                    let time = "10:00 AM";

                    if (message.toLowerCase().includes("thursday")) {
                        date = "Thursday, May 23";
                    } else if (message.toLowerCase().includes("friday")) {
                        date = "Friday, May 24";
                    }

                    if (message.toLowerCase().includes("2:30")) {
                        time = "2:30 PM";
                    } else if (message.toLowerCase().includes("11:15")) {
                        time = "11:15 AM";
                    } else if (message.toLowerCase().includes("9:30")) {
                        time = "9:30 AM";
                    }

                    const confirmation = await mockScheduleAppointment(
                        date,
                        time
                    );

                    // Reset booking flow after confirmation
                    setTimeout(() => {
                        setIsBookingFlow(false);
                        setBookingStage(0);
                    }, 2000);

                    return confirmation;
                }
            }
        }

        // Default to sending to webhook if not part of booking flow
        return null;
    };

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
            // Check if this is part of the booking flow
            const bookingResponse = await handleBookingFlow(content);

            let responseContent;
            let isConfirmation = false;

            if (bookingResponse) {
                responseContent = bookingResponse;
                // Check if this is a booking confirmation
                if (bookingResponse.includes("appointment is scheduled")) {
                    isConfirmation = true;
                }
            } else {
                // If not part of booking flow, send to webhook
                try {
                    const response = await fetch(N8N_WEBHOOK_URL, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            message: content,
                            userId: "demo-user",
                            timestamp: Date.now(),
                        }),
                    });

                    responseContent = await response.text();
                } catch (error) {
                    console.error("Error sending to webhook:", error);
                    responseContent =
                        "Sorry, I couldn't process your request. Please try again.";
                }
            }

            // Create bot response message
            const botMessage: ChatMessage = {
                id: `bot-${Date.now()}`,
                content: responseContent,
                sender: "bot",
                timestamp: Date.now(),
                isBookingConfirmation: isConfirmation,
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
                content: "Sorry, there was an error. Please try again later.",
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

        // Reset booking flow state
        setIsBookingFlow(false);
        setBookingStage(0);
    };

    const toggleHelp = () => {
        setShowHelp(!showHelp);
    };

    // Quick examples for users to try
    const quickResponses = [
        {
            text: "Book appointment",
            action: () => sendMessage("I'd like to book an appointment"),
        },
        {
            text: "Features",
            action: () => sendMessage("What features do you offer?"),
        },
        {
            text: "How it works",
            action: () => sendMessage("How does the AI receptionist work?"),
        },
    ];

    return (
        <div className="flex flex-col h-[600px] md:h-[700px] bg-white rounded-lg overflow-hidden shadow-lg border border-gray-200">
            {/* Chat Header */}
            <div className="flex items-center justify-between p-3 bg-blue-600 text-white">
                <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                        <Sparkles size={16} className="text-white" />
                    </div>
                    <div>
                        <h3 className="font-medium">Kraftodent AI</h3>
                    </div>
                </div>

                <div className="flex items-center space-x-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={toggleHelp}
                        className="text-white hover:bg-blue-700 h-8 w-8 p-0"
                        aria-label="Help"
                    >
                        <HelpCircle size={16} />
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearChat}
                        className="text-white hover:bg-blue-700 h-8 w-8 p-0"
                        aria-label="Clear chat"
                    >
                        <RefreshCw size={16} />
                    </Button>
                </div>
            </div>

            {/* Help Panel */}
            <AnimatePresence>
                {showHelp && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-blue-50 border-b border-blue-200 p-3"
                    >
                        <h4 className="font-medium text-blue-800 mb-2">
                            About this demo
                        </h4>
                        <p className="text-sm text-blue-700 mb-2">
                            This is a demo of Kraftodent's AI dental
                            receptionist. It can:
                        </p>
                        <ul className="text-sm text-blue-700 list-disc pl-5 space-y-1 mb-2">
                            <li>Schedule appointments</li>
                            <li>Answer questions about our service</li>
                            <li>Explain how our AI works</li>
                            <li>Discuss pricing and features</li>
                        </ul>
                        <p className="text-sm text-blue-700">
                            For a full demonstration with your practice's
                            specific workflows, please book a consultation.
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>

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
                        <span>Typing...</span>
                    </motion.div>
                )}

                <div ref={messageEndRef} />
            </div>

            {/* Quick Responses - only show for first interaction */}
            {messages.length <= 1 && (
                <div className="px-4 py-2 bg-gray-50 border-t border-gray-200">
                    <div className="flex flex-wrap gap-2 justify-center">
                        {quickResponses.map((item, index) => (
                            <Button
                                key={index}
                                variant="outline"
                                size="sm"
                                className="text-xs py-1 h-auto text-blue-600 border-blue-200 hover:bg-blue-50"
                                onClick={item.action}
                            >
                                {item.text}
                            </Button>
                        ))}
                    </div>
                </div>
            )}

            {/* Chat Input */}
            <form
                onSubmit={handleSubmit}
                className="p-3 border-t border-gray-200 bg-white"
            >
                <div className="flex space-x-2">
                    <Input
                        ref={inputRef}
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="bg-white border-gray-200"
                        disabled={isLoading}
                    />

                    <Button
                        type="submit"
                        variant="default"
                        size="icon"
                        className="flex-shrink-0 bg-blue-600 hover:bg-blue-700 h-9 w-9"
                        disabled={!inputMessage.trim() || isLoading}
                    >
                        <Send size={16} />
                    </Button>
                </div>
            </form>
        </div>
    );
}
