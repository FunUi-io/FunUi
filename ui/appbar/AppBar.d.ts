import * as React from 'react';
interface NavbarProps {
    fixedTop?: boolean;
    funcss?: string;
    padding?: string;
    fixedBottom?: boolean;
    justify?: string;
    children?: React.ReactNode;
    left?: React.ReactNode;
    center?: React.ReactNode;
    right?: React.ReactNode;
    sidebarTrigger?: React.ReactNode;
    transparent?: boolean;
    sideBar?: number;
}
export default function AppBar({ fixedTop, funcss, padding, fixedBottom, justify, left, center, right, sideBar, sidebarTrigger, transparent, }: NavbarProps): React.JSX.Element;
export {};
