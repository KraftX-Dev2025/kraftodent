// src/hooks/useBookingData.ts

import { useState, useEffect, useCallback, useRef } from "react";
import { BookingData, sheetsService } from "@/lib/googleSheets";

interface BookingStats {
    todaysAppointments: number;
    newPatients: number;
    revenue: number;
    responseRate: number;
    confirmedAppointments: number;
    pendingAppointments: number;
}

interface UseBookingDataReturn {
    bookings: BookingData[];
    todaysBookings: BookingData[];
    upcomingBookings: BookingData[];
    pastBookings: BookingData[];
    stats: BookingStats;
    loading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
    lastUpdated: Date | null;
}

/**
 * Custom hook for managing booking data from Google Sheets
 * Provides real-time data fetching, processing, and statistics calculation
 */
export function useBookingData(): UseBookingDataReturn {
    const [bookings, setBookings] = useState<BookingData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

    // Use ref to track if component is mounted to prevent state updates after unmount
    const isMountedRef = useRef(true);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            isMountedRef.current = false;
        };
    }, []);

    /**
     * Fetch booking data from Google Sheets
     */
    const fetchBookings = useCallback(async (): Promise<void> => {
        try {
            if (!isMountedRef.current) return;

            setLoading(true);
            setError(null);

            const data = await sheetsService.fetchBookingData();

            if (!isMountedRef.current) return;

            setBookings(data);
            setLastUpdated(new Date());
        } catch (err) {
            if (!isMountedRef.current) return;

            const errorMessage =
                err instanceof Error
                    ? err.message
                    : "Failed to fetch booking data";
            setError(errorMessage);
            console.error("Error fetching booking data:", err);
        } finally {
            if (isMountedRef.current) {
                setLoading(false);
            }
        }
    }, []);

    /**
     * Process bookings to get today's appointments
     */
    const todaysBookings = useCallback((): BookingData[] => {
        if (!bookings.length) return [];

        try {
            return sheetsService.getTodaysAppointments(bookings);
        } catch (err) {
            console.error("Error processing today's bookings:", err);
            return [];
        }
    }, [bookings])();
    /**
     * Process bookings to get upcoming appointments (next 7 days)
     */
    const upcomingBookings = useCallback((): BookingData[] => {
        if (!bookings.length) return [];

        try {
            return sheetsService.getUpcomingAppointments(bookings);
        } catch (err) {
            console.error("Error processing upcoming bookings:", err);
            return [];
        }
    }, [bookings])();

    /**
     * Process bookings to get past appointments
     */
    const pastBookings = useCallback((): BookingData[] => {
        if (!bookings.length) return [];

        try {
            return sheetsService.getPastAppointments(bookings);
        } catch (err) {
            console.error("Error processing past bookings:", err);
            return [];
        }
    }, [bookings])();

    /**
     * Calculate comprehensive statistics from booking data
     */
    const stats = useCallback((): BookingStats => {
        if (!bookings.length) {
            return {
                todaysAppointments: 0,
                newPatients: 0,
                revenue: 0,
                responseRate: 95, // Default good response rate
                confirmedAppointments: 0,
                pendingAppointments: 0,
            };
        }

        try {
            const baseStats = sheetsService.getStatistics(bookings);

            return {
                todaysAppointments: baseStats.todaysAppointments,
                newPatients: baseStats.newPatients,
                revenue: baseStats.revenue,
                responseRate: baseStats.responseRate,
                confirmedAppointments: baseStats.confirmedAppointments,
                pendingAppointments: baseStats.pendingAppointments,
            };
        } catch (err) {
            console.error("Error calculating statistics:", err);
            return {
                todaysAppointments: 0,
                newPatients: 0,
                revenue: 0,
                responseRate: 95,
                confirmedAppointments: 0,
                pendingAppointments: 0,
            };
        }
    }, [bookings])();

    /**
     * Refetch data manually
     */
    const refetch = useCallback(async (): Promise<void> => {
        await fetchBookings();
    }, [fetchBookings]);

    /**
     * Initial data fetch on mount
     */
    useEffect(() => {
        let mounted = true;

        const initialFetch = async () => {
            if (mounted) {
                await fetchBookings();
            }
        };

        initialFetch();

        return () => {
            mounted = false;
        };
    }, [fetchBookings]);

    /**
     * Set up automatic data refresh every 5 minutes
     */
    useEffect(() => {
        const REFRESH_INTERVAL = 5 * 60 * 1000; // 5 minutes

        const intervalId = setInterval(() => {
            if (isMountedRef.current && !loading) {
                fetchBookings();
            }
        }, REFRESH_INTERVAL);

        return () => {
            clearInterval(intervalId);
        };
    }, [fetchBookings, loading]);

    /**
     * Handle browser visibility change to refresh data when tab becomes active
     */
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (
                document.visibilityState === "visible" &&
                !loading &&
                lastUpdated
            ) {
                const timeSinceUpdate = Date.now() - lastUpdated.getTime();
                const STALE_THRESHOLD = 2 * 60 * 1000; // 2 minutes

                if (timeSinceUpdate > STALE_THRESHOLD) {
                    fetchBookings();
                }
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            document.removeEventListener(
                "visibilitychange",
                handleVisibilityChange
            );
        };
    }, [fetchBookings, loading, lastUpdated]);

    /**
     * Handle online/offline status to refetch when coming back online
     */
    useEffect(() => {
        const handleOnline = () => {
            if (!loading) {
                fetchBookings();
            }
        };

        window.addEventListener("online", handleOnline);

        return () => {
            window.removeEventListener("online", handleOnline);
        };
    }, [fetchBookings, loading]);

    return {
        bookings,
        todaysBookings,
        upcomingBookings,
        pastBookings,
        stats,
        loading,
        error,
        refetch,
        lastUpdated,
    };
}

