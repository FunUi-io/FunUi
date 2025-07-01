'use client';
import React, { useEffect } from 'react';
import { colorVarsToDarken, themes } from './themes';
import { getDarkenAmount, darkenToRgba } from './darkenUtils';

interface ThemeProviderProps {
  theme: 'light' | 'dark' | 'dark-blue' | 'light-gray';
  children: React.ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ theme, children }) => {
  useEffect(() => {
    const root = document.documentElement;
    const selectedTheme = themes[theme] || themes.light;

    // Apply selected theme variables
    Object.entries(selectedTheme).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });

    // Apply darkened RGBA versions (for dark themes only)
    if (theme === 'dark' || theme === 'dark-blue') {
      colorVarsToDarken.forEach((varName) => {
        const original = getComputedStyle(root).getPropertyValue(varName).trim();
        if (original) {
          const darkAmount = getDarkenAmount(varName);
          const rgba = darkenToRgba(original, darkAmount, 0.9);
          root.style.setProperty(varName, rgba);
        }
      });
    }
  }, [theme]);

  return (
    <div
      className={`theme-${theme}`}
      style={{
        backgroundColor: 'var(--page-bg)',
        color: 'var(--text-color)',
        minHeight: '100vh',
      }}
    >
      {children}
    </div>
  );
};

export default ThemeProvider;
