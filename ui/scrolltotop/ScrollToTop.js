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
var fa_1 = require("react-icons/fa");
var View_1 = __importDefault(require("../view/View"));
var ScrollToTop = function () {
    var _a = (0, react_1.useState)(false), visible = _a[0], setVisible = _a[1];
    // Show button after scrolling down 200px
    (0, react_1.useEffect)(function () {
        var toggleVisibility = function () {
            setVisible(window.scrollY > 200);
        };
        window.addEventListener('scroll', toggleVisibility);
        return function () { return window.removeEventListener('scroll', toggleVisibility); };
    }, []);
    var scrollToTop = function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    if (!visible)
        return null;
    return (react_1.default.createElement(View_1.default, { onClick: scrollToTop, funcss: 'round-edge primary pointer', height: '40px', width: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'fixed', bottom: '20px', right: '20px', zIndex: 200 },
        react_1.default.createElement(fa_1.FaCaretUp, { size: 24 })));
};
exports.default = ScrollToTop;
