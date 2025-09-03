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
    var className = _a.className, funcss = _a.funcss, id = _a.id, children = _a.children, _b = _a.style, style = _b === void 0 ? {} : _b, 
    // Flex container
    _c = _a.direction, 
    // Flex container
    direction = _c === void 0 ? 'row' : _c, _d = _a.wrap, wrap = _d === void 0 ? 'wrap' : _d, justify = _a.justify, alignItems = _a.alignItems, alignContent = _a.alignContent, 
    // Gap
    gap = _a.gap, gapX = _a.gapX, gapY = _a.gapY, _e = _a.gapUnit, gapUnit = _e === void 0 ? 'rem' : _e, 
    // Responsive
    responsiveSmall = _a.responsiveSmall, responsiveMedium = _a.responsiveMedium, responsiveLarge = _a.responsiveLarge, 
    // Size
    width = _a.width, height = _a.height, rest = __rest(_a, ["className", "funcss", "id", "children", "style", "direction", "wrap", "justify", "alignItems", "alignContent", "gap", "gapX", "gapY", "gapUnit", "responsiveSmall", "responsiveMedium", "responsiveLarge", "width", "height"]);
    var combinedClassName = [
        className,
        funcss,
        responsiveSmall && 'responsiveSmall',
        responsiveMedium && 'responsiveMedium',
        responsiveLarge && 'responsiveLarge',
    ]
        .filter(Boolean)
        .join(' ');
    return (react_1.default.createElement("div", __assign({ id: id, className: combinedClassName, style: __assign({ display: 'flex', flexDirection: direction, flexWrap: wrap, justifyContent: justify, alignItems: alignItems, alignContent: alignContent, gap: gap ? "".concat(gap).concat(gapUnit) : 0, columnGap: gapX ? "".concat(gapX).concat(gapUnit) : gap ? "".concat(gap).concat(gapUnit) : 0, rowGap: gapY ? "".concat(gapY).concat(gapUnit) : gap ? "".concat(gap).concat(gapUnit) : 0, width: width ? width : 'fit-content', height: height ? height : 'fit-content' }, style) }, rest), children));
}
