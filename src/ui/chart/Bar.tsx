'use client';

import React, { useMemo } from 'react';
import {
  BarChart,
  Bar,
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
  stroke?: string;
  fillOpacity?: number;
  radius?: number | [number, number, number, number];
  barSize?: number;
  activeBar?: boolean | Record<string, any>;
  stackId?: string;
  background?: boolean | Record<string, any>;
  minPointSize?: number;
  maxBarSize?: number;
};

interface XAxisProps {
  interval?: number | 'preserveStart' | 'preserveEnd' | 'preserveStartEnd';
  tick?: boolean | Record<string, any>;
  tickFormatter?: (value: any) => string;
  domain?: [number | string | 'auto' | 'dataMin' | 'dataMax', number | string | 'auto' | 'dataMin' | 'dataMax'];
  type?: 'number' | 'category';
  allowDataOverflow?: boolean;
  scale?: 'auto' | 'linear' | 'pow' | 'sqrt' | 'log' | 'identity' | 'time' | 'band' | 'point' | 'ordinal' | 'quantile' | 'quantize' | 'utc' | 'sequential' | 'threshold';
  padding?: { left?: number; right?: number };
}

interface YAxisProps {
  interval?: number | 'preserveStart' | 'preserveEnd' | 'preserveStartEnd';
  tick?: boolean | Record<string, any>;
  tickFormatter?: (value: any) => string;
  domain?: [number | string | 'auto' | 'dataMin' | 'dataMax', number | string | 'auto' | 'dataMin' | 'dataMax'];
  type?: 'number' | 'category';
  allowDataOverflow?: boolean;
  scale?: 'auto' | 'linear' | 'pow' | 'sqrt' | 'log' | 'identity' | 'time' | 'band' | 'point' | 'ordinal' | 'quantile' | 'quantize' | 'utc' | 'sequential' | 'threshold';
  padding?: { top?: number; bottom?: number };
}

interface LegendProps {
  align?: 'left' | 'center' | 'right';
  verticalAlign?: 'top' | 'middle' | 'bottom';
  layout?: 'horizontal' | 'vertical';
  iconType?: 'line' | 'square' | 'rect' | 'circle' | 'cross' | 'diamond' | 'star' | 'triangle' | 'wye';
  wrapperStyle?: Record<string, any>;
}

interface TooltipProps {
  cursor?: boolean | Record<string, any>;
  separator?: string;
  offset?: number;
  allowEscapeViewBox?: { x?: boolean; y?: boolean };
  wrapperStyle?: Record<string, any>;
}

interface BarsProps {
  data: DataItem[] | string;
  series: ChartSeries[] | string;
  id?: string;
  variant?: string;

  // Layout & Dimensions
  width?: number | string;
  height?: number | string;
  layout?: 'horizontal' | 'vertical';
  margin?: { top?: number; right?: number; left?: number; bottom?: number };

  // Bar styling
  barRadius?: number | [number, number, number, number];
  barSize?: number;
  barGap?: number | string;
  barCategoryGap?: number | string;
  maxBarSize?: number;

  // Display controls
  showGrid?: boolean;
  horizontalLines?: boolean;
  verticalLines?: boolean;
  showLegend?: boolean;
  showXAxis?: boolean;
  showYAxis?: boolean;
  showTooltip?: boolean;

  // Appearance controls
  funcss?: string;
  rotateLabel?: number;
  xLabelSize?: string | number;
  yLabelSize?: string | number;
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

  // Stacking & Grouping
  stackOffset?: 'expand' | 'none' | 'wiggle' | 'silhouette' | 'sign';
  barCategoryGapPercentage?: number;

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

  // Advanced
  onBarClick?: (data: any, index: number, event: React.MouseEvent) => void;
  onBarMouseEnter?: (data: any, index: number, event: React.MouseEvent) => void;
  onBarMouseLeave?: (data: any, index: number, event: React.MouseEvent) => void;
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
const resolveColor = (color?: string): string => {
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
    success: '#52c41a',
    info: '#1890ff'
  };
  
  return colorMap[color] || color || '#8884d8';
};

