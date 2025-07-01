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
// CSS var resolver
var getCssVar = function (varName) {
    var _a;
    if (typeof window === 'undefined')
        return '';
    return ((_a = getComputedStyle(document.documentElement).getPropertyValue("--".concat(varName))) === null || _a === void 0 ? void 0 : _a.trim()) || '';
};
// Color resolver
var resolveStrokeColor = function (color) {
    if (!color)
        return getCssVar('primary') || '#8884d8';
    if (color.startsWith('#'))
        return color;
    return getCssVar(color) || color;
};
// Tooltip
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
var Lines = function (_a) {
    var data = _a.data, id = _a.id, series = _a.series, fromColor = _a.fromColor, toColor = _a.toColor, dy = _a.dy, _b = _a.showGrid, showGrid = _b === void 0 ? true : _b, _c = _a.horizontalLines, horizontalLines = _c === void 0 ? false : _c, _d = _a.showLegend, showLegend = _d === void 0 ? true : _d, _e = _a.showXAxis, showXAxis = _e === void 0 ? true : _e, _f = _a.showYAxis, showYAxis = _f === void 0 ? false : _f, funcss = _a.funcss, _g = _a.curveType, curveType = _g === void 0 ? 'monotone' : _g, _h = _a.height, height = _h === void 0 ? "100%" : _h, _j = _a.width, width = _j === void 0 ? '100%' : _j, _k = _a.margin, margin = _k === void 0 ? { top: 10, right: 30, left: 0, bottom: 20 } : _k, _l = _a.xAxisProps, xAxisProps = _l === void 0 ? {} : _l, _m = _a.yAxisProps, yAxisProps = _m === void 0 ? {} : _m, tooltipFormatter = _a.tooltipFormatter, _o = _a.legendProps, legendProps = _o === void 0 ? {} : _o;
    var gradientId = id || 'colorUv';
    return (react_1.default.createElement(recharts_1.ResponsiveContainer, { width: width, height: height, className: funcss },
        react_1.default.createElement(recharts_1.AreaChart, { data: data, margin: margin },
            react_1.default.createElement("defs", null,
                react_1.default.createElement("linearGradient", { id: gradientId, x1: "0", y1: "0", x2: "0", y2: "1" },
                    react_1.default.createElement("stop", { offset: "5%", stopColor: getCssVar(fromColor || 'primary'), stopOpacity: 0.8 }),
                    react_1.default.createElement("stop", { offset: "95%", stopColor: getCssVar(toColor || 'primary200'), stopOpacity: 0 }))),
            showGrid && react_1.default.createElement(recharts_1.CartesianGrid, { strokeDasharray: "3 3" }),
            !showGrid && horizontalLines && (react_1.default.createElement(recharts_1.CartesianGrid, { strokeDasharray: "3 3", horizontal: true, vertical: false })),
            showXAxis && (react_1.default.createElement(recharts_1.XAxis, __assign({ interval: 0, padding: { left: 10, right: 10 }, fontSize: "0.8rem", strokeWidth: horizontalLines ? 0 : 0.2, dataKey: "label", angle: -35, dy: dy !== null && dy !== void 0 ? dy : 10 }, xAxisProps))),
            showYAxis && (react_1.default.createElement(recharts_1.YAxis, __assign({ interval: 0, strokeWidth: horizontalLines ? 0 : 0.2, fontSize: "0.8rem" }, yAxisProps))),
            react_1.default.createElement(recharts_1.Tooltip, { content: react_1.default.createElement(CustomTooltip, null), formatter: tooltipFormatter }),
            showLegend && react_1.default.createElement(recharts_1.Legend, __assign({}, legendProps)),
            series.map(function (s, index) { return (react_1.default.createElement(recharts_1.Area, { key: s.dataKey, type: curveType, dataKey: s.dataKey, name: s.label || s.dataKey, stroke: resolveStrokeColor(s.color), fill: "url(#".concat(gradientId, ")"), fillOpacity: 1, strokeWidth: s.strokeWidth || 2, dot: s.dot !== false ? { r: 4 } : false, activeDot: { r: 8 } })); }))));
};
exports.default = Lines;
