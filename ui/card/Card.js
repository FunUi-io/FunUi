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
exports.default = Card;
var react_1 = __importDefault(require("react"));
var CardHeader_1 = __importDefault(require("./CardHeader"));
var CardBody_1 = __importDefault(require("./CardBody"));
var CardFooter_1 = __importDefault(require("./CardFooter"));
var theme_1 = require("../theme/theme");
var componentUtils_1 = require("../../utils/componentUtils");
var Button_1 = __importDefault(require("../button/Button"));
var Flex_1 = __importDefault(require("../flex/Flex"));
var Text_1 = __importDefault(require("../text/Text"));
var View_1 = __importDefault(require("../view/View"));
function Card(_a) {
    var 
    // Original Props
    color = _a.color, bg = _a.bg, width = _a.width, height = _a.height, minHeight = _a.minHeight, minWidth = _a.minWidth, margin = _a.margin, padding = _a.padding, funcss = _a.funcss, children = _a.children, roundEdge = _a.roundEdge, maxHeight = _a.maxHeight, maxWidth = _a.maxWidth, horizontal = _a.horizontal, id = _a.id, header = _a.header, body = _a.body, footer = _a.footer, noGap = _a.noGap, fab = _a.fab, image = _a.image, shadowless = _a.shadowless, flat = _a.flat, responsiveMedium = _a.responsiveMedium, xl = _a.xl, responsiveSmall = _a.responsiveSmall, style = _a.style, 
    // Pattern Props
    _b = _a.pattern, 
    // Pattern Props
    pattern = _b === void 0 ? 'none' : _b, _c = _a.patternOpacity, patternOpacity = _c === void 0 ? 0.1 : _c, gradient = _a.gradient, _d = _a.opacity, opacity = _d === void 0 ? 1 : _d, border = _a.border, _e = _a.hoverEffect, hoverEffect = _e === void 0 ? 'none' : _e, 
    // Enhanced Content Props
    heading = _a.heading, _f = _a.headingSize, headingSize = _f === void 0 ? 'xl' : _f, _g = _a.headingWeight, headingWeight = _g === void 0 ? 700 : _g, headingColor = _a.headingColor, headingClass = _a.headingClass, headingLineHeight = _a.headingLineHeight, subheading = _a.subheading, _h = _a.subheadingSize, subheadingSize = _h === void 0 ? 'base' : _h, _j = _a.subheadingWeight, subheadingWeight = _j === void 0 ? 400 : _j, _k = _a.subheadingColor, subheadingColor = _k === void 0 ? 'light' : _k, subheadingClass = _a.subheadingClass, subheadingLineHeight = _a.subheadingLineHeight, content = _a.content, _l = _a.contentSize, contentSize = _l === void 0 ? 'base' : _l, _m = _a.contentWeight, contentWeight = _m === void 0 ? 400 : _m, contentColor = _a.contentColor, contentClass = _a.contentClass, contentLineHeight = _a.contentLineHeight, 
    // Image Props
    imageUrl = _a.imageUrl, _o = _a.imageAlt, imageAlt = _o === void 0 ? '' : _o, _p = _a.imageClass, imageClass = _p === void 0 ? '' : _p, _q = _a.imageSize, imageSize = _q === void 0 ? '100%' : _q, 
    // Enhanced Footer/CTA Props
    _r = _a.showPrimaryCTA, 
    // Enhanced Footer/CTA Props
    showPrimaryCTA = _r === void 0 ? false : _r, _s = _a.showSecondaryCTA, showSecondaryCTA = _s === void 0 ? false : _s, _t = _a.showAccentCTA, showAccentCTA = _t === void 0 ? false : _t, _u = _a.primaryButtonOutlined, primaryButtonOutlined = _u === void 0 ? false : _u, _v = _a.secondaryButtonOutlined, secondaryButtonOutlined = _v === void 0 ? false : _v, _w = _a.accentButtonOutlined, accentButtonOutlined = _w === void 0 ? false : _w, _x = _a.ctaPrimaryUrl, ctaPrimaryUrl = _x === void 0 ? '' : _x, _y = _a.ctaSecondaryUrl, ctaSecondaryUrl = _y === void 0 ? '' : _y, _z = _a.ctaAccentUrl, ctaAccentUrl = _z === void 0 ? '' : _z, _0 = _a.ctaPrimaryText, ctaPrimaryText = _0 === void 0 ? 'Primary Action' : _0, _1 = _a.ctaSecondaryText, ctaSecondaryText = _1 === void 0 ? 'Secondary Action' : _1, _2 = _a.ctaAccentText, ctaAccentText = _2 === void 0 ? 'Accent Action' : _2, _3 = _a.ctaGap, ctaGap = _3 === void 0 ? 1 : _3, _4 = _a.ctaFlexJustify, ctaFlexJustify = _4 === void 0 ? 'center' : _4, _5 = _a.ctaClass, ctaClass = _5 === void 0 ? '' : _5, 
    // Section Styling Props
    headerStyle = _a.headerStyle, headerClass = _a.headerClass, bodyStyle = _a.bodyStyle, bodyClass = _a.bodyClass, footerStyle = _a.footerStyle, footerClass = _a.footerClass, 
    // Configuration
    variant = _a.variant, rest = __rest(_a, ["color", "bg", "width", "height", "minHeight", "minWidth", "margin", "padding", "funcss", "children", "roundEdge", "maxHeight", "maxWidth", "horizontal", "id", "header", "body", "footer", "noGap", "fab", "image", "shadowless", "flat", "responsiveMedium", "xl", "responsiveSmall", "style", "pattern", "patternOpacity", "gradient", "opacity", "border", "hoverEffect", "heading", "headingSize", "headingWeight", "headingColor", "headingClass", "headingLineHeight", "subheading", "subheadingSize", "subheadingWeight", "subheadingColor", "subheadingClass", "subheadingLineHeight", "content", "contentSize", "contentWeight", "contentColor", "contentClass", "contentLineHeight", "imageUrl", "imageAlt", "imageClass", "imageSize", "showPrimaryCTA", "showSecondaryCTA", "showAccentCTA", "primaryButtonOutlined", "secondaryButtonOutlined", "accentButtonOutlined", "ctaPrimaryUrl", "ctaSecondaryUrl", "ctaAccentUrl", "ctaPrimaryText", "ctaSecondaryText", "ctaAccentText", "ctaGap", "ctaFlexJustify", "ctaClass", "headerStyle", "headerClass", "bodyStyle", "bodyClass", "footerStyle", "footerClass", "variant"]);
    // Use the component config hook
    var mergeWithLocal = (0, componentUtils_1.useComponentConfiguration)('Card', variant).mergeWithLocal;
    // Merge config with local props
    var mergedProps = mergeWithLocal({
        // Original props
        color: color,
        bg: bg,
        width: width,
        height: height,
        minHeight: minHeight,
        minWidth: minWidth,
        margin: margin,
        padding: padding,
        funcss: funcss,
        children: children,
        roundEdge: roundEdge,
        maxHeight: maxHeight,
        maxWidth: maxWidth,
        horizontal: horizontal,
        id: id,
        header: header,
        body: body,
        footer: footer,
        noGap: noGap,
        fab: fab,
        image: image,
        shadowless: shadowless,
        flat: flat,
        responsiveMedium: responsiveMedium,
        xl: xl,
        responsiveSmall: responsiveSmall,
        style: style,
        // Pattern props
        pattern: pattern,
        patternOpacity: patternOpacity,
        gradient: gradient,
        opacity: opacity,
        border: border,
        hoverEffect: hoverEffect,
        // Enhanced content props
        heading: heading,
        headingSize: headingSize,
        headingWeight: headingWeight,
        headingColor: headingColor,
        headingClass: headingClass,
        headingLineHeight: headingLineHeight,
        subheading: subheading,
        subheadingSize: subheadingSize,
        subheadingWeight: subheadingWeight,
        subheadingColor: subheadingColor,
        subheadingClass: subheadingClass,
        subheadingLineHeight: subheadingLineHeight,
        content: content,
        contentSize: contentSize,
        contentWeight: contentWeight,
        contentColor: contentColor,
        contentClass: contentClass,
        contentLineHeight: contentLineHeight,
        // Image props
        imageUrl: imageUrl,
        imageAlt: imageAlt,
        imageClass: imageClass,
        imageSize: imageSize,
        // CTA props
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
        ctaClass: ctaClass,
        // Section styling props
        headerStyle: headerStyle,
        headerClass: headerClass,
        bodyStyle: bodyStyle,
        bodyClass: bodyClass,
        footerStyle: footerStyle,
        footerClass: footerClass,
    }).props;
    var themeVariant = (0, theme_1.useVariant)().variant;
    // Handle content - if string, use dangerouslySetInnerHTML, otherwise render as is
    var renderContent = function (content) {
        if (typeof content === 'string') {
            return react_1.default.createElement("div", { dangerouslySetInnerHTML: { __html: content } });
        }
        return content;
    };
    // Enhanced Text Content with flexible styling
    var EnhancedTextContent = (react_1.default.createElement("div", { className: "card-enhanced-content" },
        mergedProps.heading && (react_1.default.createElement(Text_1.default, { block: true, size: mergedProps.headingSize, weight: mergedProps.headingWeight, color: mergedProps.headingColor, funcss: mergedProps.headingClass, lineHeight: mergedProps.headingLineHeight }, renderContent(mergedProps.heading))),
        mergedProps.subheading && (react_1.default.createElement(Text_1.default, { block: true, size: mergedProps.subheadingSize, weight: mergedProps.subheadingWeight, color: mergedProps.subheadingColor, funcss: "mt-1 ".concat(mergedProps.subheadingClass), lineHeight: mergedProps.subheadingLineHeight }, renderContent(mergedProps.subheading))),
        mergedProps.content && (react_1.default.createElement(Text_1.default, { block: true, size: mergedProps.contentSize, weight: mergedProps.contentWeight, color: mergedProps.contentColor, funcss: "mt-3 ".concat(mergedProps.contentClass), lineHeight: mergedProps.contentLineHeight, article: true }, renderContent(mergedProps.content)))));
    // Image Content - uses imageUrl if no image component provided
    var ImageContent = (mergedProps.image || mergedProps.imageUrl) && (react_1.default.createElement("div", { className: "card-image-content" }, mergedProps.image ? (mergedProps.image) : (mergedProps.imageUrl && (react_1.default.createElement("img", { src: mergedProps.imageUrl, alt: mergedProps.imageAlt, className: mergedProps.imageClass, style: {
            width: mergedProps.imageSize,
            height: 'auto',
            objectFit: 'cover',
            borderRadius: 'inherit'
        } })))));
    // CTA Buttons Component
    var CTAButtons = function () {
        var hasCTAs = mergedProps.showPrimaryCTA || mergedProps.showSecondaryCTA || mergedProps.showAccentCTA;
        if (!hasCTAs)
            return null;
        return (react_1.default.createElement(Flex_1.default, { gap: mergedProps.ctaGap, justify: mergedProps.ctaFlexJustify, className: "mt-4 ".concat(mergedProps.ctaClass), wrap: "wrap", width: '100%' },
            mergedProps.showPrimaryCTA && (react_1.default.createElement(Button_1.default, { bg: "primary", outlined: mergedProps.primaryButtonOutlined, onClick: function () { return mergedProps.ctaPrimaryUrl && (window.location.href = mergedProps.ctaPrimaryUrl); } }, mergedProps.ctaPrimaryText)),
            mergedProps.showSecondaryCTA && (react_1.default.createElement(Button_1.default, { bg: "secondary", outlined: mergedProps.secondaryButtonOutlined, onClick: function () { return mergedProps.ctaSecondaryUrl && (window.location.href = mergedProps.ctaSecondaryUrl); } }, mergedProps.ctaSecondaryText)),
            mergedProps.showAccentCTA && (react_1.default.createElement(Button_1.default, { bg: "accent", outlined: mergedProps.accentButtonOutlined, onClick: function () { return mergedProps.ctaAccentUrl && (window.location.href = mergedProps.ctaAccentUrl); } }, mergedProps.ctaAccentText))));
    };
    // Determine if we should use enhanced content
    var hasEnhancedContent = mergedProps.heading || mergedProps.subheading || mergedProps.content;
    var hasEnhancedFooter = mergedProps.showPrimaryCTA || mergedProps.showSecondaryCTA || mergedProps.showAccentCTA;
    var hasImageContent = mergedProps.image || mergedProps.imageUrl;
    return (react_1.default.createElement("div", __assign({ id: mergedProps.id || '', className: "\n        card \n        card_flex\n        ".concat(!image && !imageUrl ? "p" : "", "\n        ").concat(mergedProps.noGap ? 'no-gap' : '', " \n        ").concat(mergedProps.xl ? 'xl' : '', " \n        text-").concat(mergedProps.color || '', " \n        ").concat(mergedProps.bg || '', " \n        ").concat(mergedProps.funcss || '', " \n        ").concat(mergedProps.roundEdge ? 'round-edge' : '', " \n        ").concat(mergedProps.shadowless ? 'shadowless' : '', " \n        ").concat(mergedProps.flat ? 'flat' : '', " \n        ").concat(mergedProps.horizontal ? 'horizontalCard' : '', "\n        ").concat(mergedProps.responsiveMedium ? 'responsiveMedium' : '', "\n        ").concat(mergedProps.responsiveSmall ? 'responsiveSmall' : '', "\n        ").concat(mergedProps.pattern !== 'none' ? "pattern-".concat(mergedProps.pattern) : '', "\n        ").concat(mergedProps.hoverEffect !== 'none' ? "hover-".concat(mergedProps.hoverEffect) : '', "\n        ").concat(themeVariant === "standard" ? "border" : "", "\n      "), style: __assign({ width: "".concat(mergedProps.width || ''), height: "".concat(mergedProps.height || ''), minHeight: "".concat(mergedProps.minHeight || ''), minWidth: "".concat(mergedProps.minWidth || ''), maxHeight: mergedProps.maxHeight || '', maxWidth: mergedProps.maxWidth || '', margin: "".concat(mergedProps.margin || ''), padding: "".concat(mergedProps.padding || ''), background: mergedProps.gradient, opacity: mergedProps.opacity, border: mergedProps.border, position: 'relative', overflow: 'hidden' }, mergedProps.style) }, rest),
        mergedProps.pattern !== 'none' && (react_1.default.createElement("div", { className: "card-pattern-overlay", style: {
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                pointerEvents: 'none',
                opacity: mergedProps.patternOpacity,
                mixBlendMode: 'multiply',
                backgroundImage: mergedProps.pattern === 'grid' ?
                    "linear-gradient(to right, rgba(var(--borderRgb), 1) 1px, transparent 1px),\n                 linear-gradient(to bottom, rgba(var(--borderRgb), 1) 1px, transparent 1px)" :
                    mergedProps.pattern === 'dots' ?
                        "radial-gradient(rgba(var(--borderRgb), 1) 1px, transparent 1px)" :
                        mergedProps.pattern === 'diagonal' ?
                            "repeating-linear-gradient(45deg, rgba(var(--borderRgb), 1), rgba(var(--borderRgb), 1) 1px, transparent 1px, transparent 10px)" :
                            mergedProps.pattern === 'checkerboard' ?
                                "linear-gradient(45deg, rgba(var(--borderRgb), 1) 25%, transparent 25%), \n                 linear-gradient(-45deg, rgba(var(--borderRgb), 1) 25%, transparent 25%), \n                 linear-gradient(45deg, transparent 75%, rgba(var(--borderRgb), 1) 75%), \n                 linear-gradient(-45deg, transparent 75%, rgba(var(--borderRgb), 1) 75%)" :
                                mergedProps.pattern === 'horizontal' ?
                                    "linear-gradient(to bottom, rgba(var(--borderRgb), 1) 1px, transparent 1px)" :
                                    mergedProps.pattern === 'vertical' ?
                                        "linear-gradient(to right, rgba(var(--borderRgb), 1) 1px, transparent 1px)" : 'none',
                backgroundSize: mergedProps.pattern === 'grid' ? '20px 20px' :
                    mergedProps.pattern === 'dots' ? '10px 10px' :
                        mergedProps.pattern === 'diagonal' ? '20px 20px' :
                            mergedProps.pattern === 'checkerboard' ? '20px 20px' :
                                mergedProps.pattern === 'horizontal' ? '100% 10px' :
                                    mergedProps.pattern === 'vertical' ? '10px 100%' : 'auto'
            } })),
        hasImageContent ? (ImageContent) : (mergedProps.image ? react_1.default.createElement("div", { className: "".concat(mergedProps.fab ? 'relative' : '') },
            mergedProps.image,
            " ",
            mergedProps.fab ? mergedProps.fab : '') : ''),
        react_1.default.createElement(View_1.default, { funcss: hasImageContent ? 'p' : '' },
            hasEnhancedContent ? (react_1.default.createElement(CardHeader_1.default, { style: mergedProps.headerStyle, className: mergedProps.headerClass }, EnhancedTextContent)) : (mergedProps.header && !mergedProps.horizontal ? (react_1.default.createElement(CardHeader_1.default, { style: mergedProps.headerStyle, className: mergedProps.headerClass }, renderContent(mergedProps.header))) : ''),
            mergedProps.body ?
                react_1.default.createElement("div", null,
                    mergedProps.horizontal && !hasEnhancedContent ? (react_1.default.createElement(CardHeader_1.default, { style: mergedProps.headerStyle, className: mergedProps.headerClass }, renderContent(mergedProps.header))) : '',
                    react_1.default.createElement(CardBody_1.default, { style: mergedProps.bodyStyle, className: mergedProps.bodyClass }, hasEnhancedContent ? EnhancedTextContent : renderContent(mergedProps.body)),
                    mergedProps.horizontal && !hasEnhancedFooter ? (react_1.default.createElement(CardFooter_1.default, { style: mergedProps.footerStyle, className: mergedProps.footerClass }, renderContent(mergedProps.footer))) : '')
                : '',
            mergedProps.children && (react_1.default.createElement(CardBody_1.default, { style: mergedProps.bodyStyle, className: mergedProps.bodyClass }, renderContent(mergedProps.children))),
            hasEnhancedFooter ? (react_1.default.createElement(CardFooter_1.default, { style: mergedProps.footerStyle, className: mergedProps.footerClass },
                react_1.default.createElement(CTAButtons, null))) : (mergedProps.footer && !mergedProps.horizontal ? (react_1.default.createElement(CardFooter_1.default, { style: mergedProps.footerStyle, className: mergedProps.footerClass }, renderContent(mergedProps.footer))) : ''))));
}
