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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var Dropdown = function (_a) {
    var _b = _a.direction, direction = _b === void 0 ? 'dropdown' : _b, _c = _a.position, position = _c === void 0 ? 'left' : _c, button = _a.button, items = _a.items, _d = _a.hoverable, hoverable = _d === void 0 ? true : _d, _e = _a.openOnHover, openOnHover = _e === void 0 ? true : _e, _f = _a.className, className = _f === void 0 ? '' : _f;
    var containerRef = (0, react_1.useRef)(null);
    var _g = (0, react_1.useState)(false), open = _g[0], setOpen = _g[1];
    var containerClass = "".concat(direction, " ").concat(position, " ").concat(className).trim();
    var menuClass = "drop-menu".concat(hoverable ? ' item-hoverable' : '');
    (0, react_1.useEffect)(function () {
        if (openOnHover)
            return;
        var handleClickOutside = function (event) {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return function () { return document.removeEventListener('mousedown', handleClickOutside); };
    }, [openOnHover]);
    var showMenu = openOnHover || open;
    return (react_1.default.createElement("div", { ref: containerRef, className: containerClass, onMouseEnter: function () { return openOnHover && setOpen(true); }, onMouseLeave: function () { return openOnHover && setOpen(false); } },
        react_1.default.createElement("div", { className: "drop-button", onClick: function () { return !openOnHover && setOpen(!open); }, style: { cursor: !openOnHover ? 'pointer' : undefined } }, button),
        react_1.default.createElement("div", { className: menuClass, style: { display: showMenu ? 'block' : 'none' } }, items.map(function (item, index) { return (react_1.default.createElement("div", { key: index, className: "drop-item", onClick: function () {
                var _a;
                (_a = item.onClick) === null || _a === void 0 ? void 0 : _a.call(item);
                if (!openOnHover)
                    setOpen(false);
            } }, item.label)); }))));
};
exports.default = Dropdown;
