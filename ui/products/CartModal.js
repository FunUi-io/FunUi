'use client';
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var pi_1 = require("react-icons/pi");
var Modal_1 = __importDefault(require("../modal/Modal"));
var RowFlex_1 = __importDefault(require("../specials/RowFlex"));
var Text_1 = __importDefault(require("../text/Text"));
var Input_1 = __importDefault(require("../input/Input"));
var Div_1 = __importDefault(require("../div/Div"));
var Button_1 = __importDefault(require("../button/Button"));
var Circle_1 = __importDefault(require("../specials/Circle"));
var Flex_1 = __importDefault(require("../flex/Flex"));
var ImageScaler_1 = __importDefault(require("../components/ImageScaler"));
var tb_1 = require("react-icons/tb");
var Empty_1 = __importDefault(require("../empty/Empty"));
var generateCartItemId = function (item) {
    var _a;
    var parts = [
        item.product.id,
        ((_a = item.variant) === null || _a === void 0 ? void 0 : _a.id) || '',
        item.selectedColor || '',
        item.selectedSize || ''
    ].filter(Boolean);
    return parts.join('_');
};
var CartModal = function (_a) {
    var cart = _a.cart, isOpen = _a.isOpen, setIsOpen = _a.setIsOpen, _b = _a.currency, currency = _b === void 0 ? '$' : _b, updateQuantity = _a.updateQuantity, removeFromCart = _a.removeFromCart, clearCart = _a.clearCart, handleCheckout = _a.handleCheckout, _c = _a.cartBadgeColor, cartBadgeColor = _c === void 0 ? 'error' : _c, _d = _a.checkoutText, checkoutText = _d === void 0 ? 'Checkout' : _d, checkoutIcon = _a.checkoutIcon, _e = _a.persistCart, persistCart = _e === void 0 ? true : _e;
    var totalItems = cart.reduce(function (sum, item) { return sum + item.quantity; }, 0);
    var subtotal = cart.reduce(function (sum, item) {
        var _a;
        var price = ((_a = item.variant) === null || _a === void 0 ? void 0 : _a.price) || item.product.price;
        return sum + (price * item.quantity);
    }, 0);
    // Calculate total savings from discounts
    var totalSavings = cart.reduce(function (sum, item) {
        var _a;
        var originalPrice = item.originalPrice || item.product.comparePrice || item.product.price;
        var currentPrice = ((_a = item.variant) === null || _a === void 0 ? void 0 : _a.price) || item.product.price;
        var savings = originalPrice !== currentPrice ? (originalPrice - currentPrice) * item.quantity : 0;
        return sum + savings;
    }, 0);
    var handleRemoveItem = function (item) {
        var cartItemId = generateCartItemId(item);
        removeFromCart(cartItemId);
    };
    var handleUpdateQuantity = function (item, newQuantity) {
        var cartItemId = generateCartItemId(item);
        updateQuantity(cartItemId, newQuantity);
    };
    return (react_1.default.createElement(Modal_1.default, { animation: "SlideDown", duration: 0.3, open: isOpen, setOpen: setIsOpen, maxWidth: '600px', title: react_1.default.createElement(Text_1.default, { text: "Your Cart", size: "h3" }), body: react_1.default.createElement(Div_1.default, { funcss: "pt pb" }, cart.length === 0 ? (react_1.default.createElement(Div_1.default, null,
            react_1.default.createElement(Empty_1.default, { title: "Your cart is empty", showCta: true, description: "Add items to your cart to checkout", ctaText: "Continue Shopping", ctaOnClick: function () { return setIsOpen(false); }, ctaIcon: react_1.default.createElement(pi_1.PiBag, null) }))) : (react_1.default.createElement(react_1.default.Fragment, null,
            cart.map(function (item, index) {
                var _a, _b, _c;
                var cartItemId = generateCartItemId(item);
                var currentPrice = ((_a = item.variant) === null || _a === void 0 ? void 0 : _a.price) || item.product.price;
                var originalPrice = item.originalPrice || item.product.comparePrice || currentPrice;
                var hasDiscount = originalPrice > currentPrice;
                var isFirst = index === 0;
                var isLast = index === cart.length - 1;
                return (react_1.default.createElement(Flex_1.default, { key: "".concat(cartItemId, "-").concat(index), funcss: "bt pt pb  ".concat(isLast ? "bb" : ""), alignItems: "center", justify: 'space-between', gap: 1, width: '100%' },
                    react_1.default.createElement(Div_1.default, { funcss: " width-80 height-80" }, ((_b = item.product.images) === null || _b === void 0 ? void 0 : _b[0]) ? (react_1.default.createElement(ImageScaler_1.default, { src: item.product.images[0], size: '80px' })) : (react_1.default.createElement(Div_1.default, { funcss: "w-80 h-80 flex central" },
                        react_1.default.createElement(Text_1.default, { text: "No Image", color: "text-light", size: "sm" })))),
                    react_1.default.createElement(Div_1.default, { funcss: 'w-200' },
                        react_1.default.createElement(Text_1.default, { text: item.product.name, block: true, weight: 600 }),
                        ((_c = item.variant) === null || _c === void 0 ? void 0 : _c.name) && (react_1.default.createElement(Text_1.default, { text: item.variant.name, size: 'sm', color: "text-light" })),
                        (item.selectedColor || item.selectedSize) && (react_1.default.createElement(Text_1.default, { text: "".concat(item.selectedColor ? "Color: ".concat(item.selectedColor) : '', " ").concat(item.selectedSize ? "Size: ".concat(item.selectedSize) : ''), size: 'sm', color: "text-light" })),
                        react_1.default.createElement(Flex_1.default, { gap: 0.2 },
                            hasDiscount && (react_1.default.createElement(Text_1.default, { text: "".concat(currency).concat(originalPrice.toFixed(2)), size: 'sm', color: "text-light", style: { textDecoration: 'line-through' } })),
                            react_1.default.createElement(Text_1.default, { text: "".concat(currency).concat(currentPrice.toFixed(2)).concat(hasDiscount ? " (Save ".concat(currency).concat((originalPrice - currentPrice).toFixed(2), ")") : ''), color: hasDiscount ? 'success' : 'text', size: 'xs' }))),
                    react_1.default.createElement("div", { className: "col" },
                        react_1.default.createElement(Flex_1.default, { width: '100%', gap: 0.5, alignItems: 'center' },
                            react_1.default.createElement(Circle_1.default, { size: 1.5, bg: 'lighter', body: react_1.default.createElement(pi_1.PiMinus, { size: 12 }), onClick: function () { return handleUpdateQuantity(item, item.quantity - 1); }, "aria-label": "Decrease quantity of ".concat(item.product.name) }),
                            react_1.default.createElement("div", { className: "w-70" },
                                react_1.default.createElement(Input_1.default, { type: "number", value: item.quantity, onChange: function (e) {
                                        var value = parseInt(e.target.value);
                                        if (!isNaN(value)) {
                                            handleUpdateQuantity(item, Math.max(1, value));
                                        }
                                    }, fullWidth: true, bordered: true, "aria-label": "Quantity for ".concat(item.product.name) })),
                            react_1.default.createElement(Circle_1.default, { bg: 'lighter', size: 1.5, body: react_1.default.createElement(pi_1.PiPlus, { size: 12 }), onClick: function () { return handleUpdateQuantity(item, item.quantity + 1); }, "aria-label": "Increase quantity of ".concat(item.product.name) }),
                            react_1.default.createElement("div", null),
                            react_1.default.createElement(Circle_1.default, { size: 1.5, body: react_1.default.createElement(pi_1.PiTrash, { size: 12 }), onClick: function () { return handleRemoveItem(item); }, bg: 'error', "aria-label": "Remove ".concat(item.product.name, " from cart") })))));
            }),
            react_1.default.createElement("div", { className: "section" }, persistCart && (react_1.default.createElement(Button_1.default, { text: "Clear Cart", onClick: clearCart, startIcon: react_1.default.createElement(tb_1.TbShoppingBagX, null), bg: "error-light", color: "error", funcss: "full-width" }))),
            react_1.default.createElement(Div_1.default, { funcss: 'mt' },
                react_1.default.createElement(RowFlex_1.default, { justify: "space-between" },
                    react_1.default.createElement(Text_1.default, { text: "Items", color: "text-light" }),
                    react_1.default.createElement(Text_1.default, { text: totalItems.toString() })),
                totalSavings > 0 && (react_1.default.createElement(RowFlex_1.default, { justify: "space-between" },
                    react_1.default.createElement(Text_1.default, { text: "Total Savings", color: "text-light" }),
                    react_1.default.createElement(Text_1.default, { text: "-".concat(currency).concat(totalSavings.toFixed(2)), color: "success" }))),
                react_1.default.createElement(RowFlex_1.default, { justify: "space-between" },
                    react_1.default.createElement(Text_1.default, { text: "Subtotal", color: "text-light" }),
                    react_1.default.createElement(Text_1.default, { text: "".concat(currency).concat(subtotal.toFixed(2)) })))))), footer: cart.length > 0 ? (react_1.default.createElement(Div_1.default, { funcss: "pt pb" },
            react_1.default.createElement(RowFlex_1.default, { justify: "space-between", alignItems: "center" },
                react_1.default.createElement(Div_1.default, null,
                    react_1.default.createElement(Text_1.default, { text: "Total", color: "text-light", size: "sm", block: true }),
                    react_1.default.createElement(Text_1.default, { text: "".concat(currency).concat(subtotal.toFixed(2)), size: "h4" })),
                react_1.default.createElement(Button_1.default, { text: checkoutText, bg: "primary", raised: true, onClick: handleCheckout, funcss: "padding-x-30", startIcon: checkoutIcon })))) : react_1.default.createElement(react_1.default.Fragment, null) }));
};
exports.default = CartModal;
