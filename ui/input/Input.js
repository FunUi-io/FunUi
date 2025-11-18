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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileInput = exports.TextareaInput = exports.SelectInput = exports.TextInput = void 0;
var react_1 = __importStar(require("react"));
var pi_1 = require("react-icons/pi");
var Button_1 = __importDefault(require("../button/Button"));
var theme_1 = require("../theme/theme");
var componentUtils_1 = require("../../utils/componentUtils");
var getDynamicIcon_1 = require("../../utils/getDynamicIcon");
// Status icons mapping
var statusIcons = {
    success: react_1.default.createElement(pi_1.PiCheckCircle, null),
    warning: react_1.default.createElement(pi_1.PiWarning, null),
    danger: react_1.default.createElement(pi_1.PiX, null),
    info: react_1.default.createElement(pi_1.PiInfo, null)
};
// Utility function to generate CSS classes
var generateInputClasses = function (_a) {
    var status = _a.status, rounded = _a.rounded, bg = _a.bg, funcss = _a.funcss, flat = _a.flat, leftRounded = _a.leftRounded, rightRounded = _a.rightRounded, bordered = _a.bordered, borderless = _a.borderless, _b = _a.additionalClasses, additionalClasses = _b === void 0 ? '' : _b;
    var statusClass = status ? "".concat(status, "-input") : '';
    var roundedClass = rounded ? 'rounded' : '';
    var bgClass = bg || '';
    var flatClass = flat ? 'flat' : '';
    var cornerClass = leftRounded ? 'leftRounded' : rightRounded ? 'rightRounded' : '';
    var borderClass = bordered ? 'borderedInput' : borderless ? 'borderless' : (!bordered && !borderless ? 'borderedInput' : '');
    return "\n    ".concat(statusClass, "\n    ").concat(roundedClass, "\n    ").concat(bgClass, "\n    ").concat(funcss || '', "\n    ").concat(flatClass, "\n    ").concat(cornerClass, "\n    ").concat(borderClass, "\n    ").concat(additionalClasses, "\n    input\n  ").trim().replace(/\s+/g, ' ');
};
// Iconic Input Wrapper Component
var IconicInputWrapper = function (_a) {
    var startIcon = _a.startIcon, endIcon = _a.endIcon, prefix = _a.prefix, suffix = _a.suffix, iconicBg = _a.iconicBg, funcss = _a.funcss, children = _a.children;
    var effectiveStartIcon = prefix !== undefined ? prefix : startIcon;
    var effectiveEndIcon = suffix !== undefined ? suffix : endIcon;
    if (!effectiveStartIcon && !effectiveEndIcon) {
        return react_1.default.createElement(react_1.default.Fragment, null, children);
    }
    return (react_1.default.createElement("div", { className: "icon-container ".concat(effectiveStartIcon ? 'has-left-icon' : '', " ").concat(funcss || '') },
        effectiveStartIcon && (react_1.default.createElement("div", { className: "leftIcon", style: {
                backgroundColor: iconicBg || '',
                border: iconicBg ? "0.1rem ".concat(iconicBg, " solid") : '',
            } }, effectiveStartIcon)),
        children,
        effectiveEndIcon && (react_1.default.createElement("div", { className: "rightIcon", style: { backgroundColor: iconicBg || '' } }, effectiveEndIcon))));
};
// Input Container with Floating Label
var InputContainer = function (_a) {
    var label = _a.label, status = _a.status, helperText = _a.helperText, children = _a.children, isFocused = _a.isFocused, hasValue = _a.hasValue, fullWidth = _a.fullWidth, id = _a.id, startIcon = _a.startIcon, prefix = _a.prefix;
    var showFloatingLabel = label && (isFocused || hasValue);
    return (react_1.default.createElement("div", { className: "input-wrapper ".concat(fullWidth ? 'full-width' : '') },
        react_1.default.createElement("div", { className: "input-container-with-label" },
            label && (react_1.default.createElement("label", { htmlFor: id, className: "floating-label ".concat(startIcon || prefix ? "label-left" : "", "  ").concat(showFloatingLabel ? 'active' : '', " ").concat(status ? "label-".concat(status) : '') }, label)),
            children),
        (helperText || status) && (react_1.default.createElement("div", { className: "input-helper-text ".concat(status ? "helper-".concat(status) : '') },
            status && statusIcons[status] && (react_1.default.createElement("span", { className: "helper-icon" }, statusIcons[status])),
            react_1.default.createElement("span", null, helperText)))));
};
// Text Input Component
var TextInput = function (_a) {
    var id = _a.id, name = _a.name, value = _a.value, defaultValue = _a.defaultValue, onChange = _a.onChange, status = _a.status, funcss = _a.funcss, bg = _a.bg, _b = _a.fullWidth, fullWidth = _b === void 0 ? true : _b, flat = _a.flat, bordered = _a.bordered, borderless = _a.borderless, rounded = _a.rounded, leftRounded = _a.leftRounded, rightRounded = _a.rightRounded, startIcon = _a.startIcon, endIcon = _a.endIcon, prefix = _a.prefix, suffix = _a.suffix, stringPrefix = _a.stringPrefix, stringSuffix = _a.stringSuffix, iconicBg = _a.iconicBg, _c = _a.type, type = _c === void 0 ? 'text' : _c, label = _a.label, helperText = _a.helperText, _d = _a.variant, variant = _d === void 0 ? '' : _d, placeholder = _a.placeholder, rest = __rest(_a, ["id", "name", "value", "defaultValue", "onChange", "status", "funcss", "bg", "fullWidth", "flat", "bordered", "borderless", "rounded", "leftRounded", "rightRounded", "startIcon", "endIcon", "prefix", "suffix", "stringPrefix", "stringSuffix", "iconicBg", "type", "label", "helperText", "variant", "placeholder"]);
    var _e = (0, react_1.useState)(false), isFocused = _e[0], setIsFocused = _e[1];
    var _f = (0, react_1.useState)(value !== undefined ? String(value) : defaultValue || ''), inputValue = _f[0], setInputValue = _f[1];
    var _g = (0, react_1.useState)(null), prefixNode = _g[0], setPrefixNode = _g[1];
    var _h = (0, react_1.useState)(null), suffixNode = _h[0], setSuffixNode = _h[1];
    var inputRef = (0, react_1.useRef)(null);
    // Handle value changes - only update if value is truly defined (not empty string)
    (0, react_1.useEffect)(function () {
        if (value !== undefined && value !== '') {
            setInputValue(String(value));
        }
        else if (value === '') {
            // Allow empty string to clear the input
            setInputValue('');
        }
    }, [value]);
    var mergeWithLocal = (0, componentUtils_1.useComponentConfiguration)('Input', variant).mergeWithLocal;
    // Create local props object including stringPrefix/stringSuffix
    var localProps = {
        status: status,
        funcss: funcss,
        bg: bg,
        fullWidth: fullWidth,
        flat: flat,
        bordered: bordered,
        borderless: borderless,
        rounded: rounded,
        leftRounded: leftRounded,
        rightRounded: rightRounded,
        startIcon: startIcon,
        endIcon: endIcon,
        prefix: prefix,
        suffix: suffix,
        iconicBg: iconicBg,
        stringPrefix: stringPrefix, // Include in local props
        stringSuffix: stringSuffix,
    };
    // Merge with config - LOCAL PROPS OVERRIDE CONFIG
    var mergedProps = mergeWithLocal(localProps).props;
    // Extract final values - local props take precedence, but handle empty strings properly
    var final = {
        status: status !== undefined ? status : mergedProps.status,
        funcss: funcss !== undefined ? funcss : mergedProps.funcss,
        bg: bg !== undefined ? bg : mergedProps.bg,
        fullWidth: fullWidth !== undefined ? fullWidth : mergedProps.fullWidth,
        flat: flat !== undefined ? flat : mergedProps.flat,
        bordered: bordered !== undefined ? bordered : mergedProps.bordered,
        borderless: borderless !== undefined ? borderless : mergedProps.borderless,
        rounded: rounded !== undefined ? rounded : mergedProps.rounded,
        leftRounded: leftRounded !== undefined ? leftRounded : mergedProps.leftRounded,
        rightRounded: rightRounded !== undefined ? rightRounded : mergedProps.rightRounded,
        startIcon: startIcon !== undefined ? startIcon : mergedProps.startIcon,
        endIcon: endIcon !== undefined ? endIcon : mergedProps.endIcon,
        prefix: prefix !== undefined ? prefix : mergedProps.prefix,
        suffix: suffix !== undefined ? suffix : mergedProps.suffix,
        iconicBg: iconicBg !== undefined ? iconicBg : mergedProps.iconicBg,
        stringPrefix: stringPrefix !== undefined ? stringPrefix : mergedProps.stringPrefix, // Handle both local and config
        stringSuffix: stringSuffix !== undefined ? stringSuffix : mergedProps.stringSuffix, // Handle both local and config
    };
    // Handle stringPrefix - use final value (local or config)
    (0, react_1.useEffect)(function () {
        var effectiveStringPrefix = final.stringPrefix;
        if (effectiveStringPrefix) {
            (0, getDynamicIcon_1.getDynamicIcon)(effectiveStringPrefix).then(function (node) { return setPrefixNode(node); });
        }
        else {
            setPrefixNode(null);
        }
    }, [final.stringPrefix]);
    // Handle stringSuffix - use final value (local or config)
    (0, react_1.useEffect)(function () {
        var effectiveStringSuffix = final.stringSuffix;
        if (effectiveStringSuffix) {
            (0, getDynamicIcon_1.getDynamicIcon)(effectiveStringSuffix).then(function (node) { return setSuffixNode(node); });
        }
        else {
            setSuffixNode(null);
        }
    }, [final.stringSuffix]);
    var themeVariant = (0, theme_1.useVariant)().variant;
    var className = generateInputClasses({
        status: final.status,
        rounded: final.rounded,
        bg: final.bg,
        funcss: final.funcss,
        flat: final.flat,
        leftRounded: final.leftRounded,
        rightRounded: final.rightRounded,
        bordered: final.bordered,
        borderless: final.borderless,
    });
    var style = final.fullWidth ? { width: '100%' } : undefined;
    var handleChange = function (e) {
        var newValue = e.target.value;
        setInputValue(newValue);
        if (onChange)
            onChange(e);
    };
    var handleFocus = function (e) {
        setIsFocused(true);
        if (rest.onFocus)
            rest.onFocus(e);
    };
    var handleBlur = function (e) {
        setIsFocused(false);
        if (rest.onBlur)
            rest.onBlur(e);
    };
    // Determine effective icons: stringPrefix/stringSuffix take priority, then local, then config
    var effectivePrefix = prefixNode || final.prefix || final.startIcon;
    var effectiveSuffix = suffixNode || final.suffix || final.endIcon;
    // Show placeholder only when label is active (focused or has value)
    var showPlaceholder = placeholder && label && (isFocused || !!inputValue);
    var inputElement = (react_1.default.createElement("input", __assign({ ref: inputRef, id: id, name: name, className: className, onChange: handleChange, onFocus: handleFocus, onBlur: handleBlur, defaultValue: defaultValue, type: type, placeholder: showPlaceholder ? placeholder : (!label ? placeholder : ''), style: style, value: inputValue }, rest)));
    var wrappedInput = (react_1.default.createElement(IconicInputWrapper, { startIcon: effectivePrefix, endIcon: effectiveSuffix, iconicBg: final.iconicBg, funcss: final.funcss }, inputElement));
    return (react_1.default.createElement(InputContainer, { startIcon: effectivePrefix, label: label, status: final.status, helperText: helperText, isFocused: isFocused, hasValue: !!inputValue, fullWidth: final.fullWidth, id: id }, wrappedInput));
};
exports.TextInput = TextInput;
// Select Component
var SelectInput = function (_a) {
    var id = _a.id, name = _a.name, value = _a.value, defaultValue = _a.defaultValue, onChange = _a.onChange, status = _a.status, funcss = _a.funcss, bg = _a.bg, fullWidth = _a.fullWidth, flat = _a.flat, bordered = _a.bordered, borderless = _a.borderless, rounded = _a.rounded, leftRounded = _a.leftRounded, rightRounded = _a.rightRounded, startIcon = _a.startIcon, endIcon = _a.endIcon, prefix = _a.prefix, suffix = _a.suffix, stringPrefix = _a.stringPrefix, stringSuffix = _a.stringSuffix, iconicBg = _a.iconicBg, _b = _a.options, options = _b === void 0 ? [] : _b, label = _a.label, helperText = _a.helperText, _c = _a.variant, variant = _c === void 0 ? '' : _c, rest = __rest(_a, ["id", "name", "value", "defaultValue", "onChange", "status", "funcss", "bg", "fullWidth", "flat", "bordered", "borderless", "rounded", "leftRounded", "rightRounded", "startIcon", "endIcon", "prefix", "suffix", "stringPrefix", "stringSuffix", "iconicBg", "options", "label", "helperText", "variant"]);
    var _d = (0, react_1.useState)(false), isFocused = _d[0], setIsFocused = _d[1];
    var _e = (0, react_1.useState)(value !== undefined ? String(value) : defaultValue || ''), selectValue = _e[0], setSelectValue = _e[1];
    var _f = (0, react_1.useState)(null), prefixNode = _f[0], setPrefixNode = _f[1];
    var _g = (0, react_1.useState)(null), suffixNode = _g[0], setSuffixNode = _g[1];
    // Handle value changes - only update if value is truly defined (not empty string)
    (0, react_1.useEffect)(function () {
        if (value !== undefined && value !== '') {
            setSelectValue(String(value));
        }
        else if (value === '') {
            // Allow empty string to clear the select
            setSelectValue('');
        }
    }, [value]);
    var mergeWithLocal = (0, componentUtils_1.useComponentConfiguration)('Input', variant).mergeWithLocal;
    // Create local props object including stringPrefix/stringSuffix
    var localProps = {
        status: status,
        funcss: funcss,
        bg: bg,
        fullWidth: fullWidth,
        flat: flat,
        bordered: bordered,
        borderless: borderless,
        rounded: rounded,
        leftRounded: leftRounded,
        rightRounded: rightRounded,
        startIcon: startIcon,
        endIcon: endIcon,
        prefix: prefix,
        suffix: suffix,
        iconicBg: iconicBg,
        stringPrefix: stringPrefix, // Include in local props
        stringSuffix: stringSuffix,
    };
    // Merge with config - LOCAL PROPS OVERRIDE CONFIG
    var mergedProps = mergeWithLocal(localProps).props;
    // Extract final values - local props take precedence, but handle empty strings properly
    var final = {
        status: status !== undefined ? status : mergedProps.status,
        funcss: funcss !== undefined ? funcss : mergedProps.funcss,
        bg: bg !== undefined ? bg : mergedProps.bg,
        fullWidth: fullWidth !== undefined ? fullWidth : mergedProps.fullWidth,
        flat: flat !== undefined ? flat : mergedProps.flat,
        bordered: bordered !== undefined ? bordered : mergedProps.bordered,
        borderless: borderless !== undefined ? borderless : mergedProps.borderless,
        rounded: rounded !== undefined ? rounded : mergedProps.rounded,
        leftRounded: leftRounded !== undefined ? leftRounded : mergedProps.leftRounded,
        rightRounded: rightRounded !== undefined ? rightRounded : mergedProps.rightRounded,
        startIcon: startIcon !== undefined ? startIcon : mergedProps.startIcon,
        endIcon: endIcon !== undefined ? endIcon : mergedProps.endIcon,
        prefix: prefix !== undefined ? prefix : mergedProps.prefix,
        suffix: suffix !== undefined ? suffix : mergedProps.suffix,
        iconicBg: iconicBg !== undefined ? iconicBg : mergedProps.iconicBg,
        stringPrefix: stringPrefix !== undefined ? stringPrefix : mergedProps.stringPrefix, // Handle both local and config
        stringSuffix: stringSuffix !== undefined ? stringSuffix : mergedProps.stringSuffix, // Handle both local and config
    };
    // Handle stringPrefix - use final value (local or config)
    (0, react_1.useEffect)(function () {
        var effectiveStringPrefix = final.stringPrefix;
        if (effectiveStringPrefix) {
            (0, getDynamicIcon_1.getDynamicIcon)(effectiveStringPrefix).then(function (node) { return setPrefixNode(node); });
        }
        else {
            setPrefixNode(null);
        }
    }, [final.stringPrefix]);
    // Handle stringSuffix - use final value (local or config)
    (0, react_1.useEffect)(function () {
        var effectiveStringSuffix = final.stringSuffix;
        if (effectiveStringSuffix) {
            (0, getDynamicIcon_1.getDynamicIcon)(effectiveStringSuffix).then(function (node) { return setSuffixNode(node); });
        }
        else {
            setSuffixNode(null);
        }
    }, [final.stringSuffix]);
    var selectHasValue = !!selectValue;
    var themeVariant = (0, theme_1.useVariant)().variant;
    var className = generateInputClasses({
        status: final.status,
        rounded: final.rounded,
        bg: final.bg,
        funcss: final.funcss,
        flat: final.flat,
        leftRounded: final.leftRounded,
        rightRounded: final.rightRounded,
        bordered: final.bordered,
        borderless: final.borderless,
    });
    var style = final.fullWidth ? { width: '100%' } : undefined;
    var handleChange = function (e) {
        var newValue = e.target.value;
        setSelectValue(newValue);
        if (onChange)
            onChange(e);
    };
    var handleFocus = function (e) {
        setIsFocused(true);
        if (rest.onFocus)
            rest.onFocus(e);
    };
    var handleBlur = function (e) {
        setIsFocused(false);
        if (rest.onBlur)
            rest.onBlur(e);
    };
    var effectivePrefix = prefixNode || final.prefix || final.startIcon;
    var effectiveSuffix = suffixNode || final.suffix || final.endIcon;
    var selectElement = (react_1.default.createElement("select", __assign({ id: id, name: name, className: className, onChange: handleChange, onFocus: handleFocus, onBlur: handleBlur, defaultValue: defaultValue, value: selectValue, style: style }, rest), options.map(function (option) { return (react_1.default.createElement("option", { key: option.value, value: option.value }, option.text)); })));
    var wrappedSelect = (react_1.default.createElement(IconicInputWrapper, { startIcon: effectivePrefix, endIcon: effectiveSuffix, iconicBg: final.iconicBg, funcss: final.funcss }, selectElement));
    return (react_1.default.createElement(InputContainer, { startIcon: effectivePrefix, label: label, status: final.status, helperText: helperText, isFocused: isFocused, hasValue: selectHasValue, fullWidth: final.fullWidth, id: id }, wrappedSelect));
};
exports.SelectInput = SelectInput;
// Textarea Component
var TextareaInput = function (_a) {
    var id = _a.id, name = _a.name, value = _a.value, defaultValue = _a.defaultValue, onChange = _a.onChange, status = _a.status, funcss = _a.funcss, bg = _a.bg, fullWidth = _a.fullWidth, flat = _a.flat, bordered = _a.bordered, borderless = _a.borderless, rounded = _a.rounded, leftRounded = _a.leftRounded, rightRounded = _a.rightRounded, startIcon = _a.startIcon, endIcon = _a.endIcon, prefix = _a.prefix, suffix = _a.suffix, stringPrefix = _a.stringPrefix, stringSuffix = _a.stringSuffix, iconicBg = _a.iconicBg, label = _a.label, helperText = _a.helperText, _b = _a.rows, rows = _b === void 0 ? 2 : _b, _c = _a.variant, variant = _c === void 0 ? '' : _c, placeholder = _a.placeholder, rest = __rest(_a, ["id", "name", "value", "defaultValue", "onChange", "status", "funcss", "bg", "fullWidth", "flat", "bordered", "borderless", "rounded", "leftRounded", "rightRounded", "startIcon", "endIcon", "prefix", "suffix", "stringPrefix", "stringSuffix", "iconicBg", "label", "helperText", "rows", "variant", "placeholder"]);
    var _d = (0, react_1.useState)(false), isFocused = _d[0], setIsFocused = _d[1];
    var _e = (0, react_1.useState)(value !== undefined ? String(value) : defaultValue || ''), textValue = _e[0], setTextValue = _e[1];
    var _f = (0, react_1.useState)(null), prefixNode = _f[0], setPrefixNode = _f[1];
    var _g = (0, react_1.useState)(null), suffixNode = _g[0], setSuffixNode = _g[1];
    // Handle value changes - only update if value is truly defined (not empty string)
    (0, react_1.useEffect)(function () {
        if (value !== undefined && value !== '') {
            setTextValue(String(value));
        }
        else if (value === '') {
            // Allow empty string to clear the textarea
            setTextValue('');
        }
    }, [value]);
    var mergeWithLocal = (0, componentUtils_1.useComponentConfiguration)('Input', variant).mergeWithLocal;
    // Create local props object including stringPrefix/stringSuffix
    var localProps = {
        status: status,
        funcss: funcss,
        bg: bg,
        fullWidth: fullWidth,
        flat: flat,
        bordered: bordered,
        borderless: borderless,
        rounded: rounded,
        leftRounded: leftRounded,
        rightRounded: rightRounded,
        startIcon: startIcon,
        endIcon: endIcon,
        prefix: prefix,
        suffix: suffix,
        iconicBg: iconicBg,
        stringPrefix: stringPrefix, // Include in local props
        stringSuffix: stringSuffix,
    };
    // Merge with config - LOCAL PROPS OVERRIDE CONFIG
    var mergedProps = mergeWithLocal(localProps).props;
    // Extract final values - local props take precedence, but handle empty strings properly
    var final = {
        status: status !== undefined ? status : mergedProps.status,
        funcss: funcss !== undefined ? funcss : mergedProps.funcss,
        bg: bg !== undefined ? bg : mergedProps.bg,
        fullWidth: fullWidth !== undefined ? fullWidth : mergedProps.fullWidth,
        flat: flat !== undefined ? flat : mergedProps.flat,
        bordered: bordered !== undefined ? bordered : mergedProps.bordered,
        borderless: borderless !== undefined ? borderless : mergedProps.borderless,
        rounded: rounded !== undefined ? rounded : mergedProps.rounded,
        leftRounded: leftRounded !== undefined ? leftRounded : mergedProps.leftRounded,
        rightRounded: rightRounded !== undefined ? rightRounded : mergedProps.rightRounded,
        startIcon: startIcon !== undefined ? startIcon : mergedProps.startIcon,
        endIcon: endIcon !== undefined ? endIcon : mergedProps.endIcon,
        prefix: prefix !== undefined ? prefix : mergedProps.prefix,
        suffix: suffix !== undefined ? suffix : mergedProps.suffix,
        iconicBg: iconicBg !== undefined ? iconicBg : mergedProps.iconicBg,
        stringPrefix: stringPrefix !== undefined ? stringPrefix : mergedProps.stringPrefix, // Handle both local and config
        stringSuffix: stringSuffix !== undefined ? stringSuffix : mergedProps.stringSuffix, // Handle both local and config
    };
    // Handle stringPrefix - use final value (local or config)
    (0, react_1.useEffect)(function () {
        var effectiveStringPrefix = final.stringPrefix;
        if (effectiveStringPrefix) {
            (0, getDynamicIcon_1.getDynamicIcon)(effectiveStringPrefix).then(function (node) { return setPrefixNode(node); });
        }
        else {
            setPrefixNode(null);
        }
    }, [final.stringPrefix]);
    // Handle stringSuffix - use final value (local or config)
    (0, react_1.useEffect)(function () {
        var effectiveStringSuffix = final.stringSuffix;
        if (effectiveStringSuffix) {
            (0, getDynamicIcon_1.getDynamicIcon)(effectiveStringSuffix).then(function (node) { return setSuffixNode(node); });
        }
        else {
            setSuffixNode(null);
        }
    }, [final.stringSuffix]);
    var themeVariant = (0, theme_1.useVariant)().variant;
    var className = generateInputClasses({
        status: final.status,
        rounded: final.rounded,
        bg: final.bg,
        funcss: final.funcss,
        flat: final.flat,
        leftRounded: final.leftRounded,
        rightRounded: final.rightRounded,
        bordered: final.bordered,
        borderless: final.borderless,
    });
    var style = final.fullWidth ? { width: '100%' } : undefined;
    var handleChange = function (e) {
        var newValue = e.target.value;
        setTextValue(newValue);
        if (onChange)
            onChange(e);
    };
    var handleFocus = function (e) {
        setIsFocused(true);
        if (rest.onFocus)
            rest.onFocus(e);
    };
    var handleBlur = function (e) {
        setIsFocused(false);
        if (rest.onBlur)
            rest.onBlur(e);
    };
    var effectivePrefix = prefixNode || final.prefix || final.startIcon;
    var effectiveSuffix = suffixNode || final.suffix || final.endIcon;
    // Show placeholder only when label is active (focused or has value)
    var showPlaceholder = placeholder && label && (isFocused || !!textValue);
    var textareaElement = (react_1.default.createElement("textarea", __assign({ id: id, name: name, className: className, onChange: handleChange, onFocus: handleFocus, onBlur: handleBlur, defaultValue: defaultValue, placeholder: showPlaceholder ? placeholder : (!label ? placeholder : ''), style: style, value: textValue, rows: rows }, rest)));
    var wrappedTextarea = (react_1.default.createElement(IconicInputWrapper, { startIcon: effectivePrefix, endIcon: effectiveSuffix, iconicBg: final.iconicBg, funcss: final.funcss }, textareaElement));
    return (react_1.default.createElement(InputContainer, { startIcon: effectivePrefix, label: label, status: final.status, helperText: helperText, isFocused: isFocused, hasValue: !!textValue, fullWidth: final.fullWidth, id: id }, wrappedTextarea));
};
exports.TextareaInput = TextareaInput;
// File Input Component (unchanged as it doesn't have the same value issue)
var FileInput = function (_a) {
    var _b = _a.id, id = _b === void 0 ? 'fileInput' : _b, name = _a.name, onChange = _a.onChange, status = _a.status, funcss = _a.funcss, bg = _a.bg, fullWidth = _a.fullWidth, flat = _a.flat, rounded = _a.rounded, leftRounded = _a.leftRounded, rightRounded = _a.rightRounded, startIcon = _a.startIcon, endIcon = _a.endIcon, prefix = _a.prefix, suffix = _a.suffix, stringPrefix = _a.stringPrefix, stringSuffix = _a.stringSuffix, iconicBg = _a.iconicBg, _c = _a.label, label = _c === void 0 ? 'Upload File' : _c, helperText = _a.helperText, icon = _a.icon, extra = _a.extra, button = _a.button, btn = _a.btn, value = _a.value, _d = _a.variant, variant = _d === void 0 ? '' : _d, rest = __rest(_a, ["id", "name", "onChange", "status", "funcss", "bg", "fullWidth", "flat", "rounded", "leftRounded", "rightRounded", "startIcon", "endIcon", "prefix", "suffix", "stringPrefix", "stringSuffix", "iconicBg", "label", "helperText", "icon", "extra", "button", "btn", "value", "variant"]);
    var _e = (0, react_1.useState)(''), fileName = _e[0], setFileName = _e[1];
    var _f = (0, react_1.useState)(null), prefixNode = _f[0], setPrefixNode = _f[1];
    var _g = (0, react_1.useState)(null), suffixNode = _g[0], setSuffixNode = _g[1];
    var mergeWithLocal = (0, componentUtils_1.useComponentConfiguration)('Input', variant).mergeWithLocal;
    // Create local props object including stringPrefix/stringSuffix
    var localProps = {
        status: status,
        funcss: funcss,
        bg: bg,
        fullWidth: fullWidth,
        flat: flat,
        rounded: rounded,
        leftRounded: leftRounded,
        rightRounded: rightRounded,
        startIcon: startIcon,
        endIcon: endIcon,
        prefix: prefix,
        suffix: suffix,
        iconicBg: iconicBg,
        stringPrefix: stringPrefix, // Include in local props
        stringSuffix: stringSuffix, // Include in local props
        bordered: rest.bordered,
        borderless: rest.borderless,
    };
    // Merge with config - LOCAL PROPS OVERRIDE CONFIG
    var mergedProps = mergeWithLocal(localProps).props;
    // Extract final values - local props take precedence
    var final = {
        status: status !== undefined ? status : mergedProps.status,
        funcss: funcss !== undefined ? funcss : mergedProps.funcss,
        bg: bg !== undefined ? bg : mergedProps.bg,
        fullWidth: fullWidth !== undefined ? fullWidth : mergedProps.fullWidth,
        flat: flat !== undefined ? flat : mergedProps.flat,
        rounded: rounded !== undefined ? rounded : mergedProps.rounded,
        leftRounded: leftRounded !== undefined ? leftRounded : mergedProps.leftRounded,
        rightRounded: rightRounded !== undefined ? rightRounded : mergedProps.rightRounded,
        startIcon: startIcon !== undefined ? startIcon : mergedProps.startIcon,
        endIcon: endIcon !== undefined ? endIcon : mergedProps.endIcon,
        prefix: prefix !== undefined ? prefix : mergedProps.prefix,
        suffix: suffix !== undefined ? suffix : mergedProps.suffix,
        iconicBg: iconicBg !== undefined ? iconicBg : mergedProps.iconicBg,
        stringPrefix: stringPrefix !== undefined ? stringPrefix : mergedProps.stringPrefix, // Handle both local and config
        stringSuffix: stringSuffix !== undefined ? stringSuffix : mergedProps.stringSuffix, // Handle both local and config
    };
    // Handle stringPrefix - use final value (local or config)
    (0, react_1.useEffect)(function () {
        var effectiveStringPrefix = final.stringPrefix;
        if (effectiveStringPrefix) {
            (0, getDynamicIcon_1.getDynamicIcon)(effectiveStringPrefix).then(function (node) { return setPrefixNode(node); });
        }
        else {
            setPrefixNode(null);
        }
    }, [final.stringPrefix]);
    // Handle stringSuffix - use final value (local or config)
    (0, react_1.useEffect)(function () {
        var effectiveStringSuffix = final.stringSuffix;
        if (effectiveStringSuffix) {
            (0, getDynamicIcon_1.getDynamicIcon)(effectiveStringSuffix).then(function (node) { return setSuffixNode(node); });
        }
        else {
            setSuffixNode(null);
        }
    }, [final.stringSuffix]);
    var handleChange = function (e) {
        var _a;
        var file = (_a = e.target.files) === null || _a === void 0 ? void 0 : _a[0];
        if (file) {
            setFileName(file.name);
        }
        if (onChange)
            onChange(e);
    };
    var effectivePrefix = prefixNode || final.prefix || final.startIcon;
    var effectiveSuffix = suffixNode || final.suffix || final.endIcon;
    if (btn) {
        var className = generateInputClasses({
            status: final.status,
            rounded: final.rounded,
            bg: final.bg,
            funcss: final.funcss,
            flat: final.flat,
            leftRounded: final.leftRounded,
            rightRounded: final.rightRounded,
            bordered: true,
            borderless: false,
            additionalClasses: 'filedInput'
        });
        var style = final.fullWidth ? { width: '100%' } : undefined;
        var fileInputElement = (react_1.default.createElement("div", { className: "fileInput" },
            button || (react_1.default.createElement(Button_1.default, { funcss: final.funcss, startIcon: icon || react_1.default.createElement(pi_1.PiCloudArrowUp, null), bg: "primary", fullWidth: true, raised: true }, fileName || label)),
            react_1.default.createElement("input", __assign({ id: id, name: name, className: className, onChange: handleChange, type: "file", style: style, value: value }, rest))));
        var wrappedFileInput = (react_1.default.createElement(IconicInputWrapper, { startIcon: effectivePrefix, endIcon: effectiveSuffix, iconicBg: final.iconicBg, funcss: final.funcss }, fileInputElement));
        return (react_1.default.createElement(InputContainer, { startIcon: effectivePrefix, label: undefined, status: final.status, helperText: helperText, isFocused: false, hasValue: !!fileName, fullWidth: final.fullWidth, id: id }, wrappedFileInput));
    }
    var uploadElement = (react_1.default.createElement("div", { className: "_upload_container" },
        react_1.default.createElement("label", { htmlFor: id, className: "_upload_label" },
            react_1.default.createElement("div", { className: "_upload_icon" }, icon || react_1.default.createElement(pi_1.PiCloudArrowUp, null)),
            react_1.default.createElement("div", { className: "_upload_text", style: {
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: 'inline-block',
                    width: '100%',
                } }, fileName || label),
            extra && react_1.default.createElement("div", { className: "text-small opacity-3" }, extra)),
        react_1.default.createElement("input", __assign({ onChange: handleChange, type: "file", id: id, className: "_upload_input" }, rest))));
    return (react_1.default.createElement(InputContainer, { startIcon: effectivePrefix, label: undefined, status: final.status, helperText: helperText, isFocused: false, hasValue: !!fileName, fullWidth: final.fullWidth, id: id }, uploadElement));
};
exports.FileInput = FileInput;
var Input = function (_a) {
    var select = _a.select, multiline = _a.multiline, file = _a.file, noBorder = _a.noBorder, startIcon = _a.startIcon, endIcon = _a.endIcon, prefix = _a.prefix, suffix = _a.suffix, stringPrefix = _a.stringPrefix, stringSuffix = _a.stringSuffix, iconicBg = _a.iconicBg, _b = _a.variant, variant = _b === void 0 ? '' : _b, props = __rest(_a, ["select", "multiline", "file", "noBorder", "startIcon", "endIcon", "prefix", "suffix", "stringPrefix", "stringSuffix", "iconicBg", "variant"]);
    var mergeWithLocal = (0, componentUtils_1.useComponentConfiguration)('Input', variant).mergeWithLocal;
    // Create local props object including stringPrefix/stringSuffix
    var localProps = __assign(__assign({}, props), { startIcon: startIcon, endIcon: endIcon, prefix: prefix, suffix: suffix, iconicBg: iconicBg, stringPrefix: stringPrefix, // Include in local props
        stringSuffix: stringSuffix });
    var mergedProps = mergeWithLocal(localProps).props;
    var inputProps = __assign(__assign(__assign({}, props), mergedProps), { variant: variant, borderless: noBorder !== undefined ? noBorder : (props.borderless !== undefined ? props.borderless : mergedProps.borderless) });
    if (select) {
        return react_1.default.createElement(exports.SelectInput, __assign({}, inputProps));
    }
    if (multiline) {
        return react_1.default.createElement(exports.TextareaInput, __assign({}, inputProps));
    }
    if (file) {
        return react_1.default.createElement(exports.FileInput, __assign({}, inputProps));
    }
    return react_1.default.createElement(exports.TextInput, __assign({}, inputProps));
};
exports.default = Input;
