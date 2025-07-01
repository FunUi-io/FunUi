import * as React from 'react';
type TableProps = {
    children?: React.ReactNode;
    funcss?: string;
    title?: string;
    bordered?: boolean;
    noStripped?: boolean;
    hoverable?: boolean;
    showTotal?: boolean;
    light?: boolean;
    isLoading?: boolean;
    hideExport?: boolean;
    dark?: boolean;
    data?: {
        "fields": string[];
        "data": any[];
        "titles": string[];
        "funcss": string[];
    };
    head?: React.ReactNode;
    right?: React.ReactNode;
    body?: React.ReactNode;
    height?: number;
    pageSize?: number;
    customColumns?: {
        title: string;
        render: (data: any) => React.ReactNode;
        onClick?: (data: any) => void;
    }[];
    filterableFields?: string[];
};
export default function Table({ children, funcss, bordered, noStripped, hoverable, title, showTotal, light, dark, head, body, data, isLoading, right, hideExport, height, pageSize, // Default page size,
customColumns, filterableFields, // New prop
...rest }: TableProps): React.JSX.Element;
export {};
