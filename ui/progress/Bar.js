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
exports.default = ProgressBar;
var React = __importStar(require("react"));
var pi_1 = require("react-icons/pi");
function ProgressBar(_a) {
    var funcss = _a.funcss, progress = _a.progress, _b = _a.height, height = _b === void 0 ? 16 : _b, children = _a.children, content = _a.content, raised = _a.raised, rounded = _a.rounded, _c = _a.bg, bg = _c === void 0 ? 'primary' : _c, // default CSS class name
    _d = _a.type, // default CSS class name
    type = _d === void 0 ? 'linear' : _d, _e = _a.size, size = _e === void 0 ? 60 : _e, _f = _a.strokeWidth, strokeWidth = _f === void 0 ? 6 : _f;
    var clampedProgress = Math.min(100, Math.max(0, progress));
    var isComplete = clampedProgress >= 100;
    var effectiveBg = isComplete ? 'success' : bg;
    var renderContent = function () {
        if (React.isValidElement(content))
            return content;
        if (typeof content === 'function')
            return content(clampedProgress);
        if (typeof content === 'string')
            return content;
        return "".concat(clampedProgress, "%");
    };
    if (type === 'circle') {
        var radius = (size - strokeWidth) / 2;
        var circumference = 2 * Math.PI * radius;
        var offset = circumference - (clampedProgress / 100) * circumference;
        return (React.createElement("div", { className: "relative flex justify-center items-center ".concat(funcss), style: { width: size, height: size } },
            React.createElement("svg", { width: size, height: size, className: "rotate-[-90deg]" },
                React.createElement("circle", { cx: size / 2, cy: size / 2, r: radius, strokeWidth: strokeWidth, fill: "none", stroke: "#e5e7eb" // light gray background stroke
                 }),
                React.createElement("circle", { cx: size / 2, cy: size / 2, r: radius, strokeWidth: strokeWidth, fill: "none", className: effectiveBg, strokeDasharray: circumference, strokeDashoffset: offset, strokeLinecap: "round", style: { transition: 'stroke-dashoffset 0.4s ease, stroke 0.3s ease' } })),
            React.createElement("div", { className: "absolute text-center font-bold text-sm", style: {
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: size,
                    height: size,
                } }, isComplete ? React.createElement(pi_1.PiCheck, { className: "text-success800", size: size / 2.2 }) : renderContent())));
    }
    // Linear bar
    return (React.createElement("div", { className: "progressBar ".concat(raised ? 'raised' : '', " ").concat(rounded ? 'rounded' : '', " ").concat(funcss || '') },
        React.createElement("div", { className: "progressInner ".concat(rounded ? 'rounded' : '', " ").concat(effectiveBg), style: {
                width: "".concat(clampedProgress, "%"),
                height: "".concat(height, "px"),
                padding: '0 1rem',
                transition: 'width 0.3s ease, background-color 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                fontWeight: 'bold',
                color: '#fff',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
            } },
            isComplete ? React.createElement(pi_1.PiCheck, null) : renderContent(),
            " ",
            children)));
}
