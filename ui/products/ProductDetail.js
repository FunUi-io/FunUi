"use strict";
// components/products/ProductDetail.tsx
'use client';
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var pi_1 = require("react-icons/pi");
var tfi_1 = require("react-icons/tfi");
var si_1 = require("react-icons/si");
var Modal_1 = __importDefault(require("../modal/Modal"));
var Div_1 = __importDefault(require("../div/Div"));
var Text_1 = __importDefault(require("../text/Text"));
var Flex_1 = __importDefault(require("../flex/Flex"));
var Button_1 = __importDefault(require("../button/Button"));
var RowFlex_1 = __importDefault(require("../specials/RowFlex"));
var Input_1 = __importDefault(require("../input/Input"));
var Circle_1 = __importDefault(require("../specials/Circle"));
var Carousel_1 = __importDefault(require("../carousel/Carousel"));
var Select_1 = __importDefault(require("../select/Select"));
var io5_1 = require("react-icons/io5");
var ImageScaler_1 = __importDefault(require("../components/ImageScaler"));
var ProductDetail = function (_a) {
    var product = _a.product, open = _a.open, setOpen = _a.setOpen, _b = _a.currency, currency = _b === void 0 ? '$' : _b, onAddToCart = _a.onAddToCart;
    var _c = (0, react_1.useState)(0), selectedImageIndex = _c[0], setSelectedImageIndex = _c[1];
    var _d = (0, react_1.useState)(''), selectedColor = _d[0], setSelectedColor = _d[1];
    var _e = (0, react_1.useState)(''), selectedSize = _e[0], setSelectedSize = _e[1];
    var _f = (0, react_1.useState)(1), quantity = _f[0], setQuantity = _f[1];
    var _g = (0, react_1.useState)(false), showFullDescription = _g[0], setShowFullDescription = _g[1];
    var hasDiscount = product.comparePrice && product.comparePrice > product.price;
    var discountPercent = hasDiscount
        ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
        : 0;
    var getDisplayPrice = function () {
        var price = product.price || 0;
        var productCurrency = product.currency || currency;
        return "".concat(productCurrency).concat(price.toFixed(2));
    };
    var handleAddToCart = function () {
        onAddToCart === null || onAddToCart === void 0 ? void 0 : onAddToCart(product, quantity, {
            color: selectedColor,
            size: selectedSize,
        });
        setOpen(false);
    };
    var totalPrice = ((product.price || 0) * quantity).toFixed(2);
    // Function to safely process description
    var processDescription = function (description) {
        if (!description)
            return '';
        // Remove h1, h2, h3 tags but keep their content
        var processed = description
            .replace(/<h[1-3][^>]*>/gi, '<p>')
            .replace(/<\/h[1-3]>/gi, '</p>');
        return processed;
    };
    // Function to truncate HTML while preserving tags
    var truncateHTML = function (html, maxLength) {
        if (html.length <= maxLength)
            return html;
        var truncated = '';
        var length = 0;
        var inTag = false;
        var tagBuffer = '';
        for (var i = 0; i < html.length && length < maxLength; i++) {
            var char = html[i];
            if (char === '<') {
                inTag = true;
                tagBuffer = char;
            }
            else if (char === '>') {
                inTag = false;
                tagBuffer += char;
                truncated += tagBuffer;
                tagBuffer = '';
            }
            else if (inTag) {
                tagBuffer += char;
            }
            else {
                truncated += char;
                length++;
            }
        }
        // Close any open tags
        var tempDiv = document.createElement('div');
        tempDiv.innerHTML = truncated + '...';
        // Get the innerHTML to ensure tags are properly closed
        return tempDiv.innerHTML;
    };
    // Process the description
    var processedDescription = processDescription(product.description || '');
    var maxDescriptionLength = 200;
    var shouldTruncate = processedDescription.length > maxDescriptionLength;
    var displayDescription = showFullDescription
        ? processedDescription
        : (shouldTruncate ? truncateHTML(processedDescription, maxDescriptionLength) : processedDescription);
    // Check if description has HTML tags
    var hasHTML = /<[a-z][\s\S]*>/i.test(processedDescription);
    return (react_1.default.createElement(Modal_1.default, { animation: "SlideDown", open: open, setOpen: setOpen, maxWidth: '1000px', title: react_1.default.createElement(react_1.default.Fragment, null), body: react_1.default.createElement(Flex_1.default, { width: '100%', gap: 2 },
            react_1.default.createElement("div", { className: "w-400" }, product.images && product.images.length > 0 && (react_1.default.createElement(Div_1.default, { funcss: "margin-bottom-20" },
                react_1.default.createElement(Div_1.default, { funcss: "funui_products_main_image_container mb-3" },
                    react_1.default.createElement(ImageScaler_1.default, { src: product.images[selectedImageIndex], size: "100%" })),
                product.images.length > 1 && (react_1.default.createElement(Carousel_1.default, { gap: 1 }, product.images.map(function (image, index) { return (react_1.default.createElement(Div_1.default, { key: index, funcss: "funui_products_thumbnail rounde-edge ".concat(selectedImageIndex === index ? 'funui_products_thumbnail-active' : ''), onClick: function () { return setSelectedImageIndex(index); } },
                    react_1.default.createElement(ImageScaler_1.default, { src: image, size: "100px" }))); })))))),
            react_1.default.createElement("div", { className: "col" },
                react_1.default.createElement(Flex_1.default, { direction: 'column', gap: 2, alignItems: 'flex-start', justify: 'flex-start' },
                    react_1.default.createElement("div", null,
                        react_1.default.createElement(Text_1.default, { text: product.name, size: "2xl", block: true }),
                        react_1.default.createElement(Flex_1.default, { justify: "space-between", alignItems: "center", width: '100%' },
                            react_1.default.createElement(Text_1.default, { text: getDisplayPrice(), size: "xl" }),
                            (hasDiscount || product.comparePrice) && (react_1.default.createElement(Text_1.default, { text: "".concat(product.currency || currency).concat(product.comparePrice.toFixed(2)), textDecoration: 'line-through' })))),
                    ((product.colors && product.colors.length > 0) || (product.sizes && product.sizes.length > 0)) &&
                        react_1.default.createElement(Flex_1.default, { width: '100%', gap: 1 },
                            product.colors && product.colors.length > 0 && (react_1.default.createElement("div", { className: "col" },
                                react_1.default.createElement(Select_1.default, { fullWidth: true, options: __spreadArray([
                                        { text: 'Select Color', value: '' }
                                    ], product.colors.map(function (color) { return ({
                                        text: color.name,
                                        value: color.name,
                                        prefix: react_1.default.createElement("div", { className: 'circle', style: { width: "20px", height: '20px', backgroundColor: color.code } })
                                    }); }), true), value: selectedColor, onChange: function (e) { return setSelectedColor(e); }, bordered: true }))),
                            product.sizes && product.sizes.length > 0 && (react_1.default.createElement("div", { className: "col" },
                                react_1.default.createElement(Select_1.default, { fullWidth: true, options: __spreadArray([
                                        { text: 'Select Size', value: '' }
                                    ], product.sizes.map(function (size) { return ({ text: size, value: size }); }), true), value: selectedSize, onChange: function (e) { return setSelectedSize(e); }, bordered: true })))),
                    processedDescription && (react_1.default.createElement("div", null,
                        react_1.default.createElement(Text_1.default, { text: "Description", size: "lg", funcss: "margin-bottom-1" }),
                        react_1.default.createElement("div", { className: "article text-sm ".concat(hasHTML ? '' : 'whitespace-pre-wrap'), dangerouslySetInnerHTML: { __html: displayDescription } }),
                        shouldTruncate && (react_1.default.createElement(Button_1.default, { text: showFullDescription ? 'Show Less' : 'Read More', onClick: function () { return setShowFullDescription(!showFullDescription); }, small: true, bg: 'lighter', startIcon: showFullDescription ? react_1.default.createElement(pi_1.PiCaretUp, null) : react_1.default.createElement(pi_1.PiCaretDown, null) })))),
                    react_1.default.createElement("div", null,
                        react_1.default.createElement(Flex_1.default, { gap: 3, width: '100%' },
                            product.warranty && (react_1.default.createElement(Flex_1.default, { gap: 0.3 },
                                react_1.default.createElement("div", null,
                                    react_1.default.createElement(pi_1.PiShieldCheck, { className: 'text-primary' })),
                                react_1.default.createElement("div", null,
                                    react_1.default.createElement(Text_1.default, { text: "Warranty", size: "xs", opacity: 4, block: true }),
                                    react_1.default.createElement(Text_1.default, { text: product.warranty, size: "sm", block: true, lineHeight: '1' })))),
                            product.manufacturer && (react_1.default.createElement(Flex_1.default, { gap: 0.3 },
                                react_1.default.createElement("div", null,
                                    react_1.default.createElement(pi_1.PiUser, { className: 'text-primary' })),
                                react_1.default.createElement("div", null,
                                    react_1.default.createElement(Text_1.default, { text: "Manufacturer", size: "xs", opacity: 4, block: true }),
                                    react_1.default.createElement(Text_1.default, { text: product.manufacturer, size: "sm", block: true, lineHeight: '1' })))),
                            product.countryOfOrigin && (react_1.default.createElement(Flex_1.default, { gap: 0.3 },
                                react_1.default.createElement("div", null,
                                    react_1.default.createElement(pi_1.PiGlobe, { className: 'text-primary' })),
                                react_1.default.createElement("div", null,
                                    react_1.default.createElement(Text_1.default, { text: "Country of Origin", size: "xs", opacity: 4, block: true }),
                                    react_1.default.createElement(Text_1.default, { text: product.countryOfOrigin, size: "sm", block: true, lineHeight: '1' })))),
                            product.isFeatured && (react_1.default.createElement(Flex_1.default, { gap: 0.3 },
                                react_1.default.createElement("div", null,
                                    react_1.default.createElement(pi_1.PiUsers, { className: 'text-primary' })),
                                react_1.default.createElement("div", null,
                                    react_1.default.createElement(Text_1.default, { text: "Featured", size: "xs", opacity: 4, block: true }),
                                    react_1.default.createElement(Text_1.default, { text: "Yes", size: "sm", block: true, lineHeight: '1' })))),
                            product.rating && (react_1.default.createElement(Flex_1.default, { gap: 0.3 },
                                react_1.default.createElement("div", null,
                                    react_1.default.createElement(tfi_1.TfiComments, { className: 'text-primary' })),
                                react_1.default.createElement("div", null,
                                    react_1.default.createElement(Text_1.default, { text: "Rating", size: "xs", opacity: 4, block: true }),
                                    react_1.default.createElement(Text_1.default, { text: product.rating, size: "sm", block: true, lineHeight: '1' })))),
                            product.brand && (react_1.default.createElement(Flex_1.default, { gap: 0.3 },
                                react_1.default.createElement("div", null,
                                    react_1.default.createElement(si_1.SiBlackmagicdesign, { className: 'text-primary' })),
                                react_1.default.createElement("div", null,
                                    react_1.default.createElement(Text_1.default, { text: "Brand", size: "xs", opacity: 4, block: true }),
                                    react_1.default.createElement(Text_1.default, { text: product.brand, size: "sm", block: true, lineHeight: '1' })))),
                            product.category && (react_1.default.createElement(Flex_1.default, { gap: 0.3 },
                                react_1.default.createElement("div", null,
                                    react_1.default.createElement(io5_1.IoLayersOutline, { className: 'text-primary' })),
                                react_1.default.createElement("div", null,
                                    react_1.default.createElement(Text_1.default, { text: "Category", size: "xs", opacity: 4, block: true }),
                                    react_1.default.createElement(Text_1.default, { text: product.category, size: "sm", block: true, lineHeight: '1' })))),
                            product.isNew && (react_1.default.createElement(Flex_1.default, { gap: 0.3 },
                                react_1.default.createElement("div", null,
                                    react_1.default.createElement(pi_1.PiChecks, { className: 'text-primary' })),
                                react_1.default.createElement("div", null,
                                    react_1.default.createElement(Text_1.default, { text: "New", size: "xs", opacity: 4, block: true }),
                                    react_1.default.createElement(Text_1.default, { text: "Yes", size: "sm", block: true, lineHeight: '1' })))),
                            product.isSale && (react_1.default.createElement(Flex_1.default, { gap: 0.3 },
                                react_1.default.createElement("div", null,
                                    react_1.default.createElement(pi_1.PiChecks, { className: 'text-primary' })),
                                react_1.default.createElement("div", null,
                                    react_1.default.createElement(Text_1.default, { text: "On Sale", size: "xs", opacity: 4, block: true }),
                                    react_1.default.createElement(Text_1.default, { text: "Yes", size: "sm", block: true, lineHeight: '1' })))),
                            product.weight && (react_1.default.createElement(Flex_1.default, { gap: 0.3 },
                                react_1.default.createElement("div", null,
                                    react_1.default.createElement(pi_1.PiScales, { className: 'text-primary' })),
                                react_1.default.createElement("div", null,
                                    react_1.default.createElement(Text_1.default, { text: "Weight", size: "xs", opacity: 4, block: true }),
                                    react_1.default.createElement(Text_1.default, { text: product.weight + " " + product.weightUnit, size: "sm", block: true, lineHeight: '1' }))))))))), footer: react_1.default.createElement(RowFlex_1.default, { gap: 1, justify: 'flex-end', funcss: 'pt' },
            react_1.default.createElement(RowFlex_1.default, { gap: 0.5, alignItems: "center" },
                react_1.default.createElement(Circle_1.default, { body: react_1.default.createElement(pi_1.PiMinus, null), onClick: function () { return setQuantity(Math.max(1, quantity - 1)); }, funcss: quantity <= 1 ? "disabled" : "" }),
                react_1.default.createElement("div", { className: "w-90" },
                    react_1.default.createElement(Input_1.default, { type: "number", value: quantity, onChange: function (e) {
                            var value = parseInt(e.target.value);
                            if (!isNaN(value)) {
                                setQuantity(Math.max(1, value));
                            }
                        }, funcss: "text-center", bordered: true })),
                react_1.default.createElement(Circle_1.default, { onClick: function () { return setQuantity(quantity + 1); }, bg: 'lighter' },
                    react_1.default.createElement(pi_1.PiPlus, null))),
            react_1.default.createElement(Button_1.default, { text: "Add to Cart - ".concat(currency).concat(totalPrice), bg: "primary", raised: true, onClick: handleAddToCart })) }));
};
exports.default = ProductDetail;
