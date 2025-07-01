import React from 'react';
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
declare const ChartPie: React.FC<PieChartProps>;
export default ChartPie;
