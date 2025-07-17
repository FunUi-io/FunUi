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
exports.default = Flex;
var react_1 = __importDefault(require("react"));
function Flex(_a) {
    var _b = _a.as, Component = _b === void 0 ? 'div' : _b, className = _a.className, funcss = _a.funcss, id = _a.id, children = _a.children, _c = _a.style, style = _c === void 0 ? {} : _c, 
    // Flex container
    _d = _a.direction, 
    // Flex container
    direction = _d === void 0 ? 'row' : _d, _e = _a.wrap, wrap = _e === void 0 ? 'wrap' : _e, justify = _a.justify, alignItems = _a.alignItems, alignContent = _a.alignContent, 
    // Gap
    gap = _a.gap, gapX = _a.gapX, gapY = _a.gapY, _f = _a.gapUnit, gapUnit = _f === void 0 ? 'rem' : _f, 
    // Flex item
    grow = _a.grow, shrink = _a.shrink, basis = _a.basis, flex = _a.flex, 
    // Responsive
    responsiveSmall = _a.responsiveSmall, responsiveMedium = _a.responsiveMedium, responsiveLarge = _a.responsiveLarge, 
    // Size
    fullWidth = _a.fullWidth, fullHeight = _a.fullHeight, rest = __rest(_a, ["as", "className", "funcss", "id", "children", "style", "direction", "wrap", "justify", "alignItems", "alignContent", "gap", "gapX", "gapY", "gapUnit", "grow", "shrink", "basis", "flex", "responsiveSmall", "responsiveMedium", "responsiveLarge", "fullWidth", "fullHeight"]);
    var responsiveClasses = "\n    ".concat(responsiveSmall ? 'responsiveSmall' : '', "\n    ").concat(responsiveMedium ? 'responsiveMedium' : '', "\n    ").concat(responsiveLarge ? 'responsiveLarge' : '', "\n  ").trim();
    return (react_1.default.createElement(Component, __assign({ id: id, className: "\n        ".concat(className || '', "\n        ").concat(funcss || '', "\n        ").concat(responsiveClasses, "\n      ").trim(), style: __assign({ display: 'flex', flexDirection: direction, flexWrap: wrap, justifyContent: justify, alignItems: alignItems, alignContent: alignContent, gap: gap ? "".concat(gap).concat(gapUnit) : undefined, columnGap: gapX ? "".concat(gapX).concat(gapUnit) : undefined, rowGap: gapY ? "".concat(gapY).concat(gapUnit) : undefined, flexGrow: grow, flexShrink: shrink, flexBasis: basis, flex: flex, width: fullWidth ? '100%' : undefined, height: fullHeight ? '100%' : undefined }, style) }, rest), children));
}
