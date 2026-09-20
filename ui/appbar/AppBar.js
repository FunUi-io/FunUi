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
exports.default = AppBar;
var React = __importStar(require("react"));
var react_1 = require("react");
var navigation_1 = require("next/navigation");
var Hamburger_1 = __importDefault(require("./Hamburger"));
var componentUtils_1 = require("../../utils/componentUtils");
var getDynamicIcon_1 = require("../../utils/getDynamicIcon");
// Parse string to object utility
var parseIfString = function (value, fallback) {
    if (typeof value === 'string') {
        try {
            var parsed = JSON.parse(value);
            if (Array.isArray(fallback) && !Array.isArray(parsed)) {
                console.warn('Parsed value is not an array, using fallback');
                return fallback;
            }
            return parsed;
        }
        catch (error) {
            console.error('Failed to parse JSON string:', error);
            return fallback;
        }
    }
    if (value == null) {
        return fallback;
    }
    return value;
};
// Dropdown Arrow Icon Component
var DropdownArrow = function (_a) {
    var isOpen = _a.isOpen;
    return (React.createElement("svg", { width: "16", height: "16", viewBox: "0 0 16 16", style: {
            transition: 'transform 0.3s ease',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
        } },
        React.createElement("path", { d: "M4 6 L8 10 L12 6", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round" })));
};
// Link Item Component with Dropdown Support
var LinkItem = function (_a) {
    var link = _a.link, renderLink = _a.renderLink, _b = _a.linkPadding, linkPadding = _b === void 0 ? '' : _b, _c = _a.activeLinkColor, activeLinkColor = _c === void 0 ? 'primary' : _c, _d = _a.dropdownArrow, dropdownArrow = _d === void 0 ? true : _d, _e = _a.isMobile, isMobile = _e === void 0 ? false : _e, _f = _a.visibleLinks // Add visibleLinks prop here
    , visibleLinks = _f === void 0 ? false : _f // Add visibleLinks prop here
    ;
    var _g = (0, react_1.useState)(false), isOpen = _g[0], setIsOpen = _g[1];
    var _h = (0, react_1.useState)(null), iconNode = _h[0], setIconNode = _h[1];
    var timeoutRef = (0, react_1.useRef)();
    var dropdownRef = (0, react_1.useRef)(null);
    // Handle dynamic icon loading
    (0, react_1.useEffect)(function () {
        if (link.icon) {
            (0, getDynamicIcon_1.getDynamicIcon)(link.icon).then(setIconNode);
        }
        else {
            setIconNode(null);
        }
    }, [link.icon]);
    // Close dropdown when clicking outside
    (0, react_1.useEffect)(function () {
        var handleClickOutside = function (event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return function () {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);
    var hasChildren = link.children && link.children.length > 0;
    var handleMouseEnter = function () {
        if (timeoutRef.current)
            clearTimeout(timeoutRef.current);
        if ((!isMobile || visibleLinks) && hasChildren) { // Updated condition
            setIsOpen(true);
        }
    };
    var handleMouseLeave = function () {
        if (!isMobile || visibleLinks) { // Updated condition
            timeoutRef.current = setTimeout(function () { return setIsOpen(false); }, 150);
        }
    };
    var handleClick = function (e) {
        if (hasChildren && (isMobile && !visibleLinks)) { // Only toggle on mobile when visibleLinks is false
            e.preventDefault();
            setIsOpen(!isOpen);
        }
    };
    var linkContent = (React.createElement("span", { className: "nav_link-content ".concat(link.active ? 'active' : '', " ").concat(link.className || ''), style: {
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: linkPadding,
            color: 'inherit',
            textDecoration: 'none'
        } },
        iconNode && link.iconPosition !== 'suffix' && (React.createElement("span", { className: "nav_link-icon prefix", style: { display: 'flex', alignItems: 'center' } }, iconNode)),
        React.createElement("span", { className: "nav_link-text" }, link.label),
        iconNode && link.iconPosition === 'suffix' && (React.createElement("span", { className: "nav_link-icon suffix", style: { display: 'flex', alignItems: 'center' } }, iconNode)),
        hasChildren && dropdownArrow && (React.createElement("span", { className: "nav_link-arrow", style: { display: 'flex', alignItems: 'center' } },
            React.createElement(DropdownArrow, { isOpen: isOpen })))));
    // If custom renderer is provided, use it
    if (renderLink) {
        return renderLink(link, 0);
    }
    return (React.createElement("div", { ref: dropdownRef, className: "nav_item ".concat(hasChildren ? 'has-dropdown' : '', " ").concat(isOpen ? 'dropdown-open' : ''), onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave, style: { position: 'relative' } },
        React.createElement("a", { href: link.href, className: "nav_link ".concat(link.active ? 'active' : ''), onClick: handleClick, style: {
                textDecoration: 'none',
                color: 'inherit',
                display: 'flex',
                alignItems: 'center'
            } }, linkContent),
        hasChildren && isOpen && (React.createElement("div", { className: "nav_dropdown-menu ".concat((isMobile && !visibleLinks) ? 'nav_dropdown-mobile' : '') },
            " ",
            link.children.map(function (child, index) { return (React.createElement(LinkItem, { key: index, link: child, renderLink: renderLink, linkPadding: linkPadding, activeLinkColor: activeLinkColor, dropdownArrow: dropdownArrow, isMobile: isMobile, visibleLinks: visibleLinks })); })))));
};
// Links component to render navigation links
var NavLinks = function (_a) {
    var links = _a.links, renderLink = _a.renderLink, _b = _a.linkGap, linkGap = _b === void 0 ? '1rem' : _b, _c = _a.linkPadding, linkPadding = _c === void 0 ? '0.5rem 1rem' : _c, _d = _a.activeLinkColor, activeLinkColor = _d === void 0 ? 'primary' : _d, _e = _a.dropdownArrow, dropdownArrow = _e === void 0 ? true : _e, _f = _a.isMobile, isMobile = _f === void 0 ? false : _f, _g = _a.visibleLinks // Add visibleLinks prop here
    , visibleLinks = _g === void 0 ? false : _g // Add visibleLinks prop here
    ;
    if (!links || !Array.isArray(links) || links.length === 0) {
        return null;
    }
    return (React.createElement("div", { className: "nav_links", style: {
            display: 'flex',
            alignItems: 'center',
            gap: linkGap,
            flexDirection: (isMobile && !visibleLinks) ? 'column' : 'row' // Only column layout when mobile menu is open
        } }, links.map(function (link, index) { return (React.createElement(LinkItem, { key: index, link: link, renderLink: renderLink, linkPadding: linkPadding, activeLinkColor: activeLinkColor, dropdownArrow: dropdownArrow, isMobile: isMobile, visibleLinks: visibleLinks })); })));
};
// Logo component with multiple display options
var Logo = function (_a) {
    var _b = _a.type, type = _b === void 0 ? 'text' : _b, _c = _a.text, text = _c === void 0 ? 'MyApp' : _c, _d = _a.textSize, textSize = _d === void 0 ? 'xl' : _d, _e = _a.textColor, textColor = _e === void 0 ? 'primary' : _e, _f = _a.textWeight, textWeight = _f === void 0 ? 'bold' : _f, _g = _a.url, url = _g === void 0 ? '' : _g, _h = _a.alt, alt = _h === void 0 ? 'Logo' : _h, _j = _a.width, width = _j === void 0 ? '40px' : _j, _k = _a.height, height = _k === void 0 ? 'auto' : _k, _l = _a.href, href = _l === void 0 ? '/' : _l, onClick = _a.onClick;
    if (type === 'none')
        return null;
    var logoContent = (React.createElement("div", { className: "logo-content", style: { display: 'flex', alignItems: 'center', gap: '0.75rem' } },
        (type === 'image' || type === 'both') && url && (React.createElement("img", { src: url, alt: alt, style: {
                width: width,
                height: height,
                objectFit: 'contain',
                display: 'block'
            }, className: "logo-image" })),
        (type === 'text' || type === 'both') && text && (React.createElement("span", { className: "logo-text text-".concat(textSize, " text-").concat(textColor, " font-").concat(textWeight), style: {
                lineHeight: 1,
                whiteSpace: 'nowrap'
            } }, text))));
    // Wrap in link if href provided
    if (href) {
        return (React.createElement("a", { href: href, onClick: onClick, style: {
                textDecoration: 'none',
                color: 'inherit',
                display: 'flex',
                alignItems: 'center'
            }, className: "logo-link" }, logoContent));
    }
    return (React.createElement("div", { onClick: onClick, style: { cursor: onClick ? 'pointer' : 'default' }, className: "logo-container" }, logoContent));
};
function AppBar(localProps) {
    // Use component configuration with variant support
    var mergeWithLocal = (0, componentUtils_1.useComponentConfiguration)('AppBar', localProps.variant).mergeWithLocal;
    // Merge with config - LOCAL PROPS OVERRIDE CONFIG
    var mergedProps = mergeWithLocal(localProps).props;
    // Parse link props if they're strings
    var parsedLeftLinks = parseIfString(mergedProps.leftLinks, []);
    var parsedCenterLinks = parseIfString(mergedProps.centerLinks, []);
    var parsedRightLinks = parseIfString(mergedProps.rightLinks, []);
    // Use mergedProps directly
    var final = mergedProps;
    var _a = (0, react_1.useState)(false), isMobileMenuOpen = _a[0], setIsMobileMenuOpen = _a[1];
    var _b = (0, react_1.useState)(false), isMobileScreen = _b[0], setIsMobileScreen = _b[1];
    var pathname = (0, navigation_1.usePathname)();
    var toggleMenu = function () { return setIsMobileMenuOpen(function (prev) { return !prev; }); };
    var closeMenu = function () { return setIsMobileMenuOpen(false); };
    (0, react_1.useEffect)(function () {
        var handleResize = function () {
            var isMobile = window.innerWidth < (final.mobileMenuBreakpoint || 992);
            setIsMobileScreen(isMobile);
            if (!isMobile) {
                closeMenu(); // close on larger screens
            }
        };
        handleResize(); // initial check
        window.addEventListener('resize', handleResize);
        return function () { return window.removeEventListener('resize', handleResize); };
    }, [final.mobileMenuBreakpoint]);
    // Automatically close menu on route (pathname) change
    (0, react_1.useEffect)(function () {
        closeMenu();
    }, [pathname]);
    var Trigger = function (_a) {
        var isOpen = _a.isOpen;
        return React.createElement(Hamburger_1.default, { isOpen: isOpen });
    };
    // Enhanced left section with logo customization
    var renderLeftSection = function () {
        // If custom left content is provided, use it (overrides everything)
        if (final.left)
            return final.left;
        // Render logo based on configuration
        var shouldRenderLogo = final.logoType && final.logoType !== 'none';
        var hasLeftLinks = parsedLeftLinks.length > 0;
        return (React.createElement("div", { className: "left-section", style: { display: 'flex', alignItems: 'center', gap: '2rem' } },
            shouldRenderLogo && (React.createElement(Logo, { type: final.logoType, text: final.logoText, textSize: final.logoTextSize, textColor: final.logoTextColor, textWeight: final.logoTextWeight, url: final.logoUrl, alt: final.logoAlt, width: final.logoWidth, height: final.logoHeight, href: final.logoHref, onClick: final.onLogoClick })),
            hasLeftLinks && (!isMobileScreen || final.visibleLinks) && ( // Updated condition
            React.createElement(NavLinks, { links: parsedLeftLinks, renderLink: final.renderLink, linkGap: final.linkGap, linkPadding: final.linkPadding, activeLinkColor: final.activeLinkColor, dropdownArrow: final.dropdownArrow, isMobile: isMobileScreen, visibleLinks: final.visibleLinks }))));
    };
    var renderCenterSection = function () {
        if (final.center)
            return final.center;
        if (parsedCenterLinks.length > 0 && (!isMobileScreen || final.visibleLinks)) { // Updated condition
            return (React.createElement(NavLinks, { links: parsedCenterLinks, renderLink: final.renderLink, linkGap: final.linkGap, linkPadding: final.linkPadding, activeLinkColor: final.activeLinkColor, dropdownArrow: final.dropdownArrow, isMobile: isMobileScreen, visibleLinks: final.visibleLinks }));
        }
        return null;
    };
    var renderRightSection = function () {
        if (final.right)
            return final.right;
        if (parsedRightLinks.length > 0 && (!isMobileScreen || final.visibleLinks)) { // Updated condition
            return (React.createElement(NavLinks, { links: parsedRightLinks, renderLink: final.renderLink, linkGap: final.linkGap, linkPadding: final.linkPadding, activeLinkColor: final.activeLinkColor, dropdownArrow: final.dropdownArrow, isMobile: isMobileScreen, visibleLinks: final.visibleLinks }));
        }
        return null;
    };
    // Mobile menu content - only show when visibleLinks is false
    var renderMobileMenu = function () {
        if (!isMobileScreen || !isMobileMenuOpen || final.visibleLinks)
            return null; // Don't show mobile menu when visibleLinks is true
        var allLinks = __spreadArray(__spreadArray(__spreadArray([], parsedLeftLinks, true), parsedCenterLinks, true), parsedRightLinks, true);
        return (React.createElement("div", { className: "nav_mobile-menu" },
            React.createElement(NavLinks, { links: allLinks, renderLink: final.renderLink, linkGap: "0.5rem", linkPadding: "1rem", activeLinkColor: final.activeLinkColor, dropdownArrow: final.dropdownArrow, isMobile: true, visibleLinks: final.visibleLinks })));
    };
    return (React.createElement(React.Fragment, null,
        React.createElement("nav", { id: 'appBar', className: "navigation-bar\n          ".concat(isMobileMenuOpen ? 'navbar-mobile-open' : '', "\n          ").concat(final.funcss || '', "\n          ").concat(final.testing ? "" : final.fixedTop ? 'fixed_top_navbar' : '', "\n          ").concat(final.sideBar ? 'there_is_sidebar' : '', "\n          ").concat(final.transparent ? 'transparent' : '', "\n          ").concat(final.fixedBottom ? 'fixedBottom' : '', "\n          ").concat(final.visibleLinks ? 'visible-links-mode' : '', " // Add class for styling\n        "), style: {
                padding: "".concat(final.padding || ''),
                justifyContent: "".concat(final.justify || ''),
            } },
            React.createElement("div", { className: "logoWrapper" },
                renderLeftSection(),
                isMobileScreen && isMobileMenuOpen && !final.visibleLinks && ( // Only show close button when not in visibleLinks mode
                React.createElement("div", { className: "hover-text-error pointer _closeNav", onClick: closeMenu },
                    React.createElement(Trigger, { isOpen: isMobileMenuOpen })))),
            React.createElement("div", { className: "linkWrapper ".concat(final.visibleLinks ? 'navbar-links-visible' : '') }, renderCenterSection()),
            React.createElement("div", { className: "linkWrapper ".concat(final.visibleLinks ? 'navbar-links-visible' : '') }, renderRightSection()),
            isMobileScreen && !isMobileMenuOpen && !final.visibleLinks && (React.createElement(React.Fragment, null, final.hasSidebar ?
                React.createElement("span", { className: "sidebar-trigger pointer hover-text-primary", onClick: final.openSidebar }, final.sidebarTrigger || React.createElement(Trigger, { isOpen: final.sidebarOpen }))
                :
                    React.createElement("span", { className: "sidebar-trigger pointer hover-text-primary", onClick: toggleMenu }, final.sidebarTrigger || React.createElement(Trigger, { isOpen: isMobileMenuOpen }))))),
        renderMobileMenu()));
}
