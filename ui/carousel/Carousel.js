"use strict";
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
    var _b = _a.scrollNumber, scrollNumber = _b === void 0 ? 320 : _b, _c = _a.gap, gap = _c === void 0 ? 0.5 : _c, _d = _a.funcss, funcss = _d === void 0 ? '' : _d, _e = _a.showDashes, showDashes = _e === void 0 ? true : _e, children = _a.children;
    var scrollRef = (0, react_1.useRef)(null);
    var _f = (0, react_1.useState)('start'), scrollPosition = _f[0], setScrollPosition = _f[1];
    var _g = (0, react_1.useState)(false), isPhone = _g[0], setIsPhone = _g[1];
    var _h = (0, react_1.useState)(false), isScrollable = _h[0], setIsScrollable = _h[1];
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
    return (react_1.default.createElement("div", { className: "carousel-wrapper ".concat(funcss) },
        react_1.default.createElement(RowFlex_1.default, { gap: 1, wrap: "nowrap", alignItems: "center" },
            !isPhone && isScrollable && (react_1.default.createElement("div", null,
                react_1.default.createElement(Circle_1.default, { onClick: function () { return scroll('left'); } },
                    react_1.default.createElement(pi_1.PiCaretLeft, { size: 24 })))),
            react_1.default.createElement("div", { ref: scrollRef, className: "carousel-container scrollbar-hide w-full", style: {
                    width: '100%',
                    gap: gap + 'rem',
                    overflowX: 'auto',
                    display: 'flex',
                    justifyItems: (isScrollable || isPhone) ? 'flex-start' : 'center',
                    scrollSnapType: 'x mandatory',
                    scrollBehavior: 'smooth',
                } }, react_1.default.Children.map(children, function (child) { return (react_1.default.createElement("div", { className: "carousel-item", style: { flexShrink: 0 } },
                react_1.default.createElement("div", { className: "carousel-card" }, child))); })),
            !isPhone && isScrollable && (react_1.default.createElement("div", null,
                react_1.default.createElement(Circle_1.default, { onClick: function () { return scroll('right'); } },
                    react_1.default.createElement(pi_1.PiCaretRight, { size: 24 }))))),
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
