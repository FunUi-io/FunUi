"use strict";
'use client';
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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
var View = function (_a) {
    var children = _a.children, content = _a.content, _b = _a.funcss, funcss = _b === void 0 ? '' : _b, _c = _a.customStyle, customStyle = _c === void 0 ? {} : _c, height = _a.height, width = _a.width, minHeight = _a.minHeight, maxHeight = _a.maxHeight, minWidth = _a.minWidth, maxWidth = _a.maxWidth, padding = _a.padding, margin = _a.margin, gap = _a.gap, fit = _a.fit, display = _a.display, flexDirection = _a.flexDirection, justifyContent = _a.justifyContent, alignItems = _a.alignItems, background = _a.background, color = _a.color, border = _a.border, borderRadius = _a.borderRadius, boxShadow = _a.boxShadow, position = _a.position, top = _a.top, left = _a.left, right = _a.right, bottom = _a.bottom, zIndex = _a.zIndex, overflow = _a.overflow, id = _a.id, title = _a.title, role = _a.role, ariaLabel = _a.ariaLabel, onClick = _a.onClick, onMouseEnter = _a.onMouseEnter, onMouseLeave = _a.onMouseLeave, onFocus = _a.onFocus, onBlur = _a.onBlur, rest = __rest(_a, ["children", "content", "funcss", "customStyle", "height", "width", "minHeight", "maxHeight", "minWidth", "maxWidth", "padding", "margin", "gap", "fit", "display", "flexDirection", "justifyContent", "alignItems", "background", "color", "border", "borderRadius", "boxShadow", "position", "top", "left", "right", "bottom", "zIndex", "overflow", "id", "title", "role", "ariaLabel", "onClick", "onMouseEnter", "onMouseLeave", "onFocus", "onBlur"]);
    return (React.createElement("div", __assign({ id: id, title: title, role: role, "aria-label": ariaLabel, className: "".concat(fit ? 'width-100-p height-100-p' : '', " ").concat(funcss), style: __assign({ display: display, flexDirection: flexDirection, justifyContent: justifyContent, alignItems: alignItems, height: height, width: width, minHeight: minHeight, maxHeight: maxHeight, minWidth: minWidth, maxWidth: maxWidth, padding: padding, margin: margin, gap: gap, background: background, color: color, border: border, borderRadius: borderRadius, boxShadow: boxShadow, position: position, top: top, left: left, right: right, bottom: bottom, zIndex: zIndex, overflow: overflow }, customStyle), onClick: onClick, onMouseEnter: onMouseEnter, onMouseLeave: onMouseLeave, onFocus: onFocus, onBlur: onBlur }, rest), content || children));
};
exports.default = View;
