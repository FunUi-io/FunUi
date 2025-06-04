import * as React from 'react';
interface ModalHeaderProps {
    funcss?: string;
    children?: React.ReactNode;
    close?: React.ReactNode | '';
    title?: React.ReactNode;
}
export default function ModalHeader({ funcss, children, close, title, ...rest }: ModalHeaderProps): React.JSX.Element;
export {};
