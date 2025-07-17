"use strict";
'use client';
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
exports.default = Alert;
var pi_1 = require("react-icons/pi");
var react_1 = __importStar(require("react"));
function Alert(_a) {
    var message = _a.message, funcss = _a.funcss, type = _a.type, outlined = _a.outlined, fixed = _a.fixed, raised = _a.raised, fullWidth = _a.fullWidth, isLoading = _a.isLoading, children = _a.children, animation = _a.animation, duration = _a.duration, variant = _a.variant, flat = _a.flat, standard = _a.standard, card = _a.card, style = _a.style, _b = _a.autoHide, autoHide = _b === void 0 ? false : _b, _c = _a.autoHideDuration, autoHideDuration = _c === void 0 ? 3000 : _c, onClose = _a.onClose, rest = __rest(_a, ["message", "funcss", "type", "outlined", "fixed", "raised", "fullWidth", "isLoading", "children", "animation", "duration", "variant", "flat", "standard", "card", "style", "autoHide", "autoHideDuration", "onClose"]);
    var _d = (0, react_1.useState)(true), visible = _d[0], setVisible = _d[1];
    (0, react_1.useEffect)(function () {
        var timeout;
        if (autoHide) {
            timeout = setTimeout(function () {
                setVisible(false);
                onClose === null || onClose === void 0 ? void 0 : onClose();
            }, autoHideDuration);
        }
        return function () { return clearTimeout(timeout); };
    }, [autoHide, autoHideDuration, onClose]);
    if (!visible)
        return null;
    return (react_1.default.createElement("div", { className: "".concat(fixed ? 'alert-container ' : '', " ").concat(fixed === 'top-left' ? 'top-left' : '', "\n        ").concat(fixed === 'top-right' ? 'top-right' : '', "\n        ").concat(fixed === 'bottom-left' ? 'bottom-left' : '', "\n        ").concat(fixed === 'bottom-right' ? 'bottom-right' : '', "\n        ").concat(fixed === 'middle' ? 'middle-alert' : '', "\n        ").concat(fixed === 'top-middle' ? 'top-middle' : '', "\n        ").concat(fixed === 'bottom-middle' ? 'bottom-middle' : '') },
        react_1.default.createElement("div", __assign({ style: __assign({ animation: "".concat(duration || '0.3', "s ").concat(animation || 'ScaleUp') }, style), className: "text-".concat(type, "800 alert ").concat(card ? 'card' : '', " ").concat(flat ? 'flat' : '', " ").concat(raised ? 'raised' : '', " ").concat(outlined
                ? "outline-".concat(type, "500")
                : "".concat(variant || (standard ? "top-".concat(type) : "".concat(type, "200") + " outline-".concat(type, "300 "))), " ").concat(funcss || '', " ").concat(fullWidth ? 'width-100-p' : '') }, rest),
            react_1.default.createElement("div", { className: "alert-icon" }, !isLoading ? (react_1.default.createElement("div", { className: "text-".concat(type, "900"), style: { lineHeight: "0" } },
                type === 'success' && react_1.default.createElement(pi_1.PiCheckCircleDuotone, null),
                type === 'info' && react_1.default.createElement(pi_1.PiInfo, null),
                type === 'warning' && react_1.default.createElement(pi_1.PiWarning, null),
                type === 'error' && react_1.default.createElement(pi_1.PiX, null))) : (react_1.default.createElement("div", { className: "rotate", style: { lineHeight: "0" } },
                react_1.default.createElement(pi_1.PiSpinner, null)))),
            react_1.default.createElement("div", { className: "alert-text" }, message || children))));
}
