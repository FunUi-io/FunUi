import * as React from 'react';
type HrProps = {
    children: React.ReactNode;
    funcss?: string;
    style?: object;
};
declare const FullCenteredPage: ({ children, funcss, style, ...rest }: HrProps) => React.JSX.Element;
export default FullCenteredPage;
