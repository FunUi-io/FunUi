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
exports.AccordionItem = void 0;
var react_1 = __importStar(require("react"));
var pi_1 = require("react-icons/pi");
var RowFlex_1 = __importDefault(require("../specials/RowFlex"));
var AccordionItem = function (_a) {
    var icon = _a.icon, title = _a.title, content = _a.content, isOpen = _a.isOpen, onToggle = _a.onToggle, _b = _a.itemClass, itemClass = _b === void 0 ? '' : _b, _c = _a.titleClass, titleClass = _c === void 0 ? '' : _c, _d = _a.iconClass, iconClass = _d === void 0 ? '' : _d, _e = _a.contentClass, contentClass = _e === void 0 ? '' : _e, _f = _a.activeClass, activeClass = _f === void 0 ? '' : _f;
    return (react_1.default.createElement("div", { className: "accordion-item ".concat(itemClass, " ").concat(isOpen ? activeClass : '') },
        react_1.default.createElement("div", { className: "accordion-header ".concat(titleClass), onClick: onToggle, role: "button", "aria-expanded": isOpen },
            react_1.default.createElement(RowFlex_1.default, { alignItems: "center", gap: 0.6 },
                icon && react_1.default.createElement("div", { style: { lineHeight: 0 } }, icon),
                react_1.default.createElement("div", { className: "col fit" }, title)),
            react_1.default.createElement("div", { style: { lineHeight: 0 }, className: "".concat(iconClass, " ").concat(isOpen ? 'accordion-rotated' : '') },
                react_1.default.createElement(pi_1.PiCaretDown, null))),
        react_1.default.createElement("div", { className: "accordion-content ".concat(contentClass, " ").concat(isOpen ? 'open' : '') },
            react_1.default.createElement("div", { className: "accordion-inner" }, content))));
};
exports.AccordionItem = AccordionItem;
var Accordion = function (_a) {
    var _b;
    var items = _a.items, _c = _a.allowMultiple, allowMultiple = _c === void 0 ? false : _c, _d = _a.defaultOpenIndexes, defaultOpenIndexes = _d === void 0 ? [] : _d, itemClass = _a.itemClass, titleClass = _a.titleClass, iconClass = _a.iconClass, contentClass = _a.contentClass, activeClass = _a.activeClass;
    var _e = (0, react_1.useState)(allowMultiple ? defaultOpenIndexes : [(_b = defaultOpenIndexes[0]) !== null && _b !== void 0 ? _b : -1]), openIndexes = _e[0], setOpenIndexes = _e[1];
    var toggleIndex = function (index) {
        if (allowMultiple) {
            if (openIndexes.includes(index)) {
                setOpenIndexes(openIndexes.filter(function (i) { return i !== index; }));
            }
            else {
                setOpenIndexes(__spreadArray(__spreadArray([], openIndexes, true), [index], false));
            }
        }
        else {
            setOpenIndexes(openIndexes.includes(index) ? [] : [index]);
        }
    };
    return (react_1.default.createElement("div", { className: "accordion" }, items.map(function (item, index) { return (react_1.default.createElement(exports.AccordionItem, { key: index, index: index, icon: item.icon, title: item.title, content: item.content, isOpen: openIndexes.includes(index), onToggle: function () { return toggleIndex(index); }, itemClass: itemClass, titleClass: titleClass, iconClass: iconClass, contentClass: contentClass, activeClass: activeClass })); })));
};
exports.default = Accordion;
