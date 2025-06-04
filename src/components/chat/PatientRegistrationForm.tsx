import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ChevronLeft,
    ChevronRight,
    User,
    Mail,
    Heart,
    CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    PatientRegistrationFormProps,
    PatientRegistrationData,
} from "@/types/chat";
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
}: PatientRegistrationFormProps) {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] =
        useState<PatientRegistrationData>(initialFormData);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const totalSteps = 3;

    const handleInputChange = (
        field: keyof PatientRegistrationData,
        value: string
    ) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleNextStep = () => {
        setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
    };

    const handlePreviousStep = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 1));
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);

        const dataToSubmit = {
            ...formData,
            timestamp: new Date().toISOString(),
        };

        await submitToGoogleSheets(dataToSubmit);

        const userData = {
            name: `${formData.firstName} ${formData.lastName}`,
            contact: formData.emailAddress || formData.phoneNumber,
            contactType: formData.emailAddress
                ? ("email" as const)
                : ("phone" as const),
            isOnboarded: true,
        };

        onRegistrationComplete(userData);
        setIsSubmitting(false);
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
                                />
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
                                />
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
                            />
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
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select your gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                                <option value="prefer-not-to-say">
                                    Prefer not to say
                                </option>
                            </select>
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
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                <Mail className="w-8 h-8 text-blue-600" />
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
                            />
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
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Address *
                            </label>
                            <Input
                                value={formData.address}
                                onChange={(e) =>
                                    handleInputChange("address", e.target.value)
                                }
                                placeholder="Enter your full address"
                            />
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
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                <Heart className="w-8 h-8 text-blue-600" />
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
                                Allergies
                            </label>
                            <Input
                                value={formData.allergies}
                                onChange={(e) =>
                                    handleInputChange(
                                        "allergies",
                                        e.target.value
                                    )
                                }
                                placeholder="List any allergies (optional)"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Medical Conditions
                            </label>
                            <Input
                                value={formData.medicalConditions}
                                onChange={(e) =>
                                    handleInputChange(
                                        "medicalConditions",
                                        e.target.value
                                    )
                                }
                                placeholder="List any medical conditions (optional)"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Do you have any current dental problems? *
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
                            <div>
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
                                    placeholder="Describe your dental problems..."
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[80px]"
                                />
                            </div>
                        )}
                    </motion.div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">
                        Step {currentStep} of {totalSteps}
                    </span>
                    <span className="text-sm text-gray-500">
                        {Math.round((currentStep / totalSteps) * 100)}% complete
                    </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                        className="bg-blue-600 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{
                            width: `${(currentStep / totalSteps) * 100}%`,
                        }}
                        transition={{ duration: 0.3 }}
                    />
                </div>
            </div>

            <div className="p-6">
                <AnimatePresence mode="wait">
                    {renderStepContent()}
                </AnimatePresence>
            </div>

            <div className="flex justify-between p-6 border-t border-gray-200">
                <Button
                    variant="outline"
                    onClick={handlePreviousStep}
                    disabled={currentStep === 1}
                    className="flex items-center"
                >
                    <ChevronLeft size={16} className="mr-1" />
                    Previous
                </Button>

                {currentStep < totalSteps ? (
                    <Button
                        onClick={handleNextStep}
                        className="flex items-center bg-blue-600 hover:bg-blue-700"
                    >
                        Next
                        <ChevronRight size={16} className="ml-1" />
                    </Button>
                ) : (
                    <Button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="flex items-center bg-green-600 hover:bg-green-700"
                    >
                        {isSubmitting ? (
                            <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                Submitting...
                            </>
                        ) : (
                            <>
                                <CheckCircle size={16} className="mr-2" />
                                Complete Registration
                            </>
                        )}
                    </Button>
                )}
            </div>
        </div>
    );
}
