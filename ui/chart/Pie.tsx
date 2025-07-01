'use client';

import React from 'react';
import {
  PieChart as RePieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

type PieDataItem = {
  label: string;
  value: number;
  color?: string;
};

interface PieChartProps {
  data: PieDataItem[];
  donut?: boolean;
  showLegend?: boolean;
  funcss?: string;
  width?: number | string;
  height?: number | string;
  outerRadius?: number;
  innerRadius?: number;
  tooltipFormatter?: (value: any, name: string, props: any) => React.ReactNode;
  legendProps?: any;
}

// Get CSS variable value from :root
const getCssVar = (varName: string): string => {
  if (typeof window === 'undefined') return '';
  return (
    getComputedStyle(document.documentElement)
      .getPropertyValue(`--${varName}`)
      ?.trim() || ''
  );
};

// Resolve color from CSS var or fallback
const resolveColor = (input?: string, fallback = '#8884d8') => {
  if (!input) return getCssVar('primary') || fallback;
  if (input.startsWith('#')) return input;
  return getCssVar(input) || input;
};

// Custom Tooltip
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="dark raised round-edge p-2 text-sm">
        <div className="text-bold">{payload[0].name}</div>
        <div style={{ lineHeight: 1 }}>
          Count: <span className="font-semibold">{payload[0].value}</span>
        </div>
      </div>
    );
  }
  return null;
};

const ChartPie: React.FC<PieChartProps> = ({
  data,
  donut = false,
  showLegend = true,
  funcss = '',
  width,
  height,
  outerRadius = 100,
  innerRadius,
  tooltipFormatter,
  legendProps = {},
}) => {
  const chart = (
    <RePieChart
      width={typeof width === 'number' ? width : undefined}
      height={typeof height === 'number' ? height : undefined}
    >
      <Tooltip content={<CustomTooltip />} formatter={tooltipFormatter} />
      {showLegend && <Legend {...legendProps} />}
      <Pie
        data={data}
        dataKey="value"
        nameKey="label"
        cx="50%"
        cy="50%"
        outerRadius={outerRadius}
        innerRadius={donut ? innerRadius ?? outerRadius * 0.6 : 0}
        label={false} // <-- Hide slice value labels
        labelLine={false} // <-- Remove line pointers
      >
        {data.map((entry, index) => (
          <Cell
            key={`cell-${index}`}
            fill={resolveColor(entry.color)}
            stroke="#ffffff"
            strokeWidth={1}
          />
        ))}
      </Pie>
    </RePieChart>
  );

  if (!width && !height) {
    return (
      <ResponsiveContainer width="100%" height={300} className={funcss}>
        {chart}
      </ResponsiveContainer>
    );
  }

  return (
    <div
      className={funcss}
      style={{
        width: typeof width === 'number' ? `${width}px` : width || '100%',
        height: typeof height === 'number' ? `${height}px` : height || '300px',
      }}
    >
      {chart}
    </div>
  );
};

export default ChartPie;
