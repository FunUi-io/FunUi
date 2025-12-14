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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var theme_1 = require("../theme/theme");
var Flex_1 = __importDefault(require("../flex/Flex"));
var Select = function (_a) {
    var id = _a.id, name = _a.name, value = _a.value, defaultValue = _a.defaultValue, _b = _a.label, label = _b === void 0 ? 'Select an option' : _b, _c = _a.options, options = _c === void 0 ? [] : _c, onChange = _a.onChange, onBlur = _a.onBlur, _d = _a.searchable, searchable = _d === void 0 ? true : _d, _e = _a.disabled, disabled = _e === void 0 ? false : _e, _f = _a.bordered, bordered = _f === void 0 ? false : _f, _g = _a.borderless, borderless = _g === void 0 ? false : _g, _h = _a.rounded, rounded = _h === void 0 ? false : _h, _j = _a.flat, flat = _j === void 0 ? false : _j, _k = _a.fullWidth, fullWidth = _k === void 0 ? false : _k, _l = _a.status, status = _l === void 0 ? '' : _l, _m = _a.className, className = _m === void 0 ? '' : _m, _o = _a.funcss, funcss = _o === void 0 ? '' : _o, _p = _a.style, style = _p === void 0 ? {} : _p, _q = _a.searchAutoFocus, searchAutoFocus = _q === void 0 ? false : _q, _r = _a.required, required = _r === void 0 ? false : _r;
    var _s = (0, react_1.useState)(false), isOpen = _s[0], setIsOpen = _s[1];
    var _t = (0, react_1.useState)(''), searchQuery = _t[0], setSearchQuery = _t[1];
    var _u = (0, react_1.useState)(-1), focusedIndex = _u[0], setFocusedIndex = _u[1];
    var _v = (0, react_1.useState)(options), filteredOptions = _v[0], setFilteredOptions = _v[1];
    var _w = (0, react_1.useState)(value || defaultValue || ''), internalValue = _w[0], setInternalValue = _w[1];
    var containerRef = (0, react_1.useRef)(null);
    var triggerRef = (0, react_1.useRef)(null);
    var searchInputRef = (0, react_1.useRef)(null);
    var selectRef = (0, react_1.useRef)(null);
    var variant = (0, theme_1.useVariant)().variant;
    var currentValue = value !== undefined ? value : internalValue;
    var selectedOption = options.find(function (opt) { return opt.value === currentValue; }) || null;
    // Update filtered options when search query changes
    (0, react_1.useEffect)(function () {
        if (searchQuery) {
            var filtered = options.filter(function (option) {
                return (option.text || option.label || "").toLowerCase().includes(searchQuery.toLowerCase());
            });
            setFilteredOptions(filtered);
            setFocusedIndex(filtered.length > 0 ? 0 : -1);
        }
        else {
            setFilteredOptions(options);
            setFocusedIndex(-1);
        }
    }, [searchQuery, options]);
    // Handle outside clicks
    (0, react_1.useEffect)(function () {
        var handleClickOutside = function (event) {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                closeDropdown();
            }
        };
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            return function () { return document.removeEventListener('mousedown', handleClickOutside); };
        }
    }, [isOpen]);
    var openDropdown = function () {
        if (disabled)
            return;
        setIsOpen(true);
        if (searchable && searchInputRef.current) {
            if (searchAutoFocus) {
                setTimeout(function () { var _a; return (_a = searchInputRef.current) === null || _a === void 0 ? void 0 : _a.focus(); }, 100);
            }
        }
        else if (selectedOption) {
            var index = filteredOptions.findIndex(function (opt) { return opt.value === selectedOption.value; });
            setFocusedIndex(index >= 0 ? index : 0);
        }
        else {
            setFocusedIndex(0);
        }
    };
    var closeDropdown = function () {
        setIsOpen(false);
        setSearchQuery('');
        setFocusedIndex(-1);
    };
    var selectOption = function (option) {
        setInternalValue(option.value);
        closeDropdown();
        // Trigger native select change
        if (selectRef.current) {
            selectRef.current.value = option.value;
            var nativeEvent = new Event('change', { bubbles: true });
            selectRef.current.dispatchEvent(nativeEvent);
        }
        // Call onChange with value as first argument and event object as second
        if (onChange) {
            var eventObject = {
                target: { value: option.value, name: name || '' }
            };
            onChange(option.value, eventObject);
        }
    };
    var handleNativeChange = function (event) {
        var newValue = event.target.value;
        var option = options.find(function (opt) { return opt.value === newValue; });
        setInternalValue(newValue);
        if (onChange && option) {
            var eventObject = {
                target: { value: newValue, name: name || '' }
            };
            onChange(newValue, eventObject);
        }
    };
    var handleKeyDown = function (event) {
        var _a;
        switch (event.key) {
            case 'Enter':
            case ' ':
                event.preventDefault();
                if (isOpen && focusedIndex >= 0) {
                    selectOption(filteredOptions[focusedIndex]);
                }
                else {
                    openDropdown();
                }
                break;
            case 'ArrowDown':
                event.preventDefault();
                if (!isOpen) {
                    openDropdown();
                }
                else {
                    setFocusedIndex(function (prev) { return Math.min(prev + 1, filteredOptions.length - 1); });
                }
                break;
            case 'ArrowUp':
                event.preventDefault();
                if (isOpen) {
                    setFocusedIndex(function (prev) { return Math.max(prev - 1, 0); });
                }
                break;
            case 'Escape':
                if (isOpen) {
                    event.preventDefault();
                    closeDropdown();
                    (_a = triggerRef.current) === null || _a === void 0 ? void 0 : _a.focus();
                }
                break;
        }
    };
    var handleSearchKeyDown = function (event) {
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault();
            handleKeyDown(event);
        }
        else if (event.key === 'Enter' && focusedIndex >= 0) {
            event.preventDefault();
            selectOption(filteredOptions[focusedIndex]);
        }
        else if (event.key === 'Escape') {
            closeDropdown();
        }
    };
    var getTriggerClasses = function () {
        var classes = [
            'select-trigger',
            isOpen && 'open',
            variant === 'standard' ? 'bordered' : bordered && 'bordered',
            variant === 'minimal' ? 'borderless' : borderless && 'borderless',
            flat && 'flat',
            status && status,
            disabled && 'disabled'
        ].filter(Boolean);
        return classes.join(' ');
    };
    var getContainerClasses = function () {
        var classes = [
            'custom-select',
            fullWidth && 'fullWidth',
            className,
        ].filter(Boolean);
        return classes.join(' ');
    };
    return (react_1.default.createElement("div", { ref: containerRef, className: "".concat(funcss, " ").concat(rounded && 'round-edge', " ").concat(getContainerClasses()), style: style },
        react_1.default.createElement("select", { ref: selectRef, id: id, name: name, value: currentValue, onChange: handleNativeChange, onBlur: onBlur, disabled: disabled, required: required, style: {
                position: 'absolute',
                opacity: 0,
                width: 0,
                height: 0,
                pointerEvents: 'none'
            }, tabIndex: -1 },
            !label && react_1.default.createElement("option", { value: "" }, "Select an option"),
            options.map(function (option) { return (react_1.default.createElement("option", { key: option.value, value: option.value }, option.text || option.label || option.value)); })),
        react_1.default.createElement("div", { ref: triggerRef, className: "".concat(funcss, " ").concat(rounded && 'round-edge', "  ").concat(getTriggerClasses()), onClick: openDropdown, onKeyDown: handleKeyDown, tabIndex: disabled ? -1 : 0, role: "button", "aria-expanded": isOpen, "aria-haspopup": "listbox" },
            react_1.default.createElement("span", { className: "select-value ".concat(!selectedOption ? 'select-placeholder' : '') }, selectedOption ? selectedOption.text : label),
            react_1.default.createElement("div", { className: "select-arrow ".concat(isOpen ? 'open' : '') },
                react_1.default.createElement("svg", { width: "16", height: "16", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" },
                    react_1.default.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M19 9l-7 7-7-7" })))),
        react_1.default.createElement("div", { className: "select-dropdown ".concat(isOpen ? 'open' : '', " ") },
            searchable && (react_1.default.createElement("input", { ref: searchInputRef, type: "text", className: "select-search", placeholder: "Search options...", style: { borderRadius: 0 }, value: searchQuery, onChange: function (e) { return setSearchQuery(e.target.value); }, onKeyDown: handleSearchKeyDown })),
            react_1.default.createElement("div", { className: "select-options", role: "listbox" }, filteredOptions.length === 0 ? (react_1.default.createElement("div", { className: "select-option no-results" }, "No options found")) : (filteredOptions.map(function (option, index) { return (react_1.default.createElement("button", { style: { borderRadius: 0 }, key: option.value, type: "button", className: "select-option ".concat((selectedOption === null || selectedOption === void 0 ? void 0 : selectedOption.value) === option.value ? 'selected' : '', " ").concat(index === focusedIndex ? 'focused' : ''), onClick: function () { return selectOption(option); }, role: "option", "aria-selected": (selectedOption === null || selectedOption === void 0 ? void 0 : selectedOption.value) === option.value },
                react_1.default.createElement(Flex_1.default, { width: '100%', gap: 0.5 }, option === null || option === void 0 ? void 0 :
                    option.prefix,
                    " ",
                    option.text,
                    " ", option === null || option === void 0 ? void 0 :
                    option.suffix))); }))))));
};
exports.default = Select;
