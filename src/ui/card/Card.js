"use strict";
'use client';
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Card;
var react_1 = __importDefault(require("react"));
var CardHeader_1 = __importDefault(require("./CardHeader"));
var CardBody_1 = __importDefault(require("./CardBody"));
var CardFooter_1 = __importDefault(require("./CardFooter"));
function Card(_a) {
    var color = _a.color, bg = _a.bg, width = _a.width, height = _a.height, minHeight = _a.minHeight, minWidth = _a.minWidth, margin = _a.margin, padding = _a.padding, funcss = _a.funcss, children = _a.children, roundEdge = _a.roundEdge, maxHeight = _a.maxHeight, maxWidth = _a.maxWidth, horizontal = _a.horizontal, id = _a.id, header = _a.header, body = _a.body, footer = _a.footer, noGap = _a.noGap, fab = _a.fab, image = _a.image, shadowless = _a.shadowless, flat = _a.flat, responsiveMedium = _a.responsiveMedium, xl = _a.xl, responsiveSmall = _a.responsiveSmall, style = _a.style, rest = __rest(_a, ["color", "bg", "width", "height", "minHeight", "minWidth", "margin", "padding", "funcss", "children", "roundEdge", "maxHeight", "maxWidth", "horizontal", "id", "header", "body", "footer", "noGap", "fab", "image", "shadowless", "flat", "responsiveMedium", "xl", "responsiveSmall", "style"]);
    return (react_1.default.createElement("div", __assign({ id: id || '', className: "\n      card \n      card_flex\n      ".concat(noGap ? 'no-gap' : '', " \n      ").concat(xl ? 'xl' : '', " \n      text-").concat(color || '', " \n      ").concat(bg || '', " \n      ").concat(funcss || '', " \n      ").concat(roundEdge ? 'round-edge' : '', " \n      ").concat(shadowless ? 'shadowless' : '', " \n      ").concat(flat ? 'flat' : '', " \n      ").concat(horizontal ? 'horizontalCard' : '', "\n      ").concat(responsiveMedium ? 'responsiveMedium' : '', "\n      ").concat(responsiveSmall ? 'responsiveSmall' : '', "\n      \n      "), style: __assign({ width: "".concat(width || ''), height: "".concat(height || ''), minHeight: "".concat(minHeight || ''), minWidth: "".concat(minWidth || ''), maxHeight: maxHeight || '', maxWidth: maxWidth || '', margin: "".concat(margin || ''), padding: "".concat(padding || '') }, style) }, rest),
        image ? react_1.default.createElement("div", { className: "".concat(fab ? 'relative' : '') },
            image,
            " ",
            fab ? fab : '') : '',
        header && !horizontal ? react_1.default.createElement(CardHeader_1.default, null, header) : '',
        body ?
            react_1.default.createElement("div", null,
                horizontal ? react_1.default.createElement(CardHeader_1.default, null, header) : '',
                react_1.default.createElement(CardBody_1.default, null,
                    "  ",
                    body,
                    " "),
                horizontal ? react_1.default.createElement(CardFooter_1.default, null, footer) : '')
            : '',
        children && react_1.default.createElement(CardBody_1.default, null, children),
        footer && !horizontal ? react_1.default.createElement(CardFooter_1.default, null, footer) : ''));
}
