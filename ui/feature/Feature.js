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
var getDynamicIcon_1 = require("../../utils/getDynamicIcon");
var Carousel_1 = __importDefault(require("../carousel/Carousel"));
var theme_1 = require("../theme/theme");
var pi_1 = require("react-icons/pi");
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
// Dynamic Icon Component with proper typing
var DynamicIcon = function (_a) {
    var icon = _a.icon, color = _a.color, _b = _a.size, size = _b === void 0 ? 24 : _b;
    var isStringIcon = icon && typeof icon === 'string';
    var _c = useDynamicIcon(isStringIcon ? icon : undefined), iconNode = _c.iconNode, hasValidIcon = _c.hasValidIcon;
    var getIconColorStyle = function () {
        if (!color)
            return {};
        var cssValue = (0, getCssVariable_1.getCssVariableValue)(color);
        if (cssValue && cssValue !== color) {
            return { color: cssValue };
        }
        return { color: color };
    };
    if (icon && typeof icon !== 'string' && react_1.default.isValidElement(icon)) {
        // Handle React element icons
        var iconElement = icon;
        return react_1.default.cloneElement(iconElement, {
            size: size,
            style: __assign(__assign({}, getIconColorStyle()), iconElement.props.style),
        });
    }
    if (isStringIcon && hasValidIcon && iconNode && react_1.default.isValidElement(iconNode)) {
        // Handle dynamically loaded icons
        var dynamicIconElement = iconNode;
        var newProps = {
            size: size,
            style: getIconColorStyle(),
        };
        // Preserve existing props
        if (dynamicIconElement.props.className) {
            newProps.className = dynamicIconElement.props.className;
        }
        return react_1.default.cloneElement(dynamicIconElement, newProps);
    }
    return null;
};
// Star Rating Component with dynamic icon
var StarRating = function (_a) {
    var rating = _a.rating, _b = _a.icon, icon = _b === void 0 ? 'PiStar' : _b, _c = _a.color, color = _c === void 0 ? 'warning' : _c, _d = _a.size, size = _d === void 0 ? 16 : _d;
    var _e = (0, react_1.useState)(null), ratingIconNode = _e[0], setRatingIconNode = _e[1];
    var iconNode = useDynamicIcon(icon).iconNode;
    (0, react_1.useEffect)(function () {
        if (iconNode) {
            setRatingIconNode(iconNode);
        }
    }, [iconNode]);
    var renderIcon = function (type, index) {
        var colorValue = (0, getCssVariable_1.getCssVariableValue)(color) || color;
        var emptyColor = 'var(--muted)';
        // If we have a dynamic icon and it's not empty
        if (ratingIconNode && react_1.default.isValidElement(ratingIconNode) && type !== 'empty') {
            var iconElement = ratingIconNode;
            // Create a new props object
            var newProps = {
                key: index,
                style: __assign({ color: colorValue }, iconElement.props.style)
            };
            // Add size prop if it exists
            if (size !== undefined) {
                newProps.size = size;
            }
            return react_1.default.cloneElement(iconElement, newProps);
        }
        // For empty stars or fallback, use PiStar icons
        if (type === 'full') {
            return react_1.default.createElement(pi_1.PiStarFill, { key: index, size: size, style: { color: colorValue } });
        }
        else if (type === 'half') {
            return react_1.default.createElement(pi_1.PiStarHalf, { key: index, size: size, style: { color: colorValue } });
        }
        else {
            return react_1.default.createElement(pi_1.PiStar, { key: index, size: size, style: { color: emptyColor } });
        }
    };
    var stars = [];
    var fullStars = Math.floor(rating);
    var hasHalfStar = rating % 1 >= 0.5;
    for (var i = 1; i <= 5; i++) {
        if (i <= fullStars) {
            stars.push(renderIcon('full', i));
        }
        else if (hasHalfStar && i === fullStars + 1) {
            stars.push(renderIcon('half', i));
        }
        else {
            stars.push(renderIcon('empty', i));
        }
    }
    return (react_1.default.createElement("div", { className: "star-rating", style: { display: 'flex', gap: '2px', alignItems: 'center' } }, stars));
};
// Helper function to convert shorthand flex values
var convertFlexValue = function (value) {
    if (!value)
        return undefined;
    var flexMap = {
        'start': 'flex-start',
        'end': 'flex-end',
        'center': 'center',
        'between': 'space-between',
        'around': 'space-around',
    };
    return flexMap[value] || value;
};
// Format date
var formatDate = function (dateString) {
    if (!dateString)
        return '';
    try {
        var date = new Date(dateString);
        if (isNaN(date.getTime()))
            return '';
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    }
    catch (_a) {
        return dateString;
    }
};
// Truncate HTML content safely
var truncateHtml = function (html, maxLength) {
    if (!html)
        return { truncated: '', isTruncated: false };
    // Strip HTML tags for length calculation
    var text = html.replace(/<[^>]*>/g, '');
    if (text.length <= maxLength) {
        return { truncated: html, isTruncated: false };
    }
    // Truncate text
    var truncatedText = text.substring(0, maxLength) + '...';
    return { truncated: truncatedText, isTruncated: true };
};
var Feature = function (localProps) {
    var mergeWithLocal = (0, componentUtils_1.useComponentConfiguration)('Feature', localProps.variant).mergeWithLocal;
    var mergedProps = mergeWithLocal(localProps).props;
    var final = mergedProps;
    var _a = (0, react_1.useState)([]), itemsArray = _a[0], setItemsArray = _a[1];
    var _b = (0, react_1.useState)(new Set()), expandedItems = _b[0], setExpandedItems = _b[1];
    // Use bucket data if bucket is provided
    var _c = (0, theme_1.usePaginatedRecords)(final.bucket || '', final.bucketPage || 1, final.bucketSize || 50), bucketRecords = _c.records, bucketLoading = _c.loading;
    // Parse items from props or bucket
    (0, react_1.useEffect)(function () {
        var parseItems = function () {
            if (final.bucket && bucketRecords) {
                // Map bucket records to content format
                var mappedItems = bucketRecords.map(function (record) {
                    var _a, _b;
                    var values = record.values || record;
                    if (final.isTestimonial) {
                        return {
                            customerName: values.customerName || values.name || values.customer,
                            company: values.company || values.organization,
                            avatar: ((_a = values === null || values === void 0 ? void 0 : values.avatar) === null || _a === void 0 ? void 0 : _a.url) || values.imageUrl || values.photo,
                            content: values.content || values.testimonial || values.description,
                            rating: values.rating || values.stars || 5,
                            role: values.role || values.position,
                            project: values.project || values.service,
                            date: values.date || values.createdAt,
                            featured: values.featured || values.highlighted || false,
                            title: values.customerName || values.name,
                            description: values.content || values.testimonial,
                            imageUrl: values.avatar || values.imageUrl,
                            icon: final.quoteIcon || 'PiQuotes',
                            iconColor: final.quoteColor || 'primary'
                        };
                    }
                    else {
                        return __assign({ title: values.title || values.name, description: values.description || values.content, icon: values.icon, iconColor: values.iconColor, imageUrl: values.imageUrl || ((_b = values.avatar) === null || _b === void 0 ? void 0 : _b.url) }, values);
                    }
                });
                setItemsArray(mappedItems);
            }
            else if (typeof final.items === 'string') {
                try {
                    var parsed = JSON.parse(final.items);
                    setItemsArray(Array.isArray(parsed) ? parsed : [parsed]);
                }
                catch (error) {
                    console.error('Error parsing items JSON:', error);
                    setItemsArray([]);
                }
            }
            else if (Array.isArray(final.items)) {
                setItemsArray(final.items);
            }
            else {
                setItemsArray([]);
            }
        };
        parseItems();
    }, [final.items, final.isTestimonial, final.bucket, bucketRecords, final.quoteIcon, final.quoteColor]);
    // Toggle expanded state for an item
    var toggleExpand = function (index) {
        setExpandedItems(function (prev) {
            var newSet = new Set(prev);
            if (newSet.has(index)) {
                newSet.delete(index);
            }
            else {
                newSet.add(index);
            }
            return newSet;
        });
    };
    var renderItem = function (item, index) {
        var isExpanded = expandedItems.has(index);
        var contentLimit = final.contentLimit || 150;
        // Get content to display
        var displayContent = item.description || item.content || '';
        var isTruncated = false;
        if (typeof displayContent === 'string' && displayContent.length > contentLimit && !isExpanded) {
            var _a = truncateHtml(displayContent, contentLimit), truncated = _a.truncated, truncatedFlag = _a.isTruncated;
            displayContent = truncated;
            isTruncated = truncatedFlag;
        }
        // Item content
        var itemContent = (react_1.default.createElement(react_1.default.Fragment, null,
            final.isTestimonial && final.showQuote && (react_1.default.createElement("div", { className: "feature__quote-icon", style: { marginBottom: '1rem' } }, react_1.default.isValidElement(final.quoteIcon) ? final.quoteIcon : (react_1.default.createElement(DynamicIcon, { icon: final.quoteIcon || 'PiQuotes', color: final.quoteColor, size: final.iconSize })))),
            (item.icon || item.imageUrl) && !final.isTestimonial && (react_1.default.createElement("div", { className: "feature__icon-container", style: { marginBottom: '1rem' } }, item.imageUrl ? (react_1.default.createElement("img", { src: item.imageUrl, alt: item.imageAlt || '', className: "feature__image", style: {
                    width: "".concat(final.iconSize || 24, "px"),
                    height: "".concat(final.iconSize || 24, "px"),
                    objectFit: 'cover',
                    borderRadius: '50%',
                } })) : (react_1.default.createElement(DynamicIcon, { icon: item.icon, color: item.iconColor || final.iconColor, size: final.iconSize })))),
            item.title && (react_1.default.createElement(Text_1.default, { block: true, size: final.itemTitleSize || 'lg', weight: 600, color: "default", style: { marginBottom: '0.75rem' } }, item.title)),
            (item.description || item.content) && (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(Text_1.default, { block: true, size: final.itemDescriptionSize || 'base', weight: 400, color: "muted", dangerouslySetInnerHTML: true, text: displayContent }),
                isTruncated && final.showExpand && (react_1.default.createElement("button", { onClick: function () { return toggleExpand(index); }, className: "feature__expand-btn", style: {
                        background: 'none',
                        border: 'none',
                        color: 'var(--primary)',
                        cursor: 'pointer',
                        fontSize: '0.875rem',
                        marginTop: '0.5rem',
                        padding: 0,
                        textDecoration: 'underline'
                    } }, isExpanded ? (final.collapseText || 'Show less') : (final.expandText || 'Read more'))))),
            final.isTestimonial && (react_1.default.createElement("div", { className: "feature__testimonial-info", style: { marginTop: '1rem' } },
                final.showStars && item.rating && (react_1.default.createElement("div", { style: { marginBottom: '0.5rem' } },
                    react_1.default.createElement(StarRating, { rating: item.rating, icon: final.ratingIcon, color: final.starColor, size: 16 }))),
                react_1.default.createElement("div", { style: { display: 'flex', alignItems: 'center', gap: '0.75rem' } },
                    item.avatar && (react_1.default.createElement("img", { src: item.avatar, alt: item.customerName || 'Customer', style: {
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            objectFit: 'cover'
                        } })),
                    react_1.default.createElement("div", null,
                        item.customerName && (react_1.default.createElement(Text_1.default, { block: true, size: "sm", weight: 600, style: { marginBottom: '0.25rem' } }, item.customerName)),
                        react_1.default.createElement("div", { style: { fontSize: '0.75rem', color: 'var(--text-muted)' } },
                            item.role && final.showRole && react_1.default.createElement("span", null, item.role),
                            item.company && final.showCompany && (react_1.default.createElement("span", null,
                                item.role ? ' at ' : '',
                                item.company)),
                            item.date && final.showDate && react_1.default.createElement("span", null,
                                " \u2022 ",
                                formatDate(item.date))))))),
            !final.isTestimonial && final.showCTA && final.ctaText && (react_1.default.createElement("div", { style: { marginTop: '1rem' } },
                react_1.default.createElement(Button_1.default, { url: final.ctaUrl, color: "primary", text: final.ctaText, funcss: 'p-0' })))));
        // Apply card styling if enabled
        if (final.card) {
            var shadowValue = final.cardShadow !== 'none' ?
                (0, getCssVariable_1.getCssVariableValue)("shadow-".concat(final.cardShadow)) || undefined :
                undefined;
            return (react_1.default.createElement("div", { key: index, className: "feature__card ".concat(final.cardClassName || ''), style: __assign({ padding: final.cardPadding || '1.5rem', borderRadius: final.cardRounded || '0.5rem', boxShadow: shadowValue, border: '1px solid var(--borderRgb)', height: '100%', maxWidth: final.itemMaxWidth || '100%' }, item.style) }, itemContent));
        }
        // Regular item without card
        return (react_1.default.createElement("div", { key: index, className: "feature__item", style: __assign({ maxWidth: final.itemMaxWidth || '100%' }, item.style) }, itemContent));
    };
    var renderFlexItems = function () {
        if (itemsArray.length === 0)
            return null;
        var gapValue = final.gap !== undefined ? "".concat(final.gap * 0.25, "rem") : '2rem';
        if (final.layout === 'centered') {
            var maxWidth = final.maxWidth || '48rem';
            return (react_1.default.createElement("div", { className: "feature__centered-container", style: {
                    maxWidth: maxWidth,
                    margin: '0 auto',
                } }, itemsArray.map(function (item, index) { return renderItem(item, index); })));
        }
        // Use Flex layout
        return (react_1.default.createElement("div", { className: "feature__flex-container", style: {
                display: 'flex',
                flexWrap: final.wrap !== false ? 'wrap' : 'nowrap',
                gap: gapValue,
                alignItems: convertFlexValue(final.align) || 'stretch',
                justifyContent: convertFlexValue(final.justify) || 'flex-start',
                maxWidth: final.maxWidth || '100%',
                margin: '0 auto',
            } }, itemsArray.map(function (item, index) { return (react_1.default.createElement("div", { key: index, className: "feature__flex-item", style: { flex: '1 1 300px' } }, renderItem(item, index))); })));
    };
    var renderCarouselItems = function () {
        if (itemsArray.length === 0)
            return null;
        // Prepare carousel items
        var carouselItems = itemsArray.map(function (item, index) { return renderItem(item, index); });
        return (react_1.default.createElement("div", { className: "feature__carousel-container" },
            react_1.default.createElement(Carousel_1.default, { scrollNumber: final.scrollNumber || 320, gap: final.gap || 1, funcss: final.carouselFuncss, showDashes: final.showDashes !== false }, carouselItems)));
    };
    var renderContent = function () {
        if (itemsArray.length === 0)
            return null;
        // Use carousel if isCarousel is true
        if (final.isCarousel) {
            return renderCarouselItems();
        }
        // Otherwise use flex layout
        return renderFlexItems();
    };
    return (react_1.default.createElement("section", { id: final.id, className: "feature-section ".concat(final.className || '', " ").concat(final.funcss || ''), style: {
            padding: final.padding || '3rem 0',
        } },
        react_1.default.createElement("div", { className: "feature__container ".concat(final.containerClassName || ''), style: {
                maxWidth: final.maxWidth || '1280px',
                margin: '0 auto',
                padding: '0 1rem',
            } },
            (final.title || final.subtitle || final.description) && (react_1.default.createElement("div", { className: "feature__header", style: {
                    marginBottom: '3rem',
                    maxWidth: final.layout === 'centered' ? '48rem' : '100%',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    textAlign: final.titleAlign || 'center',
                } },
                final.subtitle && (react_1.default.createElement(Text_1.default, { block: true, size: final.subtitleSize || 'sm', weight: 600, color: final.subtitleColor || 'primary', style: {
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        marginBottom: '0.5rem',
                    } }, final.subtitle)),
                final.title && (react_1.default.createElement(Text_1.default, { block: true, size: final.titleSize || 'xl', weight: 700, color: final.titleColor || 'default', style: { marginBottom: '1rem' } }, final.title)),
                final.description && (react_1.default.createElement(Text_1.default, { block: true, size: final.descriptionSize || 'base', weight: 400, color: final.descriptionColor || 'muted' }, final.description)))),
            react_1.default.createElement("div", { className: "feature__content" },
                renderContent(),
                final.children),
            final.ctaText && (react_1.default.createElement("div", { className: "feature__cta-container", style: {
                    marginTop: '2.5rem',
                    textAlign: final.ctaAlign || 'center',
                } },
                react_1.default.createElement(Button_1.default, { url: final.ctaUrl, bg: final.ctaBg || 'primary', text: final.ctaText }))))));
};
exports.default = Feature;
