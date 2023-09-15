import { ReactNode, HTMLProps } from 'react';
import * as React from 'react';
interface Circle_Props extends HTMLProps<HTMLDivElement> {
    size?: number;
    funcss?: string;
    bg?: string;
    children?: ReactNode;
    hoverable?: boolean;
}
export default function Circle({ size, funcss, bg, content, children, hoverable, }: Circle_Props): React.JSX.Element;
export {};
