import React from 'react';
interface ThemeProviderProps {
    theme: 'light' | 'dark' | 'dark-blue' | 'light-gray' | 'pastel-green' | 'warm-orange' | 'frosted-glass' | 'midnight-purple' | 'cyber-metal';
    children: React.ReactNode;
}
declare const ThemeProvider: React.FC<ThemeProviderProps>;
export default ThemeProvider;
