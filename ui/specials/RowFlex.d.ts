import * as React from 'react';
interface RowFlexProps {
    funcss?: string;
    content?: React.ReactNode;
    justify?: string;
    gap?: number;
    alignItems?: string;
    responsiveSmall?: boolean;
    responsiveMedium?: boolean;
    id?: string;
    children?: React.ReactNode;
}
export default function RowFlex({ funcss, content, justify, gap, alignItems, responsiveSmall, responsiveMedium, id, children, ...rest }: RowFlexProps): any;
export {};
