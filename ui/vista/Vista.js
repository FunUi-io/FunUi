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
    var sectionRef = (0, react_1.useRef)(null);
    var contentRef = (0, react_1.useRef)(null);
    // Helper function to get color from CSS variable name
    var getColorValue = function (colorName, fallback) {
        if (fallback === void 0) { fallback = '#000000'; }
        if (!colorName)
            return fallback;
        return (0, getCssVariable_1.getCssVariableValue)(colorName) || fallback;
    };
    // Check if there's a background image/video
    var hasBackgroundMedia = function () {
        return final.backgroundMode === 'background' &&
            final.backgroundMedia !== 'none' &&
            (final.backgroundImage || final.backgroundVideo);
    };
    // Get default text colors based on background
    var getDefaultTextColor = function () {
        if (hasBackgroundMedia() || final.bg) {
            return '';
        }
        return '';
    };
    // Get gradient color value
    var getGradientColorValue = function () {
        return getColorValue(final.gradientColor, 'primary');
    };
    // Get media size
    var getMediaSize = function () {
        if (final.mediaSize) {
            return final.mediaSize;
        }
        if (final.mediaType === 'iframe' && final.iframeSize) {
            return final.iframeSize;
        }
        return undefined;
    };
    var layoutClass = [
        final.layout || 'centered',
        final.reverse ? 'reverse' : '',
    ]
        .filter(Boolean)
        .join(' ');
    // Filter styles helper
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
            final.showPrimaryCTA && (react_1.default.createElement(Button_1.default, { bg: "primary", outlined: final.primaryButtonOutlined, onClick: function () { return final.ctaPrimaryUrl && (window.location.href = final.ctaPrimaryUrl); }, rounded: final.ctaPrimaryRounded, flat: final.ctaPrimaryFlat, stringPrefix: final.ctaPrimaryPrefix, stringSuffix: final.ctaPrimarySuffix, iconSize: final.primaryIconSize, funcss: final.primaryButtonFuncss, small: final.primaryButtonSmall, big: final.primaryButtonBig }, final.ctaPrimaryText)),
            final.showSecondaryCTA && (react_1.default.createElement(Button_1.default, { bg: "secondary", outlined: final.secondaryButtonOutlined, onClick: function () { return final.ctaSecondaryUrl && (window.location.href = final.ctaSecondaryUrl); }, rounded: final.ctaSecondaryRounded, flat: final.ctaSecondaryFlat, stringPrefix: final.ctaSecondaryPrefix, stringSuffix: final.ctaSecondarySuffix, iconSize: final.secondaryIconSize, funcss: final.secondaryButtonFuncss, small: final.secondaryButtonSmall, big: final.secondaryButtonBig }, final.ctaSecondaryText)),
            final.showAccentCTA && (react_1.default.createElement(Button_1.default, { bg: "accent", outlined: final.accentButtonOutlined, onClick: function () { return final.ctaAccentUrl && (window.location.href = final.ctaAccentUrl); }, rounded: final.ctaAccentRounded, flat: final.ctaAccentFlat, stringPrefix: final.ctaAccentPrefix, stringSuffix: final.ctaAccentSuffix, iconSize: final.accentIconSize, funcss: final.accentButtonFuncss, small: final.accentButtonSmall, big: final.accentButtonBig }, final.ctaAccentText))));
    };
    // Content Component
    var ContentComponent = (react_1.default.createElement("div", { ref: contentRef, className: "vista-content ".concat(final.layout === 'centered' ? "text-center" : "", " ").concat(final.contentWrapperClass || ''), style: {
            position: 'relative',
            zIndex: 2,
            textAlign: final.textAlign || 'center', // Moved text-align here
        } },
        final.heading && (react_1.default.createElement(Text_1.default, { block: true, size: final.headingSize || "6xl", weight: final.headingWeight, color: final.headingColor || getDefaultTextColor(), funcss: final.headingClass, textAlign: final.textAlign || "center" }, final.heading)),
        final.subheading && (react_1.default.createElement(Text_1.default, { block: true, size: final.subheadingSize || "lg", weight: final.subheadingWeight, color: final.subheadingColor || getDefaultTextColor(), funcss: "mt-2 ".concat(final.subheadingClass || ''), textAlign: final.textAlign || "center" }, final.subheading)),
        final.content && (react_1.default.createElement(Text_1.default, { block: true, size: final.contentSize, weight: final.contentWeight, color: final.contentColor || getDefaultTextColor(), funcss: "mt-4 ".concat(final.contentClass || ''), article: true, textAlign: final.textAlign || "center" }, localProps.children || (typeof final.content === 'string' ? react_1.default.createElement("div", { dangerouslySetInnerHTML: { __html: final.content } }) : final.content))),
        final.cta ? (react_1.default.createElement("div", { className: "mt-6 ".concat(final.ctaClass || '') }, final.cta)) : (react_1.default.createElement(CTAButtons, null))));
    // Media Component (only shown when not in background mode)
    var MediaComponent = function () {
        if (final.backgroundMode === 'background')
            return null;
        var mediaType = final.mediaType || 'image';
        var hasMedia = final.media || final.mediaUrl || final.videoUrl || final.iframeUrl || final.customMedia;
        if (!hasMedia)
            return null;
        var mediaSize = getMediaSize();
        var mediaWrapperStyle = {
            position: 'relative',
            width: mediaSize || '100%',
            margin: '0 auto',
        };
        var mediaStyle = {
            objectFit: 'cover',
            width: mediaSize || '100%',
            borderRadius: 'inherit',
            filter: getFilterStyle(final.mediaFilter, final.mediaFilterValue),
        };
        return (react_1.default.createElement("div", { className: "vista-media ".concat(final.mediaCss || '', " ").concat(final.mediaWrapperClass || ''), style: mediaWrapperStyle },
            mediaType === 'custom' && final.customMedia && (react_1.default.createElement("div", { style: { position: 'relative', width: '100%' } }, final.customMedia)),
            mediaType === 'video' && final.videoUrl && (react_1.default.createElement("div", { style: { position: 'relative', maxWidth: mediaSize, width: '100%', aspectRatio: '16/9', margin: '0 auto' } },
                react_1.default.createElement(Video_1.default, { src: final.videoUrl, autoPlay: final.videoAutoplay, loop: final.videoLoop, muted: final.videoMuted, funcss: final.mediaCss || '', style: {
                        filter: getFilterStyle(final.mediaFilter, final.mediaFilterValue),
                    } }))),
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
                        display: 'block',
                        filter: getFilterStyle(final.mediaFilter, final.mediaFilterValue),
                    }, allowFullScreen: true, allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture", title: "Vista media content" }))),
            mediaType === 'image' && (final.media || final.mediaUrl) && (react_1.default.createElement("div", { style: { position: 'relative', width: '100%' } }, final.media ? (react_1.default.createElement("div", { style: { width: '100%', maxWidth: mediaSize, margin: '0 auto' } }, final.media)) : (react_1.default.createElement("img", { src: final.mediaUrl, alt: final.mediaAlt || 'Vista media', className: final.mediaCss || '', style: mediaStyle, loading: "lazy" }))))));
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
    var primaryColor = getColorValue('primary');
    var secondaryColor = getColorValue('secondary');
    var gradientStyle = __assign({ position: 'absolute', width: final.gradientSize || "200px", height: final.gradientSize || "200px", background: final.gradientColors
            ? "radial-gradient(circle, ".concat(getColorValue(final.gradientColors.split(',')[0]), ", ").concat(getColorValue(final.gradientColors.split(',')[1]), ")")
            : "radial-gradient(circle, ".concat(primaryColor, ", ").concat(secondaryColor, ")"), opacity: final.opacity || 0.7, filter: "blur(".concat(final.blurry || 4, "rem)"), pointerEvents: 'none', zIndex: 0 }, positionStyles[final.gradientPosition || 'center']);
    // Get gradient overlay style - UPDATED with 'even' option
    var getGradientOverlayStyle = function () {
        if (!final.gradientOverlay)
            return {};
        var gradientColor = getGradientColorValue();
        var opacity = final.gradientOpacity || 0.7;
        // When 'even' is selected, use solid color (same color from 0% to 100%)
        if (final.gradientDirection === 'even') {
            return {
                background: gradientColor,
                opacity: opacity,
            };
        }
        if (final.gradientDirection === 'radial') {
            return {
                background: "radial-gradient(circle at center, ".concat(gradientColor, " 0%, transparent 100%)"),
                opacity: opacity,
            };
        }
        // Default to linear gradient
        var direction = final.gradientLinearDirection || 'to right';
        // Correct gradient stops for different directions
        var gradientStops = '';
        switch (direction) {
            case 'to right':
                gradientStops = "".concat(gradientColor, " 0%, transparent 100%");
                break;
            case 'to left':
                gradientStops = "transparent 0%, ".concat(gradientColor, " 100%");
                break;
            case 'to bottom':
                gradientStops = "".concat(gradientColor, " 0%, transparent 100%");
                break;
            case 'to top':
                gradientStops = "transparent 0%, ".concat(gradientColor, " 100%");
                break;
            case 'to top right':
                gradientStops = "transparent 0%, ".concat(gradientColor, " 100%");
                break;
            case 'to top left':
                gradientStops = "".concat(gradientColor, " 0%, transparent 100%");
                break;
            case 'to bottom right':
                gradientStops = "".concat(gradientColor, " 0%, transparent 100%");
                break;
            case 'to bottom left':
                gradientStops = "transparent 0%, ".concat(gradientColor, " 100%");
                break;
            default:
                gradientStops = "".concat(gradientColor, " 0%, transparent 100%");
        }
        return {
            background: "linear-gradient(".concat(direction, ", ").concat(gradientStops, ")"),
            opacity: opacity,
        };
    };
    // Get fade color
    var getFadeColorValue = function () {
        if (!final.fade)
            return '';
        return getColorValue(final.fadeColor, 'page-bg') || '#ffffff';
    };
    // Get fade style
    var getFadeStyle = function () {
        var fadeColor = getFadeColorValue();
        if (!fadeColor)
            return {};
        if (final.fadeRadial) {
            return {
                background: "radial-gradient(circle, transparent 30%, ".concat(fadeColor, " 100%)"),
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
    return (react_1.default.createElement("div", { ref: sectionRef, id: final.id, className: "vista \n        ".concat(final.backgroundMode === 'background' ? 'vista-background-mode' : '', "\n        ").concat(final.pattern === 'grid' ? 'grid-bg' :
            final.pattern === 'dots' ? 'bg-pattern-dots' :
                final.pattern === 'diagonal' ? 'bg-pattern-diagonal' :
                    final.pattern === 'checkerboard' ? 'bg-pattern-checkerboard' :
                        final.pattern === 'horizontal' ? 'bg-pattern-horizontal' :
                            final.pattern === 'vertical' ? 'bg-pattern-vertical' : '', " \n          ").concat(final.bg ? "bg-".concat(final.bg) : '', " ").concat(final.padding ? "p-".concat(final.padding) : '', " ").concat(layoutClass, " ").concat(final.sectionClass || '', " ").concat(final.funcss || ''), style: {
            position: 'relative',
            overflow: 'hidden',
            minHeight: 'auto',
            height: 'fit-content',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundImage: final.pattern && final.backgroundMode !== 'background' ?
                (final.pattern === 'grid' ? "linear-gradient(to right, rgba(var(--borderRgb), ".concat(final.patternOpacity || 0.1, ") 1px, transparent 1px),\n          linear-gradient(to bottom, rgba(var(--borderRgb), ").concat(final.patternOpacity || 0.1, ") 1px, transparent 1px)") :
                    final.pattern === 'dots' ? "radial-gradient(rgba(var(--borderRgb), ".concat(final.patternOpacity || 0.1, ") 1px, transparent 1px)") :
                        final.pattern === 'diagonal' ? "repeating-linear-gradient(45deg, rgba(var(--borderRgb), ".concat(final.patternOpacity || 0.1, "), rgba(var(--borderRgb), ").concat(final.patternOpacity || 0.1, ") 1px, transparent 1px, transparent 10px)") :
                            final.pattern === 'checkerboard' ? "linear-gradient(45deg, rgba(var(--borderRgb), ".concat(final.patternOpacity || 0.1, ") 25%, transparent 25%), linear-gradient(-45deg, rgba(var(--borderRgb), ").concat(final.patternOpacity || 0.1, ") 25%, transparent 25%), linear-gradient(45deg, transparent 75%, rgba(var(--borderRgb), ").concat(final.patternOpacity || 0.1, ") 75%), linear-gradient(-45deg, transparent 75%, rgba(var(--borderRgb), ").concat(final.patternOpacity || 0.1, ") 75%)") :
                                final.pattern === 'horizontal' ? "linear-gradient(to bottom, rgba(var(--borderRgb), ".concat(final.patternOpacity || 0.1, ") 1px, transparent 1px)") :
                                    final.pattern === 'vertical' ? "linear-gradient(to right, rgba(var(--borderRgb), ".concat(final.patternOpacity || 0.1, ") 1px, transparent 1px)") : '') : undefined,
            backgroundSize: final.pattern && final.backgroundMode !== 'background' ? '40px 40px' : undefined,
        } },
        final.backgroundMode === 'background' && (react_1.default.createElement(react_1.default.Fragment, null,
            final.backgroundMedia === 'image' && final.backgroundImage && (react_1.default.createElement("div", { style: {
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 0,
                    backgroundImage: "url(".concat(final.backgroundImage, ")"),
                    backgroundSize: final.backgroundImageSize || 'cover',
                    backgroundPosition: final.backgroundImagePosition || 'center',
                    backgroundRepeat: final.backgroundImageRepeat ? 'repeat' : 'no-repeat',
                } })),
            final.backgroundMedia === 'video' && final.backgroundVideo && (react_1.default.createElement("div", { style: {
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 0,
                    overflow: 'hidden',
                } },
                react_1.default.createElement("video", { autoPlay: final.videoAutoplay !== false, loop: final.videoLoop !== false, muted: final.videoMuted !== false, poster: final.videoPoster, style: {
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        minWidth: '100%',
                        minHeight: '100%',
                        width: 'auto',
                        height: 'auto',
                        objectFit: 'cover',
                    } },
                    react_1.default.createElement("source", { src: final.backgroundVideo, type: "video/mp4" }),
                    "Your browser does not support the video tag."),
                !final.videoControls && (react_1.default.createElement("div", { style: {
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.3)',
                    } })))))),
        final.showGradient && (react_1.default.createElement("div", { className: "vista-gradient-blob", style: gradientStyle })),
        final.backgroundMode === 'background' && final.gradientOverlay && (react_1.default.createElement("div", { style: __assign(__assign({ position: 'absolute', inset: 0, width: '100%', height: '100%' }, getGradientOverlayStyle()), { zIndex: 1, pointerEvents: 'none' }) })),
        final.fade && (react_1.default.createElement("div", { className: "vista-fade-overlay", style: __assign(__assign({ position: 'absolute', inset: 0, width: '100%', height: '100%' }, getFadeStyle()), { zIndex: 2, pointerEvents: 'none' }) })),
        final.backgroundMode === 'background' ? (
        // BACKGROUND MODE: Full flex container for positioning
        react_1.default.createElement("div", { className: "vista-container ".concat(final.containerClass || ''), style: {
                position: 'relative',
                zIndex: 3,
                display: 'flex',
                width: '100%',
                height: '100%',
                justifyContent: final.contentJustify || 'center',
                alignItems: final.contentAlign || 'center',
                padding: '2rem',
            } },
            react_1.default.createElement("div", { style: {
                    maxWidth: final.contentWrapperMaxWidth || '700px',
                    width: '100%',
                } }, ContentComponent))) : (
        // PLAIN MODE: Regular layout with mediaLeft/mediaRight positioning
        react_1.default.createElement("div", { className: "vista-container ".concat(final.containerClass || ''), style: {
                position: 'relative',
                zIndex: 3,
                gap: final.gap || "2rem",
                display: 'flex',
                flexDirection: isCentered || isStacked ? 'column' : 'row',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100%',
                maxWidth: '1200px',
                flexWrap: 'wrap',
                margin: '0 auto',
                padding: '2rem',
                minHeight: 'auto',
            } }, isCentered || isStacked ? (react_1.default.createElement(react_1.default.Fragment, null,
            (final.mediaPosition === 'top') && react_1.default.createElement(MediaComponent, null),
            react_1.default.createElement("div", { style: {
                    maxWidth: final.contentWrapperMaxWidth || '100%',
                    width: '100%',
                } }, ContentComponent),
            (final.mediaPosition === 'bottom' || !final.mediaPosition) && react_1.default.createElement(MediaComponent, null))) : final.reverse ? (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("div", { style: { flex: 1 } },
                react_1.default.createElement(MediaComponent, null)),
            react_1.default.createElement("div", { style: { flex: 1 } }, ContentComponent))) : (react_1.default.createElement(react_1.default.Fragment, null,
            isMediaLeft && (react_1.default.createElement("div", { style: { flex: 1 } },
                react_1.default.createElement(MediaComponent, null))),
            react_1.default.createElement("div", { style: { flex: 1 } }, ContentComponent),
            isMediaRight && (react_1.default.createElement("div", { style: { flex: 1 } },
                react_1.default.createElement(MediaComponent, null)))))))));
};
exports.default = Vista;
