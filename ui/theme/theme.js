"use strict";
'use client';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var themes_1 = require("./themes");
var darkenUtils_1 = require("./darkenUtils");
var ThemeProvider = function (_a) {
    var theme = _a.theme, children = _a.children;
    (0, react_1.useEffect)(function () {
        var root = document.documentElement;
        var selectedTheme = themes_1.themes[theme] || themes_1.themes.light;
        // Apply selected theme variables
        Object.entries(selectedTheme).forEach(function (_a) {
            var key = _a[0], value = _a[1];
            root.style.setProperty(key, value);
        });
        // Apply darkened RGBA versions (for dark themes only)
        if (theme === 'dark' || theme === 'dark-blue' || theme === 'midnight-purple' || theme === 'cyber-metal') {
            themes_1.colorVarsToDarken.forEach(function (varName) {
                var original = getComputedStyle(root).getPropertyValue(varName).trim();
                if (original) {
                    var darkAmount = (0, darkenUtils_1.getDarkenAmount)(varName);
                    var rgba = (0, darkenUtils_1.darkenToRgba)(original, darkAmount, 0.9);
                    root.style.setProperty(varName, rgba);
                }
            });
        }
    }, [theme]);
    return (react_1.default.createElement("div", { className: "theme-".concat(theme), style: {
            backgroundColor: 'var(--page-bg)',
            color: 'var(--text-color)',
            minHeight: '100vh',
        } }, children));
};
exports.default = ThemeProvider;
