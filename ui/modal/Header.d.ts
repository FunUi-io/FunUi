import * as React from 'react';
interface ModalHeaderProps {
    funcss?: string;
    children?: React.ReactNode;
    close?: React.ReactNode | '';
    title?: string;
}
export default function ModalHeader({ funcss, children, close, title, ...rest }: ModalHeaderProps): any;
export {};
