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
// Resolve CSS variables
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
// Custom Tooltip
var CustomTooltip = function (_a) {
    var active = _a.active, payload = _a.payload, label = _a.label;
    if (active && payload && payload.length) {
        return (react_1.default.createElement("div", { className: "dark raised round-edge p-2 text-sm" },
            react_1.default.createElement("div", { className: "text-bold" }, label),
            payload.map(function (entry, index) { return (react_1.default.createElement("div", { key: index, style: { lineHeight: 1 } },
                entry.name,
                ": ",
                react_1.default.createElement("span", { className: "font-semibold" }, entry.value))); })));
    }
    return null;
};
var Bars = function (_a) {
    var data = _a.data, series = _a.series, _b = _a.showGrid, showGrid = _b === void 0 ? true : _b, _c = _a.showLegend, showLegend = _c === void 0 ? true : _c, _d = _a.showXAxis, showXAxis = _d === void 0 ? true : _d, _e = _a.showYAxis, showYAxis = _e === void 0 ? false : _e, _f = _a.barRadius, barRadius = _f === void 0 ? 6 : _f, funcss = _a.funcss, _g = _a.barSize, barSize = _g === void 0 ? 30 : _g, _h = _a.width, width = _h === void 0 ? '100%' : _h, _j = _a.height, height = _j === void 0 ? "100%" : _j, _k = _a.margin, margin = _k === void 0 ? { top: 10, right: 30, left: 0, bottom: 20 } : _k, _l = _a.xAxisProps, xAxisProps = _l === void 0 ? {} : _l, _m = _a.yAxisProps, yAxisProps = _m === void 0 ? {} : _m, tooltipFormatter = _a.tooltipFormatter, _o = _a.legendProps, legendProps = _o === void 0 ? {} : _o;
    return (react_1.default.createElement(recharts_1.ResponsiveContainer, { className: funcss || "", width: width, height: height },
        react_1.default.createElement(recharts_1.BarChart, { data: data, margin: margin },
            showGrid && react_1.default.createElement(recharts_1.CartesianGrid, { strokeDasharray: "3 3" }),
            showXAxis && react_1.default.createElement(recharts_1.XAxis, __assign({ dataKey: "label" }, xAxisProps)),
            showYAxis && react_1.default.createElement(recharts_1.YAxis, __assign({}, yAxisProps)),
            react_1.default.createElement(recharts_1.Tooltip, { content: react_1.default.createElement(CustomTooltip, null), formatter: tooltipFormatter }),
            showLegend && react_1.default.createElement(recharts_1.Legend, __assign({}, legendProps)),
            series.map(function (s) { return (react_1.default.createElement(recharts_1.Bar, { key: s.dataKey, dataKey: s.dataKey, name: s.label || s.dataKey, fill: resolveColor(s.color), radius: [barRadius, barRadius, 0, 0], barSize: barSize })); }))));
};
exports.default = Bars;
