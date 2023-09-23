import { ReactNode, HTMLProps } from 'react';
import * as React from 'react';
interface ButtonProps extends HTMLProps<HTMLButtonElement> {
    color?: string;
    bg?: string;
    funcss?: string;
    startIcon?: ReactNode;
    endIcon?: ReactNode;
    text?: string;
    rounded?: boolean;
    raised?: boolean;
    height?: string;
    width?: string;
    float?: boolean;
    hoverUp?: boolean;
    fullWidth?: boolean;
    outlined?: boolean;
    small?: boolean;
    smaller?: boolean;
    big?: boolean;
    bigger?: boolean;
    jumbo?: boolean;
    flat?: boolean;
    hoverNone?: boolean;
    fillAnimation?: boolean;
    fillDirection?: string;
    fillTextColor?: string;
    buttonFillStyle?: React.CSSProperties;
    outlineSize?: number;
    disabled?: boolean;
    isLoading?: boolean;
    status?: 'success' | 'warning' | 'info' | 'danger';
    children?: React.ReactNode;
    onClick?: () => void;
}
export default function Button({ color, bg, funcss, startIcon, endIcon, text, rounded, raised, height, width, float, hoverUp, fullWidth, outlined, small, smaller, big, bigger, jumbo, flat, hoverNone, fillAnimation, fillDirection, fillTextColor, outlineSize, disabled, isLoading, status, children, onClick, ...rest }: ButtonProps): any;
export {};
