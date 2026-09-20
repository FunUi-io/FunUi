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
// Default color palette for pie charts
var defaultColors = [
    '#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#8dd1e1',
    '#d084d0', '#ff8042', '#a4de6c', '#d0ed57', '#ffbb28'
];
// Default Tooltip with error handling
var CustomTooltip = function (_a) {
    var _b;
    var active = _a.active, payload = _a.payload, label = _a.label, formatter = _a.formatter;
    if (!active || !payload || !Array.isArray(payload) || payload.length === 0) {
        return null;
    }
    try {
        var data = payload[0];
        return (react_1.default.createElement("div", { className: "card raised round-edge p-2 text-sm", style: {
                maxWidth: '300px',
                backgroundColor: 'var(--background, #fff)',
                border: '1px solid var(--border-color, #e2e8f0)'
            } },
            react_1.default.createElement("div", { className: "text-bold mb-1", style: { color: 'var(--text-color, #1a202c)' } }, data.name || 'N/A'),
            react_1.default.createElement("div", { style: { lineHeight: 1.4, display: 'flex', alignItems: 'center', gap: '8px' } },
                react_1.default.createElement("div", { style: {
                        width: '12px',
                        height: '12px',
                        backgroundColor: data.color || ((_b = data.payload) === null || _b === void 0 ? void 0 : _b.fill) || '#8884d8',
                        borderRadius: '2px'
                    } }),
                react_1.default.createElement("span", { style: { fontWeight: 500, color: 'var(--text-color, #1a202c)' } }, "Value:"),
                react_1.default.createElement("span", { style: { fontWeight: 600, color: 'var(--text-color, #1a202c)' } }, formatter ? formatter(data.value, data.name, data) : data.value)),
            data.payload && data.payload.percentage && (react_1.default.createElement("div", { style: { marginTop: '4px', fontSize: '0.75rem', color: 'var(--text-muted, #6b7280)' } },
                data.payload.percentage,
                "%"))));
    }
    catch (error) {
        console.error('Error rendering tooltip:', error);
        return (react_1.default.createElement("div", { className: "card raised round-edge p-2 text-sm" },
            react_1.default.createElement("div", { className: "text-error" }, "Error displaying tooltip")));
    }
};
// Default Label component
var CustomLabel = function (_a) {
    var cx = _a.cx, cy = _a.cy, midAngle = _a.midAngle, innerRadius = _a.innerRadius, outerRadius = _a.outerRadius, percent = _a.percent, value = _a.value, name = _a.name;
    if (!percent || percent < 0.05)
        return null; // Hide labels for very small slices
    var RADIAN = Math.PI / 180;
    var radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    var x = cx + radius * Math.cos(-midAngle * RADIAN);
    var y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (react_1.default.createElement("text", { x: x, y: y, fill: "white", textAnchor: x > cx ? 'start' : 'end', dominantBaseline: "central", fontSize: "12", fontWeight: "600" }, "".concat((percent * 100).toFixed(0), "%")));
};
var ChartPie = function (localProps) {
    // Use component configuration with variant support
    var mergeWithLocal = (0, componentUtils_1.useComponentConfiguration)('ChartPie', localProps.variant).mergeWithLocal;
    // Merge with config - LOCAL PROPS OVERRIDE CONFIG
    var mergedProps = mergeWithLocal(localProps).props;
    // Debug: Log what props are actually coming through
    react_1.default.useEffect(function () {
        console.log('ChartPie merged props:', mergedProps);
        console.log('ChartPie config available:', Object.keys(mergedProps).length > 0);
    }, [mergedProps]);
    // Parse data if it's a string with enhanced validation
    var parsedData = (0, react_1.useMemo)(function () {
        var parsed = parseIfString(mergedProps.data, []);
        var safeData = getSafeArray(parsed);
        // Calculate percentages for tooltip
        var total = safeData.reduce(function (sum, item) { return sum + (item.value || 0); }, 0);
        return safeData.map(function (item) { return (__assign(__assign({}, item), { percentage: total > 0 ? ((item.value / total) * 100).toFixed(1) : '0' })); });
    }, [mergedProps.data]);
    // Check if we have valid data to display
    var hasValidData = parsedData.length > 0;
    // Use mergedProps directly - no need for complex fallback logic
    var final = mergedProps;
    // Configure legend based on position - WITH SAFE ACCESS
    var legendConfig = (0, react_1.useMemo)(function () {
        // Safely access legendProps with defaults
        var safeLegendProps = final.legendProps || {};
        var safeWrapperStyle = safeLegendProps.wrapperStyle || {};
        var baseProps = __assign({ align: 'center', layout: final.legendPosition === 'left' || final.legendPosition === 'right' ? 'vertical' : 'horizontal', verticalAlign: final.legendPosition === 'top' ? 'top' : final.legendPosition === 'bottom' ? 'bottom' : 'middle', wrapperStyle: __assign({ paddingTop: final.legendPosition === 'top' ? '0' : '10px' }, safeWrapperStyle) }, safeLegendProps);
        return baseProps;
    }, [final.legendPosition, final.legendProps]);
    var TooltipComponent = final.customTooltip || CustomTooltip;
    var LabelComponent = final.customLabel || (final.showLabels ? CustomLabel : undefined);
    var containerStyle = (0, react_1.useMemo)(function () { return ({
        height: final.height || '300px', // Default height for pie chart
        width: final.width || '100%', // Default width
        minHeight: final.minHeight || '250px', // Minimum height
        maxHeight: final.maxHeight || '100%',
        minWidth: final.minWidth || '100%',
        maxWidth: final.maxWidth || '100%',
        background: final.chartBackground,
        borderRadius: final.borderRadius,
        padding: final.padding,
        boxShadow: final.shadow ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : undefined,
    }); }, [final]);
    // Calculate inner radius for donut chart
    var innerRadius = (0, react_1.useMemo)(function () {
        if (final.donut) {
            return final.innerRadius || (typeof final.outerRadius === 'number' ? final.outerRadius * 0.6 : '60%');
        }
        return 0;
    }, [final.donut, final.innerRadius, final.outerRadius]);
    // Show empty state if no data
    if (!hasValidData) {
        return (react_1.default.createElement("div", { className: "flex items-center justify-center ".concat(final.funcss), style: containerStyle },
            react_1.default.createElement("div", { className: "text-center text-muted" },
                react_1.default.createElement("div", { className: "text-lg mb-2" }, "\uD83E\uDD67"),
                react_1.default.createElement("div", null, "No chart data available"))));
    }
    return (react_1.default.createElement("div", { className: final.funcss, style: containerStyle, id: final.id },
        react_1.default.createElement(recharts_1.ResponsiveContainer, { width: "100%" // Must be set for responsive behavior
            , height: "100%" // Must be set for responsive behavior
            , aspect: final.aspect, minHeight: final.minHeight ? String(final.minHeight) : '250px', minWidth: final.minWidth ? String(final.minWidth) : '100%' },
            react_1.default.createElement(recharts_1.PieChart, null,
                final.showTooltip !== false && (react_1.default.createElement(recharts_1.Tooltip, __assign({ content: react_1.default.createElement(TooltipComponent, { formatter: final.tooltipFormatter }), formatter: final.tooltipFormatter }, final.tooltipProps))),
                final.showLegend && (react_1.default.createElement(recharts_1.Legend, __assign({}, legendConfig, { className: final.legendCss }))),
                react_1.default.createElement(recharts_1.Pie, { data: parsedData, dataKey: "value", nameKey: "label", cx: "50%", cy: "50%", outerRadius: final.outerRadius || '80%', innerRadius: innerRadius, paddingAngle: final.paddingAngle, cornerRadius: final.cornerRadius, startAngle: final.startAngle, endAngle: final.endAngle, minAngle: final.minAngle || 0, label: LabelComponent ? react_1.default.createElement(LabelComponent, null) : final.showLabels, labelLine: final.showLabelLine !== false, isAnimationActive: final.isAnimationActive !== false, animationDuration: final.animationDuration || 400, onClick: final.onPieClick, onMouseEnter: final.onPieEnter, onMouseLeave: final.onPieLeave, activeShape: final.activeShape, inactiveShape: final.inactiveShape }, parsedData.map(function (entry, index) { return (react_1.default.createElement(recharts_1.Cell, { key: "cell-".concat(index), fill: resolveColor(entry.color) || defaultColors[index % defaultColors.length], stroke: resolveColor(final.strokeColor) || '#fff', strokeWidth: final.strokeWidth || 1 })); }))))));
};
exports.default = ChartPie;
