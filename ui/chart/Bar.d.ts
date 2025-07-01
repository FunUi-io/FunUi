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
    showGrid?: boolean;
    showLegend?: boolean;
    showXAxis?: boolean;
    showYAxis?: boolean;
    funcss?: string;
    barRadius?: number;
    barSize?: number;
    width?: number | string;
    height?: number | string;
    margin?: {
        top?: number;
        right?: number;
        left?: number;
        bottom?: number;
    };
    xAxisProps?: any;
    yAxisProps?: any;
    tooltipFormatter?: (value: any, name: string, props: any) => React.ReactNode;
    legendProps?: any;
}
declare const Bars: React.FC<BarsProps>;
export default Bars;
