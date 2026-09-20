'use client';
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
exports.default = ToolTip;
var React = __importStar(require("react"));
var react_dom_1 = require("react-dom");
function ToolTip(_a) {
    var funcss = _a.funcss, children = _a.children, content = _a.content, message = _a.message, animation = _a.animation, duration = _a.duration, _b = _a.tip, tip = _b === void 0 ? 'top' : _b, _c = _a.usePortal, usePortal = _c === void 0 ? true : _c, _d = _a.disabled, disabled = _d === void 0 ? false : _d, _e = _a.delay, delay = _e === void 0 ? 200 : _e, rest = __rest(_a, ["funcss", "children", "content", "message", "animation", "duration", "tip", "usePortal", "disabled", "delay"]);
    var _f = React.useState(false), isVisible = _f[0], setIsVisible = _f[1];
    var _g = React.useState({ x: 0, y: 0 }), coords = _g[0], setCoords = _g[1];
    var triggerRef = React.useRef(null);
    var timeoutRef = React.useRef(null);
    var isMountedRef = React.useRef(true);
    var text = message || content || children;
    React.useEffect(function () {
        isMountedRef.current = true;
        return function () {
            isMountedRef.current = false;
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);
    var handleMouseEnter = function (e) {
        // Don't show tooltip if disabled
        if (disabled)
            return;
        // Clear any existing timeout
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        // Add delay before showing tooltip
        timeoutRef.current = setTimeout(function () {
            if (!isMountedRef.current)
                return;
            if (triggerRef.current) {
                var rect = triggerRef.current.getBoundingClientRect();
                var x = rect.left + (rect.width / 2);
                var y = rect.top;
                if (tip === 'bottom') {
                    y = rect.bottom;
                }
                else if (tip === 'left') {
                    x = rect.left;
                    y = rect.top + (rect.height / 2);
                }
                else if (tip === 'right') {
                    x = rect.right;
                    y = rect.top + (rect.height / 2);
                }
                var scrollX_1 = typeof window !== 'undefined' ? window.scrollX : 0;
                var scrollY_1 = typeof window !== 'undefined' ? window.scrollY : 0;
                setCoords({ x: x + scrollX_1, y: y + scrollY_1 });
                setIsVisible(true);
            }
        }, delay);
    };
    var handleMouseLeave = function (e) {
        // Clear timeout if mouse leaves before tooltip shows
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        setIsVisible(false);
    };
    // Prevent event propagation that could interfere with charts
    var handleMouseMove = function (e) {
        // Don't stop propagation - let events flow naturally
        // This allows chart interactions to work properly
    };
    var isBrowser = typeof window !== 'undefined';
    var tooltipStyle = isBrowser ? {
        position: 'fixed',
        top: coords.y,
        left: coords.x,
        zIndex: 10000, // Higher than dropdown to avoid conflicts
        opacity: isVisible ? 1 : 0,
        visibility: isVisible ? 'visible' : 'hidden', // Proper hiding
        transition: 'opacity 0.2s ease, visibility 0.2s ease',
        pointerEvents: 'none', // Critical: don't interfere with mouse events
        willChange: isVisible ? 'opacity' : 'auto', // Performance optimization
        transform: tip === 'top' ? 'translate(-50%, calc(-100% - 8px))' :
            tip === 'bottom' ? 'translate(-50%, 8px)' :
                tip === 'left' ? 'translate(calc(-100% - 8px), -50%)' :
                    'translate(8px, -50%)',
    } : {};
    // Only render portal content when actually visible
    var shouldRenderPortal = isBrowser && usePortal && text && isVisible;
    return (React.createElement(React.Fragment, null,
        React.createElement("span", __assign({ ref: triggerRef, className: "tooltip ".concat(funcss || ''), onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave, onMouseMove: handleMouseMove, style: {
                display: 'inline-block', // Ensure proper boundary calculation
                position: 'relative',
            } }, rest),
            !usePortal && text && isVisible && (React.createElement("div", { className: "tip tip-".concat(tip), style: {
                    pointerEvents: 'none',
                    position: 'absolute',
                    zIndex: 1,
                } }, text)),
            children && children !== text ? children : null),
        shouldRenderPortal && (0, react_dom_1.createPortal)(React.createElement("div", { className: "tip tip-".concat(tip), style: tooltipStyle, role: "tooltip", "aria-hidden": "true" }, text), document.body)));
}
