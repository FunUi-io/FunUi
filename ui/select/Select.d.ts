import React from 'react';
interface SelectOption {
    value: string;
    text: string;
    prefix?: React.ReactNode;
    suffix?: React.ReactNode;
}
interface CustomSelectProps {
    id?: string;
    name?: string;
    value?: string;
    defaultValue?: string;
    placeholder?: string;
    options: SelectOption[];
    onChange?: (value: string, event?: {
        target: {
            value: string;
            name: string;
        };
    }) => void;
    onBlur?: (event: React.FocusEvent<HTMLSelectElement>) => void;
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
    label?: string;
    searchAutoFocus?: boolean;
    style?: React.CSSProperties;
    required?: boolean;
}
declare const Select: React.FC<CustomSelectProps>;
export default Select;
