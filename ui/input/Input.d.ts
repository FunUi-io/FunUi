import React from 'react';
interface InputProps {
    select?: boolean;
    bordered?: boolean;
    bordereless?: boolean;
    multiline?: boolean;
    file?: boolean;
    noBorder?: boolean;
    icon?: React.ReactNode;
    button?: React.ReactNode;
    id?: string;
    status?: 'success' | 'warning' | 'danger' | '';
    funcss?: string;
    flat?: boolean;
    leftRounded?: boolean;
    rightRounded?: boolean;
    rounded?: boolean;
    fullWidth?: boolean;
    type?: string;
    label?: string;
    name?: string;
    value?: string;
    defaultValue?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
    options?: {
        value: string;
        text: string;
    }[];
    rows?: number;
    bg?: string;
}
declare const Input: React.FC<InputProps>;
export default Input;
