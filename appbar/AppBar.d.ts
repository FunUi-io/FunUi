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
    visibleLinks: boolean;
    sidebarTrigger: React.ReactNode;
}
export default function AppBar({ fixedTop, funcss, padding, fixedBottom, justify, children, left, center, right, visibleLinks, sidebarTrigger }: NavbarProps): any;
export {};
