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
exports.default = Flex;
var react_1 = __importDefault(require("react"));
function Flex(_a) {
    var className = _a.className, funcss = _a.funcss, id = _a.id, children = _a.children, _b = _a.style, style = _b === void 0 ? {} : _b, 
    // Flex container
    _c = _a.direction, 
    // Flex container
    direction = _c === void 0 ? 'row' : _c, _d = _a.wrap, wrap = _d === void 0 ? 'wrap' : _d, justify = _a.justify, alignItems = _a.alignItems, alignContent = _a.alignContent, 
    // Gap
    gap = _a.gap, gapX = _a.gapX, gapY = _a.gapY, _e = _a.gapUnit, gapUnit = _e === void 0 ? 'rem' : _e, 
    // Responsive
    responsiveSmall = _a.responsiveSmall, responsiveMedium = _a.responsiveMedium, responsiveLarge = _a.responsiveLarge, fit = _a.fit, inline = _a.inline, 
    // Size
    width = _a.width, height = _a.height, rest = __rest(_a, ["className", "funcss", "id", "children", "style", "direction", "wrap", "justify", "alignItems", "alignContent", "gap", "gapX", "gapY", "gapUnit", "responsiveSmall", "responsiveMedium", "responsiveLarge", "fit", "inline", "width", "height"]);
    // Helper function to normalize flex values
    var normalizeFlexValue = function (value, type) {
        if (type === void 0) { type = 'justify'; }
        if (!value)
            return undefined;
        var mapping = {
            // Justify content mapping
            'start': 'flex-start',
            'end': 'flex-end',
            'between': 'space-between',
            'around': 'space-around',
            'evenly': 'space-evenly',
            // Align items/content mapping
            'normal': 'normal',
            // For alignContent, 'between' and 'around' are already correct
        };
        // If it's a shorthand, return the mapped value
        if (mapping[value]) {
            return mapping[value];
        }
        // If it's already a valid CSS value, return it as is
        return value;
    };
    // Normalize direction shorthand
    var getDirection = function () {
        if (direction === 'col')
            return 'column';
        return direction;
    };
    // Normalize wrap shorthand
    var getWrap = function () {
        if (wrap === 'no-wrap')
            return 'nowrap';
        return wrap;
    };
    // Helper to format gap values
    var formatGapValue = function (value) {
        if (value === undefined || value === null)
            return undefined;
        // If it's already a string with unit, return as is
        if (typeof value === 'string' && (value.includes('px') || value.includes('rem') || value.includes('em') || value.includes('%'))) {
            return value;
        }
        // Otherwise, add the specified unit
        return "".concat(value).concat(gapUnit);
    };
    var combinedClassName = [
        className,
        funcss,
        responsiveSmall && 'responsive-small',
        responsiveMedium && 'responsive-medium',
        responsiveLarge && 'responsive-large',
        inline && 'inline-flex',
    ]
        .filter(Boolean)
        .join(' ');
    // Build styles dynamically
    var flexStyles = {
        display: inline ? 'inline-flex' : 'flex',
        flexDirection: getDirection(),
        flexWrap: getWrap(),
    };
    // Only add justify if provided
    if (justify) {
        flexStyles.justifyContent = normalizeFlexValue(justify, 'justify');
    }
    // Only add alignItems if provided
    if (alignItems) {
        flexStyles.alignItems = normalizeFlexValue(alignItems, 'align');
    }
    // Only add alignContent if provided
    if (alignContent) {
        flexStyles.alignContent = normalizeFlexValue(alignContent, 'align');
    }
    // Handle gap properties
    var formattedGap = formatGapValue(gap);
    var formattedGapX = formatGapValue(gapX);
    var formattedGapY = formatGapValue(gapY);
    if (formattedGap) {
        flexStyles.gap = formattedGap;
    }
    // Only set columnGap/rowGap if explicitly provided or if gap is set but gapX/gapY not
    if (formattedGapX !== undefined) {
        flexStyles.columnGap = formattedGapX;
    }
    else if (formattedGap) {
        flexStyles.columnGap = formattedGap;
    }
    if (formattedGapY !== undefined) {
        flexStyles.rowGap = formattedGapY;
    }
    else if (formattedGap) {
        flexStyles.rowGap = formattedGap;
    }
    // Handle width and height
    if (fit) {
        flexStyles.width = '100%';
        flexStyles.height = '100%';
    }
    else {
        if (width)
            flexStyles.width = width;
        if (height)
            flexStyles.height = height;
    }
    return (react_1.default.createElement("div", __assign({ id: id, className: combinedClassName, style: __assign(__assign({}, flexStyles), style) }, rest), children));
}
