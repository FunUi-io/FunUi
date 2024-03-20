import { ReactNode } from 'react';
interface FunLoaderProps {
    funcss?: string;
    position?: "left" | "right";
    glassy?: boolean;
    open?: boolean;
    header?: ReactNode;
    content?: ReactNode;
    footer?: ReactNode;
    width?: number;
}
export default function SideBar({ funcss, position, glassy, header, open, content, footer, width, ...rest }: FunLoaderProps): any;
export {};
