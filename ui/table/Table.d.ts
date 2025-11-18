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
    filterOnchange?: (filter?: any, value?: any, totals?: number) => {};
    clearSearch?: boolean;
    head?: React.ReactNode;
    right?: React.ReactNode;
    body?: React.ReactNode;
    height?: number;
    pageSize?: number;
    emptyResponse?: {
        icon?: React.ReactNode;
        title?: React.ReactNode;
        subtitle: React.ReactNode;
    };
    customColumns?: {
        title: string;
        render: (data: any) => React.ReactNode;
        onClick?: (data: any) => void;
    }[];
    filterableFields?: string[];
    prioritizeSearchFields?: string[];
    onRowClick?: (data: any) => void;
};
export default function Table({ children, funcss, bordered, noStripped, hoverable, title, showTotal, light, dark, head, body, data, isLoading, right, hideExport, height, pageSize, // Default page size,
customColumns, filterableFields, // New prop
emptyResponse, filterOnchange, clearSearch, prioritizeSearchFields, onRowClick, ...rest }: TableProps): React.JSX.Element;
export {};
