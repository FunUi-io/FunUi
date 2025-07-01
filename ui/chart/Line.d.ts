import React from 'react';
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
    showGrid?: boolean;
    horizontalLines?: boolean;
    showLegend?: boolean;
    showXAxis?: boolean;
    showYAxis?: boolean;
    funcss?: string;
    curveType?: 'linear' | 'monotone' | 'step' | 'basis';
    height?: number | string;
    width?: number | string;
    margin?: {
        top?: number;
        right?: number;
        left?: number;
        bottom?: number;
    };
    dy?: number;
    xAxisProps?: any;
    yAxisProps?: any;
    tooltipFormatter?: (value: any, name: string, props: any) => React.ReactNode;
    legendProps?: any;
}
declare const Lines: React.FC<AreaChartProps>;
export default Lines;
