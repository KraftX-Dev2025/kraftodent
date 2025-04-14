import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

type ThemeProviderProps = {
    children: React.ReactNode;
    defaultTheme?: Theme;
    storageKey?: string;
};

type ThemeProviderState = {
    theme: Theme;
    setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
    theme: "system",
    setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
    children,
    defaultTheme = "system",
    storageKey = "kraftodent-theme",
    ...props
}: ThemeProviderProps) {
    // Get initial theme with SSR and localStorage safety checks
    const [theme, setTheme] = useState<Theme>(() => {
        // Only access localStorage on the client side
        if (typeof window !== "undefined") {
            try {
                const storedTheme = localStorage.getItem(storageKey);
                return storedTheme ? (storedTheme as Theme) : defaultTheme;
            } catch (error) {
                console.error("Error accessing localStorage:", error);
                return defaultTheme;
            }
        }
        return defaultTheme;
    });

    // Update theme class on document.documentElement
    useEffect(() => {
        const root = window.document.documentElement;

        // Remove existing theme classes
        root.classList.remove("light", "dark");

        // Handle system preference
        if (theme === "system") {
            const systemTheme = window.matchMedia(
                "(prefers-color-scheme: dark)"
            ).matches
                ? "dark"
                : "light";

            root.classList.add(systemTheme);
            return;
        }

        // Add the selected theme class
        root.classList.add(theme);
    }, [theme]);

    // Save theme to localStorage when it changes
    useEffect(() => {
        if (typeof window !== "undefined") {
            try {
                localStorage.setItem(storageKey, theme);
            } catch (error) {
                console.error("Error saving theme to localStorage:", error);
            }
        }
    }, [theme, storageKey]);

    // Listen for system theme preferences changes
    useEffect(() => {
        if (theme !== "system") return;

        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

        // Update theme when system preference changes
        const handleChange = () => {
            const root = window.document.documentElement;
            root.classList.remove("light", "dark");
            root.classList.add(mediaQuery.matches ? "dark" : "light");
        };

        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, [theme]);

    const value = {
        theme,
        setTheme: (newTheme: Theme) => {
            setTheme(newTheme);
        },
    };

    return (
        <ThemeProviderContext.Provider {...props} value={value}>
            {children}
        </ThemeProviderContext.Provider>
    );
}

export const useTheme = () => {
    const context = useContext(ThemeProviderContext);

    if (context === undefined)
        throw new Error("useTheme must be used within a ThemeProvider");

    return context;
};
