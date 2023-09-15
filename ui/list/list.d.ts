import * as React from 'react';
interface ListProps {
    children?: React.ReactNode;
    funcss?: string;
    content?: React.ReactNode;
    dark?: boolean;
    light?: boolean;
    stripped?: boolean;
    bordered?: boolean;
    hoverable?: boolean;
    roundItems?: boolean;
}
export default function List({ children, funcss, content, dark, light, stripped, bordered, hoverable, roundItems, ...rest }: ListProps): React.JSX.Element;
export {};
