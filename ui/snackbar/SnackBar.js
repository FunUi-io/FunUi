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
var SnackBar = function (_a) {
    var message = _a.message, close = _a.close, open = _a.open, position = _a.position, funcss = _a.funcss, animation = _a.animation, duration = _a.duration;
    if (open) {
        return (React.createElement("div", null,
            React.createElement("div", { className: "snackbar ".concat(position, " ").concat(funcss), style: { animation: " ".concat(duration, "s ").concat(animation) } },
                React.createElement("div", { className: "snackbar-content" },
                    React.createElement("div", { className: "snackbar-body" }, message),
                    close &&
                        React.createElement("div", null,
                            React.createElement("span", { className: "close-snackbar" },
                                React.createElement("span", null, close)))))));
    }
    else {
        return React.createElement("div", null);
    }
};
exports.default = SnackBar;