// Your original CustomTooltip component (unchanged)
const CustomTooltip = ({ active, payload, label, formatter }: any) => {
  if (!active || !payload || !Array.isArray(payload) || payload.length === 0) {
    return null;
  }

  try {
    return (
      <div 
        className="card raised round-edge p-2 text-sm"
        style={{ 
          maxWidth: '300px',
        }}
      >
        <div className="text-bold mb-1" style={{ color: 'var(--text-color, #1a202c)' }}>
          {label || 'N/A'}
        </div>
        {payload.map((entry: any, index: number) => {
          if (!entry) return null;
          
          const value = formatter ? formatter(entry.value, entry.name, entry) : entry.value;
          const displayValue = value != null ? value : 'N/A';
          const displayName = entry.name || 'Unknown';
          const displayColor = entry.color || entry.fill || '#8884d8';

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
              <span style={{ fontWeight: 500, color: 'var(--text-color, #1a202c)' }}>{displayName}:</span>
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

const Bars: React.FC<BarsProps> = (localProps) => {
  // Use component configuration with variant support
  const { mergeWithLocal } = useComponentConfiguration('Bar', localProps.variant);
  
  // Merge with config - LOCAL PROPS OVERRIDE CONFIG
  const { props: mergedProps } = mergeWithLocal(localProps);

  // Debug: Log what props are actually coming through
  React.useEffect(() => {
    console.log('Bars merged props:', mergedProps);
    console.log('Bars config available:', Object.keys(mergedProps).length > 0);
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
  const isVertical = mergedProps.layout === 'vertical';

  // Use mergedProps directly - no need for complex fallback logic
  const final = mergedProps;

  // Smart default margins based on layout
  const smartMargin = useMemo(() => {
    const baseMargin = { top: 10, right: 30, left: 0, bottom: 20 };
    
    if (isVertical) {
      return {
        ...baseMargin,
        left: 60,
        bottom: final.xAxisLabel ? 40 : 20,
        ...final.margin
      };
    }
    
    return {
      ...baseMargin,
      bottom: final.xAxisLabel ? 50 : 20,
      ...final.margin
    };
  }, [isVertical, final.margin, final.xAxisLabel]);

  // Smart height for vertical layout based on data length
  const smartHeight = useMemo(() => {
    if (final.height !== 300) return final.height;
    
    if (isVertical) {
      return Math.max(300, parsedData.length * 45);
    }
    
    return final.height;
  }, [final.height, isVertical, parsedData.length]);

  const TooltipComponent = final.customTooltip || CustomTooltip;

  const containerStyle = useMemo(() => ({
    height: final.height || '400px', // Default height
    width: final.width || '100%',    // Default width
    minHeight: final.minHeight || '300px', // Minimum height
    maxHeight: final.maxHeight || '100%',
    minWidth: final.minWidth || '100%',
    maxWidth: final.maxWidth || '100%',
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
      className={final.funcss}
      style={containerStyle}
      id={final.id}
    >
      {/* ResponsiveContainer with proper dimensions */}
      <ResponsiveContainer 
        width="100%"      // Must be set for responsive behavior
        height="100%"     // Must be set for responsive behavior
        aspect={final.aspect}
        minHeight={final.minHeight ? String(final.minHeight) : undefined}
        minWidth={final.minWidth ? String(final.minWidth) : undefined}
      >
        <BarChart 
          data={parsedData} 
          layout={final.layout}
          margin={smartMargin}
          barGap={final.barGap}
          barCategoryGap={final.barCategoryGap}
          stackOffset={final.stackOffset}
          syncId={final.syncId}
        >
          {/* Grid */}
          {final.showGrid && (
            <CartesianGrid 
              strokeDasharray={final.gridStrokeDasharray}
              stroke={final.gridStroke || getCssVar('borderColor') || '#e2e8f0'}
              horizontal={final.horizontalLines !== false}
              vertical={final.verticalLines !== false}
            />
          )}

          {/* Axes */}
          {final.showXAxis && (
            <XAxis
              type={isVertical ? 'number' : 'category'}
              dataKey={isVertical ? undefined : 'label'}
              interval={final.xInterval}
              padding={{ left: 10, right: 10 }}
              fontSize={final.xLabelSize}
              strokeWidth={0.2}
              angle={final.rotateLabel || (isVertical ? 0 : -35)}
              dy={final.dy ?? (isVertical ? 0 : 10)}
              tickLine={final.tickLine}
              axisLine={final.axisLine}
              label={final.xAxisLabel ? { 
                value: final.xAxisLabel, 
                position: isVertical ? 'insideBottom' : 'insideBottom', 
                offset: isVertical ? -10 : -30 
              } : undefined}
              {...final.xAxisProps}
            />
          )}
          {final.showYAxis && (
            <YAxis
              type={isVertical ? 'category' : 'number'}
              dataKey={isVertical ? 'label' : undefined}
              interval={final.yInterval}
              strokeWidth={0.2}
              fontSize={final.yLabelSize}
              tickLine={final.tickLine}
              axisLine={final.axisLine}
              label={final.yAxisLabel ? { 
                value: final.yAxisLabel, 
                angle: isVertical ? 0 : -90, 
                position: isVertical ? 'insideLeft' : 'insideLeft' 
              } : undefined}
              {...final.yAxisProps}
            />
          )}

          {/* Tooltip & Legend - Using YOUR original tooltip design */}
          {final.showTooltip && (
            <Tooltip 
              content={<TooltipComponent formatter={final.tooltipFormatter} />} 
              formatter={final.tooltipFormatter}
              {...final.tooltipProps}
            />
          )}
          {final.showLegend && <Legend {...final.legendProps} />}

          {/* Bars */}
          {parsedSeries.map((s: ChartSeries, index: number) => {
            if (!s || !s.dataKey) {
              console.warn('Invalid series configuration at index:', index);
              return null;
            }

            try {
              return (
                <Bar
                  key={s.dataKey || `series-${index}`}
                  dataKey={s.dataKey}
                  name={s.label || s.dataKey}
                  fill={resolveColor(s.color)}
                  stroke={s.stroke ? resolveColor(s.stroke) : undefined}
                  strokeWidth={s.strokeWidth || 0}
                  fillOpacity={s.fillOpacity !== undefined ? s.fillOpacity : 0.8}
                  barSize={s.barSize || final.barSize}
                  maxBarSize={s.maxBarSize || final.maxBarSize}
                  stackId={s.stackId}
                  background={s.background || false}
                  minPointSize={s.minPointSize}
                  isAnimationActive={final.isAnimationActive !== false}
                  animationDuration={final.animationDuration || 400}
                  onClick={final.onBarClick}
                  onMouseEnter={final.onBarMouseEnter}
                  onMouseLeave={final.onBarMouseLeave}
                  activeBar={s.activeBar !== false ? (typeof s.activeBar === 'object' ? s.activeBar : { 
                    fill: resolveColor(s.color), 
                    stroke: resolveColor(s.stroke), 
                    strokeWidth: 2,
                    fillOpacity: 1 
                  }) : false}
                  radius={s.radius || final.barRadius}
                />
              );
            } catch (error) {
              console.error('Error rendering bar series:', error);
              return null;
            }
          })}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Bars;