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
var ProductCard_1 = __importDefault(require("./ProductCard"));
var CartModal_1 = __importDefault(require("./CartModal"));
var ProductDetail_1 = __importDefault(require("./ProductDetail"));
var theme_1 = require("../theme/theme");
var componentUtils_1 = require("../../utils/componentUtils");
var Empty_1 = __importDefault(require("../empty/Empty"));
var Modal_1 = __importDefault(require("../modal/Modal"));
var Accordion_1 = __importDefault(require("../accordion/Accordion"));
var View_1 = __importDefault(require("../view/View"));
var getCssVariable_1 = require("../../utils/getCssVariable");
var ProductLoader_1 = __importDefault(require("./ProductLoader"));
var Store = function (localProps) {
    // Use component configuration with variant
    var mergeWithLocal = (0, componentUtils_1.useComponentConfiguration)('Store', localProps.variant).mergeWithLocal;
    var final = mergeWithLocal(localProps).props;
    // Destructure props from final merged configuration
    var _a = final.products, products = _a === void 0 ? [] : _a, bucket = final.bucket, _b = final.bucketPage, bucketPage = _b === void 0 ? 1 : _b, _c = final.bucketSize, bucketSize = _c === void 0 ? 50 : _c, _d = final.title, title = _d === void 0 ? 'Products' : _d, _e = final.heroTitle, heroTitle = _e === void 0 ? 'Our Products' : _e, _f = final.heroDescription, heroDescription = _f === void 0 ? 'Discover our amazing collection of products' : _f, _g = final.heroBackgroundImage, heroBackgroundImage = _g === void 0 ? '' : _g, _h = final.overlayColor, overlayColor = _h === void 0 ? 'primary' : _h, _j = final.overlayOpacity, overlayOpacity = _j === void 0 ? 0.6 : _j, _k = final.overlayGradient, overlayGradient = _k === void 0 ? false : _k, _l = final.gradientDirection, gradientDirection = _l === void 0 ? 'to-bottom' : _l, _m = final.invertGradient, invertGradient = _m === void 0 ? false : _m, _o = final.showHeader, showHeader = _o === void 0 ? true : _o, _p = final.showSearch, showSearch = _p === void 0 ? true : _p, _q = final.showFilters, showFilters = _q === void 0 ? true : _q, _r = final.showCart, showCart = _r === void 0 ? true : _r, _s = final.showHero, showHero = _s === void 0 ? true : _s, _t = final.titleSize, titleSize = _t === void 0 ? 'big' : _t, _u = final.titleColor, titleColor = _u === void 0 ? 'white' : _u, _v = final.descriptionSize, descriptionSize = _v === void 0 ? 'lg' : _v, _w = final.descriptionColor, descriptionColor = _w === void 0 ? 'white' : _w, _x = final.descriptionOpacity, descriptionOpacity = _x === void 0 ? 0.8 : _x, _y = final.cartBadgeColor, cartBadgeColor = _y === void 0 ? 'error' : _y, cartBadgeText = final.cartBadgeText, _z = final.checkoutText, checkoutText = _z === void 0 ? 'Checkout' : _z, checkoutIcon = final.checkoutIcon, _0 = final.currency, currency = _0 === void 0 ? '$' : _0, _1 = final.persistCart, persistCart = _1 === void 0 ? true : _1, _2 = final.storageKey, storageKey = _2 === void 0 ? 'funui_cart' : _2, whatsappOrderNumber = final.whatsappOrderNumber, otherInfo = final.otherInfo, onAddToCart = final.onAddToCart, onRemoveFromCart = final.onRemoveFromCart, onUpdateQuantity = final.onUpdateQuantity, onCheckout = final.onCheckout, onProductClick = final.onProductClick, _3 = final.className, className = _3 === void 0 ? '' : _3, _4 = final.gridClassName, gridClassName = _4 === void 0 ? '' : _4, children = final.children, id = final.id, _5 = final.heroAlign, heroAlign = _5 === void 0 ? 'center' : _5, _6 = final.funcss, funcss = _6 === void 0 ? '' : _6, _7 = final.heroHeight, heroHeight = _7 === void 0 ? '400px' : _7, _8 = final.fullWidth, fullWidth = _8 === void 0 ? false : _8, _9 = final.itemsPerPage, itemsPerPage = _9 === void 0 ? 10 : _9;
    // Mobile state
    var _10 = (0, react_1.useState)(false), isMobile = _10[0], setIsMobile = _10[1];
    var _11 = (0, react_1.useState)(false), showMobileFilters = _11[0], setShowMobileFilters = _11[1];
    // Check screen size
    (0, react_1.useEffect)(function () {
        var checkMobile = function () {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return function () { return window.removeEventListener('resize', checkMobile); };
    }, []);
    // Parse otherInfo
    var parsedOtherInfo = (0, react_1.useMemo)(function () {
        if (!otherInfo)
            return [];
        try {
            if (typeof otherInfo === 'string') {
                return JSON.parse(otherInfo);
            }
            return otherInfo;
        }
        catch (error) {
            console.error('Error parsing otherInfo:', error);
            return [];
        }
    }, [otherInfo]);
    // Checkout state
    var _12 = (0, react_1.useState)(false), showCheckoutModal = _12[0], setShowCheckoutModal = _12[1];
    var _13 = (0, react_1.useState)({}), userInfoData = _13[0], setUserInfoData = _13[1];
    var _14 = (0, react_1.useState)(false), checkoutLoading = _14[0], setCheckoutLoading = _14[1];
    // Loading state - track bucket loading and initial load
    var _15 = (0, react_1.useState)(true), isInitialLoading = _15[0], setIsInitialLoading = _15[1];
    // Use bucket data if bucket prop is provided
    var _16 = (0, theme_1.usePaginatedRecords)(bucket || '', bucketPage, bucketSize), bucketRecords = _16.records, bucketLoading = _16.loading;
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
            if (product.variants && product.variants.length > 0) {
                var discountedVariants = product.variants.map(function (variant) {
                    var _a = calculateDiscountedPrice(variant.price, variant.discount), finalPrice = _a.finalPrice, originalPrice = _a.originalPrice;
                    return __assign(__assign({}, variant), { price: finalPrice, comparePrice: originalPrice });
                });
                return __assign(__assign({}, product), { variants: discountedVariants, price: ((_a = discountedVariants[0]) === null || _a === void 0 ? void 0 : _a.price) || product.price, comparePrice: ((_b = discountedVariants[0]) === null || _b === void 0 ? void 0 : _b.comparePrice) || product.comparePrice });
            }
            else {
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
                variants: values.variants ? values.variants.map(function (variant) { return (__assign(__assign({}, variant), { discount: variant.discount || discount })); }) : [],
                manufacturer: values.manufacturer || '',
                countryOfOrigin: values.countryOfOrigin || '',
                warranty: values.warranty || '',
                isFeatured: values.isFeatured || '',
                discount: discount ? parseFloat(discount) : undefined
            };
        });
        return applyDiscounts(mappedProducts);
    }, [bucketRecords, bucket, currency, applyDiscounts]);
    // Parse and process products
    var parsedProducts = react_1.default.useMemo(function () {
        var productList;
        if (bucket && bucketProducts) {
            console.log("Using ".concat(bucketProducts.length, " products from bucket: ").concat(bucket));
            productList = bucketProducts.map(function (product, index) { return (__assign(__assign({}, product), { id: product.id || "bucket_product_".concat(index, "_").concat(Date.now()) })); });
        }
        else {
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
            productList = applyDiscounts(productList);
        }
        return productList.map(function (product, index) { return (__assign(__assign({}, product), { id: product.id || "product_".concat(index, "_").concat(Date.now(), "_").concat(Math.random().toString(36).substr(2, 9)) })); });
    }, [products, bucket, bucketProducts, applyDiscounts]);
    // Handle loading state separately
    (0, react_1.useEffect)(function () {
        if (bucket) {
            if (!bucketLoading && bucketProducts !== undefined) {
                var timer_1 = setTimeout(function () {
                    setIsInitialLoading(false);
                }, 300);
                return function () { return clearTimeout(timer_1); };
            }
        }
        else {
            setIsInitialLoading(false);
        }
    }, [bucket, bucketLoading, bucketProducts]);
    // Combined loading state
    var showLoading = isInitialLoading || (bucket && bucketLoading);
    // Initialize cart from localStorage with discount handling
    var _17 = (0, react_1.useState)(function () {
        if (!persistCart)
            return [];
        try {
            var stored = localStorage.getItem(storageKey);
            if (stored) {
                var parsed = JSON.parse(stored);
                if (parsed.items && Array.isArray(parsed.items)) {
                    return parsed.items.map(function (item) { return (__assign(__assign({}, item), { product: __assign(__assign({}, item.product), { id: item.product.id || "restored_".concat(Date.now()) }), originalPrice: item.originalPrice || item.product.comparePrice || item.product.price })); });
                }
            }
        }
        catch (error) {
            console.error('Error loading cart from localStorage:', error);
        }
        return [];
    }), cart = _17[0], setCart = _17[1];
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
    var _18 = (0, react_1.useState)(false), isCartOpen = _18[0], setIsCartOpen = _18[1];
    var _19 = (0, react_1.useState)(false), isProductModalOpen = _19[0], setIsProductModalOpen = _19[1];
    var _20 = (0, react_1.useState)(null), selectedProduct = _20[0], setSelectedProduct = _20[1];
    var _21 = (0, react_1.useState)(''), searchQuery = _21[0], setSearchQuery = _21[1];
    var _22 = (0, react_1.useState)('all'), selectedCategory = _22[0], setSelectedCategory = _22[1];
    var _23 = (0, react_1.useState)('all'), selectedColor = _23[0], setSelectedColor = _23[1];
    var _24 = (0, react_1.useState)('all'), selectedBrand = _24[0], setSelectedBrand = _24[1];
    var _25 = (0, react_1.useState)(1), currentPage = _25[0], setCurrentPage = _25[1];
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
    // Get brands based on selected category
    var brands = (0, react_1.useMemo)(function () {
        if (showLoading)
            return ['all'];
        var filteredProducts = parsedProducts;
        // If a category is selected, filter by it
        if (selectedCategory !== 'all') {
            filteredProducts = parsedProducts.filter(function (p) { return p.category === selectedCategory; });
        }
        var allBrands = filteredProducts
            .map(function (p) { return p.brand; })
            .filter(function (brand) { return typeof brand === 'string' && brand.trim() !== ''; });
        return __spreadArray(['all'], Array.from(new Set(allBrands)), true);
    }, [parsedProducts, selectedCategory, showLoading]);
    // Get colors based on selected category and brand
    var colors = (0, react_1.useMemo)(function () {
        if (showLoading)
            return ['all'];
        var filteredProducts = parsedProducts;
        // If a category is selected, filter by it
        if (selectedCategory !== 'all') {
            filteredProducts = filteredProducts.filter(function (p) { return p.category === selectedCategory; });
        }
        // If a brand is selected, filter by it
        if (selectedBrand !== 'all') {
            filteredProducts = filteredProducts.filter(function (p) { return p.brand === selectedBrand; });
        }
        var allColors = [];
        filteredProducts.forEach(function (product) {
            var _a;
            (_a = product.colors) === null || _a === void 0 ? void 0 : _a.forEach(function (color) {
                if (!allColors.includes(color.name)) {
                    allColors.push(color.name);
                }
            });
        });
        return __spreadArray(['all'], allColors, true);
    }, [parsedProducts, selectedCategory, selectedBrand, showLoading]);
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
    // Reset dependent filters when parent filter changes
    (0, react_1.useEffect)(function () {
        if (selectedCategory === 'all') {
            setSelectedBrand('all');
            setSelectedColor('all');
        }
    }, [selectedCategory]);
    (0, react_1.useEffect)(function () {
        if (selectedBrand === 'all') {
            setSelectedColor('all');
        }
    }, [selectedBrand]);
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
    // Create WhatsApp message
    var createWhatsAppMessage = (0, react_1.useCallback)(function (cartItems, userInfo) {
        if (userInfo === void 0) { userInfo = {}; }
        var lines = [];
        // Order summary header
        lines.push('🛒 *ORDER SUMMARY*');
        lines.push('');
        // List products
        cartItems.forEach(function (item, index) {
            var _a;
            var productName = item.product.name;
            var variantInfo = item.variant ? " (".concat(item.variant.name, ")") : '';
            var options = [];
            if (item.selectedColor)
                options.push("Color: ".concat(item.selectedColor));
            if (item.selectedSize)
                options.push("Size: ".concat(item.selectedSize));
            var optionsText = options.length > 0 ? " [".concat(options.join(', '), "]") : '';
            var price = ((_a = item.variant) === null || _a === void 0 ? void 0 : _a.price) || item.product.price;
            var total = price * item.quantity;
            lines.push("".concat(index + 1, ". ").concat(productName).concat(variantInfo).concat(optionsText));
            lines.push("   Quantity: ".concat(item.quantity));
            lines.push("   Price: ".concat(currency).concat(price.toFixed(2), " each"));
            lines.push("   Total: ".concat(currency).concat(total.toFixed(2)));
            lines.push('');
        });
        // Cart totals
        var subtotal = cartItems.reduce(function (sum, item) {
            var _a;
            var price = ((_a = item.variant) === null || _a === void 0 ? void 0 : _a.price) || item.product.price;
            return sum + (price * item.quantity);
        }, 0);
        lines.push('---');
        lines.push("*Subtotal:* ".concat(currency).concat(subtotal.toFixed(2)));
        lines.push("*Total Items:* ".concat(cartItems.reduce(function (sum, item) { return sum + item.quantity; }, 0)));
        lines.push('');
        // User information
        if (Object.keys(userInfo).length > 0) {
            lines.push('👤 *CUSTOMER INFORMATION*');
            lines.push('');
            Object.entries(userInfo).forEach(function (_a) {
                var key = _a[0], value = _a[1];
                if (value.trim()) {
                    var label = key.charAt(0).toUpperCase() + key.slice(1);
                    lines.push("*".concat(label, ":* ").concat(value));
                }
            });
            lines.push('');
        }
        // Footer
        lines.push('Thank you for your order!');
        return encodeURIComponent(lines.join('\n'));
    }, [currency]);
    // Handle checkout
    var handleCheckout = (0, react_1.useCallback)(function () {
        if (cart.length === 0)
            return;
        // If there's otherInfo to collect, show modal
        if (parsedOtherInfo.length > 0) {
            setShowCheckoutModal(true);
        }
        else {
            // No additional info needed, proceed directly
            proceedToWhatsAppOrCallback({});
        }
    }, [cart, parsedOtherInfo]);
    // Proceed with checkout (either to WhatsApp or callback)
    var proceedToWhatsAppOrCallback = (0, react_1.useCallback)(function (userInfo) {
        var checkoutData = {
            cartItems: cart,
            totalAmount: subtotal,
            userInfo: userInfo
        };
        // Call the onCheckout callback if provided
        if (onCheckout) {
            onCheckout(checkoutData);
        }
        // If WhatsApp number is provided, create WhatsApp message
        if (whatsappOrderNumber) {
            var message = createWhatsAppMessage(cart, userInfo);
            var whatsappUrl = "https://wa.me/".concat(whatsappOrderNumber, "?text=").concat(message);
            window.open(whatsappUrl, '_blank');
        }
        // Clear cart and close modals
        if (persistCart) {
            clearCart();
        }
        setShowCheckoutModal(false);
        setIsCartOpen(false);
        setUserInfoData({});
    }, [cart, subtotal, onCheckout, whatsappOrderNumber, createWhatsAppMessage, persistCart, clearCart]);
    // Handle user info form submission
    var handleUserInfoSubmit = (0, react_1.useCallback)(function () {
        setCheckoutLoading(true);
        // Validate required fields
        var missingFields = parsedOtherInfo
            .filter(function (field) { var _a; return field.required && !((_a = userInfoData[field.infoName]) === null || _a === void 0 ? void 0 : _a.trim()); })
            .map(function (field) { return field.label || field.infoName; });
        if (missingFields.length > 0) {
            alert("Please fill in the following required fields: ".concat(missingFields.join(', ')));
            setCheckoutLoading(false);
            return;
        }
        setTimeout(function () {
            proceedToWhatsAppOrCallback(userInfoData);
            setCheckoutLoading(false);
        }, 500);
    }, [parsedOtherInfo, userInfoData, proceedToWhatsAppOrCallback]);
    // Update user info
    var handleUserInfoChange = (0, react_1.useCallback)(function (fieldName, value) {
        setUserInfoData(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[fieldName] = value, _a)));
        });
    }, []);
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
    // Helper function to get color with opacity
    var getColorWithOpacity = (0, react_1.useCallback)(function (color, opacity) {
        // Try to get CSS variable value first
        var cssVariableValue = (0, getCssVariable_1.getCssVariableValue)(color);
        // If getCssVariableValue returns a different value than input, 
        // it means the color was a CSS variable (like "primary", "dark", etc.)
        var colorValue = cssVariableValue && cssVariableValue !== color ? cssVariableValue : color;
        // Check if color is already in rgba format
        var rgbaMatch = colorValue.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/);
        if (rgbaMatch) {
            var r = rgbaMatch[1], g = rgbaMatch[2], b = rgbaMatch[3];
            return "rgba(".concat(r, ", ").concat(g, ", ").concat(b, ", ").concat(opacity, ")");
        }
        // Check if color is in rgb format
        var rgbMatch = colorValue.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
        if (rgbMatch) {
            var r = rgbMatch[1], g = rgbMatch[2], b = rgbMatch[3];
            return "rgba(".concat(r, ", ").concat(g, ", ").concat(b, ", ").concat(opacity, ")");
        }
        // Check if color is hex format
        if (colorValue.startsWith('#')) {
            var hex = colorValue.replace('#', '');
            var r = void 0, g = void 0, b = void 0;
            if (hex.length === 3) {
                r = parseInt(hex[0] + hex[0], 16);
                g = parseInt(hex[1] + hex[1], 16);
                b = parseInt(hex[2] + hex[2], 16);
            }
            else if (hex.length === 6) {
                r = parseInt(hex.substring(0, 2), 16);
                g = parseInt(hex.substring(2, 4), 16);
                b = parseInt(hex.substring(4, 6), 16);
            }
            if (r !== undefined && g !== undefined && b !== undefined) {
                return "rgba(".concat(r, ", ").concat(g, ", ").concat(b, ", ").concat(opacity, ")");
            }
        }
        // For named colors that don't match patterns above, return as-is
        // CSS will handle the opacity via the opacity property
        return colorValue;
    }, []);
    // Create overlay style based on gradient settings
    // Create overlay style based on gradient settings
    var getOverlayStyle = (0, react_1.useCallback)(function () {
        // Get the actual color value (resolve CSS variables)
        var cssVariableValue = (0, getCssVariable_1.getCssVariableValue)(overlayColor);
        var resolvedColor = cssVariableValue && cssVariableValue !== overlayColor
            ? cssVariableValue
            : overlayColor;
        if (!overlayGradient) {
            // Solid overlay
            return {
                backgroundColor: resolvedColor,
                opacity: overlayOpacity,
            };
        }
        // For gradient overlay, create color with opacity
        var colorWithOpacity = getColorWithOpacity(resolvedColor, overlayOpacity);
        // Build gradient direction
        var direction = gradientDirection.replace('to-', 'to ');
        if (invertGradient) {
            // From transparent to color
            return {
                background: "linear-gradient(".concat(direction, ", transparent 0%, ").concat(colorWithOpacity, " 100%)"),
            };
        }
        else {
            // From color to transparent
            return {
                background: "linear-gradient(".concat(direction, ", ").concat(colorWithOpacity, " 0%, transparent 100%)"),
            };
        }
    }, [overlayGradient, gradientDirection, invertGradient, overlayColor, overlayOpacity, getColorWithOpacity]);
    // Create accordion items for filters
    var filterAccordionItems = (0, react_1.useMemo)(function () { return [
        {
            icon: react_1.default.createElement(pi_1.PiList, { className: 'text-primary', size: 20 }),
            title: 'Categories',
            content: (react_1.default.createElement(Div_1.default, { funcss: "filter-options" }, categories.map(function (cat) { return (react_1.default.createElement("div", { key: cat, className: "filter-option ".concat(selectedCategory === cat ? 'primary100 text-primary' : ''), onClick: function () {
                    setSelectedCategory(cat);
                    if (cat === 'all') {
                        setSelectedBrand('all');
                        setSelectedColor('all');
                    }
                } }, cat === 'all' ? 'All Categories' : cat)); }))),
        },
        {
            icon: react_1.default.createElement(pi_1.PiUserCircle, { className: 'text-primary', size: 20 }),
            title: 'Brands',
            content: (react_1.default.createElement(Div_1.default, { funcss: "filter-options" }, brands.map(function (brand) { return (react_1.default.createElement("div", { key: brand, className: "filter-option ".concat(selectedBrand === brand ? 'primary100 text-primary' : ''), onClick: function () {
                    setSelectedBrand(brand);
                    if (brand === 'all') {
                        setSelectedColor('all');
                    }
                }, style: {
                    opacity: selectedCategory === 'all' && brand !== 'all' ? 0.5 : 1,
                    pointerEvents: selectedCategory === 'all' && brand !== 'all' ? 'none' : 'auto'
                } },
                brand === 'all' ? 'All Brands' : brand,
                selectedCategory === 'all' && brand !== 'all' && (react_1.default.createElement("small", { className: "text-muted", style: { fontSize: '0.7rem', display: 'block' } }, "(Select category first)")))); }))),
        },
        {
            icon: react_1.default.createElement(pi_1.PiHandTap, { className: 'text-primary', size: 20 }),
            title: 'Colors',
            content: (react_1.default.createElement(Div_1.default, { funcss: "filter-options" }, colors.map(function (color) { return (react_1.default.createElement("div", { key: color, className: "filter-option ".concat(selectedColor === color ? 'primary100 text-primary' : ''), onClick: function () { return setSelectedColor(color); }, style: {
                    opacity: (selectedCategory === 'all' || selectedBrand === 'all') && color !== 'all' ? 0.5 : 1,
                    pointerEvents: (selectedCategory === 'all' || selectedBrand === 'all') && color !== 'all' ? 'none' : 'auto'
                } },
                color === 'all' ? 'All Colors' : color,
                (selectedCategory === 'all' || selectedBrand === 'all') && color !== 'all' && (react_1.default.createElement("small", { className: "text-muted", style: { fontSize: '0.7rem', display: 'block' } }, "(Select category & brand first)")))); }))),
        },
    ]; }, [categories, brands, colors, selectedCategory, selectedBrand, selectedColor]);
    // Clear all filters
    var clearFilters = (0, react_1.useCallback)(function () {
        setSelectedCategory('all');
        setSelectedBrand('all');
        setSelectedColor('all');
        setSearchQuery('');
    }, []);
    return (react_1.default.createElement(Div_1.default, { funcss: "".concat(className, " ").concat(funcss), id: id },
        showHero && (react_1.default.createElement(Div_1.default, { funcss: "store-hero-section", customStyle: {
                backgroundImage: heroBackgroundImage ? "url(".concat(heroBackgroundImage, ")") : 'none',
                backgroundColor: heroBackgroundImage ? undefined : 'var(--lighter)',
                height: heroHeight,
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
            } },
            react_1.default.createElement("div", { className: "hero-overlay fit", style: __assign({ position: 'absolute', top: 0, left: 0 }, getOverlayStyle()) }),
            react_1.default.createElement("div", { className: "hero-content text-".concat(heroAlign || 'center', " relative z-10"), style: {
                    padding: '2rem',
                    width: '100%',
                } },
                react_1.default.createElement(Text_1.default, { text: heroTitle || title, size: titleSize, color: titleColor, block: true, bold: true }),
                react_1.default.createElement(Text_1.default, { text: heroDescription, size: descriptionSize, color: descriptionColor, opacity: descriptionOpacity })))),
        react_1.default.createElement(View_1.default, { funcss: "pt-10  pl-5 pr-5 center", fit: true, style: {
                maxWidth: "1500px"
            } },
            react_1.default.createElement(Flex_1.default, { width: '100%', justify: 'center', gap: 2 },
                showFilters && !isMobile && (react_1.default.createElement(View_1.default, { funcss: "w-200" },
                    react_1.default.createElement(RowFlex_1.default, { justify: "space-between", funcss: 'bb mb', alignItems: "center" },
                        react_1.default.createElement(Text_1.default, { text: "Filters", size: "h5" }),
                        react_1.default.createElement(Button_1.default, { text: "Clear", onClick: clearFilters, small: true, bg: "lighter", startIcon: react_1.default.createElement(pi_1.PiX, null) })),
                    react_1.default.createElement(Accordion_1.default, { border: false, funcss: 'bg borderless', items: filterAccordionItems, allowMultiple: true, titleClass: "text-sm", contentClass: "text-sm" }))),
                react_1.default.createElement("div", { className: 'col fit' },
                    showFilters && isMobile && (react_1.default.createElement(Div_1.default, { funcss: "mobile-filters-button mb-4" },
                        react_1.default.createElement(Button_1.default, { startIcon: react_1.default.createElement(pi_1.PiFunnel, null), text: "Filters", onClick: function () { return setShowMobileFilters(true); }, bg: "light", color: "text", raised: true, funcss: "w-full" }))),
                    react_1.default.createElement(Flex_1.default, { gap: 1, width: '100%', funcss: 'mb-4', justify: 'space-between' },
                        showSearch && (react_1.default.createElement("div", { className: "w-400" },
                            react_1.default.createElement(Input_1.default, { label: "Search products...", value: searchQuery, onChange: function (e) { return setSearchQuery(e.target.value); }, startIcon: react_1.default.createElement(pi_1.PiMagnifyingGlass, null), borderless: true }))),
                        showCart && (react_1.default.createElement("button", { onClick: function () { return setIsCartOpen(true); }, className: "cart-icon relative", type: "button", "aria-label": "Shopping cart (".concat(totalItems, " items)"), disabled: showLoading },
                            react_1.default.createElement(sl_1.SlHandbag, { size: 30 }),
                            totalItems > 0 && (react_1.default.createElement("div", { className: "cart-badge error", style: { backgroundColor: cartBadgeColor } }, cartBadgeText || (totalItems > 99 ? '99+' : totalItems)))))),
                    showLoading ? (react_1.default.createElement(Div_1.default, { funcss: "\r\n              funui_products_grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4\r\n              " }, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(function (index) { return (react_1.default.createElement("div", { key: index },
                        react_1.default.createElement(ProductLoader_1.default, null))); }))) : (react_1.default.createElement(react_1.default.Fragment, null,
                        currentProducts.length === 0 ? (react_1.default.createElement(Div_1.default, { funcss: "" },
                            react_1.default.createElement(Empty_1.default, { title: 'No products found', ctaIcon: react_1.default.createElement(pi_1.PiSpinnerGap, null), ctaText: 'Reset Filters', ctaOnClick: clearFilters }))) : (react_1.default.createElement(react_1.default.Fragment, null,
                            react_1.default.createElement(Div_1.default, { margin: '2rem 0', funcss: "funui_products_grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ".concat(gridClassName) }, currentProducts.map(function (product) { return (react_1.default.createElement(ProductCard_1.default, { key: product.id, product: product, currency: currency, onClick: function () { return openProductModal(product); }, onAddToCart: function () { return addToCart(product); }, showBadges: true })); })),
                            totalPages > 1 && (react_1.default.createElement(Flex_1.default, { width: '100%', justify: 'center', gap: 0.5, funcss: "mt-8" },
                                react_1.default.createElement(Button_1.default, { startIcon: react_1.default.createElement(pi_1.PiCaretLeft, null), onClick: function () { return goToPage(currentPage - 1); }, disabled: currentPage === 1, text: "Prev", small: true }),
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
                                react_1.default.createElement(Button_1.default, { endIcon: react_1.default.createElement(pi_1.PiCaretRight, null), onClick: function () { return goToPage(currentPage + 1); }, disabled: currentPage === totalPages, text: "Next", small: true }))))),
                        children))))),
        showFilters && isMobile && (react_1.default.createElement(Modal_1.default, { animation: "slideUp", open: showMobileFilters, setOpen: setShowMobileFilters, title: react_1.default.createElement(RowFlex_1.default, { justify: "space-between", alignItems: "center" },
                react_1.default.createElement(Text_1.default, { text: "Filters", size: "h5" }),
                react_1.default.createElement(Button_1.default, { text: "Clear All", onClick: clearFilters, small: true, bg: "transparent", color: "text-light" })), body: react_1.default.createElement(Div_1.default, { funcss: "p-4" },
                react_1.default.createElement(Accordion_1.default, { items: filterAccordionItems, allowMultiple: true, titleClass: "text-sm", contentClass: "text-xs", activeClass: "", funcss: 'card' })), footer: react_1.default.createElement(Div_1.default, { funcss: "p-4" },
                react_1.default.createElement(Button_1.default, { text: "Apply Filters", onClick: function () { return setShowMobileFilters(false); }, bg: "primary", color: "white", raised: true, funcss: "w-full" })) })),
        showCart && (react_1.default.createElement(CartModal_1.default, { cart: cart, isOpen: isCartOpen, setIsOpen: setIsCartOpen, currency: currency, updateQuantity: updateQuantity, removeFromCart: removeFromCart, clearCart: clearCart, handleCheckout: handleCheckout, cartBadgeColor: cartBadgeColor, checkoutText: checkoutText, checkoutIcon: checkoutIcon, persistCart: persistCart })),
        showCheckoutModal && (react_1.default.createElement(Modal_1.default, { animation: "fadeIn", open: showCheckoutModal, setOpen: setShowCheckoutModal, maxWidth: '550px', title: react_1.default.createElement(react_1.default.Fragment, null, whatsappOrderNumber ? (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(Text_1.default, { text: "Complete Your Order", size: "xl", block: true }),
                react_1.default.createElement(Text_1.default, { text: "Please provide the following information to complete your order:", size: "sm" }))) : (react_1.default.createElement(Text_1.default, { text: "Order Information", size: "xkl" }))), body: react_1.default.createElement(Div_1.default, { funcss: "p-8" }, parsedOtherInfo.map(function (field, index) { return (react_1.default.createElement(Div_1.default, { key: index, funcss: "section" },
                react_1.default.createElement(Input_1.default, { label: "".concat(field.label || field.infoName).concat(field.required ? ' *' : ''), type: field.type === 'textarea' ? 'text' : field.type, multiline: field.type === 'textarea', rows: field.type === 'textarea' ? 3 : undefined, value: userInfoData[field.infoName] || '', onChange: function (e) { return handleUserInfoChange(field.infoName, e.target.value); }, bordered: true, fullWidth: true }))); })), footer: react_1.default.createElement(Div_1.default, { funcss: "" },
                react_1.default.createElement(RowFlex_1.default, { justify: "center", alignItems: "center" },
                    react_1.default.createElement(Button_1.default, { prefix: react_1.default.createElement(pi_1.PiX, null), text: "Cancel", onClick: function () {
                            setShowCheckoutModal(false);
                            setUserInfoData({});
                        }, bg: "error-light", color: "error" }),
                    react_1.default.createElement(Button_1.default, { text: whatsappOrderNumber ? "Send via WhatsApp" : "Complete Order", bg: "primary", raised: true, onClick: handleUserInfoSubmit, funcss: "padding-x-30", startIcon: whatsappOrderNumber ? react_1.default.createElement(pi_1.PiWhatsappLogo, null) : checkoutIcon, isLoading: checkoutLoading, disabled: checkoutLoading }))) })),
        selectedProduct && (react_1.default.createElement(ProductDetail_1.default, { product: selectedProduct, open: isProductModalOpen, setOpen: setIsProductModalOpen, currency: currency, onAddToCart: handleAddFromModal }))));
};
exports.default = Store;
