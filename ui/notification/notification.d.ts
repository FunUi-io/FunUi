import * as React from 'react';
type NotificationProps = {
    position: string;
    funcss?: string;
    animation?: string;
    duration?: number;
    children: React.ReactNode;
    state: boolean;
    width?: string;
};
export default function Notification({ position, funcss, animation, duration, children, state, width, }: NotificationProps): React.JSX.Element;
export {};
