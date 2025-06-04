import * as React from 'react';
type DivProps = {
    children?: React.ReactNode;
    funcss?: string;
    content?: React.ReactNode;
    minHeight?: string;
    maxHeight?: string;
    maxWidth?: string;
    minWidth?: string;
    height?: string;
    width?: string;
    padding?: string;
    margin?: string;
    fit?: boolean;
    customStyle?: React.CSSProperties;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
};
declare const Div: ({ children, funcss, content, minHeight, maxHeight, maxWidth, minWidth, height, width, padding, margin, fit, customStyle, ...rest }: DivProps) => React.JSX.Element;
export default Div;
