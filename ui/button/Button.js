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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var colors_1 = require("../../assets/colors/colors");
var pi_1 = require("react-icons/pi");
function Button(_a) {
    var color = _a.color, bg = _a.bg, funcss = _a.funcss, startIcon = _a.startIcon, endIcon = _a.endIcon, text = _a.text, rounded = _a.rounded, raised = _a.raised, height = _a.height, width = _a.width, float = _a.float, hoverUp = _a.hoverUp, fullWidth = _a.fullWidth, outlined = _a.outlined, small = _a.small, smaller = _a.smaller, big = _a.big, bigger = _a.bigger, jumbo = _a.jumbo, flat = _a.flat, hoverNone = _a.hoverNone, fillAnimation = _a.fillAnimation, fillDirection = _a.fillDirection, fillTextColor = _a.fillTextColor, outlineSize = _a.outlineSize, disabled = _a.disabled, isLoading = _a.isLoading, status = _a.status, children = _a.children, onClick = _a.onClick;
    var classNames = [
        'button',
        "text-".concat(color),
        funcss || '',
        rounded ? 'roundBtn' : '',
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
        outlined ? "outlined text-".concat(color ? color : bg) : bg || '',
        "".concat(fillAnimation ? "".concat(fillTextColor ? "hover-text-".concat(fillTextColor) : '', " button-fill fill-").concat(fillDirection ? fillDirection : 'left') : '')
    ].join(' ');
    return (React.createElement("span", null,
        React.createElement("button", { onClick: onClick, className: "".concat(classNames, " ").concat(startIcon || endIcon ? 'iconic' : ''), style: {
                height: height || '',
                width: fullWidth ? '100%' : width || '',
                borderRadius: flat ? '0rem' : '',
                border: "".concat(outlined ? "".concat(outlineSize ? "".concat(outlineSize, "rem solid ").concat(colors_1.colors["".concat(bg)]) : "0.12rem solid ".concat(colors_1.colors[bg])) : '', " ")
            } },
            isLoading &&
                React.createElement("span", { className: 'rotate btn_left_icon' },
                    React.createElement(pi_1.PiSpinner, null)),
            React.createElement("span", { className: ' btn_left_icon' },
                status === "success" && React.createElement(pi_1.PiCheck, null),
                status === "info" && React.createElement(pi_1.PiInfo, null),
                status === "warning" && React.createElement(pi_1.PiWarning, null),
                status === "danger" && React.createElement(pi_1.PiX, null)),
            fillAnimation ? React.createElement("span", { className: "button_fill_span ".concat(bg) }) : '',
            startIcon && React.createElement("span", { className: "btn_left_icon" }, startIcon),
            text ? text : children,
            endIcon && React.createElement("span", { className: "btn_right_icon" }, endIcon))));
}
exports.default = Button;
