// src/components/chat/PatientRegistrationForm.tsx

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ChevronLeft,
    ChevronRight,
    User,
    Mail,
    Phone,
    MapPin,
    Heart,
    AlertTriangle,
    CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    PatientRegistrationFormProps,
    PatientRegistrationData,
    ValidationErrors,
} from "@/types/chat";
import { validateRegistrationStep } from "@/lib/validation";
import { submitToGoogleSheets } from "@/lib/api";

const initialFormData: PatientRegistrationData = {
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
};

export default function PatientRegistrationForm({
    onRegistrationComplete,
    onError,
}: PatientRegistrationFormProps) {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] =
        useState<PatientRegistrationData>(initialFormData);
    const [formErrors, setFormErrors] = useState<ValidationErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const totalSteps = 3;

    const handleInputChange = (
        field: keyof PatientRegistrationData,
        value: string
    ) => {
        setFormData((prev) => ({ ...prev, [field]: value }));

        // Clear error for this field when user types
        if (formErrors[field]) {
            setFormErrors((prev) => {
                const updated = { ...prev };
                delete updated[field];
                return updated;
            });
        }
    };

    const validateStep = (step: number): boolean => {
        const errors = validateRegistrationStep(step, formData);
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleNextStep = () => {
        if (validateStep(currentStep)) {
            setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
        }
    };

    const handlePreviousStep = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 1));
        setFormErrors({});
    };

    const handleSubmit = async () => {
        if (!validateStep(currentStep)) return;

        setIsSubmitting(true);

        try {
            const dataToSubmit = {
                ...formData,
                timestamp: new Date().toISOString(),
            };

            const success = await submitToGoogleSheets(dataToSubmit);

            if (success) {
                const userData = {
                    name: `${formData.firstName} ${formData.lastName}`,
                    contact: formData.emailAddress || formData.phoneNumber,
                    contactType: formData.emailAddress
                        ? ("email" as const)
                        : ("phone" as const),
                    isOnboarded: true,
                };

                onRegistrationComplete(userData);
            } else {
                onError("Failed to register. Please try again.");
            }
        } catch (error) {
            console.error("Registration error:", error);
            onError("An error occurred during registration. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-4"
                    >
                        <div className="text-center mb-6">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                <User className="w-8 h-8 text-blue-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800">
                                Personal Information
                            </h3>
                            <p className="text-sm text-gray-600">
                                Let's start with your basic details
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    First Name *
                                </label>
                                <Input
                                    value={formData.firstName}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "firstName",
                                            e.target.value
                                        )
                                    }
                                    placeholder="Enter your first name"
                                    className={
                                        formErrors.firstName
                                            ? "border-red-500"
                                            : ""
                                    }
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
                                    value={formData.lastName}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "lastName",
                                            e.target.value
                                        )
                                    }
                                    placeholder="Enter your last name"
                                    className={
                                        formErrors.lastName
                                            ? "border-red-500"
                                            : ""
                                    }
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
                                value={formData.dateOfBirth}
                                onChange={(e) =>
                                    handleInputChange(
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
                                value={formData.gender}
                                onChange={(e) =>
                                    handleInputChange("gender", e.target.value)
                                }
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    formErrors.gender
                                        ? "border-red-500"
                                        : "border-gray-300"
                                }`}
                            >
                                <option value="">Select gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                                <option value="prefer-not-to-say">
                                    Prefer not to say
                                </option>
                            </select>
                            {formErrors.gender && (
                                <p className="text-red-500 text-xs mt-1">
                                    {formErrors.gender}
                                </p>
                            )}
                        </div>
                    </motion.div>
                );

            case 2:
                return (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-4"
                    >
                        <div className="text-center mb-6">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                <Mail className="w-8 h-8 text-green-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800">
                                Contact Information
                            </h3>
                            <p className="text-sm text-gray-600">
                                How can we reach you?
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email Address *
                            </label>
                            <Input
                                type="email"
                                value={formData.emailAddress}
                                onChange={(e) =>
                                    handleInputChange(
                                        "emailAddress",
                                        e.target.value
                                    )
                                }
                                placeholder="Enter your email address"
                                className={
                                    formErrors.emailAddress
                                        ? "border-red-500"
                                        : ""
                                }
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
                                value={formData.phoneNumber}
                                onChange={(e) =>
                                    handleInputChange(
                                        "phoneNumber",
                                        e.target.value
                                    )
                                }
                                placeholder="Enter your phone number"
                                className={
                                    formErrors.phoneNumber
                                        ? "border-red-500"
                                        : ""
                                }
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
                                value={formData.address}
                                onChange={(e) =>
                                    handleInputChange("address", e.target.value)
                                }
                                placeholder="Enter your complete address"
                                rows={3}
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
                                    formErrors.address
                                        ? "border-red-500"
                                        : "border-gray-300"
                                }`}
                            />
                            {formErrors.address && (
                                <p className="text-red-500 text-xs mt-1">
                                    {formErrors.address}
                                </p>
                            )}
                        </div>
                    </motion.div>
                );

            case 3:
                return (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-4"
                    >
                        <div className="text-center mb-6">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                <Heart className="w-8 h-8 text-red-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800">
                                Medical Information
                            </h3>
                            <p className="text-sm text-gray-600">
                                Help us provide better care
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Do you have any allergies? If "yes", please list
                                all your allergies:
                            </label>
                            <textarea
                                value={formData.allergies}
                                onChange={(e) =>
                                    handleInputChange(
                                        "allergies",
                                        e.target.value
                                    )
                                }
                                placeholder="Please list any allergies (e.g., medications, materials, foods) or write 'None'"
                                rows={3}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Have you ever had any of the following
                                conditions?
                            </label>
                            <textarea
                                value={formData.medicalConditions}
                                onChange={(e) =>
                                    handleInputChange(
                                        "medicalConditions",
                                        e.target.value
                                    )
                                }
                                placeholder="Please list any medical conditions (e.g., diabetes, heart disease, high blood pressure) or write 'None'"
                                rows={3}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Are you currently experiencing any dental
                                problems or pain?
                            </label>
                            <select
                                value={formData.currentDentalProblems}
                                onChange={(e) =>
                                    handleInputChange(
                                        "currentDentalProblems",
                                        e.target.value
                                    )
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select an option</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                        </div>

                        {formData.currentDentalProblems === "yes" && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                transition={{ duration: 0.3 }}
                            >
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    If "yes", state them below: *
                                </label>
                                <textarea
                                    value={formData.dentalProblemsDetails}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "dentalProblemsDetails",
                                            e.target.value
                                        )
                                    }
                                    placeholder="Please describe your current dental problems or pain"
                                    rows={3}
                                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
                                        formErrors.dentalProblemsDetails
                                            ? "border-red-500"
                                            : "border-gray-300"
                                    }`}
                                />
                                {formErrors.dentalProblemsDetails && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {formErrors.dentalProblemsDetails}
                                    </p>
                                )}
                            </motion.div>
                        )}
                    </motion.div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
            {/* Progress Bar */}
            <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-600">
                        Step {currentStep} of {totalSteps}
                    </span>
                    <span className="text-sm text-gray-500">
                        {Math.round((currentStep / totalSteps) * 100)}% Complete
                    </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                        className="bg-blue-600 h-2 rounded-full"
                        initial={{ width: "0%" }}
                        animate={{
                            width: `${(currentStep / totalSteps) * 100}%`,
                        }}
                        transition={{ duration: 0.3 }}
                    />
                </div>
            </div>

            {/* Step Content */}
            <AnimatePresence mode="wait">{renderStepContent()}</AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
                <Button
                    onClick={handlePreviousStep}
                    disabled={currentStep === 1}
                    variant="outline"
                    className="flex items-center"
                >
                    <ChevronLeft size={16} className="mr-1" />
                    Previous
                </Button>

                {currentStep < totalSteps ? (
                    <Button
                        onClick={handleNextStep}
                        className="bg-blue-600 hover:bg-blue-700 text-white flex items-center"
                    >
                        Next
                        <ChevronRight size={16} className="ml-1" />
                    </Button>
                ) : (
                    <Button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="bg-green-600 hover:bg-green-700 text-white flex items-center"
                    >
                        {isSubmitting ? (
                            <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                Submitting...
                            </>
                        ) : (
                            <>
                                <CheckCircle size={16} className="mr-1" />
                                Complete Registration
                            </>
                        )}
                    </Button>
                )}
            </div>

            {/* Helper Text */}
            <div className="mt-4 text-center">
                <p className="text-xs text-gray-500">
                    Your information is secure and will only be used for
                    appointment scheduling and dental care.
                </p>
            </div>
        </div>
    );
}
