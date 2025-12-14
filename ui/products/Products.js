"use strict";
// Products.tsx
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
var Button_1 = __importDefault(require("../button/Button"));
var RowFlex_1 = __importDefault(require("../specials/RowFlex"));
var Text_1 = __importDefault(require("../text/Text"));
var Input_1 = __importDefault(require("../input/Input"));
var Div_1 = __importDefault(require("../div/Div"));
var Carousel_1 = __importDefault(require("../carousel/Carousel"));
// Constants
var EMPTY_IMAGE_SVG = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="%23f5f7fa"><rect width="100" height="100"/><text x="50" y="55" text-anchor="middle" fill="%236b7280" font-size="12" font-family="system-ui">No Image</text></svg>';
var THUMBNAIL_EMPTY_SVG = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="%23f3f4f6"><rect width="100" height="100"/></svg>';
var DETAIL_EMPTY_SVG = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="%23f3f4f6"><rect width="100" height="100"/><text x="50" y="55" text-anchor="middle" fill="%239ca3af" font-size="12">No Image</text></svg>';
// Styles - moved outside to avoid recreation
var PRODUCT_CARD_STYLE = { cursor: 'pointer' };
var IMAGE_STYLE = { width: '100%', height: '100%', objectFit: 'cover' };
var THUMBNAIL_STYLE = {
    width: '80px',
    height: '80px',
    borderRadius: '0.5rem',
    overflow: 'hidden',
    cursor: 'pointer'
};
// Lazy load modals for better performance
var CartModal = (0, react_1.lazy)(function () { return Promise.resolve().then(function () { return __importStar(require('./CartModal')); }); });
var ProductDetailModal = (0, react_1.lazy)(function () { return Promise.resolve().then(function () { return __importStar(require('./ProductDetailModal')); }); });
// Memoized Product Card Component
var ProductCard = (0, react_1.memo)(function (_a) {
    var _b;
    var product = _a.product, openProductModal = _a.openProductModal, rounded = _a.rounded, raised = _a.raised;
    var productData = (0, react_1.useMemo)(function () {
        var hasDiscount = product.comparePrice && product.comparePrice > product.price;
        var discountPercent = hasDiscount
            ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
            : 0;
        var stockAvailable = product.stock === undefined || product.stock > 0;
        return { hasDiscount: hasDiscount, discountPercent: discountPercent, stockAvailable: stockAvailable };
    }, [product]);
    return (react_1.default.createElement(Div_1.default, { key: product.id, funcss: "funui_store_product-card ".concat(rounded ? 'round-edge' : '', " ").concat(raised ? 'card' : ''), onClick: function () { return openProductModal(product); }, customStyle: PRODUCT_CARD_STYLE },
        react_1.default.createElement(Div_1.default, { funcss: "funui_store_image-container" },
            ((_b = product.images) === null || _b === void 0 ? void 0 : _b[0]) ? (react_1.default.createElement("img", { src: product.images[0], alt: product.name, loading: "lazy", onError: function (e) {
                    e.target.src = EMPTY_IMAGE_SVG;
                } })) : (react_1.default.createElement(Div_1.default, { funcss: "funui_store_no-image" },
                react_1.default.createElement(Text_1.default, { text: "No Image", color: "text-muted", size: "small" }))),
            react_1.default.createElement(Div_1.default, { funcss: "funui_store_product-badges" },
                product.isNew && (react_1.default.createElement("span", { className: "funui_store_badge new" }, "New")),
                product.isSale && (react_1.default.createElement("span", { className: "funui_store_badge sale" }, "Sale")),
                productData.hasDiscount && (react_1.default.createElement("span", { className: "funui_store_badge discount" },
                    "-",
                    productData.discountPercent,
                    "%")))),
        react_1.default.createElement(Div_1.default, { funcss: "funui_store_product-info" },
            product.category && (react_1.default.createElement("span", { className: "funui_store_product-category" }, product.category)),
            react_1.default.createElement(Text_1.default, { block: true, size: 'lg', truncate: 2 }, product.name),
            react_1.default.createElement(Div_1.default, { funcss: "funui_store_price-container" },
                react_1.default.createElement("span", { className: "funui_store_price" },
                    "$",
                    product.price.toFixed(2)),
                productData.hasDiscount && (react_1.default.createElement("span", { className: "funui_store_old-price" },
                    "$",
                    product.comparePrice.toFixed(2)))),
            !productData.stockAvailable ? (react_1.default.createElement("span", { className: "funui_store_stock-info out" }, "Out of Stock")) : product.stock !== undefined && product.stock > 0 && product.stock < 10 ? (react_1.default.createElement("span", { className: "funui_store_stock-info low" },
                "Only ",
                product.stock,
                " left")) : productData.stockAvailable && (react_1.default.createElement("span", { className: "funui_store_stock-info in" }, "In Stock")))));
});
ProductCard.displayName = 'ProductCard';
// Products Component
var Products = function (_a) {
    var _b = _a.products, products = _b === void 0 ? [] : _b, _c = _a.title, title = _c === void 0 ? 'Products' : _c, _d = _a.showHeader, showHeader = _d === void 0 ? true : _d, _e = _a.showSearch, showSearch = _e === void 0 ? true : _e, _f = _a.showFilters, showFilters = _f === void 0 ? true : _f, _g = _a.showCart, showCart = _g === void 0 ? true : _g, _h = _a.cartIcon, cartIcon = _h === void 0 ? react_1.default.createElement(pi_1.PiShoppingCart, null) : _h, _j = _a.cartBadgeColor, cartBadgeColor = _j === void 0 ? 'error' : _j, cartBadgeText = _a.cartBadgeText, _k = _a.checkoutText, checkoutText = _k === void 0 ? 'Checkout' : _k, checkoutIcon = _a.checkoutIcon, onAddToCart = _a.onAddToCart, onRemoveFromCart = _a.onRemoveFromCart, onUpdateQuantity = _a.onUpdateQuantity, onCheckout = _a.onCheckout, onProductClick = _a.onProductClick, _l = _a.className, className = _l === void 0 ? '' : _l, _m = _a.gridClassName, gridClassName = _m === void 0 ? '' : _m, children = _a.children, style = _a.style, id = _a.id, _o = _a.funcss, funcss = _o === void 0 ? '' : _o, bg = _a.bg, color = _a.color, _p = _a.rounded, rounded = _p === void 0 ? false : _p, _q = _a.raised, raised = _q === void 0 ? false : _q, _r = _a.fullWidth, fullWidth = _r === void 0 ? false : _r, _s = _a.small, small = _s === void 0 ? false : _s, _t = _a.big, big = _t === void 0 ? false : _t;
    // Parse products once (can be array or JSON string)
    var parsedProducts = (0, react_1.useMemo)(function () {
        if (typeof products === 'string') {
            try {
                var parsed = JSON.parse(products);
                return Array.isArray(parsed) ? parsed : [];
            }
            catch (error) {
                console.error('Error parsing products JSON:', error);
                return [];
            }
        }
        return products || [];
    }, [products]);
    // Get unique categories with proper dependencies
    var categories = (0, react_1.useMemo)(function () {
        var allCategories = parsedProducts
            .map(function (p) { return p.category; })
            .filter(function (cat) { return typeof cat === 'string' && cat.trim() !== ''; });
        var uniqueCategories = Array.from(new Set(allCategories));
        return __spreadArray(['all'], uniqueCategories, true);
    }, [parsedProducts]);
    // States
    var _u = (0, react_1.useState)([]), cart = _u[0], setCart = _u[1];
    var _v = (0, react_1.useState)(false), isCartOpen = _v[0], setIsCartOpen = _v[1];
    var _w = (0, react_1.useState)(false), isProductModalOpen = _w[0], setIsProductModalOpen = _w[1];
    var _x = (0, react_1.useState)(null), selectedProduct = _x[0], setSelectedProduct = _x[1];
    var _y = (0, react_1.useState)(''), searchQuery = _y[0], setSearchQuery = _y[1];
    var _z = (0, react_1.useState)('all'), selectedCategory = _z[0], setSelectedCategory = _z[1];
    var _0 = (0, react_1.useState)(''), selectedColor = _0[0], setSelectedColor = _0[1];
    var _1 = (0, react_1.useState)(1), quantity = _1[0], setQuantity = _1[1];
    var _2 = (0, react_1.useState)(0), selectedImageIndex = _2[0], setSelectedImageIndex = _2[1];
    // Deferred search for better performance
    var deferredSearchQuery = (0, react_1.useDeferredValue)(searchQuery);
    // Filter products with memoization
    var filteredProducts = (0, react_1.useMemo)(function () {
        var filtered = __spreadArray([], parsedProducts, true);
        if (deferredSearchQuery.trim()) {
            var query_1 = deferredSearchQuery.toLowerCase();
            filtered = filtered.filter(function (p) {
                var _a, _b, _c, _d, _e, _f, _g, _h;
                var nameMatch = (_b = (_a = p.name) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes(query_1)) !== null && _b !== void 0 ? _b : false;
                var descMatch = (_d = (_c = p.description) === null || _c === void 0 ? void 0 : _c.toLowerCase().includes(query_1)) !== null && _d !== void 0 ? _d : false;
                var brandMatch = (_f = (_e = p.brand) === null || _e === void 0 ? void 0 : _e.toLowerCase().includes(query_1)) !== null && _f !== void 0 ? _f : false;
                var tagMatch = (_h = (_g = p.tags) === null || _g === void 0 ? void 0 : _g.some(function (tag) { return tag.toLowerCase().includes(query_1); })) !== null && _h !== void 0 ? _h : false;
                return nameMatch || descMatch || brandMatch || tagMatch;
            });
        }
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(function (p) { return p.category === selectedCategory; });
        }
        return filtered;
    }, [parsedProducts, deferredSearchQuery, selectedCategory]);
    // Cart calculations
    var cartCalculations = (0, react_1.useMemo)(function () {
        var totalItems = cart.reduce(function (sum, item) { return sum + item.quantity; }, 0);
        var subtotal = cart.reduce(function (sum, item) { return sum + (item.product.price * item.quantity); }, 0);
        return { totalItems: totalItems, subtotal: subtotal };
    }, [cart]);
    var totalItems = cartCalculations.totalItems, subtotal = cartCalculations.subtotal;
    // Memoized cart functions
    var addToCart = (0, react_1.useCallback)(function (product, color) {
        var existingItem = cart.find(function (item) {
            return item.product.id === product.id &&
                item.selectedColor === color;
        });
        var updatedCart;
        if (existingItem) {
            updatedCart = cart.map(function (item) {
                return item.product.id === existingItem.product.id &&
                    item.selectedColor === existingItem.selectedColor
                    ? __assign(__assign({}, item), { quantity: item.quantity + 1 }) : item;
            });
        }
        else {
            updatedCart = __spreadArray(__spreadArray([], cart, true), [{
                    product: product,
                    quantity: 1,
                    selectedColor: color,
                }], false);
        }
        setCart(updatedCart);
        // Call callback
        if (existingItem) {
            onUpdateQuantity === null || onUpdateQuantity === void 0 ? void 0 : onUpdateQuantity(product.id, existingItem.quantity + 1);
        }
        else {
            var newItem = updatedCart.find(function (item) {
                return item.product.id === product.id &&
                    item.selectedColor === color;
            });
            if (newItem) {
                onAddToCart === null || onAddToCart === void 0 ? void 0 : onAddToCart(newItem);
            }
        }
    }, [cart, onUpdateQuantity, onAddToCart]);
    var updateQuantity = (0, react_1.useCallback)(function (productId, newQuantity) {
        if (newQuantity < 1) {
            removeFromCart(productId);
            return;
        }
        var updatedCart = cart.map(function (item) {
            return item.product.id === productId
                ? __assign(__assign({}, item), { quantity: newQuantity }) : item;
        });
        setCart(updatedCart);
        onUpdateQuantity === null || onUpdateQuantity === void 0 ? void 0 : onUpdateQuantity(productId, newQuantity);
    }, [cart, onUpdateQuantity]);
    var removeFromCart = (0, react_1.useCallback)(function (productId) {
        var updatedCart = cart.filter(function (item) { return item.product.id !== productId; });
        setCart(updatedCart);
        onRemoveFromCart === null || onRemoveFromCart === void 0 ? void 0 : onRemoveFromCart(productId);
    }, [cart, onRemoveFromCart]);
    var handleCheckout = (0, react_1.useCallback)(function () {
        if (onCheckout) {
            onCheckout(cart, subtotal);
        }
        setIsCartOpen(false);
    }, [onCheckout, cart, subtotal]);
    // Memoized product modal function
    var openProductModal = (0, react_1.useCallback)(function (product) {
        if (onProductClick) {
            onProductClick(product);
            return;
        }
        setSelectedProduct(product);
        setSelectedColor('');
        setQuantity(1);
        setSelectedImageIndex(0);
        setIsProductModalOpen(true);
    }, [onProductClick]);
    var handleAddFromModal = (0, react_1.useCallback)(function () {
        if (selectedProduct) {
            for (var i = 0; i < quantity; i++) {
                addToCart(selectedProduct, selectedColor || undefined);
            }
            setIsProductModalOpen(false);
        }
    }, [selectedProduct, quantity, selectedColor, addToCart]);
    // Debounced search handler
    var handleSearchChange = (0, react_1.useCallback)(function (value) {
        setSearchQuery(value);
    }, []);
    // Memoized render functions
    var renderHeader = (0, react_1.useMemo)(function () {
        if (!showHeader)
            return null;
        return (react_1.default.createElement(RowFlex_1.default, { justify: "space-between", alignItems: "center", funcss: "mb-5" },
            react_1.default.createElement(Text_1.default, { text: title, size: "h1", funcss: "text-bold" })));
    }, [showHeader, title]);
    var renderSearchAndFilters = (0, react_1.useMemo)(function () {
        if (!showSearch && !showFilters)
            return null;
        return (react_1.default.createElement(Div_1.default, { funcss: "" },
            showSearch && (react_1.default.createElement(RowFlex_1.default, { gap: 1, alignItems: "center", justify: 'space-between' },
                react_1.default.createElement(Input_1.default, { label: "Search products...", value: searchQuery, onChange: function (e) { return handleSearchChange(e.target.value); }, bordered: true, fullWidth: fullWidth, startIcon: react_1.default.createElement(pi_1.PiMagnifyingGlass, null) }),
                showCart && (react_1.default.createElement("button", { onClick: function () { return setIsCartOpen(true); }, className: "cart-icon", type: "button", "aria-label": "Shopping cart (".concat(totalItems, " items)") },
                    react_1.default.createElement(pi_1.PiShoppingCart, { size: 30 }),
                    totalItems > 0 && (react_1.default.createElement("div", { className: "cart-badge" }, totalItems > 99 ? '99+' : totalItems)))))),
            showFilters && categories.length > 1 && (react_1.default.createElement(Carousel_1.default, { funcss: 'section' },
                react_1.default.createElement(Button_1.default, { text: "All", onClick: function () { return setSelectedCategory('all'); }, bg: selectedCategory === 'all' ? 'primary' : undefined, color: selectedCategory === 'all' ? 'white' : 'text', outlined: selectedCategory !== 'all', small: true }),
                categories
                    .filter(function (c) { return c !== 'all'; })
                    .map(function (category) { return (react_1.default.createElement(Button_1.default, { key: category, text: category, onClick: function () { return setSelectedCategory(category); }, bg: selectedCategory === category ? 'primary' : "lighter", color: selectedCategory === category ? 'white' : 'text', outlined: selectedCategory !== category, small: true })); })))));
    }, [showSearch, showFilters, showCart, searchQuery, handleSearchChange, fullWidth, totalItems, categories, selectedCategory]);
    var renderProductsGrid = (0, react_1.useMemo)(function () {
        if (filteredProducts.length === 0) {
            return (react_1.default.createElement(Div_1.default, { funcss: "funui_products_empty flex-center padding-40" },
                react_1.default.createElement(Text_1.default, { text: "No products found", color: "text-light", size: "large" })));
        }
        return (react_1.default.createElement(Div_1.default, { funcss: "funui_products_grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ".concat(gridClassName) }, filteredProducts.map(function (product) { return (react_1.default.createElement(ProductCard, { key: product.id, product: product, openProductModal: openProductModal, rounded: rounded, raised: raised })); })));
    }, [filteredProducts, gridClassName, openProductModal, rounded, raised]);
    return (react_1.default.createElement(Div_1.default, { funcss: "funui_products_classname ".concat(className, " ").concat(funcss).trim(), id: id, customStyle: style },
        renderHeader,
        renderSearchAndFilters,
        renderProductsGrid,
        children,
        showCart && (react_1.default.createElement(react_1.Suspense, { fallback: react_1.default.createElement("div", null, "Loading cart...") },
            react_1.default.createElement(CartModal, { isOpen: isCartOpen, setIsOpen: setIsCartOpen, cart: cart, subtotal: subtotal, totalItems: totalItems, updateQuantity: updateQuantity, removeFromCart: removeFromCart, handleCheckout: handleCheckout, checkoutText: checkoutText, checkoutIcon: checkoutIcon, small: small, big: big }))),
        selectedProduct && (react_1.default.createElement(react_1.Suspense, { fallback: react_1.default.createElement("div", null, "Loading product details...") },
            react_1.default.createElement(ProductDetailModal, { isOpen: isProductModalOpen, setIsOpen: setIsProductModalOpen, selectedProduct: selectedProduct, selectedImageIndex: selectedImageIndex, setSelectedImageIndex: setSelectedImageIndex, selectedColor: selectedColor, setSelectedColor: setSelectedColor, quantity: quantity, setQuantity: setQuantity, handleAddFromModal: handleAddFromModal, small: small, big: big })))));
};
exports.default = Products;
