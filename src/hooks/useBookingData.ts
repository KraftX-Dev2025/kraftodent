// src/hooks/useBookingData.ts
import { useState, useEffect, useCallback } from "react";
import { BookingData, sheetsService } from "@/lib/googleSheets";

export interface BookingStats {
    todaysAppointments: number;
    newPatients: number;
    revenue: number;
    responseRate: number;
    confirmedAppointments: number;
    pendingAppointments: number;
}

export interface UseBookingDataReturn {
    bookings: BookingData[];
    todaysBookings: BookingData[];
    upcomingBookings: BookingData[];
    stats: BookingStats;
    loading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
    lastUpdated: Date | null;
}

export function useBookingData(): UseBookingDataReturn {
    const [bookings, setBookings] = useState<BookingData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const data = await sheetsService.fetchBookingData();
            setBookings(data);
            setLastUpdated(new Date());
        } catch (err) {
            console.error("Error fetching booking data:", err);
            setError(
                err instanceof Error
                    ? err.message
                    : "Failed to fetch booking data"
            );
        } finally {
            setLoading(false);
        }
    }, []);

    // Initial fetch
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // Auto-refresh every 5 minutes
    useEffect(() => {
        const interval = setInterval(fetchData, 5 * 60 * 1000);
        return () => clearInterval(interval);
    }, [fetchData]);

    // Calculate derived data
    const todaysBookings = sheetsService.getTodaysAppointments(bookings);
    const upcomingBookings = sheetsService.getUpcomingAppointments(bookings);
    const stats = sheetsService.getStatistics(bookings);

    return {
        bookings,
        todaysBookings,
        upcomingBookings,
        stats,
        loading,
        error,
        refetch: fetchData,
        lastUpdated,
    };
}
