import React from 'react';
type Position = 'left' | 'right';
type Direction = 'dropdown' | 'dropup';
interface DropdownItem {
    label: React.ReactNode;
    onClick?: () => void;
}
interface DropdownProps {
    direction?: Direction;
    position?: Position;
    button: React.ReactNode;
    items: DropdownItem[];
    hoverable?: boolean;
    openOnHover?: boolean;
    className?: string;
}
declare const Dropdown: React.FC<DropdownProps>;
export default Dropdown;
