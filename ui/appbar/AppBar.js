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
exports.default = AppBar;
var React = __importStar(require("react"));
var react_1 = require("react");
var navigation_1 = require("next/navigation"); // <-- Updated import
var Hamburger_1 = __importDefault(require("./Hamburger"));
function AppBar(_a) {
    var fixedTop = _a.fixedTop, funcss = _a.funcss, padding = _a.padding, fixedBottom = _a.fixedBottom, justify = _a.justify, left = _a.left, center = _a.center, right = _a.right, sideBar = _a.sideBar, sidebarTrigger = _a.sidebarTrigger, transparent = _a.transparent, hasSidebar = _a.hasSidebar, openSidebar = _a.openSidebar, _b = _a.sidebarOpen, sidebarOpen = _b === void 0 ? false : _b;
    var _c = (0, react_1.useState)(false), isMobileMenuOpen = _c[0], setIsMobileMenuOpen = _c[1];
    var _d = (0, react_1.useState)(false), isMobileScreen = _d[0], setIsMobileScreen = _d[1];
    var pathname = (0, navigation_1.usePathname)(); // <-- New hook to detect path changes
    var toggleMenu = function () { return setIsMobileMenuOpen(function (prev) { return !prev; }); };
    var closeMenu = function () { return setIsMobileMenuOpen(false); };
    (0, react_1.useEffect)(function () {
        var handleResize = function () {
            var isMobile = window.innerWidth < 992;
            setIsMobileScreen(isMobile);
            if (!isMobile) {
                closeMenu(); // close on larger screens
            }
        };
        handleResize(); // initial check
        window.addEventListener('resize', handleResize);
        return function () { return window.removeEventListener('resize', handleResize); };
    }, []);
    // Automatically close menu on route (pathname) change
    (0, react_1.useEffect)(function () {
        closeMenu();
    }, [pathname]);
    var Trigger = function (_a) {
        var isOpen = _a.isOpen;
        return React.createElement(Hamburger_1.default, { isOpen: isOpen });
    };
    return (React.createElement("nav", { 
        // the id will be used to get the height for the sidebar in the sidebar file
        id: 'appBar', className: "navigation-bar\n        ".concat(isMobileMenuOpen ? 'navbar-mobile-open' : '', "\n        ").concat(funcss || '', "\n        ").concat(fixedTop ? 'fixed_top_navbar' : '', "\n        ").concat(sideBar ? 'there_is_sidebar' : '', "\n        ").concat(transparent ? 'transparent' : '', "\n        ").concat(fixedBottom ? 'fixedBottom' : '', "\n      "), style: {
            padding: "".concat(padding || ''),
            justifyContent: "".concat(justify || ''),
        } },
        React.createElement("div", { className: "logoWrapper" },
            left,
            isMobileScreen && isMobileMenuOpen && (React.createElement("div", { className: "hover-text-error pointer _closeNav", onClick: closeMenu },
                React.createElement(Trigger, { isOpen: isMobileMenuOpen })))),
        React.createElement("div", { className: "linkWrapper" }, center),
        React.createElement("div", { className: "linkWrapper" }, right),
        isMobileScreen && !isMobileMenuOpen && (React.createElement(React.Fragment, null, hasSidebar ?
            React.createElement("span", { className: "sidebar-trigger pointer hover-text-primary", onClick: openSidebar }, sidebarTrigger || React.createElement(Trigger, { isOpen: sidebarOpen }))
            : React.createElement("span", { className: "sidebar-trigger pointer hover-text-primary", onClick: toggleMenu }, sidebarTrigger || React.createElement(Trigger, { isOpen: isMobileMenuOpen }))))));
}
