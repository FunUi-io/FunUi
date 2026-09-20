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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var pi_1 = require("react-icons/pi");
// Helper function to detect touch devices
var isTouchDevice = function () {
    return (('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0));
};
// Simple Circle component
var Circle = function (_a) {
    var bordered = _a.bordered, _b = _a.size, size = _b === void 0 ? 2.5 : _b, onClick = _a.onClick, children = _a.children;
    return (react_1.default.createElement("div", { onClick: onClick, style: {
            width: "".concat(size, "rem"),
            height: "".concat(size, "rem"),
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: bordered ? '1px solid var(--borderColor, #ccc)' : 'none',
            cursor: 'pointer',
            background: 'var(--background, white)',
            transition: 'all 0.2s ease'
        } }, children));
};
// Simple RowFlex component
var RowFlex = function (_a) {
    var _b = _a.gap, gap = _b === void 0 ? 0.5 : _b, _c = _a.justify, justify = _c === void 0 ? 'flex-start' : _c, children = _a.children;
    return (react_1.default.createElement("div", { style: {
            display: 'flex',
            gap: "".concat(gap, "rem"),
            justifyContent: justify
        } }, children));
};
var Carousel = function (_a) {
    var _b = _a.scrollNumber, scrollNumber = _b === void 0 ? 320 : _b, _c = _a.gap, gap = _c === void 0 ? 0.5 : _c, _d = _a.funcss, funcss = _d === void 0 ? '' : _d, _e = _a.showDashes, showDashes = _e === void 0 ? true : _e, _f = _a.allowVerticalOverflow, allowVerticalOverflow = _f === void 0 ? false : _f, _g = _a.itemPadding, itemPadding = _g === void 0 ? '' : _g, _h = _a.justify, justify = _h === void 0 ? '' : _h, children = _a.children, _j = _a.controlerSize, controlerSize = _j === void 0 ? 2.5 : _j, _k = _a.controlerIconSize, controlerIconSize = _k === void 0 ? 20 : _k, _l = _a.infiniteScroll, infiniteScroll = _l === void 0 ? false : _l, _m = _a.infiniteScrollSpeed, infiniteScrollSpeed = _m === void 0 ? 50 : _m, _o = _a.infiniteScrollDirection, infiniteScrollDirection = _o === void 0 ? 'left' : _o, _p = _a.overflowPadding, overflowPadding = _p === void 0 ? '' : _p, _q = _a.overflowCss, overflowCss = _q === void 0 ? '' : _q, rest = __rest(_a, ["scrollNumber", "gap", "funcss", "showDashes", "allowVerticalOverflow", "itemPadding", "justify", "children", "controlerSize", "controlerIconSize", "infiniteScroll", "infiniteScrollSpeed", "infiniteScrollDirection", "overflowPadding", "overflowCss"]);
    var scrollRef = (0, react_1.useRef)(null);
    var containerRef = (0, react_1.useRef)(null);
    var _r = (0, react_1.useState)('start'), scrollPosition = _r[0], setScrollPosition = _r[1];
    var _s = (0, react_1.useState)(false), isPhone = _s[0], setIsPhone = _s[1];
    var _t = (0, react_1.useState)(false), isScrollable = _t[0], setIsScrollable = _t[1];
    var _u = (0, react_1.useState)(infiniteScrollDirection === 'right' ? 'right' : 'left'), autoScrollDirection = _u[0], setAutoScrollDirection = _u[1];
    var _v = (0, react_1.useState)(false), isPaused = _v[0], setIsPaused = _v[1];
    var _w = (0, react_1.useState)(false), isReady = _w[0], setIsReady = _w[1];
    var animationFrameRef = (0, react_1.useRef)(null);
    var lastTimestampRef = (0, react_1.useRef)(0);
    var startDelayRef = (0, react_1.useRef)(false);
    var checkScrollable = function () {
        var container = scrollRef.current;
        if (container) {
            setIsScrollable(container.scrollWidth > container.clientWidth);
        }
    };
    (0, react_1.useEffect)(function () {
        checkScrollable();
        window.addEventListener('resize', checkScrollable);
        return function () { return window.removeEventListener('resize', checkScrollable); };
    }, [children]);
    // Delay start for smooth initialization
    (0, react_1.useEffect)(function () {
        if (infiniteScroll && isScrollable) {
            // Wait for layout to settle and then start
            var timer_1 = setTimeout(function () {
                setIsReady(true);
            }, 300);
            return function () { return clearTimeout(timer_1); };
        }
        else {
            setIsReady(false);
        }
    }, [infiniteScroll, isScrollable]);
    (0, react_1.useEffect)(function () {
        setIsPhone(isTouchDevice());
    }, []);
    var handleScroll = function () {
        var container = scrollRef.current;
        if (!container)
            return;
        var scrollLeft = container.scrollLeft, scrollWidth = container.scrollWidth, clientWidth = container.clientWidth;
        var maxScrollLeft = scrollWidth - clientWidth;
        if (scrollLeft === 0) {
            setScrollPosition('start');
        }
        else if (scrollLeft >= maxScrollLeft - 10) {
            setScrollPosition('end');
        }
        else {
            setScrollPosition('middle');
        }
    };
    var scroll = function (direction) {
        var container = scrollRef.current;
        if (!container)
            return;
        container.scrollBy({
            left: direction === 'left' ? -scrollNumber : scrollNumber,
            behavior: 'smooth',
        });
    };
    // Smooth auto-scroll animation using requestAnimationFrame
    var smoothAutoScroll = function (timestamp) {
        if (!infiniteScroll || !scrollRef.current || isPaused || !isScrollable || !isReady) {
            animationFrameRef.current = null;
            lastTimestampRef.current = 0;
            return;
        }
        var container = scrollRef.current;
        var scrollLeft = container.scrollLeft, scrollWidth = container.scrollWidth, clientWidth = container.clientWidth;
        var maxScrollLeft = scrollWidth - clientWidth;
        // Initialize timestamp on first frame
        if (lastTimestampRef.current === 0) {
            lastTimestampRef.current = timestamp;
            animationFrameRef.current = requestAnimationFrame(smoothAutoScroll);
            return;
        }
        // Calculate time delta for smooth animation
        var deltaTime = timestamp - lastTimestampRef.current;
        lastTimestampRef.current = timestamp;
        // Calculate scroll amount based on speed and time (pixels per second)
        // Cap deltaTime to prevent large jumps after tab switches
        var cappedDeltaTime = Math.min(deltaTime, 100);
        var scrollAmount = (infiniteScrollSpeed * cappedDeltaTime) / 1000;
        var newDirection = autoScrollDirection;
        // Handle alternate direction
        if (infiniteScrollDirection === 'alternate') {
            if (scrollLeft <= 0) {
                newDirection = 'right';
                setAutoScrollDirection('right');
            }
            else if (scrollLeft >= maxScrollLeft - 1) {
                newDirection = 'left';
                setAutoScrollDirection('left');
            }
        }
        // Perform the scroll
        if (newDirection === 'left') {
            container.scrollLeft -= scrollAmount;
            // Loop back for infinite scroll (non-alternate)
            if (scrollLeft <= 0 && infiniteScrollDirection !== 'alternate') {
                container.scrollLeft = maxScrollLeft;
            }
        }
        else {
            container.scrollLeft += scrollAmount;
            // Loop back for infinite scroll (non-alternate)
            if (scrollLeft >= maxScrollLeft - 1 && infiniteScrollDirection !== 'alternate') {
                container.scrollLeft = 0;
            }
        }
        animationFrameRef.current = requestAnimationFrame(smoothAutoScroll);
    };
    // Start/stop auto-scroll based on pause state
    (0, react_1.useEffect)(function () {
        if (infiniteScroll && !isPaused && isScrollable && isReady) {
            lastTimestampRef.current = 0;
            animationFrameRef.current = requestAnimationFrame(smoothAutoScroll);
        }
        else {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
                animationFrameRef.current = null;
            }
            lastTimestampRef.current = 0;
        }
        return function () {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [infiniteScroll, infiniteScrollSpeed, infiniteScrollDirection, isPaused, isScrollable, autoScrollDirection, isReady]);
    (0, react_1.useEffect)(function () {
        setAutoScrollDirection(infiniteScrollDirection === 'right' ? 'right' : 'left');
    }, [infiniteScrollDirection]);
    (0, react_1.useEffect)(function () {
        var container = scrollRef.current;
        if (container) {
            container.addEventListener('scroll', handleScroll);
            return function () { return container.removeEventListener('scroll', handleScroll); };
        }
    }, []);
    var cloneChildren = function () {
        var childrenArray = react_1.default.Children.toArray(children);
        if (childrenArray.length === 0)
            return children;
        var container = scrollRef.current;
        var clonesNeeded = container ? Math.ceil(container.clientWidth * 3 / (scrollNumber || 320)) : 3;
        var clonedItems = [];
        for (var i = 0; i < clonesNeeded; i++) {
            clonedItems.push.apply(clonedItems, childrenArray);
        }
        return (react_1.default.createElement(react_1.default.Fragment, null, clonedItems.map(function (child, index) { return (react_1.default.createElement("div", { key: index, className: "carousel-item", style: { flexShrink: 0 }, onMouseEnter: function () { return setIsPaused(true); }, onMouseLeave: function () { return setIsPaused(false); } },
            react_1.default.createElement("div", { className: "carousel-card" }, child))); })));
    };
    var handleTouchStart = function () {
        setIsPaused(true);
    };
    var handleTouchEnd = function () {
        setTimeout(function () {
            setIsPaused(false);
        }, 1000);
    };
    return (react_1.default.createElement("div", __assign({ ref: containerRef, className: "carousel-wrapper", onTouchStart: handleTouchStart, onTouchEnd: handleTouchEnd, style: { padding: (isScrollable && overflowPadding) ? overflowPadding : itemPadding } }, rest),
        react_1.default.createElement(react_1.default.Fragment, null,
            !isPhone && isScrollable && !infiniteScroll && (react_1.default.createElement("div", { className: 'carouselLeft' },
                react_1.default.createElement(Circle, { bordered: true, size: controlerSize, onClick: function () { return scroll('left'); } },
                    react_1.default.createElement(pi_1.PiCaretLeft, { className: 'text-primary', size: controlerIconSize })))),
            react_1.default.createElement("div", { ref: scrollRef, className: "carousel-container scrollbar-hide w-full ".concat(funcss, " ").concat(isScrollable ? overflowCss : ''), style: {
                    width: '100%',
                    gap: gap + 'rem',
                    overflowX: 'auto',
                    overflowY: 'visible',
                    display: 'flex',
                    justifyContent: justify ? justify : (isScrollable || isPhone) ? 'flex-start' : 'center',
                    scrollSnapType: infiniteScroll ? 'none' : 'x mandatory',
                    scrollBehavior: 'smooth',
                    cursor: infiniteScroll ? 'grab' : 'default'
                }, onScroll: handleScroll }, infiniteScroll ? cloneChildren() : (react_1.default.Children.map(children, function (child, index) { return (react_1.default.createElement("div", { className: "carousel-item", style: { flexShrink: 0 }, onMouseEnter: function () { return !infiniteScroll && setIsPaused(true); }, onMouseLeave: function () { return !infiniteScroll && setIsPaused(false); } },
                react_1.default.createElement("div", { className: "carousel-card" }, child))); }))),
            !isPhone && isScrollable && !infiniteScroll && (react_1.default.createElement("div", { className: 'carouselRight' },
                react_1.default.createElement(Circle, { bordered: true, size: controlerSize, onClick: function () { return scroll('right'); } },
                    react_1.default.createElement(pi_1.PiCaretRight, { className: 'text-primary', size: controlerIconSize }))))),
        (showDashes && isScrollable && !infiniteScroll) && (react_1.default.createElement("div", { className: "center padding-top-10" },
            react_1.default.createElement(RowFlex, { gap: 0.5, justify: "center" }, ['start', 'middle', 'end'].map(function (pos) { return (react_1.default.createElement("div", { className: 'pointer', key: pos, onClick: function () {
                    var _a, _b;
                    if (pos === 'start') {
                        scroll('left');
                    }
                    else if (pos === 'middle') {
                        (_a = scrollRef.current) === null || _a === void 0 ? void 0 : _a.scrollTo({
                            left: ((_b = scrollRef.current) === null || _b === void 0 ? void 0 : _b.scrollWidth) / 2,
                            behavior: 'smooth',
                        });
                    }
                    else if (pos === 'end') {
                        scroll('right');
                    }
                }, style: {
                    width: '10px',
                    height: '10px',
                    background: scrollPosition === pos ? 'var(--primary, #007bff)' : 'var(--borderColor, #ccc)',
                    borderRadius: '50%',
                    transform: scrollPosition === pos ? 'scale(1.3)' : 'scale(0.9)',
                    transition: 'transform 0.3s ease, background 0.3s ease',
                } })); }))))));
};
exports.default = Carousel;
