import React, { ReactNode } from 'react';
interface AlertProps {
    message?: string;
    funcss?: string;
    type?: 'success' | 'info' | 'warning' | 'danger';
    outlined?: boolean;
    fixed?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-middle' | 'bottom-middle' | 'middle';
    fullWidth?: boolean;
    isLoading?: boolean;
    children?: ReactNode;
    animation?: string;
    duration?: string;
    raised?: boolean;
    card?: boolean;
    variant?: string;
    flat?: boolean;
    standard?: boolean;
    style?: React.CSSProperties;
    autoHide?: boolean;
    autoHideDuration?: number;
    onClose?: () => void;
}
export default function Alert({ message, funcss, type, outlined, fixed, raised, fullWidth, isLoading, children, animation, duration, variant, flat, standard, card, style, autoHide, autoHideDuration, onClose, ...rest }: AlertProps): React.JSX.Element;
export {};
