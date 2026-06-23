import React, { createContext, useContext, useMemo, useState } from "react";
import { APP_COLORS } from "@/shared/constants/colors";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState("dark");

  const value = useMemo(
    () => ({
      mode,
      colors: APP_COLORS[mode],
      isDark: mode === "dark",
      toggleMode: () => setMode((current) => (current === "dark" ? "light" : "dark")),
    }),
    [mode],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useAppTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useAppTheme must be used within ThemeProvider");
  }

  return context;
}

