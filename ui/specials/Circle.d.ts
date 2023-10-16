import { ReactNode, HTMLProps } from 'react';
interface Circle_Props extends HTMLProps<HTMLDivElement> {
    size?: number;
    funcss?: string;
    bg?: string;
    children?: ReactNode;
    hoverable?: boolean;
    raised?: boolean;
}
export default function Circle({ size, funcss, bg, children, hoverable, raised }: Circle_Props): any;
export {};
