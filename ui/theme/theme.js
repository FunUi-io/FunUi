'use client';
"use strict";
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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var ThemeProvider = function (_a) {
    var theme = _a.theme, children = _a.children;
    (0, react_1.useEffect)(function () {
        var root = document.documentElement;
        var lightTheme = {
            '--page-bg': '#FFFFFF',
            '--text-color': '#000000',
            '--raiseThemes': '#FFFFFF',
            '--borderColor': '#CCCCCC',
        };
        var darkTheme = {
            '--page-bg': '#121212',
            '--text-color': '#FFFFFF',
            '--raiseThemes': '#202020',
            '--borderColor': '#333333',
        };
        var selectedTheme = theme === 'dark' ? darkTheme : lightTheme;
        Object.entries(selectedTheme).forEach(function (_a) {
            var key = _a[0], value = _a[1];
            root.style.setProperty(key, value);
        });
    }, [theme]);
    return (react_1.default.createElement("div", { className: "theme-".concat(theme), style: { backgroundColor: 'var(--page-bg)', color: 'var(--text-color)', minHeight: '100vh' } }, children));
};
exports.default = ThemeProvider;
