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
var react_1 = __importStar(require("react"));
var pi_1 = require("react-icons/pi");
// Mock function - replace with your actual function
var generateInputClasses = function (options) {
    var baseClasses = 'input-base border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500';
    var statusClasses = {
        error: 'border-red-500 focus:ring-red-500',
        success: 'border-green-500 focus:ring-green-500',
        warning: 'border-yellow-500 focus:ring-yellow-500',
        default: 'border-gray-300 focus:ring-blue-500'
    };
    var classes = baseClasses;
    if (options.status) {
        classes += ' ' + statusClasses[options.status];
    }
    if (options.rounded)
        classes += ' rounded-lg';
    if (options.leftRounded)
        classes += ' rounded-l-lg';
    if (options.rightRounded)
        classes += ' rounded-r-lg';
    if (options.flat)
        classes += ' shadow-none';
    if (options.fullWidth)
        classes += ' w-full';
    if (options.additionalClasses)
        classes += ' ' + options.additionalClasses;
    return classes;
};
var SearchableInput = function (_a) {
    var _b = _a.id, id = _b === void 0 ? 'searchableInput' : _b, name = _a.name, _c = _a.status, status = _c === void 0 ? 'default' : _c, funcss = _a.funcss, bg = _a.bg, _d = _a.fullWidth, fullWidth = _d === void 0 ? false : _d, _e = _a.flat, flat = _e === void 0 ? false : _e, _f = _a.rounded, rounded = _f === void 0 ? false : _f, _g = _a.leftRounded, leftRounded = _g === void 0 ? false : _g, _h = _a.rightRounded, rightRounded = _h === void 0 ? false : _h, label = _a.label, _j = _a.placeholder, placeholder = _j === void 0 ? 'Search...' : _j, icon = _a.icon, extra = _a.extra, _k = _a.value, value = _k === void 0 ? '' : _k, _l = _a.data, data = _l === void 0 ? [] : _l, onSelect = _a.onSelect, onChange = _a.onChange, onInputChange = _a.onInputChange, _m = _a.dropDirection, dropDirection = _m === void 0 ? 'up' : _m, _o = _a.maxHeight, maxHeight = _o === void 0 ? '200px' : _o, _p = _a.minChars, minChars = _p === void 0 ? 1 : _p, _q = _a.clearable, clearable = _q === void 0 ? true : _q, _r = _a.disabled, disabled = _r === void 0 ? false : _r, _s = _a.loading, loading = _s === void 0 ? false : _s, _t = _a.noDataText, noDataText = _t === void 0 ? 'No results found' : _t, _u = _a.autoComplete, autoComplete = _u === void 0 ? true : _u, _v = _a.highlightMatch, highlightMatch = _v === void 0 ? true : _v, rest = __rest(_a, ["id", "name", "status", "funcss", "bg", "fullWidth", "flat", "rounded", "leftRounded", "rightRounded", "label", "placeholder", "icon", "extra", "value", "data", "onSelect", "onChange", "onInputChange", "dropDirection", "maxHeight", "minChars", "clearable", "disabled", "loading", "noDataText", "autoComplete", "highlightMatch"]);
    var _w = (0, react_1.useState)(value), inputValue = _w[0], setInputValue = _w[1];
    var _x = (0, react_1.useState)(false), isOpen = _x[0], setIsOpen = _x[1];
    var _y = (0, react_1.useState)(-1), highlightedIndex = _y[0], setHighlightedIndex = _y[1];
    var _z = (0, react_1.useState)(null), selectedOption = _z[0], setSelectedOption = _z[1];
    var inputRef = (0, react_1.useRef)(null);
    var dropdownRef = (0, react_1.useRef)(null);
    var optionRefs = (0, react_1.useRef)([]);
    // Filter and sort options based on input
    var filteredOptions = (0, react_1.useMemo)(function () {
        if (!inputValue || inputValue.length < minChars)
            return [];
        var filtered = data.filter(function (option) {
            return option.text.toLowerCase().includes(inputValue.toLowerCase()) ||
                option.value.toString().toLowerCase().includes(inputValue.toLowerCase());
        });
        // Sort by relevance (exact matches first, then starts with, then contains)
        return filtered.sort(function (a, b) {
            var aText = a.text.toLowerCase();
            var bText = b.text.toLowerCase();
            var query = inputValue.toLowerCase();
            if (aText === query)
                return -1;
            if (bText === query)
                return 1;
            if (aText.startsWith(query) && !bText.startsWith(query))
                return -1;
            if (bText.startsWith(query) && !aText.startsWith(query))
                return 1;
            return 0;
        });
    }, [inputValue, data, minChars]);
    // Auto-complete logic
    (0, react_1.useEffect)(function () {
        if (autoComplete && filteredOptions.length > 0 && inputValue) {
            var exactMatch = filteredOptions.find(function (option) {
                return option.text.toLowerCase() === inputValue.toLowerCase();
            });
            if (exactMatch) {
                setSelectedOption(exactMatch);
            }
        }
    }, [filteredOptions, inputValue, autoComplete]);
    // Handle input change
    var handleInputChange = function (e) {
        var newValue = e.target.value;
        setInputValue(newValue);
        setIsOpen(newValue.length >= minChars);
        setHighlightedIndex(-1);
        setSelectedOption(null);
        if (onChange)
            onChange(newValue);
        if (onInputChange)
            onInputChange(e);
    };
    // Handle option selection
    var handleOptionSelect = function (option) {
        setInputValue(option.text);
        setSelectedOption(option);
        setIsOpen(false);
        setHighlightedIndex(-1);
        if (onSelect)
            onSelect(option);
        if (onChange)
            onChange(option.text);
    };
    // Handle keyboard navigation
    var handleKeyDown = function (e) {
        if (!isOpen || filteredOptions.length === 0)
            return;
        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setHighlightedIndex(function (prev) {
                    return prev < filteredOptions.length - 1 ? prev + 1 : 0;
                });
                break;
            case 'ArrowUp':
                e.preventDefault();
                setHighlightedIndex(function (prev) {
                    return prev > 0 ? prev - 1 : filteredOptions.length - 1;
                });
                break;
            case 'Enter':
                e.preventDefault();
                if (highlightedIndex >= 0) {
                    handleOptionSelect(filteredOptions[highlightedIndex]);
                }
                break;
            case 'Escape':
                setIsOpen(false);
                setHighlightedIndex(-1);
                break;
        }
    };
    // Scroll highlighted option into view
    (0, react_1.useEffect)(function () {
        var _a;
        if (highlightedIndex >= 0 && optionRefs.current[highlightedIndex]) {
            (_a = optionRefs.current[highlightedIndex]) === null || _a === void 0 ? void 0 : _a.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest'
            });
        }
    }, [highlightedIndex]);
    // Close dropdown when clicking outside
    (0, react_1.useEffect)(function () {
        var handleClickOutside = function (event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
                inputRef.current && !inputRef.current.contains(event.target)) {
                setIsOpen(false);
                setHighlightedIndex(-1);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return function () { return document.removeEventListener('mousedown', handleClickOutside); };
    }, []);
    // Clear input
    var handleClear = function () {
        var _a;
        setInputValue('');
        setSelectedOption(null);
        setIsOpen(false);
        if (onChange)
            onChange('');
        (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.focus();
    };
    // Highlight matching text
    var highlightText = function (text, highlight) {
        if (!highlightMatch || !highlight)
            return text;
        var parts = text.split(new RegExp("(".concat(highlight, ")"), 'gi'));
        return parts.map(function (part, index) {
            return part.toLowerCase() === highlight.toLowerCase() ? (react_1.default.createElement("span", { key: index, className: "bg-yellow-200 font-medium" }, part)) : part;
        });
    };
    var className = generateInputClasses({
        status: status,
        rounded: rounded,
        bg: bg,
        funcss: funcss,
        flat: flat,
        leftRounded: leftRounded,
        rightRounded: rightRounded,
        bordered: true,
        borderless: false,
        fullWidth: fullWidth,
        additionalClasses: 'searchableInput'
    });
    var containerStyle = fullWidth ? { width: '100%' } : undefined;
    var dropdownClasses = "absolute z-50 bg-white border border-gray-300 rounded-md shadow-lg ".concat(dropDirection === 'up' ? 'bottom-full mb-1' : 'top-full mt-1', " left-0 right-0");
    return (react_1.default.createElement("div", { className: "searchableInput-wrapper relative", style: containerStyle },
        label && (react_1.default.createElement("label", { htmlFor: id, className: "block text-sm font-medium text-gray-700 mb-1" }, label)),
        react_1.default.createElement("div", { className: "relative" },
            react_1.default.createElement("div", { className: "relative flex items-center" },
                icon && (react_1.default.createElement("div", { className: "absolute left-3 pointer-events-none text-gray-400" }, icon)),
                react_1.default.createElement("input", __assign({ ref: inputRef, id: id, name: name, type: "text", className: "".concat(className, " ").concat(icon ? 'pl-10' : '', " ").concat(clearable && inputValue ? 'pr-16' : 'pr-10'), placeholder: placeholder, value: inputValue, onChange: handleInputChange, onKeyDown: handleKeyDown, onFocus: function () { return inputValue.length >= minChars && setIsOpen(true); }, disabled: disabled }, rest)),
                react_1.default.createElement("div", { className: "absolute right-3 flex items-center space-x-1" },
                    clearable && inputValue && !disabled && (react_1.default.createElement("button", { type: "button", onClick: handleClear, className: "text-gray-400 hover:text-gray-600 p-1", tabIndex: -1 },
                        react_1.default.createElement(pi_1.PiX, { size: 16 }))),
                    react_1.default.createElement("div", { className: "text-gray-400" }, loading ? (react_1.default.createElement("div", { className: "animate-spin w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full" })) : (react_1.default.createElement(pi_1.PiCaretDown, { size: 16, className: "transition-transform ".concat(isOpen ? 'rotate-180' : '') }))))),
            isOpen && !disabled && (react_1.default.createElement("div", { ref: dropdownRef, className: dropdownClasses, style: { maxHeight: maxHeight } },
                react_1.default.createElement("div", { className: "py-1 overflow-y-auto", style: { maxHeight: maxHeight } }, filteredOptions.length > 0 ? (filteredOptions.map(function (option, index) { return (react_1.default.createElement("div", { key: "".concat(option.value, "-").concat(index), ref: function (el) {
                        optionRefs.current[index] = el;
                    }, className: "px-3 py-2 cursor-pointer hover:bg-blue-50 ".concat(index === highlightedIndex ? 'bg-blue-100' : '', " ").concat((selectedOption === null || selectedOption === void 0 ? void 0 : selectedOption.value) === option.value ? 'bg-blue-50' : ''), onClick: function () { return handleOptionSelect(option); } },
                    react_1.default.createElement("div", { className: "text-sm text-gray-900" }, highlightText(option.text, inputValue)),
                    option.value !== option.text && (react_1.default.createElement("div", { className: "text-xs text-gray-500" }, option.value)))); })) : (react_1.default.createElement("div", { className: "px-3 py-2 text-sm text-gray-500" }, noDataText)))))),
        extra && react_1.default.createElement("div", { className: "searchableInput-extra mt-1" }, extra)));
};
exports.default = SearchableInput;
