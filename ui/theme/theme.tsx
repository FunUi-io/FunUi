'use client'
import React, { useEffect } from 'react';

interface ThemeProviderProps {
  theme: 'light' | 'dark';
  children: React.ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ theme, children }) => {
  useEffect(() => {
    const root = document.documentElement;

    const lightTheme = {
      '--page-bg': '#FFFFFF',
      '--text-color': '#000000',
      '--raiseThemes': '#FFFFFF',
      '--borderColor': '#CCCCCC',
    };

    const darkTheme = {
      '--page-bg': '#121212',
      '--text-color': '#FFFFFF',
      '--raiseThemes': '#202020',
      '--borderColor': '#333333',
    };

    const selectedTheme = theme === 'dark' ? darkTheme : lightTheme;

    Object.entries(selectedTheme).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  }, [theme]);

  return (
    <div className={`theme-${theme}`} style={{ backgroundColor: 'var(--page-bg)', color: 'var(--text-color)', minHeight: '100vh' }}>
      {children}
    </div>
  );
};

export default ThemeProvider;
