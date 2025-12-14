import React, { ReactNode } from 'react';
interface SideBarLink {
    uri: string;
    icon?: React.ReactNode;
    text: string;
    section: string;
    onClick?: () => void;
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
    accordionItemCss?: string;
    bodyCss?: string;
    popIcon?: boolean;
    dividers?: boolean;
    links?: SideBarLink[];
    children?: ReactNode;
    onClose?: () => void;
    isAccordion?: boolean;
}
export default function SideBar({ funcss, position, open, header, content, footer, top, sidebarWidth, iconCSS, sidebarCss, activeCss, bodyCss, popIcon, dividers, accordionItemCss, links, children, onClose, isAccordion, }: SideBarProps): React.JSX.Element;
export {};
