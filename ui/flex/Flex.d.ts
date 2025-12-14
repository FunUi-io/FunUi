import React from 'react';
interface FlexProps {
    className?: string;
    funcss?: string;
    id?: string;
    children?: React.ReactNode;
    style?: React.CSSProperties;
    direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
    wrap?: 'wrap' | 'nowrap' | 'wrap-reverse';
    justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
    alignItems?: 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline';
    alignContent?: 'stretch' | 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around';
    gap?: number;
    gapX?: number;
    gapY?: number;
    gapUnit?: 'rem' | 'px' | 'em';
    responsiveSmall?: boolean;
    responsiveMedium?: boolean;
    responsiveLarge?: boolean;
    width?: string;
    height?: string;
    fit?: Boolean;
}
export default function Flex({ className, funcss, id, children, style, direction, wrap, justify, alignItems, alignContent, gap, gapX, gapY, gapUnit, responsiveSmall, responsiveMedium, responsiveLarge, fit, width, height, ...rest }: FlexProps): React.JSX.Element;
export {};
