'use client';

import React, { useMemo } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import { useComponentConfiguration } from '../../utils/componentUtils';

type DataItem = {
  label: string;
  [key: string]: any;
};

type ChartSeries = {
  dataKey: string;
  label?: string;
  color?: string;
  strokeWidth?: number;
  dot?: boolean;
  fromColor?: string;
  toColor?: string;
  fillOpacity?: number;
  strokeDasharray?: string;
  activeDot?: boolean | Record<string, any>;
};

interface XAxisProps {
  interval?: number | 'preserveStart' | 'preserveEnd' | 'preserveStartEnd';
  tick?: boolean | Record<string, any>;
  tickFormatter?: (value: any) => string;
  domain?: [number | string | 'auto' | 'dataMin' | 'dataMax', number | string | 'auto' | 'dataMin' | 'dataMax'];
  type?: 'number' | 'category';
  allowDataOverflow?: boolean;
}

interface YAxisProps {
  interval?: number | 'preserveStart' | 'preserveEnd' | 'preserveStartEnd';
  tick?: boolean | Record<string, any>;
  tickFormatter?: (value: any) => string;
  domain?: [number | string | 'auto' | 'dataMin' | 'dataMax', number | string | 'auto' | 'dataMin' | 'dataMax'];
  type?: 'number' | 'category';
  allowDataOverflow?: boolean;
}

interface LegendProps {
  align?: 'left' | 'center' | 'right';
  verticalAlign?: 'top' | 'middle' | 'bottom';
  layout?: 'horizontal' | 'vertical';
  iconType?: 'line' | 'square' | 'rect' | 'circle' | 'cross' | 'diamond' | 'star' | 'triangle' | 'wye';
}

interface TooltipProps {
  cursor?: boolean | Record<string, any>;
  separator?: string;
  offset?: number;
  allowEscapeViewBox?: { x?: boolean; y?: boolean };
}

interface AreaChartProps {
  data: DataItem[] | string;
  series: ChartSeries[] | string;
  fromColor?: string;
  toColor?: string;
  id?: string;
  variant?: string;

  // Display controls
  showGrid?: boolean;
  horizontalLines?: boolean;
  showLegend?: boolean;
  showXAxis?: boolean;
  showYAxis?: boolean;
  showTooltip?: boolean;

  // Appearance controls
  funcss?: string;
  curveType?: 'linear' | 'monotone' | 'step' | 'basis' | 'natural';
  rotateLabel?: number;
  xLabelSize?: string | number;
  yLabelSize?: string | number;
  height?: number | string;
  width?: number | string;
  margin?: { top?: number; right?: number; left?: number; bottom?: number };
  xInterval?: number;
  yInterval?: number;
  gridStroke?: string;
  gridStrokeDasharray?: string;

  // Axis controls
  dy?: number;
  xAxisProps?: XAxisProps;
  yAxisProps?: YAxisProps;
  xAxisLabel?: string;
  yAxisLabel?: string;
  tickLine?: boolean;
  axisLine?: boolean;

  // Tooltip / Legend
  tooltipFormatter?: (value: any, name: string, props: any) => React.ReactNode;
  legendProps?: LegendProps;
  tooltipProps?: TooltipProps;
  customTooltip?: React.ComponentType<any>;

  // Animation & Interaction
  animation?: boolean;
  animationDuration?: number;
  isAnimationActive?: boolean;
  syncId?: string;

  // Styling
  chartBackground?: string;
  borderRadius?: string;
  padding?: string;
  shadow?: boolean;
  
  // Responsive
  aspect?: number;
  minHeight?: number | string;
  maxHeight?: number | string;
  minWidth?: number | string;
  maxWidth?: number | string;
}

// Parse string to object utility
const parseIfString = <T,>(value: T | string, fallback: T): T => {
  if (typeof value === 'string') {
    try {
      return JSON.parse(value) as T;
    } catch (error) {
      console.error('Failed to parse JSON string:', error);
      return fallback;
    }
  }
  return value as T;
};

// CSS var resolver
const getCssVar = (varName: string): string => {
  if (typeof window === 'undefined') return '';
  return getComputedStyle(document.documentElement).getPropertyValue(`--${varName}`)?.trim() || '';
};

// Color resolver
const resolveStrokeColor = (color?: string): string => {
  if (!color) return getCssVar('primary') || '#8884d8';
  if (color.startsWith('#')) return color;
  return getCssVar(color) || color;
};

