import React from 'react';
interface FlexProps {
    as?: keyof JSX.IntrinsicElements;
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
    grow?: number;
    shrink?: number;
    basis?: string;
    flex?: string;
    responsiveSmall?: boolean;
    responsiveMedium?: boolean;
    responsiveLarge?: boolean;
    fullWidth?: boolean;
    fullHeight?: boolean;
}
export default function Flex({ as: Component, className, funcss, id, children, style, direction, wrap, justify, alignItems, alignContent, gap, gapX, gapY, gapUnit, grow, shrink, basis, flex, responsiveSmall, responsiveMedium, responsiveLarge, fullWidth, fullHeight, ...rest }: FlexProps): React.JSX.Element;
export {};
