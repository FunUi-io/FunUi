import * as React from 'react';
type TableProps = {
    children: React.ReactNode;
    funcss?: string;
    bordered?: boolean;
    stripped?: boolean;
    hoverable?: boolean;
    showTotal?: boolean;
    light?: boolean;
    dark?: boolean;
};
export default function Table({ children, funcss, bordered, stripped, hoverable, showTotal, light, dark, }: TableProps): React.JSX.Element;
export {};
