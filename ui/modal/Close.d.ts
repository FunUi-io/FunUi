import { HTMLProps } from 'react';
interface CloseModalProps extends HTMLProps<HTMLDivElement> {
    funcss?: string;
    onClick?: () => void;
}
export default function CloseModal({ funcss, onClick }: CloseModalProps): any;
export {};
