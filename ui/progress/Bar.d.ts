import * as React from 'react';
interface ProgressBarProps {
    funcss?: string;
    progress: number;
    height?: number;
    children?: React.ReactNode;
    content?: React.ReactNode;
    bg?: string;
    lined?: boolean;
    raised?: boolean;
    rounded?: boolean;
}
export default function ProgressBar({ funcss, progress, height, children, content, raised, rounded, bg, lined, }: ProgressBarProps): React.JSX.Element;
export {};
