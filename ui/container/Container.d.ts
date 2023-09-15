import { ReactNode, CSSProperties, HTMLProps } from 'react';
import * as React from 'react';
interface ContainerProps extends HTMLProps<HTMLDivElement> {
    children: ReactNode;
    funcss?: string;
    margin?: string;
    padding?: string;
    customStyle?: CSSProperties;
}
declare const Container: React.FC<ContainerProps>;
export default Container;
