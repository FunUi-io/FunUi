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
function Card(localProps) {
    // Use the component config hook with the variant from localProps
    var mergeWithLocal = (0, componentUtils_1.useComponentConfiguration)('Card', localProps.variant).mergeWithLocal;
    // Merge config with local props - local props override config
    var mergedProps = mergeWithLocal(localProps).props;
    // Use mergedProps directly - they already have the correct merge logic applied
    var final = mergedProps;
    var themeVariant = (0, theme_1.useVariant)().variant;
    // Handle content - if string, use dangerouslySetInnerHTML, otherwise render as is
    var renderContent = function (content) {
        if (typeof content === 'string') {
            return react_1.default.createElement("div", { dangerouslySetInnerHTML: { __html: content } });
        }
        return content;
    };
    // CTA Buttons Component
    var CTAButtons = function () {
        var hasCTAs = final.showPrimaryCTA || final.showSecondaryCTA || final.showAccentCTA;
        if (!hasCTAs)
            return null;
        return (react_1.default.createElement(Flex_1.default, { gap: final.ctaGap, justify: final.ctaFlexJustify, className: "mt-4 ".concat(final.ctaClass), wrap: "wrap", width: '100%' },
            final.showPrimaryCTA && (react_1.default.createElement(Button_1.default, { bg: "primary", outlined: final.primaryButtonOutlined, onClick: function () { return final.ctaPrimaryUrl && (window.location.href = final.ctaPrimaryUrl); }, rounded: final.ctaPrimaryRounded, flat: final.ctaPrimaryFlat, stringPrefix: final.ctaPrimaryPrefix, stringSuffix: final.ctaPrimarySuffix, iconSize: final.primaryIconSize, funcss: final.primaryButtonFuncss, small: final.primaryButtonSmall }, final.ctaPrimaryText)),
            final.showSecondaryCTA && (react_1.default.createElement(Button_1.default, { bg: "secondary", outlined: final.secondaryButtonOutlined, onClick: function () { return final.ctaSecondaryUrl && (window.location.href = final.ctaSecondaryUrl); }, rounded: final.ctaSecondaryRounded, flat: final.ctaSecondaryFlat, stringPrefix: final.ctaSecondaryPrefix, stringSuffix: final.ctaSecondarySuffix, iconSize: final.secondaryIconSize, funcss: final.secondaryButtonFuncss, small: final.secondaryButtonSmall }, final.ctaSecondaryText)),
            final.showAccentCTA && (react_1.default.createElement(Button_1.default, { bg: "accent", outlined: final.accentButtonOutlined, onClick: function () { return final.ctaAccentUrl && (window.location.href = final.ctaAccentUrl); }, rounded: final.ctaAccentRounded, flat: final.ctaAccentFlat, stringPrefix: final.ctaAccentPrefix, stringSuffix: final.ctaAccentSuffix, iconSize: final.accentIconSize, funcss: final.accentButtonFuncss, small: final.accentButtonSmall }, final.ctaAccentText))));
    };
    // Enhanced Text Content with flexible styling
    var EnhancedTextContent = (react_1.default.createElement("div", { className: "card-enhanced-content" },
        final.heading && (react_1.default.createElement(Text_1.default, { block: true, size: final.headingSize, weight: final.headingWeight, color: final.headingColor, funcss: final.headingClass, lineHeight: final.headingLineHeight }, renderContent(final.heading))),
        final.subheading && (react_1.default.createElement(Text_1.default, { block: true, size: final.subheadingSize, weight: final.subheadingWeight, color: final.subheadingColor, funcss: "mt-1 ".concat(final.subheadingClass), lineHeight: final.subheadingLineHeight }, renderContent(final.subheading))),
        final.content && (react_1.default.createElement(Text_1.default, { block: true, size: final.contentSize, weight: final.contentWeight, color: final.contentColor, funcss: "mt-3 ".concat(final.contentClass), lineHeight: final.contentLineHeight, article: true }, renderContent(final.content)))));
    // Image Content - uses imageUrl if no image component provided
    var ImageContent = (final.image || final.imageUrl) && (react_1.default.createElement("div", { className: "card-image-content" }, final.image ? (final.image) : (final.imageUrl && (react_1.default.createElement("img", { src: final.imageUrl, alt: final.imageAlt, className: final.imageClass, style: {
            width: final.imageSize,
            height: 'auto',
            objectFit: 'cover',
            borderRadius: 'inherit'
        } })))));
    // Determine if we should use enhanced content
    var hasEnhancedContent = final.heading || final.subheading || final.content;
    var hasEnhancedFooter = final.showPrimaryCTA || final.showSecondaryCTA || final.showAccentCTA;
    var hasImageContent = final.image || final.imageUrl;
    return (react_1.default.createElement("div", { id: final.id || '', className: "\n        card \n        card_flex\n        ".concat(!final.image && !final.imageUrl ? "p" : "", "\n        ").concat(final.noGap ? 'no-gap' : '', " \n        ").concat(final.xl ? 'xl' : '', " \n        text-").concat(final.color || '', " \n        ").concat(final.bg || '', " \n        ").concat(final.funcss || '', " \n        ").concat(final.roundEdge ? 'round-edge' : '', " \n        ").concat(final.shadowless ? 'shadowless' : '', " \n        ").concat(final.flat ? 'flat' : '', " \n        ").concat(final.horizontal ? 'horizontalCard' : '', "\n        ").concat(final.responsiveMedium ? 'responsiveMedium' : '', "\n        ").concat(final.responsiveSmall ? 'responsiveSmall' : '', "\n        ").concat(final.pattern !== 'none' ? "pattern-".concat(final.pattern) : '', "\n      "), style: __assign({ width: "".concat(final.width || ''), height: "".concat(final.height || ''), minHeight: "".concat(final.minHeight || ''), minWidth: "".concat(final.minWidth || ''), maxHeight: final.maxHeight || '', maxWidth: final.maxWidth || '', margin: "".concat(final.margin || ''), padding: "".concat(final.padding || ''), background: final.gradient, opacity: final.opacity, position: 'relative', overflow: 'hidden' }, final.style) },
        final.pattern !== 'none' && (react_1.default.createElement("div", { className: "card-pattern-overlay", style: {
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                pointerEvents: 'none',
                opacity: final.patternOpacity,
                mixBlendMode: 'multiply',
                backgroundImage: final.pattern === 'grid' ?
                    "linear-gradient(to right, rgba(var(--borderRgb), 1) 1px, transparent 1px),\n                 linear-gradient(to bottom, rgba(var(--borderRgb), 1) 1px, transparent 1px)" :
                    final.pattern === 'dots' ?
                        "radial-gradient(rgba(var(--borderRgb), 1) 1px, transparent 1px)" :
                        final.pattern === 'diagonal' ?
                            "repeating-linear-gradient(45deg, rgba(var(--borderRgb), 1), rgba(var(--borderRgb), 1) 1px, transparent 1px, transparent 10px)" :
                            final.pattern === 'checkerboard' ?
                                "linear-gradient(45deg, rgba(var(--borderRgb), 1) 25%, transparent 25%), \n                 linear-gradient(-45deg, rgba(var(--borderRgb), 1) 25%, transparent 25%), \n                 linear-gradient(45deg, transparent 75%, rgba(var(--borderRgb), 1) 75%), \n                 linear-gradient(-45deg, transparent 75%, rgba(var(--borderRgb), 1) 75%)" :
                                final.pattern === 'horizontal' ?
                                    "linear-gradient(to bottom, rgba(var(--borderRgb), 1) 1px, transparent 1px)" :
                                    final.pattern === 'vertical' ?
                                        "linear-gradient(to right, rgba(var(--borderRgb), 1) 1px, transparent 1px)" : 'none',
                backgroundSize: final.pattern === 'grid' ? '20px 20px' :
                    final.pattern === 'dots' ? '10px 10px' :
                        final.pattern === 'diagonal' ? '20px 20px' :
                            final.pattern === 'checkerboard' ? '20px 20px' :
                                final.pattern === 'horizontal' ? '100% 10px' :
                                    final.pattern === 'vertical' ? '10px 100%' : 'auto'
            } })),
        hasImageContent ? (ImageContent) : (final.image ? react_1.default.createElement("div", { className: "".concat(final.fab ? 'relative' : '') },
            final.image,
            " ",
            final.fab ? final.fab : '') : ''),
        react_1.default.createElement(View_1.default, { funcss: hasImageContent ? 'p' : '' },
            hasEnhancedContent ? (react_1.default.createElement(CardHeader_1.default, { style: final.headerStyle, className: final.headerClass }, EnhancedTextContent)) : (final.header && !final.horizontal ? (react_1.default.createElement(CardHeader_1.default, { style: final.headerStyle, className: final.headerClass }, renderContent(final.header))) : ''),
            final.body ?
                react_1.default.createElement("div", null,
                    final.horizontal && !hasEnhancedContent ? (react_1.default.createElement(CardHeader_1.default, { style: final.headerStyle, className: final.headerClass }, renderContent(final.header))) : '',
                    react_1.default.createElement(CardBody_1.default, { style: final.bodyStyle, className: final.bodyClass }, hasEnhancedContent ? EnhancedTextContent : renderContent(final.body)),
                    final.horizontal && !hasEnhancedFooter ? (react_1.default.createElement(CardFooter_1.default, { style: final.footerStyle, className: final.footerClass }, renderContent(final.footer))) : '')
                : '',
            final.children && (react_1.default.createElement(CardBody_1.default, { style: final.bodyStyle, className: final.bodyClass }, renderContent(final.children))),
            hasEnhancedFooter ? (react_1.default.createElement(CardFooter_1.default, { style: final.footerStyle, className: final.footerClass },
                react_1.default.createElement(CTAButtons, null))) : (final.footer && !final.horizontal ? (react_1.default.createElement(CardFooter_1.default, { style: final.footerStyle, className: final.footerClass }, renderContent(final.footer))) : ''))));
}
