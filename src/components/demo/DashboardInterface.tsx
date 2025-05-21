import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    Calendar,
    Users,
    User,
    DollarSign,
    BarChart2,
    ArrowUp,
    ArrowDown,
    Clock,
    CheckCircle,
    XCircle,
    Phone,
    Mail,
    MessageSquare,
    Search,
    Filter,
    ChevronDown,
    Bell,
    Settings,
    HelpCircle,
    Menu,
    Home,
    PieChart,
    FileText,
    Star,
    CalendarDays,
    BookOpen,
    ZoomIn,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Mock data for appointments
const APPOINTMENTS = [
    {
        id: 1,
        patientName: "Rajesh Sharma",
        time: "10:00 AM",
        procedure: "Dental Cleaning",
        confirmed: true,
    },
    {
        id: 2,
        patientName: "Priya Patel",
        time: "11:30 AM",
        procedure: "Tooth Extraction",
        confirmed: true,
    },
    {
        id: 3,
        patientName: "Amit Kumar",
        time: "1:00 PM",
        procedure: "Dental Checkup",
        confirmed: false,
    },
    {
        id: 4,
        patientName: "Neha Singh",
        time: "2:30 PM",
        procedure: "Root Canal",
        confirmed: true,
    },
    {
        id: 5,
        patientName: "Vikram Reddy",
        time: "4:00 PM",
        procedure: "Dental Filling",
        confirmed: false,
    },
];

// Mock data for stats
const STATS = [
    {
        title: "Today's Appointments",
        value: "8",
        change: "+2",
        positive: true,
        icon: <Calendar size={18} />,
    },
    {
        title: "New Patients",
        value: "3",
        change: "+1",
        positive: true,
        icon: <User size={18} />,
    },
    {
        title: "Revenue Today",
        value: "₹24,500",
        change: "+12%",
        positive: true,
        icon: <DollarSign size={18} />,
    },
    {
        title: "Response Rate",
        value: "98%",
        change: "+5%",
        positive: true,
        icon: <MessageSquare size={18} />,
    },
];

// Mock data for activity feed
const ACTIVITY_FEED = [
    {
        type: "appointment_booked",
        patient: "Sandeep Gupta",
        time: "10 mins ago",
        details: "Booked a Root Canal appointment for May 25, 2:30 PM",
    },
    {
        type: "call_handled",
        patient: "Maya Reddy",
        time: "35 mins ago",
        details: "AI receptionist answered a billing inquiry call",
    },
    {
        type: "appointment_confirmed",
        patient: "Vikrant Shah",
        time: "1 hour ago",
        details: "Confirmed tomorrow's dental checkup via WhatsApp",
    },
    {
        type: "reminder_sent",
        patient: "Ananya Kumar",
        time: "2 hours ago",
        details: "Sent appointment reminder for upcoming visit on May 22",
    },
];
interface StatCardProps {
    title: string;
    value: string;
    change: string;
    positive: boolean;
    icon: React.ReactNode;
}
// Components
const StatCard = ({ title, value, change, positive, icon }: StatCardProps) => (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
        <div className="flex justify-between items-start">
            <div>
                <p className="text-sm text-gray-500">{title}</p>
                <p className="text-2xl font-bold mt-1">{value}</p>
            </div>
            <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                {icon}
            </div>
        </div>
        <div className="flex items-center mt-2">
            {positive ? (
                <ArrowUp size={14} className="text-green-500 mr-1" />
            ) : (
                <ArrowDown size={14} className="text-red-500 mr-1" />
            )}
            <span
                className={`text-xs ${
                    positive ? "text-green-500" : "text-red-500"
                }`}
            >
                {change} from yesterday
            </span>
        </div>
    </div>
);

