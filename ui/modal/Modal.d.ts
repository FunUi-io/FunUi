import * as React from 'react';
interface ModalProps {
    children?: React.ReactNode;
    funcss?: string;
    animation?: string;
    duration?: number;
    open: boolean;
    hideClose: boolean;
    setOpen: (val: boolean) => void;
    maxWidth?: string;
    maxHeight?: string;
    height?: string;
    width?: string;
    backdrop?: boolean;
    body?: React.ReactNode;
    bodycss?: string;
    title?: React.ReactNode;
    okIcon?: React.ReactNode;
    titlecss?: string;
    footer?: React.ReactNode;
    footercss?: string;
    close?: React.ReactNode;
    closecss?: string;
    id?: string;
    position?: string;
    flat?: boolean;
    onOk?: () => void;
    onOkText?: string;
}
export default function Modal({ children, funcss, animation, duration, open, setOpen, maxWidth, maxHeight, okIcon, height, hideClose, width, backdrop, title, titlecss, body, bodycss, footer, footercss, close, closecss, position, id, flat, onOk, // 👈 added
onOkText, // 👈 added
...rest }: ModalProps): React.JSX.Element | null;
export {};
