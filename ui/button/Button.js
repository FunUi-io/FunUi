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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var React = __importStar(require("react"));
var pi_1 = require("react-icons/pi");
function Button(_a) {
    var color = _a.color, bg = _a.bg, funcss = _a.funcss, startIcon = _a.startIcon, endIcon = _a.endIcon, text = _a.text, rounded = _a.rounded, raised = _a.raised, height = _a.height, width = _a.width, float = _a.float, hoverUp = _a.hoverUp, fullWidth = _a.fullWidth, outlined = _a.outlined, small = _a.small, hoverless = _a.hoverless, smaller = _a.smaller, big = _a.big, bigger = _a.bigger, jumbo = _a.jumbo, flat = _a.flat, hoverNone = _a.hoverNone, fillAnimation = _a.fillAnimation, fillDirection = _a.fillDirection, fillTextColor = _a.fillTextColor, outlineSize = _a.outlineSize, isLoading = _a.isLoading, status = _a.status, children = _a.children, bold = _a.bold, style = _a.style, onClick = _a.onClick, rest = __rest(_a, ["color", "bg", "funcss", "startIcon", "endIcon", "text", "rounded", "raised", "height", "width", "float", "hoverUp", "fullWidth", "outlined", "small", "hoverless", "smaller", "big", "bigger", "jumbo", "flat", "hoverNone", "fillAnimation", "fillDirection", "fillTextColor", "outlineSize", "isLoading", "status", "children", "bold", "style", "onClick"]);
    function removeNumbers(text) {
        return text.replace(/[0-9]/g, '');
    }
    function hasNumberAbove(text) {
        var matches = text.match(/\d+/g); // find all numbers in the string
        if (!matches)
            return false;
        return matches.some(function (num) { return parseInt(num) >= 400; });
    }
    function hasNumber(text) {
        return /\d/.test(text);
    }
    var classNames = [
        'button',
        "text-".concat(color ? color : !hasNumber(bg) && !outlined ? "white" : hasNumberAbove(bg) && !outlined ? "white" : removeNumbers(bg)),
        funcss || '',
        rounded ? 'roundBtn' : '',
        hoverless ? 'hoverless' : '',
        bold ? 'text-bold' : '',
        float ? 'floatBtn' : '',
        raised ? 'raisedBtn' : '',
        hoverUp ? 'hover-up' : '',
        flat ? 'flat' : '',
        hoverNone ? 'hoverNone' : '',
        small ? 'smallBtn' :
            smaller ? 'smallerBtn' : '',
        big ? 'bigBtn' : '',
        bigger ? 'biggerBtn' : '',
        jumbo ? 'jumboBtn' : '',
        outlined ? "outlined outline-".concat(bg || '', " text-").concat(color ? color : removeNumbers(bg)) : bg || '',
        "".concat(fillAnimation ? "".concat(fillTextColor ? "hover-text-".concat(fillTextColor) : '', " button-fill fill-").concat(fillDirection ? fillDirection : 'left') : '')
    ].join(' ');
    return (React.createElement("span", null,
        React.createElement("button", __assign({ className: "".concat(classNames, " ").concat(startIcon || endIcon || status || isLoading ? 'iconic' : ''), style: __assign({ height: height || '', width: fullWidth ? '100%' : width || '', borderRadius: flat ? '0rem' : '' }, style), onClick: onClick }, rest),
            isLoading &&
                React.createElement("span", { className: 'rotate btn_left_icon', style: { lineHeight: "0" } },
                    React.createElement(pi_1.PiSpinner, null)),
            status &&
                React.createElement("span", { className: ' btn_left_icon', style: { lineHeight: "0" } },
                    status === "success" && React.createElement(pi_1.PiCheck, null),
                    status === "info" && React.createElement(pi_1.PiInfo, null),
                    status === "warning" && React.createElement(pi_1.PiWarning, null),
                    status === "danger" && React.createElement(pi_1.PiX, null)),
            fillAnimation ? React.createElement("span", { className: "button_fill_span ".concat(bg) }) : '',
            startIcon && React.createElement("span", { className: "btn_left_icon", style: { lineHeight: "0" } }, startIcon),
            text ? text : children,
            endIcon && React.createElement("span", { className: "btn_right_icon", style: { lineHeight: "0" } }, endIcon))));
}
exports.default = Button;
