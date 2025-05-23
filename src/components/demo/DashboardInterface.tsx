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
    RefreshCw,
    AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useBookingData } from "@/hooks/useBookingData";
import { BookingData } from "@/lib/googleSheets";
import { sheetsService } from "@/lib/googleSheets";

interface StatCardProps {
    title: string;
    value: string;
    change: string;
    positive: boolean;
    icon: React.ReactNode;
    loading?: boolean;
}

// Components
const StatCard = ({
    title,
    value,
    change,
    positive,
    icon,
    loading,
}: StatCardProps) => (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
        {loading ? (
            <div className="animate-pulse">
                <div className="flex justify-between items-start">
                    <div className="flex-1">
                        <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                        <div className="h-8 bg-gray-200 rounded w-16"></div>
                    </div>
                    <div className="h-10 w-10 bg-gray-200 rounded-lg"></div>
                </div>
                <div className="h-4 bg-gray-200 rounded w-20 mt-2"></div>
            </div>
        ) : (
            <>
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
            </>
        )}
    </div>
);

interface AppointmentRowProps {
    booking: BookingData;
    index: number;
}

const AppointmentRow = ({ booking, index }: AppointmentRowProps) => {
    const isConfirmed = booking.Status?.toLowerCase() === "confirmed";
    const formattedTime = sheetsService.formatTime(booking.Time);

    return (
        <motion.tr
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
                duration: 0.3,
                delay: 0.6 + index * 0.1,
            }}
            className="hover:bg-gray-50"
        >
            <td className="px-4 py-3">
                <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                        {booking.Patient_Name?.charAt(0)?.toUpperCase() || "P"}
                    </div>
                    <span className="font-medium text-sm">
                        {booking.Patient_Name || "Unknown Patient"}
                    </span>
                </div>
            </td>
            <td className="px-4 py-3 text-sm">
                {formattedTime || booking.Time}
            </td>
            <td className="px-4 py-3 text-sm">
                {booking.Service_Type || "General Consultation"}
            </td>
            <td className="px-4 py-3">
                {isConfirmed ? (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                        <CheckCircle size={12} className="mr-1" />
                        Confirmed
                    </span>
                ) : (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                        <Clock size={12} className="mr-1" />
                        Pending
                    </span>
                )}
            </td>
            <td className="px-4 py-3">
                <div className="flex space-x-2">
                    <button
                        className="p-1 rounded-full hover:bg-gray-100 text-gray-500"
                        title={`Call ${booking.Phone || "patient"}`}
                    >
                        <Phone size={16} />
                    </button>
                    <button
                        className="p-1 rounded-full hover:bg-gray-100 text-gray-500"
                        title={`Email ${booking.Email || "patient"}`}
                    >
                        <Mail size={16} />
                    </button>
                    <button className="p-1 rounded-full hover:bg-gray-100 text-gray-500">
                        <MessageSquare size={16} />
                    </button>
                </div>
            </td>
        </motion.tr>
    );
};

