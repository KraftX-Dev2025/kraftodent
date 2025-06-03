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
    CheckCircle,
    ArrowRight,
    Calendar,
    AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ChatBubble from "./ChatBubble";

// Define the webhook URL
const N8N_WEBHOOK_URL =
    "https://leotekg.app.n8n.cloud/webhook/f298d6c0-d7c8-4ee4-9703-278436367d82";

// Google Sheets configuration
const GOOGLE_SHEETS_CONFIG = {
    spreadsheetId: "1m3HYQPZaAUSdyyonnL96IdVODe5Dh1-87QGGe8y9rkw",
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY || "",
    range: "patient!A:M", // Adjust range to match your sheet columns
};

// Define message type
interface ChatMessage {
    id: string;
    content: string;
    sender: "user" | "bot";
    timestamp: number;
    isBookingConfirmation?: boolean;
}

// Define patient registration data interface
interface PatientRegistrationData {
    timestamp: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    gender: string;
    emailAddress: string;
    phoneNumber: string;
    address: string;
    allergies: string;
    medicalConditions: string;
    currentDentalProblems: string;
    dentalProblemsDetails: string;
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

// Function to submit data directly to Google Sheets
async function submitToGoogleSheets(
    data: PatientRegistrationData
): Promise<boolean> {
    try {
        // Prepare the row data in the exact order of your Google Sheets columns
        const rowData = [
            data.timestamp,
            data.firstName,
            data.lastName,
            data.dateOfBirth,
            data.gender,
            data.emailAddress,
            data.phoneNumber,
            data.address,
            data.allergies,
            data.medicalConditions,
            data.currentDentalProblems,
            data.dentalProblemsDetails,
        ];

        // Use Google Sheets API to append the row
        const response = await fetch(
            `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEETS_CONFIG.spreadsheetId}/values/${GOOGLE_SHEETS_CONFIG.range}:append?valueInputOption=RAW&key=${GOOGLE_SHEETS_CONFIG.apiKey}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    values: [rowData],
                }),
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return true;
    } catch (error) {
        console.error("Error submitting to Google Sheets:", error);
        return false;
    }
}

export default function ChatInterface() {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [inputMessage, setInputMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showHelp, setShowHelp] = useState(false);

    // Registration form states
    const [showRegistrationForm, setShowRegistrationForm] = useState(true);
    const [isSubmittingForm, setIsSubmittingForm] = useState(false);
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});
    const [currentStep, setCurrentStep] = useState(1);
    const [registrationData, setRegistrationData] =
        useState<PatientRegistrationData>({
            timestamp: "",
            firstName: "",
            lastName: "",
            dateOfBirth: "",
            gender: "",
            emailAddress: "",
            phoneNumber: "",
            address: "",
            allergies: "",
            medicalConditions: "",
            currentDentalProblems: "",
            dentalProblemsDetails: "",
        });

    // Chat states
    const [userData, setUserData] = useState<UserData | null>(null);

    const messageEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const messageContainerRef = useRef<HTMLDivElement>(null);

    // Check if user is already registered on component mount
    useEffect(() => {
        const savedUserData = getFromLocalStorage<UserData | null>(
            "kraftodentUserData",
            null
        );
        const isRegistered = getFromLocalStorage<boolean>(
            "kraftodentPatientRegistered",
            false
        );

        if (savedUserData && isRegistered) {
            setUserData(savedUserData);
            setShowRegistrationForm(false);

            // Load existing messages or show welcome message
            const savedMessages = getFromLocalStorage<ChatMessage[]>(
                "kraftodentChatMessages",
                []
            );

            if (savedMessages.length > 0) {
                setMessages(savedMessages);
            } else {
                const welcomeMessage: ChatMessage = {
                    id: "welcome",
                    content: `Hello ${savedUserData.name}! Welcome back to Kraftodent. How can I assist you today? I can help you book an appointment or answer any questions about our dental services.`,
                    sender: "bot",
                    timestamp: Date.now(),
                };
                setMessages([welcomeMessage]);
                saveToLocalStorage("kraftodentChatMessages", [welcomeMessage]);
            }
        }
    }, []);

    // Scroll to bottom when messages change
    useEffect(() => {
        if (messageContainerRef.current) {
            messageContainerRef.current.scrollTop =
                messageContainerRef.current.scrollHeight;
        }
    }, [messages]);

    // Handle registration form input changes
    const handleRegistrationInputChange = (
        field: keyof PatientRegistrationData,
        value: string
    ) => {
        setRegistrationData((prev) => ({
            ...prev,
            [field]: value,
        }));

        // Clear error for this field
        if (formErrors[field]) {
            setFormErrors((prev) => {
                const updated = { ...prev };
                delete updated[field];
                return updated;
            });
        }
    };

    // Validate registration form
    const validateRegistrationForm = (): boolean => {
        const errors: Record<string, string> = {};

        if (currentStep === 1) {
            if (!registrationData.firstName.trim()) {
                errors.firstName = "First name is required";
            }
            if (!registrationData.lastName.trim()) {
                errors.lastName = "Last name is required";
            }
            if (!registrationData.dateOfBirth) {
                errors.dateOfBirth = "Date of birth is required";
            }
            if (!registrationData.gender) {
                errors.gender = "Gender is required";
            }
        }

        if (currentStep === 2) {
            if (!registrationData.emailAddress.trim()) {
                errors.emailAddress = "Email address is required";
            } else if (!isValidEmail(registrationData.emailAddress)) {
                errors.emailAddress = "Please enter a valid email address";
            }

            if (!registrationData.phoneNumber.trim()) {
                errors.phoneNumber = "Phone number is required";
            } else if (!isValidPhone(registrationData.phoneNumber)) {
                errors.phoneNumber = "Please enter a valid phone number";
            }

            if (!registrationData.address.trim()) {
                errors.address = "Address is required";
            }
        }

        if (currentStep === 3) {
            if (!registrationData.currentDentalProblems) {
                errors.currentDentalProblems = "Please select an option";
            }
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    // Handle next step in registration
    const handleNextStep = () => {
        if (validateRegistrationForm()) {
            if (currentStep < 3) {
                setCurrentStep(currentStep + 1);
            } else {
                handleSubmitRegistration();
            }
        }
    };

    // Handle previous step in registration
    const handlePreviousStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    // Submit registration form directly to Google Sheets
    const handleSubmitRegistration = async () => {
        if (!validateRegistrationForm()) return;

        setIsSubmittingForm(true);

        try {
            const submitData = {
                ...registrationData,
                timestamp: new Date().toISOString(),
            };

            // Submit directly to Google Sheets
            const success = await submitToGoogleSheets(submitData);

            if (!success) {
                throw new Error("Failed to submit to Google Sheets");
            }

            // Create user data for chat
            const newUserData: UserData = {
                name: `${registrationData.firstName} ${registrationData.lastName}`,
                contact: registrationData.emailAddress,
                contactType: "email",
                isOnboarded: true,
            };

            // Save to localStorage
            setUserData(newUserData);
            saveToLocalStorage("kraftodentUserData", newUserData);
            saveToLocalStorage("kraftodentPatientRegistered", true);
            saveToLocalStorage("kraftodentRegistrationData", submitData);

            // Show chat interface
            setShowRegistrationForm(false);

            // Add welcome message
            const welcomeMessage: ChatMessage = {
                id: "welcome",
                content: `Hello ${newUserData.name}! Thank you for registering with Kraftodent. How can I assist you today? I can help you book an appointment or answer any questions about our dental services.`,
                sender: "bot",
                timestamp: Date.now(),
            };
            setMessages([welcomeMessage]);
            saveToLocalStorage("kraftodentChatMessages", [welcomeMessage]);
        } catch (error) {
            console.error("Error submitting registration:", error);
            setFormErrors({
                submit: "Failed to submit registration. Please try again.",
            });
        } finally {
            setIsSubmittingForm(false);
        }
    };

    // Rest of the chat functionality remains the same...
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
        // Clear all data and restart with registration
        localStorage.removeItem("kraftodentChatMessages");
        localStorage.removeItem("kraftodentUserData");
        localStorage.removeItem("kraftodentPatientRegistered");
        localStorage.removeItem("kraftodentRegistrationData");

        setUserData(null);
        setMessages([]);
        setShowRegistrationForm(true);
        setCurrentStep(1);
        setRegistrationData({
            timestamp: "",
            firstName: "",
            lastName: "",
            dateOfBirth: "",
            gender: "",
            emailAddress: "",
            phoneNumber: "",
            address: "",
            allergies: "",
            medicalConditions: "",
            currentDentalProblems: "",
            dentalProblemsDetails: "",
        });
    };

    const toggleHelp = () => {
        setShowHelp(!showHelp);
    };

    // Quick responses for chat
    const getQuickResponses = () => {
        if (userData) {
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
                    text: "Emergency contact",
                    action: () => sendMessage("I have a dental emergency"),
                },
            ];
        }
        return [];
    };

    // Render registration form
    if (showRegistrationForm) {
        return (
            <div className="flex flex-col h-[600px] md:h-[700px] bg-white rounded-lg overflow-hidden shadow-lg border border-gray-200">
                {/* Registration Header */}
                <div className="flex items-center justify-between p-4 bg-blue-600 text-white">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                            <User size={16} className="text-white" />
                        </div>
                        <div>
                            <h3 className="font-medium">
                                Patient Registration
                            </h3>
                            <p className="text-xs text-blue-100">
                                Step {currentStep} of 3
                            </p>
                        </div>
                    </div>
                    <div className="text-sm">Kraftodent Demo</div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 h-2">
                    <div
                        className="bg-blue-600 h-2 transition-all duration-300"
                        style={{ width: `${(currentStep / 3) * 100}%` }}
                    ></div>
                </div>

                {/* Registration Form */}
                <div className="flex-grow overflow-y-auto p-6">
                    <div className="max-w-md mx-auto">
                        <motion.div
                            key={currentStep}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            {currentStep === 1 && (
                                <div className="space-y-4">
                                    <h4 className="text-lg font-semibold text-gray-800 mb-4">
                                        Personal Information
                                    </h4>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                First Name *
                                            </label>
                                            <Input
                                                value={
                                                    registrationData.firstName
                                                }
                                                onChange={(e) =>
                                                    handleRegistrationInputChange(
                                                        "firstName",
                                                        e.target.value
                                                    )
                                                }
                                                className={
                                                    formErrors.firstName
                                                        ? "border-red-500"
                                                        : ""
                                                }
                                                placeholder="John"
                                            />
                                            {formErrors.firstName && (
                                                <p className="text-red-500 text-xs mt-1">
                                                    {formErrors.firstName}
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Last Name *
                                            </label>
                                            <Input
                                                value={
                                                    registrationData.lastName
                                                }
                                                onChange={(e) =>
                                                    handleRegistrationInputChange(
                                                        "lastName",
                                                        e.target.value
                                                    )
                                                }
                                                className={
                                                    formErrors.lastName
                                                        ? "border-red-500"
                                                        : ""
                                                }
                                                placeholder="Doe"
                                            />
                                            {formErrors.lastName && (
                                                <p className="text-red-500 text-xs mt-1">
                                                    {formErrors.lastName}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Date of Birth *
                                        </label>
                                        <Input
                                            type="date"
                                            value={registrationData.dateOfBirth}
                                            onChange={(e) =>
                                                handleRegistrationInputChange(
                                                    "dateOfBirth",
                                                    e.target.value
                                                )
                                            }
                                            className={
                                                formErrors.dateOfBirth
                                                    ? "border-red-500"
                                                    : ""
                                            }
                                        />
                                        {formErrors.dateOfBirth && (
                                            <p className="text-red-500 text-xs mt-1">
                                                {formErrors.dateOfBirth}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Gender *
                                        </label>
                                        <select
                                            value={registrationData.gender}
                                            onChange={(e) =>
                                                handleRegistrationInputChange(
                                                    "gender",
                                                    e.target.value
                                                )
                                            }
                                            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                                                formErrors.gender
                                                    ? "border-red-500"
                                                    : "border-gray-300"
                                            }`}
                                        >
                                            <option value="">
                                                Select Gender
                                            </option>
                                            <option value="Male">Male</option>
                                            <option value="Female">
                                                Female
                                            </option>
                                            <option value="Other">Other</option>
                                            <option value="Prefer not to say">
                                                Prefer not to say
                                            </option>
                                        </select>
                                        {formErrors.gender && (
                                            <p className="text-red-500 text-xs mt-1">
                                                {formErrors.gender}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}

                            {currentStep === 2 && (
                                <div className="space-y-4">
                                    <h4 className="text-lg font-semibold text-gray-800 mb-4">
                                        Contact Information
                                    </h4>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Email Address *
                                        </label>
                                        <Input
                                            type="email"
                                            value={
                                                registrationData.emailAddress
                                            }
                                            onChange={(e) =>
                                                handleRegistrationInputChange(
                                                    "emailAddress",
                                                    e.target.value
                                                )
                                            }
                                            className={
                                                formErrors.emailAddress
                                                    ? "border-red-500"
                                                    : ""
                                            }
                                            placeholder="john.doe@example.com"
                                        />
                                        {formErrors.emailAddress && (
                                            <p className="text-red-500 text-xs mt-1">
                                                {formErrors.emailAddress}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Phone Number *
                                        </label>
                                        <Input
                                            type="tel"
                                            value={registrationData.phoneNumber}
                                            onChange={(e) =>
                                                handleRegistrationInputChange(
                                                    "phoneNumber",
                                                    e.target.value
                                                )
                                            }
                                            className={
                                                formErrors.phoneNumber
                                                    ? "border-red-500"
                                                    : ""
                                            }
                                            placeholder="+91 9876543210"
                                        />
                                        {formErrors.phoneNumber && (
                                            <p className="text-red-500 text-xs mt-1">
                                                {formErrors.phoneNumber}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Address *
                                        </label>
                                        <textarea
                                            value={registrationData.address}
                                            onChange={(e) =>
                                                handleRegistrationInputChange(
                                                    "address",
                                                    e.target.value
                                                )
                                            }
                                            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                                                formErrors.address
                                                    ? "border-red-500"
                                                    : "border-gray-300"
                                            }`}
                                            rows={3}
                                            placeholder="Your complete address"
                                        />
                                        {formErrors.address && (
                                            <p className="text-red-500 text-xs mt-1">
                                                {formErrors.address}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}

                            {currentStep === 3 && (
                                <div className="space-y-4">
                                    <h4 className="text-lg font-semibold text-gray-800 mb-4">
                                        Medical Information
                                    </h4>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Do you have any allergies? If "yes",
                                            please list all your allergies:
                                        </label>
                                        <textarea
                                            value={registrationData.allergies}
                                            onChange={(e) =>
                                                handleRegistrationInputChange(
                                                    "allergies",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                            rows={2}
                                            placeholder="List any allergies or type 'None'"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Have you ever had any of the
                                            following conditions?
                                        </label>
                                        <textarea
                                            value={
                                                registrationData.medicalConditions
                                            }
                                            onChange={(e) =>
                                                handleRegistrationInputChange(
                                                    "medicalConditions",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                            rows={2}
                                            placeholder="List any medical conditions or type 'None'"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Are you currently experiencing any
                                            dental problems or pain? *
                                        </label>
                                        <div className="space-y-2">
                                            <label className="flex items-center">
                                                <input
                                                    type="radio"
                                                    name="dentalProblems"
                                                    value="Yes"
                                                    checked={
                                                        registrationData.currentDentalProblems ===
                                                        "Yes"
                                                    }
                                                    onChange={(e) =>
                                                        handleRegistrationInputChange(
                                                            "currentDentalProblems",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="mr-2"
                                                />
                                                Yes
                                            </label>
                                            <label className="flex items-center">
                                                <input
                                                    type="radio"
                                                    name="dentalProblems"
                                                    value="No"
                                                    checked={
                                                        registrationData.currentDentalProblems ===
                                                        "No"
                                                    }
                                                    onChange={(e) =>
                                                        handleRegistrationInputChange(
                                                            "currentDentalProblems",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="mr-2"
                                                />
                                                No
                                            </label>
                                        </div>
                                        {formErrors.currentDentalProblems && (
                                            <p className="text-red-500 text-xs mt-1">
                                                {
                                                    formErrors.currentDentalProblems
                                                }
                                            </p>
                                        )}
                                    </div>

                                    {registrationData.currentDentalProblems ===
                                        "Yes" && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                If "yes", state them below:
                                            </label>
                                            <textarea
                                                value={
                                                    registrationData.dentalProblemsDetails
                                                }
                                                onChange={(e) =>
                                                    handleRegistrationInputChange(
                                                        "dentalProblemsDetails",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                                rows={3}
                                                placeholder="Please describe your dental problems in detail"
                                            />
                                        </div>
                                    )}
                                </div>
                            )}
                        </motion.div>

                        {formErrors.submit && (
                            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                                <div className="flex items-center">
                                    <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                                    <p className="text-red-700 text-sm">
                                        {formErrors.submit}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Form Navigation */}
                <div className="p-4 bg-gray-50 border-t">
                    <div className="max-w-md mx-auto flex justify-between">
                        {currentStep > 1 && (
                            <Button
                                variant="outline"
                                onClick={handlePreviousStep}
                                disabled={isSubmittingForm}
                            >
                                Previous
                            </Button>
                        )}

                        <div className={currentStep === 1 ? "ml-auto" : ""}>
                            <Button
                                onClick={handleNextStep}
                                disabled={isSubmittingForm}
                                className="bg-blue-600 hover:bg-blue-700 text-white"
                            >
                                {isSubmittingForm ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                        Submitting...
                                    </>
                                ) : currentStep === 3 ? (
                                    <>
                                        Complete Registration
                                        <CheckCircle
                                            size={16}
                                            className="ml-2"
                                        />
                                    </>
                                ) : (
                                    <>
                                        Next
                                        <ArrowRight
                                            size={16}
                                            className="ml-2"
                                        />
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Render chat interface (existing chat code)
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
                        aria-label="Clear chat and restart registration"
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
                                className={`w-2 h-2 rounded-full ${
                                    userData.isOnboarded
                                        ? "bg-green-500"
                                        : "bg-yellow-500"
                                }`}
                            ></div>
                            <span className="text-xs text-blue-700">
                                Registered
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
                                    <strong>✓ Patient registration</strong>
                                    <p className="text-xs">
                                        Complete medical intake form
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
                        {/* <span>AI is thinking...</span> */}
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
                <div className="flex gap-4">
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
