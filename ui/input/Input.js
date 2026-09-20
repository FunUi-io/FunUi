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
exports.TextareaInput = exports.SelectInput = exports.TextInput = void 0;
var react_1 = __importStar(require("react"));
var pi_1 = require("react-icons/pi");
var componentUtils_1 = require("../../utils/componentUtils");
var getDynamicIcon_1 = require("../../utils/getDynamicIcon");
// Status icons mapping
var statusIcons = {
    success: react_1.default.createElement(pi_1.PiCheckCircle, null),
    warning: react_1.default.createElement(pi_1.PiWarning, null),
    danger: react_1.default.createElement(pi_1.PiX, null),
    info: react_1.default.createElement(pi_1.PiInfo, null)
};
// Password toggle button component
var PasswordToggleButton = function (_a) {
    var showPassword = _a.showPassword, onToggle = _a.onToggle, disabled = _a.disabled;
    return (react_1.default.createElement("div", { onClick: !disabled ? onToggle : undefined, style: { cursor: disabled ? 'not-allowed' : 'pointer' }, "aria-label": showPassword ? 'Hide password' : 'Show password', className: 'pointer hover-text-primary' }, showPassword ? react_1.default.createElement(pi_1.PiEyeSlash, null) : react_1.default.createElement(pi_1.PiEye, null)));
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
// Function to get icon from string or ReactNode
var useIcon = function (iconProp) {
    var _a = (0, react_1.useState)(null), iconNode = _a[0], setIconNode = _a[1];
    (0, react_1.useEffect)(function () {
        if (!iconProp) {
            setIconNode(null);
            return;
        }
        // If it's already a ReactNode, use it directly
        if (react_1.default.isValidElement(iconProp)) {
            setIconNode(iconProp);
            return;
        }
        // If it's a string, try to get dynamic icon
        if (typeof iconProp === 'string') {
            (0, getDynamicIcon_1.getDynamicIcon)(iconProp).then(function (node) {
                if (node) {
                    setIconNode(node);
                }
                else {
                    // If dynamic icon fails, show the string as text
                    setIconNode(react_1.default.createElement("span", null, iconProp));
                }
            });
        }
    }, [iconProp]);
    return iconNode;
};
// Iconic Input Wrapper Component
var IconicInputWrapper = function (_a) {
    var startIcon = _a.startIcon, endIcon = _a.endIcon, iconicBg = _a.iconicBg, funcss = _a.funcss, children = _a.children;
    var showLeftIcon = !!startIcon;
    var showRightIcon = !!endIcon;
    if (!showLeftIcon && !showRightIcon) {
        return react_1.default.createElement(react_1.default.Fragment, null, children);
    }
    return (react_1.default.createElement("div", { className: "icon-container ".concat(showLeftIcon ? 'has-left-icon' : '', " ").concat(funcss || '') },
        showLeftIcon && (react_1.default.createElement("div", { className: "leftIcon", style: {
                backgroundColor: iconicBg || '',
                border: iconicBg ? "0.1rem ".concat(iconicBg, " solid") : '',
            } }, startIcon)),
        children,
        showRightIcon && (react_1.default.createElement("div", { className: "rightIcon", style: { backgroundColor: iconicBg || '' } }, endIcon))));
};
// Input Container with Floating Label
var InputContainer = function (_a) {
    var label = _a.label, status = _a.status, helperText = _a.helperText, children = _a.children, isFocused = _a.isFocused, hasValue = _a.hasValue, fullWidth = _a.fullWidth, id = _a.id, startIcon = _a.startIcon, _b = _a.alwaysActiveLabel, alwaysActiveLabel = _b === void 0 ? false : _b, _c = _a.required, required = _c === void 0 ? false : _c;
    var showFloatingLabel = label && (alwaysActiveLabel || isFocused || hasValue);
    return (react_1.default.createElement("div", { className: "input-wrapper ".concat(fullWidth ? 'full-width' : '') },
        react_1.default.createElement("div", { className: "input-container-with-label" },
            label && (react_1.default.createElement("label", { htmlFor: id, className: "floating-label ".concat(startIcon ? "label-left" : "", "  ").concat(showFloatingLabel ? 'active' : '', " ").concat(status ? "label-".concat(status) : '') },
                label,
                required && react_1.default.createElement("span", { className: "required-indicator" }, "*"))),
            children),
        (helperText) && (react_1.default.createElement("div", { className: "input-helper-text ".concat(status ? "helper-".concat(status) : '') },
            status && statusIcons[status] && (react_1.default.createElement("span", { className: "helper-icon" }, statusIcons[status])),
            react_1.default.createElement("span", null, helperText)))));
};
// Text Input Component
var TextInput = function (_a) {
    var id = _a.id, name = _a.name, value = _a.value, defaultValue = _a.defaultValue, onChange = _a.onChange, onBlur = _a.onBlur, onFocus = _a.onFocus, onClick = _a.onClick, onKeyDown = _a.onKeyDown, onKeyUp = _a.onKeyUp, onKeyPress = _a.onKeyPress, onSubmit = _a.onSubmit, status = _a.status, funcss = _a.funcss, bg = _a.bg, _b = _a.fullWidth, fullWidth = _b === void 0 ? true : _b, flat = _a.flat, bordered = _a.bordered, borderless = _a.borderless, rounded = _a.rounded, leftRounded = _a.leftRounded, rightRounded = _a.rightRounded, startIcon = _a.startIcon, endIcon = _a.endIcon, prefix = _a.prefix, suffix = _a.suffix, stringPrefix = _a.stringPrefix, stringSuffix = _a.stringSuffix, iconicBg = _a.iconicBg, _c = _a.type, type = _c === void 0 ? 'text' : _c, label = _a.label, helperText = _a.helperText, _d = _a.variant, variant = _d === void 0 ? '' : _d, placeholder = _a.placeholder, 
    // HTML Input Attributes
    _e = _a.disabled, 
    // HTML Input Attributes
    disabled = _e === void 0 ? false : _e, _f = _a.readOnly, readOnly = _f === void 0 ? false : _f, _g = _a.required, required = _g === void 0 ? false : _g, _h = _a.autoFocus, autoFocus = _h === void 0 ? false : _h, autoComplete = _a.autoComplete, pattern = _a.pattern, minLength = _a.minLength, maxLength = _a.maxLength, min = _a.min, max = _a.max, step = _a.step, multiple = _a.multiple, accept = _a.accept, size = _a.size, form = _a.form, formNoValidate = _a.formNoValidate, formTarget = _a.formTarget, list = _a.list, autoCapitalize = _a.autoCapitalize, autoCorrect = _a.autoCorrect, spellCheck = _a.spellCheck, inputMode = _a.inputMode, dirname = _a.dirname, rest = __rest(_a, ["id", "name", "value", "defaultValue", "onChange", "onBlur", "onFocus", "onClick", "onKeyDown", "onKeyUp", "onKeyPress", "onSubmit", "status", "funcss", "bg", "fullWidth", "flat", "bordered", "borderless", "rounded", "leftRounded", "rightRounded", "startIcon", "endIcon", "prefix", "suffix", "stringPrefix", "stringSuffix", "iconicBg", "type", "label", "helperText", "variant", "placeholder", "disabled", "readOnly", "required", "autoFocus", "autoComplete", "pattern", "minLength", "maxLength", "min", "max", "step", "multiple", "accept", "size", "form", "formNoValidate", "formTarget", "list", "autoCapitalize", "autoCorrect", "spellCheck", "inputMode", "dirname"]);
    var _j = (0, react_1.useState)(false), isFocused = _j[0], setIsFocused = _j[1];
    var _k = (0, react_1.useState)(value !== undefined ? String(value) : defaultValue || ''), inputValue = _k[0], setInputValue = _k[1];
    var _l = (0, react_1.useState)(false), showPassword = _l[0], setShowPassword = _l[1];
    var inputRef = (0, react_1.useRef)(null);
    var isDateTimeInput = ['date', 'time', 'month', 'week', 'datetime-local'].includes(type || '');
    var isPasswordType = type === 'password';
    (0, react_1.useEffect)(function () {
        if (value !== undefined) {
            setInputValue(String(value));
        }
    }, [value]);
    var mergeWithLocal = (0, componentUtils_1.useComponentConfiguration)('Input', variant).mergeWithLocal;
    // Determine effective icons with priority: startIcon > prefix > stringPrefix
    var effectiveStartIcon = startIcon || prefix || stringPrefix;
    // Determine effective icons with priority: endIcon > suffix > stringSuffix
    var effectiveEndIcon = endIcon || suffix || stringSuffix;
    // Convert string icons to ReactNode
    var startIconNode = useIcon(effectiveStartIcon);
    var endIconNode = useIcon(effectiveEndIcon);
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
        startIcon: startIconNode,
        endIcon: endIconNode,
        iconicBg: iconicBg,
        label: label,
        helperText: helperText,
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
        startIcon: startIconNode !== undefined ? startIconNode : mergedProps.startIcon,
        endIcon: endIconNode !== undefined ? endIconNode : mergedProps.endIcon,
        iconicBg: iconicBg !== undefined ? iconicBg : mergedProps.iconicBg,
    };
    // For password fields, show toggle button if no endIcon/suffix/stringSuffix is provided
    var passwordToggleIcon = isPasswordType && !effectiveEndIcon ? (react_1.default.createElement(PasswordToggleButton, { showPassword: showPassword, onToggle: function () { return setShowPassword(!showPassword); }, disabled: disabled })) : null;
    var effectiveEndIconWithPassword = passwordToggleIcon || final.endIcon;
    var showPrefix = !!final.startIcon;
    var showSuffix = !!effectiveEndIconWithPassword;
    var hasNoPrefix = !showPrefix;
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
        if (onFocus)
            onFocus(e);
    };
    var handleBlur = function (e) {
        setIsFocused(false);
        if (onBlur)
            onBlur(e);
    };
    var handleKeyDown = function (e) {
        if (onKeyDown)
            onKeyDown(e);
    };
    var handleKeyUp = function (e) {
        if (onKeyUp)
            onKeyUp(e);
    };
    var handleKeyPress = function (e) {
        if (onKeyPress)
            onKeyPress(e);
    };
    var showPlaceholder = placeholder && label && (isFocused || !!inputValue);
    var inputType = isPasswordType ? (showPassword ? 'text' : 'password') : type;
    var inputElement = (react_1.default.createElement("input", __assign({ ref: inputRef, id: id, name: name, className: className, onChange: handleChange, onFocus: handleFocus, onBlur: handleBlur, onClick: onClick, onKeyDown: handleKeyDown, onKeyUp: handleKeyUp, onKeyPress: handleKeyPress, onSubmit: onSubmit, defaultValue: defaultValue, type: inputType, placeholder: showPlaceholder ? placeholder : (!label ? placeholder : ''), style: style, value: inputValue, 
        // HTML Input Attributes
        disabled: disabled, readOnly: readOnly, required: required, autoFocus: autoFocus, autoComplete: autoComplete, pattern: pattern, minLength: minLength, maxLength: maxLength, min: min, max: max, step: step, multiple: multiple, accept: accept, size: size, form: form, formNoValidate: formNoValidate, formTarget: formTarget, list: list, autoCapitalize: autoCapitalize, autoCorrect: autoCorrect, spellCheck: spellCheck, inputMode: inputMode }, rest)));
    // Only use iconic wrapper when we have icons
    var wrappedInput = showPrefix || showSuffix ? (react_1.default.createElement(IconicInputWrapper, { startIcon: final.startIcon, endIcon: effectiveEndIconWithPassword, iconicBg: final.iconicBg, funcss: final.funcss }, inputElement)) : (inputElement);
    return (react_1.default.createElement(InputContainer, { startIcon: final.startIcon, label: label, status: final.status, helperText: helperText, isFocused: isFocused, hasValue: !!inputValue, fullWidth: final.fullWidth, id: id, alwaysActiveLabel: isDateTimeInput, required: required }, wrappedInput));
};
exports.TextInput = TextInput;
// Select Component
var SelectInput = function (_a) {
    var id = _a.id, name = _a.name, value = _a.value, defaultValue = _a.defaultValue, onChange = _a.onChange, onBlur = _a.onBlur, onFocus = _a.onFocus, onClick = _a.onClick, onKeyDown = _a.onKeyDown, onKeyUp = _a.onKeyUp, onKeyPress = _a.onKeyPress, onSubmit = _a.onSubmit, status = _a.status, funcss = _a.funcss, bg = _a.bg, fullWidth = _a.fullWidth, flat = _a.flat, bordered = _a.bordered, borderless = _a.borderless, rounded = _a.rounded, leftRounded = _a.leftRounded, rightRounded = _a.rightRounded, startIcon = _a.startIcon, endIcon = _a.endIcon, prefix = _a.prefix, suffix = _a.suffix, stringPrefix = _a.stringPrefix, stringSuffix = _a.stringSuffix, iconicBg = _a.iconicBg, _b = _a.options, options = _b === void 0 ? [] : _b, label = _a.label, helperText = _a.helperText, _c = _a.variant, variant = _c === void 0 ? '' : _c, placeholder = _a.placeholder, 
    // HTML Select Attributes
    _d = _a.disabled, 
    // HTML Select Attributes
    disabled = _d === void 0 ? false : _d, _e = _a.required, required = _e === void 0 ? false : _e, _f = _a.autoFocus, autoFocus = _f === void 0 ? false : _f, form = _a.form, formNoValidate = _a.formNoValidate, formTarget = _a.formTarget, size = _a.size, multiple = _a.multiple, autoComplete = _a.autoComplete, rest = __rest(_a, ["id", "name", "value", "defaultValue", "onChange", "onBlur", "onFocus", "onClick", "onKeyDown", "onKeyUp", "onKeyPress", "onSubmit", "status", "funcss", "bg", "fullWidth", "flat", "bordered", "borderless", "rounded", "leftRounded", "rightRounded", "startIcon", "endIcon", "prefix", "suffix", "stringPrefix", "stringSuffix", "iconicBg", "options", "label", "helperText", "variant", "placeholder", "disabled", "required", "autoFocus", "form", "formNoValidate", "formTarget", "size", "multiple", "autoComplete"]);
    var _g = (0, react_1.useState)(false), isFocused = _g[0], setIsFocused = _g[1];
    var _h = (0, react_1.useState)(value !== undefined ? String(value) : defaultValue || ''), selectValue = _h[0], setSelectValue = _h[1];
    var selectRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(function () {
        if (value !== undefined) {
            setSelectValue(String(value));
        }
    }, [value]);
    var mergeWithLocal = (0, componentUtils_1.useComponentConfiguration)('Input', variant).mergeWithLocal;
    // Determine effective icons with priority: startIcon > prefix > stringPrefix
    var effectiveStartIcon = startIcon || prefix || stringPrefix;
    // Determine effective icons with priority: endIcon > suffix > stringSuffix
    var effectiveEndIcon = endIcon || suffix || stringSuffix;
    // Convert string icons to ReactNode
    var startIconNode = useIcon(effectiveStartIcon);
    var endIconNode = useIcon(effectiveEndIcon);
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
        startIcon: startIconNode,
        endIcon: endIconNode,
        iconicBg: iconicBg,
        label: label,
        helperText: helperText,
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
        startIcon: startIconNode !== undefined ? startIconNode : mergedProps.startIcon,
        endIcon: endIconNode !== undefined ? endIconNode : mergedProps.endIcon,
        iconicBg: iconicBg !== undefined ? iconicBg : mergedProps.iconicBg,
    };
    // Process options to handle both text and label properties
    var processedOptions = react_1.default.useMemo(function () {
        // Add "No Option" as first option if options array exists and has items
        var optionsWithDefault = [];
        // Check if options array exists and has items
        if (options && options.length > 0) {
            // Add default "No Option" with empty value
            optionsWithDefault.push({ value: '', text: 'No Option' });
            // Map existing options to use either text or label
            options.forEach(function (option) {
                optionsWithDefault.push({
                    value: option.value,
                    text: option.text !== undefined ? option.text : (option.label || option.value)
                });
            });
        }
        return optionsWithDefault;
    }, [options]);
    var selectHasValue = !!selectValue;
    var showPrefix = !!final.startIcon;
    var showSuffix = !!final.endIcon;
    var hasNoPrefix = !showPrefix;
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
        if (onFocus)
            onFocus(e);
    };
    var handleBlur = function (e) {
        setIsFocused(false);
        if (onBlur)
            onBlur(e);
    };
    var handleKeyDown = function (e) {
        if (onKeyDown)
            onKeyDown(e);
        // Handle Tab key when input is empty
        if (e.key === 'Tab' && !e.shiftKey && selectRef.current && !selectValue && placeholder) {
            e.preventDefault();
            setSelectValue(placeholder);
            // Trigger change event
            if (onChange) {
                var event_1 = {
                    target: { value: placeholder }
                };
                onChange(event_1);
            }
        }
    };
    // Extract only valid HTML select attributes for the select element
    var selectAttributes = __assign({ id: id, name: name, className: className, onChange: handleChange, onFocus: handleFocus, onBlur: handleBlur, onClick: onClick, onKeyDown: handleKeyDown, onKeyUp: onKeyUp, onKeyPress: onKeyPress, onSubmit: onSubmit, defaultValue: defaultValue, value: selectValue, style: style, disabled: disabled, required: required, autoFocus: autoFocus, form: form, size: size, multiple: multiple, autoComplete: autoComplete }, rest);
    var selectElement = (react_1.default.createElement("select", __assign({ ref: selectRef }, selectAttributes), processedOptions.map(function (option) { return (react_1.default.createElement("option", { key: option.value, value: option.value }, option.text)); })));
    // Only use iconic wrapper when we have icons
    var wrappedSelect = showPrefix || showSuffix ? (react_1.default.createElement(IconicInputWrapper, { startIcon: final.startIcon, endIcon: final.endIcon, iconicBg: final.iconicBg, funcss: final.funcss }, selectElement)) : (selectElement);
    return (react_1.default.createElement(InputContainer, { startIcon: final.startIcon, label: label, status: final.status, helperText: helperText, isFocused: isFocused, hasValue: selectHasValue, fullWidth: final.fullWidth, id: id, alwaysActiveLabel: true, required: required }, wrappedSelect));
};
exports.SelectInput = SelectInput;
// Textarea Component
var TextareaInput = function (_a) {
    var id = _a.id, name = _a.name, value = _a.value, defaultValue = _a.defaultValue, onChange = _a.onChange, onBlur = _a.onBlur, onFocus = _a.onFocus, onClick = _a.onClick, onKeyDown = _a.onKeyDown, onKeyUp = _a.onKeyUp, onKeyPress = _a.onKeyPress, onSubmit = _a.onSubmit, status = _a.status, funcss = _a.funcss, bg = _a.bg, fullWidth = _a.fullWidth, flat = _a.flat, bordered = _a.bordered, borderless = _a.borderless, rounded = _a.rounded, leftRounded = _a.leftRounded, rightRounded = _a.rightRounded, startIcon = _a.startIcon, endIcon = _a.endIcon, prefix = _a.prefix, suffix = _a.suffix, stringPrefix = _a.stringPrefix, stringSuffix = _a.stringSuffix, iconicBg = _a.iconicBg, label = _a.label, helperText = _a.helperText, _b = _a.rows, rows = _b === void 0 ? 2 : _b, cols = _a.cols, wrap = _a.wrap, _c = _a.variant, variant = _c === void 0 ? '' : _c, placeholder = _a.placeholder, 
    // HTML Textarea Attributes
    _d = _a.disabled, 
    // HTML Textarea Attributes
    disabled = _d === void 0 ? false : _d, _e = _a.readOnly, readOnly = _e === void 0 ? false : _e, _f = _a.required, required = _f === void 0 ? false : _f, _g = _a.autoFocus, autoFocus = _g === void 0 ? false : _g, autoComplete = _a.autoComplete, minLength = _a.minLength, maxLength = _a.maxLength, form = _a.form, formNoValidate = _a.formNoValidate, formTarget = _a.formTarget, dirname = _a.dirname, autoCapitalize = _a.autoCapitalize, autoCorrect = _a.autoCorrect, spellCheck = _a.spellCheck, inputMode = _a.inputMode, rest = __rest(_a, ["id", "name", "value", "defaultValue", "onChange", "onBlur", "onFocus", "onClick", "onKeyDown", "onKeyUp", "onKeyPress", "onSubmit", "status", "funcss", "bg", "fullWidth", "flat", "bordered", "borderless", "rounded", "leftRounded", "rightRounded", "startIcon", "endIcon", "prefix", "suffix", "stringPrefix", "stringSuffix", "iconicBg", "label", "helperText", "rows", "cols", "wrap", "variant", "placeholder", "disabled", "readOnly", "required", "autoFocus", "autoComplete", "minLength", "maxLength", "form", "formNoValidate", "formTarget", "dirname", "autoCapitalize", "autoCorrect", "spellCheck", "inputMode"]);
    var _h = (0, react_1.useState)(false), isFocused = _h[0], setIsFocused = _h[1];
    var _j = (0, react_1.useState)(value !== undefined ? String(value) : defaultValue || ''), textValue = _j[0], setTextValue = _j[1];
    (0, react_1.useEffect)(function () {
        if (value !== undefined) {
            setTextValue(String(value));
        }
    }, [value]);
    var mergeWithLocal = (0, componentUtils_1.useComponentConfiguration)('Input', variant).mergeWithLocal;
    // Determine effective icons with priority: startIcon > prefix > stringPrefix
    var effectiveStartIcon = startIcon || prefix || stringPrefix;
    // Determine effective icons with priority: endIcon > suffix > stringSuffix
    var effectiveEndIcon = endIcon || suffix || stringSuffix;
    // Convert string icons to ReactNode
    var startIconNode = useIcon(effectiveStartIcon);
    var endIconNode = useIcon(effectiveEndIcon);
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
        startIcon: startIconNode,
        endIcon: endIconNode,
        iconicBg: iconicBg,
        label: label,
        helperText: helperText,
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
        startIcon: startIconNode !== undefined ? startIconNode : mergedProps.startIcon,
        endIcon: endIconNode !== undefined ? endIconNode : mergedProps.endIcon,
        iconicBg: iconicBg !== undefined ? iconicBg : mergedProps.iconicBg,
    };
    var showPrefix = !!final.startIcon;
    var showSuffix = !!final.endIcon;
    var hasNoPrefix = !showPrefix;
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
        if (onFocus)
            onFocus(e);
    };
    var handleBlur = function (e) {
        setIsFocused(false);
        if (onBlur)
            onBlur(e);
    };
    var showPlaceholder = placeholder && label && (isFocused || !!textValue);
    // Extract only valid HTML textarea attributes
    var textareaAttributes = __assign({ id: id, name: name, className: className, onChange: handleChange, onFocus: handleFocus, onBlur: handleBlur, onClick: onClick, onKeyDown: onKeyDown, onKeyUp: onKeyUp, onKeyPress: onKeyPress, onSubmit: onSubmit, defaultValue: defaultValue, placeholder: showPlaceholder ? placeholder : (!label ? placeholder : ''), style: style, value: textValue, rows: rows, cols: cols, wrap: wrap, disabled: disabled, readOnly: readOnly, required: required, autoFocus: autoFocus, autoComplete: autoComplete, minLength: minLength, maxLength: maxLength, form: form, autoCapitalize: autoCapitalize, autoCorrect: autoCorrect, spellCheck: spellCheck, inputMode: inputMode }, rest);
    var textareaElement = react_1.default.createElement("textarea", __assign({}, textareaAttributes));
    // Only use iconic wrapper when we have icons
    var wrappedTextarea = showPrefix || showSuffix ? (react_1.default.createElement(IconicInputWrapper, { startIcon: final.startIcon, endIcon: final.endIcon, iconicBg: final.iconicBg, funcss: final.funcss }, textareaElement)) : (textareaElement);
    return (react_1.default.createElement(InputContainer, { startIcon: final.startIcon, label: label, status: final.status, helperText: helperText, isFocused: isFocused, hasValue: !!textValue, fullWidth: final.fullWidth, id: id, required: required }, wrappedTextarea));
};
exports.TextareaInput = TextareaInput;
var Input = function (_a) {
    var select = _a.select, multiline = _a.multiline, noBorder = _a.noBorder, startIcon = _a.startIcon, endIcon = _a.endIcon, prefix = _a.prefix, suffix = _a.suffix, stringPrefix = _a.stringPrefix, stringSuffix = _a.stringSuffix, iconicBg = _a.iconicBg, type = _a.type, _b = _a.variant, variant = _b === void 0 ? '' : _b, props = __rest(_a, ["select", "multiline", "noBorder", "startIcon", "endIcon", "prefix", "suffix", "stringPrefix", "stringSuffix", "iconicBg", "type", "variant"]);
    var mergeWithLocal = (0, componentUtils_1.useComponentConfiguration)('Input', variant).mergeWithLocal;
    // Determine effective icons with priority:
    // For start: startIcon > prefix > stringPrefix
    // For end: endIcon > suffix > stringSuffix
    var effectiveStartIcon = startIcon || prefix || stringPrefix;
    var effectiveEndIcon = endIcon || suffix || stringSuffix;
    // Create local props object including all input props
    var localProps = __assign(__assign({}, props), { startIcon: effectiveStartIcon, endIcon: effectiveEndIcon, iconicBg: iconicBg, type: type, 
        // Ensure all event handlers are passed through
        onChange: props.onChange, onBlur: props.onBlur, onFocus: props.onFocus, onClick: props.onClick, onKeyDown: props.onKeyDown, onKeyUp: props.onKeyUp, onKeyPress: props.onKeyPress, onSubmit: props.onSubmit });
    var mergedProps = mergeWithLocal(localProps).props;
    // Build the final props object
    var inputProps = __assign(__assign(__assign(__assign({}, mergedProps), { 
        // Then spread all component-specific props to ensure they override theme
        startIcon: effectiveStartIcon, endIcon: effectiveEndIcon, stringPrefix: stringPrefix, stringSuffix: stringSuffix, iconicBg: iconicBg }), props), { borderless: noBorder !== undefined ? noBorder : (props.borderless !== undefined ? props.borderless : mergedProps.borderless), type: type, variant: variant });
    var finalInputProps = __assign(__assign({}, inputProps), { onChange: props.onChange || inputProps.onChange, onBlur: props.onBlur || inputProps.onBlur, onFocus: props.onFocus || inputProps.onFocus });
    if (select) {
        return react_1.default.createElement(exports.SelectInput, __assign({}, finalInputProps));
    }
    if (multiline) {
        return react_1.default.createElement(exports.TextareaInput, __assign({}, finalInputProps));
    }
    return react_1.default.createElement(exports.TextInput, __assign({}, finalInputProps));
};
exports.default = Input;
