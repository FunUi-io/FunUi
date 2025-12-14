'use client';

import React, { useMemo } from 'react';
import {
  PieChart as RePieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useComponentConfiguration } from '../../utils/componentUtils';

type PieDataItem = {
  label: string;
  value: number;
  color?: string;
  [key: string]: any;
};

interface LegendProps {
  align?: 'left' | 'center' | 'right';
  verticalAlign?: 'top' | 'middle' | 'bottom';
  layout?: 'horizontal' | 'vertical';
  iconType?: 'line' | 'square' | 'rect' | 'circle' | 'cross' | 'diamond' | 'star' | 'triangle' | 'wye';
  wrapperStyle?: Record<string, any>;
  formatter?: (value: any, entry: any, index: number) => React.ReactNode;
}

interface TooltipProps {
  cursor?: boolean | Record<string, any>;
  separator?: string;
  offset?: number;
  allowEscapeViewBox?: { x?: boolean; y?: boolean };
  wrapperStyle?: Record<string, any>;
}

interface PieChartProps {
  data: PieDataItem[] | string;
  id?: string;
  variant?: string;

  // Chart Type & Layout
  donut?: boolean;
  width?: number | string;
  height?: number | string;
  outerRadius?: number | string;
  innerRadius?: number | string;
  paddingAngle?: number;
  cornerRadius?: number;
  startAngle?: number;
  endAngle?: number;
  minAngle?: number;

  // Display Controls
  showLegend?: boolean;
  showTooltip?: boolean;
  showLabels?: boolean;
  showLabelLine?: boolean;
  labelPosition?: 'inside' | 'outside' | 'center' | 'radial';
  legendPosition?: 'top' | 'bottom' | 'left' | 'right';

  // Appearance
  funcss?: string;
  legendCss?: string;
  chartBackground?: string;
  borderRadius?: string;
  padding?: string;
  shadow?: boolean;

  // Styling
  strokeWidth?: number;
  strokeColor?: string;
  activeShape?: boolean | Record<string, any>;
  inactiveShape?: boolean | Record<string, any>;

  // Tooltip / Legend
  tooltipFormatter?: (value: any, name: string, props: any) => React.ReactNode;
  labelFormatter?: (value: any, name: string, props: any) => React.ReactNode;
  legendProps?: LegendProps;
  tooltipProps?: TooltipProps;
  customTooltip?: React.ComponentType<any>;
  customLabel?: React.ComponentType<any>;

