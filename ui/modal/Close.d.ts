import { HTMLProps } from 'react';
interface CloseModalProps extends HTMLProps<HTMLDivElement> {
    funcss?: string;
}
export default function CloseModal({ funcss, ...rest }: CloseModalProps): any;
export {};
