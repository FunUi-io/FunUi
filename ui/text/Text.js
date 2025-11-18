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
var react_1 = __importDefault(require("react"));
var pi_1 = require("react-icons/pi");
var componentUtils_1 = require("../../utils/componentUtils");
var Text = function (_a) {
    var id = _a.id, bg = _a.bg, color = _a.color, children = _a.children, hoverBg = _a.hoverBg, hoverText = _a.hoverText, text = _a.text, funcss = _a.funcss, emp = _a.emp, bold = _a.bold, block = _a.block, body = _a.body, article = _a.article, light = _a.light, lighter = _a.lighter, italic = _a.italic, weight = _a.weight, underline = _a.underline, align = _a.align, lineHeight = _a.lineHeight, letterSpacing = _a.letterSpacing, uppercase = _a.uppercase, lowercase = _a.lowercase, capitalize = _a.capitalize, textDecoration = _a.textDecoration, textTransform = _a.textTransform, whiteSpace = _a.whiteSpace, wordBreak = _a.wordBreak, fontFamily = _a.fontFamily, truncate = _a.truncate, textShadow = _a.textShadow, textAlign = _a.textAlign, customStyles = _a.customStyles, monospace = _a.monospace, quote = _a.quote, opacity = _a.opacity, _b = _a.variant, variant = _b === void 0 ? '' : _b, _c = _a.size, size = _c === void 0 ? 'base' : _c, margin = _a.margin, padding = _a.padding, rest = __rest(_a, ["id", "bg", "color", "children", "hoverBg", "hoverText", "text", "funcss", "emp", "bold", "block", "body", "article", "light", "lighter", "italic", "weight", "underline", "align", "lineHeight", "letterSpacing", "uppercase", "lowercase", "capitalize", "textDecoration", "textTransform", "whiteSpace", "wordBreak", "fontFamily", "truncate", "textShadow", "textAlign", "customStyles", "monospace", "quote", "opacity", "variant", "size", "margin", "padding"]);
    // Only use component config if variant is provided and not empty
    var shouldUseConfig = variant !== undefined && variant !== '';
    // Use the component config hook only when needed
    var mergeWithLocal = (0, componentUtils_1.useComponentConfiguration)('Text', shouldUseConfig ? variant : undefined).mergeWithLocal;
    // Create local props object
    var localProps = __assign({ bg: bg, color: color, funcss: funcss, emp: emp, bold: bold, block: block, body: body, article: article, light: light, lighter: lighter, italic: italic, weight: weight, underline: underline, align: align, lineHeight: lineHeight, letterSpacing: letterSpacing, uppercase: uppercase, lowercase: lowercase, capitalize: capitalize, textDecoration: textDecoration, textTransform: textTransform, whiteSpace: whiteSpace, wordBreak: wordBreak, fontFamily: fontFamily, truncate: truncate, textShadow: textShadow, textAlign: textAlign, monospace: monospace, quote: quote, opacity: opacity, size: size, margin: margin, padding: padding }, rest);
    // Merge config with local props - local props override config
    var mergedProps = (shouldUseConfig
        ? mergeWithLocal(localProps)
        : { props: localProps }).props;
    // Extract final values - local props take precedence, handle empty strings properly
    var final = {
        bg: bg !== undefined ? bg : mergedProps.bg,
        color: color !== undefined ? color : mergedProps.color,
        funcss: funcss !== undefined ? funcss : mergedProps.funcss,
        emp: emp !== undefined ? emp : mergedProps.emp,
        bold: bold !== undefined ? bold : mergedProps.bold,
        block: block !== undefined ? block : mergedProps.block,
        body: body !== undefined ? body : mergedProps.body,
        article: article !== undefined ? article : mergedProps.article,
        light: light !== undefined ? light : mergedProps.light,
        lighter: lighter !== undefined ? lighter : mergedProps.lighter,
        italic: italic !== undefined ? italic : mergedProps.italic,
        weight: weight !== undefined ? weight : mergedProps.weight,
        underline: underline !== undefined ? underline : mergedProps.underline,
        align: align !== undefined ? align : mergedProps.align,
        lineHeight: lineHeight !== undefined ? lineHeight : mergedProps.lineHeight,
        letterSpacing: letterSpacing !== undefined ? letterSpacing : mergedProps.letterSpacing,
        uppercase: uppercase !== undefined ? uppercase : mergedProps.uppercase,
        lowercase: lowercase !== undefined ? lowercase : mergedProps.lowercase,
        capitalize: capitalize !== undefined ? capitalize : mergedProps.capitalize,
        textDecoration: textDecoration !== undefined ? textDecoration : mergedProps.textDecoration,
        textTransform: textTransform !== undefined ? textTransform : mergedProps.textTransform,
        whiteSpace: whiteSpace !== undefined ? whiteSpace : mergedProps.whiteSpace,
        wordBreak: wordBreak !== undefined ? wordBreak : mergedProps.wordBreak,
        fontFamily: fontFamily !== undefined ? fontFamily : mergedProps.fontFamily,
        truncate: truncate !== undefined ? truncate : mergedProps.truncate,
        textShadow: textShadow !== undefined ? textShadow : mergedProps.textShadow,
        textAlign: textAlign !== undefined ? textAlign : mergedProps.textAlign,
        monospace: monospace !== undefined ? monospace : mergedProps.monospace,
        quote: quote !== undefined ? quote : mergedProps.quote,
        opacity: opacity !== undefined ? opacity : mergedProps.opacity,
        size: size !== undefined ? size : mergedProps.size,
        margin: margin !== undefined ? margin : mergedProps.margin,
        padding: padding !== undefined ? padding : mergedProps.padding,
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
    var mergedStyles = __assign(__assign({ display: shouldBeBlock ? 'block' : undefined, fontWeight: final.bold ? 'bold' : final.weight ? final.weight : undefined, lineHeight: final.lineHeight, letterSpacing: final.letterSpacing, textTransform: final.textTransform, textDecoration: final.textDecoration, fontFamily: final.fontFamily, textShadow: final.textShadow, textAlign: final.textAlign, whiteSpace: final.whiteSpace, wordBreak: final.wordBreak, margin: final.margin, padding: final.padding }, customStyles), (final.truncate
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
        hoverText ? "hover-text-".concat(hoverText) : '',
        hoverBg ? "hover-".concat(hoverBg) : '',
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
    return (react_1.default.createElement(Tag, __assign({ id: id, className: classNames, style: mergedStyles }, rest),
        final.quote && (react_1.default.createElement("div", null,
            react_1.default.createElement(pi_1.PiQuotesLight, null))),
        children,
        text));
};
exports.default = Text;
