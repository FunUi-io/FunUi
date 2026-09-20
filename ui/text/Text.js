'use client';
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
var componentUtils_1 = require("../../utils/componentUtils");
var Text = function (_a) {
    var _b;
    var id = _a.id, bg = _a.bg, color = _a.color, children = _a.children, hoverBg = _a.hoverBg, hoverText = _a.hoverText, text = _a.text, funcss = _a.funcss, emp = _a.emp, bold = _a.bold, block = _a.block, body = _a.body, article = _a.article, light = _a.light, lighter = _a.lighter, italic = _a.italic, weight = _a.weight, underline = _a.underline, align = _a.align, lineHeight = _a.lineHeight, letterSpacing = _a.letterSpacing, uppercase = _a.uppercase, lowercase = _a.lowercase, capitalize = _a.capitalize, textDecoration = _a.textDecoration, textTransform = _a.textTransform, whiteSpace = _a.whiteSpace, wordBreak = _a.wordBreak, fontFamily = _a.fontFamily, truncate = _a.truncate, textShadow = _a.textShadow, textAlign = _a.textAlign, customStyles = _a.customStyles, monospace = _a.monospace, quote = _a.quote, opacity = _a.opacity, _c = _a.variant, variant = _c === void 0 ? '' : _c, size = _a.size, margin = _a.margin, style = _a.style, dangerouslySetInnerHTML = _a.dangerouslySetInnerHTML, padding = _a.padding, rest = __rest(_a, ["id", "bg", "color", "children", "hoverBg", "hoverText", "text", "funcss", "emp", "bold", "block", "body", "article", "light", "lighter", "italic", "weight", "underline", "align", "lineHeight", "letterSpacing", "uppercase", "lowercase", "capitalize", "textDecoration", "textTransform", "whiteSpace", "wordBreak", "fontFamily", "truncate", "textShadow", "textAlign", "customStyles", "monospace", "quote", "opacity", "variant", "size", "margin", "style", "dangerouslySetInnerHTML", "padding"]);
    // Use component configuration (simplified - let the hook handle empty variant)
    var mergeWithLocal = (0, componentUtils_1.useComponentConfiguration)('Text', variant).mergeWithLocal;
    // Create local props object - include ALL props
    var localProps = __assign({ bg: bg, color: color, hoverBg: hoverBg, hoverText: hoverText, funcss: funcss, emp: emp, bold: bold, block: block, body: body, article: article, light: light, lighter: lighter, italic: italic, weight: weight, underline: underline, align: align, lineHeight: lineHeight, letterSpacing: letterSpacing, uppercase: uppercase, lowercase: lowercase, capitalize: capitalize, textDecoration: textDecoration, textTransform: textTransform, whiteSpace: whiteSpace, wordBreak: wordBreak, fontFamily: fontFamily, truncate: truncate, textShadow: textShadow, textAlign: textAlign, monospace: monospace, quote: quote, opacity: opacity, size: size, margin: margin, style: style, dangerouslySetInnerHTML: dangerouslySetInnerHTML, padding: padding }, rest);
    // Merge with config - LOCAL PROPS OVERRIDE CONFIG (consistent with Button)
    var mergedProps = mergeWithLocal(localProps).props;
    // Extract final values - use NULLISH COALESCING like Button component
    var final = {
        // Use local props first, fallback to merged props
        bg: bg !== null && bg !== void 0 ? bg : mergedProps.bg,
        color: color !== null && color !== void 0 ? color : mergedProps.color,
        hoverBg: hoverBg !== null && hoverBg !== void 0 ? hoverBg : mergedProps.hoverBg,
        hoverText: hoverText !== null && hoverText !== void 0 ? hoverText : mergedProps.hoverText,
        funcss: funcss !== null && funcss !== void 0 ? funcss : mergedProps.funcss,
        emp: emp !== null && emp !== void 0 ? emp : mergedProps.emp,
        bold: bold !== null && bold !== void 0 ? bold : mergedProps.bold,
        block: block !== null && block !== void 0 ? block : mergedProps.block,
        body: body !== null && body !== void 0 ? body : mergedProps.body,
        article: article !== null && article !== void 0 ? article : mergedProps.article,
        light: light !== null && light !== void 0 ? light : mergedProps.light,
        lighter: lighter !== null && lighter !== void 0 ? lighter : mergedProps.lighter,
        italic: italic !== null && italic !== void 0 ? italic : mergedProps.italic,
        weight: weight !== null && weight !== void 0 ? weight : mergedProps.weight,
        underline: underline !== null && underline !== void 0 ? underline : mergedProps.underline,
        align: align !== null && align !== void 0 ? align : mergedProps.align,
        lineHeight: lineHeight !== null && lineHeight !== void 0 ? lineHeight : mergedProps.lineHeight,
        letterSpacing: letterSpacing !== null && letterSpacing !== void 0 ? letterSpacing : mergedProps.letterSpacing,
        uppercase: uppercase !== null && uppercase !== void 0 ? uppercase : mergedProps.uppercase,
        lowercase: lowercase !== null && lowercase !== void 0 ? lowercase : mergedProps.lowercase,
        capitalize: capitalize !== null && capitalize !== void 0 ? capitalize : mergedProps.capitalize,
        textDecoration: textDecoration !== null && textDecoration !== void 0 ? textDecoration : mergedProps.textDecoration,
        textTransform: textTransform !== null && textTransform !== void 0 ? textTransform : mergedProps.textTransform,
        whiteSpace: whiteSpace !== null && whiteSpace !== void 0 ? whiteSpace : mergedProps.whiteSpace,
        wordBreak: wordBreak !== null && wordBreak !== void 0 ? wordBreak : mergedProps.wordBreak,
        fontFamily: fontFamily !== null && fontFamily !== void 0 ? fontFamily : mergedProps.fontFamily,
        truncate: truncate !== null && truncate !== void 0 ? truncate : mergedProps.truncate,
        textShadow: textShadow !== null && textShadow !== void 0 ? textShadow : mergedProps.textShadow,
        textAlign: textAlign !== null && textAlign !== void 0 ? textAlign : mergedProps.textAlign,
        monospace: monospace !== null && monospace !== void 0 ? monospace : mergedProps.monospace,
        quote: quote !== null && quote !== void 0 ? quote : mergedProps.quote,
        opacity: opacity !== null && opacity !== void 0 ? opacity : mergedProps.opacity,
        size: (_b = size !== null && size !== void 0 ? size : mergedProps.size) !== null && _b !== void 0 ? _b : 'base',
        margin: margin !== null && margin !== void 0 ? margin : mergedProps.margin,
        text: text !== null && text !== void 0 ? text : mergedProps.text,
        padding: padding !== null && padding !== void 0 ? padding : mergedProps.padding,
        dangerouslySetInnerHTML: dangerouslySetInnerHTML !== null && dangerouslySetInnerHTML !== void 0 ? dangerouslySetInnerHTML : mergedProps.dangerouslySetInnerHTML,
    };
    // If margin is provided, force block display
    var shouldBeBlock = final.block || !!final.margin;
    var Tag = shouldBeBlock ? 'div' : 'span';
    var sizeClass = "".concat(final.size === 'h1' ? "h1" :
        final.size === 'h2' ? "h2" :
            final.size === 'h3' ? "h3" :
                final.size === 'h4' ? "h4" :
                    final.size === 'h5' ? "h5" :
                        final.size === 'h6' ? "h6" :
                            "text-".concat(final.size));
    var mergedStyles = __assign(__assign(__assign({ display: shouldBeBlock ? 'block' : undefined, fontWeight: final.bold ? 'bold' : final.weight ? final.weight : undefined, lineHeight: final.lineHeight, letterSpacing: final.letterSpacing, textTransform: final.textTransform, textDecoration: final.textDecoration, fontFamily: final.fontFamily, textShadow: final.textShadow, textAlign: final.textAlign, whiteSpace: final.whiteSpace, wordBreak: final.wordBreak, margin: final.margin, padding: final.padding }, customStyles), style), (final.truncate
        ? {
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: final.truncate,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
        }
        : {}));
    var classNames = [
        final.funcss || '',
        sizeClass,
        final.color ? " text-".concat(final.color, " ") : '',
        final.align ? " text-".concat(final.align, " ") : '',
        final.monospace ? 'monospace' : '',
        final.bg || '',
        final.hoverText ? "hover-text-".concat(final.hoverText) : '',
        final.hoverBg ? "hover-".concat(final.hoverBg) : '',
        final.light ? 'lightText' : final.lighter ? 'lighterText' : '',
        final.italic ? 'italicText' : '',
        final.underline ? 'underlineText' : '',
        final.body ? 'body' : '',
        final.article ? 'article' : '',
        final.emp ? 'emp' : '',
        final.bold ? 'bold' : '',
        final.uppercase ? 'uppercase' : '',
        final.lowercase ? 'lowercase' : '',
        final.capitalize ? 'capitalize' : '',
        final.opacity ? 'opacity-' + final.opacity : '',
    ]
        .filter(Boolean)
        .join(' ');
    // Handle dangerouslySetInnerHTML
    var hasDangerousHTML = Boolean(final.dangerouslySetInnerHTML);
    var dangerousHTMLContent = hasDangerousHTML
        ? (typeof final.dangerouslySetInnerHTML === 'boolean'
            ? { __html: String(final.text || '') }
            : final.dangerouslySetInnerHTML)
        : null;
    // KEY FIX: Don't pass children when using dangerouslySetInnerHTML
    if (hasDangerousHTML) {
        return (react_1.default.createElement(Tag, __assign({ id: id, className: classNames, style: mergedStyles, dangerouslySetInnerHTML: dangerousHTMLContent }, rest)));
    }
    // Normal render without dangerouslySetInnerHTML
    return (react_1.default.createElement(Tag, __assign({ id: id, className: classNames, style: mergedStyles }, rest),
        final.quote && (react_1.default.createElement("div", null,
            react_1.default.createElement(pi_1.PiQuotesLight, null))),
        children, final === null || final === void 0 ? void 0 :
        final.text));
};
exports.default = Text;
