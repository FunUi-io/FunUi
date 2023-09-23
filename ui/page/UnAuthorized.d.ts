import * as React from 'react';
interface UnAuthorizedProps {
    header?: React.ReactNode;
    code?: number;
    content?: React.ReactNode;
    action?: React.ReactNode;
}
export default function UnAuthorized({ header, code, content, action }: UnAuthorizedProps): any;
export {};
