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
function FunLoader(_a) {
    var funcss = _a.funcss, size = _a.size, fixed = _a.fixed, backdrop = _a.backdrop, color = _a.color, variant = _a.variant;
    return (React.createElement("div", { className: "".concat(fixed ? 'fixedLoader' : '', " ").concat(backdrop && fixed ? 'backdropLoader' : '') }, variant === 'simple' ?
        React.createElement(pi_1.PiSpinnerDuotone, { className: "funLoader rotate ".concat(funcss ? funcss : '', "  text-").concat(color ? color : ''), style: { fontSize: size ? size : '' } })
        : variant === 'duotone' ?
            React.createElement(pi_1.PiSpinnerDuotone, { className: "funLoader rotate ".concat(funcss ? funcss : '', "  text-").concat(color ? color : ''), style: { fontSize: size ? size : '' } })
            : variant === 'circle' ?
                React.createElement(pi_1.PiCircleNotch, { className: "funLoader rotate ".concat(funcss ? funcss : '', "  text-").concat(color ? color : ''), style: { fontSize: size ? size : '' } })
                : React.createElement(pi_1.PiSpinner, { className: "funLoader rotate ".concat(funcss ? funcss : '', "  text-").concat(color ? color : ''), style: { fontSize: size ? size : '' } })));
}
exports.default = FunLoader;
