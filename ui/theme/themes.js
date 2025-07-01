"use strict";
// components/ThemeProvider/themes.ts
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.themes = exports.darkerDefaults = exports.colorVarsToDarken = void 0;
exports.colorVarsToDarken = [
    '--primary50', '--primary100', '--primary200', '--primary300', '--primary400',
    '--secondary50', '--secondary100', '--secondary200', '--secondary300', '--secondary400',
    '--accent50', '--accent100', '--accent200', '--accent300', '--accent400',
];
exports.darkerDefaults = {
    '--success50': '#c1dbc7',
    '--success100': '#b0d1b3',
    '--success200': '#92bb97',
    '--success300': '#6aa375',
    '--success400': '#3f864e',
    '--warning50': '#e6dcd4',
    '--warning100': '#e6d1bb',
    '--warning200': '#e2b783',
    '--warning300': '#e09b59',
    '--warning400': '#d57627',
    '--info50': '#c1d3e6',
    '--info100': '#b3c8e0',
    '--info200': '#91b3d4',
    '--info300': '#5a9bcb',
    '--info400': '#2f85c3',
    '--error50': '#e6cfcf',
    '--error100': '#e6bebe',
    '--error200': '#e29e9e',
    '--error300': '#da7373',
    '--error400': '#cc4646',
};
exports.themes = {
    light: {
        '--page-bg': '#FFFFFF',
        '--text-color': '#000000',
    },
    dark: __assign({ '--page-bg': '#1E1E1E', '--text-color': '#FFFFFF', '--raiseThemes': 'rgba(32, 32, 32, 0.5)', '--raiseOpaque': 'rgba(32, 32, 32, 0.8)', '--borderColor': '#4a4a4a', '--lighter': '#2a2a2a', '--linkColor': '#9ab', '--cardBg': '#1e1e1e', '--card': "4px 4px 6px #141414, -4px -4px 6px #272727" }, exports.darkerDefaults),
    'dark-blue': __assign({ '--page-bg': '#0d1b2a', '--text-color': '#f0f4f8', '--text-muted': '#a9bcd0', '--raiseThemes': 'rgba(13, 27, 42, 0.5)', '--raiseOpaque': 'rgba(13, 27, 42, 0.8)', '--borderColor': '#1e3249', '--lighter': '#1b2c3f', '--linkColor': '#56ccf2', '--accent': '#66d9ef', '--cardBg': '#0d1b2a', '--card': "4px 4px 6px #08121d, -4px -4px 6px #15273b" }, exports.darkerDefaults),
    'light-gray': {
        '--page-bg': '#e8e8e8',
        '--text-color': '#2a2a2a',
        '--text-muted': '#777777',
        '--raiseThemes': 'rgba(255, 255, 255, 0.6)',
        '--raiseOpaque': 'rgba(255, 255, 255, 0.94)',
        '--borderColor': '#d0d0d0',
        '--lighter': '#f4f4f4',
        '--linkColor': '#202020',
        '--accent': '#4a90e2',
        '--cardBg': '#e8e8e8',
        '--card': "8px 8px 16px #c5c5c5, -8px -8px 16px #ffffff",
    }
};
