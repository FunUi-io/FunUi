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
var getDynamicIcon_1 = require("../../utils/getDynamicIcon");
var useDynamicIcon = function (iconString) {
    var _a = (0, react_1.useState)(null), iconNode = _a[0], setIconNode = _a[1];
    var _b = (0, react_1.useState)(false), hasValidIcon = _b[0], setHasValidIcon = _b[1];
    (0, react_1.useEffect)(function () {
        if (!iconString || typeof iconString !== 'string' || iconString.trim() === '') {
            setIconNode(null);
            setHasValidIcon(false);
            return;
        }
        (0, getDynamicIcon_1.getDynamicIcon)(iconString).then(function (node) {
            if (node) {
                setIconNode(node);
                setHasValidIcon(true);
            }
            else {
                setIconNode(null);
                setHasValidIcon(false);
            }
        });
    }, [iconString]);
    return { iconNode: iconNode, hasValidIcon: hasValidIcon };
};
var FeatureIcon = function (_a) {
    var icon = _a.icon, iconColor = _a.iconColor, _b = _a.iconSize, iconSize = _b === void 0 ? 24 : _b, _c = _a.iconClassName, iconClassName = _c === void 0 ? '' : _c, layout = _a.layout, _d = _a.checklistIcon, checklistIcon = _d === void 0 ? 'PiCheck' : _d, _e = _a.checklistColor, checklistColor = _e === void 0 ? 'success' : _e, _f = _a.checklistSize, checklistSize = _f === void 0 ? 20 : _f, _g = _a.checklistClassName, checklistClassName = _g === void 0 ? '' : _g;
    var isStringIcon = icon && typeof icon === 'string';
    var _h = useDynamicIcon(isStringIcon ? icon : undefined), dynamicIconNode = _h.iconNode, hasValidDynamicIcon = _h.hasValidIcon;
    var _j = useDynamicIcon(layout === 'checklist' ? checklistIcon : undefined), checkmarkIconNode = _j.iconNode, hasValidCheckmarkIcon = _j.hasValidIcon;
    var getIconColorStyle = function (color) {
        if (!color)
            return {};
        if (color.startsWith('text-') || color.startsWith('bg-') || color.startsWith('border-')) {
            return {};
        }
        var colorNames = ['primary', 'secondary', 'accent', 'success', 'warning', 'error', 'info', 'dark', 'light'];
        if (colorNames.includes(color)) {
            var cssValue = (0, getCssVariable_1.getCssVariableValue)(color);
            if (cssValue) {
                return { color: cssValue };
            }
        }
        return { color: color };
    };
    var iconColorStyle = getIconColorStyle(iconColor);
    var checklistColorStyle = getIconColorStyle(checklistColor);
    var renderIconWithProps = function (iconElement, className, style, size) {
        if (!react_1.default.isValidElement(iconElement))
            return iconElement;
        var props = {
            className: className,
            style: __assign(__assign({}, style), iconElement.props.style),
        };
        if (size !== undefined) {
            props.size = size;
        }
        return react_1.default.cloneElement(iconElement, props);
    };
    if (icon && typeof icon !== 'string' && react_1.default.isValidElement(icon)) {
        return renderIconWithProps(icon, "feature-section__icon ".concat(iconClassName), iconColorStyle, iconSize);
    }
    if (isStringIcon && hasValidDynamicIcon && dynamicIconNode) {
        return renderIconWithProps(dynamicIconNode, "feature-section__icon ".concat(iconClassName), iconColorStyle, iconSize);
    }
    if (layout === 'checklist' && hasValidCheckmarkIcon && checkmarkIconNode) {
        return renderIconWithProps(checkmarkIconNode, "feature-section__checkmark ".concat(checklistClassName), checklistColorStyle, checklistSize);
    }
    return null;
};
var Feature = function (localProps) {
    var mergeWithLocal = (0, componentUtils_1.useComponentConfiguration)('Feature', localProps.variant).mergeWithLocal;
    var mergedProps = mergeWithLocal(localProps).props;
    var final = mergedProps;
    var _a = (0, react_1.useState)([]), featuresArray = _a[0], setFeaturesArray = _a[1];
    var _b = (0, react_1.useState)({}), responsiveColumns = _b[0], setResponsiveColumns = _b[1];
    // Parse features
    (0, react_1.useEffect)(function () {
        if (typeof final.features === 'string') {
            try {
                var parsed = JSON.parse(final.features);
                setFeaturesArray(Array.isArray(parsed) ? parsed : [parsed]);
            }
            catch (error) {
                console.error('Error parsing features JSON:', error);
                setFeaturesArray([]);
            }
        }
        else if (Array.isArray(final.features)) {
            setFeaturesArray(final.features);
        }
        else {
            setFeaturesArray([]);
        }
    }, [final.features]);
    // Parse responsive columns
    (0, react_1.useEffect)(function () {
        if (final.responsiveColumns) {
            try {
                var parsed = JSON.parse(final.responsiveColumns);
                if (parsed && typeof parsed === 'object') {
                    setResponsiveColumns(parsed);
                }
            }
            catch (error) {
                console.error('Error parsing responsive columns:', error);
                setResponsiveColumns({});
            }
        }
    }, [final.responsiveColumns]);
    var getSpacingValue = function (value, defaultValue) {
        if (defaultValue === void 0) { defaultValue = '0'; }
        if (!value)
            return defaultValue;
        if (/^\d+$/.test(value)) {
            return "".concat(parseInt(value) * 0.25, "rem");
        }
        return value;
    };
    var getButtonVariantClass = function (variant) {
        if (!variant)
            return '';
        var variantClasses = {
            'primary': 'btn-primary',
            'secondary': 'btn-secondary',
            'accent': 'btn-accent',
            'text': 'btn-text',
            'outline': 'btn-outline',
        };
        return variantClasses[variant] || "btn-".concat(variant);
    };
    var renderItemCTA = function (item) {
        if (!item.ctaText)
            return null;
        var ctaVariant = item.ctaVariant || 'text';
        var ctaClassName = item.ctaClassName || '';
        var ctaCss = item.ctaCss || '';
        var buttonClass = getButtonVariantClass(ctaVariant);
        return (react_1.default.createElement("a", { href: item.ctaUrl, onClick: item.ctaOnClick, className: "btn ".concat(buttonClass, " ").concat(ctaClassName, " ").concat(ctaCss, " feature-section__item-cta text-sm"), style: {
                marginTop: '1rem',
                display: 'inline-block',
                textDecoration: 'none',
            } }, item.ctaText));
    };
    var renderFeatureItem = function (item, index) {
        var _a, _b;
        if (item.customRender) {
            return item.customRender();
        }
        var iconColor = item.iconColor || final.iconColor;
        var iconSize = item.iconSize || final.iconSize || 24;
        var iconClassName = item.iconClassName || final.iconClassName || '';
        var checkmarkIcon = final.checkmarkIcon || 'PiCheck';
        var checkmarkColor = final.checkmarkColor || 'success';
        var checkmarkSize = final.checkmarkSize || 20;
        var checkmarkClassName = final.checkmarkClassName || '';
        var cardBg = item.cardBg || final.cardBg;
        var cardPadding = item.cardPadding || final.cardPadding || '1.5rem';
        var cardRounded = item.cardRounded || final.cardRounded || '0.5rem';
        var cardShadow = item.cardShadow || final.cardShadow || 'md';
        var cardBorder = (_b = (_a = item.cardBorder) !== null && _a !== void 0 ? _a : final.cardBorder) !== null && _b !== void 0 ? _b : true;
        var cardBorderColor = item.cardBorderColor || final.cardBorderColor || 'var(--borderRgb)';
        var cardHoverEffect = item.cardHoverEffect || final.cardHoverEffect || 'none';
        var titleSize = item.titleSize || final.itemTitleSize || '1.125rem';
        var titleWeight = item.titleWeight || final.itemTitleWeight || 600;
        var titleColor = item.titleColor || final.itemTitleColor || 'var(--text-color)';
        var titleClassName = item.titleClassName || '';
        var titleVariant = item.titleVariant || final.itemTitleVariant; // Updated
        var descriptionSize = item.descriptionSize || final.itemDescriptionSize || '0.875rem';
        var descriptionWeight = item.descriptionWeight || final.itemDescriptionWeight || 400;
        var descriptionColor = item.descriptionColor || final.itemDescriptionColor || 'var(--text-muted)';
        var descriptionClassName = item.descriptionClassName || '';
        var descriptionVariant = item.descriptionVariant || final.itemDescriptionVariant; // Updated
        var isGridLayout = final.layout === 'grid';
        var featureContent = (react_1.default.createElement("div", { className: "feature-section__item ".concat(item.className || ''), style: item.style },
            (item.icon || item.imageUrl || final.layout === 'checklist') && (react_1.default.createElement("div", { className: "feature-section__icon-container", style: { marginBottom: '1rem' } }, item.imageUrl ? (react_1.default.createElement("img", { src: item.imageUrl, alt: item.imageAlt || '', className: "feature-section__image ".concat(item.imageClassName || final.imageClassName || ''), style: __assign(__assign({ width: "".concat(iconSize, "px"), height: "".concat(iconSize, "px"), objectFit: 'cover', borderRadius: '50%' }, item.imageStyle), final.imageStyle) })) : (react_1.default.createElement("div", { className: "feature-section__icon-wrapper" },
                react_1.default.createElement(FeatureIcon, { icon: item.icon, iconColor: iconColor, iconSize: iconSize, iconClassName: iconClassName, layout: final.layout, checklistIcon: checkmarkIcon, checklistColor: checkmarkColor, checklistSize: checkmarkSize, checklistClassName: checkmarkClassName }))))),
            item.title && (react_1.default.createElement(Text_1.default, { variant: titleVariant, block: true, size: titleSize, weight: titleWeight, color: titleColor, funcss: "feature-section__title ".concat(titleClassName), style: { marginBottom: '0.75rem' } }, item.title)),
            item.description && (react_1.default.createElement(Text_1.default, { variant: descriptionVariant, block: true, size: descriptionSize, weight: descriptionWeight, color: descriptionColor, funcss: "feature-section__description ".concat(descriptionClassName) }, item.description)),
            item.content && (react_1.default.createElement("div", { className: "feature-section__additional-content", style: { marginTop: '1rem' } }, item.content)),
            renderItemCTA(item)));
        // For grid layout with cards
        if (isGridLayout && cardBg) {
            var cardClasses = [
                'feature-section__card',
                cardHoverEffect !== 'none' ? "feature-section__card--hover-".concat(cardHoverEffect) : '',
                item.className || '',
            ].filter(Boolean).join(' ');
            var cardStyles = __assign({ padding: getSpacingValue(cardPadding, '1.5rem'), borderRadius: cardRounded, backgroundColor: cardBg ? (0, getCssVariable_1.getCssVariableValue)(cardBg) || cardBg : undefined, boxShadow: cardShadow !== 'none' ? (0, getCssVariable_1.getCssVariableValue)("shadow-".concat(cardShadow)) || undefined : undefined, border: cardBorder ? "1px solid ".concat((0, getCssVariable_1.getCssVariableValue)(cardBorderColor) || cardBorderColor) : 'none', height: '100%' }, item.style);
            return (react_1.default.createElement("div", { key: index, className: cardClasses, style: cardStyles }, featureContent));
        }
        return featureContent;
    };
    var getResponsiveGridColumns = function () {
        var defaultColumns = final.columns || 3;
        if (Object.keys(responsiveColumns).length === 0) {
            return "repeat(".concat(defaultColumns, ", 1fr)");
        }
        return {
            base: "repeat(".concat(responsiveColumns.sm || defaultColumns, ", 1fr)"),
            sm: "repeat(".concat(responsiveColumns.sm || defaultColumns, ", 1fr)"),
            md: "repeat(".concat(responsiveColumns.md || responsiveColumns.sm || defaultColumns, ", 1fr)"),
            lg: "repeat(".concat(responsiveColumns.lg || responsiveColumns.md || responsiveColumns.sm || defaultColumns, ", 1fr)"),
            xl: "repeat(".concat(responsiveColumns.xl || responsiveColumns.lg || responsiveColumns.md || responsiveColumns.sm || defaultColumns, ", 1fr)"),
        };
    };
    var getGridStyles = function () {
        var gap = getSpacingValue(final.gap, '2rem');
        var itemGap = getSpacingValue(final.itemGap, '1rem');
        var baseStyle = {
            display: 'grid',
            gap: gap,
            alignItems: final.align || 'stretch',
            justifyContent: final.justify || 'start',
        };
        var columns = getResponsiveGridColumns();
        if (typeof columns === 'string') {
            return __assign(__assign({}, baseStyle), { gridTemplateColumns: columns });
        }
        return baseStyle;
    };
    var getPatternStyle = function () {
        if (!final.pattern || final.pattern === 'none')
            return {};
        var opacity = final.patternOpacity || 0.05;
        var color = final.patternColor || 'borderRgb';
        var size = final.patternSize || '20px';
        var colorValue = (0, getCssVariable_1.getCssVariableValue)(color) || 'rgba(var(--borderRgb), 0.1)';
        var backgroundImage = '';
        var backgroundSize = size;
        switch (final.pattern) {
            case 'grid':
                backgroundImage = "linear-gradient(to right, ".concat(colorValue, " ").concat(opacity, " 1px, transparent 1px),\n                          linear-gradient(to bottom, ").concat(colorValue, " ").concat(opacity, " 1px, transparent 1px)");
                backgroundSize = "".concat(size, " ").concat(size);
                break;
            case 'dots':
                backgroundImage = "radial-gradient(".concat(colorValue, " ").concat(opacity, " 1px, transparent 1px)");
                backgroundSize = "".concat(size, " ").concat(size);
                break;
            case 'diagonal':
                backgroundImage = "repeating-linear-gradient(45deg, ".concat(colorValue, " ").concat(opacity, ", ").concat(colorValue, " ").concat(opacity, " 1px, transparent 1px, transparent 20px)");
                backgroundSize = "".concat(size, " ").concat(size);
                break;
        }
        return {
            backgroundImage: backgroundImage,
            backgroundSize: backgroundSize,
        };
    };
    var getFadeStyle = function () {
        if (!final.fade)
            return {};
        var color = final.fadeColor || 'page-bg';
        var fadeColor = (0, getCssVariable_1.getCssVariableValue)(color) || color;
        if (final.fadeRadial) {
            return {
                background: "radial-gradient(ellipse at center, transparent 30%, ".concat(fadeColor, " 70%)"),
            };
        }
        var direction = final.fadeDirection || 'bottom';
        var gradients = {
            top: 'to top',
            bottom: 'to bottom',
            left: 'to left',
            right: 'to right',
        };
        return {
            background: "linear-gradient(".concat(gradients[direction], ", transparent 0%, ").concat(fadeColor, " 90%)"),
        };
    };
    var getTextAlign = function (align) {
        return {
            textAlign: align || 'center',
        };
    };
    var renderFeaturesContent = function () {
        if (featuresArray.length === 0)
            return null;
        var gridStyles = getGridStyles();
        var isCentered = final.layout === 'centered';
        var maxWidth = final.maxWidth || (isCentered ? '48rem' : '100%');
        if (isCentered) {
            return (react_1.default.createElement("div", { className: "feature-section__centered-container", style: {
                    maxWidth: maxWidth,
                    margin: '0 auto',
                } }, featuresArray.map(function (item, index) { return renderFeatureItem(item, index); })));
        }
        return (react_1.default.createElement("div", { className: "feature-section__grid", style: __assign(__assign({}, gridStyles), { maxWidth: final.maxWidth || '100%', margin: '0 auto' }) }, featuresArray.map(function (item, index) { return (react_1.default.createElement("div", { key: index, className: "feature-section__grid-item" }, renderFeatureItem(item, index))); })));
    };
    var getLayoutClasses = function () {
        var classes = ['feature-section'];
        if (final.layout) {
            classes.push("feature-section--".concat(final.layout));
        }
        if (final.className) {
            classes.push(final.className);
        }
        if (final.sectionClass) {
            classes.push(final.sectionClass);
        }
        if (final.funcss) {
            classes.push(final.funcss);
        }
        return classes.filter(Boolean).join(' ');
    };
    var getContainerStyles = function () {
        var padding = getSpacingValue(final.padding, '3rem 0');
        return __assign(__assign({ position: 'relative', padding: padding, backgroundColor: final.bg ? (0, getCssVariable_1.getCssVariableValue)(final.bg) || final.bg : undefined, overflow: 'hidden' }, getPatternStyle()), final.style);
    };
    return (react_1.default.createElement("section", { id: final.id, className: getLayoutClasses(), style: getContainerStyles() },
        final.fade && (react_1.default.createElement("div", { className: "feature-section__fade-overlay", style: __assign(__assign({ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%' }, getFadeStyle()), { zIndex: 0, pointerEvents: 'none' }) })),
        react_1.default.createElement("div", { className: "feature-section__container ".concat(final.containerClassName || ''), style: __assign({ position: 'relative', zIndex: 1, maxWidth: final.maxWidth || '1280px', margin: '0 auto', padding: '0 1rem' }, final.containerStyle) },
            (final.title || final.subtitle || final.description) && (react_1.default.createElement("div", { className: "feature-section__header", style: __assign({ marginBottom: '3rem', maxWidth: final.layout === 'centered' ? '48rem' : '100%', marginLeft: 'auto', marginRight: 'auto' }, getTextAlign(final.titleAlign)) },
                final.subtitle && (react_1.default.createElement(Text_1.default, { variant: final.subtitleVariant, block: true, size: final.subtitleSize || 'sm', weight: final.subtitleWeight || 600, color: final.subtitleColor || 'var(--primary)', funcss: "feature-section__subtitle ".concat(final.subtitleClassName || ''), style: {
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        marginBottom: '0.5rem',
                    }, text: final.subtitle })),
                final.title && (react_1.default.createElement(Text_1.default, { variant: final.titleVariant, block: true, size: final.titleSize || 'xl', weight: final.titleWeight || 700, color: final.titleColor || 'var(--text-color)', funcss: "feature-section__main-title ".concat(final.titleClassName || ''), style: { marginBottom: '1rem' }, text: final.title })),
                final.description && (react_1.default.createElement(Text_1.default, { variant: final.descriptionVariant, block: true, size: final.descriptionSize || 'sm', weight: final.descriptionWeight || 400, color: final.descriptionColor || 'var(--text-muted)', funcss: "feature-section__section-description ".concat(final.descriptionClassName || ''), text: final.description })))),
            react_1.default.createElement("div", { className: "feature-section__content" },
                renderFeaturesContent(),
                final.children),
            final.ctaText && (react_1.default.createElement("div", { className: "feature-section__cta-container", style: __assign({ marginTop: '2.5rem' }, getTextAlign(final.ctaAlign)) },
                react_1.default.createElement(Button_1.default, { variant: final.ctaVariant, onClick: final.ctaOnClick || (function () { return final.ctaUrl && (window.location.href = final.ctaUrl); }), funcss: "feature-section__cta ".concat(final.ctaClassName || '', " ").concat(final.ctaCss || ''), stringPrefix: final.ctaStringPrefix, stringSuffix: final.ctaStringSuffix, startIcon: final.ctaStartIcon, endIcon: final.ctaEndIcon, iconSize: final.ctaIconSize, isLoading: final.ctaIsLoading, status: final.ctaStatus, url: final.ctaUrl }, final.ctaText))))));
};
exports.default = Feature;
