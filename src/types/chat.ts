// src/types/chat.ts

export interface PatientRegistrationData {
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

export interface UserData {
    name: string;
    contact: string;
    contactType: "email" | "phone";
    isOnboarded: boolean;
}

export interface ChatMessage {
    id: string;
    content: string;
    sender: "user" | "bot";
    timestamp: number;
    isBookingConfirmation?: boolean;
}

export interface PatientRegistrationFormProps {
    onRegistrationComplete: (userData: UserData) => void;
    onError: (error: string) => void;
}

export interface ChatWindowProps {
    userData: UserData;
    onClearSession: () => void;
}

export interface ChatBubbleProps {
    message: ChatMessage;
}

export interface QuickActionsProps {
    onActionClick: (message: string) => void;
    disabled?: boolean;
}

export interface ValidationErrors {
    [key: string]: string;
}

// Constants
export const GOOGLE_SHEETS_CONFIG = {
    spreadsheetId: process.env.NEXT_PUBLIC_GOOGLE_SHEETS_ID,
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY,
    range: "patient!A:M",
};

export const N8N_WEBHOOK_URL =
    process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL ||
    "https://n8n.srv850966.hstgr.cloud/webhook/f298d6c0-d7c8-4ee4-9703-278436367d82";

export const LOCAL_STORAGE_KEYS = {
    USER_DATA: "kraftodent_user_data",
    CHAT_MESSAGES: "kraftodent_chat_messages",
    REGISTRATION_STATUS: "kraftodent_registration_status",
} as const;
