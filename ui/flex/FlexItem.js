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
exports.default = FlexItem;
var react_1 = __importDefault(require("react"));
function FlexItem(_a) {
    var className = _a.className, funcss = _a.funcss, id = _a.id, children = _a.children, _b = _a.style, style = _b === void 0 ? {} : _b, 
    // Flex item
    flex = _a.flex, grow = _a.grow, shrink = _a.shrink, basis = _a.basis, alignSelf = _a.alignSelf, 
    // Size
    fullWidth = _a.fullWidth, fullHeight = _a.fullHeight, rest = __rest(_a, ["className", "funcss", "id", "children", "style", "flex", "grow", "shrink", "basis", "alignSelf", "fullWidth", "fullHeight"]);
    var combinedClassName = [className, funcss].filter(Boolean).join(' ');
    return (react_1.default.createElement("div", __assign({ id: id, className: combinedClassName, style: __assign({ flex: flex, flexGrow: flex ? undefined : grow, flexShrink: flex ? undefined : shrink, flexBasis: flex ? undefined : basis, alignSelf: alignSelf, width: fullWidth ? '100%' : undefined, height: fullHeight ? '100%' : undefined }, style) }, rest), children));
}