/**
 * Hook variant that only fetches data once (useful for components that don't need real-time updates)
 */
export function useBookingDataOnce(): UseBookingDataReturn {
    const [bookings, setBookings] = useState<BookingData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
    const [hasFetched, setHasFetched] = useState(false);

    const fetchBookings = useCallback(async (): Promise<void> => {
        if (hasFetched) return;

        try {
            setLoading(true);
            setError(null);

            const data = await sheetsService.fetchBookingData();
            setBookings(data);
            setLastUpdated(new Date());
            setHasFetched(true);
        } catch (err) {
            const errorMessage =
                err instanceof Error
                    ? err.message
                    : "Failed to fetch booking data";
            setError(errorMessage);
            console.error("Error fetching booking data:", err);
        } finally {
            setLoading(false);
        }
    }, [hasFetched]);

    const refetch = useCallback(async (): Promise<void> => {
        setHasFetched(false);
        await fetchBookings();
    }, [fetchBookings]);

    useEffect(() => {
        fetchBookings();
    }, [fetchBookings]);

    // Process data
    const todaysBookings =
        bookings.length > 0
            ? sheetsService.getTodaysAppointments(bookings)
            : [];
    const upcomingBookings =
        bookings.length > 0
            ? sheetsService.getUpcomingAppointments(bookings)
            : [];
    const stats =
        bookings.length > 0
            ? sheetsService.getStatistics(bookings)
            : {
                  todaysAppointments: 0,
                  newPatients: 0,
                  revenue: 0,
                  responseRate: 95,
                  confirmedAppointments: 0,
                  pendingAppointments: 0,
              };
    const pastBookings =
        bookings.length > 0 ? sheetsService.getPastAppointments(bookings) : [];

    return {
        bookings,
        todaysBookings,
        upcomingBookings,
        pastBookings,
        stats,
        loading,
        error,
        refetch,
        lastUpdated,
    };
}

/**
 * Hook for getting cached booking data without triggering new fetches
 * Useful for components that want to display cached data while other components handle fetching
 */
export function useCachedBookingData(): Omit<UseBookingDataReturn, "refetch"> {
    const [bookings] = useState<BookingData[]>([]);
    const [loading] = useState(false);
    const [error] = useState<string | null>(null);
    const [lastUpdated] = useState<Date | null>(null);

    // This would integrate with a global state management solution in a real app
    // For now, return empty data
    const todaysBookings: BookingData[] = [];
    const upcomingBookings: BookingData[] = [];
    const stats: BookingStats = {
        todaysAppointments: 0,
        newPatients: 0,
        revenue: 0,
        responseRate: 95,
        confirmedAppointments: 0,
        pendingAppointments: 0,
    };

    return {
        bookings,
        todaysBookings,
        upcomingBookings,
        pastBookings: [],
        stats,
        loading,
        error,
        lastUpdated,
    };
}

/**
 * Utility function to validate booking data structure
 */
export function validateBookingData(data: any[]): BookingData[] {
    return data.filter((item): item is BookingData => {
        return (
            typeof item === "object" &&
            item !== null &&
            typeof item.Patient_Name === "string" &&
            typeof item.Email === "string" &&
            typeof item.Phone === "string"
        );
    });
}

export default useBookingData;
