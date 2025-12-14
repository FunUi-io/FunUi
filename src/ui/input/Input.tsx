'use client'
import React, { useState, useEffect, useRef } from 'react';
import { PiCheck, PiCloudArrowUp, PiInfo, PiWarning, PiX, PiCheckCircle } from 'react-icons/pi';
import Button from '../button/Button';
import { useVariant } from '../theme/theme';
import { useComponentConfiguration } from '../../utils/componentUtils';
import { getDynamicIcon } from '../../utils/getDynamicIcon';
import Text from '../text/Text';
import { FileUpload } from './FileUpload';

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
  additionalClasses = '',
  hasNoPrefix = false,
  hasNoLabel = false
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
  hasNoPrefix?: boolean;
  hasNoLabel?: boolean;
}) => {
  const statusClass = status ? `${status}-input` : '';
  const roundedClass = rounded ? 'rounded' : '';
  const bgClass = bg || '';
  const flatClass = flat ? 'flat' : '';
  const cornerClass = leftRounded ? 'leftRounded' : rightRounded ? 'rightRounded' : '';
  const borderClass = bordered ? 'borderedInput' : borderless ? 'borderless' : (!bordered && !borderless ? 'borderedInput' : '');
  const noPrefixClass = hasNoPrefix ? 'no_prefix' : '';
  const noLabelClass = hasNoLabel ? 'no_label' : '';

  return `
    ${statusClass}
    ${roundedClass}
    ${bgClass}
    ${funcss || ''}
    ${flatClass}
    ${cornerClass}
    ${borderClass}
    ${additionalClasses}
    ${noPrefixClass}
    ${noLabelClass}
    input
  `.trim().replace(/\s+/g, ' ');
};

