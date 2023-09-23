import { ReactNode, HTMLProps } from 'react';
interface CardHeaderProps extends HTMLProps<HTMLDivElement> {
    funcss?: string;
    children?: ReactNode;
}
export default function CardHeader({ funcss, children, ...rest }: CardHeaderProps): any;
export {};
