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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var recharts_1 = require("recharts");
var getCssVar = function (varName) {
    var _a;
    if (typeof window === 'undefined')
        return '';
    return ((_a = getComputedStyle(document.documentElement).getPropertyValue(varName)) === null || _a === void 0 ? void 0 : _a.trim()) || '';
};
var resolveColor = function (color) {
    if (!color)
        return getCssVar('--primary') || '#8884d8';
    if (color.startsWith('#'))
        return color;
    return getCssVar("--".concat(color)) || color;
};
var CustomTooltip = function (_a) {
    var active = _a.active, payload = _a.payload, label = _a.label;
    if (active && payload && payload.length) {
        return (react_1.default.createElement("div", { className: "dark raised round-edge p-2 text-sm" },
            react_1.default.createElement("div", { className: "text-bold" }, label),
            payload.map(function (entry, index) { return (react_1.default.createElement("div", { key: index },
                entry.name,
                ": ",
                react_1.default.createElement("span", { className: "font-semibold" }, entry.value))); })));
    }
    return null;
};
var Bars = function (_a) {
    var data = _a.data, series = _a.series, _b = _a.width, width = _b === void 0 ? '100%' : _b, height = _a.height, _c = _a.layout, layout = _c === void 0 ? 'horizontal' : _c, _d = _a.margin, margin = _d === void 0 ? {} : _d, _e = _a.barRadius, barRadius = _e === void 0 ? 6 : _e, _f = _a.barSize, barSize = _f === void 0 ? 30 : _f, _g = _a.barGap, barGap = _g === void 0 ? 4 : _g, _h = _a.barCategoryGap, barCategoryGap = _h === void 0 ? '10%' : _h, _j = _a.showXAxis, showXAxis = _j === void 0 ? true : _j, _k = _a.showYAxis, showYAxis = _k === void 0 ? true : _k, _l = _a.xAxisProps, xAxisProps = _l === void 0 ? {} : _l, _m = _a.yAxisProps, yAxisProps = _m === void 0 ? {} : _m, _o = _a.xInterval, xInterval = _o === void 0 ? 0 : _o, _p = _a.yInterval, yInterval = _p === void 0 ? 0 : _p, _q = _a.showGrid, showGrid = _q === void 0 ? true : _q, _r = _a.gridProps, gridProps = _r === void 0 ? {} : _r, _s = _a.showTooltip, showTooltip = _s === void 0 ? true : _s, tooltipFormatter = _a.tooltipFormatter, _t = _a.showLegend, showLegend = _t === void 0 ? true : _t, _u = _a.legendProps, legendProps = _u === void 0 ? {} : _u, _v = _a.isAnimationActive, isAnimationActive = _v === void 0 ? true : _v, funcss = _a.funcss;
    var isVertical = layout === 'vertical';
    // Smart default margins
    var defaultMargin = {
        top: 20,
        right: 30,
        bottom: isVertical ? 30 : 50,
        left: isVertical ? 100 : 40,
    };
    var mergedMargin = __assign(__assign({}, defaultMargin), margin);
    // Smart height for vertical layout based on data length
    var autoHeight = isVertical ? Math.max(300, data.length * 45) : 300;
    var resolvedHeight = height || autoHeight;
    return (react_1.default.createElement(recharts_1.ResponsiveContainer, { className: funcss || '', width: width, height: resolvedHeight },
        react_1.default.createElement(recharts_1.BarChart, { data: data, layout: layout, margin: mergedMargin, barGap: barGap, barCategoryGap: barCategoryGap },
            showGrid && react_1.default.createElement(recharts_1.CartesianGrid, __assign({ strokeDasharray: "3 3" }, gridProps)),
            isVertical ? (react_1.default.createElement(react_1.default.Fragment, null,
                showYAxis && (react_1.default.createElement(recharts_1.YAxis, __assign({ type: "category", dataKey: "label", interval: 0, tick: __assign({ angle: 0, fontSize: 12, textAnchor: 'start', dx: -5, dy: 4, fill: '#555' }, (yAxisProps.tick || {})), tickMargin: 10 }, yAxisProps))),
                showXAxis && (react_1.default.createElement(recharts_1.XAxis, __assign({ type: "number", interval: xInterval, tick: { fontSize: 12 } }, xAxisProps))))) : (react_1.default.createElement(react_1.default.Fragment, null,
                showXAxis && (react_1.default.createElement(recharts_1.XAxis, __assign({ type: "category", dataKey: "label", interval: 0, tick: __assign({ fontSize: 12, angle: 0, fill: '#555' }, xAxisProps.tick), tickMargin: 8 }, xAxisProps))),
                showYAxis && (react_1.default.createElement(recharts_1.YAxis, __assign({ type: "number", interval: yInterval, tick: { fontSize: 12 } }, yAxisProps))))),
            showTooltip && (react_1.default.createElement(recharts_1.Tooltip, { content: react_1.default.createElement(CustomTooltip, null), formatter: tooltipFormatter })),
            showLegend && react_1.default.createElement(recharts_1.Legend, __assign({}, legendProps)),
            series.map(function (s) { return (react_1.default.createElement(recharts_1.Bar, { key: s.dataKey, dataKey: s.dataKey, name: s.label || s.dataKey, fill: resolveColor(s.color), radius: layout === 'horizontal'
                    ? [barRadius, barRadius, 0, 0]
                    : [0, barRadius, barRadius, 0], barSize: barSize, isAnimationActive: isAnimationActive })); }))));
};
exports.default = Bars;
