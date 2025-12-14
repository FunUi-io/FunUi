import React from 'react';
interface BaseInputProps {
    id?: string;
    name?: string;
    value?: any;
    defaultValue?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
    status?: 'success' | 'warning' | 'danger' | 'info' | '';
    funcss?: string;
    bg?: string;
    fullWidth?: boolean;
    flat?: boolean;
    bordered?: boolean;
    borderless?: boolean;
    rounded?: boolean;
    leftRounded?: boolean;
    rightRounded?: boolean;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    prefix?: React.ReactNode;
    suffix?: React.ReactNode;
    stringPrefix?: string;
    stringSuffix?: string;
    iconicBg?: string;
    variant?: string;
    label?: string;
    helperText?: string;
}
interface SelectOption {
    value: string;
    text: string;
}
interface TextInputProps extends BaseInputProps {
    type?: string;
}
interface SelectProps extends BaseInputProps {
    options?: SelectOption[];
}
interface TextareaProps extends BaseInputProps {
    rows?: number;
}
export declare const TextInput: React.FC<TextInputProps & React.InputHTMLAttributes<HTMLInputElement>>;
export declare const SelectInput: React.FC<SelectProps & React.SelectHTMLAttributes<HTMLSelectElement>>;
export declare const TextareaInput: React.FC<TextareaProps & React.TextareaHTMLAttributes<HTMLTextAreaElement>>;
interface InputProps extends BaseInputProps {
    select?: boolean;
    multiline?: boolean;
    file?: boolean;
    noBorder?: boolean;
    icon?: React.ReactNode;
    extra?: React.ReactNode;
    button?: React.ReactNode;
    btn?: boolean;
    type?: string;
    options?: SelectOption[];
    rows?: number;
}
declare const Input: React.FC<InputProps>;
export default Input;
