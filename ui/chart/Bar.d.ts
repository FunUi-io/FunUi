import React from 'react';
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
    margin?: {
        top?: number;
        right?: number;
        bottom?: number;
        left?: number;
    };
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
declare const Bars: React.FC<BarsProps>;
export default Bars;