// Iconic Input Wrapper Component - UPDATED to match Button's pattern
const IconicInputWrapper: React.FC<{
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  iconicBg?: string;
  funcss?: string;
  stringPrefix?: string;
  stringSuffix?: string;
  children: React.ReactNode;
}> = ({ 
  startIcon, 
  endIcon,
  prefix,
  suffix,
  iconicBg, 
  funcss,
  stringPrefix,
  stringSuffix,
  children 
}) => {
  // Match Button's pattern exactly - use proper priority
  const effectiveStartIcon = startIcon !== undefined ? startIcon : prefix;
  const effectiveEndIcon = endIcon !== undefined ? endIcon : suffix;

  // Determine which icons to show - MATCH BUTTON'S PATTERN EXACTLY
  const showPrefix = effectiveStartIcon !== undefined && effectiveStartIcon !== null;
  const showSuffix = effectiveEndIcon !== undefined && effectiveEndIcon !== null;

  if (!showPrefix && !showSuffix) {
    return <>{children}</>;
  }

  // Helper function to check if element is a React element
  function isReactElement(node: any): node is React.ReactElement {
    return React.isValidElement(node);
  }

  return (
    <div className={`icon-container ${showPrefix ? 'has-left-icon' : ''} ${funcss || ''}`}>
      {/* LEFT ICON - Match Button's exact conditional pattern */}
      {showPrefix && (
        <div
          className="leftIcon"
          style={{
            backgroundColor: iconicBg || '',
            border: iconicBg ? `0.1rem ${iconicBg} solid` : '',
          }}
        >
          {isReactElement(startIcon) ? startIcon
            : isReactElement(prefix) ? prefix
            : isReactElement(effectiveStartIcon) ? effectiveStartIcon
            : stringPrefix ? effectiveStartIcon : ''
          }
        </div>
      )}
      
      {children}
      
      {/* RIGHT ICON - Match Button's exact conditional pattern */}
      {showSuffix && (
        <div className="rightIcon" style={{ backgroundColor: iconicBg || '' }}>
          {isReactElement(endIcon) ? endIcon
            : isReactElement(suffix) ? suffix
            : isReactElement(effectiveEndIcon) ? effectiveEndIcon
            : stringSuffix ? effectiveEndIcon : ""
          }
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
  alwaysActiveLabel?: boolean;
}> = ({ label, status, helperText, children, isFocused, hasValue, fullWidth, id, startIcon, prefix, alwaysActiveLabel = false }) => {
  const showFloatingLabel = label && (alwaysActiveLabel || isFocused || hasValue);

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
  const [hasValidStringPrefix, setHasValidStringPrefix] = useState(false);
  const [hasValidStringSuffix, setHasValidStringSuffix] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const isDateTimeInput = ['date', 'time', 'month', 'week', 'datetime-local'].includes(type || '');

  useEffect(() => {
    if (value !== undefined && value !== '') {
      setInputValue(String(value));
    } else if (value === '') {
      setInputValue('');
    }
  }, [value]);

  const { mergeWithLocal } = useComponentConfiguration('Input', variant);

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
    stringPrefix,
    stringSuffix,
  };

  const { props: mergedProps } = mergeWithLocal(localProps);

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
    stringPrefix: stringPrefix !== undefined ? stringPrefix : mergedProps.stringPrefix,
    stringSuffix: stringSuffix !== undefined ? stringSuffix : mergedProps.stringSuffix,
  };

  // Handle stringPrefix - MATCH BUTTON'S PATTERN EXACTLY
  useEffect(() => {
    const effectiveStringPrefix = final.stringPrefix;
    
    if (!effectiveStringPrefix || effectiveStringPrefix.trim() === '') {
      setPrefixNode(null);
      setHasValidStringPrefix(false);
      return;
    }

    getDynamicIcon(effectiveStringPrefix).then((node) => {
      if (node) {
        setPrefixNode(node);
        setHasValidStringPrefix(true);
      } else {
        setPrefixNode(null);
        setHasValidStringPrefix(false);
      }
    });
  }, [final.stringPrefix]);

  // Handle stringSuffix - MATCH BUTTON'S PATTERN EXACTLY
  useEffect(() => {
    const effectiveStringSuffix = final.stringSuffix;
    
    if (!effectiveStringSuffix || effectiveStringSuffix.trim() === '') {
      setSuffixNode(null);
      setHasValidStringSuffix(false);
      return;
    }

    getDynamicIcon(effectiveStringSuffix).then((node) => {
      if (node) {
        setSuffixNode(node);
        setHasValidStringSuffix(true);
      } else {
        setSuffixNode(null);
        setHasValidStringSuffix(false);
      }
    });
  }, [final.stringSuffix]);

  const { variant: themeVariant } = useVariant();

  // Determine which prefix to show with proper priority - MATCH BUTTON'S PATTERN
  const showPrefix = React.useMemo(() => {
    // Priority order: startIcon (local) > prefix (local) > stringPrefix (dynamic)
    if (final.startIcon) return true;
    if (final.prefix) return true;
    if (hasValidStringPrefix && prefixNode) return true;
    return false;
  }, [final.startIcon, final.prefix, hasValidStringPrefix, prefixNode]);

  // Determine which suffix to show with proper priority - MATCH BUTTON'S PATTERN
  const showSuffix = React.useMemo(() => {
    // Priority order: endIcon (local) > suffix (local) > stringSuffix (dynamic)
    if (final.endIcon) return true;
    if (final.suffix) return true;
    if (hasValidStringSuffix && suffixNode) return true;
    return false;
  }, [final.endIcon, final.suffix, hasValidStringSuffix, suffixNode]);

  // Get effective icons following Button's priority pattern
  const effectivePrefix = React.useMemo(() => {
    // Priority: startIcon > prefix > stringPrefix
    if (final.startIcon) return final.startIcon;
    if (final.prefix) return final.prefix;
    if (hasValidStringPrefix) return prefixNode;
    return null;
  }, [final.startIcon, final.prefix, hasValidStringPrefix, prefixNode]);

  const effectiveSuffix = React.useMemo(() => {
    // Priority: endIcon > suffix > stringSuffix
    if (final.endIcon) return final.endIcon;
    if (final.suffix) return final.suffix;
    if (hasValidStringSuffix) return suffixNode;
    return null;
  }, [final.endIcon, final.suffix, hasValidStringSuffix, suffixNode]);

  const hasNoPrefix = !effectivePrefix;
  const hasNoLabel = !label;

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
    hasNoPrefix,
    hasNoLabel,
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
      value={inputValue}
      {...rest}
    />
  );

  // Only use iconic wrapper when we have icons, matching Button's pattern
  const wrappedInput = showPrefix || showSuffix ? (
    <IconicInputWrapper
      startIcon={effectivePrefix}
      endIcon={effectiveSuffix}
      iconicBg={final.iconicBg}
      funcss={final.funcss}
      stringPrefix={stringPrefix}
      stringSuffix={stringSuffix}
    >
      {inputElement}
    </IconicInputWrapper>
  ) : (
    inputElement
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
      alwaysActiveLabel={isDateTimeInput}
    >
      {wrappedInput}
    </InputContainer>
  );
};

