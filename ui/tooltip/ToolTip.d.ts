import * as React from 'react';
interface ToolTipProps {
    funcss?: string;
    children?: React.ReactNode;
}
export default function ToolTip({ funcss, children, ...rest }: ToolTipProps): React.JSX.Element;
export {};
