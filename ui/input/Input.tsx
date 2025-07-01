'use client'
import React, { useState } from 'react';
import { PiCheck, PiCloudArrowUp } from 'react-icons/pi';
import Button from '../button/Button';

interface InputProps {
  select?: boolean;
  bordered?: boolean;
  borderless?: boolean;
  multiline?: boolean;
  file?: boolean;
  noBorder?: boolean;
  icon?: React.ReactNode;
  extra?: React.ReactNode;
  button?: React.ReactNode;
  id?: string;
  status?: 'success' | 'warning' | 'danger' | '';
  funcss?: string;
  flat?: boolean;
  leftRounded?: boolean;
  rightRounded?: boolean;
  rounded?: boolean;
  fullWidth?: boolean;
  btn?: boolean;
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
  borderless,
  multiline,
  file,
  extra,
  noBorder,
  icon,
  btn,
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
    const [fileName, setFileName] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
    if (onChange) onChange(e);
  };


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
            ${rounded ? "rounded" : ''}
            ${bg ? bg : ''}
            ${funcss} ${flat ? 'flat' : ''}
            ${leftRounded ? 'leftRounded' : rightRounded ? 'rightRounded' : ''}
            borderedInput
          `}
          onChange={onChange}
          defaultValue={defaultValue}
          name={name}
          style={{
            width: `${fullWidth ? '100%' : ''}`
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
    } else if (borderless) {
      return (
        <select
        {...rest}
          id={id}
          className={`
            ${status === 'success' ? 'success-input' : ''}
            ${status === 'warning' ? 'warning-input' : ''}
            ${status === 'danger' ? 'danger-input' : ''}
            input 
            ${rounded ? "rounded" : ''}
            ${bg ? bg : ''}
            ${funcss} ${flat ? 'flat' : ''}
            ${leftRounded ? 'leftRounded' : rightRounded ? 'rightRounded' : ''}
            borderless
          `}
          onChange={onChange}
          defaultValue={defaultValue}
          name={name}
          value={value}
          style={{
            width: `${fullWidth ? '100%' : ''}`
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
            ${rounded ? "rounded" : ''}
            ${bg ? bg : ''}
            ${funcss} ${flat ? 'flat' : ''}
            ${leftRounded ? 'leftRounded' : rightRounded ? 'rightRounded' : ''}
          `}
          onChange={onChange}
          defaultValue={defaultValue}
          name={name}
          value={value}
          style={{
            width: `${fullWidth ? '100%' : ''}`
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
            ${rounded ? "rounded" : ''}
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
            width: `${fullWidth ? '100%' : ''}`
          }}
          value={value}
          rows={rows ? rows : 2}
        />
      );
    } else if (borderless) {
      return (
        <textarea
        {...rest}
          id={id}
          className={`
            ${status === 'success' ? 'success-input' : ''}
            ${status === 'warning' ? 'warning-input' : ''}
            ${status === 'danger' ? 'danger-input' : ''}
            input 
            ${rounded ? "rounded" : ''}
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
            width: `${fullWidth ? '100%' : ''}`
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
            ${rounded ? "rounded" : ''}
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
            width: `${fullWidth ? '100%' : ''}`
          }}
          rows={rows ? rows : 2}
        />
      );
    }
  } else if (file) {
    if(btn)
      return (
      <div className="fileInput">
        {button ? (
          button
        ) : (
     <Button
  funcss={` ${funcss} `}
  startIcon={icon ? icon : <PiCloudArrowUp />}
  bg="primary"
  fullWidth
  raised
>
    {fileName || label || 'Upload File'}
</Button>

        )}
        <input
            name={name}
          id={id}
          className={`
            ${status === 'success' ? 'success-input' : ''}
            ${status === 'warning' ? 'warning-input' : ''}
            ${status === 'danger' ? 'danger-input' : ''}
            input 
            ${rounded ? "rounded" : ''}
            ${bg ? bg : ''}
            ${funcss} ${flat ? 'flat' : ''}
            ${leftRounded ? 'leftRounded' : rightRounded ? 'rightRounded' : ''}
            borderedInput
            filedInput
          `}
          onChange={handleChange}
          type={'file'}
          style={{
            width: `${fullWidth ? '100%' : ''}`
          }}
          
          value={value}
        {...rest}
        />
      </div>
    )
    return (
          <div className="_upload_container">
          <label htmlFor={id || "fileInput"} className="_upload_label">
            <div className="_upload_icon">{ icon || <><PiCloudArrowUp /></>}</div> 
            <div className="_upload_text"    style={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: 'inline-block',
            width: '100%',
          }}>{fileName || label || `Upload File`}</div>
            <div className="text-small opacity-3">{extra || ''}</div>
          </label>
          <input onChange={handleChange} type="file" id={id || "fileInput"} className="_upload_input" {...rest} />
        </div>
    )
  } else {
    if (bordered) {
      return (
        <input
  
            name={name}
          id={id}
          className={`
            ${status === 'success' ? 'success-input' : ''}
            ${status === 'warning' ? 'warning-input' : ''}
            ${status === 'danger' ? 'danger-input' : ''}
            input 
            ${rounded ? "rounded" : ''}
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
            width: `${fullWidth ? '100%' : ''}`
          }}
          value={value}
          {...rest}
        />
      );
    } else if (borderless) {
      return (
        <input
            name={name}
          id={id}
          className={`
            ${status === 'success' ? 'success-input' : ''}
            ${status === 'warning' ? 'warning-input' : ''}
            ${status === 'danger' ? 'danger-input' : ''}
            input 
            ${rounded ? "rounded" : ''}
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
            width: `${fullWidth ? '100%' : ''}`
          }}
        {...rest}

        />
      );
    } else {
      return (
        <input
            name={name}
          id={id}
          className={`
            ${status === 'success' ? 'success-input' : ''}
            ${status === 'warning' ? 'warning-input' : ''}
            ${status === 'danger' ? 'danger-input' : ''}
            input 
            ${rounded ? "rounded" : ''}
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
            width: `${fullWidth ? '100%' : ''}`
          }}
        {...rest}
        />
      );
    }
  }
};

export default Input;
