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
// Get CSS variable value from :root
var getCssVar = function (varName) {
    var _a;
    if (typeof window === 'undefined')
        return '';
    return (((_a = getComputedStyle(document.documentElement)
        .getPropertyValue("--".concat(varName))) === null || _a === void 0 ? void 0 : _a.trim()) || '');
};
// Resolve color from CSS var or fallback
var resolveColor = function (input, fallback) {
    if (fallback === void 0) { fallback = '#8884d8'; }
    if (!input)
        return getCssVar('primary') || fallback;
    if (input.startsWith('#'))
        return input;
    return getCssVar(input) || input;
};
// Custom Tooltip
var CustomTooltip = function (_a) {
    var active = _a.active, payload = _a.payload, label = _a.label;
    if (active && payload && payload.length) {
        return (react_1.default.createElement("div", { className: "dark raised round-edge p-2 text-sm" },
            react_1.default.createElement("div", { className: "text-bold" }, payload[0].name),
            react_1.default.createElement("div", { style: { lineHeight: 1 } },
                "Count: ",
                react_1.default.createElement("span", { className: "font-semibold" }, payload[0].value))));
    }
    return null;
};
var ChartPie = function (_a) {
    var data = _a.data, _b = _a.donut, donut = _b === void 0 ? false : _b, _c = _a.showLegend, showLegend = _c === void 0 ? true : _c, _d = _a.funcss, funcss = _d === void 0 ? '' : _d, width = _a.width, height = _a.height, _e = _a.outerRadius, outerRadius = _e === void 0 ? 100 : _e, innerRadius = _a.innerRadius, tooltipFormatter = _a.tooltipFormatter, _f = _a.legendProps, legendProps = _f === void 0 ? {} : _f;
    var chart = (react_1.default.createElement(recharts_1.PieChart, { width: typeof width === 'number' ? width : undefined, height: typeof height === 'number' ? height : undefined },
        react_1.default.createElement(recharts_1.Tooltip, { content: react_1.default.createElement(CustomTooltip, null), formatter: tooltipFormatter }),
        showLegend && react_1.default.createElement(recharts_1.Legend, __assign({}, legendProps)),
        react_1.default.createElement(recharts_1.Pie, { data: data, dataKey: "value", nameKey: "label", cx: "50%", cy: "50%", outerRadius: outerRadius, innerRadius: donut ? innerRadius !== null && innerRadius !== void 0 ? innerRadius : outerRadius * 0.6 : 0, label: false, labelLine: false }, data.map(function (entry, index) { return (react_1.default.createElement(recharts_1.Cell, { key: "cell-".concat(index), fill: resolveColor(entry.color), stroke: "#ffffff", strokeWidth: 1 })); }))));
    if (!width && !height) {
        return (react_1.default.createElement(recharts_1.ResponsiveContainer, { width: "100%", height: 300, className: funcss }, chart));
    }
    return (react_1.default.createElement("div", { className: funcss, style: {
            width: typeof width === 'number' ? "".concat(width, "px") : width || '100%',
            height: typeof height === 'number' ? "".concat(height, "px") : height || '300px',
        } }, chart));
};
exports.default = ChartPie;
