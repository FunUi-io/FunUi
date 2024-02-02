"use strict";
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.colors = void 0;
var React = __importStar(require("react"));
var pi_1 = require("react-icons/pi");
exports.colors = {
    primary: "#6366f1",
    primary50: "#eef2ff",
    primary100: "#e0e7ff",
    primary200: "#c7d2fe",
    primary300: "#a5b4fc",
    primary400: "#818cf8",
    primary500: "#6366f1",
    primary600: "#4f46e5",
    primary700: "#4338ca",
    primary800: "#3730a3",
    primary900: "#312e81",
    secondary: "#ec4899",
    secondary50: "#fdf2f8",
    secondary100: "#fce7f3",
    secondary200: "#fbcfe8",
    secondary300: "#f9a8d4",
    secondary400: "#f472b6",
    secondary500: "#ec4899",
    secondary600: "#db2777",
    secondary700: "#be185d",
    secondary800: "#9d174d",
    secondary900: "#831843",
    error: "#ef4444",
    error50: "#fef2f2",
    error100: "#fee2e2",
    error200: "#fecaca",
    error300: "#fca5a5",
    error400: "#f87171",
    error500: "#ef4444",
    error600: "#dc2626",
    error700: "#b91c1c",
    error800: "#991b1b",
    error900: "#7f1d1d",
    success: "#22c55e",
    success50: "#f0fdf4",
    success100: "#dcfce7",
    success200: "#bbf7d0",
    success300: "#86efac",
    success400: "#4ade80",
    success500: "#22c55e",
    success600: "#16a34a",
    success700: "#15803d",
    success800: "#166534",
    success900: "#14532d",
    warning: "#fb923c",
    warning50: "#fff7ed",
    warning100: "#ffedd5",
    warning200: "#fed7aa",
    warning300: "#fdba74",
    warning400: "#fb923c",
    warning500: "#f97316",
    warning600: "#ea580c",
    warning700: "#c2410c",
    warning800: "#9a3412",
    warning900: "#7c2d12",
    muted: "#78716c",
    muted50: "#fafafa",
    muted100: "#f5f5f5",
    muted200: "#e5e5e5",
    muted300: "#d4d4d4",
    muted400: "#a3a3a3",
    muted500: "#737373",
    muted600: "#525252",
    muted700: "#404040",
    muted800: "#262626",
    muted900: "#171717",
    info: "#0ea5e9",
    info50: "#f0f9ff",
    info100: "#e0f2fe",
    info200: "#bae6fd",
    info300: "#7dd3fc",
    info400: "#38bdf8",
    info500: "#0ea5e9",
    info600: "#0284c7",
    info700: "#0369a1",
    info800: "#075985",
    info900: "#0c4a6e",
    light: "#f5f5f4",
    light50: "#fafaf9",
    light100: "#f5f5f4",
    light200: "#e7e5e4",
    light300: "#d6d3d1",
    light400: "#a8a29e",
    light500: "#78716c",
    light600: "#57534e",
    light700: "#44403c",
    light800: "#292524",
    light900: "#1c1917",
    rose: "#f43f5e",
    rose50: "#fff1f2",
    rose100: "#ffe4e6",
    rose200: "#fecdd3",
    rose300: "#fda4af",
    rose400: "#fb7185",
    rose500: "#f43f5e",
    rose600: "#e11d48",
    rose700: "#be123c",
    rose800: "#9f1239",
    rose900: "#881337",
    pink: "#ec4899",
    pink50: "#fdf2f8",
    pink100: "#fce7f3",
    pink200: "#fbcfe8",
    pink300: "#f9a8d4",
    pink400: "#f472b6",
    pink500: "#ec4899",
    pink600: "#db2777",
    pink700: "#be185d",
    pink800: "#9d174d",
    pink900: "#831843",
    fuchsia: "#d946ef",
    fuchsia50: "#fdf4ff",
    fuchsia100: "#fae8ff",
    fuchsia200: "#f5d0fe",
    fuchsia300: "#f0abfc",
    fuchsia400: "#e879f9",
    fuchsia500: "#d946ef",
    fuchsia600: "#c026d3",
    fuchsia700: "#a21caf",
    fuchsia800: "#86198f",
    fuchsia900: "#701a75",
    purple: "#a855f7",
    purple50: "#faf5ff",
    purple100: "#f3e8ff",
    purple200: "#e9d5ff",
    purple300: "#d8b4fe",
    purple400: "#c084fc",
    purple500: "#a855f7",
    purple600: "#9333ea",
    purple700: "#7e22ce",
    purple800: "#6b21a8",
    purple900: "#581c87",
    violet: "#8b5cf6",
    violet50: "#f5f3ff",
    violet100: "#ede9fe",
    violet200: "#ddd6fe",
    violet300: "#c4b5fd",
    violet400: "#a78bfa",
    violet500: "#8b5cf6",
    violet600: "#7c3aed",
    violet700: "#6d28d9",
    violet800: "#5b21b6",
    violet900: "#4c1d95",
    indigo: "#6366f1",
    indigo50: "#eef2ff",
    indigo100: "#e0e7ff",
    indigo200: "#c7d2fe",
    indigo300: "#a5b4fc",
    indigo400: "#818cf8",
    indigo500: "#6366f1",
    indigo600: "#4f46e5",
    indigo700: "#4338ca",
    indigo800: "#3730a3",
    indigo900: "#312e81",
    blue: "#3b82f6",
    blue50: "#eff6ff",
    blue100: "#dbeafe",
    blue200: "#bfdbfe",
    blue300: "#93c5fd",
    blue400: "#60a5fa",
    blue500: "#3b82f6",
    blue600: "#2563eb",
    blue700: "#1d4ed8",
    blue800: "#1e40af",
    blue900: "#1e3a8a",
    lightBlue: "#0ea5e9",
    lightBlue50: "#f0f9ff",
    lightBlue100: "#e0f2fe",
    lightBlue200: "#bae6fd",
    lightBlue300: "#7dd3fc",
    lightBlue400: "#38bdf8",
    lightBlue500: "#0ea5e9",
    lightBlue600: "#0284c7",
    lightBlue700: "#0369a1",
    lightBlue800: "#075985",
    lightBlue900: "#0c4a6e",
    darkBlue: "#0077e6",
    darkBlue50: "#dbf4ff",
    darkBlue100: "#addbff",
    darkBlue200: "#7cc2ff",
    darkBlue300: "#4aa9ff",
    darkBlue400: "#1a91ff",
    darkBlue500: "#0077e6",
    darkBlue600: "#005db4",
    darkBlue700: "#004282",
    darkBlue800: "#002851",
    darkBlue900: "#000e21",
    cyan: "#06b6d4",
    cyan50: "#ecfeff",
    cyan100: "#cffafe",
    cyan200: "#a5f3fc",
    cyan300: "#67e8f9",
    cyan400: "#22d3ee",
    cyan500: "#06b6d4",
    cyan600: "#0891b2",
    cyan700: "#0e7490",
    cyan800: "#155e75",
    cyan900: "#164e63",
    teal: "#14b8a6",
    teal50: "#f0fdfa",
    teal100: "#ccfbf1",
    teal200: "#99f6e4",
    teal300: "#5eead4",
    teal400: "#2dd4bf",
    teal500: "#14b8a6",
    teal600: "#0d9488",
    teal700: "#0f766e",
    teal800: "#115e59",
    teal900: "#134e4a",
    emerald: "#10b981",
    emerald50: "#ecfdf5",
    emerald100: "#d1fae5",
    emerald200: "#a7f3d0",
    emerald300: "#6ee7b7",
    emerald400: "#34d399",
    emerald500: "#10b981",
    emerald600: "#059669",
    emerald700: "#047857",
    emerald800: "#065f46",
    emerald900: "#064e3b",
    green: "#22c55e",
    green50: "#f0fdf4",
    green100: "#dcfce7",
    green200: "#bbf7d0",
    green300: "#86efac",
    green400: "#4ade80",
    green500: "#22c55e",
    green600: "#16a34a",
    green700: "#15803d",
    green800: "#166534",
    green900: "#14532d",
    lime: "#84cc16",
    lime50: "#f7fee7",
    lime100: "#ecfccb",
    lime200: "#d9f99d",
    lime300: "#bef264",
    lime400: "#a3e635",
    lime500: "#84cc16",
    lime600: "#65a30d",
    lime700: "#4d7c0f",
    lime800: "#3f6212",
    lime900: "#365314",
    yellow: "#eab308",
    yellow50: "#fefce8",
    yellow100: "#fef9c3",
    yellow200: "#fef08a",
    yellow300: "#fde047",
    yellow400: "#facc15",
    yellow500: "#eab308",
    yellow600: "#ca8a04",
    yellow700: "#a16207",
    yellow800: "#854d0e",
    yellow900: "#713f12",
    amber: "#f59e0b",
    amber50: "#fffbeb",
    amber100: "#fef3c7",
    amber200: "#fde68a",
    amber300: "#fcd34d",
    amber400: "#fbbf24",
    amber500: "#f59e0b",
    amber600: "#d97706",
    amber700: "#b45309",
    amber800: "#92400e",
    amber900: "#78350f",
    orange: "#f97316",
    orange50: "#fff7ed",
    orange100: "#ffedd5",
    orange200: "#fed7aa",
    orange300: "#fdba74",
    orange400: "#fb923c",
    orange500: "#f97316",
    orange600: "#ea580c",
    orange700: "#c2410c",
    orange800: "#9a3412",
    orange900: "#7c2d12",
    red: "#ef4444",
    red50: "#fef2f2",
    red100: "#fee2e2",
    red200: "#fecaca",
    red300: "#fca5a5",
    red400: "#f87171",
    red500: "#ef4444",
    red600: "#dc2626",
    red700: "#b91c1c",
    red800: "#991b1b",
    red900: "#7f1d1d",
    warmGray: "#78716c",
    warmGray50: "#fafaf9",
    warmGray100: "#f5f5f4",
    warmGray200: "#e7e5e4",
    warmGray300: "#d6d3d1",
    warmGray400: "#a8a29e",
    warmGray500: "#78716c",
    warmGray600: "#57534e",
    warmGray700: "#44403c",
    warmGray800: "#292524",
    warmGray900: "#1c1917",
    trueGray: "#737373",
    trueGray50: "#fafafa",
    trueGray100: "#f5f5f5",
    trueGray200: "#e5e5e5",
    trueGray300: "#d4d4d4",
    trueGray400: "#a3a3a3",
    trueGray500: "#737373",
    trueGray600: "#525252",
    trueGray700: "#404040",
    trueGray800: "#262626",
    trueGray900: "#171717",
    coolGray: "#6b7280",
    coolGray50: "#f9fafb",
    coolGray100: "#f3f4f6",
    coolGray200: "#e5e7eb",
    coolGray300: "#d1d5db",
    coolGray400: "#9ca3af",
    coolGray500: "#6b7280",
    coolGray600: "#4b5563",
    coolGray700: "#374151",
    coolGray800: "#1f2937",
    coolGray900: "#111827",
    blueGray: "#64748b",
    blueGray50: "#f8fafc",
    blueGray100: "#f1f5f9",
    blueGray200: "#e2e8f0",
    blueGray300: "#cbd5e1",
    blueGray400: "#94a3b8",
    blueGray500: "#64748b",
    blueGray600: "#475569",
    blueGray700: "#334155",
    blueGray800: "#1e293b",
    blueGray900: "#0f172a",
    dark: "#71717a",
    dark50: "#18181b",
    dark100: "#27272a",
    dark200: "#3f3f46",
    dark300: "#52525b",
    dark400: "#71717a",
    dark500: "#a1a1aa",
    dark600: "#d4d4d8",
    dark700: "#e4e4e7",
    dark800: "#f4f4f5",
    dark900: "#fafafa",
    white: "#FFFFFF",
    black: "#000000",
};
function Button(_a) {
    var color = _a.color, bg = _a.bg, funcss = _a.funcss, startIcon = _a.startIcon, endIcon = _a.endIcon, text = _a.text, rounded = _a.rounded, raised = _a.raised, height = _a.height, width = _a.width, float = _a.float, hoverUp = _a.hoverUp, fullWidth = _a.fullWidth, outlined = _a.outlined, small = _a.small, hoverless = _a.hoverless, smaller = _a.smaller, big = _a.big, bigger = _a.bigger, jumbo = _a.jumbo, flat = _a.flat, hoverNone = _a.hoverNone, fillAnimation = _a.fillAnimation, fillDirection = _a.fillDirection, fillTextColor = _a.fillTextColor, outlineSize = _a.outlineSize, isLoading = _a.isLoading, status = _a.status, children = _a.children, bold = _a.bold, style = _a.style, onClick = _a.onClick, rest = __rest(_a, ["color", "bg", "funcss", "startIcon", "endIcon", "text", "rounded", "raised", "height", "width", "float", "hoverUp", "fullWidth", "outlined", "small", "hoverless", "smaller", "big", "bigger", "jumbo", "flat", "hoverNone", "fillAnimation", "fillDirection", "fillTextColor", "outlineSize", "isLoading", "status", "children", "bold", "style", "onClick"]);
    var classNames = [
        'button',
        "text-".concat(color),
        funcss || '',
        rounded ? 'roundBtn' : '',
        hoverless ? 'hoverless' : '',
        bold ? 'text-bold' : '',
        float ? 'floatBtn' : '',
        raised ? 'raisedBtn' : '',
        hoverUp ? 'hover-up' : '',
        flat ? 'flat' : '',
        hoverNone ? 'hoverNone' : '',
        small ? 'smallBtn' :
            smaller ? 'smallerBtn' : '',
        big ? 'bigBtn' : '',
        bigger ? 'biggerBtn' : '',
        jumbo ? 'jumboBtn' : '',
        outlined ? "outlined text-".concat(color ? color : bg) : bg || '',
        "".concat(fillAnimation ? "".concat(fillTextColor ? "hover-text-".concat(fillTextColor) : '', " button-fill fill-").concat(fillDirection ? fillDirection : 'left') : '')
    ].join(' ');
    return (React.createElement("span", null,
        React.createElement("button", __assign({ className: "".concat(classNames, " ").concat(startIcon || endIcon || status || isLoading ? 'iconic' : ''), style: __assign({ height: height || '', width: fullWidth ? '100%' : width || '', borderRadius: flat ? '0rem' : '', border: "".concat(outlined ? outlineSize ? "".concat(outlineSize, "rem solid ").concat(exports.colors[bg]) : "0.1rem solid ".concat(exports.colors[bg]) : '') }, style), onClick: onClick }, rest),
            isLoading &&
                React.createElement("span", { className: 'rotate btn_left_icon' },
                    React.createElement(pi_1.PiSpinner, null)),
            status &&
                React.createElement("span", { className: ' btn_left_icon' },
                    status === "success" && React.createElement(pi_1.PiCheck, null),
                    status === "info" && React.createElement(pi_1.PiInfo, null),
                    status === "warning" && React.createElement(pi_1.PiWarning, null),
                    status === "danger" && React.createElement(pi_1.PiX, null)),
            fillAnimation ? React.createElement("span", { className: "button_fill_span ".concat(bg) }) : '',
            startIcon && React.createElement("span", { className: "btn_left_icon" }, startIcon),
            text ? text : children,
            endIcon && React.createElement("span", { className: "btn_right_icon" }, endIcon))));
}
exports.default = Button;
