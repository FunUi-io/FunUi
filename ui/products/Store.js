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
var sl_1 = require("react-icons/sl");
var Flex_1 = __importDefault(require("../flex/Flex"));
var Select_1 = __importDefault(require("../select/Select"));
var ProductCard_1 = __importDefault(require("./ProductCard"));
var CartModal_1 = __importDefault(require("./CartModal"));
var ProductDetail_1 = __importDefault(require("./ProductDetail"));
var theme_1 = require("../theme/theme");
var componentUtils_1 = require("../../utils/componentUtils");
var Empty_1 = __importDefault(require("../empty/Empty"));
var ri_1 = require("react-icons/ri");
var Store = function (localProps) {
    // Use component configuration with variant
    var mergeWithLocal = (0, componentUtils_1.useComponentConfiguration)('Store', localProps.variant).mergeWithLocal;
    var final = mergeWithLocal(localProps).props;
    // Destructure props from final merged configuration
    var _a = final.products, products = _a === void 0 ? [] : _a, bucket = final.bucket, _b = final.bucketPage, bucketPage = _b === void 0 ? 1 : _b, _c = final.bucketSize, bucketSize = _c === void 0 ? 50 : _c, _d = final.title, title = _d === void 0 ? 'Products' : _d, _e = final.showHeader, showHeader = _e === void 0 ? true : _e, _f = final.showSearch, showSearch = _f === void 0 ? true : _f, _g = final.showFilters, showFilters = _g === void 0 ? true : _g, _h = final.showCart, showCart = _h === void 0 ? true : _h, _j = final.cartBadgeColor, cartBadgeColor = _j === void 0 ? 'error' : _j, cartBadgeText = final.cartBadgeText, _k = final.checkoutText, checkoutText = _k === void 0 ? 'Checkout' : _k, checkoutIcon = final.checkoutIcon, _l = final.currency, currency = _l === void 0 ? '$' : _l, _m = final.persistCart, persistCart = _m === void 0 ? true : _m, _o = final.storageKey, storageKey = _o === void 0 ? 'funui_cart' : _o, onAddToCart = final.onAddToCart, onRemoveFromCart = final.onRemoveFromCart, onUpdateQuantity = final.onUpdateQuantity, onCheckout = final.onCheckout, onProductClick = final.onProductClick, _p = final.className, className = _p === void 0 ? '' : _p, _q = final.gridClassName, gridClassName = _q === void 0 ? '' : _q, children = final.children, id = final.id, _r = final.funcss, funcss = _r === void 0 ? '' : _r, _s = final.fullWidth, fullWidth = _s === void 0 ? false : _s, _t = final.small, small = _t === void 0 ? false : _t, _u = final.big, big = _u === void 0 ? false : _u, _v = final.itemsPerPage, itemsPerPage = _v === void 0 ? 10 : _v;
    // Loading state - track bucket loading and initial load
    var _w = (0, react_1.useState)(true), isInitialLoading = _w[0], setIsInitialLoading = _w[1];
    // Use bucket data if bucket prop is provided
    var _x = (0, theme_1.usePaginatedRecords)(bucket || '', // Use bucket name if provided
    bucketPage, bucketSize), bucketRecords = _x.records, bucketLoading = _x.loading;
    // Function to calculate discount price
    var calculateDiscountedPrice = (0, react_1.useCallback)(function (price, discount) {
        if (discount && discount > 0 && discount <= 100) {
            var discountAmount = (price * discount) / 100;
            return {
                finalPrice: price - discountAmount,
                originalPrice: price
            };
        }
        return {
            finalPrice: price,
            originalPrice: price
        };
    }, []);
    // Apply discounts to products
    var applyDiscounts = (0, react_1.useCallback)(function (products) {
        return products.map(function (product) {
            var _a, _b;
            // Check if product has variants
            if (product.variants && product.variants.length > 0) {
                var discountedVariants = product.variants.map(function (variant) {
                    var _a = calculateDiscountedPrice(variant.price, variant.discount), finalPrice = _a.finalPrice, originalPrice = _a.originalPrice;
                    return __assign(__assign({}, variant), { price: finalPrice, comparePrice: originalPrice });
                });
                return __assign(__assign({}, product), { variants: discountedVariants, 
                    // Use the first variant's price as the main product price
                    price: ((_a = discountedVariants[0]) === null || _a === void 0 ? void 0 : _a.price) || product.price, comparePrice: ((_b = discountedVariants[0]) === null || _b === void 0 ? void 0 : _b.comparePrice) || product.comparePrice });
            }
            else {
                // Apply discount to main product
                var _c = calculateDiscountedPrice(product.price, product.discount), finalPrice = _c.finalPrice, originalPrice = _c.originalPrice;
                return __assign(__assign({}, product), { price: finalPrice, comparePrice: originalPrice !== finalPrice ? originalPrice : product.comparePrice });
            }
        });
    }, [calculateDiscountedPrice]);
    // Convert bucket records to products format with discount handling
    var bucketProducts = (0, react_1.useMemo)(function () {
        if (!bucket || !bucketRecords)
            return null;
        var mappedProducts = bucketRecords.map(function (record) {
            var values = record.values || record;
            // Extract discount from record - could be in various fields
            var discount = values.discount || values.salePercentage || values.discountPercentage;
            return {
                id: values.id || record.id || "bucket_".concat(Math.random().toString(36).substr(2, 9)),
                name: values.name || values.title || 'Unnamed Product',
                price: parseFloat(values.price) || 0,
                comparePrice: parseFloat(values.comparePrice) || parseFloat(values.originalPrice) || undefined,
                currency: values.currency || currency,
                description: values.description || '',
                images: Array.isArray(values.images) ? values.images.map(function (image) { return image.url; }) :
                    values.image ? [values.image] : [],
                category: values.category || values.type || '',
                brand: values.brand || values.manufacturer || '',
                tags: Array.isArray(values.tags) ? values.tags :
                    values.tag ? [values.tag] : [],
                colors: values.colors || [],
                sizes: values.sizes || [],
                weight: parseFloat(values.weight) || undefined,
                weightUnit: values.weightUnit,
                sku: values.sku || values.productCode,
                stock: parseInt(values.stock) || parseInt(values.quantity) || undefined,
                rating: parseFloat(values.rating) || undefined,
                isNew: values.isNew || values.newArrival || false,
                isSale: values.isSale || values.onSale || false,
                variants: values.variants ? values.variants.map(function (variant) { return (__assign(__assign({}, variant), { discount: variant.discount || discount // Pass discount to variants
                 })); }) : [],
                manufacturer: values.manufacturer || '',
                countryOfOrigin: values.countryOfOrigin || '',
                warranty: values.warranty || '',
                isFeatured: values.isFeatured || '',
                discount: discount ? parseFloat(discount) : undefined
            };
        });
        return applyDiscounts(mappedProducts);
    }, [bucketRecords, bucket, currency, applyDiscounts]);
    // Parse and process products - FIXED: No setState calls inside useMemo
    var parsedProducts = react_1.default.useMemo(function () {
        var productList;
        // Use bucket products if bucket prop is provided and we have bucket data
        if (bucket && bucketProducts) {
            console.log("Using ".concat(bucketProducts.length, " products from bucket: ").concat(bucket));
            productList = bucketProducts.map(function (product, index) { return (__assign(__assign({}, product), { id: product.id || "bucket_product_".concat(index, "_").concat(Date.now()) })); });
        }
        else {
            // Fall back to local products prop
            if (typeof products === 'string') {
                try {
                    var parsed = JSON.parse(products);
                    productList = Array.isArray(parsed) ? parsed : [];
                }
                catch (error) {
                    console.error('Error parsing products JSON:', error);
                    productList = [];
                }
            }
            else {
                productList = products || [];
            }
            // Apply discounts to locally provided products
            productList = applyDiscounts(productList);
        }
        // Ensure each product has a unique ID
        return productList.map(function (product, index) { return (__assign(__assign({}, product), { id: product.id || "product_".concat(index, "_").concat(Date.now(), "_").concat(Math.random().toString(36).substr(2, 9)) })); });
    }, [products, bucket, bucketProducts, applyDiscounts]);
    // Handle loading state separately
    (0, react_1.useEffect)(function () {
        if (bucket) {
            // For bucket data, loading is based on bucketLoading state
            if (!bucketLoading && bucketProducts !== undefined) {
                // Small delay for better UX
                var timer_1 = setTimeout(function () {
                    setIsInitialLoading(false);
                }, 300);
                return function () { return clearTimeout(timer_1); };
            }
        }
        else {
            // For local data, loading is immediate after parsing
            setIsInitialLoading(false);
        }
    }, [bucket, bucketLoading, bucketProducts]);
    // Combined loading state
    var showLoading = isInitialLoading || (bucket && bucketLoading);
    // Initialize cart from localStorage with discount handling
    var _y = (0, react_1.useState)(function () {
        if (!persistCart)
            return [];
        try {
            var stored = localStorage.getItem(storageKey);
            if (stored) {
                var parsed = JSON.parse(stored);
                if (parsed.items && Array.isArray(parsed.items)) {
                    return parsed.items.map(function (item) { return (__assign(__assign({}, item), { product: __assign(__assign({}, item.product), { id: item.product.id || "restored_".concat(Date.now()) }), 
                        // Ensure original price is preserved
                        originalPrice: item.originalPrice || item.product.comparePrice || item.product.price })); });
                }
            }
        }
        catch (error) {
            console.error('Error loading cart from localStorage:', error);
        }
        return [];
    }), cart = _y[0], setCart = _y[1];
    // Save cart to localStorage
    (0, react_1.useEffect)(function () {
        if (persistCart) {
            try {
                var cartStorage = {
                    items: cart,
                    updatedAt: Date.now(),
                };
                localStorage.setItem(storageKey, JSON.stringify(cartStorage));
            }
            catch (error) {
                console.error('Error saving cart to localStorage:', error);
            }
        }
    }, [cart, persistCart, storageKey]);
    var _z = (0, react_1.useState)(false), isCartOpen = _z[0], setIsCartOpen = _z[1];
    var _0 = (0, react_1.useState)(false), isProductModalOpen = _0[0], setIsProductModalOpen = _0[1];
    var _1 = (0, react_1.useState)(null), selectedProduct = _1[0], setSelectedProduct = _1[1];
    var _2 = (0, react_1.useState)(''), searchQuery = _2[0], setSearchQuery = _2[1];
    var _3 = (0, react_1.useState)('all'), selectedCategory = _3[0], setSelectedCategory = _3[1];
    var _4 = (0, react_1.useState)('all'), selectedColor = _4[0], setSelectedColor = _4[1];
    var _5 = (0, react_1.useState)('all'), selectedBrand = _5[0], setSelectedBrand = _5[1];
    var _6 = (0, react_1.useState)(1), currentPage = _6[0], setCurrentPage = _6[1];
    // Get unique categories
    var categories = (0, react_1.useMemo)(function () {
        if (showLoading)
            return ['all'];
        var allCategories = parsedProducts
            .map(function (p) { return p.category; })
            .filter(function (cat) { return typeof cat === 'string' && cat.trim() !== ''; });
        var uniqueCategories = Array.from(new Set(allCategories));
        return __spreadArray(['all'], uniqueCategories, true);
    }, [parsedProducts, showLoading]);
    // Get unique brands
    var brands = (0, react_1.useMemo)(function () {
        if (showLoading)
            return ['all'];
        var allBrands = parsedProducts
            .map(function (p) { return p.brand; })
            .filter(function (brand) { return typeof brand === 'string' && brand.trim() !== ''; });
        return __spreadArray(['all'], Array.from(new Set(allBrands)), true);
    }, [parsedProducts, showLoading]);
    // Get unique colors
    var colors = (0, react_1.useMemo)(function () {
        if (showLoading)
            return ['all'];
        var allColors = [];
        parsedProducts.forEach(function (product) {
            var _a;
            (_a = product.colors) === null || _a === void 0 ? void 0 : _a.forEach(function (color) {
                if (!allColors.includes(color.name)) {
                    allColors.push(color.name);
                }
            });
        });
        return __spreadArray(['all'], allColors, true);
    }, [parsedProducts, showLoading]);
    // Filter products
    var filteredProducts = (0, react_1.useMemo)(function () {
        if (showLoading)
            return [];
        var filtered = __spreadArray([], parsedProducts, true);
        if (searchQuery.trim()) {
            var query_1 = searchQuery.toLowerCase();
            filtered = filtered.filter(function (p) {
                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
                var nameMatch = (_b = (_a = p.name) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes(query_1)) !== null && _b !== void 0 ? _b : false;
                var descMatch = (_d = (_c = p.description) === null || _c === void 0 ? void 0 : _c.toLowerCase().includes(query_1)) !== null && _d !== void 0 ? _d : false;
                var brandMatch = (_f = (_e = p.brand) === null || _e === void 0 ? void 0 : _e.toLowerCase().includes(query_1)) !== null && _f !== void 0 ? _f : false;
                var categoryMatch = (_h = (_g = p.category) === null || _g === void 0 ? void 0 : _g.toLowerCase().includes(query_1)) !== null && _h !== void 0 ? _h : false;
                var tagsMatch = (_k = (_j = p.tags) === null || _j === void 0 ? void 0 : _j.some(function (tag) { return tag.toLowerCase().includes(query_1); })) !== null && _k !== void 0 ? _k : false;
                return nameMatch || descMatch || brandMatch || categoryMatch || tagsMatch;
            });
        }
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(function (p) { return p.category === selectedCategory; });
        }
        if (selectedBrand !== 'all') {
            filtered = filtered.filter(function (p) { return p.brand === selectedBrand; });
        }
        if (selectedColor !== 'all') {
            filtered = filtered.filter(function (p) { var _a; return (_a = p.colors) === null || _a === void 0 ? void 0 : _a.some(function (color) { return color.name === selectedColor; }); });
        }
        return filtered;
    }, [parsedProducts, searchQuery, selectedCategory, selectedBrand, selectedColor, showLoading]);
    // Pagination
    var totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    var startIndex = (currentPage - 1) * itemsPerPage;
    var endIndex = startIndex + itemsPerPage;
    var currentProducts = filteredProducts.slice(startIndex, endIndex);
    (0, react_1.useEffect)(function () {
        setCurrentPage(1);
    }, [searchQuery, selectedCategory, selectedBrand, selectedColor]);
    // Enhanced cart calculations with discount consideration
    var totalItems = (0, react_1.useMemo)(function () { return cart.reduce(function (sum, item) { return sum + item.quantity; }, 0); }, [cart]);
    var subtotal = (0, react_1.useMemo)(function () { return cart.reduce(function (sum, item) {
        var _a;
        var price = ((_a = item.variant) === null || _a === void 0 ? void 0 : _a.price) || item.product.price;
        return sum + (price * item.quantity);
    }, 0); }, [cart]);
    // Calculate total savings from discounts
    var totalSavings = (0, react_1.useMemo)(function () { return cart.reduce(function (sum, item) {
        var _a;
        var originalPrice = item.originalPrice || item.product.comparePrice || item.product.price;
        var currentPrice = ((_a = item.variant) === null || _a === void 0 ? void 0 : _a.price) || item.product.price;
        var savings = originalPrice !== currentPrice ? (originalPrice - currentPrice) * item.quantity : 0;
        return sum + savings;
    }, 0); }, [cart]);
    // Generate cart item ID
    var generateCartItemId = (0, react_1.useCallback)(function (product, options) {
        var _a;
        var parts = [
            product.id,
            ((_a = options === null || options === void 0 ? void 0 : options.variant) === null || _a === void 0 ? void 0 : _a.id) || '',
            (options === null || options === void 0 ? void 0 : options.color) || '',
            (options === null || options === void 0 ? void 0 : options.size) || ''
        ].filter(Boolean);
        return parts.join('_');
    }, []);
    // Enhanced cart functions with original price preservation
    var addToCart = (0, react_1.useCallback)(function (product, selectedOptions) {
        var _a;
        var cartItemId = generateCartItemId(product, selectedOptions);
        var existingItemIndex = cart.findIndex(function (item) {
            var itemId = generateCartItemId(item.product, {
                color: item.selectedColor,
                size: item.selectedSize,
                variant: item.variant
            });
            return itemId === cartItemId;
        });
        var updatedCart;
        // Store original price before discount
        var originalPrice = ((_a = selectedOptions === null || selectedOptions === void 0 ? void 0 : selectedOptions.variant) === null || _a === void 0 ? void 0 : _a.comparePrice) ||
            product.comparePrice ||
            product.price;
        if (existingItemIndex !== -1) {
            updatedCart = __spreadArray([], cart, true);
            var existingItem = updatedCart[existingItemIndex];
            updatedCart[existingItemIndex] = __assign(__assign({}, existingItem), { quantity: existingItem.quantity + 1 });
        }
        else {
            var newItem = {
                product: product,
                variant: selectedOptions === null || selectedOptions === void 0 ? void 0 : selectedOptions.variant,
                quantity: 1,
                selectedColor: selectedOptions === null || selectedOptions === void 0 ? void 0 : selectedOptions.color,
                selectedSize: selectedOptions === null || selectedOptions === void 0 ? void 0 : selectedOptions.size,
                addedAt: Date.now(),
                originalPrice: originalPrice
            };
            updatedCart = __spreadArray(__spreadArray([], cart, true), [newItem], false);
        }
        setCart(updatedCart);
        if (existingItemIndex !== -1) {
            var existingItem = cart[existingItemIndex];
            onUpdateQuantity === null || onUpdateQuantity === void 0 ? void 0 : onUpdateQuantity(cartItemId, existingItem.quantity + 1);
        }
        else {
            var newItem = updatedCart[updatedCart.length - 1];
            onAddToCart === null || onAddToCart === void 0 ? void 0 : onAddToCart(newItem);
        }
    }, [cart, generateCartItemId, onUpdateQuantity, onAddToCart]);
    var updateQuantity = (0, react_1.useCallback)(function (cartItemId, newQuantity) {
        if (newQuantity < 1) {
            removeFromCart(cartItemId);
            return;
        }
        var updatedCart = cart.map(function (item) {
            var itemId = generateCartItemId(item.product, {
                color: item.selectedColor,
                size: item.selectedSize,
                variant: item.variant
            });
            if (itemId === cartItemId) {
                return __assign(__assign({}, item), { quantity: newQuantity });
            }
            return item;
        });
        setCart(updatedCart);
        onUpdateQuantity === null || onUpdateQuantity === void 0 ? void 0 : onUpdateQuantity(cartItemId, newQuantity);
    }, [cart, generateCartItemId, onUpdateQuantity]);
    var removeFromCart = (0, react_1.useCallback)(function (cartItemId) {
        var updatedCart = cart.filter(function (item) {
            var itemId = generateCartItemId(item.product, {
                color: item.selectedColor,
                size: item.selectedSize,
                variant: item.variant
            });
            return itemId !== cartItemId;
        });
        setCart(updatedCart);
        onRemoveFromCart === null || onRemoveFromCart === void 0 ? void 0 : onRemoveFromCart(cartItemId);
    }, [cart, generateCartItemId, onRemoveFromCart]);
    var clearCart = (0, react_1.useCallback)(function () {
        setCart([]);
        if (persistCart) {
            localStorage.removeItem(storageKey);
        }
    }, [persistCart, storageKey]);
    var handleCheckout = (0, react_1.useCallback)(function () {
        if (onCheckout) {
            onCheckout(cart, subtotal);
        }
        if (persistCart) {
            clearCart();
        }
        setIsCartOpen(false);
    }, [onCheckout, cart, subtotal, persistCart, clearCart]);
    // Product modal
    var openProductModal = (0, react_1.useCallback)(function (product) {
        if (onProductClick) {
            onProductClick(product);
            return;
        }
        setSelectedProduct(product);
        setIsProductModalOpen(true);
    }, [onProductClick]);
    var handleAddFromModal = (0, react_1.useCallback)(function (product, quantity, options) {
        for (var i = 0; i < quantity; i++) {
            addToCart(product, options);
        }
        setIsProductModalOpen(false);
    }, [addToCart]);
    // Pagination
    var goToPage = (0, react_1.useCallback)(function (page) {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    }, [totalPages]);
    return (react_1.default.createElement(Div_1.default, { funcss: "funui_products_classname ".concat(className, " ").concat(funcss), id: id, customStyle: {
            backgroundColor: final.bg,
            color: final.color,
        } },
        showHeader && (react_1.default.createElement(RowFlex_1.default, { justify: "space-between", alignItems: "center", funcss: "mb-5" },
            react_1.default.createElement(Text_1.default, { text: title, size: "h1" }),
            showCart && (react_1.default.createElement("button", { onClick: function () { return setIsCartOpen(true); }, className: "cart-icon relative", type: "button", "aria-label": "Shopping cart (".concat(totalItems, " items)"), disabled: showLoading },
                react_1.default.createElement(sl_1.SlHandbag, { size: 30 }),
                totalItems > 0 && (react_1.default.createElement("div", { className: "cart-badge", style: { backgroundColor: cartBadgeColor } }, cartBadgeText || (totalItems > 99 ? '99+' : totalItems))))))),
        (showSearch || showFilters) && (react_1.default.createElement(RowFlex_1.default, { gap: 1, alignItems: "center", justify: 'space-between' },
            showSearch && (react_1.default.createElement(Input_1.default, { label: "Search products...", value: searchQuery, onChange: function (e) { return setSearchQuery(e.target.value); }, bordered: true, fullWidth: fullWidth, startIcon: react_1.default.createElement(pi_1.PiMagnifyingGlass, null) })),
            showFilters && (react_1.default.createElement("div", { className: "col" },
                react_1.default.createElement(Flex_1.default, { gap: 0.5, width: '100%', justify: 'flex-end' },
                    categories && categories.length > 0 && (react_1.default.createElement("div", { className: "w-150" },
                        react_1.default.createElement(Select_1.default, { options: categories.map(function (cat) { return ({ text: cat === 'all' ? 'All Categories' : cat, value: cat }); }), value: selectedCategory, onChange: function (e) { return setSelectedCategory(e); }, bordered: true, funcss: 'text-sm', disabled: showLoading }))),
                    brands && brands.length > 0 && (react_1.default.createElement("div", { className: "w-150" },
                        react_1.default.createElement(Select_1.default, { options: brands.map(function (brand) { return ({ text: brand === 'all' ? 'All Brands' : brand, value: brand }); }), value: selectedBrand, onChange: function (e) { return setSelectedBrand(e); }, bordered: true, funcss: 'text-sm', disabled: showLoading }))),
                    colors && colors.length > 0 && (react_1.default.createElement("div", { className: "w-150" },
                        react_1.default.createElement(Select_1.default, { options: colors.map(function (color) { return ({ text: color === 'all' ? 'All Colors' : color, value: color }); }), value: selectedColor, onChange: function (e) { return setSelectedColor(e); }, bordered: true, funcss: 'text-sm', disabled: showLoading })))))))),
        showLoading ? (react_1.default.createElement(Div_1.default, { funcss: "funui_products_loading flex-center padding-40" },
            react_1.default.createElement(Flex_1.default, { direction: "column", alignItems: "center", gap: 2 },
                react_1.default.createElement(ri_1.RiLoader4Line, { size: 40, className: "spin" }),
                react_1.default.createElement(Text_1.default, { text: "Loading products...", size: "large", color: "text-light" })))) : (react_1.default.createElement(react_1.default.Fragment, null,
            currentProducts.length === 0 ? (react_1.default.createElement(Div_1.default, { funcss: "funui_products_empty flex-center padding-40" },
                react_1.default.createElement(Empty_1.default, { title: 'No products found', ctaIcon: react_1.default.createElement(pi_1.PiSpinnerGap, null), ctaText: 'Reload Page!', ctaOnClick: function () { return window.location.reload(); } }))) : (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(Div_1.default, { funcss: "funui_products_grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  ".concat(gridClassName) }, currentProducts.map(function (product) { return (react_1.default.createElement(ProductCard_1.default, { key: product.id, product: product, currency: currency, onClick: function () { return openProductModal(product); }, onAddToCart: function () { return addToCart(product); }, showBadges: true })); })),
                totalPages > 1 && (react_1.default.createElement(Flex_1.default, { width: '100%', justify: 'center', gap: 0.5 },
                    react_1.default.createElement(Button_1.default, { startIcon: react_1.default.createElement(pi_1.PiCaretLeft, null), onClick: function () { return goToPage(currentPage - 1); }, disabled: currentPage === 1, small: true, text: "Prev" }),
                    react_1.default.createElement(Div_1.default, { funcss: "pagination-numbers" },
                        Array.from({ length: Math.min(5, totalPages) }, function (_, i) {
                            var pageNum;
                            if (totalPages <= 5) {
                                pageNum = i + 1;
                            }
                            else if (currentPage <= 3) {
                                pageNum = i + 1;
                            }
                            else if (currentPage >= totalPages - 2) {
                                pageNum = totalPages - 4 + i;
                            }
                            else {
                                pageNum = currentPage - 2 + i;
                            }
                            return (react_1.default.createElement(Button_1.default, { key: pageNum, text: pageNum.toString(), onClick: function () { return goToPage(pageNum); }, bg: currentPage === pageNum ? 'primary' : undefined, color: currentPage === pageNum ? 'white' : 'text', small: true }));
                        }),
                        totalPages > 5 && currentPage < totalPages - 2 && (react_1.default.createElement(react_1.default.Fragment, null,
                            react_1.default.createElement(Text_1.default, { text: "...", color: "text-light" }),
                            react_1.default.createElement(Button_1.default, { text: totalPages.toString(), onClick: function () { return goToPage(totalPages); }, small: true })))),
                    react_1.default.createElement(Button_1.default, { endIcon: react_1.default.createElement(pi_1.PiCaretRight, null), onClick: function () { return goToPage(currentPage + 1); }, disabled: currentPage === totalPages, small: true, text: "Next" }))))),
            children)),
        showCart && (react_1.default.createElement(CartModal_1.default, { cart: cart, isOpen: isCartOpen, setIsOpen: setIsCartOpen, currency: currency, updateQuantity: updateQuantity, removeFromCart: removeFromCart, clearCart: clearCart, handleCheckout: handleCheckout, cartBadgeColor: cartBadgeColor, checkoutText: checkoutText, checkoutIcon: checkoutIcon, small: small, big: big, persistCart: persistCart })),
        selectedProduct && (react_1.default.createElement(ProductDetail_1.default, { product: selectedProduct, open: isProductModalOpen, setOpen: setIsProductModalOpen, currency: currency, onAddToCart: handleAddFromModal }))));
};
exports.default = Store;
