// src/lib/validation.ts

import { PatientRegistrationData, ValidationErrors } from "@/types/chat";

/**
 * Email validation using RFC 5322 compliant regex
 * @param email - Email address to validate
 * @returns boolean - true if valid email format
 */
export function isValidEmail(email: string): boolean {
    const emailRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    if (!email || typeof email !== "string") {
        return false;
    }

    const trimmedEmail = email.trim();

    // Basic length check
    if (trimmedEmail.length < 5 || trimmedEmail.length > 254) {
        return false;
    }

    return emailRegex.test(trimmedEmail);
}

/**
 * Indian phone number validation
 * Supports formats: +91XXXXXXXXXX, 91XXXXXXXXXX, XXXXXXXXXX
 * @param phone - Phone number to validate
 * @returns boolean - true if valid Indian phone number
 */
export function isValidPhone(phone: string): boolean {
    if (!phone || typeof phone !== "string") {
        return false;
    }

    // Remove all non-numeric characters except +
    const cleanPhone = phone.replace(/[\s\-\(\)\.]/g, "");

    // Indian phone number patterns
    const patterns = [
        /^\+91[6-9]\d{9}$/, // +91XXXXXXXXXX
        /^91[6-9]\d{9}$/, // 91XXXXXXXXXX
        /^[6-9]\d{9}$/, // XXXXXXXXXX (10 digits starting with 6-9)
        /^0[6-9]\d{9}$/, // 0XXXXXXXXXX (with leading 0)
    ];

    return patterns.some((pattern) => pattern.test(cleanPhone));
}

/**
 * Date validation for date of birth
 * @param dateString - Date string to validate (YYYY-MM-DD format)
 * @returns boolean - true if valid date and reasonable for DOB
 */
export function isValidDate(dateString: string): boolean {
    if (!dateString || typeof dateString !== "string") {
        return false;
    }

    const date = new Date(dateString);
    const today = new Date();

    // Check if date is valid
    if (isNaN(date.getTime())) {
        return false;
    }

    // Check if date is not in the future
    if (date > today) {
        return false;
    }

    // Check minimum age (reasonable age range: 0-120 years)
    const maxAge = new Date(
        today.getFullYear() - 120,
        today.getMonth(),
        today.getDate()
    );
    if (date < maxAge) {
        return false;
    }

    return true;
}

/**
 * Name validation (first name, last name)
 * @param name - Name to validate
 * @param minLength - Minimum length (default: 2)
 * @param maxLength - Maximum length (default: 50)
 * @returns boolean - true if valid name
 */
