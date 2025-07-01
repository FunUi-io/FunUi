'use client';

import React from 'react';
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

type DataItem = {
  label: string;
  [key: string]: any;
};

type ChartSeries = {
  dataKey: string;
  label?: string;
  color?: string; // CSS variable name (e.g. 'primary') or hex
};

interface BarsProps {
  data: DataItem[];
  series: ChartSeries[];

  // Style and behavior
  showGrid?: boolean;
  showLegend?: boolean;
  showXAxis?: boolean;
  showYAxis?: boolean;
  funcss?: string;
  barRadius?: number;
  barSize?: number;
  width?: number | string;
  height?: number | string;
  margin?: { top?: number; right?: number; left?: number; bottom?: number };

  // Axis custom props
  xAxisProps?: any;
  yAxisProps?: any;

  // Tooltip and legend customization
  tooltipFormatter?: (value: any, name: string, props: any) => React.ReactNode;
  legendProps?: any;
}

// Resolve CSS variables
const getCssVar = (varName: string): string => {
  if (typeof window === 'undefined') return '';
  return getComputedStyle(document.documentElement).getPropertyValue(varName)?.trim() || '';
};

const resolveColor = (color?: string): string => {
  if (!color) return getCssVar('--primary') || '#8884d8';
  if (color.startsWith('#')) return color;
  return getCssVar(`--${color}`) || color;
};

// Custom Tooltip
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

const Bars: React.FC<BarsProps> = ({
  data,
  series,
  showGrid = true,
  showLegend = true,
  showXAxis = true,
  showYAxis = false,
  barRadius = 6,
  funcss,
  barSize = 30,
  width = '100%',
  height = "100%",
  margin = { top: 10, right: 30, left: 0, bottom: 20 },
  xAxisProps = {},
  yAxisProps = {},
  tooltipFormatter,
  legendProps = {},
}) => {
  return (
    <ResponsiveContainer className={funcss || ``} width={width} height={height}>
      <BarChart data={data} margin={margin}>
        {showGrid && <CartesianGrid strokeDasharray="3 3" />}
        {showXAxis && <XAxis dataKey="label" {...xAxisProps} />}
        {showYAxis && <YAxis {...yAxisProps} />}
        <Tooltip content={<CustomTooltip />} formatter={tooltipFormatter} />
        {showLegend && <Legend {...legendProps} />}
        {series.map((s) => (
          <Bar
            key={s.dataKey}
            dataKey={s.dataKey}
            name={s.label || s.dataKey}
            fill={resolveColor(s.color)}
            radius={[barRadius, barRadius, 0, 0]}
            barSize={barSize}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Bars;
