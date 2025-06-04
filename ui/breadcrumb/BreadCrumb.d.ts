import * as React from 'react';
interface BreadCrumbProps {
    type?: 'slash' | 'greater' | 'less' | 'straight';
    funcss?: string;
    color?: string;
}
export default function BreadCrumb({ type, funcss, color }: BreadCrumbProps): React.JSX.Element;
export {};
