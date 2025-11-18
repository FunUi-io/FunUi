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
var componentUtils_1 = require("../../utils/componentUtils");
var Text_1 = __importDefault(require("../text/Text"));
var Col_1 = __importDefault(require("../grid/Col"));
var Button_1 = __importDefault(require("../button/Button")); // Import your Button component
var Flex_1 = __importDefault(require("../flex/Flex")); // Import your Flex component
var Vista = function (_a) {
    var _b = _a.layout, layout = _b === void 0 ? 'imageRight' : _b, _c = _a.reverse, reverse = _c === void 0 ? false : _c, _d = _a.bg, bg = _d === void 0 ? '' : _d, _e = _a.padding, padding = _e === void 0 ? 'padding-lg' : _e, _f = _a.textAlign, textAlign = _f === void 0 ? 'left' : _f, _g = _a.imgPosition, imgPosition = _g === void 0 ? 'top' : _g, _h = _a.funcss, funcss = _h === void 0 ? '' : _h, _j = _a.pattern, pattern = _j === void 0 ? '' : _j, _k = _a.patternOpacity, patternOpacity = _k === void 0 ? pattern === 'grid' ? 0.15 : pattern === 'dots' ? 0.4 : pattern === 'diagonal' ? 0.2 : pattern === 'checkerboard' ? 0.2 : pattern === 'horizontal' ? 0.2 : pattern === 'vertical' ? 0.2 : 0.1 : _k, 
    // Enhanced Content
    heading = _a.heading, _l = _a.headingSize, headingSize = _l === void 0 ? '5xl' : _l, _m = _a.headingWeight, headingWeight = _m === void 0 ? 700 : _m, _o = _a.headingColor, headingColor = _o === void 0 ? '' : _o, _p = _a.headingClass, headingClass = _p === void 0 ? '' : _p, subheading = _a.subheading, _q = _a.subheadingSize, subheadingSize = _q === void 0 ? 'lg' : _q, _r = _a.subheadingWeight, subheadingWeight = _r === void 0 ? 400 : _r, _s = _a.subheadingColor, subheadingColor = _s === void 0 ? 'light' : _s, _t = _a.subheadingClass, subheadingClass = _t === void 0 ? '' : _t, content = _a.content, _u = _a.contentSize, contentSize = _u === void 0 ? 'base' : _u, _v = _a.contentWeight, contentWeight = _v === void 0 ? 400 : _v, _w = _a.contentColor, contentColor = _w === void 0 ? '' : _w, _x = _a.contentClass, contentClass = _x === void 0 ? '' : _x, image = _a.image, _y = _a.imageUrl, imageUrl = _y === void 0 ? '' : _y, _z = _a.imageAlt, imageAlt = _z === void 0 ? '' : _z, _0 = _a.imageClass, imageClass = _0 === void 0 ? '' : _0, _1 = _a.imageSize, imageSize = _1 === void 0 ? '100%' : _1, cta = _a.cta, _2 = _a.ctaClass, ctaClass = _2 === void 0 ? '' : _2, _3 = _a.sectionClass, sectionClass = _3 === void 0 ? '' : _3, _4 = _a.containerClass, containerClass = _4 === void 0 ? '' : _4, _5 = _a.textWrapperClass, textWrapperClass = _5 === void 0 ? '' : _5, _6 = _a.gap, gap = _6 === void 0 ? '2rem' : _6, _7 = _a.imageWrapperClass, imageWrapperClass = _7 === void 0 ? '' : _7, children = _a.children, 
    // Gradient Props
    _8 = _a.showGradient, 
    // Gradient Props
    showGradient = _8 === void 0 ? false : _8, _9 = _a.gradientPosition, gradientPosition = _9 === void 0 ? 'bottom-right' : _9, _10 = _a.gradientSize, gradientSize = _10 === void 0 ? '300px' : _10, _11 = _a.blurry, blurry = _11 === void 0 ? 100 : _11, _12 = _a.opacity, opacity = _12 === void 0 ? 0.4 : _12, gradientColors = _a.gradientColors, _13 = _a.fade, fade = _13 === void 0 ? false : _13, _14 = _a.fadeDirection, fadeDirection = _14 === void 0 ? 'bottom' : _14, _15 = _a.fadeRadial, fadeRadial = _15 === void 0 ? false : _15, _16 = _a.fadeOverlayDarken, fadeOverlayDarken = _16 === void 0 ? 0.5 : _16, _17 = _a.backgroundImage, backgroundImage = _17 === void 0 ? '' : _17, _18 = _a.variant, variant = _18 === void 0 ? '' : _18, 
    // New CTA Button Props
    _19 = _a.showPrimaryCTA, 
    // New CTA Button Props
    showPrimaryCTA = _19 === void 0 ? false : _19, _20 = _a.showSecondaryCTA, showSecondaryCTA = _20 === void 0 ? false : _20, _21 = _a.showAccentCTA, showAccentCTA = _21 === void 0 ? false : _21, _22 = _a.primaryButtonOutlined, primaryButtonOutlined = _22 === void 0 ? false : _22, _23 = _a.secondaryButtonOutlined, secondaryButtonOutlined = _23 === void 0 ? false : _23, _24 = _a.accentButtonOutlined, accentButtonOutlined = _24 === void 0 ? false : _24, _25 = _a.ctaPrimaryUrl, ctaPrimaryUrl = _25 === void 0 ? '' : _25, _26 = _a.ctaSecondaryUrl, ctaSecondaryUrl = _26 === void 0 ? '' : _26, _27 = _a.ctaAccentUrl, ctaAccentUrl = _27 === void 0 ? '' : _27, _28 = _a.ctaPrimaryText, ctaPrimaryText = _28 === void 0 ? 'Primary Action' : _28, _29 = _a.ctaSecondaryText, ctaSecondaryText = _29 === void 0 ? 'Secondary Action' : _29, _30 = _a.ctaAccentText, ctaAccentText = _30 === void 0 ? 'Accent Action' : _30, _31 = _a.ctaGap, ctaGap = _31 === void 0 ? 1 : _31, _32 = _a.ctaFlexJustify, ctaFlexJustify = _32 === void 0 ? 'center' : _32, _33 = _a.ctaPrimaryRounded, ctaPrimaryRounded = _33 === void 0 ? false : _33, _34 = _a.ctaPrimaryFlat, ctaPrimaryFlat = _34 === void 0 ? false : _34, _35 = _a.ctaPrimaryPrefix, ctaPrimaryPrefix = _35 === void 0 ? '' : _35, _36 = _a.ctaPrimarySuffix, ctaPrimarySuffix = _36 === void 0 ? '' : _36, _37 = _a.ctaSecondaryRounded, ctaSecondaryRounded = _37 === void 0 ? false : _37, _38 = _a.ctaSecondaryFlat, ctaSecondaryFlat = _38 === void 0 ? false : _38, _39 = _a.ctaSecondaryPrefix, ctaSecondaryPrefix = _39 === void 0 ? '' : _39, _40 = _a.ctaSecondarySuffix, ctaSecondarySuffix = _40 === void 0 ? '' : _40, _41 = _a.ctaAccentRounded, ctaAccentRounded = _41 === void 0 ? false : _41, _42 = _a.ctaAccentFlat, ctaAccentFlat = _42 === void 0 ? false : _42, _43 = _a.ctaAccentPrefix, ctaAccentPrefix = _43 === void 0 ? '' : _43, _44 = _a.ctaAccentSuffix, ctaAccentSuffix = _44 === void 0 ? '' : _44, primaryIconSize = _a.primaryIconSize, secondaryIconSize = _a.secondaryIconSize, accentIconSize = _a.accentIconSize;
    // Use the component config hook
    var mergeWithLocal = (0, componentUtils_1.useComponentConfiguration)('Vista', variant).mergeWithLocal;
    // Merge config with local props - local props should override config
    var mergedProps = mergeWithLocal({
        layout: layout,
        reverse: reverse,
        bg: bg,
        padding: padding,
        textAlign: textAlign,
        imgPosition: imgPosition,
        funcss: funcss,
        pattern: pattern,
        patternOpacity: patternOpacity,
        showGradient: showGradient,
        gradientPosition: gradientPosition,
        gradientSize: gradientSize,
        blurry: blurry,
        opacity: opacity,
        gradientColors: gradientColors,
        fade: fade,
        fadeDirection: fadeDirection,
        fadeRadial: fadeRadial,
        fadeOverlayDarken: fadeOverlayDarken,
        backgroundImage: backgroundImage,
        sectionClass: sectionClass,
        containerClass: containerClass,
        textWrapperClass: textWrapperClass,
        imageWrapperClass: imageWrapperClass,
        gap: gap,
        // Enhanced content props
        heading: heading,
        headingSize: headingSize,
        headingWeight: headingWeight,
        headingColor: headingColor,
        headingClass: headingClass,
        subheading: subheading,
        subheadingSize: subheadingSize,
        subheadingWeight: subheadingWeight,
        subheadingColor: subheadingColor,
        subheadingClass: subheadingClass,
        content: content,
        contentSize: contentSize,
        contentWeight: contentWeight,
        contentColor: contentColor,
        contentClass: contentClass,
        image: image,
        imageUrl: imageUrl,
        imageSize: imageSize,
        imageAlt: imageAlt,
        imageClass: imageClass,
        cta: cta,
        ctaClass: ctaClass,
        // CTA Button props
        showPrimaryCTA: showPrimaryCTA,
        showSecondaryCTA: showSecondaryCTA,
        showAccentCTA: showAccentCTA,
        primaryButtonOutlined: primaryButtonOutlined,
        secondaryButtonOutlined: secondaryButtonOutlined,
        accentButtonOutlined: accentButtonOutlined,
        ctaPrimaryUrl: ctaPrimaryUrl,
        ctaSecondaryUrl: ctaSecondaryUrl,
        ctaAccentUrl: ctaAccentUrl,
        ctaPrimaryText: ctaPrimaryText,
        ctaSecondaryText: ctaSecondaryText,
        ctaAccentText: ctaAccentText,
        ctaGap: ctaGap,
        ctaFlexJustify: ctaFlexJustify,
        ctaPrimaryRounded: ctaPrimaryRounded,
        ctaPrimaryFlat: ctaPrimaryFlat,
        ctaPrimaryPrefix: ctaPrimaryPrefix,
        ctaPrimarySuffix: ctaPrimarySuffix,
        ctaSecondaryRounded: ctaSecondaryRounded,
        ctaSecondaryFlat: ctaSecondaryFlat,
        ctaSecondaryPrefix: ctaSecondaryPrefix,
        ctaSecondarySuffix: ctaSecondarySuffix,
        ctaAccentRounded: ctaAccentRounded,
        ctaAccentFlat: ctaAccentFlat,
        ctaAccentPrefix: ctaAccentPrefix,
        ctaAccentSuffix: ctaAccentSuffix,
        primaryIconSize: primaryIconSize,
        secondaryIconSize: secondaryIconSize,
        accentIconSize: accentIconSize,
    }).props;
    var layoutClass = [
        mergedProps.layout,
        mergedProps.reverse ? 'reverse' : '',
        "text-".concat(mergedProps.textAlign),
    ]
        .filter(Boolean)
        .join(' ');
    // CTA Buttons Component
    var CTAButtons = function () {
        var hasCTAs = mergedProps.showPrimaryCTA || mergedProps.showSecondaryCTA || mergedProps.showAccentCTA;
        if (!hasCTAs)
            return null;
        return (react_1.default.createElement(Flex_1.default, { gap: mergedProps.ctaGap, justify: mergedProps.ctaFlexJustify, className: "mt-6 ".concat(mergedProps.ctaClass), wrap: "wrap", width: '100%' },
            mergedProps.showPrimaryCTA && (react_1.default.createElement(Button_1.default, { bg: "primary", outlined: mergedProps.primaryButtonOutlined, onClick: function () { return window.location.href = mergedProps.ctaPrimaryUrl; }, rounded: mergedProps.ctaPrimaryRounded, flat: mergedProps.ctaPrimaryFlat, stringPrefix: mergedProps.ctaPrimaryPrefix, stringSuffix: mergedProps.ctaPrimarySuffix, iconSize: mergedProps.primaryIconSize }, mergedProps.ctaPrimaryText)),
            mergedProps.showSecondaryCTA && (react_1.default.createElement(Button_1.default, { bg: "secondary", outlined: mergedProps.secondaryButtonOutlined, onClick: function () { return window.location.href = mergedProps.ctaSecondaryUrl; }, rounded: mergedProps.ctaSecondaryRounded, flat: mergedProps.ctaSecondaryFlat, stringPrefix: mergedProps.ctaSecondaryPrefix, stringSuffix: mergedProps.ctaSecondarySuffix, iconSize: mergedProps.secondaryIconSize }, mergedProps.ctaSecondaryText)),
            mergedProps.showAccentCTA && (react_1.default.createElement(Button_1.default, { bg: "accent", outlined: mergedProps.accentButtonOutlined, onClick: function () { return window.location.href = mergedProps.ctaAccentUrl; }, rounded: mergedProps.ctaAccentRounded, flat: mergedProps.ctaAccentFlat, stringPrefix: mergedProps.ctaAccentPrefix, stringSuffix: mergedProps.ctaAccentSuffix, iconSize: mergedProps.accentIconSize }, mergedProps.ctaAccentText))));
    };
    // Enhanced Text Content with flexible styling
    var TextContent = (react_1.default.createElement("div", { className: "vista-text ".concat(mergedProps.layout === 'centered' ? "text-center" : "", " ").concat(mergedProps.textWrapperClass) },
        mergedProps.heading && (react_1.default.createElement(Text_1.default, { block: true, size: mergedProps.headingSize, weight: mergedProps.headingWeight, color: mergedProps.headingColor, funcss: mergedProps.headingClass }, mergedProps.heading)),
        mergedProps.subheading && (react_1.default.createElement(Text_1.default, { block: true, size: mergedProps.subheadingSize, weight: mergedProps.subheadingWeight, color: mergedProps.subheadingColor, funcss: "mt-2 ".concat(mergedProps.subheadingClass) }, mergedProps.subheading)),
        mergedProps.content && (react_1.default.createElement(Text_1.default, { block: true, size: mergedProps.contentSize, weight: mergedProps.contentWeight, color: mergedProps.contentColor, funcss: "mt-4 ".concat(mergedProps.contentClass), article: true }, children || (typeof mergedProps.content === 'string' ? react_1.default.createElement("div", { dangerouslySetInnerHTML: { __html: mergedProps.content } }) : mergedProps.content))),
        mergedProps.cta ? (react_1.default.createElement("div", { className: "mt-6 ".concat(mergedProps.ctaClass) }, mergedProps.cta)) : (react_1.default.createElement(CTAButtons, null))));
    // Enhanced Image Content - uses imageUrl if no image component provided
    var ImageContent = (mergedProps.image || mergedProps.imageUrl) && (react_1.default.createElement("div", { className: "vista-image ".concat(mergedProps.imageWrapperClass) }, mergedProps.image ? (mergedProps.image) : (react_1.default.createElement("img", { src: mergedProps.imageUrl, alt: mergedProps.imageAlt || 'Vista image', className: "".concat(mergedProps.imageClass), style: {
            objectFit: 'cover',
            maxWidth: mergedProps.imageSize,
            borderRadius: 'inherit'
        } }))));
    var isCentered = mergedProps.layout === 'centered';
    var isStacked = mergedProps.layout === 'stacked';
    var positionStyles = {
        'top-left': { top: '-100px', left: '-100px' },
        'top-right': { top: '-100px', right: '-100px' },
        'bottom-left': { bottom: '-100px', left: '-100px' },
        'bottom-right': { bottom: '-100px', right: '-100px' },
        center: { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' },
    };
    var primaryColor = (0, getCssVariable_1.getCssVariableValue)('primary');
    var secondaryColor = (0, getCssVariable_1.getCssVariableValue)('secondary');
    var gradientStyle = __assign({ position: 'absolute', width: mergedProps.gradientSize, height: mergedProps.gradientSize, background: mergedProps.gradientColors || "radial-gradient(circle, ".concat(primaryColor, ", ").concat(secondaryColor, ")"), opacity: mergedProps.opacity, filter: "blur(".concat(mergedProps.blurry, "px)"), pointerEvents: 'none', zIndex: 0 }, positionStyles[mergedProps.gradientPosition]);
    return (react_1.default.createElement(ScrollInView_1.default, null,
        react_1.default.createElement("div", { className: "vista \n          ".concat(mergedProps.pattern === 'grid' ? 'grid-bg' :
                mergedProps.pattern === 'dots' ? 'bg-pattern-dots' :
                    mergedProps.pattern === 'diagonal' ? 'bg-pattern-diagonal' :
                        mergedProps.pattern === 'checkerboard' ? 'bg-pattern-checkerboard' :
                            mergedProps.pattern === 'horizontal' ? 'bg-pattern-horizontal' :
                                mergedProps.pattern === 'vertical' ? 'bg-pattern-vertical' : '', " \n            ").concat(mergedProps.bg, " p-").concat(mergedProps.padding, " ").concat(layoutClass, " ").concat(mergedProps.sectionClass, " ").concat(mergedProps.funcss), style: {
                position: 'relative',
                overflow: 'hidden',
                minHeight: "90vh",
                backgroundImage: mergedProps.pattern === 'grid' ? "linear-gradient(to right, rgba(var(--borderRgb), ".concat(mergedProps.patternOpacity, ") 1px, transparent 1px),\n          linear-gradient(to bottom, rgba(var(--borderRgb), ").concat(mergedProps.patternOpacity, ") 1px, transparent 1px)") :
                    mergedProps.pattern === 'dots' ? "radial-gradient(rgba(var(--borderRgb), ".concat(mergedProps.patternOpacity, ") 1px, transparent 1px)") :
                        mergedProps.pattern === 'diagonal' ? "repeating-linear-gradient(45deg, rgba(var(--borderRgb), ".concat(mergedProps.patternOpacity, "), rgba(var(--borderRgb), ").concat(mergedProps.patternOpacity, ") 1px, transparent 1px, transparent 10px)") :
                            mergedProps.pattern === 'checkerboard' ? "linear-gradient(45deg, rgba(var(--borderRgb), ".concat(mergedProps.patternOpacity, ") 25%, transparent 25%), linear-gradient(-45deg, rgba(var(--borderRgb), ").concat(mergedProps.patternOpacity, ") 25%, transparent 25%), linear-gradient(45deg, transparent 75%, rgba(var(--borderRgb), ").concat(mergedProps.patternOpacity, ") 75%), linear-gradient(-45deg, transparent 75%, rgba(var(--borderRgb), ").concat(mergedProps.patternOpacity, ") 75%)") :
                                mergedProps.pattern === 'horizontal' ? "linear-gradient(to bottom, rgba(var(--borderRgb), ".concat(mergedProps.patternOpacity, ") 1px, transparent 1px)") :
                                    mergedProps.pattern === 'vertical' ? "linear-gradient(to right, rgba(var(--borderRgb), ".concat(mergedProps.patternOpacity, ") 1px, transparent 1px)") : ''
            } },
            mergedProps.showGradient && react_1.default.createElement("div", { style: gradientStyle }),
            react_1.default.createElement("div", { className: "vista-container ".concat(mergedProps.containerClass), style: { position: 'relative', zIndex: 1, gap: mergedProps.gap || "2rem" } }, isCentered || isStacked ? (react_1.default.createElement(react_1.default.Fragment, null,
                (mergedProps.imgPosition === 'top') && ImageContent,
                TextContent,
                (mergedProps.imgPosition === 'bottom') && ImageContent)) : mergedProps.reverse ? (react_1.default.createElement(react_1.default.Fragment, null,
                ImageContent,
                TextContent)) : (react_1.default.createElement(react_1.default.Fragment, null,
                (mergedProps.layout === 'imageLeft') && react_1.default.createElement(Col_1.default, null, ImageContent),
                TextContent,
                (mergedProps.layout === 'imageRight') && react_1.default.createElement(Col_1.default, null, ImageContent)))),
            mergedProps.fade && (react_1.default.createElement("div", { style: {
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    background: mergedProps.fadeRadial
                        ? "radial-gradient(circle, transparent 0%, ".concat((0, getCssVariable_1.getCssVariableValue)(mergedProps.bg || 'page-bg'), " 100%)")
                        : "linear-gradient(to ".concat(mergedProps.fadeDirection || 'bottom', ", ").concat((0, getCssVariable_1.getCssVariableValue)(mergedProps.bg || 'page-bg'), " 0%, transparent 100%)"),
                    zIndex: 0,
                    pointerEvents: 'none'
                } })),
            mergedProps.backgroundImage && (react_1.default.createElement("div", { style: {
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: "url(".concat(mergedProps.backgroundImage, ")"),
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    zIndex: -1,
                    width: '100%',
                    height: '100%',
                } })),
            mergedProps.backgroundImage && mergedProps.fadeOverlayDarken !== undefined && (react_1.default.createElement("div", { style: {
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    inset: 0,
                    backgroundColor: "rgba(0, 0, 0, ".concat(mergedProps.fadeOverlayDarken, ")"),
                    zIndex: -1,
                } })))));
};
exports.default = Vista;
