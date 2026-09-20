'use client';
"use strict";
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
var Text_1 = __importDefault(require("../text/Text"));
var navigation_1 = require("next/navigation");
var theme_1 = require("../theme/theme");
var Button_1 = __importDefault(require("../button/Button"));
var Accordion_1 = __importDefault(require("../accordion/Accordion"));
var bs_1 = require("react-icons/bs");
var Flex_1 = __importDefault(require("../flex/Flex"));
var ToolTip_1 = __importDefault(require("../tooltip/ToolTip"));
var Carousel_1 = __importDefault(require("../carousel/Carousel"));
function SideBar(_a) {
    var _b, _c;
    var _d = _a.funcss, funcss = _d === void 0 ? '' : _d, _e = _a.position, position = _e === void 0 ? 'left' : _e, _f = _a.open, open = _f === void 0 ? false : _f, header = _a.header, content = _a.content, footer = _a.footer, _g = _a.top, top = _g === void 0 ? 0 : _g, _h = _a.sidebarWidth, sidebarWidth = _h === void 0 ? 250 : _h, _j = _a.iconCSS, iconCSS = _j === void 0 ? '' : _j, _k = _a.sidebarCss, sidebarCss = _k === void 0 ? '' : _k, activeCss = _a.activeCss, _l = _a.bodyCss, bodyCss = _l === void 0 ? '' : _l, _m = _a.popIcon, popIcon = _m === void 0 ? false : _m, _o = _a.dividers, dividers = _o === void 0 ? false : _o, accordionItemCss = _a.accordionItemCss, _p = _a.links, links = _p === void 0 ? [] : _p, children = _a.children, onClose = _a.onClose, togglePrefix = _a.togglePrefix, _q = _a.isAccordion, isAccordion = _q === void 0 ? false : _q, _r = _a.isCollapsed, isCollapsed = _r === void 0 ? true : _r, onCollapseChange = _a.onCollapseChange, _s = _a.bottomNavBackground, bottomNavBackground = _s === void 0 ? 'var(--background, white)' : _s, // Default background
    _t = _a.bottomNavHeight, // Default background
    bottomNavHeight = _t === void 0 ? 64 : _t;
    var _u = (0, react_1.useState)(false), isMobile = _u[0], setIsMobile = _u[1];
    var _v = (0, react_1.useState)(open), internalOpen = _v[0], setInternalOpen = _v[1];
    var _w = (0, react_1.useState)('0px'), appBarHeight = _w[0], setAppBarHeight = _w[1];
    var _x = (0, react_1.useState)(isCollapsed), collapsed = _x[0], setCollapsed = _x[1];
    var pathname = (0, navigation_1.usePathname)();
    var sidebarRef = (0, react_1.useRef)(null);
    var variant = (0, theme_1.useVariant)().variant;
    var _y = (0, react_1.useState)(''), selectedOption = _y[0], setselectedOption = _y[1];
    // Flatten all links for bottom navigation
    var allLinks = links.reduce(function (acc, link) {
        acc.push(link);
        return acc;
    }, []);
    var updateIsMobile = (0, react_1.useCallback)(function () {
        setIsMobile(window.innerWidth <= 992);
    }, []);
    (0, react_1.useEffect)(function () {
        updateIsMobile();
        window.addEventListener('resize', updateIsMobile);
        return function () { return window.removeEventListener('resize', updateIsMobile); };
    }, [updateIsMobile]);
    (0, react_1.useEffect)(function () {
        setInternalOpen(open);
    }, [open]);
    (0, react_1.useEffect)(function () {
        setCollapsed(isCollapsed);
    }, [isCollapsed]);
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
    var toggleCollapse = function () {
        var newCollapsed = !collapsed;
        setCollapsed(newCollapsed);
        onCollapseChange === null || onCollapseChange === void 0 ? void 0 : onCollapseChange(newCollapsed);
    };
    var groupedLinks = links.reduce(function (acc, link) {
        acc[link.section] = acc[link.section] || [];
        acc[link.section].push(link);
        return acc;
    }, {});
    var isOverlay = isMobile;
    // Prepare accordion items when isAccordion is true
    var accordionItems = isAccordion
        ? Object.entries(groupedLinks).map(function (_a) {
            var _b;
            var section = _a[0], sectionLinks = _a[1];
            return ({
                icon: (_b = sectionLinks[0]) === null || _b === void 0 ? void 0 : _b.icon,
                title: section,
                content: (react_1.default.createElement("div", { className: "sidebar-accordion-links" }, sectionLinks.map(function (link, index) {
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
                        react_1.default.createElement(Button_1.default, { fullWidth: true, small: true, funcss: "sidebar-link ".concat(isActive ? "" : "p-0", " text-left ").concat(isActive ? "primary ".concat(activeCss || '') : 'hoverable'), startIcon: react_1.default.createElement("span", { className: "".concat(iconCSS || '', " ").concat(variant === 'standard' || popIcon
                                    ? "p-1 ".concat(isActive ? 'primary' : 'lighter text-primary border', " central")
                                    : variant === 'minimal' && !isActive
                                        ? 'p-1 central lighter text-primary'
                                        : ''), style: { lineHeight: 0, borderRadius: '0.4rem' } }, link.icon) }, !collapsed && react_1.default.createElement(Text_1.default, { text: link.text, size: "sm", weight: 400 }))));
                }))),
            });
        })
        : [];
    // Get current sidebar width based on collapsed state
    var currentSidebarWidth = collapsed ? 70 : sidebarWidth;
    var collapseIconSize = '18px';
    // Render bottom navigation for mobile
    var renderBottomNav = function () {
        if (!isMobile || allLinks.length === 0)
            return null;
        return (react_1.default.createElement("div", { className: "bottom-nav", style: {
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                height: "".concat(bottomNavHeight, "px"),
                backgroundColor: bottomNavBackground,
                zIndex: 1000,
                display: 'flex',
                alignItems: 'center',
                // padding: '0.5rem 0',
            } },
            react_1.default.createElement(Carousel_1.default, { justify: 'center', overflowPadding: '0 1.5rem', showDashes: false, itemPadding: '0rem', controlerIconSize: 10, controlerSize: 1.4 }, allLinks.map(function (link, index) {
                var isActive = link.onClick
                    ? selectedOption === link.section + '-' + index
                    : pathname === link.uri;
                return (react_1.default.createElement("div", { key: index, className: "bottom-nav-item", style: {
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        maxWidth: 'fit-content',
                        padding: '0.25rem 0.5rem',
                        cursor: 'pointer',
                        borderRadius: '0.5rem',
                        transition: 'all 0.2s ease',
                    }, onClick: function () {
                        if (link === null || link === void 0 ? void 0 : link.onClick) {
                            link.onClick();
                            setselectedOption(link.section + '-' + index);
                        }
                        else {
                            window.location.href = link.uri;
                        }
                    } },
                    react_1.default.createElement("div", { className: "bottom-nav-icon", style: {
                            fontSize: '1.25rem',
                            color: isActive ? 'var(--primary, #3b82f6)' : '',
                            marginBottom: '0.25rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        } }, link.icon),
                    react_1.default.createElement("div", { className: "bottom-nav-text", style: {
                            fontSize: '0.75rem',
                            color: isActive ? 'var(--primary, #3b82f6)' : '',
                            fontWeight: isActive ? 600 : 400,
                            textAlign: 'center',
                            whiteSpace: 'nowrap',
                        } }, link.text)));
            }))));
    };
    return (react_1.default.createElement("div", { className: "sidebar-container ".concat(isOverlay ? '' : 'with-content') },
        internalOpen && collapsed && !isMobile && (react_1.default.createElement("aside", { role: "complementary", ref: sidebarRef, className: "sidebar collapsed ".concat(funcss, " ").concat(sidebarCss, " ").concat(isOverlay ? 'nav_overlay' : ''), style: (_b = {
                    width: isOverlay ? '100%' : "".concat(currentSidebarWidth, "px"),
                    height: "calc(100vh - ".concat(appBarHeight || top || '0px', ")"),
                    position: 'fixed',
                    top: appBarHeight || top
                },
                _b[position] = 0,
                _b.padding = '0.5rem',
                _b.overflow = 'visible',
                _b) },
            react_1.default.createElement("div", { className: 'pointer text-primary text-center p-1 bb mb', style: { fontSize: collapseIconSize, lineHeight: 0 }, onClick: toggleCollapse },
                react_1.default.createElement(bs_1.BsLayoutSidebarInsetReverse, null)),
            react_1.default.createElement("section", { className: "" }, links.length > 0 && (react_1.default.createElement(Flex_1.default, { direction: 'column', gap: 0.6, alignItems: 'center', width: '100%' }, Object.entries(groupedLinks).map(function (_a, sectionIndex) {
                var section = _a[0], sectionLinks = _a[1];
                return (react_1.default.createElement(Flex_1.default, { key: section, direction: 'column', gap: 0.5, alignItems: 'center', width: '100%' },
                    sectionLinks.map(function (link, index) {
                        var isActive = link.onClick
                            ? selectedOption === "".concat(section, "-").concat(index)
                            : pathname === link.uri;
                        return (react_1.default.createElement(ToolTip_1.default, { key: link.uri, message: link.text, tip: 'right' },
                            react_1.default.createElement("div", { onClick: function () {
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
                                }, className: 'hover-scale-rotate hover-text-primary' },
                                react_1.default.createElement("span", { className: " pointer ".concat(iconCSS || '', " ").concat(variant === 'standard' || popIcon
                                        ? "p-1 ".concat(isActive ? 'text-primary' : 'bg  border', " central")
                                        : variant === 'minimal' && !isActive
                                            ? 'p-1 central bg'
                                            : ''), style: { lineHeight: 0, borderRadius: '0.4rem', fontSize: collapseIconSize } }, link.icon))));
                    }),
                    sectionIndex < Object.keys(groupedLinks).length - 1 && (react_1.default.createElement("div", { className: "mt-1 mb-1 bt fit" }))));
            })))))),
        internalOpen && !collapsed && !isMobile && (react_1.default.createElement("aside", { role: "complementary", ref: sidebarRef, className: "sidebar ".concat(funcss, " ").concat(sidebarCss, " ").concat(isOverlay ? 'nav_overlay' : ''), style: (_c = {
                    width: isOverlay ? '100%' : "".concat(currentSidebarWidth, "px"),
                    height: "calc(100vh - ".concat(appBarHeight || top || '0px', ")"),
                    position: 'fixed',
                    top: appBarHeight || top
                },
                _c[position] = 0,
                _c.padding = '1rem',
                _c) },
            react_1.default.createElement("div", { className: "sidebar-header" },
                react_1.default.createElement(Flex_1.default, { width: '100%', alignItems: 'center', gap: 0.5, justify: 'space-between' },
                    togglePrefix || react_1.default.createElement("div", null),
                    react_1.default.createElement("div", { className: 'pointer hover-text-primary text-right', style: { fontSize: collapseIconSize, lineHeight: 0 }, onClick: toggleCollapse },
                        react_1.default.createElement(bs_1.BsLayoutSidebarInset, null))),
                header && react_1.default.createElement("div", null, header)),
            react_1.default.createElement("section", { className: "sidebar-body mt-3" },
                links.length > 0 && (react_1.default.createElement("nav", { className: "sidebar-links" }, isAccordion ? (react_1.default.createElement(Accordion_1.default, { itemClass: accordionItemCss, items: accordionItems, allowMultiple: false, contentClass: "", titleClass: 'text-sm', activeClass: "" })) : (Object.entries(groupedLinks).map(function (_a) {
                    var section = _a[0], sectionLinks = _a[1];
                    return (react_1.default.createElement("div", { key: section, className: "sidebar-section ".concat(dividers ? 'bt' : '', " pt-2 pb-2") },
                        react_1.default.createElement(Text_1.default, { size: "xs", uppercase: true, opacity: 4 }, section),
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
                                react_1.default.createElement(Button_1.default, { fullWidth: true, small: true, funcss: "sidebar-link text-left ".concat(isActive ? "primary ".concat(activeCss || '') : 'hoverable'), startIcon: react_1.default.createElement("span", { className: "".concat(iconCSS || '', " ").concat(variant === 'standard' || popIcon
                                            ? "p-1 ".concat(isActive ? 'primary' : 'lighter text-primary border', " central")
                                            : variant === 'minimal' && !isActive
                                                ? 'p-1 central lighter text-primary'
                                                : ''), style: { lineHeight: 0, borderRadius: '0.4rem' } }, link.icon) },
                                    react_1.default.createElement(Text_1.default, { text: link.text, size: "sm", weight: 400 }))));
                        })));
                })))),
                content),
            footer && react_1.default.createElement("footer", { className: "sidebar-footer mt-2" }, footer))),
        react_1.default.createElement("main", { className: "main-content ".concat(bodyCss), style: {
                flex: 1,
                marginLeft: position === 'left' && !isOverlay && internalOpen && !isMobile ? "".concat(currentSidebarWidth, "px") : 0,
                marginRight: position === 'right' && !isOverlay && internalOpen && !isMobile ? "".concat(currentSidebarWidth, "px") : 0,
                overflowY: 'auto',
                height: '100vh',
                paddingTop: appBarHeight || top,
                paddingBottom: isMobile && allLinks.length > 0 ? "".concat(bottomNavHeight + 20, "px") : 0, // Add padding for bottom nav
                transition: 'margin 0.3s ease',
            } }, children),
        renderBottomNav()));
}
