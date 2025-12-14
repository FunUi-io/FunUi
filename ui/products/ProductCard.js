"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var Div_1 = __importDefault(require("../div/Div"));
var Text_1 = __importDefault(require("../text/Text"));
var Flex_1 = __importDefault(require("../flex/Flex"));
var ProductCard = function (_a) {
    var _b;
    var product = _a.product, _c = _a.currency, currency = _c === void 0 ? '$' : _c, onClick = _a.onClick, onAddToCart = _a.onAddToCart, _d = _a.className, className = _d === void 0 ? '' : _d, _e = _a.funcss, funcss = _e === void 0 ? '' : _e, _f = _a.showBadges, showBadges = _f === void 0 ? true : _f;
    var hasDiscount = product.comparePrice && product.comparePrice > product.price;
    var discountPercent = hasDiscount
        ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
        : 0;
    var stockAvailable = product.stock === undefined || product.stock > 0;
    var handleClick = function () {
        onClick === null || onClick === void 0 ? void 0 : onClick(product);
    };
    var handleAddToCart = function (e) {
        e.stopPropagation();
        onAddToCart === null || onAddToCart === void 0 ? void 0 : onAddToCart(product);
    };
    var getDisplayPrice = function () {
        var price = product.price || 0;
        var productCurrency = product.currency || currency;
        return "".concat(productCurrency).concat(price.toFixed(2));
    };
    return (react_1.default.createElement(Div_1.default, { funcss: "funui_store_product-card ".concat(className, " ").concat(funcss), onClick: handleClick, customStyle: { cursor: 'pointer' } },
        react_1.default.createElement(Div_1.default, { funcss: "funui_store_image-container" },
            ((_b = product.images) === null || _b === void 0 ? void 0 : _b[0]) ? (react_1.default.createElement("img", { src: product.images[0], alt: product.name, loading: "lazy", className: "funui_store_product-image" })) : (react_1.default.createElement(Div_1.default, { funcss: "funui_store_no-image" },
                react_1.default.createElement(Text_1.default, { text: "No Image", color: "text-muted", size: "sm" }))),
            showBadges && (react_1.default.createElement(Div_1.default, { funcss: "funui_store_product-badges" }, product.isSale && (react_1.default.createElement("span", { className: "funui_store_badge sale" }, "Sale"))))),
        react_1.default.createElement(Div_1.default, { funcss: "funui_store_product-info" },
            react_1.default.createElement(Flex_1.default, { fit: true, justify: 'space-between', alignItems: 'center', gap: 1 },
                product.category && (react_1.default.createElement("span", { className: "funui_store_product-category" }, product.category)),
                product.isNew && (react_1.default.createElement(Text_1.default, { size: 'xs', color: 'success', weight: 600 }, "New"))),
            react_1.default.createElement(Flex_1.default, { gap: 0.5, direction: 'column', width: '100%' },
                react_1.default.createElement(Text_1.default, { block: true, size: 'lg', truncate: 2 }, product.name),
                react_1.default.createElement(Flex_1.default, { width: '100%', gap: 1, justify: 'space-between' },
                    react_1.default.createElement(Flex_1.default, { gap: 0.5, alignItems: 'center' },
                        react_1.default.createElement("span", { className: "text-lg block" }, getDisplayPrice()),
                        hasDiscount && (react_1.default.createElement(Text_1.default, { size: 'xs', color: 'info', weight: 600 },
                            discountPercent,
                            "% Off"))),
                    hasDiscount && (react_1.default.createElement(Text_1.default, { size: "sm", opacity: 4, textDecoration: 'line-through' },
                        product.currency || currency,
                        product.comparePrice.toFixed(2)))),
                !stockAvailable ? (react_1.default.createElement("span", { className: "funui_store_stock-info out text-xs" }, "Out of Stock")) : product.stock !== undefined && product.stock > 0 && product.stock < 10 ? (react_1.default.createElement("span", { className: "funui_store_stock-info low text-xs" },
                    "Only ",
                    product.stock,
                    " left")) : stockAvailable && (react_1.default.createElement("span", { className: "funui_store_stock-info in text-xs" }, "In Stock"))))));
};
exports.default = ProductCard;
