import * as React from 'react';
type DropMenuProps = {
    children: React.ReactNode;
    funcss?: string;
    hoverable?: string;
    duration?: number;
    animation?: string;
    state: boolean;
    id?: string;
    width?: string;
};
export default function DropMenu({ children, funcss, hoverable, duration, animation, state, id, width, }: DropMenuProps): React.JSX.Element;
export {};
