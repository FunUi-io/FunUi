import * as React from 'react';
interface NotFoundProps {
    header?: React.ReactNode;
    code?: number;
    content?: React.ReactNode;
    action?: React.ReactNode;
}
export default function NotFound({ header, code, content, action }: NotFoundProps): React.JSX.Element;
export {};
