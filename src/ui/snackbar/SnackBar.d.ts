import * as React from 'react';
interface SnackbarProps {
    message: string;
    close?: React.ReactNode;
    open: boolean;
    setOpen: (val: boolean) => void;
    position: string;
    funcss?: string;
    animation?: string;
    duration?: number;
    autoHide?: boolean;
    autoHideDuration?: number;
    flat?: boolean;
}
declare const SnackBar: React.FC<SnackbarProps>;
export default SnackBar;
