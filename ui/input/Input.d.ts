import React, { ChangeEvent, FocusEvent, MouseEvent, KeyboardEvent, FormEvent } from 'react';
interface BaseInputProps {
    id?: string;
    name?: string;
    value?: any;
    defaultValue?: string;
    onChange?: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
    onBlur?: (event: FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
    onFocus?: (event: FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
    onClick?: (event: MouseEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
    onKeyDown?: (event: KeyboardEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
    onKeyUp?: (event: KeyboardEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
    onKeyPress?: (event: KeyboardEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
    onSubmit?: (event: FormEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
    type?: string;
    placeholder?: string;
    disabled?: boolean;
    readOnly?: boolean;
    required?: boolean;
    autoFocus?: boolean;
    autoComplete?: string;
    pattern?: string;
    minLength?: number;
    maxLength?: number;
    min?: string | number;
    max?: string | number;
    step?: string | number;
    multiple?: boolean;
    accept?: string;
    size?: number;
    form?: string;
    formNoValidate?: boolean;
    formTarget?: string;
    list?: string;
    autoCapitalize?: 'on' | 'off' | 'none' | 'sentences' | 'words' | 'characters';
    autoCorrect?: 'on' | 'off';
    spellCheck?: boolean | 'true' | 'false';
    inputMode?: 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url';
    dirname?: string;
    status?: 'success' | 'warning' | 'danger' | 'info';
    funcss?: string;
    bg?: string;
    fullWidth?: boolean;
    flat?: boolean;
    bordered?: boolean;
    borderless?: boolean;
    rounded?: boolean;
    leftRounded?: boolean;
    rightRounded?: boolean;
    startIcon?: string | React.ReactNode;
    endIcon?: string | React.ReactNode;
    prefix?: string | React.ReactNode;
    suffix?: string | React.ReactNode;
    stringPrefix?: string;
    stringSuffix?: string;
    iconicBg?: string;
    variant?: string;
    label?: string;
    helperText?: string;
}
interface SelectOption {
    value: string;
    text?: string;
    label?: string;
}
interface TextInputProps extends BaseInputProps {
    type?: string;
}
interface SelectProps extends BaseInputProps {
    options?: SelectOption[];
}
interface TextareaProps extends BaseInputProps {
    rows?: number;
    cols?: number;
    wrap?: 'hard' | 'soft' | 'off';
}
export declare const TextInput: React.FC<TextInputProps>;
export declare const SelectInput: React.FC<SelectProps>;
export declare const TextareaInput: React.FC<TextareaProps>;
interface InputProps extends BaseInputProps {
    select?: boolean;
    multiline?: boolean;
    noBorder?: boolean;
    type?: string;
    options?: SelectOption[];
    rows?: number;
}
declare const Input: React.FC<InputProps>;
export default Input;
