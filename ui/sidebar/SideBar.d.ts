import React, { ReactNode } from 'react';
interface SideBarLink {
    uri: string;
    icon: React.ReactNode;
    text: string;
    section: string;
}
interface SideBarProps {
    funcss?: string;
    position?: 'left' | 'right';
    open?: boolean;
    header?: ReactNode;
    content?: ReactNode;
    footer?: ReactNode;
    top?: number;
    sidebarWidth?: number;
    sidebarCss?: string;
    activeCss?: string;
    iconCSS?: string;
    bodyCss?: string;
    popIcon?: boolean;
    dividers?: boolean;
    links?: SideBarLink[];
    children?: ReactNode;
    onClose?: () => void;
}
export default function SideBar({ funcss, position, open, header, content, footer, top, sidebarWidth, iconCSS, sidebarCss, activeCss, bodyCss, popIcon, dividers, links, children, onClose, }: SideBarProps): React.JSX.Element;
export {};
