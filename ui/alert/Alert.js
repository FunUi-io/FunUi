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
var pi_1 = require("react-icons/pi");
function Alert(_a) {
    var message = _a.message, funcss = _a.funcss, type = _a.type, outlined = _a.outlined, fixed = _a.fixed, raised = _a.raised, fullWidth = _a.fullWidth, isLoading = _a.isLoading, children = _a.children;
    return (React.createElement("div", { className: "".concat(fixed ? 'alert-container ' : '', "\n       ").concat(fixed === "top-left" ? "top-left" : "", "\n      ").concat(fixed === "top-right" ? "top-right" : "", "\n      ").concat(fixed === "bottom-left" ? "bottom-left" : "", "\n      ").concat(fixed === "bottom-right" ? "bottom-right" : "", "\n      ").concat(fixed === "middle" ? "middle-alert" : "", "\n      ").concat(fixed === "top-middle" ? "top-middle" : "", "\n      ").concat(fixed === "bottom-middle" ? "bottom-middle" : "") },
        outlined ? (React.createElement("div", { style: {
                animation: "".concat(0.3, "s ").concat("ScaleUp"),
            }, className: "alert ".concat(raised ? 'raised' : '', " ").concat(type, "-outline\n\n ").concat(fullWidth ? "width-100-p" : "", "\n ") },
            React.createElement("div", { className: "alert-icon" }, !isLoading ? (React.createElement("div", null,
                type === "success" && React.createElement(pi_1.PiCheck, null),
                type === "info" && React.createElement(pi_1.PiInfo, null),
                type === "warning" && React.createElement(pi_1.PiWarning, null),
                type === "danger" && React.createElement(pi_1.PiX, null))) : (React.createElement("span", { className: 'rotate' },
                " ",
                React.createElement(pi_1.PiSpinner, null),
                " "))),
            React.createElement("div", { className: "alert-text" }, message ? message : children ? children : ""))) : (""),
        !outlined ? (React.createElement("div", { style: {
                animation: "".concat(0.3, "s ").concat("ScaleUp"),
            }, className: "alert ".concat(raised ? 'raised' : '', " ").concat(funcss || "", " ").concat(type, "\n ").concat(fullWidth ? "width-100-p" : "", "\n") },
            React.createElement("div", { className: "alert-icon" }, !isLoading ? (React.createElement("div", null,
                type === "success" && React.createElement(pi_1.PiCheck, null),
                type === "info" && React.createElement(pi_1.PiInfo, null),
                type === "warning" && React.createElement(pi_1.PiWarning, null),
                type === "danger" && React.createElement(pi_1.PiX, null))) : (React.createElement("span", { className: 'rotate' },
                " ",
                React.createElement(pi_1.PiSpinner, null),
                " "))),
            React.createElement("div", { className: "alert-text" }, message ? message : children ? children : ""))) : ("")));
}
exports.default = Alert;
