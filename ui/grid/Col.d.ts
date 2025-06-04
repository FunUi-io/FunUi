import { ReactNode, HTMLProps } from 'react';
import * as React from 'react';
interface ColProps extends HTMLProps<HTMLDivElement> {
    sm?: number;
    md?: number;
    lg?: number;
    children?: ReactNode;
    funcss?: string;
    id?: string;
    smOrder?: number;
    mdOrder?: number;
    lgOrder?: number;
}
export default function Col({ sm, md, lg, children, funcss, id, smOrder, mdOrder, lgOrder, ...rest }: ColProps): React.JSX.Element;
export {};
