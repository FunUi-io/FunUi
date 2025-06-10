import * as React from 'react';
type NotificationProps = {
    position: string;
    funcss?: string;
    animation?: string;
    duration?: number;
    children: React.ReactNode;
    state: boolean;
    width?: string;
    header?: React.ReactNode;
    content?: React.ReactNode;
    footer?: React.ReactNode;
};
export default function Notification({ position, funcss, animation, duration, children, state, width, header, content, footer }: NotificationProps): React.JSX.Element | null;
export {};
