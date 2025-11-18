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
    fillOpacity?: number;
    strokeDasharray?: string;
    activeDot?: boolean | Record<string, any>;
};
interface XAxisProps {
    interval?: number | 'preserveStart' | 'preserveEnd' | 'preserveStartEnd';
    tick?: boolean | Record<string, any>;
    tickFormatter?: (value: any) => string;
    domain?: [number | string | 'auto' | 'dataMin' | 'dataMax', number | string | 'auto' | 'dataMin' | 'dataMax'];
    type?: 'number' | 'category';
    allowDataOverflow?: boolean;
}
interface YAxisProps {
    interval?: number | 'preserveStart' | 'preserveEnd' | 'preserveStartEnd';
    tick?: boolean | Record<string, any>;
    tickFormatter?: (value: any) => string;
    domain?: [number | string | 'auto' | 'dataMin' | 'dataMax', number | string | 'auto' | 'dataMin' | 'dataMax'];
    type?: 'number' | 'category';
    allowDataOverflow?: boolean;
}
interface LegendProps {
    align?: 'left' | 'center' | 'right';
    verticalAlign?: 'top' | 'middle' | 'bottom';
    layout?: 'horizontal' | 'vertical';
    iconType?: 'line' | 'square' | 'rect' | 'circle' | 'cross' | 'diamond' | 'star' | 'triangle' | 'wye';
}
interface TooltipProps {
    cursor?: boolean | Record<string, any>;
    separator?: string;
    offset?: number;
    allowEscapeViewBox?: {
        x?: boolean;
        y?: boolean;
    };
}
interface AreaChartProps {
    data: DataItem[] | string;
    series: ChartSeries[] | string;
    fromColor?: string;
    toColor?: string;
    id?: string;
    variant?: string;
    showGrid?: boolean;
    horizontalLines?: boolean;
    showLegend?: boolean;
    showXAxis?: boolean;
    showYAxis?: boolean;
    showTooltip?: boolean;
    funcss?: string;
    curveType?: 'linear' | 'monotone' | 'step' | 'basis' | 'natural';
    rotateLabel?: number;
    xLabelSize?: string | number;
    yLabelSize?: string | number;
    height?: number | string;
    width?: number | string;
    margin?: {
        top?: number;
        right?: number;
        left?: number;
        bottom?: number;
    };
    xInterval?: number;
    yInterval?: number;
    gridStroke?: string;
    gridStrokeDasharray?: string;
    dy?: number;
    xAxisProps?: XAxisProps;
    yAxisProps?: YAxisProps;
    xAxisLabel?: string;
    yAxisLabel?: string;
    tickLine?: boolean;
    axisLine?: boolean;
    tooltipFormatter?: (value: any, name: string, props: any) => React.ReactNode;
    legendProps?: LegendProps;
    tooltipProps?: TooltipProps;
    customTooltip?: React.ComponentType<any>;
    animation?: boolean;
    animationDuration?: number;
    isAnimationActive?: boolean;
    syncId?: string;
    chartBackground?: string;
    borderRadius?: string;
    padding?: string;
    shadow?: boolean;
    aspect?: number;
    minHeight?: number | string;
    maxHeight?: number | string;
    minWidth?: number | string;
    maxWidth?: number | string;
}
declare const Lines: React.FC<AreaChartProps>;
export default Lines;
