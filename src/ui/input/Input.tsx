'use client'
import React, { useState, useEffect, useRef } from 'react';
import { PiCheck, PiCloudArrowUp, PiInfo, PiWarning, PiX, PiCheckCircle } from 'react-icons/pi';
import Button from '../button/Button';
import { useVariant } from '../theme/theme';
import { useComponentConfiguration } from '../../utils/componentUtils';
import { getDynamicIcon } from '../../utils/getDynamicIcon';

// Base types and interfaces
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

interface FileInputProps extends BaseInputProps {
  icon?: React.ReactNode;
  extra?: React.ReactNode;
  button?: React.ReactNode;
  btn?: boolean;
}

// Status icons mapping
const statusIcons = {
  success: <PiCheckCircle />,
  warning: <PiWarning />,
  danger: <PiX />,
  info: <PiInfo />
};

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
  const borderClass = bordered ? 'borderedInput' : borderless ? 'borderless' : (!bordered && !borderless ? 'borderedInput' : '');

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

// Iconic Input Wrapper Component
const IconicInputWrapper: React.FC<{
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  iconicBg?: string;
  funcss?: string;
  children: React.ReactNode;
}> = ({ startIcon, endIcon, prefix, suffix, iconicBg, funcss, children }) => {
  const effectiveStartIcon = prefix !== undefined ? prefix : startIcon;
  const effectiveEndIcon = suffix !== undefined ? suffix : endIcon;

  if (!effectiveStartIcon && !effectiveEndIcon) {
    return <>{children}</>;
  }

  return (
    <div className={`icon-container ${effectiveStartIcon ? 'has-left-icon' : ''} ${funcss || ''}`}>
      {effectiveStartIcon && (
        <div
          className="leftIcon"
          style={{
            backgroundColor: iconicBg || '',
            border: iconicBg ? `0.1rem ${iconicBg} solid` : '',
          }}
        >
          {effectiveStartIcon}
        </div>
      )}
      {children}
      {effectiveEndIcon && (
        <div className="rightIcon" style={{ backgroundColor: iconicBg || '' }}>
          {effectiveEndIcon}
        </div>
      )}
    </div>
  );
};

