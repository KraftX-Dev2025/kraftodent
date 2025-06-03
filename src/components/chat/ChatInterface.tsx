// src/components/chat/ChatInterface.tsx

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Users, RefreshCw, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import PatientRegistrationForm from "./PatientRegistrationForm";
import ChatWindow from "./ChatWindow";
import { UserData, LOCAL_STORAGE_KEYS } from "@/types/chat";
import {
    saveToLocalStorage,
    getFromLocalStorage,
    removeFromLocalStorage,
} from "@/lib/localStorage";

export default function ChatInterface() {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showRegistration, setShowRegistration] = useState(false);

    useEffect(() => {
        checkRegistrationStatus();
    }, []);

    const checkRegistrationStatus = () => {
        try {
            const savedUserData = getFromLocalStorage<UserData | null>(
                LOCAL_STORAGE_KEYS.USER_DATA,
                null
            );
            const registrationStatus = getFromLocalStorage<boolean>(
                LOCAL_STORAGE_KEYS.REGISTRATION_STATUS,
                false
            );

            if (savedUserData && registrationStatus) {
                setUserData(savedUserData);
                setShowRegistration(false);
            } else {
                setShowRegistration(true);
            }
        } catch (error) {
            console.error("Error checking registration status:", error);
            setError("Failed to load user data");
            setShowRegistration(true);
        } finally {
            setIsLoading(false);
        }
    };

    const handleRegistrationComplete = (newUserData: UserData) => {
        try {
            setUserData(newUserData);
            saveToLocalStorage(LOCAL_STORAGE_KEYS.USER_DATA, newUserData);
            saveToLocalStorage(LOCAL_STORAGE_KEYS.REGISTRATION_STATUS, true);
            setShowRegistration(false);
            setError(null);
        } catch (error) {
            console.error("Error saving user data:", error);
            setError("Failed to save registration data");
        }
    };

    const handleRegistrationError = (errorMessage: string) => {
        setError(errorMessage);
    };

    const handleClearSession = () => {
        try {
            removeFromLocalStorage(LOCAL_STORAGE_KEYS.USER_DATA);
            removeFromLocalStorage(LOCAL_STORAGE_KEYS.REGISTRATION_STATUS);
            removeFromLocalStorage(LOCAL_STORAGE_KEYS.CHAT_MESSAGES);
            setUserData(null);
            setShowRegistration(true);
            setError(null);
        } catch (error) {
            console.error("Error clearing session:", error);
            setError("Failed to clear session");
        }
    };

    const handleRetry = () => {
        setError(null);
        setIsLoading(true);
        setTimeout(() => {
            checkRegistrationStatus();
        }, 500);
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-[600px] bg-gray-50 rounded-lg">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center"
                >
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading chat interface...</p>
                </motion.div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-[600px] bg-gray-50 rounded-lg">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center max-w-md p-6"
                >
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <AlertCircle className="w-8 h-8 text-red-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        Something went wrong
                    </h3>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <div className="flex flex-col sm:flex-row gap-2 justify-center">
                        <Button
                            onClick={handleRetry}
                            className="flex items-center"
                        >
                            <RefreshCw size={16} className="mr-2" />
                            Try Again
                        </Button>
                        <Button
                            variant="outline"
                            onClick={handleClearSession}
                            className="flex items-center"
                        >
                            <Users size={16} className="mr-2" />
                            Start Over
                        </Button>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-4xl mx-auto">
            {/* Interface Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-6"
            >
                <div className="flex items-center justify-center mb-3">
                    <div className="p-3 bg-blue-100 rounded-full mr-3">
                        <MessageSquare className="w-6 h-6 text-blue-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">
                        Kraftodent AI Assistant
                    </h2>
                </div>
                <p className="text-gray-600">
                    {showRegistration
                        ? "Please complete your registration to start chatting with our AI assistant"
                        : "Chat with our AI assistant for appointments, information, and support"}
                </p>
            </motion.div>

            {/* Main Interface */}
            <AnimatePresence mode="wait">
                {showRegistration ? (
                    <motion.div
                        key="registration"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <PatientRegistrationForm
                            onRegistrationComplete={handleRegistrationComplete}
                            onError={handleRegistrationError}
                        />
                    </motion.div>
                ) : userData ? (
                    <motion.div
                        key="chat"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <ChatWindow
                            userData={userData}
                            onClearSession={handleClearSession}
                        />
                    </motion.div>
                ) : null}
            </AnimatePresence>

            {/* Footer Information */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="mt-6 text-center"
            >
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="flex items-center mb-2 md:mb-0">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                            <span className="text-sm text-blue-800 font-medium">
                                AI Assistant Active
                            </span>
                        </div>
                        <div className="text-xs text-blue-600">
                            Secure • HIPAA Compliant • Available 24/7
                        </div>
                    </div>
                </div>

                <div className="mt-4 text-xs text-gray-500">
                    <p>
                        This is a demo of Kraftodent's AI receptionist. Your
                        data is processed securely and stored according to
                        healthcare privacy standards.
                    </p>
                    <p className="mt-1">
                        For technical support or questions, contact our team at{" "}
                        <a
                            href="mailto:support@kraftodent.com"
                            className="text-blue-600 hover:underline"
                        >
                            support@kraftodent.com
                        </a>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
