import * as React from 'react';
interface SnackbarProps {
    message: string;
    close: React.ReactNode;
    open: boolean;
    position: string;
    funcss?: string;
    animation?: string;
    duration?: number;
    flat?: boolean;
}
declare const SnackBar: React.FC<SnackbarProps>;
export default SnackBar;
