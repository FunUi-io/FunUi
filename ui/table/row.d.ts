import * as React from 'react';
type TableRowProps = {
    children: React.ReactNode;
    funcss?: string;
    rowKey?: React.Key;
};
export default function TableRow({ children, funcss, rowKey }: TableRowProps): React.JSX.Element;
export {};
