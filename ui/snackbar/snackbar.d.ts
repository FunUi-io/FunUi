import * as React from 'react';
interface SnackbarProps {
    message: string;
    close: string;
    open: boolean;
    position: string;
    funcss?: string;
    animation?: string;
    duration?: number;
}
declare const Snackbar: React.FC<SnackbarProps>;
export default Snackbar;
