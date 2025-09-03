import React from 'react';
interface SelectOption {
    value: string;
    text: string;
}
interface CustomSelectProps {
    id?: string;
    name?: string;
    value?: string;
    defaultValue?: string;
    placeholder?: string;
    options: SelectOption[];
    onChange?: (value: string, option: SelectOption) => void;
    onBlur?: (event: React.FocusEvent) => void;
    searchable?: boolean;
    disabled?: boolean;
    bordered?: boolean;
    borderless?: boolean;
    rounded?: boolean;
    flat?: boolean;
    fullWidth?: boolean;
    status?: 'success' | 'warning' | 'danger' | '';
    className?: string;
    funcss?: string;
    searchAutoFocus?: boolean;
    style?: React.CSSProperties;
}
declare const Select: React.FC<CustomSelectProps>;
export default Select;
