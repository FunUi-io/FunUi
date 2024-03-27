"use strict";
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
var react_1 = __importDefault(require("react"));
var pi_1 = require("react-icons/pi");
var Text = function (_a) {
    var id = _a.id, size = _a.size, bg = _a.bg, color = _a.color, children = _a.children, hoverBg = _a.hoverBg, hoverText = _a.hoverText, text = _a.text, heading = _a.heading, funcss = _a.funcss, emp = _a.emp, bold = _a.bold, block = _a.block, body = _a.body, article = _a.article, light = _a.light, lighter = _a.lighter, italic = _a.italic, underline = _a.underline, align = _a.align, lineHeight = _a.lineHeight, letterSpacing = _a.letterSpacing, uppercase = _a.uppercase, lowercase = _a.lowercase, capitalize = _a.capitalize, textDecoration = _a.textDecoration, textTransform = _a.textTransform, whiteSpace = _a.whiteSpace, wordBreak = _a.wordBreak, fontFamily = _a.fontFamily, textShadow = _a.textShadow, textAlign = _a.textAlign, customStyles = _a.customStyles, monospace = _a.monospace, quote = _a.quote, rest = __rest(_a, ["id", "size", "bg", "color", "children", "hoverBg", "hoverText", "text", "heading", "funcss", "emp", "bold", "block", "body", "article", "light", "lighter", "italic", "underline", "align", "lineHeight", "letterSpacing", "uppercase", "lowercase", "capitalize", "textDecoration", "textTransform", "whiteSpace", "wordBreak", "fontFamily", "textShadow", "textAlign", "customStyles", "monospace", "quote"]);
    var mergedStyles = __assign({ display: block ? 'block' : undefined, fontWeight: bold ? 'bold' : undefined, lineHeight: lineHeight ? lineHeight : undefined, letterSpacing: letterSpacing ? letterSpacing : undefined, textTransform: textTransform ? textTransform : undefined, textDecoration: textDecoration ? textDecoration : undefined, fontFamily: fontFamily ? fontFamily : undefined, textShadow: textShadow ? textShadow : undefined, textAlign: textAlign ? textAlign : undefined, whiteSpace: whiteSpace ? whiteSpace : undefined, wordBreak: wordBreak ? wordBreak : undefined, transform: customStyles === null || customStyles === void 0 ? void 0 : customStyles.transform }, customStyles);
    var classNames = [
        size ? "text-".concat(size) : '',
        color ? "text-".concat(color) : '',
        align ? "text-".concat(align) : '',
        monospace ? 'monospace' : '',
        bg ? bg : '',
        hoverText ? "hover-text-".concat(hoverText) : '',
        hoverBg ? "hover-".concat(hoverBg) : '',
        light ? 'lightText' : lighter ? 'lighterText' : '',
        heading ? heading : '',
        italic ? 'italicText' : '',
        underline ? 'underlineText' : '',
        body ? 'body' : '',
        article ? 'article' : '',
        funcss ? funcss : '',
        emp ? 'emp' : '',
        bold ? 'bold' : '',
        uppercase ? 'uppercase' : '',
        lowercase ? 'lowercase' : '',
        capitalize ? 'capitalize' : '',
    ].filter(Boolean).join(' ');
    var HeadingTag = heading ? heading : block ? "div" : 'span';
    return (react_1.default.createElement(HeadingTag, __assign({ id: id, className: classNames, style: mergedStyles }, rest),
        quote && react_1.default.createElement("div", { className: "" },
            react_1.default.createElement(pi_1.PiQuotesLight, null)),
        children,
        text));
};
exports.default = Text;
