import React from 'react';
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
    allowEscapeViewBox?: {
        x?: boolean;
        y?: boolean;
    };
    wrapperStyle?: Record<string, any>;
}
interface PieChartProps {
    data: PieDataItem[] | string;
    id?: string;
    variant?: string;
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
    showLegend?: boolean;
    showTooltip?: boolean;
    showLabels?: boolean;
    showLabelLine?: boolean;
    labelPosition?: 'inside' | 'outside' | 'center' | 'radial';
    legendPosition?: 'top' | 'bottom' | 'left' | 'right';
    funcss?: string;
    legendCss?: string;
    chartBackground?: string;
    borderRadius?: string;
    padding?: string;
    shadow?: boolean;
    strokeWidth?: number;
    strokeColor?: string;
    activeShape?: boolean | Record<string, any>;
    inactiveShape?: boolean | Record<string, any>;
    tooltipFormatter?: (value: any, name: string, props: any) => React.ReactNode;
    labelFormatter?: (value: any, name: string, props: any) => React.ReactNode;
    legendProps?: LegendProps;
    tooltipProps?: TooltipProps;
    customTooltip?: React.ComponentType<any>;
    customLabel?: React.ComponentType<any>;
    animation?: boolean;
    animationDuration?: number;
    isAnimationActive?: boolean;
    onPieClick?: (data: any, index: number, event: React.MouseEvent) => void;
    onPieEnter?: (data: any, index: number, event: React.MouseEvent) => void;
    onPieLeave?: (data: any, index: number, event: React.MouseEvent) => void;
    aspect?: number;
    minHeight?: number | string;
    maxHeight?: number | string;
    minWidth?: number | string;
    maxWidth?: number | string;
}
declare const ChartPie: React.FC<PieChartProps>;
export default ChartPie;
