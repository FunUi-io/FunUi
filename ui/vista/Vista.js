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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var ScrollInView_1 = __importDefault(require("../ScrollInView/ScrollInView"));
var getCssVariable_1 = require("../../utils/getCssVariable");
var Vista = function (_a) {
    var _b = _a.layout, layout = _b === void 0 ? 'imageRight' : _b, _c = _a.reverse, reverse = _c === void 0 ? false : _c, _d = _a.bg, bg = _d === void 0 ? '' : _d, _e = _a.padding, padding = _e === void 0 ? 'padding-lg' : _e, _f = _a.textAlign, textAlign = _f === void 0 ? 'left' : _f, _g = _a.imgPosition, imgPosition = _g === void 0 ? 'top' : _g, _h = _a.funcss, funcss = _h === void 0 ? '' : _h, _j = _a.pattern, pattern = _j === void 0 ? '' : _j, _k = _a.patternOpacity, patternOpacity = _k === void 0 ? pattern === 'grid' ? 0.15 : pattern === 'dots' ? 0.4 : pattern === 'diagonal' ? 0.2 : pattern === 'checkerboard' ? 0.2 : pattern === 'horizontal' ? 0.2 : pattern === 'vertical' ? 0.2 : 0.1 : _k, heading = _a.heading, subheading = _a.subheading, content = _a.content, image = _a.image, cta = _a.cta, _l = _a.sectionClass, sectionClass = _l === void 0 ? '' : _l, _m = _a.containerClass, containerClass = _m === void 0 ? '' : _m, _o = _a.textWrapperClass, textWrapperClass = _o === void 0 ? '' : _o, _p = _a.imageWrapperClass, imageWrapperClass = _p === void 0 ? '' : _p, children = _a.children, 
    // Gradient Props
    _q = _a.showGradient, 
    // Gradient Props
    showGradient = _q === void 0 ? false : _q, _r = _a.gradientPosition, gradientPosition = _r === void 0 ? 'bottom-right' : _r, _s = _a.gradientSize, gradientSize = _s === void 0 ? '300px' : _s, _t = _a.blurry, blurry = _t === void 0 ? 100 : _t, _u = _a.opacity, opacity = _u === void 0 ? 0.4 : _u, gradientColors = _a.gradientColors, _v = _a.fade, fade = _v === void 0 ? false : _v, _w = _a.fadeDirection, fadeDirection = _w === void 0 ? 'bottom' : _w, _x = _a.fadeRadial, fadeRadial = _x === void 0 ? false : _x, _y = _a.fadeOverlayDarken, fadeOverlayDarken = _y === void 0 ? 0.5 : _y, _z = _a.backgroundImage, backgroundImage = _z === void 0 ? '' : _z;
    var layoutClass = [
        layout,
        reverse ? 'reverse' : '',
        "text-".concat(textAlign),
    ]
        .filter(Boolean)
        .join(' ');
    var TextContent = (react_1.default.createElement("div", { className: "vista-text ".concat(textWrapperClass) },
        heading,
        subheading,
        content,
        cta,
        children));
    var ImageContent = image && (react_1.default.createElement("div", { className: "vista-image ".concat(imageWrapperClass) }, image));
    var isCentered = layout === 'centered';
    var isStacked = layout === 'stacked';
    var positionStyles = {
        'top-left': { top: '-100px', left: '-100px' },
        'top-right': { top: '-100px', right: '-100px' },
        'bottom-left': { bottom: '-100px', left: '-100px' },
        'bottom-right': { bottom: '-100px', right: '-100px' },
        center: { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' },
    };
    var primaryColor = (0, getCssVariable_1.getCssVariableValue)('primary');
    var secondaryColor = (0, getCssVariable_1.getCssVariableValue)('secondary');
    var gradientStyle = __assign({ position: 'absolute', width: gradientSize, height: gradientSize, background: gradientColors || "radial-gradient(circle, ".concat(primaryColor, ", ").concat(secondaryColor, ")"), opacity: opacity, filter: "blur(".concat(blurry, "px)"), pointerEvents: 'none', zIndex: 0 }, positionStyles[gradientPosition]);
    return (react_1.default.createElement(ScrollInView_1.default, null,
        react_1.default.createElement("div", { className: "vista \n          ".concat(pattern === 'grid' ? 'grid-bg' :
                pattern === 'dots' ? 'bg-pattern-dots' :
                    pattern === 'diagonal' ? 'bg-pattern-diagonal' :
                        pattern === 'checkerboard' ? 'bg-pattern-checkerboard' :
                            pattern === 'horizontal' ? 'bg-pattern-horizontal' :
                                pattern === 'vertical' ? 'bg-pattern-vertical' : '', " \n            ").concat(bg, " ").concat(padding, " ").concat(layoutClass, " ").concat(sectionClass, " ").concat(funcss), style: { position: 'relative',
                overflow: 'hidden',
                backgroundImage: pattern === 'grid' ? "linear-gradient(to right, rgba(var(--borderRgb), ".concat(patternOpacity, ") 1px, transparent 1px),\n          linear-gradient(to bottom, rgba(var(--borderRgb), ").concat(patternOpacity, ") 1px, transparent 1px)") :
                    pattern === 'dots' ? "radial-gradient(rgba(var(--borderRgb), ".concat(patternOpacity, ") 1px, transparent 1px)") :
                        pattern === 'diagonal' ? "repeating-linear-gradient(45deg, rgba(var(--borderRgb), ".concat(patternOpacity, "), rgba(var(--borderRgb), ").concat(patternOpacity, ") 1px, transparent 1px, transparent 10px)") :
                            pattern === 'checkerboard' ? "linear-gradient(45deg, rgba(var(--borderRgb), ".concat(patternOpacity, ") 25%, transparent 25%), linear-gradient(-45deg, rgba(var(--borderRgb), ").concat(patternOpacity, ") 25%, transparent 25%), linear-gradient(45deg, transparent 75%, rgba(var(--borderRgb), ").concat(patternOpacity, ") 75%), linear-gradient(-45deg, transparent 75%, rgba(var(--borderRgb), ").concat(patternOpacity, ") 75%)") :
                                pattern === 'horizontal' ? "linear-gradient(to bottom, rgba(var(--borderRgb), ".concat(patternOpacity, ") 1px, transparent 1px)") :
                                    pattern === 'vertical' ? "linear-gradient(to right, rgba(var(--borderRgb), ".concat(patternOpacity, ") 1px, transparent 1px)") : ''
            } },
            showGradient && react_1.default.createElement("div", { style: gradientStyle }),
            react_1.default.createElement("div", { className: "vista-container ".concat(containerClass), style: { position: 'relative', zIndex: 1 } }, isCentered || isStacked ? (react_1.default.createElement(react_1.default.Fragment, null,
                (imgPosition === 'top') && ImageContent,
                TextContent,
                (imgPosition === 'bottom') && ImageContent)) : reverse ? (react_1.default.createElement(react_1.default.Fragment, null,
                ImageContent,
                TextContent)) : (react_1.default.createElement(react_1.default.Fragment, null,
                (layout === 'imageLeft') && ImageContent,
                TextContent,
                (layout === 'imageRight') && ImageContent))),
            fade && (react_1.default.createElement("div", { style: {
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    background: fadeRadial
                        ? "radial-gradient(circle, transparent 0%, ".concat((0, getCssVariable_1.getCssVariableValue)(bg || 'page-bg'), " 100%)")
                        : "linear-gradient(to ".concat(fadeDirection || 'bottom', ", ").concat((0, getCssVariable_1.getCssVariableValue)(bg || 'page-bg'), " 0%, transparent 100%)"),
                    zIndex: 0,
                    pointerEvents: 'none'
                } })),
            backgroundImage && (react_1.default.createElement("div", { style: {
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: "url(".concat(backgroundImage, ")"),
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    zIndex: -1,
                    width: '100%',
                    height: '100%',
                } })),
            backgroundImage && fadeOverlayDarken !== undefined && (react_1.default.createElement("div", { style: {
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    inset: 0,
                    backgroundColor: "rgba(0, 0, 0, ".concat(fadeOverlayDarken, ")"),
                    zIndex: -1,
                } })))));
};
exports.default = Vista;
