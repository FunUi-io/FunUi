'use client';
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
function Text(_a) {
    var id = _a.id, size = _a.size, bg = _a.bg, color = _a.color, children = _a.children, hoverBg = _a.hoverBg, hoverText = _a.hoverText, text = _a.text, heading = _a.heading, funcss = _a.funcss, emp = _a.emp, bold = _a.bold, block = _a.block, body = _a.body, article = _a.article, light = _a.light, lighter = _a.lighter, italic = _a.italic, underline = _a.underline, align = _a.align, lineHeight = _a.lineHeight, letterSpacing = _a.letterSpacing, monospace = _a.monospace, customStyles = _a.customStyles, rest = __rest(_a, ["id", "size", "bg", "color", "children", "hoverBg", "hoverText", "text", "heading", "funcss", "emp", "bold", "block", "body", "article", "light", "lighter", "italic", "underline", "align", "lineHeight", "letterSpacing", "monospace", "customStyles"]);
    var mergedStyles = __assign({ display: block ? 'block' : undefined, fontWeight: bold ? 'bold' : undefined, lineHeight: lineHeight ? lineHeight : undefined, letterSpacing: letterSpacing ? letterSpacing : undefined }, customStyles);
    var classNames = [
        size ? "text-".concat(size) : '',
        color ? "text-".concat(color) : '',
        align ? "text-".concat(align) : '',
        monospace ? 'monospace' : '',
        bg ? bg : '',
        hoverText ? "hover-text-".concat(hoverText) : '',
        hoverBg ? "hover-".concat(hoverBg) : '',
        light ? 'lightText' : lighter ? 'lighterText' : '',
        heading ? heading : '',
        italic ? 'italicText' : '',
        underline ? 'underlineText' : '',
        body ? 'body' : '',
        article ? 'article' : '',
        funcss ? funcss : '',
        emp ? 'emp' : '',
        bold ? 'bold' : '',
    ].filter(Boolean).join(' ');
    if (block) {
        return (React.createElement("div", __assign({ id: id, className: classNames, style: mergedStyles }, rest),
            children,
            text));
    }
    else {
        return (React.createElement("span", __assign({ id: id, className: classNames, style: mergedStyles }, rest),
            children,
            text));
    }
}
exports.default = Text;
