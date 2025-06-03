// src/lib/localStorage.ts

/**
 * Utility functions for safe localStorage operations
 * Handles SSR compatibility and error handling
 */

/**
 * Safely save data to localStorage
 * @param key - The key to store the data under
 * @param value - The value to store (will be JSON stringified)
 * @returns boolean - true if successful, false if failed
 */
export function saveToLocalStorage(key: string, value: any): boolean {
    try {
        // Check if we're in a browser environment
        if (typeof window === "undefined") {
            console.warn("localStorage not available in SSR environment");
            return false;
        }

        // Check if localStorage is available (some browsers disable it)
        if (!window.localStorage) {
            console.warn("localStorage is not available");
            return false;
        }

        const serializedValue = JSON.stringify(value);
        localStorage.setItem(key, serializedValue);

        // Verify the data was actually saved
        const saved = localStorage.getItem(key);
        if (saved !== serializedValue) {
            console.error("Failed to verify localStorage save operation");
            return false;
        }

        return true;
    } catch (error) {
        console.error("Error saving to localStorage:", error);

        // Handle quota exceeded error
        if (error instanceof Error && error.name === "QuotaExceededError") {
            console.error(
                "localStorage quota exceeded. Consider clearing old data."
            );
        }

        return false;
    }
}

/**
 * Safely retrieve data from localStorage
 * @param key - The key to retrieve data for
 * @param defaultValue - The default value to return if key doesn't exist or parsing fails
 * @returns T - The parsed value or default value
 */
export function getFromLocalStorage<T>(key: string, defaultValue: T): T {
    try {
        // Check if we're in a browser environment
        if (typeof window === "undefined") {
            return defaultValue;
        }

        // Check if localStorage is available
        if (!window.localStorage) {
            return defaultValue;
        }

        const item = localStorage.getItem(key);

        // Return default if item doesn't exist
        if (item === null) {
            return defaultValue;
        }

        // Parse and return the value
        const parsedValue = JSON.parse(item) as T;
        return parsedValue;
    } catch (error) {
        console.error("Error reading from localStorage:", error);

        // If parsing fails, try to remove the corrupted data
        try {
            localStorage.removeItem(key);
        } catch (removeError) {
            console.error(
                "Failed to remove corrupted localStorage item:",
                removeError
            );
        }

        return defaultValue;
    }
}

/**
 * Safely remove an item from localStorage
 * @param key - The key to remove
 */
export function removeFromLocalStorage(key: string): void {
    try {
        if (typeof window === "undefined") {
            return;
        }

        if (!window.localStorage) {
            return;
        }

        localStorage.removeItem(key);
    } catch (error) {
        console.error("Error removing from localStorage:", error);
    }
}

/**
 * Safely clear all localStorage data
 * Use with caution - this will remove ALL localStorage data for the domain
 */
export function clearAllLocalStorage(): void {
    try {
        if (typeof window === "undefined") {
            return;
        }

        if (!window.localStorage) {
            return;
        }

        localStorage.clear();
    } catch (error) {
        console.error("Error clearing localStorage:", error);
    }
}

/**
 * Check if localStorage is available and functional
 * @returns boolean - true if localStorage is available and working
 */
export function isLocalStorageAvailable(): boolean {
    try {
        if (typeof window === "undefined") {
            return false;
        }

        if (!window.localStorage) {
            return false;
        }

        // Test localStorage functionality
        const testKey = "__kraft_test__";
        const testValue = "test";

        localStorage.setItem(testKey, testValue);
        const retrieved = localStorage.getItem(testKey);
        localStorage.removeItem(testKey);

        return retrieved === testValue;
    } catch (error) {
        return false;
    }
}

/**
 * Get the current localStorage usage
 * @returns object with used and total space information
 */
export function getLocalStorageUsage(): {
    used: number;
    total: number;
    percentage: number;
} {
    try {
        if (!isLocalStorageAvailable()) {
            return { used: 0, total: 0, percentage: 0 };
        }

        let used = 0;
        for (const key in localStorage) {
            if (localStorage.hasOwnProperty(key)) {
                used += localStorage[key].length + key.length;
            }
        }

        // Most browsers have a 5MB limit, but this can vary
        const total = 5 * 1024 * 1024; // 5MB in bytes
        const percentage = Math.round((used / total) * 100);

        return { used, total, percentage };
    } catch (error) {
        console.error("Error calculating localStorage usage:", error);
        return { used: 0, total: 0, percentage: 0 };
    }
}

/**
 * Clean up old localStorage entries based on a pattern
 * @param keyPattern - RegExp pattern to match keys to remove
 * @param maxAge - Maximum age in milliseconds (optional)
 */
export function cleanupLocalStorage(
    keyPattern: RegExp,
    maxAge?: number
): number {
    try {
        if (!isLocalStorageAvailable()) {
            return 0;
        }

        const keysToRemove: string[] = [];
        const now = Date.now();

        for (const key in localStorage) {
            if (localStorage.hasOwnProperty(key) && keyPattern.test(key)) {
                if (maxAge) {
                    try {
                        const data = JSON.parse(localStorage[key]);
                        // Assume data has a timestamp field
                        if (
                            data.timestamp &&
                            now - new Date(data.timestamp).getTime() > maxAge
                        ) {
                            keysToRemove.push(key);
                        }
                    } catch {
                        // If we can't parse or find timestamp, consider it old
                        keysToRemove.push(key);
                    }
                } else {
                    keysToRemove.push(key);
                }
            }
        }

        keysToRemove.forEach((key) => {
            localStorage.removeItem(key);
        });

        return keysToRemove.length;
    } catch (error) {
        console.error("Error cleaning up localStorage:", error);
        return 0;
    }
}

/**
 * Export all localStorage data for backup/debugging
 * @returns object with all localStorage data
 */
export function exportLocalStorageData(): Record<string, any> {
    try {
        if (!isLocalStorageAvailable()) {
            return {};
        }

        const data: Record<string, any> = {};

        for (const key in localStorage) {
            if (localStorage.hasOwnProperty(key)) {
                try {
                    data[key] = JSON.parse(localStorage[key]);
                } catch {
                    // If parsing fails, store as string
                    data[key] = localStorage[key];
                }
            }
        }

        return data;
    } catch (error) {
        console.error("Error exporting localStorage data:", error);
        return {};
    }
}

/**
 * Import localStorage data from a backup
 * @param data - Object containing the data to import
 * @param overwrite - Whether to overwrite existing keys
 * @returns number of items imported
 */
export function importLocalStorageData(
    data: Record<string, any>,
    overwrite = false
): number {
    try {
        if (!isLocalStorageAvailable()) {
            return 0;
        }

        let imported = 0;

        for (const [key, value] of Object.entries(data)) {
            const exists = localStorage.getItem(key) !== null;

            if (!exists || overwrite) {
                try {
                    const serialized =
                        typeof value === "string"
                            ? value
                            : JSON.stringify(value);
                    localStorage.setItem(key, serialized);
                    imported++;
                } catch (error) {
                    console.error(`Failed to import key "${key}":`, error);
                }
            }
        }

        return imported;
    } catch (error) {
        console.error("Error importing localStorage data:", error);
        return 0;
    }
}
