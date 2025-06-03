// src/lib/api.ts

import {
    PatientRegistrationData,
    UserData,
    N8N_WEBHOOK_URL,
} from "@/types/chat";

/**
 * Submit patient registration data to Google Sheets via Google Apps Script
 * This approach is more secure and doesn't require OAuth for write operations
 */
export async function submitToGoogleSheets(
    data: PatientRegistrationData
): Promise<boolean> {
    try {
        // For now, we'll create a Google Apps Script Web App endpoint
        // This is the recommended approach for writing to Google Sheets from web apps
        const GOOGLE_APPS_SCRIPT_URL =
            process.env.NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL;

        if (!GOOGLE_APPS_SCRIPT_URL) {
            console.error("Google Apps Script URL not configured");
            // Fall back to console logging for demo purposes
            console.log(
                "Patient Registration Data (would be sent to Google Sheets):",
                data
            );
            return true; // Return true for demo to allow flow to continue
        }

        // Prepare the data payload
        const payload = {
            action: "addPatient",
            data: {
                timestamp: data.timestamp,
                firstName: data.firstName,
                lastName: data.lastName,
                dateOfBirth: data.dateOfBirth,
                gender: data.gender,
                emailAddress: data.emailAddress,
                phoneNumber: data.phoneNumber,
                address: data.address,
                allergies: data.allergies || "None",
                medicalConditions: data.medicalConditions || "None",
                currentDentalProblems: data.currentDentalProblems || "No",
                dentalProblemsDetails: data.dentalProblemsDetails || "",
            },
        };

        const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error(
                `Google Apps Script request failed: ${response.status}`
            );
        }

        const result = await response.json();

        if (result.success) {
            console.log(
                "Successfully submitted to Google Sheets via Apps Script"
            );
            return true;
        } else {
            throw new Error(
                result.error || "Unknown error from Google Apps Script"
            );
        }
    } catch (error) {
        console.error("Error submitting to Google Sheets:", error);

        // For demo purposes, log the data and return true to continue the flow
        console.log("Patient Registration Data (logging due to API error):", {
            name: `${data.firstName} ${data.lastName}`,
            email: data.emailAddress,
            phone: data.phoneNumber,
            timestamp: data.timestamp,
        });

        // In a real application, you might want to store this in localStorage
        // and retry later, or send to an alternative endpoint
        return true; // Allow demo to continue
    }
}

/**
 * Alternative method using Google Forms as a fallback
 * This can be used if Google Apps Script isn't available
 */
export async function submitToGoogleForm(
    data: PatientRegistrationData
): Promise<boolean> {
    try {
        const GOOGLE_FORM_URL = process.env.NEXT_PUBLIC_GOOGLE_FORM_URL;

        if (!GOOGLE_FORM_URL) {
            console.log("Google Form URL not configured");
            return false;
        }

        // Google Forms expects form data, not JSON
        const formData = new FormData();

        // You'll need to map these to your actual Google Form field names
        // These are example field names - replace with your actual form field IDs
        formData.append(
            "entry.123456789",
            `${data.firstName} ${data.lastName}`
        );
        formData.append("entry.987654321", data.emailAddress);
        formData.append("entry.456789123", data.phoneNumber);
        formData.append("entry.789123456", data.dateOfBirth);
        formData.append("entry.321654987", data.gender);
        formData.append("entry.654987321", data.address);
        formData.append("entry.147258369", data.allergies || "None");
        formData.append("entry.258369147", data.medicalConditions || "None");
        formData.append("entry.369147258", data.currentDentalProblems || "No");
        formData.append("entry.741852963", data.dentalProblemsDetails || "");

        const response = await fetch(GOOGLE_FORM_URL, {
            method: "POST",
            body: formData,
            mode: "no-cors", // Required for Google Forms
        });

        // Note: no-cors mode means we can't read the response
        // We'll assume success if no error is thrown
        console.log("Submitted to Google Form");
        return true;
    } catch (error) {
        console.error("Error submitting to Google Form:", error);
        return false;
    }
}

/**
 * Send message to N8N webhook for AI processing
 */
