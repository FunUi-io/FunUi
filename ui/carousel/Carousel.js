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
    var _b = _a.scrollNumber, scrollNumber = _b === void 0 ? 320 : _b, _c = _a.gap, gap = _c === void 0 ? 0.5 : _c, _d = _a.funcss, funcss = _d === void 0 ? '' : _d, children = _a.children;
    var scrollRef = (0, react_1.useRef)(null);
    var scroll = function (direction) {
        var container = scrollRef.current;
        if (!container)
            return;
        container.scrollBy({
            left: direction === 'left' ? -scrollNumber : scrollNumber,
            behavior: 'smooth',
        });
    };
    var _e = (0, react_1.useState)(false), isPhone = _e[0], setisPhone = _e[1];
    (0, react_1.useEffect)(function () {
        if ((0, Functions_1.isTouchDevice)()) {
            setisPhone(true);
        }
        else {
            setisPhone(false);
        }
    }, []);
    return (react_1.default.createElement(RowFlex_1.default, { gap: 1, wrap: "nowrap", alignItems: "center" },
        !isPhone &&
            react_1.default.createElement("div", null,
                react_1.default.createElement(Circle_1.default, { onClick: function () { return scroll('left'); } },
                    react_1.default.createElement(pi_1.PiCaretLeft, { size: 24 }))),
        react_1.default.createElement("div", { ref: scrollRef, className: "carousel-container scrollbar-hide w-full ".concat(funcss), style: { width: "100%", gap: gap + "rem" } }, react_1.default.Children.map(children, function (child) { return (react_1.default.createElement("div", { className: "carousel-item" },
            react_1.default.createElement("div", { className: "carousel-card" }, child))); })),
        !isPhone &&
            react_1.default.createElement("div", null,
                react_1.default.createElement(Circle_1.default, { onClick: function () { return scroll('right'); } },
                    react_1.default.createElement(pi_1.PiCaretRight, { size: 24 })))));
};
exports.default = Carousel;