interface ActivityItemProps {
    activity: {
        type:
            | "appointment_booked"
            | "call_handled"
            | "appointment_confirmed"
            | "reminder_sent"
            | string;
        patient: string;
        time: string;
        details: string;
    };
}
// Activity feed item component
const ActivityItem = ({ activity }: ActivityItemProps) => {
    const getIcon = (type: any) => {
        switch (type) {
            case "appointment_booked":
                return <CalendarDays size={16} className="text-purple-500" />;
            case "call_handled":
                return <Phone size={16} className="text-blue-500" />;
            case "appointment_confirmed":
                return <CheckCircle size={16} className="text-green-500" />;
            case "reminder_sent":
                return <Bell size={16} className="text-amber-500" />;
            default:
                return <MessageSquare size={16} className="text-gray-500" />;
        }
    };

    return (
        <div className="flex py-3 border-b border-gray-100 last:border-0">
            <div className="flex-shrink-0 mt-1">
                <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                    {getIcon(activity.type)}
                </div>
            </div>
            <div className="ml-3">
                <div className="flex items-center">
                    <p className="text-sm font-medium text-gray-800">
                        {activity.patient}
                    </p>
                    <span className="ml-2 text-xs text-gray-500">
                        {activity.time}
                    </span>
                </div>
                <p className="text-xs text-gray-600 mt-1">{activity.details}</p>
            </div>
        </div>
    );
};

