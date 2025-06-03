// src/components/chat/QuickActions.tsx

import React from "react";
import { motion } from "framer-motion";
import {
    Calendar,
    Clock,
    MapPin,
    Phone,
    FileText,
    HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuickActionsProps } from "@/types/chat";

const quickActions = [
    {
        id: "book_appointment",
        label: "Book Appointment",
        message: "I'd like to book an appointment",
        icon: Calendar,
        color: "bg-blue-600 hover:bg-blue-700",
    },
    {
        id: "clinic_hours",
        label: "Clinic Hours",
        message: "What are your clinic hours?",
        icon: Clock,
        color: "bg-green-600 hover:bg-green-700",
    },
    {
        id: "services",
        label: "Our Services",
        message: "What services do you offer?",
        icon: FileText,
        color: "bg-purple-600 hover:bg-purple-700",
    },
    {
        id: "location",
        label: "Location",
        message: "Where is your clinic located?",
        icon: MapPin,
        color: "bg-orange-600 hover:bg-orange-700",
    },
    {
        id: "emergency",
        label: "Emergency",
        message: "I have a dental emergency",
        icon: Phone,
        color: "bg-red-600 hover:bg-red-700",
    },
    {
        id: "help",
        label: "Help",
        message: "I need help with something else",
        icon: HelpCircle,
        color: "bg-gray-600 hover:bg-gray-700",
    },
];

export default function QuickActions({
    onActionClick,
    disabled = false,
}: QuickActionsProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-4"
        >
            <div className="mb-3">
                <h4 className="text-sm font-medium text-gray-700">
                    Quick Actions
                </h4>
                <p className="text-xs text-gray-500">
                    Click any option to get started
                </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {quickActions.map((action, index) => (
                    <motion.div
                        key={action.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1, duration: 0.2 }}
                    >
                        <Button
                            onClick={() => onActionClick(action.message)}
                            disabled={disabled}
                            className={`
                                w-full h-auto p-3 flex flex-col items-center gap-2 
                                text-white ${action.color} 
                                disabled:opacity-50 disabled:cursor-not-allowed
                                transition-all duration-200
                            `}
                            variant="default"
                        >
                            <action.icon size={20} />
                            <span className="text-xs font-medium leading-tight text-center">
                                {action.label}
                            </span>
                        </Button>
                    </motion.div>
                ))}
            </div>

            <div className="mt-3 text-center">
                <p className="text-xs text-gray-500">
                    Or type your message in the input box below
                </p>
            </div>
        </motion.div>
    );
}
