import React from 'react';
interface SimpleVideoProps {
    /** HLS (.m3u8) or processed next-video source */
    src: string;
    autoPlay?: boolean;
    muted?: boolean;
    loop?: boolean;
    controls?: boolean;
    style?: React.CSSProperties;
    className?: string;
    funcss?: string;
    /** Optional: cap max resolution (e.g. 1080) */
    maxResolution?: 360 | 480 | 720 | 1080 | 1440 | 2160;
    /** Optional: custom loading component */
    loadingComponent?: React.ReactNode;
}
declare const SimpleVideo: React.FC<SimpleVideoProps>;
export default SimpleVideo;
