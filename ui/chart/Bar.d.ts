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
    stroke?: string;
    fillOpacity?: number;
    radius?: number | [number, number, number, number];
    barSize?: number;
    activeBar?: boolean | Record<string, any>;
    stackId?: string;
    background?: boolean | Record<string, any>;
    minPointSize?: number;
    maxBarSize?: number;
};
interface XAxisProps {
    interval?: number | 'preserveStart' | 'preserveEnd' | 'preserveStartEnd';
    tick?: boolean | Record<string, any>;
    tickFormatter?: (value: any) => string;
    domain?: [number | string | 'auto' | 'dataMin' | 'dataMax', number | string | 'auto' | 'dataMin' | 'dataMax'];
    type?: 'number' | 'category';
    allowDataOverflow?: boolean;
    scale?: 'auto' | 'linear' | 'pow' | 'sqrt' | 'log' | 'identity' | 'time' | 'band' | 'point' | 'ordinal' | 'quantile' | 'quantize' | 'utc' | 'sequential' | 'threshold';
    padding?: {
        left?: number;
        right?: number;
    };
}
interface YAxisProps {
    interval?: number | 'preserveStart' | 'preserveEnd' | 'preserveStartEnd';
    tick?: boolean | Record<string, any>;
    tickFormatter?: (value: any) => string;
    domain?: [number | string | 'auto' | 'dataMin' | 'dataMax', number | string | 'auto' | 'dataMin' | 'dataMax'];
    type?: 'number' | 'category';
    allowDataOverflow?: boolean;
    scale?: 'auto' | 'linear' | 'pow' | 'sqrt' | 'log' | 'identity' | 'time' | 'band' | 'point' | 'ordinal' | 'quantile' | 'quantize' | 'utc' | 'sequential' | 'threshold';
    padding?: {
        top?: number;
        bottom?: number;
    };
}
interface LegendProps {
    align?: 'left' | 'center' | 'right';
    verticalAlign?: 'top' | 'middle' | 'bottom';
    layout?: 'horizontal' | 'vertical';
    iconType?: 'line' | 'square' | 'rect' | 'circle' | 'cross' | 'diamond' | 'star' | 'triangle' | 'wye';
    wrapperStyle?: Record<string, any>;
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
interface BarsProps {
    data: DataItem[] | string;
    series: ChartSeries[] | string;
    id?: string;
    variant?: string;
    width?: number | string;
    height?: number | string;
    layout?: 'horizontal' | 'vertical';
    margin?: {
        top?: number;
        right?: number;
        left?: number;
        bottom?: number;
    };
    barRadius?: number | [number, number, number, number];
    barSize?: number;
    barGap?: number | string;
    barCategoryGap?: number | string;
    maxBarSize?: number;
    showGrid?: boolean;
    horizontalLines?: boolean;
    verticalLines?: boolean;
    showLegend?: boolean;
    showXAxis?: boolean;
    showYAxis?: boolean;
    showTooltip?: boolean;
    funcss?: string;
    rotateLabel?: number;
    xLabelSize?: string | number;
    yLabelSize?: string | number;
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
    stackOffset?: 'expand' | 'none' | 'wiggle' | 'silhouette' | 'sign';
    barCategoryGapPercentage?: number;
    chartBackground?: string;
    borderRadius?: string;
    padding?: string;
    shadow?: boolean;
    aspect?: number;
    minHeight?: number | string;
    maxHeight?: number | string;
    minWidth?: number | string;
    maxWidth?: number | string;
    onBarClick?: (data: any, index: number, event: React.MouseEvent) => void;
    onBarMouseEnter?: (data: any, index: number, event: React.MouseEvent) => void;
    onBarMouseLeave?: (data: any, index: number, event: React.MouseEvent) => void;
}
declare const Bars: React.FC<BarsProps>;
export default Bars;
