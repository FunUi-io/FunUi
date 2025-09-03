import React from 'react';
type NotificationProps = {
    position: string;
    funcss?: string;
    animation?: string;
    duration?: number;
    autoHide?: boolean;
    autoHideDuration?: number;
    children?: React.ReactNode;
    state: boolean;
    setOpen: (state: boolean) => void;
    width?: string;
    header?: React.ReactNode;
    content?: React.ReactNode;
    footer?: React.ReactNode;
};
export default function Notification({ position, funcss, animation, duration, autoHide, autoHideDuration, children, state, setOpen, // 👈 receives the setter from parent
width, header, content, footer, }: NotificationProps): React.JSX.Element | null;
export {};
