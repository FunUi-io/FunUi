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
function FunLoader(_a) {
    var funcss = _a.funcss, size = _a.size, fixed = _a.fixed, backdrop = _a.backdrop, color = _a.color, variant = _a.variant, rest = __rest(_a, ["funcss", "size", "fixed", "backdrop", "color", "variant"]);
    return (React.createElement("div", __assign({ className: "".concat(fixed ? 'fixedLoader' : '', " ").concat(backdrop && fixed ? 'backdropLoader' : '') }, rest), variant === 'simple' ?
        React.createElement("span", { className: "rotate ".concat(funcss ? funcss : '', "  text-").concat(color ? color : '') },
            React.createElement(pi_1.PiSpinnerDuotone, { style: { fontSize: size + "px" } }))
        : variant === 'duotone' ?
            React.createElement("span", { className: "rotate ".concat(funcss ? funcss : '', "  text-").concat(color ? color : '') },
                React.createElement(pi_1.PiSpinnerDuotone, { style: { fontSize: size + "px" } }),
                "     ")
            : variant === 'circle' ?
                React.createElement("span", { className: "rotate ".concat(funcss ? funcss : '', "  text-").concat(color ? color : '') },
                    React.createElement(pi_1.PiCircleNotch, { style: { fontSize: size + "px" } }))
                : React.createElement("span", { className: "rotate ".concat(funcss ? funcss : '', "  text-").concat(color ? color : '') },
                    React.createElement(pi_1.PiSpinner, { style: { fontSize: size + "px" } }))));
}
exports.default = FunLoader;
