import { ReactNode } from 'react';
import * as React from 'react';
interface AlertProps {
    message?: string;
    funcss?: string;
    type?: 'success' | 'info' | 'warning' | 'danger';
    outlined?: boolean;
    fixed?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-middle' | 'bottom-middle' | 'middle';
    fullWidth?: boolean;
    isLoading?: boolean;
    children?: ReactNode;
    raised?: boolean;
}
export default function Alert({ message, funcss, type, outlined, fixed, raised, fullWidth, isLoading, children, }: AlertProps): React.JSX.Element;
export {};
