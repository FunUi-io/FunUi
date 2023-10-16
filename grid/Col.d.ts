import { ReactNode, HTMLProps } from 'react';
interface ColProps extends HTMLProps<HTMLDivElement> {
    sm?: number;
    md?: number;
    lg?: number;
    children?: ReactNode;
    funcss?: string;
    id?: string;
}
export default function Col({ sm, md, lg, children, funcss, id, ...rest }: ColProps): any;
export {};
