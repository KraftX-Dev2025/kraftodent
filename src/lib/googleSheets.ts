// src/lib/googleSheets.ts
export interface BookingData {
    Patient_Name: string;
    Email: string;
    Phone: string;
    Date: string;
    Time: string;
    Service_Type: string;
    Duration: string;
    Status: string;
    Created_Date: string;
}

export interface SheetsConfig {
    spreadsheetId: string;
    range: string;
    apiKey: string;
}

class GoogleSheetsService {
    private config: SheetsConfig;

    constructor(config: SheetsConfig) {
        this.config = config;
    }

    /**
     * Fetch data from Google Sheets
     */
    async fetchBookingData(): Promise<BookingData[]> {
        try {
            const url = `https://sheets.googleapis.com/v4/spreadsheets/${this.config.spreadsheetId}/values/${this.config.range}?key=${this.config.apiKey}`;

            const response = await fetch(url, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (!data.values || data.values.length === 0) {
                return [];
            }

            // First row contains headers
            const headers = data.values[0];
            const rows = data.values.slice(1);

            // Convert rows to objects
            const bookings: BookingData[] = rows.map((row: string[]) => {
                const booking: any = {};
                headers.forEach((header: string, index: number) => {
                    booking[header] = row[index] || "";
                });
                return booking as BookingData;
            });

            return bookings;
        } catch (error) {
            console.error("Error fetching data from Google Sheets:", error);
            throw error;
        }
    }

    /**
     * Get today's appointments
     */
    getTodaysAppointments(bookings: BookingData[]): BookingData[] {
        const today = new Date().toISOString().split("T")[0];
        return bookings.filter((booking) => {
            const bookingDate = this.parseDate(booking.Date);
            return bookingDate === today;
        });
    }
    /**
     * Get upcoming appointments (next 7 days)
     */
    getUpcomingAppointments(bookings: BookingData[]): BookingData[] {
        const today = new Date();
        const nextWeek = new Date();
        nextWeek.setDate(today.getDate() + 7);

        return bookings.filter((booking) => {
            const bookingDate = new Date(this.parseDate(booking.Date));
            return bookingDate > today && bookingDate <= nextWeek;
        });
    }

    /**
     * Get past appointments (before today)
     */
    getPastAppointments(bookings: BookingData[]): BookingData[] {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        return bookings
            .filter((booking) => {
                const bookingDate = new Date(this.parseDate(booking.Date));
                return bookingDate < today;
            })
            .sort((a, b) => {
                // Sort by date descending (most recent first)
                const dateA = new Date(this.parseDate(a.Date));
                const dateB = new Date(this.parseDate(b.Date));
                return dateB.getTime() - dateA.getTime();
            });
    }

    /**
     * Get statistics from booking data
     */
    getStatistics(bookings: BookingData[]) {
        const today = new Date().toISOString().split("T")[0];
        const todaysBookings = this.getTodaysAppointments(bookings);
        const confirmedToday = todaysBookings.filter(
            (b) => b.Status.toLowerCase() === "confirmed"
        ).length;

        // Calculate new patients (those created today)
        const newPatientsToday = bookings.filter((booking) => {
            const createdDate = this.parseDate(booking.Created_Date);
            return createdDate === today;
        }).length;

        // Calculate revenue (mock calculation based on service types)
        const serviceRates: { [key: string]: number } = {
            "dental cleaning": 2000,
            "tooth extraction": 5000,
            "dental checkup": 1500,
            "root canal": 15000,
            "dental filling": 3000,
            "teeth whitening": 8000,
            "dental implant": 50000,
        };

        const todaysRevenue = todaysBookings.reduce((total, booking) => {
            const serviceType = booking.Service_Type.toLowerCase();
            return total + (serviceRates[serviceType] || 2500);
        }, 0);

        // Calculate response rate (mock - in real scenario this would come from call logs)
        const responseRate = Math.min(98, Math.max(85, 95 + Math.random() * 6));

        return {
            todaysAppointments: todaysBookings.length,
            newPatients: newPatientsToday,
            revenue: todaysRevenue,
            responseRate: Math.round(responseRate),
            confirmedAppointments: confirmedToday,
            pendingAppointments: todaysBookings.length - confirmedToday,
        };
    }

    /**
     * Parse date from various formats to YYYY-MM-DD
     */
    private parseDate(dateString: string): string {
        try {
            if (!dateString) return "";

            // Handle different date formats
            let date: Date;

            if (dateString.includes("/")) {
                // Handle MM/DD/YYYY or DD/MM/YYYY
                const parts = dateString.split("/");
                if (parts.length === 3) {
                    // Assume MM/DD/YYYY format for now
                    date = new Date(
                        parseInt(parts[2]),
                        parseInt(parts[0]) - 1,
                        parseInt(parts[1])
                    );
                } else {
                    date = new Date(dateString);
                }
            } else if (dateString.includes("-")) {
                // Handle YYYY-MM-DD format
                date = new Date(dateString);
            } else {
                date = new Date(dateString);
            }

            if (isNaN(date.getTime())) {
                return "";
            }

            return date.toISOString().split("T")[0];
        } catch (error) {
            console.error("Error parsing date:", dateString, error);
            return "";
        }
    }

    /**
     * Format time to 12-hour format
     */
    formatTime(timeString: string): string {
        try {
            if (!timeString) return "";

            // If already in 12-hour format, return as is
            if (timeString.includes("AM") || timeString.includes("PM")) {
                return timeString;
            }

            // Convert 24-hour to 12-hour format
            const [hours, minutes] = timeString.split(":");
            const hour = parseInt(hours);
            const ampm = hour >= 12 ? "PM" : "AM";
            const hour12 = hour % 12 || 12;

            return `${hour12}:${minutes} ${ampm}`;
        } catch (error) {
            console.error("Error formatting time:", timeString, error);
            return timeString;
        }
    }
}

// Export singleton instance
export const sheetsService = new GoogleSheetsService({
    spreadsheetId: process.env.NEXT_PUBLIC_GOOGLE_SHEETS_ID || "",
    range: "appointment_info!A:I", // Adjust range as needed
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY || "",
});

export default GoogleSheetsService;
