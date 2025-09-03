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
  color?: string;
};

interface BarsProps {
  data: DataItem[];
  series: ChartSeries[];

  width?: number | string;
  height?: number | string;
  layout?: 'horizontal' | 'vertical';
  margin?: { top?: number; right?: number; bottom?: number; left?: number };

  barRadius?: number;
  barSize?: number;
  barGap?: number | string;
  barCategoryGap?: number | string;

  showXAxis?: boolean;
  showYAxis?: boolean;
  xAxisProps?: any;
  yAxisProps?: any;
  xInterval?: number;
  yInterval?: number;

  showGrid?: boolean;
  gridProps?: any;

  showTooltip?: boolean;
  tooltipFormatter?: (value: any, name: string, props: any) => React.ReactNode;
  showLegend?: boolean;
  legendProps?: any;

  isAnimationActive?: boolean;

  funcss?: string;
}

const getCssVar = (varName: string): string => {
  if (typeof window === 'undefined') return '';
  return getComputedStyle(document.documentElement).getPropertyValue(varName)?.trim() || '';
};

const resolveColor = (color?: string): string => {
  if (!color) return getCssVar('--primary') || '#8884d8';
  if (color.startsWith('#')) return color;
  return getCssVar(`--${color}`) || color;
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="dark raised round-edge p-2 text-sm">
        <div className="text-bold">{label}</div>
        {payload.map((entry: any, index: number) => (
          <div key={index}>
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

  width = '100%',
  height,
  layout = 'horizontal',
  margin = {},

  barRadius = 6,
  barSize = 30,
  barGap = 4,
  barCategoryGap = '10%',

  showXAxis = true,
  showYAxis = true,
  xAxisProps = {},
  yAxisProps = {},
  xInterval = 0,
  yInterval = 0,

  showGrid = true,
  gridProps = {},

  showTooltip = true,
  tooltipFormatter,
  showLegend = true,
  legendProps = {},

  isAnimationActive = true,

  funcss,
}) => {
  const isVertical = layout === 'vertical';

  // Smart default margins
  const defaultMargin = {
    top: 20,
    right: 30,
    bottom: isVertical ? 30 : 50,
    left: isVertical ? 100 : 40,
  };
  const mergedMargin = { ...defaultMargin, ...margin };

  // Smart height for vertical layout based on data length
  const autoHeight = isVertical ? Math.max(300, data.length * 45) : 300;
  const resolvedHeight = height || autoHeight;

  return (
    <ResponsiveContainer className={funcss || ''} width={width} height={resolvedHeight}>
      <BarChart
        data={data}
        layout={layout}
        margin={mergedMargin}
        barGap={barGap}
        barCategoryGap={barCategoryGap}
      >
        {showGrid && <CartesianGrid strokeDasharray="3 3" {...gridProps} />}

        {/* Axis Logic */}
        {isVertical ? (
          <>
            {/* Vertical layout (bars go left to right) */}
            {showYAxis && (
              <YAxis
                type="category"
                dataKey="label"
                interval={0}
                tick={{
                  angle: 0,
                  fontSize: 12,
                  textAnchor: 'start',
                  dx: -5,
                  dy: 4,
                  fill: '#555',
                  ...(yAxisProps.tick || {}),
                }}
                tickMargin={10}
                {...yAxisProps}
              />
            )}
            {showXAxis && (
              <XAxis
                type="number"
                interval={xInterval}
                tick={{ fontSize: 12 }}
                {...xAxisProps}
              />
            )}
          </>
        ) : (
          <>
            {/* Horizontal layout (bars go bottom to top) */}
            {showXAxis && (
              <XAxis
                type="category"
                dataKey="label"
                interval={0}
                tick={{
                  fontSize: 12,
                  angle: 0,
                  fill: '#555',
                  ...xAxisProps.tick,
                }}
                tickMargin={8}
                {...xAxisProps}
              />
            )}
            {showYAxis && (
              <YAxis
                type="number"
                interval={yInterval}
                tick={{ fontSize: 12 }}
                {...yAxisProps}
              />
            )}
          </>
        )}

        {/* Tooltip */}
        {showTooltip && (
          <Tooltip
            content={<CustomTooltip />}
            formatter={tooltipFormatter}
          />
        )}

        {/* Legend */}
        {showLegend && <Legend {...legendProps} />}

        {/* Bars */}
        {series.map((s) => (
          <Bar
            key={s.dataKey}
            dataKey={s.dataKey}
            name={s.label || s.dataKey}
            fill={resolveColor(s.color)}
            radius={
              layout === 'horizontal'
                ? [barRadius, barRadius, 0, 0]
                : [0, barRadius, barRadius, 0]
            }
            barSize={barSize}
            isAnimationActive={isAnimationActive}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Bars;
