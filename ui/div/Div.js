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
var Div = function (_a) {
    var children = _a.children, funcss = _a.funcss, content = _a.content, minHeight = _a.minHeight, maxHeight = _a.maxHeight, maxWidth = _a.maxWidth, minWidth = _a.minWidth, height = _a.height, width = _a.width, padding = _a.padding, margin = _a.margin, fit = _a.fit, customStyle = _a.customStyle, onClick = _a.onClick;
    return (React.createElement("div", null, customStyle ? (React.createElement("div", { onClick: onClick, className: "".concat(fit ? 'width-100-p height-100-p' : '', " ").concat(funcss), style: customStyle }, content || children)) : (React.createElement("div", { onClick: onClick, className: "".concat(fit ? 'width-100-p height-100-p' : '', " ").concat(funcss), style: {
            height: height || '',
            maxHeight: maxHeight || '',
            minHeight: minHeight || '',
            maxWidth: maxWidth || '',
            minWidth: minWidth || '',
            width: width || '',
            padding: padding || '',
            margin: margin || '',
        } }, content || children))));
};
exports.default = Div;
