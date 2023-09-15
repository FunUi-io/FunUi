'use client';
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
function Circle(_a) {
    var size = _a.size, funcss = _a.funcss, bg = _a.bg, content = _a.content, children = _a.children, hoverable = _a.hoverable;
    return (React.createElement("div", null,
        React.createElement("div", { className: "pointer avatar ".concat(funcss || '', " ").concat(bg || '', " ").concat(hoverable ? 'hoverable' : ''), style: {
                width: "".concat(size + "rem" || '2.3rem'),
                height: "".concat(size + "rem" || '2.3rem'),
            } },
            React.createElement(React.Fragment, null, children))));
}
exports.default = Circle;
