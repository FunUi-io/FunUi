import { ReactNode, HTMLProps } from 'react';
interface CardBodyProps extends HTMLProps<HTMLDivElement> {
    funcss?: string;
    children?: ReactNode;
}
export default function CardBody({ funcss, children, ...rest }: CardBodyProps): any;
export {};
