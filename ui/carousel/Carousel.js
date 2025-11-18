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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var pi_1 = require("react-icons/pi");
var Circle_1 = __importDefault(require("../specials/Circle"));
var RowFlex_1 = __importDefault(require("../specials/RowFlex"));
var Functions_1 = require("../../utils/Functions");
var Carousel = function (_a) {
    var _b = _a.scrollNumber, scrollNumber = _b === void 0 ? 320 : _b, _c = _a.gap, gap = _c === void 0 ? 0.5 : _c, _d = _a.funcss, funcss = _d === void 0 ? '' : _d, _e = _a.showDashes, showDashes = _e === void 0 ? true : _e, _f = _a.allowVerticalOverflow, allowVerticalOverflow = _f === void 0 ? false : _f, _g = _a.itemPadding, itemPadding = _g === void 0 ? '0rem' : _g, children = _a.children, _h = _a.controlerSize, controlerSize = _h === void 0 ? 2.5 : _h, _j = _a.controlerIconSize, controlerIconSize = _j === void 0 ? 20 : _j, rest = __rest(_a, ["scrollNumber", "gap", "funcss", "showDashes", "allowVerticalOverflow", "itemPadding", "children", "controlerSize", "controlerIconSize"]);
    var scrollRef = (0, react_1.useRef)(null);
    var _k = (0, react_1.useState)('start'), scrollPosition = _k[0], setScrollPosition = _k[1];
    var _l = (0, react_1.useState)(false), isPhone = _l[0], setIsPhone = _l[1];
    var _m = (0, react_1.useState)(false), isScrollable = _m[0], setIsScrollable = _m[1];
    var checkScrollable = function () {
        var container = scrollRef.current;
        if (container) {
            setIsScrollable(container.scrollWidth > container.clientWidth);
        }
    };
    (0, react_1.useEffect)(function () {
        checkScrollable();
        window.addEventListener('resize', checkScrollable); // Also listen to window resize
        return function () { return window.removeEventListener('resize', checkScrollable); };
    }, [children]);
    (0, react_1.useEffect)(function () {
        if ((0, Functions_1.isTouchDevice)()) {
            setIsPhone(true);
        }
        else {
            setIsPhone(false);
        }
    }, []);
    // Track scroll position
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
    (0, react_1.useEffect)(function () {
        var container = scrollRef.current;
        if (container) {
            container.addEventListener('scroll', handleScroll);
            return function () { return container.removeEventListener('scroll', handleScroll); };
        }
    }, []);
    return (react_1.default.createElement("div", __assign({ className: "carousel-wrapper ".concat(funcss) }, rest),
        react_1.default.createElement(react_1.default.Fragment, null,
            !isPhone && isScrollable && (react_1.default.createElement("div", { className: 'carouselLeft' },
                react_1.default.createElement(Circle_1.default, { bordered: true, size: controlerSize, onClick: function () { return scroll('left'); } },
                    react_1.default.createElement(pi_1.PiCaretLeft, { className: 'text-primary', size: controlerIconSize })))),
            react_1.default.createElement("div", { ref: scrollRef, className: "carousel-container scrollbar-hide w-full", style: {
                    width: '100%',
                    gap: gap + 'rem',
                    overflowX: 'auto',
                    overflowY: 'visible',
                    display: 'flex',
                    justifyItems: (isScrollable || isPhone) ? 'flex-start' : 'center',
                    scrollSnapType: 'x mandatory',
                    scrollBehavior: 'smooth',
                    padding: itemPadding || "0.5rem"
                } }, react_1.default.Children.map(children, function (child) { return (react_1.default.createElement("div", { className: "carousel-item", style: { flexShrink: 0 } },
                react_1.default.createElement("div", { className: "carousel-card" }, child))); })),
            !isPhone && isScrollable && (react_1.default.createElement("div", { className: 'carouselRight' },
                react_1.default.createElement(Circle_1.default, { bordered: true, size: controlerSize, onClick: function () { return scroll('right'); } },
                    react_1.default.createElement(pi_1.PiCaretRight, { className: 'text-primary', size: controlerIconSize }))))),
        (showDashes && isScrollable) && (react_1.default.createElement("div", { className: "center padding-top-10" },
            react_1.default.createElement(RowFlex_1.default, { gap: 0.5, justify: "center" }, ['start', 'middle', 'end'].map(function (pos) { return (react_1.default.createElement("div", { className: 'pointer ', key: pos, onClick: function () {
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
                    background: scrollPosition === pos ? 'var(--primary)' : 'var(--borderColor)',
                    borderRadius: '50%',
                    transform: scrollPosition === pos ? 'scale(1.3)' : 'scale(0.9)',
                    transition: 'transform 0.3s ease, background 0.3s ease',
                } })); }))))));
};
exports.default = Carousel;
