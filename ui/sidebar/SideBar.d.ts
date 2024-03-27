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
    fixed?: boolean;
}
export default function SideBar({ funcss, position, glassy, header, open, content, footer, width, fixed, ...rest }: FunLoaderProps): any;
export {};
