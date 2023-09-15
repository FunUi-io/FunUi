import React, { ReactNode, HTMLProps } from 'react';
interface CardFooterProps extends HTMLProps<HTMLDivElement> {
    funcss?: string;
    children?: ReactNode;
}
export default function CardFooter({ funcss, children, ...rest }: CardFooterProps): React.JSX.Element;
export {};
