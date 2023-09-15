import * as React from 'react';
interface ModalProps {
    children: React.ReactNode;
    funcss?: string;
    animation?: string;
    duration?: number;
    open: boolean;
    maxWidth?: string;
    maxHeight?: string;
    height?: string;
    width?: string;
    backdrop?: boolean;
    body?: React.ReactNode;
    bodycss?: string;
    title?: React.ReactNode;
    titlecss?: string;
    footer?: React.ReactNode;
    footercss?: string;
    close?: React.ReactNode;
    closecss?: string;
}
export default function Modal({ children, funcss, animation, duration, open, maxWidth, maxHeight, height, width, backdrop, title, titlecss, body, bodycss, footer, footercss, close, closecss, ...rest }: ModalProps): React.JSX.Element;
export {};
