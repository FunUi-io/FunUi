import React from 'react';
interface SearchableOption {
    value: string | number;
    text: string;
    [key: string]: any;
}
interface SearchableInputProps {
    id?: string;
    name?: string;
    status?: 'error' | 'success' | 'warning' | 'default';
    funcss?: string;
    bg?: string;
    fullWidth?: boolean;
    flat?: boolean;
    rounded?: boolean;
    leftRounded?: boolean;
    rightRounded?: boolean;
    label?: string;
    placeholder?: string;
    icon?: React.ReactNode;
    extra?: React.ReactNode;
    value?: string;
    data?: SearchableOption[];
    onSelect?: (option: SearchableOption) => void;
    onChange?: (value: string) => void;
    onInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    dropDirection?: 'up' | 'down';
    maxHeight?: string;
    minChars?: number;
    clearable?: boolean;
    disabled?: boolean;
    loading?: boolean;
    noDataText?: string;
    autoComplete?: boolean;
    highlightMatch?: boolean;
}
declare const SearchableInput: React.FC<SearchableInputProps & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'>>;
export default SearchableInput;