// Input Container with Floating Label
const InputContainer: React.FC<{
  label?: string;
  status?: string;
  helperText?: string;
  children: React.ReactNode;
  isFocused: boolean;
  hasValue: boolean;
  fullWidth?: boolean;
  id?: string;
  startIcon?: React.ReactNode;
  prefix?: React.ReactNode;
}> = ({ label, status, helperText, children, isFocused, hasValue, fullWidth, id, startIcon, prefix }) => {
  const showFloatingLabel = label && (isFocused || hasValue);

  return (
    <div className={`input-wrapper ${fullWidth ? 'full-width' : ''}`}>
      <div className="input-container-with-label">
        {label && (
          <label
            htmlFor={id}
            className={`floating-label ${startIcon || prefix ? "label-left" : ""}  ${showFloatingLabel ? 'active' : ''} ${status ? `label-${status}` : ''}`}
          >
            {label}
          </label>
        )}
        {children}
      </div>
      {(helperText || status) && (
        <div className={`input-helper-text ${status ? `helper-${status}` : ''}`}>
          {status && statusIcons[status as keyof typeof statusIcons] && (
            <span className="helper-icon">{statusIcons[status as keyof typeof statusIcons]}</span>
          )}
          <span>{helperText}</span>
        </div>
      )}
    </div>
  );
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
  fullWidth = true,
  flat,
  bordered,
  borderless,
  rounded,
  leftRounded,
  rightRounded,
  startIcon,
  endIcon,
  prefix,
  suffix,
  stringPrefix,
  stringSuffix,
  iconicBg,
  type = 'text',
  label,
  helperText,
  variant = '',
  placeholder,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState<string>(value !== undefined ? String(value) : defaultValue || '');
  const [prefixNode, setPrefixNode] = useState<React.ReactNode>(null);
  const [suffixNode, setSuffixNode] = useState<React.ReactNode>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Handle value changes - only update if value is truly defined (not empty string)
  useEffect(() => {
    if (value !== undefined && value !== '') {
      setInputValue(String(value));
    } else if (value === '') {
      // Allow empty string to clear the input
      setInputValue('');
    }
  }, [value]);

  const { mergeWithLocal } = useComponentConfiguration('Input', variant);

  // Create local props object including stringPrefix/stringSuffix
  const localProps = {
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
    startIcon,
    endIcon,
    prefix,
    suffix,
    iconicBg,
    stringPrefix, // Include in local props
    stringSuffix, // Include in local props
  };

  // Merge with config - LOCAL PROPS OVERRIDE CONFIG
  const { props: mergedProps } = mergeWithLocal(localProps);

  // Extract final values - local props take precedence, but handle empty strings properly
  const final = {
    status: status !== undefined ? status : mergedProps.status,
    funcss: funcss !== undefined ? funcss : mergedProps.funcss,
    bg: bg !== undefined ? bg : mergedProps.bg,
    fullWidth: fullWidth !== undefined ? fullWidth : mergedProps.fullWidth,
    flat: flat !== undefined ? flat : mergedProps.flat,
    bordered: bordered !== undefined ? bordered : mergedProps.bordered,
    borderless: borderless !== undefined ? borderless : mergedProps.borderless,
    rounded: rounded !== undefined ? rounded : mergedProps.rounded,
    leftRounded: leftRounded !== undefined ? leftRounded : mergedProps.leftRounded,
    rightRounded: rightRounded !== undefined ? rightRounded : mergedProps.rightRounded,
    startIcon: startIcon !== undefined ? startIcon : mergedProps.startIcon,
    endIcon: endIcon !== undefined ? endIcon : mergedProps.endIcon,
    prefix: prefix !== undefined ? prefix : mergedProps.prefix,
    suffix: suffix !== undefined ? suffix : mergedProps.suffix,
    iconicBg: iconicBg !== undefined ? iconicBg : mergedProps.iconicBg,
    stringPrefix: stringPrefix !== undefined ? stringPrefix : mergedProps.stringPrefix, // Handle both local and config
    stringSuffix: stringSuffix !== undefined ? stringSuffix : mergedProps.stringSuffix, // Handle both local and config
  };

  // Handle stringPrefix - use final value (local or config)
  useEffect(() => {
    const effectiveStringPrefix = final.stringPrefix;
    if (effectiveStringPrefix) {
      getDynamicIcon(effectiveStringPrefix).then((node) => setPrefixNode(node));
    } else {
      setPrefixNode(null);
    }
  }, [final.stringPrefix]);

  // Handle stringSuffix - use final value (local or config)
  useEffect(() => {
    const effectiveStringSuffix = final.stringSuffix;
    if (effectiveStringSuffix) {
      getDynamicIcon(effectiveStringSuffix).then((node) => setSuffixNode(node));
    } else {
      setSuffixNode(null);
    }
  }, [final.stringSuffix]);

  const { variant: themeVariant } = useVariant();

  const className = generateInputClasses({
    status: final.status,
    rounded: final.rounded,
    bg: final.bg,
    funcss: final.funcss,
    flat: final.flat,
    leftRounded: final.leftRounded,
    rightRounded: final.rightRounded,
    bordered: final.bordered,
    borderless: final.borderless,
  });

  const style = final.fullWidth ? { width: '100%' } : undefined;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    if (onChange) onChange(e);
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    if (rest.onFocus) rest.onFocus(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    if (rest.onBlur) rest.onBlur(e);
  };

  // Determine effective icons: stringPrefix/stringSuffix take priority, then local, then config
  const effectivePrefix = prefixNode || final.prefix || final.startIcon;
  const effectiveSuffix = suffixNode || final.suffix || final.endIcon;

  // Show placeholder only when label is active (focused or has value)
  const showPlaceholder = placeholder && label && (isFocused || !!inputValue);

  const inputElement = (
    <input
      ref={inputRef}
      id={id}
      name={name}
      className={className}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      defaultValue={defaultValue}
      type={type}
      placeholder={showPlaceholder ? placeholder : (!label ? placeholder : '')}
      style={style}
      value={inputValue} // Use internal state for value
      {...rest}
    />
  );

  const wrappedInput = (
    <IconicInputWrapper
      startIcon={effectivePrefix}
      endIcon={effectiveSuffix}
      iconicBg={final.iconicBg}
      funcss={final.funcss}
    >
      {inputElement}
    </IconicInputWrapper>
  );

  return (
    <InputContainer
      startIcon={effectivePrefix}
      label={label}
      status={final.status}
      helperText={helperText}
      isFocused={isFocused}
      hasValue={!!inputValue}
      fullWidth={final.fullWidth}
      id={id}
    >
      {wrappedInput}
    </InputContainer>
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
  startIcon,
  endIcon,
  prefix,
  suffix,
  stringPrefix,
  stringSuffix,
  iconicBg,
  options = [],
  label,
  helperText,
  variant = '',
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [selectValue, setSelectValue] = useState<string>(value !== undefined ? String(value) : defaultValue || '');
  const [prefixNode, setPrefixNode] = useState<React.ReactNode>(null);
  const [suffixNode, setSuffixNode] = useState<React.ReactNode>(null);

  // Handle value changes - only update if value is truly defined (not empty string)
  useEffect(() => {
    if (value !== undefined && value !== '') {
      setSelectValue(String(value));
    } else if (value === '') {
      // Allow empty string to clear the select
      setSelectValue('');
    }
  }, [value]);

  const { mergeWithLocal } = useComponentConfiguration('Input', variant);

  // Create local props object including stringPrefix/stringSuffix
  const localProps = {
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
    startIcon,
    endIcon,
    prefix,
    suffix,
    iconicBg,
    stringPrefix, // Include in local props
    stringSuffix, // Include in local props
  };

  // Merge with config - LOCAL PROPS OVERRIDE CONFIG
  const { props: mergedProps } = mergeWithLocal(localProps);

  // Extract final values - local props take precedence, but handle empty strings properly
  const final = {
    status: status !== undefined ? status : mergedProps.status,
    funcss: funcss !== undefined ? funcss : mergedProps.funcss,
    bg: bg !== undefined ? bg : mergedProps.bg,
    fullWidth: fullWidth !== undefined ? fullWidth : mergedProps.fullWidth,
    flat: flat !== undefined ? flat : mergedProps.flat,
    bordered: bordered !== undefined ? bordered : mergedProps.bordered,
    borderless: borderless !== undefined ? borderless : mergedProps.borderless,
    rounded: rounded !== undefined ? rounded : mergedProps.rounded,
    leftRounded: leftRounded !== undefined ? leftRounded : mergedProps.leftRounded,
    rightRounded: rightRounded !== undefined ? rightRounded : mergedProps.rightRounded,
    startIcon: startIcon !== undefined ? startIcon : mergedProps.startIcon,
    endIcon: endIcon !== undefined ? endIcon : mergedProps.endIcon,
    prefix: prefix !== undefined ? prefix : mergedProps.prefix,
    suffix: suffix !== undefined ? suffix : mergedProps.suffix,
    iconicBg: iconicBg !== undefined ? iconicBg : mergedProps.iconicBg,
    stringPrefix: stringPrefix !== undefined ? stringPrefix : mergedProps.stringPrefix, // Handle both local and config
    stringSuffix: stringSuffix !== undefined ? stringSuffix : mergedProps.stringSuffix, // Handle both local and config
  };

  // Handle stringPrefix - use final value (local or config)
  useEffect(() => {
    const effectiveStringPrefix = final.stringPrefix;
    if (effectiveStringPrefix) {
      getDynamicIcon(effectiveStringPrefix).then((node) => setPrefixNode(node));
    } else {
      setPrefixNode(null);
    }
  }, [final.stringPrefix]);

  // Handle stringSuffix - use final value (local or config)
  useEffect(() => {
    const effectiveStringSuffix = final.stringSuffix;
    if (effectiveStringSuffix) {
      getDynamicIcon(effectiveStringSuffix).then((node) => setSuffixNode(node));
    } else {
      setSuffixNode(null);
    }
  }, [final.stringSuffix]);

  const selectHasValue = !!selectValue;

  const { variant: themeVariant } = useVariant();

  const className = generateInputClasses({
    status: final.status,
    rounded: final.rounded,
    bg: final.bg,
    funcss: final.funcss,
    flat: final.flat,
    leftRounded: final.leftRounded,
    rightRounded: final.rightRounded,
    bordered: final.bordered,
    borderless: final.borderless,
  });

  const style = final.fullWidth ? { width: '100%' } : undefined;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;
    setSelectValue(newValue);
    if (onChange) onChange(e);
  };

  const handleFocus = (e: React.FocusEvent<HTMLSelectElement>) => {
    setIsFocused(true);
    if (rest.onFocus) rest.onFocus(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLSelectElement>) => {
    setIsFocused(false);
    if (rest.onBlur) rest.onBlur(e);
  };

  const effectivePrefix = prefixNode || final.prefix || final.startIcon;
  const effectiveSuffix = suffixNode || final.suffix || final.endIcon;

  const selectElement = (
    <select
      id={id}
      name={name}
      className={className}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      defaultValue={defaultValue}
      value={selectValue} // Use internal state for value
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

  const wrappedSelect = (
    <IconicInputWrapper
      startIcon={effectivePrefix}
      endIcon={effectiveSuffix}
      iconicBg={final.iconicBg}
      funcss={final.funcss}
    >
      {selectElement}
    </IconicInputWrapper>
  );

  return (
    <InputContainer
      startIcon={effectivePrefix}
      label={label}
      status={final.status}
      helperText={helperText}
      isFocused={isFocused}
      hasValue={selectHasValue}
      fullWidth={final.fullWidth}
      id={id}
    >
      {wrappedSelect}
    </InputContainer>
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
  startIcon,
  endIcon,
  prefix,
  suffix,
  stringPrefix,
  stringSuffix,
  iconicBg,
  label,
  helperText,
  rows = 2,
  variant = '',
  placeholder,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [textValue, setTextValue] = useState<string>(value !== undefined ? String(value) : defaultValue || '');
  const [prefixNode, setPrefixNode] = useState<React.ReactNode>(null);
  const [suffixNode, setSuffixNode] = useState<React.ReactNode>(null);

  // Handle value changes - only update if value is truly defined (not empty string)
  useEffect(() => {
    if (value !== undefined && value !== '') {
      setTextValue(String(value));
    } else if (value === '') {
      // Allow empty string to clear the textarea
      setTextValue('');
    }
  }, [value]);

  const { mergeWithLocal } = useComponentConfiguration('Input', variant);

  // Create local props object including stringPrefix/stringSuffix
  const localProps = {
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
    startIcon,
    endIcon,
    prefix,
    suffix,
    iconicBg,
    stringPrefix, // Include in local props
    stringSuffix, // Include in local props
  };

  // Merge with config - LOCAL PROPS OVERRIDE CONFIG
  const { props: mergedProps } = mergeWithLocal(localProps);

  // Extract final values - local props take precedence, but handle empty strings properly
  const final = {
    status: status !== undefined ? status : mergedProps.status,
    funcss: funcss !== undefined ? funcss : mergedProps.funcss,
    bg: bg !== undefined ? bg : mergedProps.bg,
    fullWidth: fullWidth !== undefined ? fullWidth : mergedProps.fullWidth,
    flat: flat !== undefined ? flat : mergedProps.flat,
    bordered: bordered !== undefined ? bordered : mergedProps.bordered,
    borderless: borderless !== undefined ? borderless : mergedProps.borderless,
    rounded: rounded !== undefined ? rounded : mergedProps.rounded,
    leftRounded: leftRounded !== undefined ? leftRounded : mergedProps.leftRounded,
    rightRounded: rightRounded !== undefined ? rightRounded : mergedProps.rightRounded,
    startIcon: startIcon !== undefined ? startIcon : mergedProps.startIcon,
    endIcon: endIcon !== undefined ? endIcon : mergedProps.endIcon,
    prefix: prefix !== undefined ? prefix : mergedProps.prefix,
    suffix: suffix !== undefined ? suffix : mergedProps.suffix,
    iconicBg: iconicBg !== undefined ? iconicBg : mergedProps.iconicBg,
    stringPrefix: stringPrefix !== undefined ? stringPrefix : mergedProps.stringPrefix, // Handle both local and config
    stringSuffix: stringSuffix !== undefined ? stringSuffix : mergedProps.stringSuffix, // Handle both local and config
  };

  // Handle stringPrefix - use final value (local or config)
  useEffect(() => {
    const effectiveStringPrefix = final.stringPrefix;
    if (effectiveStringPrefix) {
      getDynamicIcon(effectiveStringPrefix).then((node) => setPrefixNode(node));
    } else {
      setPrefixNode(null);
    }
  }, [final.stringPrefix]);

  // Handle stringSuffix - use final value (local or config)
  useEffect(() => {
    const effectiveStringSuffix = final.stringSuffix;
    if (effectiveStringSuffix) {
      getDynamicIcon(effectiveStringSuffix).then((node) => setSuffixNode(node));
    } else {
      setSuffixNode(null);
    }
  }, [final.stringSuffix]);

  const { variant: themeVariant } = useVariant();

  const className = generateInputClasses({
    status: final.status,
    rounded: final.rounded,
    bg: final.bg,
    funcss: final.funcss,
    flat: final.flat,
    leftRounded: final.leftRounded,
    rightRounded: final.rightRounded,
    bordered: final.bordered,
    borderless: final.borderless,
  });

  const style = final.fullWidth ? { width: '100%' } : undefined;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setTextValue(newValue);
    if (onChange) onChange(e);
  };

  const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    setIsFocused(true);
    if (rest.onFocus) rest.onFocus(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    setIsFocused(false);
    if (rest.onBlur) rest.onBlur(e);
  };

  const effectivePrefix = prefixNode || final.prefix || final.startIcon;
  const effectiveSuffix = suffixNode || final.suffix || final.endIcon;

  // Show placeholder only when label is active (focused or has value)
  const showPlaceholder = placeholder && label && (isFocused || !!textValue);

  const textareaElement = (
    <textarea
      id={id}
      name={name}
      className={className}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      defaultValue={defaultValue}
      placeholder={showPlaceholder ? placeholder : (!label ? placeholder : '')}
      style={style}
      value={textValue} // Use internal state for value
      rows={rows}
      {...rest}
    />
  );

  const wrappedTextarea = (
    <IconicInputWrapper
      startIcon={effectivePrefix}
      endIcon={effectiveSuffix}
      iconicBg={final.iconicBg}
      funcss={final.funcss}
    >
      {textareaElement}
    </IconicInputWrapper>
  );

  return (
    <InputContainer
      startIcon={effectivePrefix}
      label={label}
      status={final.status}
      helperText={helperText}
      isFocused={isFocused}
      hasValue={!!textValue}
      fullWidth={final.fullWidth}
      id={id}
    >
      {wrappedTextarea}
    </InputContainer>
  );
};

// File Input Component (unchanged as it doesn't have the same value issue)
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
  startIcon,
  endIcon,
  prefix,
  suffix,
  stringPrefix,
  stringSuffix,
  iconicBg,
  label = 'Upload File',
  helperText,
  icon,
  extra,
  button,
  btn,
  value,
  variant = '',
  ...rest
}) => {
  const [fileName, setFileName] = useState('');
  const [prefixNode, setPrefixNode] = useState<React.ReactNode>(null);
  const [suffixNode, setSuffixNode] = useState<React.ReactNode>(null);

  const { mergeWithLocal } = useComponentConfiguration('Input', variant);

  // Create local props object including stringPrefix/stringSuffix
  const localProps = {
    status,
    funcss,
    bg,
    fullWidth,
    flat,
    rounded,
    leftRounded,
    rightRounded,
    startIcon,
    endIcon,
    prefix,
    suffix,
    iconicBg,
    stringPrefix, // Include in local props
    stringSuffix, // Include in local props
    bordered: rest.bordered,
    borderless: rest.borderless,
  };

  // Merge with config - LOCAL PROPS OVERRIDE CONFIG
  const { props: mergedProps } = mergeWithLocal(localProps);

  // Extract final values - local props take precedence
  const final = {
    status: status !== undefined ? status : mergedProps.status,
    funcss: funcss !== undefined ? funcss : mergedProps.funcss,
    bg: bg !== undefined ? bg : mergedProps.bg,
    fullWidth: fullWidth !== undefined ? fullWidth : mergedProps.fullWidth,
    flat: flat !== undefined ? flat : mergedProps.flat,
    rounded: rounded !== undefined ? rounded : mergedProps.rounded,
    leftRounded: leftRounded !== undefined ? leftRounded : mergedProps.leftRounded,
    rightRounded: rightRounded !== undefined ? rightRounded : mergedProps.rightRounded,
    startIcon: startIcon !== undefined ? startIcon : mergedProps.startIcon,
    endIcon: endIcon !== undefined ? endIcon : mergedProps.endIcon,
    prefix: prefix !== undefined ? prefix : mergedProps.prefix,
    suffix: suffix !== undefined ? suffix : mergedProps.suffix,
    iconicBg: iconicBg !== undefined ? iconicBg : mergedProps.iconicBg,
    stringPrefix: stringPrefix !== undefined ? stringPrefix : mergedProps.stringPrefix, // Handle both local and config
    stringSuffix: stringSuffix !== undefined ? stringSuffix : mergedProps.stringSuffix, // Handle both local and config
  };

  // Handle stringPrefix - use final value (local or config)
  useEffect(() => {
    const effectiveStringPrefix = final.stringPrefix;
    if (effectiveStringPrefix) {
      getDynamicIcon(effectiveStringPrefix).then((node) => setPrefixNode(node));
    } else {
      setPrefixNode(null);
    }
  }, [final.stringPrefix]);

  // Handle stringSuffix - use final value (local or config)
  useEffect(() => {
    const effectiveStringSuffix = final.stringSuffix;
    if (effectiveStringSuffix) {
      getDynamicIcon(effectiveStringSuffix).then((node) => setSuffixNode(node));
    } else {
      setSuffixNode(null);
    }
  }, [final.stringSuffix]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
    if (onChange) onChange(e);
  };

  const effectivePrefix = prefixNode || final.prefix || final.startIcon;
  const effectiveSuffix = suffixNode || final.suffix || final.endIcon;

  if (btn) {
    const className = generateInputClasses({
      status: final.status,
      rounded: final.rounded,
      bg: final.bg,
      funcss: final.funcss,
      flat: final.flat,
      leftRounded: final.leftRounded,
      rightRounded: final.rightRounded,
      bordered: true,
      borderless: false,
      additionalClasses: 'filedInput'
    });

    const style = final.fullWidth ? { width: '100%' } : undefined;

    const fileInputElement = (
      <div className="fileInput">
        {button || (
          <Button
            funcss={final.funcss}
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

    const wrappedFileInput = (
      <IconicInputWrapper
        startIcon={effectivePrefix}
        endIcon={effectiveSuffix}
        iconicBg={final.iconicBg}
        funcss={final.funcss}
      >
        {fileInputElement}
    </IconicInputWrapper>
    );

    return (
      <InputContainer
        startIcon={effectivePrefix}
        label={undefined}
        status={final.status}
        helperText={helperText}
        isFocused={false}
        hasValue={!!fileName}
        fullWidth={final.fullWidth}
        id={id}
      >
        {wrappedFileInput}
      </InputContainer>
    );
  }

  const uploadElement = (
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

  return (
    <InputContainer
      startIcon={effectivePrefix}
      label={undefined}
      status={final.status}
      helperText={helperText}
      isFocused={false}
      hasValue={!!fileName}
      fullWidth={final.fullWidth}
      id={id}
    >
      {uploadElement}
    </InputContainer>
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
  options?: SelectOption[];
  rows?: number;
}

const Input: React.FC<InputProps> = ({
  select,
  multiline,
  file,
  noBorder,
  startIcon,
  endIcon,
  prefix,
  suffix,
  stringPrefix,
  stringSuffix,
  iconicBg,
  variant = '',
  ...props
}) => {
  const { mergeWithLocal } = useComponentConfiguration('Input', variant);
  
  // Create local props object including stringPrefix/stringSuffix
  const localProps = {
    ...props,
    startIcon,
    endIcon,
    prefix,
    suffix,
    iconicBg,
    stringPrefix, // Include in local props
    stringSuffix, // Include in local props
  };

  const { props: mergedProps } = mergeWithLocal(localProps);

  const inputProps = {
    ...props,
    ...mergedProps,
    variant,
    borderless: noBorder !== undefined ? noBorder : (props.borderless !== undefined ? props.borderless : mergedProps.borderless),
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