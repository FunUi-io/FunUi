import { ReactNode, HTMLProps } from 'react';
import * as React from 'react';
interface Circle_Props extends HTMLProps<HTMLDivElement> {
    size?: number;
    funcss?: string;
    bg?: string;
    color?: string;
    children?: ReactNode;
    hoverable?: boolean;
    className?: string;
    raised?: boolean;
    bordered?: boolean;
    key?: React.Key;
    body?: ReactNode;
    style?: React.CSSProperties;
    onClick?: () => void;
}
export default function Circle({ size, funcss, bg, color, children, hoverable, raised, key, onClick, className, bordered, body, style, ...rest }: Circle_Props): React.JSX.Element;
export {};
