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

// Parse string to object utility with enhanced error handling
const parseIfString = <T,>(value: T | string, fallback: T): T => {
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value) as T;
      // Additional validation for arrays
      if (Array.isArray(fallback) && !Array.isArray(parsed)) {
        console.warn('Parsed value is not an array, using fallback');
        return fallback;
      }
      return parsed;
    } catch (error) {
      console.error('Failed to parse JSON string:', error);
      return fallback;
    }
  }
  
  // Handle null/undefined values
  if (value == null) {
    return fallback;
  }
  
  return value as T;
};

// Safe array access utility
const getSafeArray = <T,>(value: T[] | undefined | null, fallback: T[] = []): T[] => {
  if (!value || !Array.isArray(value)) return fallback;
  return value;
};

// CSS var resolver with error handling
const getCssVar = (varName: string): string => {
  if (typeof window === 'undefined') return '';
  try {
    return getComputedStyle(document.documentElement).getPropertyValue(`--${varName}`)?.trim() || '';
  } catch (error) {
    console.warn(`Failed to get CSS variable --${varName}:`, error);
    return '';
  }
};

// Color resolver with fallbacks
const resolveStrokeColor = (color?: string): string => {
  if (!color) return getCssVar('primary') || '#8884d8';
  if (color.startsWith('#')) return color;
  
  const cssColor = getCssVar(color);
  if (cssColor) return cssColor;
  
  // Fallback to common color names if CSS var not found
  const colorMap: Record<string, string> = {
    primary: '#8884d8',
    secondary: '#82ca9d',
    error: '#ff4d4f',
    warning: '#faad14',
    success: '#52c41a'
  };
  
  return colorMap[color] || color || '#8884d8';
};

// Default Tooltip with error handling
const CustomTooltip = ({ active, payload, label, formatter }: any) => {
  if (!active || !payload || !Array.isArray(payload) || payload.length === 0) {
    return null;
  }

  try {
    return (
      <div 
        className="card raised round-edge p-2 text-sm"
        style={{ 
          maxWidth: '300px'
        }}
      >
        <div className="text-bold mb-1">
          {label || 'N/A'}
        </div>
        {payload.map((entry: any, index: number) => {
          if (!entry) return null;
          
          const value = formatter ? formatter(entry.value, entry.name, entry) : entry.value;
          const displayValue = value != null ? value : 'N/A';
          const displayName = entry.name || 'Unknown';
          const displayColor = entry.color || '#8884d8';

          return (
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
                  backgroundColor: displayColor,
                  borderRadius: '2px'
                }}
              />
              <span style={{ fontWeight: 500 }}>{displayName}:</span>
              <span style={{ fontWeight: 600, color: 'var(--text-color, #1a202c)' }}>
                {displayValue}
              </span>
            </div>
          );
        })}
      </div>
    );
  } catch (error) {
    console.error('Error rendering tooltip:', error);
    return (
      <div className="card raised round-edge p-2 text-sm">
        <div className="text-error">Error displaying tooltip</div>
      </div>
    );
  }
};

const Lines: React.FC<AreaChartProps> = (localProps) => {
  // Use component configuration with variant support
  const { mergeWithLocal } = useComponentConfiguration('Lines', localProps.variant);
  
  // Merge with config - LOCAL PROPS OVERRIDE CONFIG
  const { props: mergedProps } = mergeWithLocal(localProps);

  // Debug: Log what props are actually coming through
  React.useEffect(() => {
    console.log('Lines merged props:', mergedProps);
    console.log('Lines config available:', Object.keys(mergedProps).length > 0);
  }, [mergedProps]);

  // Parse data and series if they're strings with enhanced validation
  const parsedData = useMemo(() => {
    const parsed = parseIfString<DataItem[]>(mergedProps.data, []);
    return getSafeArray(parsed);
  }, [mergedProps.data]);
  
  const parsedSeries = useMemo(() => {
    const parsed = parseIfString<ChartSeries[]>(mergedProps.series, []);
    return getSafeArray(parsed).filter(series => 
      series && typeof series === 'object' && series.dataKey
    );
  }, [mergedProps.series]);

  // Check if we have valid data to display
  const hasValidData = parsedData.length > 0 && parsedSeries.length > 0;

  // Use mergedProps directly - no need for complex fallback logic
  const final = mergedProps;

  const baseGradientId = final.id || 'areaChartGradient';
  const TooltipComponent = final.customTooltip || CustomTooltip;

  // Generate per-series gradients with error handling
  const gradients = useMemo(() => {
    if (!parsedSeries || !Array.isArray(parsedSeries)) return [];

    return parsedSeries.map((s: ChartSeries, index: number) => {
      if (!s || typeof s !== 'object') return null;
      
      try {
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
      } catch (error) {
        console.error('Error generating gradient for series:', error);
        return null;
      }
    }).filter(Boolean);
  }, [parsedSeries, baseGradientId, final.fromColor, final.toColor]);

  // Default gradient for series without custom gradients
  const defaultGradient = useMemo(() => (
    <linearGradient id={baseGradientId} x1="0" y1="0" x2="0" y2="1">
      <stop
        offset="5%"
        stopColor={getCssVar(final.fromColor || 'primary') || '#8884d8'}
        stopOpacity={0.8}
      />
      <stop
        offset="95%"
        stopColor={getCssVar(final.toColor || 'primary200') || '#8884d8'}
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

  // Show empty state if no data
  if (!hasValidData) {
    return (
      <div 
        className={`flex items-center justify-center ${final.funcss}`}
        style={containerStyle}
      >
        <div className="text-center text-muted">
          <div className="text-lg mb-2">📊</div>
          <div>No chart data available</div>
        </div>
      </div>
    );
  }

  return (
   <div 
   style={{
  height:final.height || "400px" ,
  width: final.width || "100%",
}}
   >
     <ResponsiveContainer 
      aspect={final.aspect}
      className={final.funcss}
      style={containerStyle}
    >
      <AreaChart 
        data={parsedData} 
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

        {/* Area series with error boundary per series */}
        {parsedSeries.map((s: ChartSeries, index: number) => {
          if (!s || !s.dataKey) {
            console.warn('Invalid series configuration at index:', index);
            return null;
          }

          try {
            const hasCustomGradient = s.fromColor || s.toColor;
            const gradientId = hasCustomGradient 
              ? `${baseGradientId}-${index}` 
              : baseGradientId;
            
            return (
              <Area
                key={s.dataKey || `series-${index}`}
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
          } catch (error) {
            console.error('Error rendering area series:', error);
            return null;
          }
        })}
      </AreaChart>
    </ResponsiveContainer>
   </div>
  );
};

export default Lines;