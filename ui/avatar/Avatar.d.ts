import { ReactNode } from 'react';
import * as React from 'react';
interface AvatarProps {
    funcss?: string;
    children?: ReactNode;
    size?: string;
    bg?: string;
    content?: ReactNode;
}
export default function Avatar({ funcss, children, size, bg, content, }: AvatarProps): React.JSX.Element;
export {};
