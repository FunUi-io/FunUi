'use client';
"use strict";
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
var Div_1 = __importDefault(require("../div/Div"));
var Text_1 = __importDefault(require("../text/Text"));
var Flex_1 = __importDefault(require("../flex/Flex"));
var ProductCard = function (_a) {
    var product = _a.product, _b = _a.currency, currency = _b === void 0 ? '$' : _b, onClick = _a.onClick, onAddToCart = _a.onAddToCart, _c = _a.className, className = _c === void 0 ? '' : _c, _d = _a.funcss, funcss = _d === void 0 ? '' : _d, _e = _a.showBadges, showBadges = _e === void 0 ? true : _e;
    var hasDiscount = product.comparePrice && product.comparePrice > product.price;
    var discountPercent = hasDiscount
        ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
        : 0;
    // Track which image is currently displayed
    var _f = (0, react_1.useState)(0), currentImageIndex = _f[0], setCurrentImageIndex = _f[1];
    var _g = (0, react_1.useState)([]), imagesLoaded = _g[0], setImagesLoaded = _g[1];
    // Check if product has multiple images
    var hasMultipleImages = product.images && product.images.length > 1;
    // Handle image preloading
    (0, react_1.useEffect)(function () {
        if (!product.images || product.images.length === 0)
            return;
        // Track loaded images
        var loadedStatus = new Array(product.images.length).fill(false);
        setImagesLoaded(loadedStatus);
        // Preload all images
        product.images.forEach(function (src, index) {
            var img = new Image();
            img.src = src;
            img.onload = function () {
                setImagesLoaded(function (prev) {
                    var updated = __spreadArray([], prev, true);
                    updated[index] = true;
                    return updated;
                });
            };
        });
    }, [product.images]);
    var handleClick = function () {
        onClick === null || onClick === void 0 ? void 0 : onClick(product);
    };
    var handleMouseEnter = function () {
        if (hasMultipleImages && product.images && product.images.length > 1) {
            // Switch to next image (or first if at the end)
            setCurrentImageIndex(function (prev) {
                return prev === product.images.length - 1 ? 0 : prev + 1;
            });
        }
    };
    var handleMouseLeave = function () {
        // Reset to first image when mouse leaves
        setCurrentImageIndex(0);
    };
    var getDisplayPrice = function () {
        var price = product.price || 0;
        var productCurrency = product.currency || currency;
        return "".concat(productCurrency).concat(price.toFixed(2));
    };
    return (react_1.default.createElement(Div_1.default, { funcss: "funui_store_product-card ".concat(className, " ").concat(funcss), onClick: handleClick, customStyle: { cursor: 'pointer' } },
        react_1.default.createElement(Div_1.default, { funcss: "funui_store_image-container round-edge", onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave, customStyle: { position: 'relative', overflow: 'hidden' } }, product.images && product.images.length > 0 ? (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("img", { src: product.images[0], alt: product.name, loading: "lazy", className: "funui_store_product-image", style: {
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    opacity: currentImageIndex === 0 ? 1 : 0,
                    transition: 'opacity 0.3s ease-in-out',
                    zIndex: 1
                } }),
            product.images.slice(1).map(function (imageSrc, index) { return (react_1.default.createElement("img", { key: "preload-".concat(index + 1), src: imageSrc, alt: "".concat(product.name, " - View ").concat(index + 2), loading: "lazy", style: {
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    opacity: currentImageIndex === index + 1 ? 1 : 0,
                    transition: 'opacity 0.3s ease-in-out',
                    zIndex: 2
                } })); }),
            (!product.images[0] || imagesLoaded[0] === false) && (react_1.default.createElement(Div_1.default, { funcss: "funui_store_no-image" },
                react_1.default.createElement(Text_1.default, { text: "No Image", color: "text-muted", size: "sm" }))))) : (react_1.default.createElement(Div_1.default, { funcss: "funui_store_no-image" },
            react_1.default.createElement(Text_1.default, { text: "No Image", color: "text-muted", size: "sm" })))),
        react_1.default.createElement(Div_1.default, { funcss: "funui_store_product-info " },
            product.category && (react_1.default.createElement(Text_1.default, { size: 'xs', opacity: 4, uppercase: true }, product.category)),
            react_1.default.createElement(Flex_1.default, { width: '100%', gap: 0.5, direction: 'column' },
                react_1.default.createElement(Text_1.default, { block: true, weight: 500, truncate: 2 }, product.name),
                react_1.default.createElement(Flex_1.default, { width: '100%', gap: 1, justify: 'space-between', alignItems: 'center' },
                    react_1.default.createElement(Flex_1.default, { gap: 0.5, alignItems: 'center' },
                        react_1.default.createElement("span", { className: "block" }, getDisplayPrice()),
                        hasDiscount && (react_1.default.createElement(Text_1.default, { size: 'xs', color: 'info', weight: 600 },
                            discountPercent,
                            "% Off"))),
                    hasDiscount && (react_1.default.createElement(Text_1.default, { size: "sm", opacity: 4, textDecoration: 'line-through' },
                        product.currency || currency,
                        product.comparePrice.toFixed(2))))))));
};
exports.default = ProductCard;
