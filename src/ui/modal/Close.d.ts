import { HTMLProps } from 'react';
import * as React from 'react';
interface CloseModalProps extends HTMLProps<HTMLDivElement> {
    funcss?: string;
}
export default function CloseModal({ funcss, ...rest }: CloseModalProps): React.JSX.Element;
export {};