  // Animation & Interaction
  animation?: boolean;
  animationDuration?: number;
  isAnimationActive?: boolean;
  onPieClick?: (data: any, index: number, event: React.MouseEvent) => void;
  onPieEnter?: (data: any, index: number, event: React.MouseEvent) => void;
  onPieLeave?: (data: any, index: number, event: React.MouseEvent) => void;

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

// Default color palette for pie charts
const defaultColors = [
  '#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#8dd1e1',
  '#d084d0', '#ff8042', '#a4de6c', '#d0ed57', '#ffbb28'
];

// Default Tooltip with error handling
const CustomTooltip = ({ active, payload, label, formatter }: any) => {
  if (!active || !payload || !Array.isArray(payload) || payload.length === 0) {
    return null;
  }

  try {
    const data = payload[0];
    return (
      <div 
        className="card raised round-edge p-2 text-sm"
        style={{ 
          maxWidth: '300px',
          backgroundColor: 'var(--background, #fff)',
          border: '1px solid var(--border-color, #e2e8f0)'
        }}
      >
        <div className="text-bold mb-1" style={{ color: 'var(--text-color, #1a202c)' }}>
          {data.name || 'N/A'}
        </div>
        <div style={{ lineHeight: 1.4, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div 
            style={{
              width: '12px',
              height: '12px',
              backgroundColor: data.color || data.payload?.fill || '#8884d8',
              borderRadius: '2px'
            }}
          />
          <span style={{ fontWeight: 500, color: 'var(--text-color, #1a202c)' }}>Value:</span>
          <span style={{ fontWeight: 600, color: 'var(--text-color, #1a202c)' }}>
            {formatter ? formatter(data.value, data.name, data) : data.value}
          </span>
        </div>
        {data.payload && data.payload.percentage && (
          <div style={{ marginTop: '4px', fontSize: '0.75rem', color: 'var(--text-muted, #6b7280)' }}>
            {data.payload.percentage}%
          </div>
        )}
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

// Default Label component
const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, value, name }: any) => {
  if (!percent || percent < 0.05) return null; // Hide labels for very small slices
  
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text 
      x={x} 
      y={y} 
      fill="white" 
      textAnchor={x > cx ? 'start' : 'end'} 
      dominantBaseline="central"
      fontSize="12"
      fontWeight="600"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const ChartPie: React.FC<PieChartProps> = (localProps) => {
  // Use component configuration with variant support
  const { mergeWithLocal } = useComponentConfiguration('ChartPie', localProps.variant);
  
  // Merge with config - LOCAL PROPS OVERRIDE CONFIG
  const { props: mergedProps } = mergeWithLocal(localProps);

  // Debug: Log what props are actually coming through
  React.useEffect(() => {
    console.log('ChartPie merged props:', mergedProps);
    console.log('ChartPie config available:', Object.keys(mergedProps).length > 0);
  }, [mergedProps]);

  // Parse data if it's a string with enhanced validation
  const parsedData = useMemo(() => {
    const parsed = parseIfString<PieDataItem[]>(mergedProps.data, []);
    const safeData = getSafeArray(parsed);
    
    // Calculate percentages for tooltip
    const total = safeData.reduce((sum, item) => sum + (item.value || 0), 0);
    return safeData.map(item => ({
      ...item,
      percentage: total > 0 ? ((item.value / total) * 100).toFixed(1) : '0'
    }));
  }, [mergedProps.data]);

  // Check if we have valid data to display
  const hasValidData = parsedData.length > 0;

  // Use mergedProps directly - no need for complex fallback logic
  const final = mergedProps;

  // Configure legend based on position - WITH SAFE ACCESS
  const legendConfig = useMemo(() => {
    // Safely access legendProps with defaults
    const safeLegendProps = final.legendProps || {};
    const safeWrapperStyle = safeLegendProps.wrapperStyle || {};
    
    const baseProps = {
      align: 'center' as const,
      layout: final.legendPosition === 'left' || final.legendPosition === 'right' ? 'vertical' : 'horizontal',
      verticalAlign: final.legendPosition === 'top' ? 'top' : final.legendPosition === 'bottom' ? 'bottom' : 'middle',
      wrapperStyle: { 
        paddingTop: final.legendPosition === 'top' ? '0' : '10px',
        ...safeWrapperStyle 
      },
      ...safeLegendProps
    };

    return baseProps;
  }, [final.legendPosition, final.legendProps]);

  const TooltipComponent = final.customTooltip || CustomTooltip;
  const LabelComponent = final.customLabel || (final.showLabels ? CustomLabel : undefined);

  const containerStyle = useMemo(() => ({
    width: final.width,
    height: final.height,
    minHeight: final.minHeight,
    maxHeight: final.maxHeight,
    minWidth: final.minWidth,
    maxWidth: final.maxWidth,
    background: final.chartBackground,
    borderRadius: final.borderRadius,
    padding: final.padding,
    boxShadow: final.shadow ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : undefined,
  }), [final]);

  // Calculate inner radius for donut chart
  const innerRadius = useMemo(() => {
    if (final.donut) {
      return final.innerRadius || (typeof final.outerRadius === 'number' ? final.outerRadius * 0.6 : '60%');
    }
    return 0;
  }, [final.donut, final.innerRadius, final.outerRadius]);

  // Show empty state if no data
  if (!hasValidData) {
    return (
      <div 
        className={`flex items-center justify-center ${final.funcss}`}
        style={containerStyle}
      >
        <div className="text-center text-muted">
          <div className="text-lg mb-2">🥧</div>
          <div>No chart data available</div>
        </div>
      </div>
    );
  }

  const chartContent = (
    <RePieChart>
      {/* Tooltip */}
      {final.showTooltip && (
        <Tooltip 
          content={<TooltipComponent formatter={final.tooltipFormatter} />} 
          formatter={final.tooltipFormatter}
          {...final.tooltipProps}
        />
      )}

      {/* Legend */}
      {final.showLegend && (
        <Legend 
          {...legendConfig}
          className={final.legendCss}
        />
      )}

      {/* Pie */}
      <Pie
        data={parsedData}
        dataKey="value"
        nameKey="label"
        cx="50%"
        cy="50%"
        outerRadius={final.outerRadius}
        innerRadius={innerRadius}
        paddingAngle={final.paddingAngle}
        cornerRadius={final.cornerRadius}
        startAngle={final.startAngle}
        endAngle={final.endAngle}
        minAngle={final.minAngle}
        label={LabelComponent ? <LabelComponent /> : final.showLabels}
        labelLine={final.showLabelLine}
        isAnimationActive={final.isAnimationActive}
        animationDuration={final.animationDuration}
        onClick={final.onPieClick}
        onMouseEnter={final.onPieEnter}
        onMouseLeave={final.onPieLeave}
        activeShape={final.activeShape}
        inactiveShape={final.inactiveShape}
      >
        {parsedData.map((entry, index) => (
          <Cell
            key={`cell-${index}`}
            fill={resolveColor(entry.color) || defaultColors[index % defaultColors.length]}
            stroke={resolveColor(final.strokeColor)}
            strokeWidth={final.strokeWidth}
          />
        ))}
      </Pie>
    </RePieChart>
  );

  // Use ResponsiveContainer for automatic sizing
  return (
      <div 
   style={{
  height:final.height || "300px" ,
  width: final.width || "300px"
}}
   >
    <ResponsiveContainer 
      width={final.width} 
      height={final.height}
      aspect={final.aspect}
      className={final.funcss}
      style={containerStyle}
    >
      {chartContent}
    </ResponsiveContainer>
   </div>

  );
};

export default ChartPie;