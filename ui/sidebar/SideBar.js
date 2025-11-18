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
exports.default = SideBar;
var react_1 = __importStar(require("react"));
var RowFlex_1 = __importDefault(require("../specials/RowFlex"));
var Text_1 = __importDefault(require("../text/Text"));
var navigation_1 = require("next/navigation");
var theme_1 = require("../theme/theme");
var Button_1 = __importDefault(require("../button/Button"));
function SideBar(_a) {
    var _b;
    var _c = _a.funcss, funcss = _c === void 0 ? '' : _c, _d = _a.position, position = _d === void 0 ? 'left' : _d, _e = _a.open, open = _e === void 0 ? false : _e, header = _a.header, content = _a.content, footer = _a.footer, _f = _a.top, top = _f === void 0 ? 0 : _f, _g = _a.sidebarWidth, sidebarWidth = _g === void 0 ? 250 : _g, _h = _a.iconCSS, iconCSS = _h === void 0 ? '' : _h, _j = _a.sidebarCss, sidebarCss = _j === void 0 ? '' : _j, activeCss = _a.activeCss, _k = _a.bodyCss, bodyCss = _k === void 0 ? '' : _k, _l = _a.popIcon, popIcon = _l === void 0 ? false : _l, _m = _a.dividers, dividers = _m === void 0 ? false : _m, _o = _a.links, links = _o === void 0 ? [] : _o, children = _a.children, onClose = _a.onClose;
    var _p = (0, react_1.useState)(false), isMobile = _p[0], setIsMobile = _p[1];
    var _q = (0, react_1.useState)(open), internalOpen = _q[0], setInternalOpen = _q[1];
    var _r = (0, react_1.useState)('0px'), appBarHeight = _r[0], setAppBarHeight = _r[1];
    var pathname = (0, navigation_1.usePathname)();
    var sidebarRef = (0, react_1.useRef)(null);
    var variant = (0, theme_1.useVariant)().variant;
    var _s = (0, react_1.useState)(""), selectedOption = _s[0], setselectedOption = _s[1];
    var updateIsMobile = (0, react_1.useCallback)(function () {
        setIsMobile(window.innerWidth <= 992);
    }, []);
    (0, react_1.useEffect)(function () {
        updateIsMobile();
        window.addEventListener('resize', updateIsMobile);
        return function () { return window.removeEventListener('resize', updateIsMobile); };
    }, [updateIsMobile]);
    // Sync internal state with prop changes
    (0, react_1.useEffect)(function () {
        setInternalOpen(open);
    }, [open]);
    (0, react_1.useEffect)(function () {
        var appBar = document.querySelector('#appBar');
        if (appBar) {
            setAppBarHeight("".concat(appBar.offsetHeight, "px"));
        }
    }, []);
    (0, react_1.useEffect)(function () {
        if (!isMobile || !internalOpen)
            return;
        var handleOutsideClick = function (e) {
            if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
                handleClose();
            }
        };
        document.addEventListener('mousedown', handleOutsideClick);
        document.addEventListener('touchstart', handleOutsideClick);
        return function () {
            document.removeEventListener('mousedown', handleOutsideClick);
            document.removeEventListener('touchstart', handleOutsideClick);
        };
    }, [isMobile, internalOpen]);
    var handleClose = function () {
        setInternalOpen(false);
        onClose === null || onClose === void 0 ? void 0 : onClose();
    };
    var groupedLinks = links.reduce(function (acc, link) {
        acc[link.section] = acc[link.section] || [];
        acc[link.section].push(link);
        return acc;
    }, {});
    var isOverlay = isMobile;
    return (react_1.default.createElement("div", { className: "sidebar-container ".concat(isOverlay ? '' : 'with-content') },
        internalOpen && (react_1.default.createElement("aside", { role: "complementary", ref: sidebarRef, className: "sidebar ".concat(funcss, " ").concat(sidebarCss, "  ").concat(isOverlay ? 'nav_overlay' : ''), style: (_b = {
                    width: isOverlay ? '100%' : "".concat(sidebarWidth, "px"),
                    height: "calc(100vh - ".concat(appBarHeight || top || '0px', ")"),
                    position: 'fixed',
                    top: appBarHeight || top
                },
                _b[position] = 0,
                _b.padding = '1rem',
                _b) },
            react_1.default.createElement(RowFlex_1.default, { justify: "space-between", funcss: "pl-2 pr-2" }, header && react_1.default.createElement("div", null, header)),
            react_1.default.createElement("section", { className: "sidebar-body mt-3" },
                links.length > 0 && (react_1.default.createElement("nav", { className: "sidebar-links" }, Object.entries(groupedLinks).map(function (_a) {
                    var section = _a[0], sectionLinks = _a[1];
                    return (react_1.default.createElement("div", { key: section, className: "sidebar-section ".concat(dividers ? "bt" : "", " pt-2 pb-2") },
                        react_1.default.createElement(Text_1.default, { size: "sm", funcss: "opacity-6 p-1 pl-2 pr-2" }, section),
                        sectionLinks.map(function (link, index) {
                            var isActive = link.onClick
                                ? selectedOption === "".concat(section, "-").concat(index)
                                : pathname === link.uri;
                            return (react_1.default.createElement("div", { onClick: function () {
                                    if (isMobile) {
                                        handleClose();
                                    }
                                    if (link === null || link === void 0 ? void 0 : link.onClick) {
                                        link.onClick();
                                        setselectedOption("".concat(section, "-").concat(index));
                                    }
                                    else {
                                        window.location.href = link.uri;
                                    }
                                }, key: link.uri },
                                react_1.default.createElement(Button_1.default, { fullWidth: true, small: true, funcss: "p-1 pl-2 pr-2  sidebar-link text-left  ".concat(isActive ? "primary  ".concat(activeCss || '') : 'hoverable'), startIcon: react_1.default.createElement("span", { className: "".concat(iconCSS || '', " \n                            ").concat((variant === 'standard' || popIcon) ? "p-1  ".concat(isActive ? "primary" : "lighter text-primary border", " central") : (variant === "minimal" && !isActive) ? "p-1 central lighter text-primary" : ""), style: { lineHeight: 0, borderRadius: "0.4rem" } }, link.icon) },
                                    react_1.default.createElement(Text_1.default, { text: link.text, size: "sm", weight: 400 }))));
                        })));
                }))),
                content),
            footer && react_1.default.createElement("footer", { className: "sidebar-footer mt-2" }, footer))),
        react_1.default.createElement("main", { className: "main-content ".concat(bodyCss), style: {
                flex: 1,
                marginLeft: position === 'left' && !isOverlay && internalOpen ? "".concat(sidebarWidth, "px") : 0,
                marginRight: position === 'right' && !isOverlay && internalOpen ? "".concat(sidebarWidth, "px") : 0,
                overflowY: 'auto',
                height: '100vh',
                paddingTop: appBarHeight || top,
                transition: 'margin 0.3s ease',
            } }, children)));
}