export default function DashboardInterface() {
    const [activeTab, setActiveTab] = useState("today");
    const [searchQuery, setSearchQuery] = useState("");
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <div className="bg-gray-100 rounded-lg overflow-hidden shadow-md border border-gray-200 h-[700px] flex flex-col">
            {/* Dashboard Header */}
            <div className="bg-white p-4 border-b border-gray-200">
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <img
                            src="/Icon.png"
                            alt="Kraftodent"
                            className="h-8 w-8 mr-2"
                        />
                        <h2 className="text-lg font-semibold text-gray-800">
                            Kraftodent Dashboard
                        </h2>
                    </div>
                    <div className="flex space-x-2 items-center">
                        <Button
                            size="sm"
                            variant="ghost"
                            className="text-gray-500"
                        >
                            <Bell size={18} />
                        </Button>
                        <Button
                            size="sm"
                            variant="ghost"
                            className="text-gray-500"
                        >
                            <Settings size={18} />
                        </Button>
                        <Button
                            size="sm"
                            variant="ghost"
                            className="text-gray-500"
                        >
                            <HelpCircle size={18} />
                        </Button>
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                            <User size={16} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <div className="w-14 md:w-48 bg-white border-r border-gray-200 hidden md:block">
                    <div className="p-3 space-y-1">
                        <Button
                            variant="ghost"
                            className="w-full justify-start text-blue-600 bg-blue-50 hover:bg-blue-100 font-medium"
                        >
                            <Home size={18} className="mr-2" />
                            <span className="hidden md:inline">Dashboard</span>
                        </Button>
                        <Button
                            variant="ghost"
                            className="w-full justify-start text-gray-600 hover:bg-gray-100 hover:text-gray-700"
                        >
                            <Calendar size={18} className="mr-2" />
                            <span className="hidden md:inline">
                                Appointments
                            </span>
                        </Button>
                        <Button
                            variant="ghost"
                            className="w-full justify-start text-gray-600 hover:bg-gray-100 hover:text-gray-700"
                        >
                            <Users size={18} className="mr-2" />
                            <span className="hidden md:inline">Patients</span>
                        </Button>
                        <Button
                            variant="ghost"
                            className="w-full justify-start text-gray-600 hover:bg-gray-100 hover:text-gray-700"
                        >
                            <Phone size={18} className="mr-2" />
                            <span className="hidden md:inline">Calls</span>
                        </Button>
                        <Button
                            variant="ghost"
                            className="w-full justify-start text-gray-600 hover:bg-gray-100 hover:text-gray-700"
                        >
                            <ZoomIn size={18} className="mr-2" />
                            <span className="hidden md:inline">Procedures</span>
                        </Button>
                        <Button
                            variant="ghost"
                            className="w-full justify-start text-gray-600 hover:bg-gray-100 hover:text-gray-700"
                        >
                            <PieChart size={18} className="mr-2" />
                            <span className="hidden md:inline">Reports</span>
                        </Button>
                        <Button
                            variant="ghost"
                            className="w-full justify-start text-gray-600 hover:bg-gray-100 hover:text-gray-700"
                        >
                            <FileText size={18} className="mr-2" />
                            <span className="hidden md:inline">Billing</span>
                        </Button>
                        <Button
                            variant="ghost"
                            className="w-full justify-start text-gray-600 hover:bg-gray-100 hover:text-gray-700"
                        >
                            <BookOpen size={18} className="mr-2" />
                            <span className="hidden md:inline">
                                Knowledge Base
                            </span>
                        </Button>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 overflow-auto p-4">
                    {/* Dashboard Content */}
                    <div className="space-y-6">
                        {/* Welcome Section */}
                        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-4 md:p-6 text-white shadow-md">
                            <div className="flex items-start justify-between">
                                <div>
                                    <h3 className="text-xl md:text-2xl font-bold mb-2">
                                        Welcome back, Dr. Rajesh
                                    </h3>
                                    <p className="text-blue-100 mb-4">
                                        Here's what's happening at your practice
                                        today
                                    </p>
                                    <div className="flex gap-3">
                                        <Button
                                            size="sm"
                                            className="bg-white text-blue-600 hover:bg-blue-50"
                                        >
                                            <Calendar
                                                size={16}
                                                className="mr-1"
                                            />
                                            View Schedule
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="border-white text-white hover:bg-blue-500"
                                        >
                                            <Phone size={16} className="mr-1" />
                                            Recent Calls
                                        </Button>
                                    </div>
                                </div>
                                <div className="hidden md:block">
                                    <div className="p-3 bg-white/10 rounded-lg">
                                        <Clock
                                            size={40}
                                            className="text-white"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Stats Row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {STATS.map((stat, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.3,
                                        delay: index * 0.1,
                                    }}
                                >
                                    <StatCard {...stat} />
                                </motion.div>
                            ))}
                        </div>

                        {/* Two column layout for appointments and activity */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Appointments Section */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: 0.5 }}
                                className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 lg:col-span-2"
                            >
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="font-medium text-gray-800">
                                        Today's Appointments
                                    </h3>
                                    <div className="flex items-center space-x-2">
                                        <div className="relative">
                                            <Search
                                                size={14}
                                                className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"
                                            />
                                            <Input
                                                value={searchQuery}
                                                onChange={(e) =>
                                                    setSearchQuery(
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Search patients..."
                                                className="pl-7 text-xs h-8"
                                            />
                                        </div>
                                        <div className="flex border rounded-md overflow-hidden">
                                            <button
                                                className={`px-3 py-1 text-xs ${
                                                    activeTab === "today"
                                                        ? "bg-blue-600 text-white"
                                                        : "bg-white text-gray-500"
                                                }`}
                                                onClick={() =>
                                                    setActiveTab("today")
                                                }
                                            >
                                                Today
                                            </button>
                                            <button
                                                className={`px-3 py-1 text-xs ${
                                                    activeTab === "upcoming"
                                                        ? "bg-blue-600 text-white"
                                                        : "bg-white text-gray-500"
                                                }`}
                                                onClick={() =>
                                                    setActiveTab("upcoming")
                                                }
                                            >
                                                Upcoming
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Appointment List */}
                                <div className="overflow-x-auto">
                                    <table className="min-w-full">
                                        <thead>
                                            <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                <th className="px-4 py-2">
                                                    Patient
                                                </th>
                                                <th className="px-4 py-2">
                                                    Time
                                                </th>
                                                <th className="px-4 py-2">
                                                    Procedure
                                                </th>
                                                <th className="px-4 py-2">
                                                    Status
                                                </th>
                                                <th className="px-4 py-2">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {APPOINTMENTS.map(
                                                (appointment, index) => (
                                                    <motion.tr
                                                        key={appointment.id}
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        transition={{
                                                            duration: 0.3,
                                                            delay:
                                                                0.6 +
                                                                index * 0.1,
                                                        }}
                                                        className="hover:bg-gray-50"
                                                    >
                                                        <td className="px-4 py-3">
                                                            <div className="flex items-center">
                                                                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                                                                    {appointment.patientName.charAt(
                                                                        0
                                                                    )}
                                                                </div>
                                                                <span className="font-medium text-sm">
                                                                    {
                                                                        appointment.patientName
                                                                    }
                                                                </span>
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-3 text-sm">
                                                            {appointment.time}
                                                        </td>
                                                        <td className="px-4 py-3 text-sm">
                                                            {
                                                                appointment.procedure
                                                            }
                                                        </td>
                                                        <td className="px-4 py-3">
                                                            {appointment.confirmed ? (
                                                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                                                    <CheckCircle
                                                                        size={
                                                                            12
                                                                        }
                                                                        className="mr-1"
                                                                    />
                                                                    Confirmed
                                                                </span>
                                                            ) : (
                                                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                                                                    <Clock
                                                                        size={
                                                                            12
                                                                        }
                                                                        className="mr-1"
                                                                    />
                                                                    Pending
                                                                </span>
                                                            )}
                                                        </td>
                                                        <td className="px-4 py-3">
                                                            <div className="flex space-x-2">
                                                                <button className="p-1 rounded-full hover:bg-gray-100 text-gray-500">
                                                                    <Phone
                                                                        size={
                                                                            16
                                                                        }
                                                                    />
                                                                </button>
                                                                <button className="p-1 rounded-full hover:bg-gray-100 text-gray-500">
                                                                    <Mail
                                                                        size={
                                                                            16
                                                                        }
                                                                    />
                                                                </button>
                                                                <button className="p-1 rounded-full hover:bg-gray-100 text-gray-500">
                                                                    <MessageSquare
                                                                        size={
                                                                            16
                                                                        }
                                                                    />
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </motion.tr>
                                                )
                                            )}
                                        </tbody>
                                    </table>
                                </div>

                                {/* More Link */}
                                <div className="mt-4 text-center">
                                    <button className="text-blue-600 text-sm hover:underline">
                                        View all appointments →
                                    </button>
                                </div>
                            </motion.div>

                            {/* Activity Feed Section */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: 0.6 }}
                                className="bg-white rounded-lg p-4 shadow-sm border border-gray-200"
                            >
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="font-medium text-gray-800">
                                        Recent Activity
                                    </h3>
                                    <button className="text-xs text-blue-600 hover:underline">
                                        View all
                                    </button>
                                </div>

                                <div className="overflow-y-auto max-h-[300px]">
                                    {ACTIVITY_FEED.map((activity, index) => (
                                        <ActivityItem
                                            key={index}
                                            activity={activity}
                                        />
                                    ))}
                                </div>

                                {/* AI Metrics */}
                                <div className="mt-4 pt-4 border-t border-gray-100">
                                    <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                                        <Star
                                            size={16}
                                            className="text-yellow-500 mr-1"
                                        />
                                        AI Assistant Performance
                                    </h4>

                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="bg-gray-50 p-3 rounded-lg">
                                            <div className="text-xs text-gray-500">
                                                Calls Handled
                                            </div>
                                            <div className="text-lg font-bold text-gray-800">
                                                24/24
                                            </div>
                                            <div className="text-xs text-green-500 flex items-center">
                                                <ArrowUp
                                                    size={12}
                                                    className="mr-1"
                                                />
                                                100% success rate
                                            </div>
                                        </div>
                                        <div className="bg-gray-50 p-3 rounded-lg">
                                            <div className="text-xs text-gray-500">
                                                Avg. Response
                                            </div>
                                            <div className="text-lg font-bold text-gray-800">
                                                1.2s
                                            </div>
                                            <div className="text-xs text-green-500 flex items-center">
                                                <ArrowUp
                                                    size={12}
                                                    className="mr-1"
                                                />
                                                15% faster
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
