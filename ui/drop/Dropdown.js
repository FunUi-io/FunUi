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
var react_dom_1 = require("react-dom");
var Dropdown = function (_a) {
    var _b = _a.position, position = _b === void 0 ? 'bottom' : _b, button = _a.button, items = _a.items, _c = _a.closableOnlyOutside, closableOnlyOutside = _c === void 0 ? false : _c, _d = _a.className, className = _d === void 0 ? '' : _d, _e = _a.menuClassName, menuClassName = _e === void 0 ? '' : _e, width = _a.width, minWidth = _a.minWidth, maxWidth = _a.maxWidth, height = _a.height, minHeight = _a.minHeight, maxHeight = _a.maxHeight, _f = _a.usePortal, usePortal = _f === void 0 ? true : _f;
    var containerRef = (0, react_1.useRef)(null);
    var triggerRef = (0, react_1.useRef)(null);
    var menuRef = (0, react_1.useRef)(null);
    var _g = (0, react_1.useState)(false), open = _g[0], setOpen = _g[1];
    var _h = (0, react_1.useState)({}), menuStyle = _h[0], setMenuStyle = _h[1];
    // Calculate position when opening
    (0, react_1.useEffect)(function () {
        if (!open || !triggerRef.current) {
            setMenuStyle({});
            return;
        }
        var calculatePosition = function () {
            var _a;
            var rect = triggerRef.current.getBoundingClientRect();
            var styles = {
                width: width || undefined,
                minWidth: minWidth || undefined,
                maxWidth: maxWidth || undefined,
                height: height || undefined,
                minHeight: minHeight || undefined,
                maxHeight: maxHeight || undefined,
                zIndex: 9999,
            };
            if (usePortal) {
                styles.position = 'fixed';
                // Use viewport‑relative coordinates – NO scrollY/scrollX added
                switch (position) {
                    case 'top':
                        styles.top = rect.top;
                        styles.left = rect.left + rect.width / 2;
                        styles.transform = 'translateX(-50%) translateY(-100%)'; // place above, centered
                        break;
                    case 'bottom':
                        styles.top = rect.bottom;
                        styles.left = rect.left + rect.width / 2;
                        styles.transform = 'translateX(-50%)';
                        break;
                    case 'top-left':
                        styles.top = rect.top;
                        styles.left = rect.left;
                        styles.transform = 'translateY(-100%)'; // place above
                        break;
                    case 'top-right':
                        styles.top = rect.top;
                        styles.left = rect.right;
                        styles.transform = 'translateY(-100%)'; // place above
                        break;
                    case 'bottom-left':
                        styles.top = rect.bottom;
                        styles.left = rect.left;
                        break;
                    case 'bottom-right':
                        styles.top = rect.bottom;
                        styles.left = rect.right;
                        break;
                    case 'left':
                        styles.top = rect.top;
                        styles.left = rect.left;
                        styles.transform = 'translateX(-100%)'; // place to the left
                        break;
                    case 'right':
                        styles.top = rect.top;
                        styles.left = rect.right;
                        break;
                }
            }
            else {
                // Non‑portal mode: use absolute positioning inside the (assumed) relative container
                // You might need to ensure the container has position: relative.
                styles.position = 'absolute';
                // Here you would use offset values relative to the container.
                // For simplicity, we'll just copy the same logic without scroll offsets,
                // but note that getBoundingClientRect gives viewport coordinates,
                // which are not directly usable with absolute positioning unless the container is fixed/absolute.
                // A production version would need a more robust approach.
                // For now, we keep the original (flawed) logic, but you should consider
                // using a proper positioning library or always using the portal.
                var containerRect = (_a = containerRef.current) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect();
                if (containerRect) {
                    var relativeTop = rect.top - containerRect.top;
                    var relativeLeft = rect.left - containerRect.left;
                    switch (position) {
                        case 'top':
                            styles.top = relativeTop;
                            styles.left = relativeLeft + rect.width / 2;
                            styles.transform = 'translateX(-50%) translateY(-100%)';
                            break;
                        case 'bottom':
                            styles.top = rect.bottom - containerRect.top;
                            styles.left = relativeLeft + rect.width / 2;
                            styles.transform = 'translateX(-50%)';
                            break;
                        case 'top-left':
                            styles.top = relativeTop;
                            styles.left = relativeLeft;
                            styles.transform = 'translateY(-100%)';
                            break;
                        case 'top-right':
                            styles.top = relativeTop;
                            styles.left = rect.right - containerRect.left;
                            styles.transform = 'translateY(-100%)';
                            break;
                        case 'bottom-left':
                            styles.top = rect.bottom - containerRect.top;
                            styles.left = relativeLeft;
                            break;
                        case 'bottom-right':
                            styles.top = rect.bottom - containerRect.top;
                            styles.left = rect.right - containerRect.left;
                            break;
                        case 'left':
                            styles.top = relativeTop;
                            styles.left = relativeLeft;
                            styles.transform = 'translateX(-100%)';
                            break;
                        case 'right':
                            styles.top = relativeTop;
                            styles.left = rect.right - containerRect.left;
                            break;
                    }
                }
            }
            return styles;
        };
        setMenuStyle(calculatePosition());
        // Update on window resize
        var handleResize = function () {
            setMenuStyle(calculatePosition());
        };
        window.addEventListener('resize', handleResize);
        return function () { return window.removeEventListener('resize', handleResize); };
    }, [open, usePortal, position, width, minWidth, maxWidth, height, minHeight, maxHeight]);
    // Handle clicks outside
    (0, react_1.useEffect)(function () {
        var handleClickOutside = function (event) {
            if (!containerRef.current || !menuRef.current || !open)
                return;
            var target = event.target;
            var isClickInsideTrigger = containerRef.current.contains(target);
            var isClickInsideMenu = menuRef.current.contains(target);
            if (!isClickInsideTrigger && !isClickInsideMenu) {
                setOpen(false);
            }
        };
        if (open) {
            var timer_1 = setTimeout(function () {
                document.addEventListener('mousedown', handleClickOutside);
            }, 10);
            return function () {
                clearTimeout(timer_1);
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }
        return undefined;
    }, [open]);
    // Handle scroll to hide dropdown (optional – you may remove this if you want it to stay open)
    (0, react_1.useEffect)(function () {
        var handleScroll = function () {
            if (open) {
                setOpen(false);
            }
        };
        if (open) {
            window.addEventListener('scroll', handleScroll, { passive: true });
            return function () { return window.removeEventListener('scroll', handleScroll); };
        }
        return undefined;
    }, [open]);
    // Toggle open state
    var toggleOpen = (0, react_1.useCallback)(function (e) {
        e.stopPropagation();
        e.preventDefault();
        setOpen(function (prev) { return !prev; });
    }, []);
    var handleItemClick = function (item, e) {
        var _a;
        e.stopPropagation();
        if (item.disabled)
            return;
        (_a = item.onClick) === null || _a === void 0 ? void 0 : _a.call(item);
        if (!closableOnlyOutside) {
            setOpen(false);
        }
    };
    var renderMenu = function () {
        if (!open)
            return null;
        return (react_1.default.createElement("div", { ref: menuRef, className: "dropdown-menu ".concat(position, " ").concat(menuClassName), style: menuStyle, onClick: function (e) { return e.stopPropagation(); } }, items.map(function (item, index) { return (react_1.default.createElement(react_1.default.Fragment, { key: index }, item.divider ? (react_1.default.createElement("div", { className: "dropdown-divider" })) : (react_1.default.createElement("div", { className: "dropdown-item ".concat(item.disabled ? 'disabled' : ''), onClick: function (e) { return handleItemClick(item, e); } },
            item.startIcon && (react_1.default.createElement("span", { className: "dropdown-item-icon" }, item.startIcon)),
            react_1.default.createElement("span", { className: "dropdown-item-label" }, item.label),
            item.endIcon && (react_1.default.createElement("span", { className: "dropdown-item-icon" }, item.endIcon)))))); })));
    };
    return (react_1.default.createElement("div", { ref: containerRef, className: "dropdown-container ".concat(className) },
        react_1.default.createElement("div", { ref: triggerRef, onClick: toggleOpen, style: { cursor: 'pointer' }, className: "dropdown-trigger" }, button),
        open && (react_1.default.createElement(react_1.default.Fragment, null, usePortal ? ((0, react_dom_1.createPortal)(renderMenu(), document.body)) : (renderMenu())))));
};
exports.default = Dropdown;
