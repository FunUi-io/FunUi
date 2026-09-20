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
exports.default = Button;
var react_1 = __importStar(require("react"));
var pi_1 = require("react-icons/pi");
var componentUtils_1 = require("../../utils/componentUtils");
var getDynamicIcon_1 = require("../../utils/getDynamicIcon");
function Button(_a) {
    var _b, _c;
    var _d = _a.variant, variant = _d === void 0 ? '' : _d, color = _a.color, bg = _a.bg, funcss = _a.funcss, startIcon = _a.startIcon, endIcon = _a.endIcon, stringPrefix = _a.stringPrefix, stringSuffix = _a.stringSuffix, prefix = _a.prefix, suffix = _a.suffix, iconSize = _a.iconSize, _e = _a.iconLineHeight, iconLineHeight = _e === void 0 ? 0 : _e, text = _a.text, rounded = _a.rounded, raised = _a.raised, height = _a.height, width = _a.width, float = _a.float, hoverUp = _a.hoverUp, fullWidth = _a.fullWidth, outlined = _a.outlined, small = _a.small, hoverless = _a.hoverless, smaller = _a.smaller, big = _a.big, bigger = _a.bigger, jumbo = _a.jumbo, flat = _a.flat, hoverNone = _a.hoverNone, fillAnimation = _a.fillAnimation, fillDirection = _a.fillDirection, fillTextColor = _a.fillTextColor, _f = _a.type, type = _f === void 0 ? 'button' : _f, outlineSize = _a.outlineSize, isLoading = _a.isLoading, status = _a.status, bold = _a.bold, children = _a.children, style = _a.style, url = _a.url, onClick = _a.onClick, disabled = _a.disabled, rest = __rest(_a, ["variant", "color", "bg", "funcss", "startIcon", "endIcon", "stringPrefix", "stringSuffix", "prefix", "suffix", "iconSize", "iconLineHeight", "text", "rounded", "raised", "height", "width", "float", "hoverUp", "fullWidth", "outlined", "small", "hoverless", "smaller", "big", "bigger", "jumbo", "flat", "hoverNone", "fillAnimation", "fillDirection", "fillTextColor", "type", "outlineSize", "isLoading", "status", "bold", "children", "style", "url", "onClick", "disabled"]);
    var mergeWithLocal = (0, componentUtils_1.useComponentConfiguration)('Button', variant).mergeWithLocal;
    // Create local props object - these will override config props
    var localProps = __assign({ color: color, bg: bg, funcss: funcss, text: text, rounded: rounded, raised: raised, height: height, width: width, float: float, hoverUp: hoverUp, fullWidth: fullWidth, outlined: outlined, small: small, hoverless: hoverless, smaller: smaller, big: big, bigger: bigger, jumbo: jumbo, flat: flat, hoverNone: hoverNone, fillAnimation: fillAnimation, fillDirection: fillDirection, fillTextColor: fillTextColor, disabled: disabled, outlineSize: outlineSize, isLoading: isLoading, status: status, type: type, bold: bold, stringPrefix: stringPrefix, stringSuffix: stringSuffix }, rest);
    // Merge with config - LOCAL PROPS OVERRIDE CONFIG
    var mergedProps = mergeWithLocal(localProps).props;
    // Extract final values - local props take precedence
    var final = {
        isLoading: isLoading !== null && isLoading !== void 0 ? isLoading : mergedProps.isLoading,
        status: status !== null && status !== void 0 ? status : mergedProps.status,
        text: text !== null && text !== void 0 ? text : mergedProps.text,
        outlined: outlined !== null && outlined !== void 0 ? outlined : mergedProps.outlined,
        bg: bg !== null && bg !== void 0 ? bg : mergedProps.bg,
        color: color !== null && color !== void 0 ? color : mergedProps.color,
        rounded: rounded !== null && rounded !== void 0 ? rounded : mergedProps.rounded,
        hoverless: hoverless !== null && hoverless !== void 0 ? hoverless : mergedProps.hoverless,
        bold: bold !== null && bold !== void 0 ? bold : mergedProps.bold,
        float: float !== null && float !== void 0 ? float : mergedProps.float,
        raised: raised !== null && raised !== void 0 ? raised : mergedProps.raised,
        hoverUp: hoverUp !== null && hoverUp !== void 0 ? hoverUp : mergedProps.hoverUp,
        flat: flat !== null && flat !== void 0 ? flat : mergedProps.flat,
        hoverNone: hoverNone !== null && hoverNone !== void 0 ? hoverNone : mergedProps.hoverNone,
        small: small !== null && small !== void 0 ? small : mergedProps.small,
        smaller: smaller !== null && smaller !== void 0 ? smaller : mergedProps.smaller,
        big: big !== null && big !== void 0 ? big : mergedProps.big,
        bigger: bigger !== null && bigger !== void 0 ? bigger : mergedProps.bigger,
        jumbo: jumbo !== null && jumbo !== void 0 ? jumbo : mergedProps.jumbo,
        type: type !== null && type !== void 0 ? type : mergedProps.type,
        fillAnimation: fillAnimation !== null && fillAnimation !== void 0 ? fillAnimation : mergedProps.fillAnimation,
        fillDirection: fillDirection !== null && fillDirection !== void 0 ? fillDirection : mergedProps.fillDirection,
        fillTextColor: fillTextColor !== null && fillTextColor !== void 0 ? fillTextColor : mergedProps.fillTextColor,
        funcss: funcss !== null && funcss !== void 0 ? funcss : mergedProps.funcss,
        fullWidth: fullWidth !== null && fullWidth !== void 0 ? fullWidth : mergedProps.fullWidth,
        stringPrefix: stringPrefix !== null && stringPrefix !== void 0 ? stringPrefix : mergedProps.stringPrefix,
        stringSuffix: stringSuffix !== null && stringSuffix !== void 0 ? stringSuffix : mergedProps.stringSuffix,
    };
    // State for dynamic icons
    var _g = (0, react_1.useState)(null), dynamicStartIcon = _g[0], setDynamicStartIcon = _g[1];
    var _h = (0, react_1.useState)(null), dynamicEndIcon = _h[0], setDynamicEndIcon = _h[1];
    var _j = (0, react_1.useState)(null), dynamicPrefix = _j[0], setDynamicPrefix = _j[1];
    var _k = (0, react_1.useState)(null), dynamicSuffix = _k[0], setDynamicSuffix = _k[1];
    var _l = (0, react_1.useState)(null), dynamicStringPrefix = _l[0], setDynamicStringPrefix = _l[1];
    var _m = (0, react_1.useState)(null), dynamicStringSuffix = _m[0], setDynamicStringSuffix = _m[1];
    // Function to check if a value is a string (dynamic icon)
    var isStringIcon = function (icon) {
        return typeof icon === 'string' && icon.trim() !== '';
    };
    // Function to check if a value is a ReactNode (static icon)
    var isReactNodeIcon = function (icon) {
        return icon !== undefined && !isStringIcon(icon) && react_1.default.isValidElement(icon);
    };
    // Load dynamic icons from string props
    (0, react_1.useEffect)(function () {
        // Handle startIcon if it's a string
        if (isStringIcon(startIcon)) {
            (0, getDynamicIcon_1.getDynamicIcon)(startIcon).then(function (node) {
                if (node) {
                    setDynamicStartIcon(node);
                }
                else {
                    setDynamicStartIcon(null);
                }
            });
        }
        else {
            setDynamicStartIcon(null);
        }
        // Handle endIcon if it's a string
        if (isStringIcon(endIcon)) {
            (0, getDynamicIcon_1.getDynamicIcon)(endIcon).then(function (node) {
                if (node) {
                    setDynamicEndIcon(node);
                }
                else {
                    setDynamicEndIcon(null);
                }
            });
        }
        else {
            setDynamicEndIcon(null);
        }
        // Handle prefix if it's a string
        if (isStringIcon(prefix)) {
            (0, getDynamicIcon_1.getDynamicIcon)(prefix).then(function (node) {
                if (node) {
                    setDynamicPrefix(node);
                }
                else {
                    setDynamicPrefix(null);
                }
            });
        }
        else {
            setDynamicPrefix(null);
        }
        // Handle suffix if it's a string
        if (isStringIcon(suffix)) {
            (0, getDynamicIcon_1.getDynamicIcon)(suffix).then(function (node) {
                if (node) {
                    setDynamicSuffix(node);
                }
                else {
                    setDynamicSuffix(null);
                }
            });
        }
        else {
            setDynamicSuffix(null);
        }
    }, [startIcon, endIcon, prefix, suffix]);
    // Load dynamic icons from stringPrefix and stringSuffix (backward compatibility)
    (0, react_1.useEffect)(function () {
        if (final.stringPrefix && final.stringPrefix.trim() !== '') {
            (0, getDynamicIcon_1.getDynamicIcon)(final.stringPrefix).then(function (node) {
                if (node) {
                    setDynamicStringPrefix(node);
                }
                else {
                    setDynamicStringPrefix(null);
                }
            });
        }
        else {
            setDynamicStringPrefix(null);
        }
        if (final.stringSuffix && final.stringSuffix.trim() !== '') {
            (0, getDynamicIcon_1.getDynamicIcon)(final.stringSuffix).then(function (node) {
                if (node) {
                    setDynamicStringSuffix(node);
                }
                else {
                    setDynamicStringSuffix(null);
                }
            });
        }
        else {
            setDynamicStringSuffix(null);
        }
    }, [final.stringPrefix, final.stringSuffix]);
    // Determine which start icon to show with proper priority
    var actualStartIcon = (0, react_1.useMemo)(function () {
        if (final.status) {
            // Status icons have highest priority for start position
            switch (final.status) {
                case 'success':
                    return react_1.default.createElement(pi_1.PiCheck, { size: iconSize });
                case 'info':
                    return react_1.default.createElement(pi_1.PiInfo, { size: iconSize });
                case 'warning':
                    return react_1.default.createElement(pi_1.PiWarning, { size: iconSize });
                case 'error':
                    return react_1.default.createElement(pi_1.PiX, { size: iconSize });
                default:
                    return null;
            }
        }
        if (isStringIcon(startIcon)) {
            return dynamicStartIcon;
        }
        if (isReactNodeIcon(startIcon)) {
            return startIcon;
        }
        if (isStringIcon(prefix)) {
            return dynamicPrefix;
        }
        if (isReactNodeIcon(prefix)) {
            return prefix;
        }
        if (dynamicStringPrefix) {
            return dynamicStringPrefix;
        }
        return null;
    }, [
        final.status,
        startIcon,
        prefix,
        dynamicStartIcon,
        dynamicPrefix,
        dynamicStringPrefix,
        iconSize,
    ]);
    // Determine which end icon to show with proper priority
    var actualEndIcon = (0, react_1.useMemo)(function () {
        if (isStringIcon(endIcon)) {
            return dynamicEndIcon;
        }
        if (isReactNodeIcon(endIcon)) {
            return endIcon;
        }
        if (isStringIcon(suffix)) {
            return dynamicSuffix;
        }
        if (isReactNodeIcon(suffix)) {
            return suffix;
        }
        if (dynamicStringSuffix) {
            return dynamicStringSuffix;
        }
        return null;
    }, [endIcon, suffix, dynamicEndIcon, dynamicSuffix, dynamicStringSuffix]);
    var textColorClass = final.bg
        ? final.color
            ? final.color
            : !/\d/.test(final.bg) && !final.outlined
                ? ''
                : /[4-9]\d{2,}/.test(final.bg) && !final.outlined
                    ? 'white'
                    : final.bg.replace(/[0-9]/g, '')
        : final.color;
    // Determine background: status takes priority over bg prop
    var effectiveBg = final.status ? final.status : final.bg;
    var classNames = [
        'button',
        "text-".concat(textColorClass),
        final.funcss || '',
        final.rounded ? 'roundBtn' : '',
        final.hoverless ? 'hoverless' : '',
        final.bold ? 'text-bold' : '',
        final.float ? 'floatBtn' : '',
        final.raised ? 'raisedBtn' : '',
        final.hoverUp ? 'hover-up' : '',
        final.flat ? 'flat' : '',
        final.hoverNone ? 'hoverNone' : '',
        final.small ? 'smallBtn' : final.smaller ? 'smallerBtn' : '',
        final.big ? 'bigBtn' : '',
        final.bigger ? 'biggerBtn' : '',
        final.jumbo ? 'jumboBtn' : '',
        final.outlined
            ? "outlined outline-".concat(effectiveBg || '', " text-").concat(final.color ? final.color : effectiveBg === null || effectiveBg === void 0 ? void 0 : effectiveBg.replace(/[0-9]/g, ''))
            : effectiveBg || '',
        "".concat(final.fillAnimation ? "".concat(final.fillTextColor ? "hover-text-".concat(final.fillTextColor) : "hover-text-white", " button-fill fill-").concat(final.fillDirection || 'left') : ''),
    ].join(' ');
    var iconWrapperStyle = {
        lineHeight: iconLineHeight,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
    };
    // Helper function to render icon with proper size
    var renderIcon = function (icon, className) {
        var _a;
        if (className === void 0) { className = ''; }
        if (!icon)
            return null;
        // If it's a React element that we know accepts size prop
        if (react_1.default.isValidElement(icon)) {
            // Create a wrapper span and clone the icon with size prop if needed
            var iconProps = {};
            // Only add size prop if iconSize is provided and not already set
            if (iconSize && !((_a = icon.props) === null || _a === void 0 ? void 0 : _a.size)) {
                iconProps.size = iconSize;
            }
            // Only clone with props if we have props to add
            if (Object.keys(iconProps).length > 0) {
                return (react_1.default.createElement("span", { className: className, style: iconWrapperStyle }, react_1.default.cloneElement(icon, iconProps)));
            }
            else {
                // Otherwise just render the icon in a span
                return (react_1.default.createElement("span", { className: className, style: iconWrapperStyle }, icon));
            }
        }
        // If it's not a valid React element, just render it as is
        return (react_1.default.createElement("span", { className: className, style: iconWrapperStyle }, icon));
    };
    // Determine if we should show icons on left or right
    var hasStartIcon = Boolean(actualStartIcon);
    var hasEndIcon = Boolean(actualEndIcon);
    return (react_1.default.createElement("span", null,
        react_1.default.createElement("button", __assign({ type: final.type || 'button', disabled: disabled || final.isLoading || false, className: "".concat(classNames, " ").concat((hasStartIcon || hasEndIcon || final.isLoading) ? 'iconic' : ''), style: __assign({ height: (_b = height !== null && height !== void 0 ? height : mergedProps.height) !== null && _b !== void 0 ? _b : '', width: final.fullWidth ? '100%' : (_c = width !== null && width !== void 0 ? width : mergedProps.width) !== null && _c !== void 0 ? _c : '', borderRadius: final.flat ? '0rem' : '' }, style), onClick: onClick || (url ? function () { return (window.location.href = url); } : undefined) }, mergedProps),
            final.isLoading ? (renderIcon(react_1.default.createElement(pi_1.PiSpinner, { className: "rotate" }), 'btn_left_icon')) : (react_1.default.createElement(react_1.default.Fragment, null, hasStartIcon && renderIcon(actualStartIcon, 'btn_left_icon'))),
            final.fillAnimation && react_1.default.createElement("span", { className: "button_fill_span ".concat(effectiveBg) }),
            children ? children : final.text ? final.text : "",
            hasEndIcon && !final.isLoading && renderIcon(actualEndIcon, 'btn_right_icon'))));
}
