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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
var getDynamicIcon_1 = require("../../utils/getDynamicIcon");
var componentUtils_1 = require("../../utils/componentUtils");
var Text_1 = __importDefault(require("../text/Text"));
var Footer = function (localProps) {
    // Use component configuration with variant
    var mergeWithLocal = (0, componentUtils_1.useComponentConfiguration)('Footer', localProps.variant).mergeWithLocal;
    var final = mergeWithLocal(localProps).props;
    var currentYear = final.year || new Date().getFullYear();
    // State for dynamic icons
    var _a = (0, react_1.useState)({}), loadedIcons = _a[0], setLoadedIcons = _a[1];
    // Parse sections if it's a JSON string
    var sections = react_1.default.useMemo(function () {
        if (!final.sections)
            return [];
        if (typeof final.sections === 'string') {
            try {
                return JSON.parse(final.sections);
            }
            catch (e) {
                console.error('Failed to parse sections JSON:', e);
                return [];
            }
        }
        return final.sections;
    }, [final.sections]);
    // Helper function to check if something is a React element
    function isReactElement(node) {
        return react_1.default.isValidElement(node);
    }
    // Load dynamic icons
    (0, react_1.useEffect)(function () {
        var iconsToLoad = {};
        // Social icons
        if (typeof final.facebookIcon === 'string')
            iconsToLoad.facebook = final.facebookIcon;
        if (typeof final.instagramIcon === 'string')
            iconsToLoad.instagram = final.instagramIcon;
        if (typeof final.twitterIcon === 'string')
            iconsToLoad.twitter = final.twitterIcon;
        if (typeof final.xIcon === 'string')
            iconsToLoad.x = final.xIcon;
        if (typeof final.youtubeIcon === 'string')
            iconsToLoad.youtube = final.youtubeIcon;
        if (typeof final.linkedinIcon === 'string')
            iconsToLoad.linkedin = final.linkedinIcon;
        if (typeof final.githubIcon === 'string')
            iconsToLoad.github = final.githubIcon;
        // Contact icons
        if (typeof final.emailIcon === 'string')
            iconsToLoad.email = final.emailIcon;
        if (typeof final.phoneIcon === 'string')
            iconsToLoad.phone = final.phoneIcon;
        if (typeof final.addressIcon === 'string')
            iconsToLoad.address = final.addressIcon;
        // Social media object
        if (final.socialMedia) {
            Object.entries(final.socialMedia).forEach(function (_a) {
                var key = _a[0], value = _a[1];
                if (typeof value === 'string') {
                    iconsToLoad["socialMedia_".concat(key)] = value;
                }
            });
        }
        // Load all dynamic icons
        var loadIcons = function () { return __awaiter(void 0, void 0, void 0, function () {
            var loaded, _i, _a, _b, key, iconString, icon;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        loaded = {};
                        _i = 0, _a = Object.entries(iconsToLoad);
                        _c.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        _b = _a[_i], key = _b[0], iconString = _b[1];
                        return [4 /*yield*/, (0, getDynamicIcon_1.getDynamicIcon)(iconString)];
                    case 2:
                        icon = _c.sent();
                        if (icon) {
                            loaded[key] = icon;
                        }
                        _c.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        setLoadedIcons(loaded);
                        return [2 /*return*/];
                }
            });
        }); };
        if (Object.keys(iconsToLoad).length > 0) {
            loadIcons();
        }
    }, [final.facebookIcon, final.instagramIcon, final.twitterIcon, final.xIcon, final.youtubeIcon, final.linkedinIcon, final.githubIcon, final.emailIcon, final.phoneIcon, final.addressIcon, final.socialMedia]);
    // Get icon - either from prop (ReactNode), dynamic loaded icon, or default
    var getIcon = function (iconProp, iconKey, defaultIcon) {
        if (isReactElement(iconProp)) {
            return iconProp;
        }
        if (typeof iconProp === 'string' && loadedIcons[iconKey]) {
            return loadedIcons[iconKey];
        }
        return defaultIcon;
    };
    // Build social links array
    var socialLinks = react_1.default.useMemo(function () {
        var links = [];
        if (final.facebookUrl) {
            links.push({
                url: final.facebookUrl,
                icon: getIcon(final.facebookIcon, 'facebook', react_1.default.createElement(pi_1.PiFacebookLogo, null)),
                label: 'Facebook'
            });
        }
        if (final.instagramUrl) {
            links.push({
                url: final.instagramUrl,
                icon: getIcon(final.instagramIcon, 'instagram', react_1.default.createElement(pi_1.PiInstagramLogo, null)),
                label: 'Instagram'
            });
        }
        if (final.twitterUrl) {
            links.push({
                url: final.twitterUrl,
                icon: getIcon(final.twitterIcon, 'twitter', react_1.default.createElement(pi_1.PiTwitterLogo, null)),
                label: 'Twitter'
            });
        }
        if (final.xUrl) {
            links.push({
                url: final.xUrl,
                icon: getIcon(final.xIcon, 'x', react_1.default.createElement(pi_1.PiTwitterLogo, null)),
                label: 'X'
            });
        }
        if (final.youtubeUrl) {
            links.push({
                url: final.youtubeUrl,
                icon: getIcon(final.youtubeIcon, 'youtube', react_1.default.createElement(pi_1.PiYoutubeLogo, null)),
                label: 'YouTube'
            });
        }
        if (final.linkedinUrl) {
            links.push({
                url: final.linkedinUrl,
                icon: getIcon(final.linkedinIcon, 'linkedin', react_1.default.createElement(pi_1.PiLinkedinLogo, null)),
                label: 'LinkedIn'
            });
        }
        if (final.githubUrl) {
            links.push({
                url: final.githubUrl,
                icon: getIcon(final.githubIcon, 'github', react_1.default.createElement(pi_1.PiGithubLogo, null)),
                label: 'GitHub'
            });
        }
        // Add socialMedia object links
        if (final.socialMedia) {
            Object.entries(final.socialMedia).forEach(function (_a) {
                var key = _a[0], value = _a[1];
                if (typeof value === 'string' && value.startsWith('http')) {
                    var iconKey = "socialMedia_".concat(key);
                    var icon = loadedIcons[iconKey] || react_1.default.createElement(pi_1.PiGithubLogo, null);
                    links.push({
                        url: value,
                        icon: icon,
                        label: key.charAt(0).toUpperCase() + key.slice(1)
                    });
                }
            });
        }
        return links;
    }, [
        final.facebookUrl, final.instagramUrl, final.twitterUrl, final.xUrl, final.youtubeUrl, final.linkedinUrl, final.githubUrl,
        final.facebookIcon, final.instagramIcon, final.twitterIcon, final.xIcon, final.youtubeIcon, final.linkedinIcon, final.githubIcon,
        final.socialMedia, loadedIcons
    ]);
    var legalLinks = __spreadArray(__spreadArray(__spreadArray([], (final.privacyUrl ? [{ url: final.privacyUrl, text: final.privacyText }] : []), true), (final.termsUrl ? [{ url: final.termsUrl, text: final.termsText }] : []), true), (final.cookiesUrl ? [{ url: final.cookiesUrl, text: final.cookiesText }] : []), true);
    var getCopyrightText = function () {
        if (final.copyrightText)
            return final.copyrightText;
        var text = '';
        if (final.showYear)
            text += "\u00A9 ".concat(currentYear, " ");
        text += final.companyName || 'Company';
        if (final.showRightsReserved)
            text += '. All rights reserved.';
        return text;
    };
    // Get layout classes
    var getLayoutClasses = function () {
        var classes = ['funui-footer'];
        if (final.layout)
            classes.push("funui-footer--".concat(final.layout));
        if (final.funcss)
            classes.push(final.funcss);
        return classes.join(' ');
    };
    return (react_1.default.createElement("footer", { className: getLayoutClasses(), style: {
            backgroundColor: final.bg,
            color: final.textColor,
            padding: final.padding,
        }, "data-testid": "footer" },
        react_1.default.createElement("div", { className: "funui-footer__container ".concat(final.containerClass || ''), style: {
                maxWidth: final.maxWidth,
                '--link-hover-color': final.linkHoverColor,
            } },
            react_1.default.createElement("div", { className: "funui-footer__top ".concat(final.topSectionClass || ''), "data-testid": "footer-top" },
                react_1.default.createElement("div", { className: "funui-footer__brand" },
                    (final.logo || final.logoUrl) && (react_1.default.createElement("a", { href: final.logoLinkUrl || '/', className: "funui-footer__logo-link ".concat(final.logoClass || ''), "aria-label": final.companyName || 'Home' }, final.logo ? (react_1.default.createElement("div", { className: "funui-footer__logo-custom" }, final.logo)) : final.logoUrl ? (react_1.default.createElement("img", { src: final.logoUrl, width: final.logoSize || 100, alt: "".concat(final.companyName || 'Company', " logo"), className: "funui-footer__logo-image", loading: "lazy" })) : null)),
                    final.description && (react_1.default.createElement("div", { className: "funui-footer__description ".concat(final.descriptionClass || ''), "data-testid": "footer-description" },
                        react_1.default.createElement(Text_1.default, { variant: final.descriptionVariant || "", text: typeof final.description === 'string' ? (react_1.default.createElement("p", null, final.description)) : (final.description) }))),
                    final.showContactInfo && (final.email || final.phone || final.address) && (react_1.default.createElement("div", { className: "funui-footer__contact", "data-testid": "footer-contact" },
                        final.email && (react_1.default.createElement("div", { className: "funui-footer__contact-item" },
                            react_1.default.createElement("span", { className: "funui-footer__contact-icon" }, getIcon(final.emailIcon, 'email', react_1.default.createElement(pi_1.PiEnvelope, null))),
                            react_1.default.createElement("a", { href: "mailto:".concat(final.email), className: "funui-footer__contact-link" }, final.email))),
                        final.phone && (react_1.default.createElement("div", { className: "funui-footer__contact-item" },
                            react_1.default.createElement("span", { className: "funui-footer__contact-icon" }, getIcon(final.phoneIcon, 'phone', react_1.default.createElement(pi_1.PiPhone, null))),
                            react_1.default.createElement("a", { href: "tel:".concat(final.phone), className: "funui-footer__contact-link" }, final.phone))),
                        final.address && (react_1.default.createElement("div", { className: "funui-footer__contact-item" },
                            react_1.default.createElement("span", { className: "funui-footer__contact-icon" }, getIcon(final.addressIcon, 'address', react_1.default.createElement(pi_1.PiMapPin, null))),
                            react_1.default.createElement("span", { className: "funui-footer__contact-text" }, final.address))))),
                    socialLinks.length > 0 && (react_1.default.createElement("div", { className: "funui-footer__socials ".concat(final.socialContainerClass || ''), "data-testid": "footer-socials" }, socialLinks.map(function (social, index) { return (react_1.default.createElement("a", { key: index, href: social.url, target: "_blank", rel: "noopener noreferrer", "aria-label": social.label, className: "funui-footer__social-link" },
                        react_1.default.createElement("span", { className: "funui-footer__social-icon" }, react_1.default.isValidElement(social.icon)
                            ? react_1.default.cloneElement(social.icon, {
                                size: final.socialIconSize || 20
                            })
                            : social.icon),
                        react_1.default.createElement("span", { className: "funui-footer__social-label sr-only" }, social.label))); })))),
                sections.length > 0 && sections.map(function (section, sectionIndex) { return (react_1.default.createElement("div", { key: sectionIndex, className: "funui-footer__section", "data-testid": "footer-section-".concat(sectionIndex) },
                    react_1.default.createElement("div", { className: "funui-footer__section-title ".concat(final.sectionTitleClass || '') }, section.title),
                    react_1.default.createElement("ul", { className: "funui-footer__links" }, section.links.map(function (link, linkIndex) { return (react_1.default.createElement("li", { key: linkIndex, className: "funui-footer__link-item" },
                        react_1.default.createElement("a", { href: link.url, target: link.external ? '_blank' : undefined, rel: link.external ? 'noopener noreferrer' : undefined, className: "funui-footer__link ".concat(final.linkClass || '') },
                            link.icon && (react_1.default.createElement("span", { className: "funui-footer__link-icon" }, link.icon)),
                            react_1.default.createElement("span", { className: "funui-footer__link-text" }, link.label)))); })))); }),
                final.children && (react_1.default.createElement("div", { className: "funui-footer__children" }, final.children))),
            final.showDivider && (react_1.default.createElement("div", { className: "funui-footer__divider", "data-testid": "footer-divider" })),
            react_1.default.createElement("div", { className: "funui-footer__bottom ".concat(final.bottomSectionClass || ''), "data-testid": "footer-bottom" },
                react_1.default.createElement("div", { className: "funui-footer__copyright" }, getCopyrightText()),
                legalLinks.length > 0 && (react_1.default.createElement("div", { className: "funui-footer__legal ".concat(final.legalLinksClass || ''), "data-testid": "footer-legal" }, legalLinks.map(function (link, index) { return (react_1.default.createElement("a", { key: index, href: link.url, className: "funui-footer__legal-link" }, link.text)); })))))));
};
exports.default = Footer;
