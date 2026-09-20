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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var componentUtils_1 = require("../../utils/componentUtils");
var Text_1 = __importDefault(require("../text/Text"));
var Button_1 = __importDefault(require("../button/Button"));
var Flex_1 = __importDefault(require("../flex/Flex"));
var getDynamicIcon_1 = require("../../utils/getDynamicIcon");
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
        (0, getDynamicIcon_1.getDynamicIcon)(iconString).then(function (node) {
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
// Icon component
var NotificationIcon = function (_a) {
    var icon = _a.icon, iconColor = _a.iconColor, _b = _a.iconSize, iconSize = _b === void 0 ? 20 : _b, _c = _a.iconClassName, iconClassName = _c === void 0 ? '' : _c;
    var isStringIcon = icon && typeof icon === 'string';
    var _d = useDynamicIcon(isStringIcon ? icon : undefined), dynamicIconNode = _d.iconNode, hasValidDynamicIcon = _d.hasValidIcon;
    // Get color class from color name
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
    var colorClass = getColorClass(iconColor);
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
    if (icon && typeof icon !== 'string' && react_1.default.isValidElement(icon)) {
        return renderIconWithProps(icon, "notification__icon ".concat(iconClassName).trim(), iconSize);
    }
    if (isStringIcon && hasValidDynamicIcon && dynamicIconNode) {
        return renderIconWithProps(dynamicIconNode, "notification__icon ".concat(iconClassName).trim(), iconSize);
    }
    return null;
};
// Helper function to convert spacing string to number for Flex component
var getFlexGap = function (value) {
    if (!value)
        return 0.5; // Default gap for Flex
    // If it's already a number string (like "0.5"), convert to number
    if (/^\d+(\.\d+)?$/.test(value)) {
        return parseFloat(value);
    }
    // If it has a unit (like "0.5rem", "8px", "1em"), extract the number part
    var match = value.match(/^(\d+(\.\d+)?)/);
    if (match) {
        var num = parseFloat(match[1]);
        // Convert rem to equivalent number (1rem = 4 in Flex component spacing system)
        if (value.includes('rem')) {
            return num * 4; // Assuming Flex uses a base unit where 1 = 0.25rem
        }
        // Convert px to approximate number (assuming 1px ≈ 0.0625rem ≈ 0.25 in Flex system)
        if (value.includes('px')) {
            return num / 4; // Rough approximation
        }
        // For other units or unitless numbers, just return the number
        return num;
    }
    return 0.5; // Default fallback
};
// Helper function to get spacing value with unit for CSS
var getSpacingValue = function (value) {
    if (!value)
        return '';
    // If it's just a number, convert to rem (assuming number * 0.25rem)
    if (/^\d+$/.test(value)) {
        return "".concat(parseInt(value) * 0.25, "rem");
    }
    // If it's a decimal number without unit, also convert to rem
    if (/^\d+(\.\d+)?$/.test(value)) {
        return "".concat(parseFloat(value) * 0.25, "rem");
    }
    // If it already has a unit, return as-is
    return value;
};
// Notification Header Component
var NotificationHeader = function (_a) {
    var globalProps = _a.globalProps;
    var avatarUrl = globalProps.avatarUrl, _b = globalProps.avatarAlt, avatarAlt = _b === void 0 ? 'Avatar' : _b, _c = globalProps.avatarSize, avatarSize = _c === void 0 ? 60 : _c, _d = globalProps.avatarClassName, avatarClassName = _d === void 0 ? '' : _d, _e = globalProps.avatarRounded, avatarRounded = _e === void 0 ? '50%' : _e, title = globalProps.title, titleSize = globalProps.titleSize, titleWeight = globalProps.titleWeight, titleColor = globalProps.titleColor, titleClassName = globalProps.titleClassName, titleVariant = globalProps.titleVariant, subtitle = globalProps.subtitle, subtitleSize = globalProps.subtitleSize, subtitleWeight = globalProps.subtitleWeight, subtitleColor = globalProps.subtitleColor, subtitleClassName = globalProps.subtitleClassName, subtitleVariant = globalProps.subtitleVariant, timestamp = globalProps.timestamp, timestampSize = globalProps.timestampSize, timestampColor = globalProps.timestampColor, timestampClassName = globalProps.timestampClassName, icon = globalProps.icon, iconColor = globalProps.iconColor, iconSize = globalProps.iconSize, iconClassName = globalProps.iconClassName, _f = globalProps.iconPosition, iconPosition = _f === void 0 ? 'right' : _f, _g = globalProps.headerGap, headerGap = _g === void 0 ? '0.75rem' : _g, _h = globalProps.headerAlign, headerAlign = _h === void 0 ? 'start' : _h, _j = globalProps.headerJustify, headerJustify = _j === void 0 ? 'between' : _j;
    // Get background class from color name
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
    if (!title && !subtitle && !avatarUrl && !icon) {
        return null;
    }
    return (react_1.default.createElement("div", { className: "notification__header ".concat(getBgClass(globalProps.headerBg)), style: {
            display: 'flex',
            alignItems: headerAlign,
            justifyContent: headerJustify,
            gap: getSpacingValue(headerGap),
        } },
        react_1.default.createElement("div", { className: "col", style: { flex: 1 } },
            react_1.default.createElement(Flex_1.default, { alignItems: "flex-start", gap: getFlexGap(headerGap), width: '100%' },
                avatarUrl && (react_1.default.createElement("img", { src: avatarUrl, alt: avatarAlt, className: "notification__avatar ".concat(avatarClassName), style: {
                        width: avatarSize,
                        height: avatarSize,
                        borderRadius: avatarRounded,
                        objectFit: 'cover',
                    } })),
                react_1.default.createElement("div", { className: "col", style: { flex: 1 } },
                    react_1.default.createElement(Flex_1.default, { gap: 0.25, direction: 'column', fit: true },
                        title && (react_1.default.createElement(Text_1.default, { variant: titleVariant, block: true, size: titleSize || 'md', weight: titleWeight || 600, color: titleColor || 'default', funcss: "notification__title ".concat(titleClassName || '') }, title)),
                        subtitle && (react_1.default.createElement(Text_1.default, { block: true, size: subtitleSize || 'sm', weight: subtitleWeight || 400, lineHeight: '0.9', color: subtitleColor || 'muted', funcss: "notification__subtitle ".concat(subtitleClassName || '') }, subtitle)),
                        timestamp && (react_1.default.createElement(Text_1.default, { size: timestampSize || 'xs', color: timestampColor || 'light', funcss: "notification__timestamp ".concat(timestampClassName || ''), style: {
                                marginTop: '0.25rem',
                                opacity: 0.7,
                            } }, timestamp)))))),
        icon && iconPosition === 'right' && (react_1.default.createElement(NotificationIcon, { icon: icon, iconColor: iconColor, iconSize: iconSize, iconClassName: iconClassName })),
        icon && iconPosition === 'left' && (react_1.default.createElement(NotificationIcon, { icon: icon, iconColor: iconColor, iconSize: iconSize, iconClassName: iconClassName }))));
};
// Notification Content Component
var NotificationContent = function (_a) {
    var globalProps = _a.globalProps;
    var content = globalProps.content, contentSize = globalProps.contentSize, contentWeight = globalProps.contentWeight, contentColor = globalProps.contentColor, contentClassName = globalProps.contentClassName, contentVariant = globalProps.contentVariant;
    if (!content) {
        return null;
    }
    if (typeof content === 'string') {
        return (react_1.default.createElement(Text_1.default, { block: true, size: contentSize || 'md', weight: contentWeight || 400, color: contentColor || '', funcss: "notification__content ".concat(contentClassName || '') },
            react_1.default.createElement("div", { dangerouslySetInnerHTML: { __html: content } })));
    }
    return (react_1.default.createElement("div", { className: "notification__content ".concat(contentClassName || '') }, content));
};
// Notification Footer Component
var NotificationFooter = function (_a) {
    var globalProps = _a.globalProps, onClose = _a.onClose;
    var ctaText = globalProps.ctaText, ctaUrl = globalProps.ctaUrl, ctaVariant = globalProps.ctaVariant, ctaOnClick = globalProps.ctaOnClick, ctaClassName = globalProps.ctaClassName, ctaCss = globalProps.ctaCss, _b = globalProps.ctaAlign, ctaAlign = _b === void 0 ? 'right' : _b;
    var handleCTAClick = function (url) {
        if (url) {
            window.open(url, '_blank');
            return;
        }
        if (ctaOnClick) {
            ctaOnClick();
        }
        if (onClose) {
            onClose();
        }
    };
    if (!ctaText && !onClose) {
        return null;
    }
    return (react_1.default.createElement("div", { className: "notification__footer", style: {
            display: 'flex',
            justifyContent: ctaAlign === 'left' ? 'flex-start' : ctaAlign === 'center' ? 'center' : 'flex-end',
            gap: getSpacingValue('0.75rem'), // Using getSpacingValue for consistency
        } },
        ctaText && (react_1.default.createElement(Button_1.default, { url: ctaUrl, onClick: function () { return handleCTAClick(ctaUrl); }, funcss: "".concat(ctaClassName || '', " ").concat(ctaCss || ''), text: ctaText })),
        onClose && (react_1.default.createElement(Button_1.default, { onClick: onClose, funcss: "notification__close-btn", text: "Dismiss", style: {
                color: 'var(--text-muted)',
                opacity: 0.7,
            } }))));
};
// Main Notification Component
var Notification = function (localProps) {
    var mergeWithLocal = (0, componentUtils_1.useComponentConfiguration)('Notification', localProps.variant).mergeWithLocal;
    var mergedProps = mergeWithLocal(localProps).props;
    var final = mergedProps;
    var _a = (0, react_1.useState)(final.state || false), isOpen = _a[0], setIsOpen = _a[1];
    // Handle state changes
    (0, react_1.useEffect)(function () {
        if (final.state !== undefined) {
            setIsOpen(final.state);
            if (final.state && final.onOpen) {
                final.onOpen();
            }
        }
    }, [final.state]);
    // Auto-hide timer
    (0, react_1.useEffect)(function () {
        if (isOpen && final.autoHide) {
            var duration = final.autoHideDuration || 5;
            var timer_1 = setTimeout(function () {
                handleClose();
            }, duration * 1000);
            return function () { return clearTimeout(timer_1); };
        }
    }, [isOpen, final.autoHide, final.autoHideDuration]);
    var handleClose = function () {
        if (final.setOpen) {
            final.setOpen(false);
        }
        else {
            setIsOpen(false);
        }
        if (final.onClose) {
            final.onClose();
        }
    };
    // Get background class from color name
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
    // Get border class from color name
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
        return color === 'borderColor' ? 'border-default' : '';
    };
    var getAnimationStyle = function () {
        if (!final.animation || final.animation === 'none') {
            return {};
        }
        var duration = final.duration || 0.3;
        return {
            animation: "".concat(duration, "s ").concat(final.animation),
        };
    };
    var getPositionStyle = function () {
        var position = final.position || 'top-right';
        var positionStyles = {
            'top-right': {
                top: '20px',
                right: '20px',
            },
            'top-left': {
                top: '20px',
                left: '20px',
            },
            'bottom-right': {
                bottom: '20px',
                right: '20px',
            },
            'bottom-left': {
                bottom: '20px',
                left: '20px',
            },
            'top-center': {
                top: '20px',
                left: '50%',
                transform: 'translateX(-50%)',
            },
            'bottom-center': {
                bottom: '20px',
                left: '50%',
                transform: 'translateX(-50%)',
            }
        };
        return __assign(__assign({ position: final.testing ? 'absolute' : 'fixed' }, positionStyles[position]), { zIndex: final.zIndex || 1000 });
    };
    var getContainerClasses = function () {
        var classes = ['notification'];
        // Background class
        if (final.bg) {
            var bgClass = getBgClass(final.bg);
            if (bgClass) {
                classes.push(bgClass);
            }
        }
        // Border classes
        if (final.border) {
            classes.push('border');
            var borderClass = getBorderClass(final.borderColor);
            if (borderClass) {
                classes.push(borderClass);
            }
        }
        // Border radius
        var borderRadius = getSpacingValue(final.borderRadius);
        if (borderRadius === '0.25rem')
            classes.push('rounded-sm');
        else if (borderRadius === '0.5rem')
            classes.push('rounded-md');
        else if (borderRadius === '0.75rem')
            classes.push('rounded-lg');
        else if (borderRadius === '1rem')
            classes.push('rounded-xl');
        // Shadow
        if (final.shadow && final.shadow !== 'none') {
            classes.push("".concat(final.shadow ? "card" : ''));
        }
        // Custom classes
        if (final.className) {
            classes.push(final.className);
        }
        if (final.funcss) {
            classes.push(final.funcss);
        }
        return classes.filter(Boolean).join(' ');
    };
    var getContainerStyles = function () {
        return __assign(__assign(__assign(__assign({ width: final.width || '450px', maxWidth: final.maxWidth || '90vw', padding: getSpacingValue(final.padding) || '1.25rem', margin: getSpacingValue(final.margin) || '0', borderWidth: final.borderWidth || '1px' }, getAnimationStyle()), getPositionStyle()), final.style), { boxShadow: "var(--card)" });
    };
    if (!isOpen) {
        return null;
    }
    return (react_1.default.createElement("div", { className: getContainerClasses(), style: getContainerStyles() },
        react_1.default.createElement(NotificationHeader, { globalProps: final }),
        react_1.default.createElement(NotificationContent, { globalProps: final }),
        react_1.default.createElement(NotificationFooter, { globalProps: final, onClose: handleClose }),
        final.children));
};
exports.default = Notification;
