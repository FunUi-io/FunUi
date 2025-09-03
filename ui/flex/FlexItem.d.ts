import React from 'react';
interface FlexItemProps {
    className?: string;
    funcss?: string;
    id?: string;
    children?: React.ReactNode;
    style?: React.CSSProperties;
    flex?: string;
    grow?: number;
    shrink?: number;
    basis?: string;
    alignSelf?: 'auto' | 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
    fullWidth?: boolean;
    fullHeight?: boolean;
}
export default function FlexItem({ className, funcss, id, children, style, flex, grow, shrink, basis, alignSelf, fullWidth, fullHeight, ...rest }: FlexItemProps): React.JSX.Element;
export {};
