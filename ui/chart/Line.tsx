'use client';

import React from 'react';
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
};

interface AreaChartProps {
  data: DataItem[];
  series: ChartSeries[];
  fromColor?: string;
  toColor?: string;
  id?: string;

  // Display controls
  showGrid?: boolean;
  horizontalLines?: boolean;
  showLegend?: boolean;
  showXAxis?: boolean;
  showYAxis?: boolean;

  // Appearance controls
  funcss?: string;
  curveType?: 'linear' | 'monotone' | 'step' | 'basis';
  height?: number | string;
  width?: number | string;
  margin?: { top?: number; right?: number; left?: number; bottom?: number };

  // Axis controls
  dy?: number;
  xAxisProps?: any;
  yAxisProps?: any;

  // Tooltip / Legend
  tooltipFormatter?: (value: any, name: string, props: any) => React.ReactNode;
  legendProps?: any;
}

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

// Tooltip
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="dark raised round-edge p-2 text-sm">
        <div className="text-bold">{label}</div>
        {payload.map((entry: any, index: number) => (
          <div key={index} style={{ lineHeight: 1 }}>
            {entry.name}: <span className="font-semibold">{entry.value}</span>
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
  funcss,
  curveType = 'monotone',
  height = "100%",
  width = '100%',
  margin = { top: 10, right: 30, left: 0, bottom: 20 },
  xAxisProps = {},
  yAxisProps = {},
  tooltipFormatter,
  legendProps = {},
}) => {
  const gradientId = id || 'colorUv';

  return (
    <ResponsiveContainer width={width} height={height} className={funcss}>
      <AreaChart data={data} margin={margin}>
        {/* Gradient Fill */}
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor={getCssVar(fromColor || 'primary')}
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor={getCssVar(toColor || 'primary200')}
              stopOpacity={0}
            />
          </linearGradient>
        </defs>

        {/* Grid */}
        {showGrid && <CartesianGrid strokeDasharray="3 3" />}
        {!showGrid && horizontalLines && (
          <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
        )}

        {/* Axes */}
        {showXAxis && (
          <XAxis
            interval={0}
            padding={{ left: 10, right: 10 }}
            fontSize="0.8rem"
            strokeWidth={horizontalLines ? 0 : 0.2}
            dataKey="label"
            angle={-35}
            dy={dy ?? 10}
            {...xAxisProps}
          />
        )}
        {showYAxis && (
          <YAxis
            interval={0}
            strokeWidth={horizontalLines ? 0 : 0.2}
            fontSize="0.8rem"
            {...yAxisProps}
          />
        )}

        {/* Tooltip & Legend */}
        <Tooltip content={<CustomTooltip />} formatter={tooltipFormatter} />
        {showLegend && <Legend {...legendProps} />}

        {/* Area series */}
        {series.map((s, index) => (
          <Area
            key={s.dataKey}
            type={curveType}
            dataKey={s.dataKey}
            name={s.label || s.dataKey}
            stroke={resolveStrokeColor(s.color)}
            fill={`url(#${gradientId})`}
            fillOpacity={1}
            strokeWidth={s.strokeWidth || 2}
            dot={s.dot !== false ? { r: 4 } : false}
            activeDot={{ r: 8 }}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default Lines;
