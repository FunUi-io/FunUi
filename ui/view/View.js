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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
function View(props) {
    var children = props.children, content = props.content, _a = props.funcss, funcss = _a === void 0 ? '' : _a, _b = props.customStyle, customStyle = _b === void 0 ? {} : _b, height = props.height, width = props.width, minHeight = props.minHeight, maxHeight = props.maxHeight, minWidth = props.minWidth, maxWidth = props.maxWidth, padding = props.padding, margin = props.margin, gap = props.gap, fit = props.fit, display = props.display, flexDirection = props.flexDirection, justifyContent = props.justifyContent, alignItems = props.alignItems, bg = props.bg, borderRadius = props.borderRadius, boxShadow = props.boxShadow, position = props.position, top = props.top, left = props.left, right = props.right, bottom = props.bottom, zIndex = props.zIndex, overflow = props.overflow, rest = __rest(props, ["children", "content", "funcss", "customStyle", "height", "width", "minHeight", "maxHeight", "minWidth", "maxWidth", "padding", "margin", "gap", "fit", "display", "flexDirection", "justifyContent", "alignItems", "bg", "borderRadius", "boxShadow", "position", "top", "left", "right", "bottom", "zIndex", "overflow"]);
    var className = "".concat(fit ? 'width-100-p height-100-p' : '', " ").concat(funcss, " ").concat(bg !== null && bg !== void 0 ? bg : '').trim();
    var style = __assign({ display: display, flexDirection: flexDirection, justifyContent: justifyContent, alignItems: alignItems, height: height, width: width, minHeight: minHeight, maxHeight: maxHeight, minWidth: minWidth, maxWidth: maxWidth, padding: padding, margin: margin, gap: gap, borderRadius: borderRadius, boxShadow: boxShadow, position: position, top: top, left: left, right: right, bottom: bottom, zIndex: zIndex, overflow: overflow }, customStyle);
    return (react_1.default.createElement("div", __assign({ className: className, style: style }, rest), content !== null && content !== void 0 ? content : children));
}
exports.default = View;