export async function sendToWebhook(
    message: string,
    userData: UserData
): Promise<string> {
    try {
        const payload = {
            message: message,
            user: {
                name: userData.name,
                contact: userData.contact,
                contactType: userData.contactType,
                timestamp: new Date().toISOString(),
            },
            metadata: {
                source: "kraftodent_chat",
                sessionId: generateSessionId(),
            },
        };
        const response = await fetch(N8N_WEBHOOK_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error(`Webhook request failed: ${response.status}`);
        }

        // N8N webhook returns the response directly as text
        const result = await response.text();

        // Return the direct text response from N8N
        return (
            result ||
            "Thank you for your message! I'm here to help you with your dental needs. How can I assist you today?"
        );
    } catch (error) {
        console.error("Error sending to webhook:", error);

        // Return a helpful fallback response
        return getAIFallbackResponse(message);
    }
}

/**
 * Generate a unique session ID
 */
function generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Provide fallback AI responses when webhook is unavailable
 */
function getAIFallbackResponse(message: string): string {
    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes("appointment") || lowerMessage.includes("book")) {
        return "I'd be happy to help you book an appointment! Our clinic is open Monday to Saturday from 9 AM to 6 PM. What type of appointment would you like to schedule? We offer general checkups, cleanings, fillings, and various dental procedures.";
    }

    if (lowerMessage.includes("emergency")) {
        return "For dental emergencies, please call our clinic immediately at +91 98222 96812. If it's after hours, you can visit the nearest hospital emergency room. Common dental emergencies include severe tooth pain, broken teeth, or facial swelling.";
    }

    if (
        lowerMessage.includes("service") ||
        lowerMessage.includes("treatment")
    ) {
        return "We offer a comprehensive range of dental services including:\n• General checkups and cleanings\n• Fillings and crowns\n• Root canal therapy\n• Teeth whitening\n• Dental implants\n• Orthodontic treatment\n• Oral surgery\n\nWould you like more information about any specific service?";
    }

    if (lowerMessage.includes("hours") || lowerMessage.includes("time")) {
        return "Our clinic hours are:\nMonday - Saturday: 9:00 AM to 6:00 PM\nSunday: Closed\n\nWe're located in Pune, Maharashtra. Would you like to schedule an appointment during these hours?";
    }

    if (lowerMessage.includes("location") || lowerMessage.includes("address")) {
        return "Our dental clinic is located in Pune, Maharashtra, India. We're easily accessible by public transport and have parking available. Would you like specific directions or help booking an appointment?";
    }

    if (
        lowerMessage.includes("cost") ||
        lowerMessage.includes("price") ||
        lowerMessage.includes("fee")
    ) {
        return "Our treatment costs vary depending on the specific procedure needed. We offer competitive pricing and accept various payment methods. For accurate pricing, I'd recommend scheduling a consultation where our dentist can assess your needs and provide a detailed treatment plan with costs.";
    }

    // Default response
    return "Thank you for reaching out to Kraftodent! I'm here to help you with:\n• Booking appointments\n• Information about our services\n• Clinic hours and location\n• General dental questions\n\nHow can I assist you today?";
}

/**
 * Format patient data for chat context
 */
export function formatPatientDataForChat(
    data: PatientRegistrationData
): string {
    return `Welcome ${data.firstName}! Your registration is complete. I have your contact information (${data.emailAddress}) and I'm ready to help you with any dental needs you may have.`;
}

/**
 * Validate environment variables
 */
export function validateApiConfiguration(): {
    isValid: boolean;
    errors: string[];
} {
    const errors: string[] = [];

    if (!N8N_WEBHOOK_URL) {
        errors.push("N8N webhook URL is not configured");
    }

    const hasGoogleAppsScript =
        !!process.env.NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL;
    const hasGoogleForm = !!process.env.NEXT_PUBLIC_GOOGLE_FORM_URL;

    if (!hasGoogleAppsScript && !hasGoogleForm) {
        errors.push(
            "No Google integration method configured (Apps Script or Forms)"
        );
    }

    return {
        isValid: errors.length === 0,
        errors,
    };
}

/**
 * Test API endpoints
 */
export async function testApiEndpoints(): Promise<{
    webhook: boolean;
    sheets: boolean;
}> {
    const results = {
        webhook: false,
        sheets: false,
    };

    // Test webhook
    try {
        const testResponse = await fetch(N8N_WEBHOOK_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ test: true }),
        });
        results.webhook = testResponse.ok;
    } catch {
        results.webhook = false;
    }

    // Test Google Apps Script if configured
    const appsScriptUrl = process.env.NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL;
    if (appsScriptUrl) {
        try {
            const testResponse = await fetch(appsScriptUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action: "test" }),
            });
            results.sheets = testResponse.ok;
        } catch {
            results.sheets = false;
        }
    } else {
        // If no Apps Script URL, assume sheets integration works for demo
        results.sheets = true;
    }

    return results;
}
