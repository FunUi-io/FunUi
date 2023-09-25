import React from 'react';
import { PiCheck, PiCloudArrowUp } from 'react-icons/pi';
import Button from '../button/Button';

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
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void;
  options?: { value: string; text: string }[];
  rows?: number;
  bg?: string;
}

const Input: React.FC<InputProps> = ({
  select,
  bordered,
  bordereless,
  multiline,
  file,
  noBorder,
  icon,
  button,
  id,
  status,
  funcss,
  flat,
  leftRounded,
  rightRounded,
  rounded,
  fullWidth,
  type,
  label,
  name,
  value,
  defaultValue,
  onChange,
  options,
  rows,
  bg,
  ...rest
}) => {
  if (select) {
    if (bordered) {
      return (
        <select
        {...rest}
          id={id}
          className={`
            ${status === 'success' ? 'success-input' : ''}
            ${status === 'warning' ? 'warning-input' : ''}
            ${status === 'danger' ? 'danger-input' : ''}
            input
            ${bg ? bg : ''}
            ${funcss} ${flat ? 'flat' : ''}
            ${leftRounded ? 'leftRounded' : rightRounded ? 'rightRounded' : ''}
            borderedInput
          `}
          onChange={onChange}
          defaultValue={defaultValue}
          name={name}
          style={{
            borderRadius: `${rounded ? '400rem' : ''}`,
            width: `${fullWidth ? '100%' : ''}`,
          }}
          value={value}
        >
          {options
            ? options.map((doc) => (
                <option value={doc.value} key={doc.value}>
                  {doc.text}
                </option>
              ))
            : ''}
        </select>
      );
    } else if (bordereless) {
      return (
        <select
        {...rest}
          id={id}
          className={`
            ${status === 'success' ? 'success-input' : ''}
            ${status === 'warning' ? 'warning-input' : ''}
            ${status === 'danger' ? 'danger-input' : ''}
            input
            ${bg ? bg : ''}
            ${funcss} ${flat ? 'flat' : ''}
            ${leftRounded ? 'leftRounded' : rightRounded ? 'rightRounded' : ''}
            borderless
          `}
          onChange={onChange}
          defaultValue={defaultValue}
          placeholder={label}
          name={name}
          value={value}
          style={{
            borderRadius: `${rounded ? '400rem' : ''}`,
            width: `${fullWidth ? '100%' : ''}`,
          }}
        >
          {options
            ? options.map((doc) => (
                <option value={doc.value} key={doc.value}>
                  {doc.text}
                </option>
              ))
            : ''}
        </select>
      );
    } else {
      return (
        <select
        {...rest}
          id={id}
          className={`
            ${status === 'success' ? 'success-input' : ''}
            ${status === 'warning' ? 'warning-input' : ''}
            ${status === 'danger' ? 'danger-input' : ''}
            input
            ${bg ? bg : ''}
            ${funcss} ${flat ? 'flat' : ''}
            ${leftRounded ? 'leftRounded' : rightRounded ? 'rightRounded' : ''}
          `}
          onChange={onChange}
          defaultValue={defaultValue}
          placeholder={label}
          name={name}
          value={value}
          style={{
            borderRadius: `${rounded ? '400rem' : ''}`,
            width: `${fullWidth ? '100%' : ''}`,
          }}
        >
          {options
            ? options.map((doc) => (
                <option value={doc.value} key={doc.value}>
                  {doc.text}
                </option>
              ))
            : ''}
        </select>
      );
    }
  } else if (multiline) {
    if (bordered) {
      return (
        <textarea
        {...rest}
          id={id}
          className={`
            ${status === 'success' ? 'success-input' : ''}
            ${status === 'warning' ? 'warning-input' : ''}
            ${status === 'danger' ? 'danger-input' : ''}
            input
            ${bg ? bg : ''}
            ${funcss} ${flat ? 'flat' : ''}
            ${leftRounded ? 'leftRounded' : rightRounded ? 'rightRounded' : ''}
            borderedInput
          `}
          onChange={onChange}
          defaultValue={defaultValue}
          placeholder={label}
          name={name}
          style={{
            borderRadius: `${rounded ? '400rem' : ''}`,
            width: `${fullWidth ? '100%' : ''}`,
          }}
          value={value}
          rows={rows ? rows : 2}
        />
      );
    } else if (bordereless) {
      return (
        <textarea
        {...rest}
          id={id}
          className={`
            ${status === 'success' ? 'success-input' : ''}
            ${status === 'warning' ? 'warning-input' : ''}
            ${status === 'danger' ? 'danger-input' : ''}
            input
            ${bg ? bg : ''}
            ${funcss} ${flat ? 'flat' : ''}
            ${leftRounded ? 'leftRounded' : rightRounded ? 'rightRounded' : ''}
            borderless
          `}
          onChange={onChange}
          defaultValue={defaultValue}
          placeholder={label}
          name={name}
          value={value}
          style={{
            borderRadius: `${rounded ? '400rem' : ''}`,
            width: `${fullWidth ? '100%' : ''}`,
          }}
          rows={rows ? rows : 2}
        />
      );
    } else {
      return (
        <textarea
        {...rest}
          id={id}
          className={`
            ${status === 'success' ? 'success-input' : ''}
            ${status === 'warning' ? 'warning-input' : ''}
            ${status === 'danger' ? 'danger-input' : ''}
            input
            ${bg ? bg : ''}
            ${funcss} ${flat ? 'flat' : ''}
            ${leftRounded ? 'leftRounded' : rightRounded ? 'rightRounded' : ''}
          `}
          onChange={onChange}
          defaultValue={defaultValue}
          placeholder={label}
          name={name}
          value={value}
          style={{
            borderRadius: `${rounded ? '400rem' : ''}`,
            width: `${fullWidth ? '100%' : ''}`,
          }}
          rows={rows ? rows : 2}
        />
      );
    }
  } else if (file) {
    return (
      <div className="fileInput">
        {button ? (
          button
        ) : (
          <Button
            funcss={` ${funcss} `}
            startIcon={icon ? icon : <PiCloudArrowUp />}
            bg="primary800"
            raised
          >
            {label ? label : 'Upload File'}
          </Button>
        )}
        <input
        {...rest}
            name={name}
          id={id}
          className={`
            ${status === 'success' ? 'success-input' : ''}
            ${status === 'warning' ? 'warning-input' : ''}
            ${status === 'danger' ? 'danger-input' : ''}
            input
            ${bg ? bg : ''}
            ${funcss} ${flat ? 'flat' : ''}
            ${leftRounded ? 'leftRounded' : rightRounded ? 'rightRounded' : ''}
            borderedInput
            filedInput
          `}
          onChange={onChange}
          type={'file'}
          style={{
            borderRadius: `${rounded ? '400rem' : ''}`,
            width: `${fullWidth ? '100%' : ''}`,
          }}
          value={value}
        />
      </div>
    );
  } else {
    if (bordered) {
      return (
        <input
        {...rest}
            name={name}
          id={id}
          className={`
            ${status === 'success' ? 'success-input' : ''}
            ${status === 'warning' ? 'warning-input' : ''}
            ${status === 'danger' ? 'danger-input' : ''}
            input
            ${bg ? bg : ''}
            ${funcss} ${flat ? 'flat' : ''}
            ${leftRounded ? 'leftRounded' : rightRounded ? 'rightRounded' : ''}
            borderedInput
          `}
          onChange={onChange}
          defaultValue={defaultValue}
          type={type}
          placeholder={label}
          style={{
            borderRadius: `${rounded ? '400rem' : ''}`,
            width: `${fullWidth ? '100%' : ''}`,
          }}
          value={value}
        />
      );
    } else if (bordereless) {
      return (
        <input
        {...rest}
            name={name}
          id={id}
          className={`
            ${status === 'success' ? 'success-input' : ''}
            ${status === 'warning' ? 'warning-input' : ''}
            ${status === 'danger' ? 'danger-input' : ''}
            input
            ${bg ? bg : ''}
            ${funcss} ${flat ? 'flat' : ''}
            ${leftRounded ? 'leftRounded' : rightRounded ? 'rightRounded' : ''}
            borderless
          `}
          onChange={onChange}
          defaultValue={defaultValue}
          type={type}
          placeholder={label}
          value={value}
          style={{
            borderRadius: `${rounded ? '400rem' : ''}`,
            width: `${fullWidth ? '100%' : ''}`,
          }}
        />
      );
    } else {
      return (
        <input
        {...rest}
            name={name}
          id={id}
          className={`
            ${status === 'success' ? 'success-input' : ''}
            ${status === 'warning' ? 'warning-input' : ''}
            ${status === 'danger' ? 'danger-input' : ''}
            input
            ${bg ? bg : ''}
            ${funcss} ${flat ? 'flat' : ''}
            ${leftRounded ? 'leftRounded' : rightRounded ? 'rightRounded' : ''}
          `}
          onChange={onChange}
          defaultValue={defaultValue}
          type={type}
          placeholder={label}
          value={value}
          style={{
            borderRadius: `${rounded ? '400rem' : ''}`,
            width: `${fullWidth ? '100%' : ''}`,
          }}
        />
      );
    }
  }
};

export default Input;