export function isValidName(
    name: string,
    minLength = 2,
    maxLength = 50
): boolean {
    if (!name || typeof name !== "string") {
        return false;
    }

    const trimmedName = name.trim();

    // Length check
    if (trimmedName.length < minLength || trimmedName.length > maxLength) {
        return false;
    }

    // Only letters, spaces, hyphens, and apostrophes
    const nameRegex = /^[a-zA-Z\s\-'\.]+$/;

    // No consecutive spaces or special characters
    const invalidPatterns = /[\s]{2,}|^[\s\-'\.]+|[\s\-'\.]+$|[\-'\.]{2,}/;

    return nameRegex.test(trimmedName) && !invalidPatterns.test(trimmedName);
}

/**
 * Address validation
 * @param address - Address to validate
 * @returns boolean - true if valid address
 */
export function isValidAddress(address: string): boolean {
    if (!address || typeof address !== "string") {
        return false;
    }

    const trimmedAddress = address.trim();

    // Minimum length check (should be descriptive enough)
    if (trimmedAddress.length < 10) {
        return false;
    }

    // Maximum length check
    if (trimmedAddress.length > 500) {
        return false;
    }

    // Should contain some alphanumeric characters
    const hasAlphanumeric = /[a-zA-Z0-9]/.test(trimmedAddress);

    return hasAlphanumeric;
}

/**
 * Gender validation
 * @param gender - Gender to validate
 * @returns boolean - true if valid gender option
 */
export function isValidGender(gender: string): boolean {
    const validGenders = ["male", "female", "other", "prefer-not-to-say"];
    return validGenders.includes(gender.toLowerCase());
}

/**
 * Medical text validation (allergies, conditions, etc.)
 * @param text - Medical text to validate
 * @param required - Whether the field is required
 * @returns boolean - true if valid
 */
export function isValidMedicalText(text: string, required = false): boolean {
    if (!text || typeof text !== "string") {
        return !required;
    }

    const trimmedText = text.trim();

    if (required && trimmedText.length === 0) {
        return false;
    }

    // If not required and empty, it's valid
    if (!required && trimmedText.length === 0) {
        return true;
    }

    // Maximum length check
    if (trimmedText.length > 1000) {
        return false;
    }

    return true;
}

/**
 * Validate a single step of the registration form
 * @param step - Step number (1, 2, or 3)
 * @param data - Form data to validate
 * @returns ValidationErrors - Object containing any validation errors
 */
export function validateRegistrationStep(
    step: number,
    data: PatientRegistrationData
): ValidationErrors {
    const errors: ValidationErrors = {};

    if (step === 1) {
        // Step 1: Personal Information

        // First Name validation
        if (!data.firstName.trim()) {
            errors.firstName = "First name is required";
        } else if (!isValidName(data.firstName)) {
            if (data.firstName.trim().length < 2) {
                errors.firstName =
                    "First name must be at least 2 characters long";
            } else if (data.firstName.trim().length > 50) {
                errors.firstName = "First name is too long";
            } else {
                errors.firstName = "First name contains invalid characters";
            }
        }

        // Last Name validation
        if (!data.lastName.trim()) {
            errors.lastName = "Last name is required";
        } else if (!isValidName(data.lastName)) {
            if (data.lastName.trim().length < 2) {
                errors.lastName =
                    "Last name must be at least 2 characters long";
            } else if (data.lastName.trim().length > 50) {
                errors.lastName = "Last name is too long";
            } else {
                errors.lastName = "Last name contains invalid characters";
            }
        }

        // Date of Birth validation
        if (!data.dateOfBirth) {
            errors.dateOfBirth = "Date of birth is required";
        } else if (!isValidDate(data.dateOfBirth)) {
            const date = new Date(data.dateOfBirth);
            const today = new Date();

            if (isNaN(date.getTime())) {
                errors.dateOfBirth = "Please enter a valid date";
            } else if (date > today) {
                errors.dateOfBirth = "Date of birth cannot be in the future";
            } else {
                errors.dateOfBirth = "Please enter a valid date of birth";
            }
        }

        // Gender validation
        if (!data.gender) {
            errors.gender = "Gender is required";
        } else if (!isValidGender(data.gender)) {
            errors.gender = "Please select a valid gender option";
        }
    }

    if (step === 2) {
        // Step 2: Contact Information

        // Email validation
        if (!data.emailAddress.trim()) {
            errors.emailAddress = "Email address is required";
        } else if (!isValidEmail(data.emailAddress)) {
            errors.emailAddress = "Please enter a valid email address";
        }

        // Phone validation
        if (!data.phoneNumber.trim()) {
            errors.phoneNumber = "Phone number is required";
        } else if (!isValidPhone(data.phoneNumber)) {
            errors.phoneNumber =
                "Please enter a valid Indian phone number (10 digits starting with 6-9)";
        }

        // Address validation
        if (!data.address.trim()) {
            errors.address = "Address is required";
        } else if (!isValidAddress(data.address)) {
            if (data.address.trim().length < 10) {
                errors.address =
                    "Please enter a complete address (minimum 10 characters)";
            } else {
                errors.address = "Please enter a valid address";
            }
        }
    }

    if (step === 3) {
        // Step 3: Medical Information

        // Allergies validation (optional)
        if (data.allergies && !isValidMedicalText(data.allergies, false)) {
            errors.allergies =
                "Allergies description is too long (maximum 1000 characters)";
        }

        // Medical conditions validation (optional)
        if (
            data.medicalConditions &&
            !isValidMedicalText(data.medicalConditions, false)
        ) {
            errors.medicalConditions =
                "Medical conditions description is too long (maximum 1000 characters)";
        }

        // Current dental problems validation
        if (
            data.currentDentalProblems &&
            !["yes", "no"].includes(data.currentDentalProblems.toLowerCase())
        ) {
            errors.currentDentalProblems = "Please select yes or no";
        }

        // Dental problems details validation (required if currentDentalProblems is 'yes')
        if (data.currentDentalProblems === "yes") {
            if (!data.dentalProblemsDetails.trim()) {
                errors.dentalProblemsDetails =
                    "Please describe your dental problems";
            } else if (!isValidMedicalText(data.dentalProblemsDetails, true)) {
                errors.dentalProblemsDetails =
                    "Description is too long (maximum 1000 characters)";
            }
        }
    }

    return errors;
}

/**
 * Validate the complete registration data
 * @param data - Complete form data
 * @returns ValidationErrors - Object containing any validation errors
 */
export function validateCompleteRegistration(
    data: PatientRegistrationData
): ValidationErrors {
    const step1Errors = validateRegistrationStep(1, data);
    const step2Errors = validateRegistrationStep(2, data);
    const step3Errors = validateRegistrationStep(3, data);

    return { ...step1Errors, ...step2Errors, ...step3Errors };
}

/**
 * Sanitize input to prevent XSS and other security issues
 * @param input - Input string to sanitize
 * @returns string - Sanitized string
 */
export function sanitizeInput(input: string): string {
    if (!input || typeof input !== "string") {
        return "";
    }

    return input
        .trim()
        .replace(/[<>]/g, "") // Remove potential HTML tags
        .replace(/javascript:/gi, "") // Remove javascript: protocols
        .replace(/on\w+=/gi, "") // Remove event handlers
        .slice(0, 1000); // Limit length
}

/**
 * Format phone number for display
 * @param phone - Phone number to format
 * @returns string - Formatted phone number
 */
export function formatPhoneNumber(phone: string): string {
    if (!phone) return "";

    const cleanPhone = phone.replace(/\D/g, "");

    if (cleanPhone.length === 10) {
        return `${cleanPhone.slice(0, 5)} ${cleanPhone.slice(5)}`;
    } else if (cleanPhone.length === 12 && cleanPhone.startsWith("91")) {
        return `+91 ${cleanPhone.slice(2, 7)} ${cleanPhone.slice(7)}`;
    }

    return phone;
}

/**
 * Check if all required fields for a step are filled
 * @param step - Step number
 * @param data - Form data
 * @returns boolean - true if all required fields are filled
 */
export function isStepComplete(
    step: number,
    data: PatientRegistrationData
): boolean {
    const errors = validateRegistrationStep(step, data);
    return Object.keys(errors).length === 0;
}

/**
 * Get validation message for a specific field
 * @param field - Field name
 * @param value - Field value
 * @param data - Complete form data (for context)
 * @returns string - Validation message or empty string if valid
 */
export function getFieldValidationMessage(
    field: keyof PatientRegistrationData,
    value: string,
    data: PatientRegistrationData
): string {
    switch (field) {
        case "firstName":
        case "lastName":
            if (!value.trim())
                return `${
                    field === "firstName" ? "First" : "Last"
                } name is required`;
            if (!isValidName(value)) return "Name contains invalid characters";
            break;

        case "emailAddress":
            if (!value.trim()) return "Email address is required";
            if (!isValidEmail(value))
                return "Please enter a valid email address";
            break;

        case "phoneNumber":
            if (!value.trim()) return "Phone number is required";
            if (!isValidPhone(value))
                return "Please enter a valid phone number";
            break;

        case "dateOfBirth":
            if (!value) return "Date of birth is required";
            if (!isValidDate(value))
                return "Please enter a valid date of birth";
            break;

        case "address":
            if (!value.trim()) return "Address is required";
            if (!isValidAddress(value))
                return "Please enter a complete address";
            break;

        case "dentalProblemsDetails":
            if (data.currentDentalProblems === "yes" && !value.trim()) {
                return "Please describe your dental problems";
            }
            break;
    }

    return "";
}
