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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var Button_1 = __importDefault(require("../button/Button"));
var Input_1 = __importDefault(require("../input/Input"));
var Flex_1 = __importDefault(require("../flex/Flex"));
var Text_1 = __importDefault(require("../text/Text"));
var pi_1 = require("react-icons/pi");
var componentUtils_1 = require("../../utils/componentUtils");
// Helper function to parse JSON input
var parseJsonInput = function (input, defaultValue) {
    if (input === undefined || input === null) {
        return defaultValue;
    }
    // If it's already the correct type, return as is
    if (typeof input !== 'string') {
        return input;
    }
    try {
        // Try to parse as JSON
        var parsed = JSON.parse(input);
        return parsed;
    }
    catch (error) {
        console.warn('Failed to parse JSON input:', input, error);
        // If parsing fails, try to interpret as a string that might be valid
        try {
            // Try to handle common cases like arrays or objects without quotes
            var trimmed = input.trim();
            if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
                return JSON.parse(trimmed);
            }
            else if (trimmed.startsWith('{') && trimmed.endsWith('}')) {
                return JSON.parse(trimmed);
            }
        }
        catch (e) {
            // If still fails, return default
        }
        return defaultValue;
    }
};
// Custom Checkbox Component (unchanged)
var FormCheckbox = function (_a) {
    var label = _a.label, checked = _a.checked, onChange = _a.onChange, disabled = _a.disabled, required = _a.required, value = _a.value, id = _a.id;
    return (react_1.default.createElement("label", { className: "funui_form-checkbox", style: {
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            cursor: disabled ? 'not-allowed' : 'pointer',
            userSelect: 'none',
            width: 'fit-content',
            padding: '0.25rem 0',
        } },
        react_1.default.createElement("input", { type: "checkbox", id: id, checked: checked, onChange: function (e) { return !disabled && onChange(e.target.checked); }, disabled: disabled, required: required, value: value, style: {
                position: 'absolute',
                opacity: 0,
                width: 0,
                height: 0,
                pointerEvents: 'none'
            } }),
        react_1.default.createElement("div", { className: "funui_form-checkbox-box", style: {
                width: '1.25rem',
                height: '1.25rem',
                border: checked ? '2px solid var(--primary)' : '2px solid var(--borderColor)',
                borderRadius: '0.25rem',
                backgroundColor: checked ? 'var(--primary)' : 'transparent',
                position: 'relative',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
            } }, checked && (react_1.default.createElement("svg", { width: "14", height: "14", viewBox: "0 0 14 14", fill: "none", xmlns: "http://www.w3.org2000/svg", style: {
                stroke: 'white',
                strokeWidth: '2',
                strokeLinecap: 'round',
                strokeLinejoin: 'round',
            } },
            react_1.default.createElement("path", { d: "M3 7L6 10L11 4" })))),
        label && (react_1.default.createElement("span", { className: "funui_form-checkbox-label", style: {
                fontSize: '0.875rem',
                color: disabled ? 'var(--text-muted)' : 'var(--text)',
                fontWeight: checked ? '500' : '400',
            } },
            label,
            required && ' *'))));
};
// Custom Radio Component (unchanged)
var FormRadio = function (_a) {
    var label = _a.label, checked = _a.checked, onChange = _a.onChange, disabled = _a.disabled, required = _a.required, value = _a.value, id = _a.id;
    return (react_1.default.createElement("label", { className: "funui_form-radio", style: {
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            cursor: disabled ? 'not-allowed' : 'pointer',
            userSelect: 'none',
            width: 'fit-content',
            padding: '0.25rem 0',
        } },
        react_1.default.createElement("input", { type: "radio", id: id, checked: checked, onChange: function (e) { return !disabled && onChange(e.target.checked); }, disabled: disabled, required: required, value: value, style: {
                position: 'absolute',
                opacity: 0,
                width: 0,
                height: 0,
                pointerEvents: 'none'
            } }),
        react_1.default.createElement("div", { className: "funui_form-radio-circle", style: {
                width: '1.25rem',
                height: '1.25rem',
                border: checked ? '2px solid var(--primary)' : '2px solid var(--borderColor)',
                borderRadius: '50%',
                backgroundColor: 'transparent',
                position: 'relative',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
            } }, checked && (react_1.default.createElement("div", { style: {
                width: '0.75rem',
                height: '0.75rem',
                backgroundColor: 'var(--primary)',
                borderRadius: '50%',
            } }))),
        label && (react_1.default.createElement("span", { className: "funui_form-radio-label", style: {
                fontSize: '0.875rem',
                color: disabled ? 'var(--text-muted)' : 'var(--text)',
                fontWeight: checked ? '500' : '400',
            } },
            label,
            required && ' *'))));
};
// Function to format WhatsApp message - UPDATED with proper formatting
var formatWhatsAppMessage = function (values, fields, header, footer) {
    // Build message lines
    var message = '';
    // Add header if provided
    if (header) {
        message += "".concat(header, "\n\n");
    }
    // Filter out empty/null/undefined values
    var nonEmptyFields = fields.filter(function (field) {
        var value = values[field.name];
        // Skip if value is undefined, null, or empty string
        if (value === undefined || value === null || value === '') {
            return false;
        }
        // Skip if array is empty
        if (Array.isArray(value) && value.length === 0) {
            return false;
        }
        // Skip if checkbox is false
        if (field.type === 'checkbox' && !field.multiple && value === false) {
            return false;
        }
        return true;
    });
    // Format each field
    var fieldLines = nonEmptyFields.map(function (field) {
        var value = values[field.name];
        var displayValue = value;
        // Format array values (for multiple checkboxes)
        if (Array.isArray(value)) {
            displayValue = value.join(', ');
        }
        // Format checkbox values
        if (field.type === 'checkbox' && !field.multiple) {
            displayValue = value ? 'Yes' : 'No';
        }
        // Format select/radio values
        if ((field.type === 'select' || field.type === 'radio') && field.options) {
            var option = field.options.find(function (opt) { return opt.value === value; });
            displayValue = option ? option.label : value;
        }
        // Ensure displayValue is a string and preserve spaces/newlines
        displayValue = String(displayValue);
        // WhatsApp formatting:
        // - Field label on its own line
        // - Value on next line wrapped in backticks
        // - Double newline between fields for readability
        return "".concat(field.label || field.name, "\n`").concat(displayValue, "`");
    });
    // Join with double newline for spacing
    message += fieldLines.join('\n\n');
    // Add footer if provided
    if (footer) {
        message += "\n\n".concat(footer);
    }
    return encodeURIComponent(message);
};
// Main Form Component - FIXED
var Form = function (props) {
    var fieldsProp = props.fields, onSubmitProp = props.onSubmit, _a = props.defaultValues, defaultValuesProp = _a === void 0 ? {} : _a, _b = props.submitText, submitTextProp = _b === void 0 ? 'Submit' : _b, _c = props.submitBg, submitBgProp = _c === void 0 ? 'primary' : _c, submitPrefixProp = props.submitPrefix, submitSuffixProp = props.submitSuffix, _d = props.resetText, resetTextProp = _d === void 0 ? 'Reset' : _d, _e = props.showReset, showResetProp = _e === void 0 ? true : _e, _f = props.isLoading, isLoadingProp = _f === void 0 ? false : _f, _g = props.className, classNameProp = _g === void 0 ? '' : _g, _h = props.layout, layoutProp = _h === void 0 ? 'vertical' : _h, _j = props.gap, gapProp = _j === void 0 ? '1.5rem' : _j, titleProp = props.title, titleSizeProp = props.titleSize, titleColorProp = props.titleColor, descriptionProp = props.description, descriptionSizeProp = props.descriptionSize, descriptionColorProp = props.descriptionColor, whatsappContactProp = props.whatsappContact, widthProp = props.width, centeredProp = props.centered, whatsappHeaderProp = props.whatsappHeader, whatsappFooterProp = props.whatsappFooter, _k = props.fullWidth, fullWidthProp = _k === void 0 ? true : _k, _l = props.variant, variant = _l === void 0 ? '' : _l;
    // Use component configuration with variant
    var mergeWithLocal = (0, componentUtils_1.useComponentConfiguration)('Form', variant).mergeWithLocal;
    // Create local props object
    var localProps = {
        fields: fieldsProp,
        onSubmit: onSubmitProp,
        defaultValues: defaultValuesProp,
        submitText: submitTextProp,
        submitBg: submitBgProp,
        submitPrefix: submitPrefixProp,
        submitSuffix: submitSuffixProp,
        resetText: resetTextProp,
        showReset: showResetProp,
        isLoading: isLoadingProp,
        className: classNameProp,
        layout: layoutProp,
        gap: gapProp,
        title: titleProp,
        titleSize: titleSizeProp,
        titleColor: titleColorProp,
        description: descriptionProp,
        descriptionSize: descriptionSizeProp,
        descriptionColor: descriptionColorProp,
        whatsappContact: whatsappContactProp,
        width: widthProp,
        centered: centeredProp,
        whatsappHeader: whatsappHeaderProp,
        whatsappFooter: whatsappFooterProp,
        fullWidth: fullWidthProp,
        variant: variant,
    };
    // Merge with theme configuration
    var mergedProps = mergeWithLocal(localProps).props;
    // Destructure with proper priority: local props override config props
    var fields = fieldsProp !== undefined ? fieldsProp : mergedProps.fields;
    var onSubmit = onSubmitProp !== undefined ? onSubmitProp : mergedProps.onSubmit;
    var defaultValues = defaultValuesProp !== undefined ? defaultValuesProp : mergedProps.defaultValues;
    var submitText = submitTextProp !== undefined ? submitTextProp : mergedProps.submitText;
    var submitBg = submitBgProp !== undefined ? submitBgProp : mergedProps.submitBg;
    var submitPrefix = submitPrefixProp !== undefined ? submitPrefixProp : mergedProps.submitPrefix;
    var submitSuffix = submitSuffixProp !== undefined ? submitSuffixProp : mergedProps.submitSuffix;
    var isLoading = isLoadingProp !== undefined ? isLoadingProp : mergedProps.isLoading;
    var className = classNameProp !== undefined ? classNameProp : mergedProps.className;
    var layout = layoutProp !== undefined ? layoutProp : mergedProps.layout;
    var gap = gapProp !== undefined ? gapProp : mergedProps.gap;
    var title = titleProp !== undefined ? titleProp : mergedProps.title;
    var titleSize = titleSizeProp !== undefined ? titleSizeProp : mergedProps.titleSize;
    var titleColor = titleColorProp !== undefined ? titleColorProp : mergedProps.titleColor;
    var description = descriptionProp !== undefined ? descriptionProp : mergedProps.description;
    var descriptionSize = descriptionSizeProp !== undefined ? descriptionSizeProp : mergedProps.descriptionSize;
    var descriptionColor = descriptionColorProp !== undefined ? descriptionColorProp : mergedProps.descriptionColor;
    var whatsappContact = whatsappContactProp !== undefined ? whatsappContactProp : mergedProps.whatsappContact;
    var width = widthProp !== undefined ? widthProp : mergedProps.width;
    var centered = centeredProp !== undefined ? centeredProp : mergedProps.centered;
    var whatsappHeader = whatsappHeaderProp !== undefined ? whatsappHeaderProp : mergedProps.whatsappHeader;
    var whatsappFooter = whatsappFooterProp !== undefined ? whatsappFooterProp : mergedProps.whatsappFooter;
    var fullWidth = fullWidthProp !== undefined ? fullWidthProp : mergedProps.fullWidth;
    // Parse JSON inputs
    var parsedFields = (0, react_1.useMemo)(function () { return parseJsonInput(fields, []); }, [fields]);
    var parsedDefaultValues = (0, react_1.useMemo)(function () { return parseJsonInput(defaultValues, {}); }, [defaultValues]);
    // State management
    var _m = (0, react_1.useState)({}), errors = _m[0], setErrors = _m[1];
    var _o = (0, react_1.useState)({}), touched = _o[0], setTouched = _o[1];
    var _p = (0, react_1.useState)(function () {
        // Initialize form values from defaultValues and field values
        var initialValues = {};
        parsedFields.forEach(function (field) {
            if (field.value !== undefined) {
                initialValues[field.name] = field.value;
            }
            else if (parsedDefaultValues[field.name] !== undefined) {
                initialValues[field.name] = parsedDefaultValues[field.name];
            }
            else {
                // Set default empty values
                if (field.type === 'checkbox' && field.multiple) {
                    initialValues[field.name] = [];
                }
                else if (field.type === 'checkbox') {
                    initialValues[field.name] = false;
                }
                else {
                    initialValues[field.name] = '';
                }
            }
        });
        return initialValues;
    }), formValues = _p[0], setFormValues = _p[1];
    var _q = (0, react_1.useState)(false), isSubmitting = _q[0], setIsSubmitting = _q[1];
    // Update form values when defaultValues prop changes
    (0, react_1.useEffect)(function () {
        if (Object.keys(parsedDefaultValues).length > 0) {
            setFormValues(function (prev) { return (__assign(__assign({}, prev), parsedDefaultValues)); });
        }
    }, [parsedDefaultValues]);
    // Validate a single field
    var validateField = (0, react_1.useCallback)(function (field, value) {
        var _a, _b, _c, _d, _e, _f, _g;
        // Required validation
        if (field.required) {
            if (value === undefined || value === null || value === '') {
                return "".concat(field.label || field.name, " is required");
            }
            if (field.type === 'checkbox' && field.multiple && Array.isArray(value) && value.length === 0) {
                return "".concat(field.label || field.name, " is required");
            }
            if (field.type === 'checkbox' && !field.multiple && value === false) {
                return "".concat(field.label || field.name, " is required");
            }
        }
        // Type-specific validations (only for non-empty values)
        if (value && (typeof value !== 'string' || value !== '')) {
            // Email validation
            if (field.type === 'email' && typeof value === 'string') {
                var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    return 'Please enter a valid email address';
                }
            }
            // Number validation
            if (field.type === 'number') {
                var numValue = void 0;
                if (typeof value === 'string') {
                    numValue = parseFloat(value);
                }
                else if (typeof value === 'number') {
                    numValue = value;
                }
                else {
                    return 'Please enter a valid number';
                }
                if (isNaN(numValue)) {
                    return 'Please enter a valid number';
                }
                var min = (_a = field.inputProps) === null || _a === void 0 ? void 0 : _a.min;
                var max = (_b = field.inputProps) === null || _b === void 0 ? void 0 : _b.max;
                if (min !== undefined && numValue < parseFloat(min.toString())) {
                    return "Minimum value is ".concat(min);
                }
                if (max !== undefined && numValue > parseFloat(max.toString())) {
                    return "Maximum value is ".concat(max);
                }
            }
            // Phone validation (basic) - only for strings
            // Phone validation (basic) - only for strings
            if (field.type === 'tel' && typeof value === 'string') {
                // Remove all non-digit characters except + at the beginning
                var cleanedValue = value.replace(/[^\d+]/g, '');
                // Check if the value contains any letters (shouldn't happen after cleaning, but just in case)
                if (/[a-zA-Z]/.test(value)) {
                    return 'Phone number cannot contain letters';
                }
                // Allow numbers starting with 0 or with country code (+)
                var phoneRegex = /^[\+]?[0-9]{0,18}$/;
                if (value && !phoneRegex.test(cleanedValue)) {
                    return 'Please enter a valid phone number (digits only, can start with 0 or +)';
                }
                // Optional: Add minimum length check
                var minLength = ((_c = field.inputProps) === null || _c === void 0 ? void 0 : _c.minLength) || 10; // Default 10 digits
                if (cleanedValue.length > 0 && cleanedValue.length < minLength) {
                    return "Phone number must be at least ".concat(minLength, " digits");
                }
                // Optional: Add maximum length check
                var maxLength = ((_d = field.inputProps) === null || _d === void 0 ? void 0 : _d.maxLength) || 15; // Default 15 digits
                if (cleanedValue.length > maxLength) {
                    return "Phone number cannot exceed ".concat(maxLength, " digits");
                }
            }
            // Length validation for strings
            if (typeof value === 'string') {
                var minLength = (_e = field.inputProps) === null || _e === void 0 ? void 0 : _e.minLength;
                var maxLength = (_f = field.inputProps) === null || _f === void 0 ? void 0 : _f.maxLength;
                if (minLength && value.length < minLength) {
                    return "Minimum ".concat(minLength, " characters required");
                }
                if (maxLength && value.length > maxLength) {
                    return "Maximum ".concat(maxLength, " characters allowed");
                }
            }
            // Pattern validation if provided - only for strings
            if (((_g = field.inputProps) === null || _g === void 0 ? void 0 : _g.pattern) && typeof value === 'string') {
                try {
                    var regex = new RegExp(field.inputProps.pattern);
                    if (!regex.test(value)) {
                        return 'Invalid format';
                    }
                }
                catch (error) {
                    console.warn('Invalid regex pattern:', field.inputProps.pattern);
                }
            }
        }
        return null;
    }, []);
    // Validate form
    var validateForm = (0, react_1.useCallback)(function () {
        var newErrors = {};
        var hasErrors = false;
        parsedFields.forEach(function (field) {
            var value = formValues[field.name];
            var error = validateField(field, value);
            if (error) {
                newErrors[field.name] = error;
                hasErrors = true;
            }
        });
        setErrors(newErrors);
        return !hasErrors;
    }, [parsedFields, validateField, formValues]);
    // Handle field change for checkboxes and radios
    var handleFieldChange = (0, react_1.useCallback)(function (fieldName, newValue) {
        // Update form values
        setFormValues(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[fieldName] = newValue, _a)));
        });
        // Update touched state
        setTouched(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[fieldName] = true, _a)));
        });
        // Validate the changed field
        var field = parsedFields.find(function (f) { return f.name === fieldName; });
        if (!field)
            return;
        var error = validateField(field, newValue);
        setErrors(function (prev) {
            var _a;
            if (error) {
                return __assign(__assign({}, prev), (_a = {}, _a[fieldName] = error, _a));
            }
            else {
                var newErrors = __assign({}, prev);
                delete newErrors[fieldName];
                return newErrors;
            }
        });
    }, [parsedFields, validateField]);
    // FIXED: Handle input change - pass event directly to Input component
    var handleInputEventChange = (0, react_1.useCallback)(function (e) {
        var fieldName = e.target.name;
        var value = e.target.value;
        // Update form values - PASS VALUE AS-IS (preserves spaces)
        setFormValues(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[fieldName] = value, _a)));
        });
        // Update touched state
        setTouched(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[fieldName] = true, _a)));
        });
        // Validate the changed field
        var field = parsedFields.find(function (f) { return f.name === fieldName; });
        if (!field)
            return;
        var error = validateField(field, value);
        setErrors(function (prev) {
            var _a;
            if (error) {
                return __assign(__assign({}, prev), (_a = {}, _a[fieldName] = error, _a));
            }
            else {
                var newErrors = __assign({}, prev);
                delete newErrors[fieldName];
                return newErrors;
            }
        });
    }, [parsedFields, validateField]);
    // FIXED: Handle blur event - pass event directly to Input component
    var handleInputEventBlur = (0, react_1.useCallback)(function (e) {
        var fieldName = e.target.name;
        setTouched(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[fieldName] = true, _a)));
        });
        // Validate the field
        var field = parsedFields.find(function (f) { return f.name === fieldName; });
        if (!field)
            return;
        var value = formValues[fieldName];
        var error = validateField(field, value);
        setErrors(function (prev) {
            var _a;
            if (error) {
                return __assign(__assign({}, prev), (_a = {}, _a[fieldName] = error, _a));
            }
            else {
                var newErrors = __assign({}, prev);
                delete newErrors[fieldName];
                return newErrors;
            }
        });
    }, [parsedFields, validateField, formValues]);
    // Handle form submission
    var handleSubmit = (0, react_1.useCallback)(function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var allTouched, isValid, firstErrorField, element, message, cleanPhone, whatsappUrl, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    allTouched = {};
                    parsedFields.forEach(function (field) {
                        allTouched[field.name] = true;
                    });
                    setTouched(allTouched);
                    isValid = validateForm();
                    if (!isValid) {
                        firstErrorField = Object.keys(errors)[0];
                        if (firstErrorField) {
                            element = document.getElementById("form-field-".concat(firstErrorField));
                            element === null || element === void 0 ? void 0 : element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }
                        return [2 /*return*/];
                    }
                    // Get form data and submit
                    setIsSubmitting(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 7, 8, 9]);
                    if (!whatsappContact) return [3 /*break*/, 4];
                    message = formatWhatsAppMessage(formValues, parsedFields, whatsappHeader, whatsappFooter);
                    cleanPhone = whatsappContact.replace(/[\s+\-()]/g, '');
                    whatsappUrl = "https://wa.me/".concat(cleanPhone, "?text=").concat(message);
                    window.open(whatsappUrl, '_blank');
                    if (!onSubmit) return [3 /*break*/, 3];
                    return [4 /*yield*/, onSubmit(formValues, true)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3: return [3 /*break*/, 6];
                case 4:
                    if (!onSubmit) return [3 /*break*/, 6];
                    return [4 /*yield*/, onSubmit(formValues, false)];
                case 5:
                    _a.sent();
                    _a.label = 6;
                case 6: return [3 /*break*/, 9];
                case 7:
                    error_1 = _a.sent();
                    console.error('Form submission error:', error_1);
                    setErrors(function (prev) { return (__assign(__assign({}, prev), { _form: 'There was an error submitting the form. Please try again.' })); });
                    return [3 /*break*/, 9];
                case 8:
                    setIsSubmitting(false);
                    return [7 /*endfinally*/];
                case 9: return [2 /*return*/];
            }
        });
    }); }, [parsedFields, validateForm, formValues, whatsappContact, whatsappHeader, whatsappFooter, onSubmit, errors]);
    // Handle form reset
    var handleReset = (0, react_1.useCallback)(function () {
        // Reset to initial values
        var initialValues = {};
        parsedFields.forEach(function (field) {
            if (field.value !== undefined) {
                initialValues[field.name] = field.value;
            }
            else if (parsedDefaultValues[field.name] !== undefined) {
                initialValues[field.name] = parsedDefaultValues[field.name];
            }
            else {
                if (field.type === 'checkbox' && field.multiple) {
                    initialValues[field.name] = [];
                }
                else if (field.type === 'checkbox') {
                    initialValues[field.name] = false;
                }
                else {
                    initialValues[field.name] = '';
                }
            }
        });
        setFormValues(initialValues);
        setErrors({});
        setTouched({});
    }, [parsedFields, parsedDefaultValues]);
    // Get field status for Input component
    var getFieldStatus = (0, react_1.useCallback)(function (fieldName) {
        var error = errors[fieldName];
        var isTouched = touched[fieldName];
        if (error)
            return 'danger';
        if (isTouched && !error && formValues[fieldName] !== '') {
            return 'success';
        }
        return undefined;
    }, [errors, touched, formValues]);
    // Check if form is valid for submission
    var isFormValid = (0, react_1.useMemo)(function () {
        // Check if any required fields are empty
        var hasEmptyRequiredFields = parsedFields.some(function (field) {
            if (!field.required)
                return false;
            var value = formValues[field.name];
            if (field.type === 'checkbox' && field.multiple) {
                return !Array.isArray(value) || value.length === 0;
            }
            if (field.type === 'checkbox') {
                return value === false;
            }
            return !value || value === '';
        });
        // Check if there are any validation errors
        var hasValidationErrors = Object.keys(errors).length > 0;
        return !hasEmptyRequiredFields && !hasValidationErrors;
    }, [parsedFields, formValues, errors]);
    // Submit button disabled state
    var isSubmitDisabled = isSubmitting || isLoading || !isFormValid;
    // Check if WhatsApp is configured
    var hasWhatsApp = !!whatsappContact;
    // Render field based on type - FIXED
    var renderField = (0, react_1.useCallback)(function (field) {
        var _a, _b, _c, _d, _e;
        var status = getFieldStatus(field.name);
        var error = errors[field.name];
        var isTouched = touched[field.name];
        var showError = error && isTouched;
        var value = formValues[field.name];
        // Field wrapper classes
        var wrapperClass = "col min-w-200 field ".concat(showError ? 'field-error' : '').trim();
        // Helper text (error takes priority)
        var helperText = showError ? error : field.helperText;
        // Generate unique ID for the input
        var inputId = ((_a = field.inputProps) === null || _a === void 0 ? void 0 : _a.id) || "form-field-".concat(field.name);
        // Base props for Input component
        var baseProps = __assign({ id: inputId, name: field.name, label: field.label, placeholder: field.placeholder, helperText: helperText, disabled: field.disabled || isLoading, fullWidth: fullWidth }, field.inputProps);
        // Only add status if it's not undefined
        if (status !== undefined) {
            baseProps.status = status;
        }
        // Render based on field type
        switch (field.type) {
            case 'checkbox':
                if ((_b = field.options) === null || _b === void 0 ? void 0 : _b.length) {
                    // Multiple checkboxes (checkbox group)
                    var checkedValues_1 = Array.isArray(value) ? value : [];
                    return (react_1.default.createElement("div", { key: field.name, className: wrapperClass },
                        field.label && (react_1.default.createElement("div", { className: "form-label", style: { marginBottom: '0.5rem' } },
                            react_1.default.createElement(Text_1.default, { text: field.label + (field.required ? ' *' : ''), size: "sm", color: "text", bold: true }))),
                        react_1.default.createElement(Flex_1.default, { direction: "column", gap: "0.5rem" }, field.options.map(function (option, index) {
                            var isChecked = checkedValues_1.includes(option.value);
                            return (react_1.default.createElement(FormCheckbox, { key: "".concat(field.name, "_").concat(index), id: "".concat(inputId, "_").concat(index), label: option.label, checked: isChecked, onChange: function (checked) {
                                    if (checked) {
                                        // Add value to array
                                        var newValues = __spreadArray(__spreadArray([], checkedValues_1, true), [option.value], false);
                                        handleFieldChange(field.name, newValues);
                                    }
                                    else {
                                        // Remove value from array
                                        var newValues = checkedValues_1.filter(function (v) { return v !== option.value; });
                                        handleFieldChange(field.name, newValues);
                                    }
                                }, disabled: field.disabled || option.disabled || isLoading, required: field.required && index === 0, value: option.value }));
                        }))));
                }
                else {
                    // Single checkbox (boolean)
                    return (react_1.default.createElement("div", { key: field.name, className: wrapperClass },
                        react_1.default.createElement(FormCheckbox, { label: field.label, checked: !!value, onChange: function (checked) { return handleFieldChange(field.name, checked); }, disabled: field.disabled || isLoading, required: field.required, id: inputId })));
                }
            case 'radio':
                if (!((_c = field.options) === null || _c === void 0 ? void 0 : _c.length))
                    return null;
                return (react_1.default.createElement("div", { key: field.name, className: wrapperClass },
                    field.label && (react_1.default.createElement("div", { className: "form-label", style: { marginBottom: '0.5rem' } },
                        react_1.default.createElement(Text_1.default, { text: field.label + (field.required ? ' *' : ''), size: "sm", color: "text", bold: true }))),
                    react_1.default.createElement(Flex_1.default, { direction: "column", gap: "0.5rem" }, field.options.map(function (option, index) { return (react_1.default.createElement(FormRadio, { key: "".concat(field.name, "_").concat(index), id: "".concat(inputId, "_").concat(index), label: option.label, checked: value === option.value, onChange: function () { return handleFieldChange(field.name, option.value); }, disabled: field.disabled || option.disabled || isLoading, required: field.required && index === 0, value: option.value })); }))));
            case 'textarea':
                return (react_1.default.createElement("div", { key: field.name, className: wrapperClass },
                    react_1.default.createElement(Input_1.default, __assign({ multiline: true, rows: ((_d = field.inputProps) === null || _d === void 0 ? void 0 : _d.rows) || 4, value: value || '', onChange: handleInputEventChange, onBlur: handleInputEventBlur }, baseProps))));
            case 'select':
                return (react_1.default.createElement("div", { key: field.name, className: wrapperClass },
                    react_1.default.createElement(Input_1.default, __assign({ select: true, options: ((_e = field.options) === null || _e === void 0 ? void 0 : _e.map(function (opt) { return ({ text: opt.label, value: opt.value }); })) || [], value: value || '', onChange: handleInputEventChange, onBlur: handleInputEventBlur }, baseProps))));
            default:
                // text, email, number, tel, date, file, password
                return (react_1.default.createElement("div", { key: field.name, className: wrapperClass },
                    react_1.default.createElement(Input_1.default, __assign({ type: field.type, value: value || '', onChange: handleInputEventChange, onBlur: handleInputEventBlur }, baseProps))));
        }
    }, [errors, touched, formValues, isLoading, getFieldStatus, handleFieldChange, handleInputEventChange, handleInputEventBlur, fullWidth]);
    // Don't render if no fields are configured
    if (parsedFields.length === 0) {
        console.warn('Form: No fields configured. Please provide fields prop or configure via theme.');
        return null;
    }
    return (react_1.default.createElement("div", { className: "form-wrapper p-5 ".concat(centered ? 'center' : '', " ").concat(className), style: { width: "100%", maxWidth: width || "450px" } },
        title && (react_1.default.createElement("div", { className: "form-header", style: { marginBottom: '2rem' } },
            react_1.default.createElement(Text_1.default, { text: title, size: titleSize || "3xl", color: titleColor || "", block: true }),
            description && (react_1.default.createElement(Text_1.default, { article: true, size: descriptionSize || "sm", color: descriptionColor || "" },
                react_1.default.createElement("div", { className: "article text-sm", dangerouslySetInnerHTML: { __html: description } }))))),
        react_1.default.createElement("form", { className: "form", onSubmit: handleSubmit, style: { width: '100%' } },
            react_1.default.createElement(Flex_1.default, { direction: layout === 'horizontal' ? 'row' : 'column', gap: gap, width: '100%' }, parsedFields.map(renderField)),
            react_1.default.createElement(Flex_1.default, { direction: "column", gap: "1rem", style: { marginTop: '2rem', width: fullWidth ? '100%' : undefined } },
                react_1.default.createElement(Button_1.default, { type: "submit", text: hasWhatsApp ? "Send via WhatsApp" : submitText, bg: submitBg || "primary", raised: true, prefix: submitPrefix || hasWhatsApp ? react_1.default.createElement(pi_1.PiWhatsappLogo, null) : react_1.default.createElement(pi_1.PiPaperPlaneTilt, null), suffix: submitSuffix, disabled: isSubmitDisabled, isLoading: isSubmitting || isLoading, fullWidth: fullWidth })))));
};
exports.default = Form;
