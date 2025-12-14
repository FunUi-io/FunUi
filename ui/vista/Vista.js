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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var getCssVariable_1 = require("../../utils/getCssVariable");
var componentUtils_1 = require("../../utils/componentUtils");
var Text_1 = __importDefault(require("../text/Text"));
var Button_1 = __importDefault(require("../button/Button"));
var Flex_1 = __importDefault(require("../flex/Flex"));
var Video_1 = __importDefault(require("../video/Video"));
var Vista = function (localProps) {
    var mergeWithLocal = (0, componentUtils_1.useComponentConfiguration)('Vista', localProps.variant).mergeWithLocal;
    var mergedProps = mergeWithLocal(localProps).props;
    var final = mergedProps;
    var _a = (0, react_1.useState)(0), scrollY = _a[0], setScrollY = _a[1];
    var sectionRef = (0, react_1.useRef)(null);
    // Parallax effect
    (0, react_1.useEffect)(function () {
        if (!final.parallax)
            return;
        var handleScroll = function () {
            if (sectionRef.current) {
                var rect = sectionRef.current.getBoundingClientRect();
                var scrollProgress = -rect.top;
                setScrollY(scrollProgress * (final.parallaxSpeed || 0.5));
            }
        };
        window.addEventListener('scroll', handleScroll);
        return function () { return window.removeEventListener('scroll', handleScroll); };
    }, [final.parallax, final.parallaxSpeed]);
    // Get media size - updated logic for all media types
    var getMediaSize = function () {
        // Priority order for mediaSize:
        // 1. If mediaSize is passed, it affects all media types
        // 2. For backward compatibility, also check iframeSize for iframes
        // 3. Fallback to undefined
        if (final.mediaSize) {
            return final.mediaSize;
        }
        // For backward compatibility with iframeSize
        if (final.mediaType === 'iframe' && final.iframeSize) {
            return final.iframeSize;
        }
        return undefined;
    };
    var layoutClass = [
        final.layout || 'centered',
        final.reverse ? 'reverse' : '',
        "text-".concat(final.textAlign || 'left'),
    ]
        .filter(Boolean)
        .join(' ');
    // Hover effect class
    var getHoverClass = function () {
        if (!final.hoverEffect || final.hoverEffect === 'none')
            return '';
        return "vista-hover-".concat(final.hoverEffect);
    };
    // Filter styles helper - used for all media types
    var getFilterStyle = function (filter, filterValue) {
        if (!filter || filter === 'none')
            return '';
        var value = filterValue || 1;
        switch (filter) {
            case 'grayscale':
                return "grayscale(".concat(value, ")");
            case 'sepia':
                return "sepia(".concat(value, ")");
            case 'blur':
                return "blur(".concat(value, "px)");
            case 'brightness':
                return "brightness(".concat(value, ")");
            case 'contrast':
                return "contrast(".concat(value, ")");
            default:
                return '';
        }
    };
    // CTA Buttons Component
    var CTAButtons = function () {
        var hasCTAs = final.showPrimaryCTA || final.showSecondaryCTA || final.showAccentCTA;
        if (!hasCTAs)
            return null;
        return (react_1.default.createElement(Flex_1.default, { gap: final.ctaGap, justify: final.ctaFlexJustify, className: "mt-6 ".concat(final.ctaClass || ''), wrap: "wrap", width: '100%' },
            final.showPrimaryCTA && (react_1.default.createElement(Button_1.default, { bg: "primary", outlined: final.primaryButtonOutlined, onClick: function () { return final.ctaPrimaryUrl && (window.location.href = final.ctaPrimaryUrl); }, rounded: final.ctaPrimaryRounded, flat: final.ctaPrimaryFlat, stringPrefix: final.ctaPrimaryPrefix, stringSuffix: final.ctaPrimarySuffix, iconSize: final.primaryIconSize, funcss: final.primaryButtonFuncss, small: final.primaryButtonSmall }, final.ctaPrimaryText)),
            final.showSecondaryCTA && (react_1.default.createElement(Button_1.default, { bg: "secondary", outlined: final.secondaryButtonOutlined, onClick: function () { return final.ctaSecondaryUrl && (window.location.href = final.ctaSecondaryUrl); }, rounded: final.ctaSecondaryRounded, flat: final.ctaSecondaryFlat, stringPrefix: final.ctaSecondaryPrefix, stringSuffix: final.ctaSecondarySuffix, iconSize: final.secondaryIconSize, funcss: final.secondaryButtonFuncss, small: final.secondaryButtonSmall }, final.ctaSecondaryText)),
            final.showAccentCTA && (react_1.default.createElement(Button_1.default, { bg: "accent", outlined: final.accentButtonOutlined, onClick: function () { return final.ctaAccentUrl && (window.location.href = final.ctaAccentUrl); }, rounded: final.ctaAccentRounded, flat: final.ctaAccentFlat, stringPrefix: final.ctaAccentPrefix, stringSuffix: final.ctaAccentSuffix, iconSize: final.accentIconSize, funcss: final.accentButtonFuncss, small: final.accentButtonSmall }, final.ctaAccentText))));
    };
    // Enhanced Text Content
    var TextContent = (react_1.default.createElement("div", { className: "vista-text ".concat(final.layout === 'centered' ? "text-center" : "", " ").concat(final.textWrapperClass || '') },
        final.heading && (react_1.default.createElement(Text_1.default, { block: true, size: final.headingSize, weight: final.headingWeight, color: final.headingColor, funcss: final.headingClass }, final.heading)),
        final.subheading && (react_1.default.createElement(Text_1.default, { block: true, size: final.subheadingSize, weight: final.subheadingWeight, color: final.subheadingColor, funcss: "mt-2 ".concat(final.subheadingClass || '') }, final.subheading)),
        final.content && (react_1.default.createElement(Text_1.default, { block: true, size: final.contentSize, weight: final.contentWeight, color: final.contentColor, funcss: "mt-4 ".concat(final.contentClass || ''), article: true }, localProps.children || (typeof final.content === 'string' ? react_1.default.createElement("div", { dangerouslySetInnerHTML: { __html: final.content } }) : final.content))),
        final.cta ? (react_1.default.createElement("div", { className: "mt-6 ".concat(final.ctaClass || '') }, final.cta)) : (react_1.default.createElement(CTAButtons, null))));
    // Enhanced Media Content
    var MediaContent = function () {
        var _a;
        var mediaType = final.mediaType || 'image';
        var hasMedia = final.media || final.mediaUrl || final.videoUrl || final.iframeUrl || final.customMedia;
        if (!hasMedia)
            return null;
        var mediaSize = getMediaSize();
        var mediaWrapperStyle = {
            position: 'relative',
            transform: final.parallax ? "translateY(".concat(scrollY, "px)") : undefined,
            transition: final.parallax ? 'transform 0.1s linear' : undefined,
            width: '100%',
            maxWidth: mediaSize || '100%',
            margin: '0 auto',
        };
        var mediaStyle = {
            objectFit: 'cover',
            maxWidth: mediaSize,
            width: '100%',
            borderRadius: 'inherit',
            filter: getFilterStyle(final.mediaFilter, final.mediaFilterValue),
            mixBlendMode: final.mediaBlendMode,
        };
        var overlayStyle = final.mediaOverlay ? {
            position: 'absolute',
            inset: 0,
            backgroundColor: final.mediaOverlayColor || 'rgba(0, 0, 0, 0.3)',
            opacity: (_a = final.mediaOverlayOpacity) !== null && _a !== void 0 ? _a : 1,
            pointerEvents: 'none',
            borderRadius: 'inherit',
            zIndex: 1,
        } : {};
        return (react_1.default.createElement("div", { className: "vista-media ".concat(final.mediaCss || '', " ").concat(final.mediaWrapperClass || ''), style: mediaWrapperStyle },
            mediaType === 'custom' && final.customMedia && (react_1.default.createElement("div", { style: { position: 'relative', width: '100%' } },
                final.customMedia,
                final.mediaOverlay && react_1.default.createElement("div", { style: overlayStyle }))),
            mediaType === 'video' && final.videoUrl && (react_1.default.createElement("div", { style: { position: 'relative', maxWidth: mediaSize, width: '100%', aspectRatio: '16/9', margin: '0 auto' } },
                react_1.default.createElement(Video_1.default, { src: final.videoUrl, autoPlay: final.videoAutoplay, loop: final.videoLoop, muted: final.videoMuted, poster: final.videoPoster, funcss: final.mediaCss || '', style: {
                        filter: getFilterStyle(final.mediaFilter, final.mediaFilterValue),
                        mixBlendMode: final.mediaBlendMode,
                    } }),
                final.mediaOverlay && react_1.default.createElement("div", { style: overlayStyle }))),
            mediaType === 'iframe' && final.iframeUrl && (react_1.default.createElement("div", { className: "vista-iframe-wrapper", style: {
                    position: 'relative',
                    width: '100%',
                    maxWidth: mediaSize || '100%',
                    margin: '0 auto',
                    height: 'fit-content',
                } },
                react_1.default.createElement("iframe", { src: final.iframeUrl, className: "vista-iframe ".concat(final.mediaCss || ''), style: {
                        width: '100%',
                        height: 'auto',
                        aspectRatio: '16/9',
                        border: 'none',
                        display: 'block', // Crucial for 'height: auto' to work reliably
                        filter: getFilterStyle(final.mediaFilter, final.mediaFilterValue),
                        mixBlendMode: final.mediaBlendMode,
                    }, allowFullScreen: true, allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture", title: "Vista media content" }),
                final.mediaOverlay && react_1.default.createElement("div", { style: overlayStyle }))),
            mediaType === 'image' && (final.media || final.mediaUrl) && (react_1.default.createElement("div", { style: { position: 'relative', width: '100%' } },
                final.media ? (react_1.default.createElement("div", { style: { width: '100%', maxWidth: mediaSize, margin: '0 auto' } }, final.media)) : (react_1.default.createElement("img", { src: final.mediaUrl, alt: final.mediaAlt || 'Vista media', className: final.mediaCss || '', style: mediaStyle, loading: "lazy" })),
                final.mediaOverlay && react_1.default.createElement("div", { style: overlayStyle })))));
    };
    var isCentered = final.layout === 'centered';
    var isStacked = final.layout === 'stacked';
    var isMediaLeft = final.layout === 'mediaLeft';
    var isMediaRight = final.layout === 'mediaRight';
    var positionStyles = {
        'top-left': { top: '-100px', left: '-100px' },
        'top-right': { top: '-100px', right: '-100px' },
        'bottom-left': { bottom: '-100px', left: '-100px' },
        'bottom-right': { bottom: '-100px', right: '-100px' },
        center: { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' },
    };
    var primaryColor = (0, getCssVariable_1.getCssVariableValue)('primary');
    var secondaryColor = (0, getCssVariable_1.getCssVariableValue)('secondary');
    var gradientStyle = __assign({ position: 'absolute', width: final.gradientSize || "200px", height: final.gradientSize || "200px", background: final.gradientColors || "radial-gradient(circle, ".concat(primaryColor, ", ").concat(secondaryColor, ")"), opacity: final.opacity || 0.7, filter: "blur(".concat(final.blurry || 4, "rem)"), pointerEvents: 'none', zIndex: 0 }, positionStyles[final.gradientPosition || 'center']);
    // Get fade color - accepts color variable name or color string
    var getFadeColor = function () {
        if (!final.fade)
            return '';
        if (final.fadeColor) {
            // Try to get CSS variable value
            var colorValue = (0, getCssVariable_1.getCssVariableValue)(final.fadeColor);
            if (colorValue)
                return colorValue;
            // If not a variable, assume it's a color string
            return final.fadeColor;
        }
        // Default to page background
        return (0, getCssVariable_1.getCssVariableValue)('page-bg') || '#ffffff';
    };
    // Get fade style
    var getFadeStyle = function () {
        var fadeColor = getFadeColor();
        if (!fadeColor)
            return {};
        if (final.fadeRadial) {
            return {
                background: "radial-gradient(circle, transparent 0%, ".concat(fadeColor, " 100%)"),
            };
        }
        var direction = final.fadeDirection || 'bottom';
        var toDirectionMap = {
            top: 'to top',
            bottom: 'to bottom',
            left: 'to left',
            right: 'to right'
        };
        return {
            background: "linear-gradient(".concat(toDirectionMap[direction], ", transparent 0%, ").concat(fadeColor, " 100%)"),
        };
    };
    return (react_1.default.createElement("div", { ref: sectionRef, className: "vista \n        ".concat(final.pattern === 'grid' ? 'grid-bg' :
            final.pattern === 'dots' ? 'bg-pattern-dots' :
                final.pattern === 'diagonal' ? 'bg-pattern-diagonal' :
                    final.pattern === 'checkerboard' ? 'bg-pattern-checkerboard' :
                        final.pattern === 'horizontal' ? 'bg-pattern-horizontal' :
                            final.pattern === 'vertical' ? 'bg-pattern-vertical' : '', " \n          ").concat(final.bg ? "bg-".concat(final.bg) : '', " ").concat(final.padding ? "p-".concat(final.padding) : '', " ").concat(layoutClass, " ").concat(final.sectionClass || '', " ").concat(final.funcss || '', "\n          ").concat(getHoverClass()), style: {
            position: 'relative',
            overflow: 'hidden',
            minHeight: "90vh",
            backgroundImage: final.pattern === 'grid' ? "linear-gradient(to right, rgba(var(--borderRgb), ".concat(final.patternOpacity || 0.1, ") 1px, transparent 1px),\n        linear-gradient(to bottom, rgba(var(--borderRgb), ").concat(final.patternOpacity || 0.1, ") 1px, transparent 1px)") :
                final.pattern === 'dots' ? "radial-gradient(rgba(var(--borderRgb), ".concat(final.patternOpacity || 0.1, ") 1px, transparent 1px)") :
                    final.pattern === 'diagonal' ? "repeating-linear-gradient(45deg, rgba(var(--borderRgb), ".concat(final.patternOpacity || 0.1, "), rgba(var(--borderRgb), ").concat(final.patternOpacity || 0.1, ") 1px, transparent 1px, transparent 10px)") :
                        final.pattern === 'checkerboard' ? "linear-gradient(45deg, rgba(var(--borderRgb), ".concat(final.patternOpacity || 0.1, ") 25%, transparent 25%), linear-gradient(-45deg, rgba(var(--borderRgb), ").concat(final.patternOpacity || 0.1, ") 25%, transparent 25%), linear-gradient(45deg, transparent 75%, rgba(var(--borderRgb), ").concat(final.patternOpacity || 0.1, ") 75%), linear-gradient(-45deg, transparent 75%, rgba(var(--borderRgb), ").concat(final.patternOpacity || 0.1, ") 75%)") :
                            final.pattern === 'horizontal' ? "linear-gradient(to bottom, rgba(var(--borderRgb), ".concat(final.patternOpacity || 0.1, ") 1px, transparent 1px)") :
                                final.pattern === 'vertical' ? "linear-gradient(to right, rgba(var(--borderRgb), ".concat(final.patternOpacity || 0.1, ") 1px, transparent 1px)") : '',
            backgroundSize: final.pattern ? '40px 40px' : undefined,
        } },
        final.showGradient && (react_1.default.createElement("div", { className: "vista-gradient-blob", style: gradientStyle })),
        final.fade && (react_1.default.createElement("div", { className: "vista-fade-overlay", style: __assign(__assign({ position: 'absolute', inset: 0, width: '100%', height: '100%' }, getFadeStyle()), { zIndex: 0, pointerEvents: 'none' }) })),
        react_1.default.createElement("div", { className: "vista-container ".concat(final.containerClass || ''), style: {
                position: 'relative',
                zIndex: 1,
                gap: final.gap || "2rem",
                display: 'flex',
                flexDirection: isCentered || isStacked ? 'column' : 'row',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '2rem',
            } }, isCentered || isStacked ? (react_1.default.createElement(react_1.default.Fragment, null,
            (final.mediaPosition === 'top') && react_1.default.createElement(MediaContent, null),
            TextContent,
            (final.mediaPosition === 'bottom' || !final.mediaPosition) && react_1.default.createElement(MediaContent, null))) : final.reverse ? (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("div", { style: { flex: 1 } },
                react_1.default.createElement(MediaContent, null)),
            react_1.default.createElement("div", { style: { flex: 1 } }, TextContent))) : (react_1.default.createElement(react_1.default.Fragment, null,
            isMediaLeft && (react_1.default.createElement("div", { style: { flex: 1 } },
                react_1.default.createElement(MediaContent, null))),
            react_1.default.createElement("div", { style: { flex: 1 } }, TextContent),
            isMediaRight && (react_1.default.createElement("div", { style: { flex: 1 } },
                react_1.default.createElement(MediaContent, null))))))));
};
exports.default = Vista;
