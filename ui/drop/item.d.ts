import * as React from 'react';
type DropItemProps = {
    children: React.ReactNode;
    funcss?: string;
    onClick?: () => void;
};
export default function DropItem({ children, funcss, onClick }: DropItemProps): React.JSX.Element;
export {};
