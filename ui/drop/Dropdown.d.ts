import React from 'react';
type Position = 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
interface DropdownItem {
    label: React.ReactNode;
    onClick?: () => void;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    disabled?: boolean;
    divider?: boolean;
}
interface DropdownProps {
    position?: Position;
    button: React.ReactNode;
    items: DropdownItem[];
    hoverable?: boolean;
    openOnHover?: boolean;
    closableOnlyOutside?: boolean;
    className?: string;
    menuClassName?: string;
    width?: string;
    minWidth?: string;
    maxWidth?: string;
    height?: string;
    minHeight?: string;
    maxHeight?: string;
}
declare const Dropdown: React.FC<DropdownProps>;
export default Dropdown;
