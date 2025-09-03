'use client'
import React, { useState } from 'react';
import { PiCheck, PiCloudArrowUp } from 'react-icons/pi';
import Button from '../button/Button';

// Base types and interfaces
interface BaseInputProps {
  id?: string;
  name?: string;
  value?: any;
  defaultValue?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  status?: 'success' | 'warning' | 'danger' | '';
  funcss?: string;
  bg?: string;
  fullWidth?: boolean;
  flat?: boolean;
  bordered?: boolean;
  borderless?: boolean;
  rounded?: boolean;
  leftRounded?: boolean;
  rightRounded?: boolean;
}

interface SelectOption {
  value: string;
  text: string;
}

interface TextInputProps extends BaseInputProps {
  type?: string;
  label?: string;
}

interface SelectProps extends BaseInputProps {
  options?: SelectOption[];
}

interface TextareaProps extends BaseInputProps {
  label?: string;
  rows?: number;
}

interface FileInputProps extends BaseInputProps {
  label?: string;
  icon?: React.ReactNode;
  extra?: React.ReactNode;
  button?: React.ReactNode;
  btn?: boolean;
}

// Utility function to generate CSS classes
const generateInputClasses = ({
  status,
  rounded,
  bg,
  funcss,
  flat,
  leftRounded,
  rightRounded,
  bordered,
  borderless,
  additionalClasses = ''
}: {
  status?: string;
  rounded?: boolean;
  bg?: string;
  funcss?: string;
  flat?: boolean;
  leftRounded?: boolean;
  rightRounded?: boolean;
  bordered?: boolean;
  borderless?: boolean;
  additionalClasses?: string;
}) => {
  const statusClass = status ? `${status}-input` : '';
  const roundedClass = rounded ? 'rounded' : '';
  const bgClass = bg || '';
  const flatClass = flat ? 'flat' : '';
  const cornerClass = leftRounded ? 'leftRounded' : rightRounded ? 'rightRounded' : '';
  const borderClass = bordered ? 'borderedInput' : borderless ? 'borderless' : '';

  return `
    ${statusClass}
    ${roundedClass}
    ${bgClass}
    ${funcss || ''}
    ${flatClass}
    ${cornerClass}
    ${borderClass}
    ${additionalClasses}
    input
  `.trim().replace(/\s+/g, ' ');
};

// Text Input Component
export const TextInput: React.FC<TextInputProps & React.InputHTMLAttributes<HTMLInputElement>> = ({
  id,
  name,
  value,
  defaultValue,
  onChange,
  status,
  funcss,
  bg,
  fullWidth,
  flat,
  bordered,
  borderless,
  rounded,
  leftRounded,
  rightRounded,
  type = 'text',
  label,
  ...rest
}) => {
  const className = generateInputClasses({
    status,
    rounded,
    bg,
    funcss,
    flat,
    leftRounded,
    rightRounded,
    bordered,
    borderless
  });

  const style = fullWidth ? { width: '100%' } : undefined;

  return (
    <input
      id={id}
      name={name}
      className={className}
      onChange={onChange}
      defaultValue={defaultValue}
      type={type}
      placeholder={label}
      style={style}
      value={value}
      {...rest}
    />
  );
};

// Select Component
export const SelectInput: React.FC<SelectProps & React.SelectHTMLAttributes<HTMLSelectElement>> = ({
  id,
  name,
  value,
  defaultValue,
  onChange,
  status,
  funcss,
  bg,
  fullWidth,
  flat,
  bordered,
  borderless,
  rounded,
  leftRounded,
  rightRounded,
  options = [],
  ...rest
}) => {
  const className = generateInputClasses({
    status,
    rounded,
    bg,
    funcss,
    flat,
    leftRounded,
    rightRounded,
    bordered,
    borderless
  });

  const style = fullWidth ? { width: '100%' } : undefined;

  return (
    <select
      id={id}
      name={name}
      className={className}
      onChange={onChange}
      defaultValue={defaultValue}
      value={value}
      style={style}
      {...rest}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.text}
        </option>
      ))}
    </select>
  );
};

// Textarea Component
export const TextareaInput: React.FC<TextareaProps & React.TextareaHTMLAttributes<HTMLTextAreaElement>> = ({
  id,
  name,
  value,
  defaultValue,
  onChange,
  status,
  funcss,
  bg,
  fullWidth,
  flat,
  bordered,
  borderless,
  rounded,
  leftRounded,
  rightRounded,
  label,
  rows = 2,
  ...rest
}) => {
  const className = generateInputClasses({
    status,
    rounded,
    bg,
    funcss,
    flat,
    leftRounded,
    rightRounded,
    bordered,
    borderless
  });

  const style = fullWidth ? { width: '100%' } : undefined;

  return (
    <textarea
      id={id}
      name={name}
      className={className}
      onChange={onChange}
      defaultValue={defaultValue}
      placeholder={label}
      style={style}
      value={value}
      rows={rows}
      {...rest}
    />
  );
};

// File Input Component
export const FileInput: React.FC<FileInputProps & React.InputHTMLAttributes<HTMLInputElement>> = ({
  id = 'fileInput',
  name,
  onChange,
  status,
  funcss,
  bg,
  fullWidth,
  flat,
  rounded,
  leftRounded,
  rightRounded,
  label = 'Upload File',
  icon,
  extra,
  button,
  btn,
  value,
  ...rest
}) => {
  const [fileName, setFileName] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
    if (onChange) onChange(e);
  };

  if (btn) {
    const className = generateInputClasses({
      status,
      rounded,
      bg,
      funcss,
      flat,
      leftRounded,
      rightRounded,
      bordered: true,
      borderless: false,
      additionalClasses: 'filedInput'
    });

    const style = fullWidth ? { width: '100%' } : undefined;

    return (
      <div className="fileInput">
        {button || (
          <Button
            funcss={funcss}
            startIcon={icon || <PiCloudArrowUp />}
            bg="primary"
            fullWidth
            raised
          >
            {fileName || label}
          </Button>
        )}
        <input
          id={id}
          name={name}
          className={className}
          onChange={handleChange}
          type="file"
          style={style}
          value={value}
          {...rest}
        />
      </div>
    );
  }

  return (
    <div className="_upload_container">
      <label htmlFor={id} className="_upload_label">
        <div className="_upload_icon">
          {icon || <PiCloudArrowUp />}
        </div>
        <div
          className="_upload_text"
          style={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: 'inline-block',
            width: '100%',
          }}
        >
          {fileName || label}
        </div>
        {extra && <div className="text-small opacity-3">{extra}</div>}
      </label>
      <input
        onChange={handleChange}
        type="file"
        id={id}
        className="_upload_input"
        {...rest}
      />
    </div>
  );
};

// Main Input Component (backwards compatibility)
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
  label?: string;
  options?: SelectOption[];
  rows?: number;
}

const Input: React.FC<InputProps> = ({
  select,
  multiline,
  file,
  noBorder,
  ...props
}) => {
  // Handle legacy noBorder prop
  const inputProps = {
    ...props,
    borderless: noBorder || props.borderless,
  };

  if (select) {
    return <SelectInput {...inputProps} />;
  }

  if (multiline) {
    return <TextareaInput {...inputProps} />;
  }

  if (file) {
    return <FileInput {...inputProps} />;
  }

  return <TextInput {...inputProps} />;
};

export default Input;