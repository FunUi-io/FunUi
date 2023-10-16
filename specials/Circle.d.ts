import { ReactNode, HTMLProps } from 'react';
interface Circle_Props extends HTMLProps<HTMLDivElement> {
    size?: number;
    funcss?: string;
    bg?: string;
    children?: ReactNode;
    hoverable?: boolean;
}
export default function Circle({ size, funcss, bg, children, hoverable, }: Circle_Props): any;
export {};
