import * as React from 'react';
type TableProps = {
    children?: React.ReactNode;
    funcss?: string;
    bordered?: boolean;
    noStripped?: boolean;
    hoverable?: boolean;
    showTotal?: boolean;
    light?: boolean;
    dark?: boolean;
    data?: {
        "fields": string[];
        "data": any[];
        "titles": string[];
    };
    head?: React.ReactNode;
    body?: React.ReactNode;
    height?: number;
    pageSize?: number;
    customColumns?: React.ReactNode;
};
export default function Table({ children, funcss, bordered, noStripped, hoverable, showTotal, light, dark, head, body, data, height, pageSize, // Default page size,
customColumns, ...rest }: TableProps): any;
export {};
