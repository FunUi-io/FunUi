import * as React from 'react';
type TableRowProps = {
    children?: React.ReactNode;
    funcss?: string;
    rowKey?: React.Key;
    key?: React.Key;
};
export default function TableRow({ children, funcss, rowKey, key }: TableRowProps): React.JSX.Element;
export {};
