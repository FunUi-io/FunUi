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
exports.TextareaInput = exports.SelectInput = exports.TextInput = void 0;
var react_1 = __importStar(require("react"));
var pi_1 = require("react-icons/pi");
var theme_1 = require("../theme/theme");
var componentUtils_1 = require("../../utils/componentUtils");
var getDynamicIcon_1 = require("../../utils/getDynamicIcon");
var FileUpload_1 = require("./FileUpload");
// Status icons mapping
var statusIcons = {
    success: react_1.default.createElement(pi_1.PiCheckCircle, null),
    warning: react_1.default.createElement(pi_1.PiWarning, null),
    danger: react_1.default.createElement(pi_1.PiX, null),
    info: react_1.default.createElement(pi_1.PiInfo, null)
};
// Utility function to generate CSS classes
var generateInputClasses = function (_a) {
    var status = _a.status, rounded = _a.rounded, bg = _a.bg, funcss = _a.funcss, flat = _a.flat, leftRounded = _a.leftRounded, rightRounded = _a.rightRounded, bordered = _a.bordered, borderless = _a.borderless, _b = _a.additionalClasses, additionalClasses = _b === void 0 ? '' : _b, _c = _a.hasNoPrefix, hasNoPrefix = _c === void 0 ? false : _c, _d = _a.hasNoLabel, hasNoLabel = _d === void 0 ? false : _d;
    var statusClass = status ? "".concat(status, "-input") : '';
    var roundedClass = rounded ? 'rounded' : '';
    var bgClass = bg || '';
    var flatClass = flat ? 'flat' : '';
    var cornerClass = leftRounded ? 'leftRounded' : rightRounded ? 'rightRounded' : '';
    var borderClass = bordered ? 'borderedInput' : borderless ? 'borderless' : (!bordered && !borderless ? 'borderedInput' : '');
    var noPrefixClass = hasNoPrefix ? 'no_prefix' : '';
    var noLabelClass = hasNoLabel ? 'no_label' : '';
    return "\n    ".concat(statusClass, "\n    ").concat(roundedClass, "\n    ").concat(bgClass, "\n    ").concat(funcss || '', "\n    ").concat(flatClass, "\n    ").concat(cornerClass, "\n    ").concat(borderClass, "\n    ").concat(additionalClasses, "\n    ").concat(noPrefixClass, "\n    ").concat(noLabelClass, "\n    input\n  ").trim().replace(/\s+/g, ' ');
};
// Iconic Input Wrapper Component - UPDATED to match Button's pattern
var IconicInputWrapper = function (_a) {
    var startIcon = _a.startIcon, endIcon = _a.endIcon, prefix = _a.prefix, suffix = _a.suffix, iconicBg = _a.iconicBg, funcss = _a.funcss, stringPrefix = _a.stringPrefix, stringSuffix = _a.stringSuffix, children = _a.children;
    // Match Button's pattern exactly - use proper priority
    var effectiveStartIcon = startIcon !== undefined ? startIcon : prefix;
    var effectiveEndIcon = endIcon !== undefined ? endIcon : suffix;
    // Determine which icons to show - MATCH BUTTON'S PATTERN EXACTLY
    var showPrefix = effectiveStartIcon !== undefined && effectiveStartIcon !== null;
    var showSuffix = effectiveEndIcon !== undefined && effectiveEndIcon !== null;
    if (!showPrefix && !showSuffix) {
        return react_1.default.createElement(react_1.default.Fragment, null, children);
    }
    // Helper function to check if element is a React element
    function isReactElement(node) {
        return react_1.default.isValidElement(node);
    }
    return (react_1.default.createElement("div", { className: "icon-container ".concat(showPrefix ? 'has-left-icon' : '', " ").concat(funcss || '') },
        showPrefix && (react_1.default.createElement("div", { className: "leftIcon", style: {
                backgroundColor: iconicBg || '',
                border: iconicBg ? "0.1rem ".concat(iconicBg, " solid") : '',
            } }, isReactElement(startIcon) ? startIcon
            : isReactElement(prefix) ? prefix
                : isReactElement(effectiveStartIcon) ? effectiveStartIcon
                    : stringPrefix ? effectiveStartIcon : '')),
        children,
        showSuffix && (react_1.default.createElement("div", { className: "rightIcon", style: { backgroundColor: iconicBg || '' } }, isReactElement(endIcon) ? endIcon
            : isReactElement(suffix) ? suffix
                : isReactElement(effectiveEndIcon) ? effectiveEndIcon
                    : stringSuffix ? effectiveEndIcon : ""))));
};
// Input Container with Floating Label
var InputContainer = function (_a) {
    var label = _a.label, status = _a.status, helperText = _a.helperText, children = _a.children, isFocused = _a.isFocused, hasValue = _a.hasValue, fullWidth = _a.fullWidth, id = _a.id, startIcon = _a.startIcon, prefix = _a.prefix, _b = _a.alwaysActiveLabel, alwaysActiveLabel = _b === void 0 ? false : _b;
    var showFloatingLabel = label && (alwaysActiveLabel || isFocused || hasValue);
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
    var _j = (0, react_1.useState)(false), hasValidStringPrefix = _j[0], setHasValidStringPrefix = _j[1];
    var _k = (0, react_1.useState)(false), hasValidStringSuffix = _k[0], setHasValidStringSuffix = _k[1];
    var inputRef = (0, react_1.useRef)(null);
    var isDateTimeInput = ['date', 'time', 'month', 'week', 'datetime-local'].includes(type || '');
    (0, react_1.useEffect)(function () {
        if (value !== undefined && value !== '') {
            setInputValue(String(value));
        }
        else if (value === '') {
            setInputValue('');
        }
    }, [value]);
    var mergeWithLocal = (0, componentUtils_1.useComponentConfiguration)('Input', variant).mergeWithLocal;
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
        stringPrefix: stringPrefix,
        stringSuffix: stringSuffix,
    };
    var mergedProps = mergeWithLocal(localProps).props;
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
        stringPrefix: stringPrefix !== undefined ? stringPrefix : mergedProps.stringPrefix,
        stringSuffix: stringSuffix !== undefined ? stringSuffix : mergedProps.stringSuffix,
    };
    // Handle stringPrefix - MATCH BUTTON'S PATTERN EXACTLY
    (0, react_1.useEffect)(function () {
        var effectiveStringPrefix = final.stringPrefix;
        if (!effectiveStringPrefix || effectiveStringPrefix.trim() === '') {
            setPrefixNode(null);
            setHasValidStringPrefix(false);
            return;
        }
        (0, getDynamicIcon_1.getDynamicIcon)(effectiveStringPrefix).then(function (node) {
            if (node) {
                setPrefixNode(node);
                setHasValidStringPrefix(true);
            }
            else {
                setPrefixNode(null);
                setHasValidStringPrefix(false);
            }
        });
    }, [final.stringPrefix]);
    // Handle stringSuffix - MATCH BUTTON'S PATTERN EXACTLY
    (0, react_1.useEffect)(function () {
        var effectiveStringSuffix = final.stringSuffix;
        if (!effectiveStringSuffix || effectiveStringSuffix.trim() === '') {
            setSuffixNode(null);
            setHasValidStringSuffix(false);
            return;
        }
        (0, getDynamicIcon_1.getDynamicIcon)(effectiveStringSuffix).then(function (node) {
            if (node) {
                setSuffixNode(node);
                setHasValidStringSuffix(true);
            }
            else {
                setSuffixNode(null);
                setHasValidStringSuffix(false);
            }
        });
    }, [final.stringSuffix]);
    var themeVariant = (0, theme_1.useVariant)().variant;
    // Determine which prefix to show with proper priority - MATCH BUTTON'S PATTERN
    var showPrefix = react_1.default.useMemo(function () {
        // Priority order: startIcon (local) > prefix (local) > stringPrefix (dynamic)
        if (final.startIcon)
            return true;
        if (final.prefix)
            return true;
        if (hasValidStringPrefix && prefixNode)
            return true;
        return false;
    }, [final.startIcon, final.prefix, hasValidStringPrefix, prefixNode]);
    // Determine which suffix to show with proper priority - MATCH BUTTON'S PATTERN
    var showSuffix = react_1.default.useMemo(function () {
        // Priority order: endIcon (local) > suffix (local) > stringSuffix (dynamic)
        if (final.endIcon)
            return true;
        if (final.suffix)
            return true;
        if (hasValidStringSuffix && suffixNode)
            return true;
        return false;
    }, [final.endIcon, final.suffix, hasValidStringSuffix, suffixNode]);
    // Get effective icons following Button's priority pattern
    var effectivePrefix = react_1.default.useMemo(function () {
        // Priority: startIcon > prefix > stringPrefix
        if (final.startIcon)
            return final.startIcon;
        if (final.prefix)
            return final.prefix;
        if (hasValidStringPrefix)
            return prefixNode;
        return null;
    }, [final.startIcon, final.prefix, hasValidStringPrefix, prefixNode]);
    var effectiveSuffix = react_1.default.useMemo(function () {
        // Priority: endIcon > suffix > stringSuffix
        if (final.endIcon)
            return final.endIcon;
        if (final.suffix)
            return final.suffix;
        if (hasValidStringSuffix)
            return suffixNode;
        return null;
    }, [final.endIcon, final.suffix, hasValidStringSuffix, suffixNode]);
    var hasNoPrefix = !effectivePrefix;
    var hasNoLabel = !label;
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
        hasNoPrefix: hasNoPrefix,
        hasNoLabel: hasNoLabel,
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
    var showPlaceholder = placeholder && label && (isFocused || !!inputValue);
    var inputElement = (react_1.default.createElement("input", __assign({ ref: inputRef, id: id, name: name, className: className, onChange: handleChange, onFocus: handleFocus, onBlur: handleBlur, defaultValue: defaultValue, type: type, placeholder: showPlaceholder ? placeholder : (!label ? placeholder : ''), style: style, value: inputValue }, rest)));
    // Only use iconic wrapper when we have icons, matching Button's pattern
    var wrappedInput = showPrefix || showSuffix ? (react_1.default.createElement(IconicInputWrapper, { startIcon: effectivePrefix, endIcon: effectiveSuffix, iconicBg: final.iconicBg, funcss: final.funcss, stringPrefix: stringPrefix, stringSuffix: stringSuffix }, inputElement)) : (inputElement);
    return (react_1.default.createElement(InputContainer, { startIcon: effectivePrefix, label: label, status: final.status, helperText: helperText, isFocused: isFocused, hasValue: !!inputValue, fullWidth: final.fullWidth, id: id, alwaysActiveLabel: isDateTimeInput }, wrappedInput));
};
exports.TextInput = TextInput;
// Select Component - UPDATED to match pattern
var SelectInput = function (_a) {
    var id = _a.id, name = _a.name, value = _a.value, defaultValue = _a.defaultValue, onChange = _a.onChange, status = _a.status, funcss = _a.funcss, bg = _a.bg, fullWidth = _a.fullWidth, flat = _a.flat, bordered = _a.bordered, borderless = _a.borderless, rounded = _a.rounded, leftRounded = _a.leftRounded, rightRounded = _a.rightRounded, startIcon = _a.startIcon, endIcon = _a.endIcon, prefix = _a.prefix, suffix = _a.suffix, stringPrefix = _a.stringPrefix, stringSuffix = _a.stringSuffix, iconicBg = _a.iconicBg, _b = _a.options, options = _b === void 0 ? [] : _b, label = _a.label, helperText = _a.helperText, _c = _a.variant, variant = _c === void 0 ? '' : _c, rest = __rest(_a, ["id", "name", "value", "defaultValue", "onChange", "status", "funcss", "bg", "fullWidth", "flat", "bordered", "borderless", "rounded", "leftRounded", "rightRounded", "startIcon", "endIcon", "prefix", "suffix", "stringPrefix", "stringSuffix", "iconicBg", "options", "label", "helperText", "variant"]);
    var _d = (0, react_1.useState)(false), isFocused = _d[0], setIsFocused = _d[1];
    var _e = (0, react_1.useState)(value !== undefined ? String(value) : defaultValue || ''), selectValue = _e[0], setSelectValue = _e[1];
    var _f = (0, react_1.useState)(null), prefixNode = _f[0], setPrefixNode = _f[1];
    var _g = (0, react_1.useState)(null), suffixNode = _g[0], setSuffixNode = _g[1];
    var _h = (0, react_1.useState)(false), hasValidStringPrefix = _h[0], setHasValidStringPrefix = _h[1];
    var _j = (0, react_1.useState)(false), hasValidStringSuffix = _j[0], setHasValidStringSuffix = _j[1];
    (0, react_1.useEffect)(function () {
        if (value !== undefined && value !== '') {
            setSelectValue(String(value));
        }
        else if (value === '') {
            setSelectValue('');
        }
    }, [value]);
    var mergeWithLocal = (0, componentUtils_1.useComponentConfiguration)('Input', variant).mergeWithLocal;
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
        stringPrefix: stringPrefix,
        stringSuffix: stringSuffix,
    };
    var mergedProps = mergeWithLocal(localProps).props;
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
        stringPrefix: stringPrefix !== undefined ? stringPrefix : mergedProps.stringPrefix,
        stringSuffix: stringSuffix !== undefined ? stringSuffix : mergedProps.stringSuffix,
    };
    // Handle stringPrefix - MATCH BUTTON'S PATTERN EXACTLY
    (0, react_1.useEffect)(function () {
        var effectiveStringPrefix = final.stringPrefix;
        if (!effectiveStringPrefix || effectiveStringPrefix.trim() === '') {
            setPrefixNode(null);
            setHasValidStringPrefix(false);
            return;
        }
        (0, getDynamicIcon_1.getDynamicIcon)(effectiveStringPrefix).then(function (node) {
            if (node) {
                setPrefixNode(node);
                setHasValidStringPrefix(true);
            }
            else {
                setPrefixNode(null);
                setHasValidStringPrefix(false);
            }
        });
    }, [final.stringPrefix]);
    // Handle stringSuffix - MATCH BUTTON'S PATTERN EXACTLY
    (0, react_1.useEffect)(function () {
        var effectiveStringSuffix = final.stringSuffix;
        if (!effectiveStringSuffix || effectiveStringSuffix.trim() === '') {
            setSuffixNode(null);
            setHasValidStringSuffix(false);
            return;
        }
        (0, getDynamicIcon_1.getDynamicIcon)(effectiveStringSuffix).then(function (node) {
            if (node) {
                setSuffixNode(node);
                setHasValidStringSuffix(true);
            }
            else {
                setSuffixNode(null);
                setHasValidStringSuffix(false);
            }
        });
    }, [final.stringSuffix]);
    var selectHasValue = !!selectValue;
    var themeVariant = (0, theme_1.useVariant)().variant;
    // Determine which prefix to show with proper priority - MATCH BUTTON'S PATTERN
    var showPrefix = react_1.default.useMemo(function () {
        // Priority order: startIcon (local) > prefix (local) > stringPrefix (dynamic)
        if (final.startIcon)
            return true;
        if (final.prefix)
            return true;
        if (hasValidStringPrefix && prefixNode)
            return true;
        return false;
    }, [final.startIcon, final.prefix, hasValidStringPrefix, prefixNode]);
    // Determine which suffix to show with proper priority - MATCH BUTTON'S PATTERN
    var showSuffix = react_1.default.useMemo(function () {
        // Priority order: endIcon (local) > suffix (local) > stringSuffix (dynamic)
        if (final.endIcon)
            return true;
        if (final.suffix)
            return true;
        if (hasValidStringSuffix && suffixNode)
            return true;
        return false;
    }, [final.endIcon, final.suffix, hasValidStringSuffix, suffixNode]);
    // Get effective icons following Button's priority pattern
    var effectivePrefix = react_1.default.useMemo(function () {
        // Priority: startIcon > prefix > stringPrefix
        if (final.startIcon)
            return final.startIcon;
        if (final.prefix)
            return final.prefix;
        if (hasValidStringPrefix)
            return prefixNode;
        return null;
    }, [final.startIcon, final.prefix, hasValidStringPrefix, prefixNode]);
    var effectiveSuffix = react_1.default.useMemo(function () {
        // Priority: endIcon > suffix > stringSuffix
        if (final.endIcon)
            return final.endIcon;
        if (final.suffix)
            return final.suffix;
        if (hasValidStringSuffix)
            return suffixNode;
        return null;
    }, [final.endIcon, final.suffix, hasValidStringSuffix, suffixNode]);
    var hasNoPrefix = !effectivePrefix;
    var hasNoLabel = !label;
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
        hasNoPrefix: hasNoPrefix,
        hasNoLabel: hasNoLabel,
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
    var selectElement = (react_1.default.createElement("select", __assign({ id: id, name: name, className: className, onChange: handleChange, onFocus: handleFocus, onBlur: handleBlur, defaultValue: defaultValue, value: selectValue, style: style }, rest), options.map(function (option) { return (react_1.default.createElement("option", { key: option.value, value: option.value }, option.text)); })));
    // Only use iconic wrapper when we have icons, matching Button's pattern
    var wrappedSelect = showPrefix || showSuffix ? (react_1.default.createElement(IconicInputWrapper, { startIcon: effectivePrefix, endIcon: effectiveSuffix, iconicBg: final.iconicBg, funcss: final.funcss, stringPrefix: stringPrefix, stringSuffix: stringSuffix }, selectElement)) : (selectElement);
    return (react_1.default.createElement(InputContainer, { startIcon: effectivePrefix, label: label, status: final.status, helperText: helperText, isFocused: isFocused, hasValue: selectHasValue, fullWidth: final.fullWidth, id: id, alwaysActiveLabel: true }, wrappedSelect));
};
exports.SelectInput = SelectInput;
// Textarea Component - UPDATED to match pattern
var TextareaInput = function (_a) {
    var id = _a.id, name = _a.name, value = _a.value, defaultValue = _a.defaultValue, onChange = _a.onChange, status = _a.status, funcss = _a.funcss, bg = _a.bg, fullWidth = _a.fullWidth, flat = _a.flat, bordered = _a.bordered, borderless = _a.borderless, rounded = _a.rounded, leftRounded = _a.leftRounded, rightRounded = _a.rightRounded, startIcon = _a.startIcon, endIcon = _a.endIcon, prefix = _a.prefix, suffix = _a.suffix, stringPrefix = _a.stringPrefix, stringSuffix = _a.stringSuffix, iconicBg = _a.iconicBg, label = _a.label, helperText = _a.helperText, _b = _a.rows, rows = _b === void 0 ? 2 : _b, _c = _a.variant, variant = _c === void 0 ? '' : _c, placeholder = _a.placeholder, rest = __rest(_a, ["id", "name", "value", "defaultValue", "onChange", "status", "funcss", "bg", "fullWidth", "flat", "bordered", "borderless", "rounded", "leftRounded", "rightRounded", "startIcon", "endIcon", "prefix", "suffix", "stringPrefix", "stringSuffix", "iconicBg", "label", "helperText", "rows", "variant", "placeholder"]);
    var _d = (0, react_1.useState)(false), isFocused = _d[0], setIsFocused = _d[1];
    var _e = (0, react_1.useState)(value !== undefined ? String(value) : defaultValue || ''), textValue = _e[0], setTextValue = _e[1];
    var _f = (0, react_1.useState)(null), prefixNode = _f[0], setPrefixNode = _f[1];
    var _g = (0, react_1.useState)(null), suffixNode = _g[0], setSuffixNode = _g[1];
    var _h = (0, react_1.useState)(false), hasValidStringPrefix = _h[0], setHasValidStringPrefix = _h[1];
    var _j = (0, react_1.useState)(false), hasValidStringSuffix = _j[0], setHasValidStringSuffix = _j[1];
    (0, react_1.useEffect)(function () {
        if (value !== undefined && value !== '') {
            setTextValue(String(value));
        }
        else if (value === '') {
            setTextValue('');
        }
    }, [value]);
    var mergeWithLocal = (0, componentUtils_1.useComponentConfiguration)('Input', variant).mergeWithLocal;
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
        stringPrefix: stringPrefix,
        stringSuffix: stringSuffix,
    };
    var mergedProps = mergeWithLocal(localProps).props;
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
        stringPrefix: stringPrefix !== undefined ? stringPrefix : mergedProps.stringPrefix,
        stringSuffix: stringSuffix !== undefined ? stringSuffix : mergedProps.stringSuffix,
    };
    // Handle stringPrefix - MATCH BUTTON'S PATTERN EXACTLY
    (0, react_1.useEffect)(function () {
        var effectiveStringPrefix = final.stringPrefix;
        if (!effectiveStringPrefix || effectiveStringPrefix.trim() === '') {
            setPrefixNode(null);
            setHasValidStringPrefix(false);
            return;
        }
        (0, getDynamicIcon_1.getDynamicIcon)(effectiveStringPrefix).then(function (node) {
            if (node) {
                setPrefixNode(node);
                setHasValidStringPrefix(true);
            }
            else {
                setPrefixNode(null);
                setHasValidStringPrefix(false);
            }
        });
    }, [final.stringPrefix]);
    // Handle stringSuffix - MATCH BUTTON'S PATTERN EXACTLY
    (0, react_1.useEffect)(function () {
        var effectiveStringSuffix = final.stringSuffix;
        if (!effectiveStringSuffix || effectiveStringSuffix.trim() === '') {
            setSuffixNode(null);
            setHasValidStringSuffix(false);
            return;
        }
        (0, getDynamicIcon_1.getDynamicIcon)(effectiveStringSuffix).then(function (node) {
            if (node) {
                setSuffixNode(node);
                setHasValidStringSuffix(true);
            }
            else {
                setSuffixNode(null);
                setHasValidStringSuffix(false);
            }
        });
    }, [final.stringSuffix]);
    var themeVariant = (0, theme_1.useVariant)().variant;
    // Determine which prefix to show with proper priority - MATCH BUTTON'S PATTERN
    var showPrefix = react_1.default.useMemo(function () {
        // Priority order: startIcon (local) > prefix (local) > stringPrefix (dynamic)
        if (final.startIcon)
            return true;
        if (final.prefix)
            return true;
        if (hasValidStringPrefix && prefixNode)
            return true;
        return false;
    }, [final.startIcon, final.prefix, hasValidStringPrefix, prefixNode]);
    // Determine which suffix to show with proper priority - MATCH BUTTON'S PATTERN
    var showSuffix = react_1.default.useMemo(function () {
        // Priority order: endIcon (local) > suffix (local) > stringSuffix (dynamic)
        if (final.endIcon)
            return true;
        if (final.suffix)
            return true;
        if (hasValidStringSuffix && suffixNode)
            return true;
        return false;
    }, [final.endIcon, final.suffix, hasValidStringSuffix, suffixNode]);
    // Get effective icons following Button's priority pattern
    var effectivePrefix = react_1.default.useMemo(function () {
        // Priority: startIcon > prefix > stringPrefix
        if (final.startIcon)
            return final.startIcon;
        if (final.prefix)
            return final.prefix;
        if (hasValidStringPrefix)
            return prefixNode;
        return null;
    }, [final.startIcon, final.prefix, hasValidStringPrefix, prefixNode]);
    var effectiveSuffix = react_1.default.useMemo(function () {
        // Priority: endIcon > suffix > stringSuffix
        if (final.endIcon)
            return final.endIcon;
        if (final.suffix)
            return final.suffix;
        if (hasValidStringSuffix)
            return suffixNode;
        return null;
    }, [final.endIcon, final.suffix, hasValidStringSuffix, suffixNode]);
    var hasNoPrefix = !effectivePrefix;
    var hasNoLabel = !label;
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
        hasNoPrefix: hasNoPrefix,
        hasNoLabel: hasNoLabel,
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
    var showPlaceholder = placeholder && label && (isFocused || !!textValue);
    var textareaElement = (react_1.default.createElement("textarea", __assign({ id: id, name: name, className: className, onChange: handleChange, onFocus: handleFocus, onBlur: handleBlur, defaultValue: defaultValue, placeholder: showPlaceholder ? placeholder : (!label ? placeholder : ''), style: style, value: textValue, rows: rows }, rest)));
    // Only use iconic wrapper when we have icons, matching Button's pattern
    var wrappedTextarea = showPrefix || showSuffix ? (react_1.default.createElement(IconicInputWrapper, { startIcon: effectivePrefix, endIcon: effectiveSuffix, iconicBg: final.iconicBg, funcss: final.funcss, stringPrefix: stringPrefix, stringSuffix: stringSuffix }, textareaElement)) : (textareaElement);
    return (react_1.default.createElement(InputContainer, { startIcon: effectivePrefix, label: label, status: final.status, helperText: helperText, isFocused: isFocused, hasValue: !!textValue, fullWidth: final.fullWidth, id: id }, wrappedTextarea));
};
exports.TextareaInput = TextareaInput;
var Input = function (_a) {
    var select = _a.select, multiline = _a.multiline, file = _a.file, noBorder = _a.noBorder, startIcon = _a.startIcon, endIcon = _a.endIcon, prefix = _a.prefix, suffix = _a.suffix, stringPrefix = _a.stringPrefix, stringSuffix = _a.stringSuffix, iconicBg = _a.iconicBg, type = _a.type, _b = _a.variant, variant = _b === void 0 ? '' : _b, props = __rest(_a, ["select", "multiline", "file", "noBorder", "startIcon", "endIcon", "prefix", "suffix", "stringPrefix", "stringSuffix", "iconicBg", "type", "variant"]);
    var mergeWithLocal = (0, componentUtils_1.useComponentConfiguration)('Input', variant).mergeWithLocal;
    var localProps = __assign(__assign({}, props), { startIcon: startIcon, endIcon: endIcon, prefix: prefix, suffix: suffix, iconicBg: iconicBg, stringPrefix: stringPrefix, stringSuffix: stringSuffix, type: type });
    var mergedProps = mergeWithLocal(localProps).props;
    var inputProps = __assign(__assign(__assign({}, props), mergedProps), { variant: variant, borderless: noBorder !== undefined ? noBorder : (props.borderless !== undefined ? props.borderless : mergedProps.borderless), type: type });
    if (file || type === 'file') {
        return react_1.default.createElement(FileUpload_1.FileUpload, __assign({}, inputProps));
    }
    if (select) {
        return react_1.default.createElement(exports.SelectInput, __assign({}, inputProps));
    }
    if (multiline) {
        return react_1.default.createElement(exports.TextareaInput, __assign({}, inputProps));
    }
    return react_1.default.createElement(exports.TextInput, __assign({}, inputProps));
};
exports.default = Input;