// Select Component - UPDATED to match pattern
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
  const [hasValidStringPrefix, setHasValidStringPrefix] = useState(false);
  const [hasValidStringSuffix, setHasValidStringSuffix] = useState(false);

  useEffect(() => {
    if (value !== undefined && value !== '') {
      setSelectValue(String(value));
    } else if (value === '') {
      setSelectValue('');
    }
  }, [value]);

  const { mergeWithLocal } = useComponentConfiguration('Input', variant);

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
    stringPrefix,
    stringSuffix,
  };

  const { props: mergedProps } = mergeWithLocal(localProps);

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
    stringPrefix: stringPrefix !== undefined ? stringPrefix : mergedProps.stringPrefix,
    stringSuffix: stringSuffix !== undefined ? stringSuffix : mergedProps.stringSuffix,
  };

  // Handle stringPrefix - MATCH BUTTON'S PATTERN EXACTLY
  useEffect(() => {
    const effectiveStringPrefix = final.stringPrefix;
    
    if (!effectiveStringPrefix || effectiveStringPrefix.trim() === '') {
      setPrefixNode(null);
      setHasValidStringPrefix(false);
      return;
    }

    getDynamicIcon(effectiveStringPrefix).then((node) => {
      if (node) {
        setPrefixNode(node);
        setHasValidStringPrefix(true);
      } else {
        setPrefixNode(null);
        setHasValidStringPrefix(false);
      }
    });
  }, [final.stringPrefix]);

  // Handle stringSuffix - MATCH BUTTON'S PATTERN EXACTLY
  useEffect(() => {
    const effectiveStringSuffix = final.stringSuffix;
    
    if (!effectiveStringSuffix || effectiveStringSuffix.trim() === '') {
      setSuffixNode(null);
      setHasValidStringSuffix(false);
      return;
    }

    getDynamicIcon(effectiveStringSuffix).then((node) => {
      if (node) {
        setSuffixNode(node);
        setHasValidStringSuffix(true);
      } else {
        setSuffixNode(null);
        setHasValidStringSuffix(false);
      }
    });
  }, [final.stringSuffix]);

  const selectHasValue = !!selectValue;
  const { variant: themeVariant } = useVariant();

  // Determine which prefix to show with proper priority - MATCH BUTTON'S PATTERN
  const showPrefix = React.useMemo(() => {
    // Priority order: startIcon (local) > prefix (local) > stringPrefix (dynamic)
    if (final.startIcon) return true;
    if (final.prefix) return true;
    if (hasValidStringPrefix && prefixNode) return true;
    return false;
  }, [final.startIcon, final.prefix, hasValidStringPrefix, prefixNode]);

  // Determine which suffix to show with proper priority - MATCH BUTTON'S PATTERN
  const showSuffix = React.useMemo(() => {
    // Priority order: endIcon (local) > suffix (local) > stringSuffix (dynamic)
    if (final.endIcon) return true;
    if (final.suffix) return true;
    if (hasValidStringSuffix && suffixNode) return true;
    return false;
  }, [final.endIcon, final.suffix, hasValidStringSuffix, suffixNode]);

  // Get effective icons following Button's priority pattern
  const effectivePrefix = React.useMemo(() => {
    // Priority: startIcon > prefix > stringPrefix
    if (final.startIcon) return final.startIcon;
    if (final.prefix) return final.prefix;
    if (hasValidStringPrefix) return prefixNode;
    return null;
  }, [final.startIcon, final.prefix, hasValidStringPrefix, prefixNode]);

  const effectiveSuffix = React.useMemo(() => {
    // Priority: endIcon > suffix > stringSuffix
    if (final.endIcon) return final.endIcon;
    if (final.suffix) return final.suffix;
    if (hasValidStringSuffix) return suffixNode;
    return null;
  }, [final.endIcon, final.suffix, hasValidStringSuffix, suffixNode]);

  const hasNoPrefix = !effectivePrefix;
  const hasNoLabel = !label;

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
    hasNoPrefix,
    hasNoLabel,
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

  const selectElement = (
    <select
      id={id}
      name={name}
      className={className}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      defaultValue={defaultValue}
      value={selectValue}
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

  // Only use iconic wrapper when we have icons, matching Button's pattern
  const wrappedSelect = showPrefix || showSuffix ? (
    <IconicInputWrapper
      startIcon={effectivePrefix}
      endIcon={effectiveSuffix}
      iconicBg={final.iconicBg}
      funcss={final.funcss}
      stringPrefix={stringPrefix}
      stringSuffix={stringSuffix}
    >
      {selectElement}
    </IconicInputWrapper>
  ) : (
    selectElement
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
      alwaysActiveLabel={true}
    >
      {wrappedSelect}
    </InputContainer>
  );
};

