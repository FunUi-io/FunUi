import * as React from 'react';
interface ProgressBarProps {
    funcss?: string;
    progress: number;
    height?: number;
    children?: React.ReactNode;
    content?: ((progress: number) => React.ReactNode) | React.ReactNode;
    bg?: string;
    raised?: boolean;
    rounded?: boolean;
    type?: 'linear' | 'circle';
    size?: number;
    strokeWidth?: number;
}
export default function ProgressBar({ funcss, progress, height, children, content, raised, rounded, bg, // default CSS class name
type, size, strokeWidth, }: ProgressBarProps): React.JSX.Element;
export {};
