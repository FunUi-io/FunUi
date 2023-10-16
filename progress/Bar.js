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
function ProgressBar(_a) {
    var funcss = _a.funcss, progress = _a.progress, height = _a.height, children = _a.children, content = _a.content, raised = _a.raised, rounded = _a.rounded, bg = _a.bg, lined = _a.lined;
    return (React.createElement(React.Fragment, null, lined ? (React.createElement("div", { className: " ".concat(funcss, " progressBar lined ").concat(bg) },
        children,
        " ",
        content,
        React.createElement("div", { className: " ".concat(funcss, " ").concat(bg, " linedProgress  ").concat(raised ? 'raised' : '', " ").concat(rounded ? 'rounded' : ''), style: { width: "".concat(progress < 101 ? progress : '', "%"), height: "".concat(height, "px") } }))) : (React.createElement("div", { className: "progressBar ".concat(raised ? 'raised' : '', " ").concat(rounded ? 'rounded' : '') },
        React.createElement("div", { className: " ".concat(funcss, " progressInner ").concat(bg, " ").concat(rounded ? 'rounded' : ''), style: {
                width: "".concat(progress < 101 ? progress : '', "%"),
                height: "".concat(height, "px"),
                padding: "".concat(progress > 0 ? '0 1rem' : ''),
            } },
            children,
            " ",
            content)))));
}
exports.default = ProgressBar;
