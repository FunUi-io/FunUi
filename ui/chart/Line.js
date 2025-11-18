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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var recharts_1 = require("recharts");
var componentUtils_1 = require("../../utils/componentUtils");
// Parse string to object utility
var parseIfString = function (value, fallback) {
    if (typeof value === 'string') {
        try {
            return JSON.parse(value);
        }
        catch (error) {
            console.error('Failed to parse JSON string:', error);
            return fallback;
        }
    }
    return value;
};
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
// Default Tooltip
var CustomTooltip = function (_a) {
    var active = _a.active, payload = _a.payload, label = _a.label, formatter = _a.formatter;
    if (active && payload && payload.length) {
        return (react_1.default.createElement("div", { className: "card raised round-edge p-2 text-sm", style: {
                maxWidth: '300px'
            } },
            react_1.default.createElement("div", { className: "text-bold mb-1" }, label),
            payload.map(function (entry, index) { return (react_1.default.createElement("div", { key: index, style: {
                    lineHeight: 1.4,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                } },
                react_1.default.createElement("div", { style: {
                        width: '12px',
                        height: '12px',
                        backgroundColor: entry.color,
                        borderRadius: '2px'
                    } }),
                react_1.default.createElement("span", { style: { fontWeight: 500 } },
                    entry.name,
                    ":"),
                react_1.default.createElement("span", { style: { fontWeight: 600, color: 'var(--text-color, #1a202c)' } }, formatter ? formatter(entry.value, entry.name, entry) : entry.value))); })));
    }
    return null;
};
var Lines = function (_a) {
    var _b;
    var data = _a.data, id = _a.id, series = _a.series, fromColor = _a.fromColor, toColor = _a.toColor, dy = _a.dy, _c = _a.showGrid, showGrid = _c === void 0 ? true : _c, _d = _a.horizontalLines, horizontalLines = _d === void 0 ? false : _d, _e = _a.showLegend, showLegend = _e === void 0 ? true : _e, _f = _a.showXAxis, showXAxis = _f === void 0 ? true : _f, _g = _a.showYAxis, showYAxis = _g === void 0 ? false : _g, _h = _a.showTooltip, showTooltip = _h === void 0 ? true : _h, funcss = _a.funcss, _j = _a.curveType, curveType = _j === void 0 ? 'monotone' : _j, _k = _a.height, height = _k === void 0 ? "100%" : _k, _l = _a.width, width = _l === void 0 ? '100%' : _l, _m = _a.margin, margin = _m === void 0 ? { top: 10, right: 30, left: 0, bottom: 20 } : _m, _o = _a.xAxisProps, xAxisProps = _o === void 0 ? {} : _o, _p = _a.yAxisProps, yAxisProps = _p === void 0 ? {} : _p, tooltipFormatter = _a.tooltipFormatter, _q = _a.legendProps, legendProps = _q === void 0 ? {} : _q, _r = _a.tooltipProps, tooltipProps = _r === void 0 ? {} : _r, rotateLabel = _a.rotateLabel, xLabelSize = _a.xLabelSize, yLabelSize = _a.yLabelSize, xInterval = _a.xInterval, yInterval = _a.yInterval, _s = _a.variant, variant = _s === void 0 ? '' : _s, xAxisLabel = _a.xAxisLabel, yAxisLabel = _a.yAxisLabel, _t = _a.tickLine, tickLine = _t === void 0 ? true : _t, _u = _a.axisLine, axisLine = _u === void 0 ? true : _u, gridStroke = _a.gridStroke, _v = _a.gridStrokeDasharray, gridStrokeDasharray = _v === void 0 ? "3 3" : _v, customTooltip = _a.customTooltip, _w = _a.animation, animation = _w === void 0 ? true : _w, _x = _a.animationDuration, animationDuration = _x === void 0 ? 500 : _x, _y = _a.isAnimationActive, isAnimationActive = _y === void 0 ? true : _y, syncId = _a.syncId, chartBackground = _a.chartBackground, borderRadius = _a.borderRadius, padding = _a.padding, _z = _a.shadow, shadow = _z === void 0 ? false : _z, aspect = _a.aspect, minHeight = _a.minHeight, maxHeight = _a.maxHeight, minWidth = _a.minWidth, maxWidth = _a.maxWidth;
    // Use component configuration with variant support
    var mergeWithLocal = (0, componentUtils_1.useComponentConfiguration)('AreaChart', variant).mergeWithLocal;
    // Create local props object
    var localProps = {
        data: data,
        id: id,
        series: series,
        fromColor: fromColor,
        toColor: toColor,
        dy: dy,
        showGrid: showGrid,
        horizontalLines: horizontalLines,
        showLegend: showLegend,
        showXAxis: showXAxis,
        showYAxis: showYAxis,
        showTooltip: showTooltip,
        funcss: funcss,
        curveType: curveType,
        height: height,
        width: width,
        margin: margin,
        xAxisProps: xAxisProps,
        yAxisProps: yAxisProps,
        tooltipFormatter: tooltipFormatter,
        legendProps: legendProps,
        tooltipProps: tooltipProps,
        rotateLabel: rotateLabel,
        xLabelSize: xLabelSize,
        yLabelSize: yLabelSize,
        xInterval: xInterval,
        yInterval: yInterval,
        xAxisLabel: xAxisLabel,
        yAxisLabel: yAxisLabel,
        tickLine: tickLine,
        axisLine: axisLine,
        gridStroke: gridStroke,
        gridStrokeDasharray: gridStrokeDasharray,
        customTooltip: customTooltip,
        animation: animation,
        animationDuration: animationDuration,
        isAnimationActive: isAnimationActive,
        syncId: syncId,
        chartBackground: chartBackground,
        borderRadius: borderRadius,
        padding: padding,
        shadow: shadow,
        aspect: aspect,
        minHeight: minHeight,
        maxHeight: maxHeight,
        minWidth: minWidth,
        maxWidth: maxWidth
    };
    // Merge with config - LOCAL PROPS OVERRIDE CONFIG
    var mergedProps = mergeWithLocal(localProps).props;
    // Parse data and series if they're strings
    var parsedData = (0, react_1.useMemo)(function () { return parseIfString(mergedProps.data, []); }, [mergedProps.data]);
    var parsedSeries = (0, react_1.useMemo)(function () { return parseIfString(mergedProps.series, []); }, [mergedProps.series]);
    // Extract final values
    var final = (0, react_1.useMemo)(function () { return ({
        data: parsedData,
        id: mergedProps.id,
        series: parsedSeries,
        fromColor: mergedProps.fromColor,
        toColor: mergedProps.toColor,
        dy: mergedProps.dy,
        showGrid: mergedProps.showGrid,
        horizontalLines: mergedProps.horizontalLines,
        showLegend: mergedProps.showLegend,
        showXAxis: mergedProps.showXAxis,
        showYAxis: mergedProps.showYAxis,
        showTooltip: mergedProps.showTooltip,
        funcss: mergedProps.funcss,
        curveType: mergedProps.curveType,
        height: mergedProps.height,
        width: mergedProps.width,
        margin: mergedProps.margin,
        xAxisProps: mergedProps.xAxisProps,
        yAxisProps: mergedProps.yAxisProps,
        tooltipFormatter: mergedProps.tooltipFormatter,
        legendProps: mergedProps.legendProps,
        tooltipProps: mergedProps.tooltipProps,
        rotateLabel: mergedProps.rotateLabel,
        xLabelSize: mergedProps.xLabelSize,
        yLabelSize: mergedProps.yLabelSize,
        xInterval: mergedProps.xInterval,
        yInterval: mergedProps.yInterval,
        xAxisLabel: mergedProps.xAxisLabel,
        yAxisLabel: mergedProps.yAxisLabel,
        tickLine: mergedProps.tickLine,
        axisLine: mergedProps.axisLine,
        gridStroke: mergedProps.gridStroke,
        gridStrokeDasharray: mergedProps.gridStrokeDasharray,
        customTooltip: mergedProps.customTooltip,
        animation: mergedProps.animation,
        animationDuration: mergedProps.animationDuration,
        isAnimationActive: mergedProps.isAnimationActive,
        syncId: mergedProps.syncId,
        chartBackground: mergedProps.chartBackground,
        borderRadius: mergedProps.borderRadius,
        padding: mergedProps.padding,
        shadow: mergedProps.shadow,
        aspect: mergedProps.aspect,
        minHeight: mergedProps.minHeight,
        maxHeight: mergedProps.maxHeight,
        minWidth: mergedProps.minWidth,
        maxWidth: mergedProps.maxWidth
    }); }, [parsedData, parsedSeries, mergedProps]);
    var baseGradientId = final.id || 'areaChartGradient';
    var TooltipComponent = final.customTooltip || CustomTooltip;
    // Generate per-series gradients
    var gradients = (0, react_1.useMemo)(function () {
        return final.series.map(function (s, index) {
            if (!s.fromColor && !s.toColor)
                return null;
            var gradientId = "".concat(baseGradientId, "-").concat(index);
            var startColor = resolveStrokeColor(s.fromColor || s.color || final.fromColor);
            var endColor = resolveStrokeColor(s.toColor || final.toColor);
            return (react_1.default.createElement("linearGradient", { key: gradientId, id: gradientId, x1: "0", y1: "0", x2: "0", y2: "1" },
                react_1.default.createElement("stop", { offset: "5%", stopColor: startColor, stopOpacity: 0.8 }),
                react_1.default.createElement("stop", { offset: "95%", stopColor: endColor, stopOpacity: 0 })));
        });
    }, [final.series, baseGradientId, final.fromColor, final.toColor]);
    // Default gradient for series without custom gradients
    var defaultGradient = (0, react_1.useMemo)(function () { return (react_1.default.createElement("linearGradient", { id: baseGradientId, x1: "0", y1: "0", x2: "0", y2: "1" },
        react_1.default.createElement("stop", { offset: "5%", stopColor: getCssVar(final.fromColor || 'primary'), stopOpacity: 0.8 }),
        react_1.default.createElement("stop", { offset: "95%", stopColor: getCssVar(final.toColor || 'primary200'), stopOpacity: 0 }))); }, [baseGradientId, final.fromColor, final.toColor]);
    var containerStyle = (0, react_1.useMemo)(function () { return ({
        height: final.height,
        width: final.width,
        minHeight: final.minHeight,
        maxHeight: final.maxHeight,
        minWidth: final.minWidth,
        maxWidth: final.maxWidth,
        background: final.chartBackground,
        borderRadius: final.borderRadius,
        padding: final.padding,
        boxShadow: final.shadow ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : undefined,
    }); }, [final]);
    return (react_1.default.createElement(recharts_1.ResponsiveContainer, { width: final.width, height: final.height, aspect: final.aspect, className: final.funcss, style: containerStyle },
        react_1.default.createElement(recharts_1.AreaChart, { data: final.data, margin: final.margin, syncId: final.syncId },
            react_1.default.createElement("defs", null,
                defaultGradient,
                gradients),
            final.showGrid && (react_1.default.createElement(recharts_1.CartesianGrid, { strokeDasharray: final.gridStrokeDasharray, stroke: final.gridStroke || getCssVar('border-color') || '#e2e8f0' })),
            !final.showGrid && final.horizontalLines && (react_1.default.createElement(recharts_1.CartesianGrid, { strokeDasharray: final.gridStrokeDasharray, horizontal: true, vertical: false, stroke: final.gridStroke || getCssVar('border-color') || '#e2e8f0' })),
            final.showXAxis && (react_1.default.createElement(recharts_1.XAxis, __assign({ interval: final.xInterval, padding: { left: 10, right: 10 }, fontSize: final.xLabelSize || "0.8rem", strokeWidth: final.horizontalLines ? 0 : 0.2, dataKey: "label", angle: final.rotateLabel || -35, dy: (_b = final.dy) !== null && _b !== void 0 ? _b : 10, tickLine: final.tickLine, axisLine: final.axisLine, label: final.xAxisLabel ? { value: final.xAxisLabel, position: 'insideBottom', offset: -10 } : undefined }, final.xAxisProps))),
            final.showYAxis && (react_1.default.createElement(recharts_1.YAxis, __assign({ interval: final.yInterval, strokeWidth: final.horizontalLines ? 0 : 0.2, fontSize: final.yLabelSize || "0.8rem", tickLine: final.tickLine, axisLine: final.axisLine, label: final.yAxisLabel ? { value: final.yAxisLabel, angle: -90, position: 'insideLeft' } : undefined }, final.yAxisProps))),
            final.showTooltip && (react_1.default.createElement(recharts_1.Tooltip, __assign({ content: react_1.default.createElement(TooltipComponent, { formatter: final.tooltipFormatter }), formatter: final.tooltipFormatter }, final.tooltipProps))),
            final.showLegend && react_1.default.createElement(recharts_1.Legend, __assign({}, final.legendProps)),
            final.series.map(function (s, index) {
                var hasCustomGradient = s.fromColor || s.toColor;
                var gradientId = hasCustomGradient
                    ? "".concat(baseGradientId, "-").concat(index)
                    : baseGradientId;
                return (react_1.default.createElement(recharts_1.Area, { key: s.dataKey || index, type: final.curveType, dataKey: s.dataKey, name: s.label || s.dataKey, stroke: resolveStrokeColor(s.color), fill: hasCustomGradient || final.fromColor ? "url(#".concat(gradientId, ")") : resolveStrokeColor(s.color), fillOpacity: s.fillOpacity !== undefined ? s.fillOpacity : 0.6, strokeWidth: s.strokeWidth || 2, strokeDasharray: s.strokeDasharray, dot: s.dot !== false ? { r: 4 } : false, activeDot: s.activeDot !== false ? (typeof s.activeDot === 'object' ? s.activeDot : { r: 6, strokeWidth: 2 }) : false, isAnimationActive: final.isAnimationActive, animationDuration: final.animationDuration }));
            }))));
};
exports.default = Lines;
