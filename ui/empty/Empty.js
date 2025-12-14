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
exports.default = Empty;
var React = __importStar(require("react"));
var Button_1 = __importDefault(require("../button/Button"));
var pi_1 = require("react-icons/pi");
var Text_1 = __importDefault(require("../text/Text"));
var Flex_1 = __importDefault(require("../flex/Flex"));
function Empty(_a) {
    var header = _a.header, _b = _a.title, title = _b === void 0 ? 'No Data Available' : _b, _c = _a.titleSize, titleSize = _c === void 0 ? 'xl' : _c, content = _a.content, _d = _a.description, description = _d === void 0 ? "There's nothing to display at the moment. Try adjusting your filters or check back later." : _d, _e = _a.descriptionSize, descriptionSize = _e === void 0 ? 'md' : _e, action = _a.action, _f = _a.ctaText, ctaText = _f === void 0 ? 'Go Back' : _f, _g = _a.ctaIcon, ctaIcon = _g === void 0 ? React.createElement(pi_1.PiArrowLeft, null) : _g, ctaOnClick = _a.ctaOnClick, _h = _a.ctaBg, ctaBg = _h === void 0 ? 'primary' : _h, _j = _a.showCta, showCta = _j === void 0 ? true : _j;
    var handleCtaClick = function () {
        if (ctaOnClick) {
            ctaOnClick();
        }
        else {
            window.history.back();
        }
    };
    return (React.createElement("div", null,
        React.createElement("div", null,
            React.createElement("div", { className: "central flex p-3" },
                React.createElement("div", { className: "text-center width-600-max" },
                    React.createElement(Flex_1.default, { gap: 1, direction: "column", fit: true },
                        React.createElement("div", null, header ? (header) : (React.createElement("div", null,
                            React.createElement(Text_1.default, { text: title, size: titleSize, block: true })))),
                        React.createElement("div", { className: "article" }, content ? (content) : (React.createElement(Text_1.default, { article: true, opacity: 4, text: description, size: descriptionSize, block: true }))),
                        showCta && (React.createElement("div", null, action ? (action) : (React.createElement("div", { className: "row-flex gap", style: { justifyContent: 'center', gap: '0.4rem' } },
                            React.createElement(Button_1.default, { startIcon: ctaIcon, bg: ctaBg, onClick: handleCtaClick }, ctaText)))))))))));
}
