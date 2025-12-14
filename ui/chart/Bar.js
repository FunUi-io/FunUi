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
// Parse string to object utility with enhanced error handling
var parseIfString = function (value, fallback) {
    if (typeof value === 'string') {
        try {
            var parsed = JSON.parse(value);
            // Additional validation for arrays
            if (Array.isArray(fallback) && !Array.isArray(parsed)) {
                console.warn('Parsed value is not an array, using fallback');
                return fallback;
            }
            return parsed;
        }
        catch (error) {
            console.error('Failed to parse JSON string:', error);
            return fallback;
        }
    }
    // Handle null/undefined values
    if (value == null) {
        return fallback;
    }
    return value;
};
// Safe array access utility
var getSafeArray = function (value, fallback) {
    if (fallback === void 0) { fallback = []; }
    if (!value || !Array.isArray(value))
        return fallback;
    return value;
};
// CSS var resolver with error handling
var getCssVar = function (varName) {
    var _a;
    if (typeof window === 'undefined')
        return '';
    try {
        return ((_a = getComputedStyle(document.documentElement).getPropertyValue("--".concat(varName))) === null || _a === void 0 ? void 0 : _a.trim()) || '';
    }
    catch (error) {
        console.warn("Failed to get CSS variable --".concat(varName, ":"), error);
        return '';
    }
};
// Color resolver with fallbacks
var resolveColor = function (color) {
    if (!color)
        return getCssVar('primary') || '#8884d8';
    if (color.startsWith('#'))
        return color;
    var cssColor = getCssVar(color);
    if (cssColor)
        return cssColor;
    // Fallback to common color names if CSS var not found
    var colorMap = {
        primary: '#8884d8',
        secondary: '#82ca9d',
        error: '#ff4d4f',
        warning: '#faad14',
        success: '#52c41a',
        info: '#1890ff'
    };
    return colorMap[color] || color || '#8884d8';
};
// Default Tooltip with error handling
var CustomTooltip = function (_a) {
    var active = _a.active, payload = _a.payload, label = _a.label, formatter = _a.formatter;
    if (!active || !payload || !Array.isArray(payload) || payload.length === 0) {
        return null;
    }
    try {
        return (react_1.default.createElement("div", { className: "card raised round-edge p-2 text-sm", style: {
                maxWidth: '300px',
                backgroundColor: 'var(--background, #fff)',
                border: '1px solid var(--border-color, #e2e8f0)'
            } },
            react_1.default.createElement("div", { className: "text-bold mb-1", style: { color: 'var(--text-color, #1a202c)' } }, label || 'N/A'),
            payload.map(function (entry, index) {
                if (!entry)
                    return null;
                var value = formatter ? formatter(entry.value, entry.name, entry) : entry.value;
                var displayValue = value != null ? value : 'N/A';
                var displayName = entry.name || 'Unknown';
                var displayColor = entry.color || entry.fill || '#8884d8';
                return (react_1.default.createElement("div", { key: index, style: {
                        lineHeight: 1.4,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    } },
                    react_1.default.createElement("div", { style: {
                            width: '12px',
                            height: '12px',
                            backgroundColor: displayColor,
                            borderRadius: '2px'
                        } }),
                    react_1.default.createElement("span", { style: { fontWeight: 500, color: 'var(--text-color, #1a202c)' } },
                        displayName,
                        ":"),
                    react_1.default.createElement("span", { style: { fontWeight: 600, color: 'var(--text-color, #1a202c)' } }, displayValue)));
            })));
    }
    catch (error) {
        console.error('Error rendering tooltip:', error);
        return (react_1.default.createElement("div", { className: "card raised round-edge p-2 text-sm" },
            react_1.default.createElement("div", { className: "text-error" }, "Error displaying tooltip")));
    }
};
var Bars = function (localProps) {
    var _a;
    // Use component configuration with variant support
    var mergeWithLocal = (0, componentUtils_1.useComponentConfiguration)('Bar', localProps.variant).mergeWithLocal;
    // Merge with config - LOCAL PROPS OVERRIDE CONFIG
    var mergedProps = mergeWithLocal(localProps).props;
    // Debug: Log what props are actually coming through
    react_1.default.useEffect(function () {
        console.log('Bars merged props:', mergedProps);
        console.log('Bars config available:', Object.keys(mergedProps).length > 0);
    }, [mergedProps]);
    // Parse data and series if they're strings with enhanced validation
    var parsedData = (0, react_1.useMemo)(function () {
        var parsed = parseIfString(mergedProps.data, []);
        return getSafeArray(parsed);
    }, [mergedProps.data]);
    var parsedSeries = (0, react_1.useMemo)(function () {
        var parsed = parseIfString(mergedProps.series, []);
        return getSafeArray(parsed).filter(function (series) {
            return series && typeof series === 'object' && series.dataKey;
        });
    }, [mergedProps.series]);
    // Check if we have valid data to display
    var hasValidData = parsedData.length > 0 && parsedSeries.length > 0;
    var isVertical = mergedProps.layout === 'vertical';
    // Use mergedProps directly - no need for complex fallback logic
    var final = mergedProps;
    // Smart default margins based on layout
    var smartMargin = (0, react_1.useMemo)(function () {
        var baseMargin = { top: 10, right: 30, left: 0, bottom: 20 };
        if (isVertical) {
            return __assign(__assign(__assign({}, baseMargin), { left: 60, bottom: final.xAxisLabel ? 40 : 20 }), final.margin);
        }
        return __assign(__assign(__assign({}, baseMargin), { bottom: final.xAxisLabel ? 50 : 20 }), final.margin);
    }, [isVertical, final.margin, final.xAxisLabel]);
    // Smart height for vertical layout based on data length
    var smartHeight = (0, react_1.useMemo)(function () {
        if (final.height !== 300)
            return final.height;
        if (isVertical) {
            return Math.max(300, parsedData.length * 45);
        }
        return final.height;
    }, [final.height, isVertical, parsedData.length]);
    var TooltipComponent = final.customTooltip || CustomTooltip;
    var containerStyle = (0, react_1.useMemo)(function () { return ({
        height: smartHeight,
        width: final.width,
        minHeight: final.minHeight,
        maxHeight: final.maxHeight,
        minWidth: final.minWidth,
        maxWidth: final.maxWidth,
        background: final.chartBackground,
        borderRadius: final.borderRadius,
        padding: final.padding,
        boxShadow: final.shadow ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : undefined,
    }); }, [smartHeight, final]);
    // Handle bar radius based on layout
    var getBarRadius = function (seriesRadius) {
        if (seriesRadius !== undefined) {
            return Array.isArray(seriesRadius) ? seriesRadius : [seriesRadius, seriesRadius, seriesRadius, seriesRadius];
        }
        if (isVertical) {
            return [0, final.barRadius, final.barRadius, 0];
        }
        return [final.barRadius, final.barRadius, 0, 0];
    };
    // Show empty state if no data
    if (!hasValidData) {
        return (react_1.default.createElement("div", { className: "flex items-center justify-center ".concat(final.funcss), style: containerStyle },
            react_1.default.createElement("div", { className: "text-center text-muted" },
                react_1.default.createElement("div", { className: "text-lg mb-2" }, "\uD83D\uDCCA"),
                react_1.default.createElement("div", null, "No chart data available"))));
    }
    return (react_1.default.createElement("div", { style: {
            height: final.height || "400px",
            width: final.width || "100%"
        } },
        react_1.default.createElement(recharts_1.ResponsiveContainer, { aspect: final.aspect, className: final.funcss, style: containerStyle },
            react_1.default.createElement(recharts_1.BarChart, { data: parsedData, layout: final.layout, margin: smartMargin, barGap: final.barGap, barCategoryGap: final.barCategoryGap, stackOffset: final.stackOffset, syncId: final.syncId },
                final.showGrid && (react_1.default.createElement(recharts_1.CartesianGrid, { strokeDasharray: final.gridStrokeDasharray, stroke: final.gridStroke || getCssVar('border-color') || '#e2e8f0', horizontal: final.horizontalLines !== false, vertical: final.verticalLines !== false })),
                final.showXAxis && (react_1.default.createElement(recharts_1.XAxis, __assign({ type: isVertical ? 'number' : 'category', dataKey: isVertical ? undefined : 'label', interval: final.xInterval, padding: { left: 10, right: 10 }, fontSize: final.xLabelSize, strokeWidth: 0.2, angle: final.rotateLabel || (isVertical ? 0 : -35), dy: (_a = final.dy) !== null && _a !== void 0 ? _a : (isVertical ? 0 : 10), tickLine: final.tickLine, axisLine: final.axisLine, label: final.xAxisLabel ? {
                        value: final.xAxisLabel,
                        position: isVertical ? 'insideBottom' : 'insideBottom',
                        offset: isVertical ? -10 : -30
                    } : undefined }, final.xAxisProps))),
                final.showYAxis && (react_1.default.createElement(recharts_1.YAxis, __assign({ type: isVertical ? 'category' : 'number', dataKey: isVertical ? 'label' : undefined, interval: final.yInterval, strokeWidth: 0.2, fontSize: final.yLabelSize, tickLine: final.tickLine, axisLine: final.axisLine, label: final.yAxisLabel ? {
                        value: final.yAxisLabel,
                        angle: isVertical ? 0 : -90,
                        position: isVertical ? 'insideLeft' : 'insideLeft'
                    } : undefined }, final.yAxisProps))),
                final.showTooltip && (react_1.default.createElement(recharts_1.Tooltip, __assign({ content: react_1.default.createElement(TooltipComponent, { formatter: final.tooltipFormatter }), formatter: final.tooltipFormatter }, final.tooltipProps))),
                final.showLegend && react_1.default.createElement(recharts_1.Legend, __assign({}, final.legendProps)),
                parsedSeries.map(function (s, index) {
                    if (!s || !s.dataKey) {
                        console.warn('Invalid series configuration at index:', index);
                        return null;
                    }
                    try {
                        return (react_1.default.createElement(recharts_1.Bar, { key: s.dataKey || "series-".concat(index), dataKey: s.dataKey, name: s.label || s.dataKey, fill: resolveColor(s.color), stroke: s.stroke ? resolveColor(s.stroke) : undefined, strokeWidth: s.strokeWidth || 0, fillOpacity: s.fillOpacity !== undefined ? s.fillOpacity : 0.8, barSize: s.barSize || final.barSize, maxBarSize: s.maxBarSize || final.maxBarSize, stackId: s.stackId, background: s.background || false, minPointSize: s.minPointSize, isAnimationActive: final.isAnimationActive, animationDuration: final.animationDuration, onClick: final.onBarClick, onMouseEnter: final.onBarMouseEnter, onMouseLeave: final.onBarMouseLeave, activeBar: s.activeBar !== false ? (typeof s.activeBar === 'object' ? s.activeBar : {
                                fill: resolveColor(s.color),
                                stroke: resolveColor(s.stroke),
                                strokeWidth: 2,
                                fillOpacity: 1
                            }) : false }));
                    }
                    catch (error) {
                        console.error('Error rendering bar series:', error);
                        return null;
                    }
                })))));
};
exports.default = Bars;
