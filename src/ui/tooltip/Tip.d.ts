import * as React from 'react';
interface TipProps {
    tip: string;
    funcss?: string;
    children?: React.ReactNode;
    content?: React.ReactNode;
    message?: React.ReactNode;
    animation?: string;
    duration?: number;
}
export default function Tip({ tip, funcss, children, content, message, animation, duration, ...rest }: TipProps): React.JSX.Element;
export {};
