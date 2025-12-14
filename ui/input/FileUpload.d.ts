import React from 'react';
interface FileUploadProps {
    id?: string;
    name?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onDrop?: (files: FileList) => void;
    status?: 'success' | 'warning' | 'danger' | 'info' | '';
    label?: string;
    helperText?: string;
    icon?: React.ReactNode;
    extra?: React.ReactNode;
    button?: React.ReactNode;
    btn?: boolean;
    value?: any;
    fullWidth?: boolean;
    accept?: string;
    multiple?: boolean;
    [key: string]: any;
}
export declare const FileUpload: React.FC<FileUploadProps & React.InputHTMLAttributes<HTMLInputElement>>;
export default FileUpload;
