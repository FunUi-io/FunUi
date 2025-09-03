import React, { ReactNode, HTMLProps } from 'react';
interface CardFabProps extends HTMLProps<HTMLDivElement> {
    funcss?: string;
    position?: string;
    children?: ReactNode;
}
export default function CardFab({ funcss, position, children, ...rest }: CardFabProps): React.JSX.Element;
export {};
