import { ReactNode } from 'react';
import * as React from 'react';
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
export default function SideBar({ funcss, position, glassy, header, open, content, close, footer, fixed, ...rest }: FunLoaderProps): React.JSX.Element;
export {};
