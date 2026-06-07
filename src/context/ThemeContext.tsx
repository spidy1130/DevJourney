"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type Theme = "light" | "dark" | "amoled";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Initial sync
    const root = document.documentElement;
    const initialTheme = root.getAttribute("data-theme") as Theme;
    if (initialTheme) {
      setThemeState(initialTheme);
    } else {
      // Logic inside the layout head script will have set it, but fallback:
      const savedTheme = localStorage.getItem("devjourney-theme") as Theme;
      const sysDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setThemeState(savedTheme ? savedTheme : (sysDark ? "dark" : "light"));
    }
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem("devjourney-theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  // Skip rendering children to prevent hydration mismatch 
  // (Alternatively, render with original server theme to avoid flash if possible)
  if (!mounted) {
    // Render seamlessly with the server's blind state
    return <ThemeContext.Provider value={{ theme: "dark", setTheme }}>{children}</ThemeContext.Provider>;
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
