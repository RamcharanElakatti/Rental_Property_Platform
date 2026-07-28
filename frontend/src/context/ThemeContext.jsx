import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(localStorage.getItem('prm_theme') === 'dark');

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
    localStorage.setItem('prm_theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const value = useMemo(() => ({ darkMode, toggleTheme: () => setDarkMode((value) => !value) }), [darkMode]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);
