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
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var pi_1 = require("react-icons/pi");
// Mock utilities - replace with your actual imports
var getCssVariableValue = function (varName) {
    if (typeof window === 'undefined')
        return '';
    return getComputedStyle(document.documentElement).getPropertyValue("--".concat(varName)).trim();
};
var useComponentConfiguration = function (componentName, variant) {
    return {
        mergeWithLocal: function (localProps) { return ({ props: localProps }); }
    };
};
var getDynamicIcon = function (iconString) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        // Mock implementation - replace with your actual icon loader
        return [2 /*return*/, null];
    });
}); };
// Custom hook for dynamic icons
var useDynamicIcon = function (iconString) {
    var _a = (0, react_1.useState)(null), iconNode = _a[0], setIconNode = _a[1];
    var _b = (0, react_1.useState)(false), hasValidIcon = _b[0], setHasValidIcon = _b[1];
    (0, react_1.useEffect)(function () {
        if (!iconString || typeof iconString !== 'string' || iconString.trim() === '') {
            setIconNode(null);
            setHasValidIcon(false);
            return;
        }
        getDynamicIcon(iconString).then(function (node) {
            if (node) {
                setIconNode(node);
                setHasValidIcon(true);
            }
            else {
                setIconNode(null);
                setHasValidIcon(false);
            }
        });
    }, [iconString]);
    return { iconNode: iconNode, hasValidIcon: hasValidIcon };
};
// Icon component with dynamic icon support
var AccordionIcon = function (_a) {
    var icon = _a.icon, iconColor = _a.iconColor, _b = _a.iconSize, iconSize = _b === void 0 ? 15 : _b, _c = _a.iconClassName, iconClassName = _c === void 0 ? '' : _c, _d = _a.isExpandIcon, isExpandIcon = _d === void 0 ? false : _d, expandIcon = _a.expandIcon, expandIconColor = _a.expandIconColor, _e = _a.expandIconSize, expandIconSize = _e === void 0 ? 15 : _e, _f = _a.expandIconClassName, expandIconClassName = _f === void 0 ? '' : _f, _g = _a.isOpen, isOpen = _g === void 0 ? false : _g, _h = _a.rotate, rotate = _h === void 0 ? true : _h;
    var iconToUse = isExpandIcon ? expandIcon : icon;
    var colorToUse = isExpandIcon ? expandIconColor : iconColor;
    var sizeToUse = isExpandIcon ? expandIconSize : iconSize;
    var classNameToUse = isExpandIcon ? expandIconClassName : iconClassName;
    var isStringIcon = iconToUse && typeof iconToUse === 'string';
    var _j = useDynamicIcon(isStringIcon ? iconToUse : undefined), dynamicIconNode = _j.iconNode, hasValidDynamicIcon = _j.hasValidIcon;
    var getColorClass = function (color) {
        if (!color)
            return '';
        if (color.startsWith('text-') || color.startsWith('bg-') || color.startsWith('border-')) {
            return color;
        }
        var colorNames = ['primary', 'secondary', 'accent', 'success', 'warning', 'error', 'info', 'dark', 'light'];
        if (colorNames.includes(color)) {
            return "text-".concat(color);
        }
        return '';
    };
    var colorClass = getColorClass(colorToUse);
    var renderIconWithProps = function (iconElement, className, size) {
        if (!react_1.default.isValidElement(iconElement))
            return iconElement;
        var props = {
            className: "".concat(className, " ").concat(colorClass).trim(),
        };
        if (size !== undefined) {
            props.size = size;
        }
        return react_1.default.cloneElement(iconElement, props);
    };
    if (iconToUse && typeof iconToUse !== 'string' && react_1.default.isValidElement(iconToUse)) {
        return renderIconWithProps(iconToUse, "".concat(isExpandIcon ? 'accordion-expand-icon' : 'accordion-icon', " ").concat(classNameToUse, " ").concat(isOpen && rotate ? 'accordion-rotated' : '').trim(), sizeToUse);
    }
    if (isStringIcon && hasValidDynamicIcon && dynamicIconNode) {
        return renderIconWithProps(dynamicIconNode, "".concat(isExpandIcon ? 'accordion-expand-icon' : 'accordion-icon', " ").concat(classNameToUse, " ").concat(isOpen && rotate ? 'accordion-rotated' : '').trim(), sizeToUse);
    }
    if (isExpandIcon && !iconToUse) {
        return (react_1.default.createElement(pi_1.PiCaretDown, { className: "accordion-expand-icon ".concat(expandIconClassName || '', " ").concat(colorClass, " ").concat(isOpen && rotate ? 'accordion-rotated' : '').trim(), style: {
                fontSize: expandIconSize,
                transition: 'transform 0.3s ease',
            } }));
    }
    return null;
};
// Accordion Item Component
var AccordionItem = function (_a) {
    var item = _a.item, index = _a.index, isOpen = _a.isOpen, onToggle = _a.onToggle, globalProps = _a.globalProps, _b = _a.animationDuration, animationDuration = _b === void 0 ? 300 : _b, _c = _a.animationEasing, animationEasing = _c === void 0 ? 'ease' : _c;
    var mergedProps = __assign(__assign({}, globalProps), item);
    var itemClass = mergedProps.itemClass, titleClass = mergedProps.titleClass, iconClass = mergedProps.iconClass, contentClass = mergedProps.contentClass, activeClass = mergedProps.activeClass, icon = mergedProps.icon, iconColor = mergedProps.iconColor, iconSize = mergedProps.iconSize, iconClassName = mergedProps.iconClassName, _d = mergedProps.iconPosition, iconPosition = _d === void 0 ? 'left' : _d, expandIcon = mergedProps.expandIcon, expandIconColor = mergedProps.expandIconColor, expandIconSize = mergedProps.expandIconSize, expandIconClassName = mergedProps.expandIconClassName, _e = mergedProps.expandIconRotate, expandIconRotate = _e === void 0 ? true : _e, titleSize = mergedProps.titleSize, titleWeight = mergedProps.titleWeight, titleColor = mergedProps.titleColor, contentSize = mergedProps.contentSize, contentWeight = mergedProps.contentWeight, contentColor = mergedProps.contentColor, disabled = mergedProps.disabled, customRender = mergedProps.customRender;
    var getBgClass = function (color) {
        if (!color)
            return '';
        if (color.startsWith('bg-')) {
            return color;
        }
        var colorNames = ['primary', 'secondary', 'accent', 'success', 'warning', 'error', 'info', 'dark', 'light'];
        if (colorNames.includes(color)) {
            return "bg-".concat(color);
        }
        return '';
    };
    var getBorderClass = function (color) {
        if (!color)
            return '';
        if (color.startsWith('border-')) {
            return color;
        }
        var colorNames = ['primary', 'secondary', 'accent', 'success', 'warning', 'error', 'info', 'dark', 'light'];
        if (colorNames.includes(color)) {
            return "border-".concat(color);
        }
        if (color === 'borderColor') {
            return 'border-default';
        }
        return '';
    };
    var getTextSizeClass = function (size) {
        if (!size)
            return 'text-sm';
        if (size.startsWith('text-')) {
            return size;
        }
        var validSizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'];
        if (validSizes.includes(size)) {
            return "text-".concat(size);
        }
        return 'text-sm';
    };
    var getTextColorClass = function (color) {
        if (!color)
            return 'text-default';
        if (color.startsWith('text-')) {
            return color;
        }
        var colorNames = ['primary', 'secondary', 'accent', 'success', 'warning', 'error', 'info', 'dark', 'light', 'default', 'muted'];
        if (colorNames.includes(color)) {
            return "text-".concat(color);
        }
        return 'text-default';
    };
    var getSpacingValue = function (value) {
        if (!value)
            return '';
        if (/^\d+$/.test(value)) {
            return "".concat(parseInt(value) * 0.25, "rem");
        }
        return value;
    };
    if (customRender) {
        return customRender(isOpen);
    }
    var titleContent = typeof item.title === 'string' ? (react_1.default.createElement("div", { className: "\n        ".concat(getTextSizeClass(titleSize), " \n        ").concat(getTextColorClass(titleColor), "\n        ").concat(titleClass || '', "\n      ").trim(), style: {
            fontWeight: titleWeight || 400,
        } }, item.title)) : item.title;
    var getContainerClasses = function () {
        var classes = ['accordion-item', 'fade-in-down'];
        if (globalProps.bg) {
            var bgClass = getBgClass(globalProps.bg);
            if (bgClass) {
                classes.push(bgClass);
            }
        }
        if (globalProps.border) {
            classes.push('border');
            var borderClass = getBorderClass(globalProps.borderColor);
            if (borderClass) {
                classes.push(borderClass);
            }
        }
        if (globalProps.borderRadius) {
            var radius = getSpacingValue(globalProps.borderRadius);
            if (radius === '0.25rem')
                classes.push('rounded-sm');
            else if (radius === '0.5rem')
                classes.push('rounded-md');
            else if (radius === '0.75rem')
                classes.push('rounded-lg');
            else if (radius === '1rem')
                classes.push('rounded-xl');
        }
        if (globalProps.shadow && globalProps.shadow !== 'none') {
            classes.push("shadow-".concat(globalProps.shadow));
        }
        if (isOpen) {
            classes.push(activeClass || 'active');
        }
        if (disabled) {
            classes.push('disabled');
        }
        if (itemClass) {
            classes.push(itemClass);
        }
        return classes.filter(Boolean).join(' ');
    };
    return (react_1.default.createElement("div", { className: getContainerClasses(), style: {
            marginBottom: getSpacingValue(globalProps.gap) || '0.5rem',
            overflow: 'visible',
        } },
        react_1.default.createElement("div", { className: "accordion-header ".concat(titleClass || ''), onClick: !disabled ? function () { return onToggle(index); } : undefined, role: "button", tabIndex: disabled ? -1 : 0, "aria-expanded": isOpen, onKeyDown: function (e) {
                if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
                    e.preventDefault();
                    onToggle(index);
                }
            }, style: {
                cursor: disabled ? 'not-allowed' : 'pointer',
                opacity: disabled ? 0.6 : 1,
                padding: getSpacingValue(globalProps.padding) || '0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            } },
            react_1.default.createElement("div", { style: { display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1 } },
                iconPosition === 'left' && (react_1.default.createElement(AccordionIcon, { icon: icon, iconColor: iconColor, iconSize: iconSize, iconClassName: iconClass || iconClassName, isOpen: isOpen })),
                react_1.default.createElement("div", { className: "col", style: { flex: 1 } }, titleContent),
                iconPosition === 'right' && (react_1.default.createElement(AccordionIcon, { icon: icon, iconColor: iconColor, iconSize: iconSize, iconClassName: iconClass || iconClassName, isOpen: isOpen }))),
            react_1.default.createElement("div", { style: { lineHeight: 0 } },
                react_1.default.createElement(AccordionIcon, { isExpandIcon: true, expandIcon: expandIcon, expandIconColor: expandIconColor, expandIconSize: expandIconSize, expandIconClassName: expandIconClassName, isOpen: isOpen, rotate: expandIconRotate }))),
        react_1.default.createElement("div", { className: "accordion-content ".concat(contentClass || '', " ").concat(isOpen ? 'open' : ''), style: {
                maxHeight: isOpen ? '999999999999999px' : '0',
                overflow: 'visible',
                opacity: isOpen ? 1 : 0,
                visibility: isOpen ? 'visible' : 'hidden',
                transition: "max-height ".concat(animationDuration, "ms ").concat(animationEasing),
                padding: isOpen ? getSpacingValue(globalProps.padding) || '0.5rem 0' : '0',
                backgroundColor: globalProps.contentBg ? getBgClass(globalProps.contentBg) : '',
                borderTop: isOpen && globalProps.border ? "1px solid ".concat(getCssVariableValue(globalProps.borderColor) || 'var(--borderColor)') : 'none',
            } },
            react_1.default.createElement("div", { className: "\n            accordion-inner\n            ".concat(getTextSizeClass(contentSize), "\n            ").concat(getTextColorClass(contentColor), "\n          ").trim(), style: {
                    opacity: isOpen ? 1 : 0,
                    transition: "opacity ".concat(animationDuration, "ms ").concat(animationEasing),
                    fontWeight: contentWeight || 400,
                    lineHeight: 1.6,
                } }, item.content))));
};
// Main Accordion Component
var Accordion = function (localProps) {
    var mergeWithLocal = useComponentConfiguration('Accordion', localProps.variant).mergeWithLocal;
    var mergedProps = mergeWithLocal(localProps).props;
    var final = mergedProps;
    var _a = (0, react_1.useState)([]), itemsArray = _a[0], setItemsArray = _a[1];
    // Parse items from JSON string if needed
    (0, react_1.useEffect)(function () {
        if (typeof final.items === 'string') {
            try {
                var parsed = JSON.parse(final.items);
                setItemsArray(Array.isArray(parsed) ? parsed : [parsed]);
            }
            catch (error) {
                console.error('Error parsing items JSON:', error);
                setItemsArray([]);
            }
        }
        else if (Array.isArray(final.items)) {
            setItemsArray(final.items);
        }
        else {
            setItemsArray([]);
        }
    }, [final.items]);
    // Initialize open indexes using useMemo to compute initial value
    var initialOpenIndexes = react_1.default.useMemo(function () {
        if (final.allowMultiple) {
            return final.defaultOpenIndexes || [];
        }
        else {
            return final.defaultOpenIndexes && final.defaultOpenIndexes.length > 0
                ? [final.defaultOpenIndexes[0]]
                : [];
        }
    }, [final.allowMultiple, final.defaultOpenIndexes]);
    var _b = (0, react_1.useState)(initialOpenIndexes), openIndexes = _b[0], setOpenIndexes = _b[1];
    var toggleIndex = function (index) {
        setOpenIndexes(function (prevOpenIndexes) {
            var newOpenIndexes = [];
            if (final.allowMultiple) {
                if (prevOpenIndexes.includes(index)) {
                    newOpenIndexes = prevOpenIndexes.filter(function (i) { return i !== index; });
                }
                else {
                    newOpenIndexes = __spreadArray(__spreadArray([], prevOpenIndexes, true), [index], false);
                }
            }
            else {
                newOpenIndexes = prevOpenIndexes.includes(index) ? [] : [index];
            }
            // Call callback if provided
            if (final.onItemToggle) {
                final.onItemToggle(index, !prevOpenIndexes.includes(index));
            }
            return newOpenIndexes;
        });
    };
    var getContainerClasses = function () {
        var classes = ['accordion'];
        if (final.className) {
            classes.push(final.className);
        }
        if (final.funcss) {
            classes.push(final.funcss);
        }
        return classes.filter(Boolean).join(' ');
    };
    var getSpacingValue = function (value) {
        if (!value)
            return '';
        if (/^\d+$/.test(value)) {
            return "".concat(parseInt(value) * 0.25, "rem");
        }
        return value;
    };
    var getContainerStyles = function () {
        var styles = {};
        if (final.margin) {
            var marginValue = getSpacingValue(final.margin);
            if (marginValue) {
                styles.margin = marginValue;
            }
        }
        if (final.style) {
            Object.assign(styles, final.style);
        }
        return styles;
    };
    if (itemsArray.length === 0) {
        return null;
    }
    return (react_1.default.createElement("div", { className: getContainerClasses(), style: getContainerStyles() }, itemsArray.map(function (item, index) { return (react_1.default.createElement(AccordionItem, { key: index, item: item, index: index, isOpen: openIndexes.includes(index), onToggle: toggleIndex, globalProps: final, animationDuration: final.animationDuration, animationEasing: final.animationEasing })); })));
};
exports.default = Accordion;
