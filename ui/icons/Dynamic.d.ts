import React from 'react';
interface DynamicIconProps {
    iconName?: string | React.ReactNode;
    size?: number | string;
    color?: string;
    className?: string;
    funcss?: string;
    style?: React.CSSProperties;
    [key: string]: any;
}
declare const DynamicIcon: React.FC<DynamicIconProps>;
export default DynamicIcon;
