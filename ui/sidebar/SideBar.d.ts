import { ReactNode } from 'react';
interface FunLoaderProps {
    funcss?: string;
    position?: "left" | "right";
    glassy?: boolean;
    open?: boolean;
    header?: ReactNode;
    content?: ReactNode;
    close?: ReactNode;
    footer?: ReactNode;
    fixed?: boolean;
}
export default function SideBar({ funcss, position, glassy, header, open, content, close, footer, fixed, ...rest }: FunLoaderProps): any;
export {};
