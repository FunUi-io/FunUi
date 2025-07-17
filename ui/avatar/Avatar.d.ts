import { ReactNode } from 'react';
import * as React from 'react';
interface AvatarProps {
    funcss?: string;
    children?: ReactNode;
    size?: number;
    bg?: string;
    bordered?: boolean;
    color?: string;
    content?: ReactNode;
}
export default function Avatar({ funcss, children, size, bordered, bg, content, color }: AvatarProps): React.JSX.Element;
export {};