export default function DashboardInterface() {
    const [activeTab, setActiveTab] = useState("today");
    const [searchQuery, setSearchQuery] = useState("");
    const [isMounted, setIsMounted] = useState(false);

    // Use the booking data hook
    const {
        bookings,
        todaysBookings,
        upcomingBookings,
        stats,
        loading,
        error,
        refetch,
        lastUpdated,
    } = useBookingData();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Filter appointments based on search query
    const filteredAppointments = (
        activeTab === "today" ? todaysBookings : upcomingBookings
    ).filter(
        (booking) =>
            booking.Patient_Name?.toLowerCase().includes(
                searchQuery.toLowerCase()
            ) ||
            booking.Service_Type?.toLowerCase().includes(
                searchQuery.toLowerCase()
            ) ||
            booking.Phone?.includes(searchQuery) ||
            booking.Email?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Create stats array for StatCard components
    const statsArray = [
        {
            title: "Today's Appointments",
            value: stats.todaysAppointments.toString(),
            change: "+2",
            positive: true,
            icon: <Calendar size={18} />,
        },
        {
            title: "New Patients",
            value: stats.newPatients.toString(),
            change: "+1",
            positive: true,
            icon: <User size={18} />,
        },
        {
            title: "Revenue Today",
            value: `₹${stats.revenue.toLocaleString()}`,
            change: "+12%",
            positive: true,
            icon: <DollarSign size={18} />,
        },
        {
            title: "Response Rate",
            value: `${stats.responseRate}%`,
            change: "+5%",
            positive: true,
            icon: <MessageSquare size={18} />,
        },
    ];

    const handleRefresh = async () => {
        await refetch();
    };

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
                        {lastUpdated && (
                            <span className="ml-4 text-xs text-gray-500">
                                Last updated: {lastUpdated.toLocaleTimeString()}
                            </span>
                        )}
                    </div>
                    <div className="flex space-x-2 items-center">
                        <Button
                            size="sm"
                            variant="ghost"
                            className="text-gray-500"
                            onClick={handleRefresh}
                            disabled={loading}
                            title="Refresh data"
                        >
                            <RefreshCw
                                size={18}
                                className={loading ? "animate-spin" : ""}
                            />
                        </Button>
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
                    {/* Error Display */}
                    {error && (
                        <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4">
                            <div className="flex items-center">
                                <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                                <div>
                                    <h4 className="text-red-800 font-medium">
                                        Error loading data
                                    </h4>
                                    <p className="text-red-700 text-sm">
                                        {error}
                                    </p>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="mt-2 border-red-300 text-red-700 hover:bg-red-50"
                                        onClick={handleRefresh}
                                    >
                                        Try Again
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}

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
                            {statsArray.map((stat, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.3,
                                        delay: index * 0.1,
                                    }}
                                >
                                    <StatCard {...stat} loading={loading} />
                                </motion.div>
                            ))}
                        </div>

                        {/* Appointments Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.5 }}
                            className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 lg:col-span-2"
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-medium text-gray-800">
                                    {activeTab === "today"
                                        ? "Today's"
                                        : "Upcoming"}{" "}
                                    Appointments
                                    {!loading && (
                                        <span className="ml-2 text-sm text-gray-500">
                                            ({filteredAppointments.length})
                                        </span>
                                    )}
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
                                                setSearchQuery(e.target.value)
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
                                            Today ({todaysBookings.length})
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
                                            Upcoming ({upcomingBookings.length})
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Appointment List */}
                            <div className="overflow-x-auto">
                                {loading ? (
                                    <div className="space-y-3">
                                        {[...Array(3)].map((_, i) => (
                                            <div
                                                key={i}
                                                className="animate-pulse flex items-center space-x-4 py-3"
                                            >
                                                <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
                                                <div className="flex-1 space-y-2">
                                                    <div className="h-4 bg-gray-200 rounded w-32"></div>
                                                    <div className="h-3 bg-gray-200 rounded w-20"></div>
                                                </div>
                                                <div className="h-6 bg-gray-200 rounded w-16"></div>
                                            </div>
                                        ))}
                                    </div>
                                ) : filteredAppointments.length > 0 ? (
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
                                            {filteredAppointments.map(
                                                (booking, index) => (
                                                    <AppointmentRow
                                                        key={`${booking.Patient_Name}-${booking.Date}-${booking.Time}-${index}`}
                                                        booking={booking}
                                                        index={index}
                                                    />
                                                )
                                            )}
                                        </tbody>
                                    </table>
                                ) : (
                                    <div className="text-center py-8">
                                        <Calendar className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                                            No appointments found
                                        </h3>
                                        <p className="text-gray-500">
                                            {searchQuery
                                                ? `No appointments match "${searchQuery}"`
                                                : `No ${
                                                      activeTab === "today"
                                                          ? "appointments today"
                                                          : "upcoming appointments"
                                                  }`}
                                        </p>
                                        {searchQuery && (
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                className="mt-4"
                                                onClick={() =>
                                                    setSearchQuery("")
                                                }
                                            >
                                                Clear search
                                            </Button>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* More Link */}
                            {!loading && filteredAppointments.length > 0 && (
                                <div className="mt-4 text-center">
                                    <button className="text-blue-600 text-sm hover:underline">
                                        View all appointments →
                                    </button>
                                </div>
                            )}
                        </motion.div>

                        {/* Data Source Info */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.7 }}
                            className="bg-blue-50 border border-blue-200 rounded-lg p-4"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <FileText className="h-5 w-5 text-blue-600" />
                                    <div>
                                        <h4 className="text-sm font-medium text-blue-800">
                                            Live Data from Google Sheets
                                        </h4>
                                        <p className="text-xs text-blue-600">
                                            Data syncs automatically every 5
                                            minutes
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div
                                        className={`w-2 h-2 rounded-full ${
                                            error
                                                ? "bg-red-500"
                                                : "bg-green-500"
                                        }`}
                                    ></div>
                                    <span className="text-xs text-blue-700">
                                        {error ? "Disconnected" : "Connected"}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
