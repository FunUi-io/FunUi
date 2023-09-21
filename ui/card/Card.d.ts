import React, { ReactNode } from 'react';
interface CardProps {
    color?: string;
    bg?: string;
    width?: string;
    height?: string;
    minHeight?: string;
    minWidth?: string;
    margin?: string;
    padding?: string;
    funcss?: string;
    children?: ReactNode;
    roundEdge?: boolean;
    maxHeight?: string;
    maxWidth?: string;
    horizontal?: boolean;
    id?: string;
    header?: ReactNode;
    body?: ReactNode;
    footer?: ReactNode;
    image?: ReactNode;
    noGap?: boolean;
    fab?: ReactNode;
    responsiveSmall?: boolean;
    responsiveMedium?: boolean;
}
export default function Card({ color, bg, width, height, minHeight, minWidth, margin, padding, funcss, children, roundEdge, maxHeight, maxWidth, horizontal, id, header, body, footer, noGap, fab, image, responsiveMedium, responsiveSmall }: CardProps): React.JSX.Element;
export {};
