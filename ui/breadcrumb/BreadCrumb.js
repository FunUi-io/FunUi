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
function BreadCrumb(_a) {
    var type = _a.type, funcss = _a.funcss, color = _a.color;
    return (React.createElement("span", null,
        type === 'slash' && (React.createElement("span", { style: {
                margin: '0 0.2rem',
            }, className: " ".concat(funcss ? funcss : '', " ").concat(color ? 'text-' + color : '') }, ' / ')),
        type === 'greater' && (React.createElement("span", { style: {
                margin: '0 0.2rem',
            }, className: " ".concat(funcss ? funcss : '', " ").concat(color ? 'text-' + color : '') },
            React.createElement(pi_1.PiCaretRight, { className: "".concat(color ? "text-".concat(color) : '') }))),
        type === 'less' && (React.createElement("span", { style: {
                margin: '0 0.2rem',
            }, className: " ".concat(funcss ? funcss : '', " ").concat(color ? 'text-' + color : '') },
            React.createElement(pi_1.PiCaretLeft, { className: "".concat(color ? "text-".concat(color) : '') }))),
        type === 'straight' && (React.createElement("span", { style: {
                margin: '0 0.2rem',
            }, className: " ".concat(funcss ? funcss : '', " ").concat(color ? 'text-' + color : '') }, ' | '))));
}
exports.default = BreadCrumb;