// Default Tooltip
const CustomTooltip = ({ active, payload, label, formatter }: any) => {
  if (active && payload && payload.length) {
    return (
      <div 
        className="card raised round-edge p-2 text-sm"
        style={{ 
          maxWidth: '300px'
        }}
      >
        <div className="text-bold mb-1" >
          {label}
        </div>
        {payload.map((entry: any, index: number) => (
          <div 
            key={index} 
            style={{ 
              lineHeight: 1.4,
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <div 
              style={{
                width: '12px',
                height: '12px',
                backgroundColor: entry.color,
                borderRadius: '2px'
              }}
            />
            <span style={{ fontWeight: 500 }}>{entry.name}:</span>
            <span style={{ fontWeight: 600, color: 'var(--text-color, #1a202c)' }}>
              {formatter ? formatter(entry.value, entry.name, entry) : entry.value}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const Lines: React.FC<AreaChartProps> = ({
  data,
  id,
  series,
  fromColor,
  toColor,
  dy,
  showGrid = true,
  horizontalLines = false,
  showLegend = true,
  showXAxis = true,
  showYAxis = false,
  showTooltip = true,
  funcss,
  curveType = 'monotone',
  height = "100%",
  width = '100%',
  margin = { top: 10, right: 30, left: 0, bottom: 20 },
  xAxisProps = {},
  yAxisProps = {},
  tooltipFormatter,
  legendProps = {},
  tooltipProps = {},
  rotateLabel,
  xLabelSize,
  yLabelSize,
  xInterval,
  yInterval,
  variant = '',
  xAxisLabel,
  yAxisLabel,
  tickLine = true,
  axisLine = true,
  gridStroke,
  gridStrokeDasharray = "3 3",
  customTooltip,
  animation = true,
  animationDuration = 500,
  isAnimationActive = true,
  syncId,
  chartBackground,
  borderRadius,
  padding,
  shadow = false,
  aspect,
  minHeight,
  maxHeight,
  minWidth,
  maxWidth
}) => {
  // Use component configuration with variant support
  const { mergeWithLocal } = useComponentConfiguration('AreaChart', variant);

  // Create local props object
  const localProps = {
    data,
    id,
    series,
    fromColor,
    toColor,
    dy,
    showGrid,
    horizontalLines,
    showLegend,
    showXAxis,
    showYAxis,
    showTooltip,
    funcss,
    curveType,
    height,
    width,
    margin,
    xAxisProps,
    yAxisProps,
    tooltipFormatter,
    legendProps,
    tooltipProps,
    rotateLabel,
    xLabelSize,
    yLabelSize,
    xInterval,
    yInterval,
    xAxisLabel,
    yAxisLabel,
    tickLine,
    axisLine,
    gridStroke,
    gridStrokeDasharray,
    customTooltip,
    animation,
    animationDuration,
    isAnimationActive,
    syncId,
    chartBackground,
    borderRadius,
    padding,
    shadow,
    aspect,
    minHeight,
    maxHeight,
    minWidth,
    maxWidth
  };

  // Merge with config - LOCAL PROPS OVERRIDE CONFIG
  const { props: mergedProps } = mergeWithLocal(localProps);

  // Parse data and series if they're strings
  const parsedData = useMemo(
    () => parseIfString<DataItem[]>(mergedProps.data, []),
    [mergedProps.data]
  );
  
  const parsedSeries = useMemo(
    () => parseIfString<ChartSeries[]>(mergedProps.series, []),
    [mergedProps.series]
  );

  // Extract final values
  const final = useMemo(() => ({
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
  }), [parsedData, parsedSeries, mergedProps]);

  const baseGradientId = final.id || 'areaChartGradient';
  const TooltipComponent = final.customTooltip || CustomTooltip;

  // Generate per-series gradients
  const gradients = useMemo(() => {
    return final.series.map((s: ChartSeries, index: number) => {
      if (!s.fromColor && !s.toColor) return null;
      
      const gradientId = `${baseGradientId}-${index}`;
      const startColor = resolveStrokeColor(s.fromColor || s.color || final.fromColor);
      const endColor = resolveStrokeColor(s.toColor || final.toColor);
      
      return (
        <linearGradient key={gradientId} id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop
            offset="5%"
            stopColor={startColor}
            stopOpacity={0.8}
          />
          <stop
            offset="95%"
            stopColor={endColor}
            stopOpacity={0}
          />
        </linearGradient>
      );
    });
  }, [final.series, baseGradientId, final.fromColor, final.toColor]);

  // Default gradient for series without custom gradients
  const defaultGradient = useMemo(() => (
    <linearGradient id={baseGradientId} x1="0" y1="0" x2="0" y2="1">
      <stop
        offset="5%"
        stopColor={getCssVar(final.fromColor || 'primary')}
        stopOpacity={0.8}
      />
      <stop
        offset="95%"
        stopColor={getCssVar(final.toColor || 'primary200')}
        stopOpacity={0}
      />
    </linearGradient>
  ), [baseGradientId, final.fromColor, final.toColor]);

  const containerStyle = useMemo(() => ({
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
  }), [final]);

  return (
    <ResponsiveContainer 
      width={final.width} 
      height={final.height}
      aspect={final.aspect}
      className={final.funcss}
      style={containerStyle}
    >
      <AreaChart 
        data={final.data} 
        margin={final.margin}
        syncId={final.syncId}
      >
        {/* Gradient Fills */}
        <defs>
          {defaultGradient}
          {gradients}
        </defs>

        {/* Grid */}
        {final.showGrid && (
          <CartesianGrid 
            strokeDasharray={final.gridStrokeDasharray}
            stroke={final.gridStroke || getCssVar('border-color') || '#e2e8f0'}
          />
        )}
        {!final.showGrid && final.horizontalLines && (
          <CartesianGrid 
            strokeDasharray={final.gridStrokeDasharray}
            horizontal={true} 
            vertical={false}
            stroke={final.gridStroke || getCssVar('border-color') || '#e2e8f0'}
          />
        )}

        {/* Axes */}
        {final.showXAxis && (
          <XAxis
            interval={final.xInterval}
            padding={{ left: 10, right: 10 }}
            fontSize={final.xLabelSize || "0.8rem"}
            strokeWidth={final.horizontalLines ? 0 : 0.2}
            dataKey="label"
            angle={final.rotateLabel || -35}
            dy={final.dy ?? 10}
            tickLine={final.tickLine}
            axisLine={final.axisLine}
            label={final.xAxisLabel ? { value: final.xAxisLabel, position: 'insideBottom', offset: -10 } : undefined}
            {...final.xAxisProps}
          />
        )}
        {final.showYAxis && (
          <YAxis
            interval={final.yInterval}
            strokeWidth={final.horizontalLines ? 0 : 0.2}
            fontSize={final.yLabelSize || "0.8rem"}
            tickLine={final.tickLine}
            axisLine={final.axisLine}
            label={final.yAxisLabel ? { value: final.yAxisLabel, angle: -90, position: 'insideLeft' } : undefined}
            {...final.yAxisProps}
          />
        )}

        {/* Tooltip & Legend */}
        {final.showTooltip && (
          <Tooltip 
            content={<TooltipComponent formatter={final.tooltipFormatter} />} 
            formatter={final.tooltipFormatter}
            {...final.tooltipProps}
          />
        )}
        {final.showLegend && <Legend {...final.legendProps} />}

        {/* Area series */}
        {final.series.map((s: ChartSeries, index: number) => {
          const hasCustomGradient = s.fromColor || s.toColor;
          const gradientId = hasCustomGradient 
            ? `${baseGradientId}-${index}` 
            : baseGradientId;
          
          return (
            <Area
              key={s.dataKey || index}
              type={final.curveType}
              dataKey={s.dataKey}
              name={s.label || s.dataKey}
              stroke={resolveStrokeColor(s.color)}
              fill={hasCustomGradient || final.fromColor ? `url(#${gradientId})` : resolveStrokeColor(s.color)}
              fillOpacity={s.fillOpacity !== undefined ? s.fillOpacity : 0.6}
              strokeWidth={s.strokeWidth || 2}
              strokeDasharray={s.strokeDasharray}
              dot={s.dot !== false ? { r: 4 } : false}
              activeDot={s.activeDot !== false ? (typeof s.activeDot === 'object' ? s.activeDot : { r: 6, strokeWidth: 2 }) : false}
              isAnimationActive={final.isAnimationActive}
              animationDuration={final.animationDuration}
            />
          );
        })}
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default Lines;