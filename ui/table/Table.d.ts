import * as React from 'react';
type ColumnConfig = {
    field: string;
    title: string;
    width?: string | number;
    minWidth?: string | number;
    maxWidth?: string | number;
    className?: string;
    cellClassName?: string;
    textWrap?: boolean;
    headerClassName?: string;
};
type TableProps = {
    children?: React.ReactNode;
    funcss?: string;
    trCss?: string;
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
        "columns"?: ColumnConfig[];
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
        ctaText?: string;
        ctaIcon?: React.ReactNode | string;
        showCta?: boolean;
        ctaOnClick?: () => void;
    };
    customColumns?: {
        title: string;
        render: (data: any) => React.ReactNode;
        onClick?: (data: any) => void;
    }[];
    filterableFields?: string[];
    prioritizeSearchFields?: string[];
    onRowClick?: (data: any) => void;
    columns?: ColumnConfig[];
};
export default function Table({ children, funcss, bordered, noStripped, hoverable, title, showTotal, light, dark, head, body, data, isLoading, right, hideExport, height, pageSize, // Default page size,
customColumns, filterableFields, // New prop
emptyResponse, filterOnchange, clearSearch, prioritizeSearchFields, onRowClick, trCss, columns, // New columns prop
...rest }: TableProps): React.JSX.Element;
export {};
