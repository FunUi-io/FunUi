import React from 'react';
interface ThemeProviderProps {
    theme: 'light' | 'dark' | 'dark-blue' | 'light-gray';
    children: React.ReactNode;
}
declare const ThemeProvider: React.FC<ThemeProviderProps>;
export default ThemeProvider;
