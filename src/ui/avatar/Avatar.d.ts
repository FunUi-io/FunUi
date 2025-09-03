import { ReactNode, MouseEventHandler } from 'react';
import * as React from 'react';
interface AvatarProps {
    funcss?: string;
    children?: ReactNode;
    size?: number;
    bg?: string;
    bordered?: boolean;
    color?: string;
    content?: ReactNode;
    onClick?: MouseEventHandler<HTMLDivElement>;
}
export default function Avatar({ funcss, children, size, bordered, bg, content, color, onClick, ...rest }: AvatarProps): React.JSX.Element;
export {};