// Textarea Component - UPDATED to match pattern
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
  const [hasValidStringPrefix, setHasValidStringPrefix] = useState(false);
  const [hasValidStringSuffix, setHasValidStringSuffix] = useState(false);

  useEffect(() => {
    if (value !== undefined && value !== '') {
      setTextValue(String(value));
    } else if (value === '') {
      setTextValue('');
    }
  }, [value]);

  const { mergeWithLocal } = useComponentConfiguration('Input', variant);

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
    stringPrefix,
    stringSuffix,
  };

  const { props: mergedProps } = mergeWithLocal(localProps);

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
    stringPrefix: stringPrefix !== undefined ? stringPrefix : mergedProps.stringPrefix,
    stringSuffix: stringSuffix !== undefined ? stringSuffix : mergedProps.stringSuffix,
  };

  // Handle stringPrefix - MATCH BUTTON'S PATTERN EXACTLY
  useEffect(() => {
    const effectiveStringPrefix = final.stringPrefix;
    
    if (!effectiveStringPrefix || effectiveStringPrefix.trim() === '') {
      setPrefixNode(null);
      setHasValidStringPrefix(false);
      return;
    }

    getDynamicIcon(effectiveStringPrefix).then((node) => {
      if (node) {
        setPrefixNode(node);
        setHasValidStringPrefix(true);
      } else {
        setPrefixNode(null);
        setHasValidStringPrefix(false);
      }
    });
  }, [final.stringPrefix]);

  // Handle stringSuffix - MATCH BUTTON'S PATTERN EXACTLY
  useEffect(() => {
    const effectiveStringSuffix = final.stringSuffix;
    
    if (!effectiveStringSuffix || effectiveStringSuffix.trim() === '') {
      setSuffixNode(null);
      setHasValidStringSuffix(false);
      return;
    }

    getDynamicIcon(effectiveStringSuffix).then((node) => {
      if (node) {
        setSuffixNode(node);
        setHasValidStringSuffix(true);
      } else {
        setSuffixNode(null);
        setHasValidStringSuffix(false);
      }
    });
  }, [final.stringSuffix]);

  const { variant: themeVariant } = useVariant();

  // Determine which prefix to show with proper priority - MATCH BUTTON'S PATTERN
  const showPrefix = React.useMemo(() => {
    // Priority order: startIcon (local) > prefix (local) > stringPrefix (dynamic)
    if (final.startIcon) return true;
    if (final.prefix) return true;
    if (hasValidStringPrefix && prefixNode) return true;
    return false;
  }, [final.startIcon, final.prefix, hasValidStringPrefix, prefixNode]);

  // Determine which suffix to show with proper priority - MATCH BUTTON'S PATTERN
  const showSuffix = React.useMemo(() => {
    // Priority order: endIcon (local) > suffix (local) > stringSuffix (dynamic)
    if (final.endIcon) return true;
    if (final.suffix) return true;
    if (hasValidStringSuffix && suffixNode) return true;
    return false;
  }, [final.endIcon, final.suffix, hasValidStringSuffix, suffixNode]);

  // Get effective icons following Button's priority pattern
  const effectivePrefix = React.useMemo(() => {
    // Priority: startIcon > prefix > stringPrefix
    if (final.startIcon) return final.startIcon;
    if (final.prefix) return final.prefix;
    if (hasValidStringPrefix) return prefixNode;
    return null;
  }, [final.startIcon, final.prefix, hasValidStringPrefix, prefixNode]);

  const effectiveSuffix = React.useMemo(() => {
    // Priority: endIcon > suffix > stringSuffix
    if (final.endIcon) return final.endIcon;
    if (final.suffix) return final.suffix;
    if (hasValidStringSuffix) return suffixNode;
    return null;
  }, [final.endIcon, final.suffix, hasValidStringSuffix, suffixNode]);

  const hasNoPrefix = !effectivePrefix;
  const hasNoLabel = !label;

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
    hasNoPrefix,
    hasNoLabel,
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
      value={textValue}
      rows={rows}
      {...rest}
    />
  );

  // Only use iconic wrapper when we have icons, matching Button's pattern
  const wrappedTextarea = showPrefix || showSuffix ? (
    <IconicInputWrapper
      startIcon={effectivePrefix}
      endIcon={effectiveSuffix}
      iconicBg={final.iconicBg}
      funcss={final.funcss}
      stringPrefix={stringPrefix}
      stringSuffix={stringSuffix}
    >
      {textareaElement}
    </IconicInputWrapper>
  ) : (
    textareaElement
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
  type,
  variant = '',
  ...props
}) => {
  const { mergeWithLocal } = useComponentConfiguration('Input', variant);
  
  const localProps = {
    ...props,
    startIcon,
    endIcon,
    prefix,
    suffix,
    iconicBg,
    stringPrefix,
    stringSuffix,
    type,
  };

  const { props: mergedProps } = mergeWithLocal(localProps);

  const inputProps = {
    ...props,
    ...mergedProps,
    variant,
    borderless: noBorder !== undefined ? noBorder : (props.borderless !== undefined ? props.borderless : mergedProps.borderless),
    type,
  };

  if (file || type === 'file') {
    return <FileUpload {...inputProps} />;
  }

  if (select) {
    return <SelectInput {...inputProps} />;
  }

  if (multiline) {
    return <TextareaInput {...inputProps} />;
  }

  return <TextInput {...inputProps} />;
};

export default Input;