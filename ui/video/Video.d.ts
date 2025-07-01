import React from 'react';
interface VideoProps {
    src: string;
    poster?: string;
    onDuration?: (duration: number) => void;
    isPause?: boolean;
    className?: string;
    autoPlay?: boolean;
}
export default function Video({ src, poster, onDuration, isPause, className, autoPlay, ...rest }: VideoProps): React.JSX.Element;
export {};
