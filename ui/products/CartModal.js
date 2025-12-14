"use strict";
// components/products/CartModal.tsx
'use client';
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
var generateCartItemId = function (product, options) {
    var parts = [
        product.id,
        (options === null || options === void 0 ? void 0 : options.color) || '',
        (options === null || options === void 0 ? void 0 : options.size) || ''
    ].filter(Boolean);
    return parts.join('_');
};
var CartModal = function (_a) {
    var cart = _a.cart, isOpen = _a.isOpen, setIsOpen = _a.setIsOpen, _b = _a.currency, currency = _b === void 0 ? '$' : _b, updateQuantity = _a.updateQuantity, removeFromCart = _a.removeFromCart, clearCart = _a.clearCart, handleCheckout = _a.handleCheckout, _c = _a.cartBadgeColor, cartBadgeColor = _c === void 0 ? 'error' : _c, _d = _a.checkoutText, checkoutText = _d === void 0 ? 'Checkout' : _d, checkoutIcon = _a.checkoutIcon, _e = _a.small, small = _e === void 0 ? false : _e, _f = _a.big, big = _f === void 0 ? false : _f, _g = _a.persistCart, persistCart = _g === void 0 ? true : _g;
    var totalItems = cart.reduce(function (sum, item) { return sum + item.quantity; }, 0);
    var subtotal = cart.reduce(function (sum, item) { return sum + (item.product.price * item.quantity); }, 0);
    var handleRemoveItem = function (item) {
        var cartItemId = generateCartItemId(item.product, {
            color: item.selectedColor,
            size: item.selectedSize
        });
        removeFromCart(cartItemId);
    };
    var handleUpdateQuantity = function (item, newQuantity) {
        var cartItemId = generateCartItemId(item.product, {
            color: item.selectedColor,
            size: item.selectedSize
        });
        updateQuantity(cartItemId, newQuantity);
    };
    return (react_1.default.createElement(Modal_1.default, { animation: "SlideLeft", position: "right", duration: 0.3, open: isOpen, setOpen: setIsOpen, funcss: "funui_products_cart_modal width-400 sm:width-500", title: react_1.default.createElement(Text_1.default, { text: "Your Cart", size: "h3" }), body: react_1.default.createElement(Div_1.default, { funcss: "funui_products_cart_body max-height-70vh overflow-y-auto" }, cart.length === 0 ? (react_1.default.createElement(Div_1.default, { funcss: "flex-center padding-40" },
            react_1.default.createElement(Text_1.default, { text: "Your cart is empty", color: "text-light", size: "large" }))) : (react_1.default.createElement(react_1.default.Fragment, null,
            cart.map(function (item, index) {
                var _a;
                var cartItemId = generateCartItemId(item.product, {
                    color: item.selectedColor,
                    size: item.selectedSize
                });
                return (react_1.default.createElement(RowFlex_1.default, { key: "".concat(cartItemId, "-").concat(index), funcss: "lighter p round-edge section", alignItems: "center", justify: 'space-between', gap: 1 },
                    react_1.default.createElement(Div_1.default, { funcss: " width-80 height-80" }, ((_a = item.product.images) === null || _a === void 0 ? void 0 : _a[0]) ? (react_1.default.createElement("img", { src: item.product.images[0], alt: item.product.name, loading: "lazy", className: "fit round-edge" })) : (react_1.default.createElement(Div_1.default, { funcss: "w-80 h-80 flex central" },
                        react_1.default.createElement(Text_1.default, { text: "No Image", color: "text-light", size: "sm" })))),
                    react_1.default.createElement(Div_1.default, { funcss: "funui_products_cart_details flex-1 min-width-0" },
                        react_1.default.createElement(Text_1.default, { text: item.product.name, block: true }),
                        (item.selectedColor || item.selectedSize) && (react_1.default.createElement(Text_1.default, { text: "".concat(item.selectedColor ? "Color: ".concat(item.selectedColor) : '', " ").concat(item.selectedSize ? "Size: ".concat(item.selectedSize) : ''), size: 'sm' })),
                        react_1.default.createElement(Text_1.default, { text: "".concat(item.product.currency || currency).concat((item.product.price * item.quantity).toFixed(2)), block: true, size: 'lg' })),
                    react_1.default.createElement("div", { className: "col" },
                        react_1.default.createElement(Flex_1.default, { width: '100%', gap: 0.5, alignItems: 'center' },
                            react_1.default.createElement(Circle_1.default, { size: 2.5, bg: 'bg', body: react_1.default.createElement(pi_1.PiMinus, null), onClick: function () { return handleUpdateQuantity(item, item.quantity - 1); } }),
                            react_1.default.createElement("div", { className: "w-90" },
                                react_1.default.createElement(Input_1.default, { type: "number", value: item.quantity, onChange: function (e) {
                                        var value = parseInt(e.target.value);
                                        if (!isNaN(value)) {
                                            handleUpdateQuantity(item, Math.max(1, value));
                                        }
                                    }, fullWidth: true, bordered: true })),
                            react_1.default.createElement(Circle_1.default, { bg: 'bg', size: 2.5, body: react_1.default.createElement(pi_1.PiPlus, null), onClick: function () { return handleUpdateQuantity(item, item.quantity + 1); } }))),
                    react_1.default.createElement(Circle_1.default, { size: 2.5, body: react_1.default.createElement(pi_1.PiTrash, null), onClick: function () { return handleRemoveItem(item); }, bg: 'error' })));
            }),
            react_1.default.createElement(Div_1.default, { funcss: "funui_products_cart_summary padding-20 space-y-3" },
                react_1.default.createElement(RowFlex_1.default, { justify: "space-between" },
                    react_1.default.createElement(Text_1.default, { text: "Subtotal", color: "text-light" }),
                    react_1.default.createElement(Text_1.default, { text: "".concat(currency).concat(subtotal.toFixed(2)) })),
                react_1.default.createElement(RowFlex_1.default, { justify: "space-between" },
                    react_1.default.createElement(Text_1.default, { text: "Items", color: "text-light" }),
                    react_1.default.createElement(Text_1.default, { text: totalItems.toString() })))))), footer: cart.length > 0 ? (react_1.default.createElement(Div_1.default, { funcss: "funui_products_cart_footer padding-20 border-top border-light" },
            react_1.default.createElement(RowFlex_1.default, { justify: "space-between", alignItems: "center" },
                react_1.default.createElement(Div_1.default, null,
                    react_1.default.createElement(Text_1.default, { text: "Total", color: "text-light", size: "sm", block: true }),
                    react_1.default.createElement(Text_1.default, { text: "".concat(currency).concat(subtotal.toFixed(2)), size: "h4" })),
                react_1.default.createElement(Button_1.default, { text: checkoutText, bg: "primary", raised: true, onClick: handleCheckout, funcss: "padding-x-30", startIcon: checkoutIcon, small: small, big: big })))) : react_1.default.createElement(react_1.default.Fragment, null) }));
};
exports.default = CartModal;
