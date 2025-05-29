import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Send,
    RefreshCw,
    HelpCircle,
    Clock,
    Sparkles,
    User,
    Phone,
    Mail,
    ExternalLink,
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
    isBookingConfirmation?: boolean;
}

// Define user data interface
interface UserData {
    name: string;
    contact: string; // email or phone
    contactType: "email" | "phone";
    isOnboarded: boolean;
}

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

// Helper function to validate email
function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Helper function to validate phone
function isValidPhone(phone: string): boolean {
    const phoneRegex = /^[\+]?[1-9][\d]{3,14}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ""));
}

export default function ChatInterface() {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [inputMessage, setInputMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showHelp, setShowHelp] = useState(false);

    // Onboarding states
    const [userData, setUserData] = useState<UserData | null>(null);
    const [onboardingStep, setOnboardingStep] = useState<
        "name" | "contact" | "complete"
    >("name");
    const [tempName, setTempName] = useState("");
    const [tempContact, setTempContact] = useState("");

    const messageEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const messageContainerRef = useRef<HTMLDivElement>(null);

    // Load user data and messages from localStorage on initial load
    useEffect(() => {
        const savedUserData = getFromLocalStorage<UserData | null>(
            "kraftodentUserData",
            null
        );
        const savedMessages = getFromLocalStorage<ChatMessage[]>(
            "kraftodentChatMessages",
            []
        );

        if (savedUserData) {
            setUserData(savedUserData);
            setOnboardingStep("complete");

            // If messages exist, use them
            if (savedMessages.length > 0) {
                setMessages(savedMessages);
            } else {
                // Add personalized welcome message
                const welcomeMessage: ChatMessage = {
                    id: "welcome",
                    content: `Hello ${savedUserData.name}! Welcome back to Kraftodent. How can I assist you today? I can help you book an appointment or answer any questions about our dental services.`,
                    sender: "bot",
                    timestamp: Date.now(),
                };
                setMessages([welcomeMessage]);
                saveToLocalStorage("kraftodentChatMessages", [welcomeMessage]);
            }
        } else {
            // Show onboarding welcome message
            const onboardingMessage: ChatMessage = {
                id: "onboarding-welcome",
                content:
                    "Welcome to Kraftodent! To get started with our demo, I'll need a few quick details. What's your name?",
                sender: "bot",
                timestamp: Date.now(),
            };
            setMessages([onboardingMessage]);
        }
    }, []);

    // Scroll to bottom when messages change
    useEffect(() => {
        if (messageContainerRef.current) {
            messageContainerRef.current.scrollTop =
                messageContainerRef.current.scrollHeight;
        }
    }, [messages]);

    // Handle onboarding input
    const handleOnboardingInput = (value: string) => {
        if (onboardingStep === "name") {
            if (value.trim().length >= 2) {
                setTempName(value.trim());

                // Add user message
                const userMessage: ChatMessage = {
                    id: `user-${Date.now()}`,
                    content: value,
                    sender: "user",
                    timestamp: Date.now(),
                };

                // Add bot response
                const botMessage: ChatMessage = {
                    id: `bot-${Date.now()}`,
                    content: `Nice to meet you, ${value.trim()}! Now I'll need either your email address or phone number to proceed.`,
                    sender: "bot",
                    timestamp: Date.now() + 1,
                };

                const updatedMessages = [...messages, userMessage, botMessage];
                setMessages(updatedMessages);
                setOnboardingStep("contact");
                setInputMessage("");
            }
        } else if (onboardingStep === "contact") {
            const contact = value.trim();
            let isValid = false;
            let contactType: "email" | "phone" = "email";

            if (isValidEmail(contact)) {
                isValid = true;
                contactType = "email";
            } else if (isValidPhone(contact)) {
                isValid = true;
                contactType = "phone";
            }

            if (isValid) {
                const newUserData: UserData = {
                    name: tempName,
                    contact: contact,
                    contactType: contactType,
                    isOnboarded: false,
                };

                setUserData(newUserData);
                saveToLocalStorage("kraftodentUserData", newUserData);

                // Add user message
                const userMessage: ChatMessage = {
                    id: `user-${Date.now()}`,
                    content: value,
                    sender: "user",
                    timestamp: Date.now(),
                };

                // Add bot response with form link
                const botMessage: ChatMessage = {
                    id: `bot-${Date.now()}`,
                    content: `Perfect! Before we can help you book an appointment, please fill out our quick patient information form. This helps us provide you with the best care possible.
                    📋 Please fill out [this form](https://forms.gle/fJkCV2HKnc23jEdB7).
                    Once you've submitted the form, just let me know and I'll help you schedule your appointment!`,
                    sender: "bot",
                    timestamp: Date.now() + 1,
                };

                const updatedMessages = [...messages, userMessage, botMessage];
                setMessages(updatedMessages);
                saveToLocalStorage("kraftodentChatMessages", updatedMessages);

                setOnboardingStep("complete");
                setInputMessage("");
            } else {
                // Invalid contact - show error message
                const userMessage: ChatMessage = {
                    id: `user-${Date.now()}`,
                    content: value,
                    sender: "user",
                    timestamp: Date.now(),
                };

                const errorMessage: ChatMessage = {
                    id: `error-${Date.now()}`,
                    content:
                        "Please enter a valid email address or phone number. For example:\n• Email: john@example.com\n• Phone: +91 9876543210",
                    sender: "bot",
                    timestamp: Date.now() + 1,
                };

                const updatedMessages = [
                    ...messages,
                    userMessage,
                    errorMessage,
                ];
                setMessages(updatedMessages);
                setInputMessage("");
            }
        }
    };

    const sendMessage = async (content: string) => {
        if (!content.trim()) return;

        // Handle onboarding if not complete
        if (onboardingStep !== "complete") {
            handleOnboardingInput(content);
            return;
        }

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
            // Send message to n8n webhook with user data
            const response = await fetch(N8N_WEBHOOK_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: content,
                    userData: userData,
                    timestamp: Date.now(),
                }),
            });

            const responseContent = await response.text();

            // Check if this is a booking confirmation by looking for keywords
            const isConfirmation =
                responseContent.toLowerCase().includes("appointment") &&
                (responseContent.toLowerCase().includes("confirm") ||
                    responseContent.toLowerCase().includes("scheduled"));

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
                content:
                    "Sorry, there was an error connecting to our system. Please try again later or call us directly at +91 90280 02031.",
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
        // Clear all data and restart onboarding
        localStorage.removeItem("kraftodentChatMessages");
        localStorage.removeItem("kraftodentUserData");

        setUserData(null);
        setOnboardingStep("name");
        setTempName("");
        setTempContact("");

        const onboardingMessage: ChatMessage = {
            id: "onboarding-welcome",
            content:
                "Welcome to Kraftodent! To get started with our demo, I'll need a few quick details. What's your name?",
            sender: "bot",
            timestamp: Date.now(),
        };
        setMessages([onboardingMessage]);
    };

    const toggleHelp = () => {
        setShowHelp(!showHelp);
    };

    // Get placeholder text based on onboarding step
    const getPlaceholderText = () => {
        if (onboardingStep === "name") {
            return "Enter your name...";
        } else if (onboardingStep === "contact") {
            return "Enter your email or phone number...";
        } else {
            return "Type your message...";
        }
    };

    // Quick responses based on onboarding state
    const getQuickResponses = () => {
        if (onboardingStep === "complete" && userData) {
            return [
                {
                    text: "Book appointment",
                    action: () =>
                        sendMessage("I'd like to book an appointment"),
                },
                {
                    text: "Clinic services",
                    action: () => sendMessage("What services do you offer?"),
                },
                {
                    text: "Clinic hours",
                    action: () => sendMessage("What are your clinic hours?"),
                },
                {
                    text: "Form submitted",
                    action: () => sendMessage("I have submitted the form"),
                },
            ];
        }
        return [];
    };

    return (
        <div className="flex flex-col h-[45rem] bg-white rounded-lg overflow-hidden shadow-lg border border-gray-200">
            {/* Chat Header */}
            <div className="flex items-center justify-between p-3 bg-blue-600 text-white">
                <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                        <Sparkles size={16} className="text-white" />
                    </div>
                    <div>
                        <h3 className="font-medium">Kraftodent AI</h3>
                        <p className="text-xs text-blue-100">
                            {userData
                                ? `Hello, ${userData.name}`
                                : "Demo Assistant"}
                        </p>
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

            {/* User Info Panel */}
            {userData && (
                <div className="bg-blue-50 border-b border-blue-200 p-2">
                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2">
                            <User size={14} className="text-blue-600" />
                            <span className="text-blue-800 font-medium">
                                {userData.name}
                            </span>
                            <span className="text-blue-600">•</span>
                            <div className="flex items-center space-x-1">
                                {userData.contactType === "email" ? (
                                    <Mail size={12} className="text-blue-600" />
                                ) : (
                                    <Phone
                                        size={12}
                                        className="text-blue-600"
                                    />
                                )}
                                <span className="text-blue-700">
                                    {userData.contact}
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center space-x-1">
                            <div
                                className={`w-2 h-2 rounded-full ${userData.isOnboarded
                                    ? "bg-green-500"
                                    : "bg-yellow-500"
                                    }`}
                            ></div>
                            <span className="text-xs text-blue-700">
                                {userData.isOnboarded
                                    ? "Ready"
                                    : "Pending form"}
                            </span>
                        </div>
                    </div>
                </div>
            )}

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
                            About Kraftodent Demo
                        </h4>
                        <div className="text-sm text-blue-700 space-y-2">
                            <p>
                                This demo shows how our AI dental receptionist
                                works:
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                <div>
                                    <strong>✓ Patient onboarding</strong>
                                    <p className="text-xs">
                                        Collect basic information
                                    </p>
                                </div>
                                <div>
                                    <strong>✓ Appointment scheduling</strong>
                                    <p className="text-xs">
                                        Book available time slots
                                    </p>
                                </div>
                                <div>
                                    <strong>✓ Answer clinic questions</strong>
                                    <p className="text-xs">
                                        Services, hours, procedures
                                    </p>
                                </div>
                                <div>
                                    <strong>✓ 24/7 availability</strong>
                                    <p className="text-xs">
                                        Always ready to help
                                    </p>
                                </div>
                            </div>
                            <p className="text-xs border-t border-blue-200 pt-2 mt-2">
                                For emergencies, call:{" "}
                                <strong>+91 90280 02031</strong>
                            </p>
                        </div>
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

                            {/* Render confirmation UI if this is a booking confirmation */}
                            {message.isBookingConfirmation &&
                                message.sender === "bot" && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{
                                            duration: 0.3,
                                            delay: 0.3,
                                        }}
                                        className="mt-4 bg-green-50 p-4 rounded-lg border border-green-200"
                                    >
                                        <div className="flex items-center space-x-3 mb-2">
                                            <div className="p-2 bg-green-100 rounded-full text-green-600">
                                                <Clock size={16} />
                                            </div>
                                            <h4 className="font-medium text-green-800">
                                                Appointment Confirmed!
                                            </h4>
                                        </div>
                                        <p className="text-sm text-green-700">
                                            You'll receive a confirmation
                                            message and reminder before your
                                            appointment.
                                        </p>
                                    </motion.div>
                                )}
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
                        <span>AI is thinking...</span>
                    </motion.div>
                )}

                <div ref={messageEndRef} />
            </div>

            {/* Quick Responses */}
            {getQuickResponses().length > 0 && (
                <div className="px-4 py-2 bg-gray-50 border-t border-gray-200">
                    <div className="flex flex-wrap gap-2">
                        {getQuickResponses().map((item, index) => (
                            <Button
                                key={index}
                                variant="outline"
                                size="sm"
                                className="text-xs py-1 h-auto text-blue-600 border-blue-200 hover:bg-blue-50"
                                onClick={item.action}
                                disabled={isLoading}
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
                        placeholder={getPlaceholderText()}
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
