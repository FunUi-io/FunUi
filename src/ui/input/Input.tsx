'use client';
import React, { useState, useEffect, useRef, ChangeEvent, FocusEvent, MouseEvent, KeyboardEvent, FormEvent } from 'react';
import { PiCheck, PiInfo, PiWarning, PiX, PiCheckCircle, PiEye, PiEyeSlash } from 'react-icons/pi';
import { useVariant } from '../theme/theme';
import { useComponentConfiguration } from '../../utils/componentUtils';
import { getDynamicIcon } from '../../utils/getDynamicIcon';

// Base types and interfaces
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
  
  // HTML Input Attributes
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
  
  // Custom styling and behavior props
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
  startIcon?: string | React.ReactNode; // Can be string (icon name) or ReactNode
  endIcon?: string | React.ReactNode;   // Can be string (icon name) or ReactNode
  prefix?: string | React.ReactNode;    // Alias for startIcon
  suffix?: string | React.ReactNode;    // Alias for endIcon
  stringPrefix?: string;                // String for dynamic icon (legacy support)
  stringSuffix?: string;                // String for dynamic icon (legacy support)
  iconicBg?: string;
  variant?: string;
  label?: string;
  helperText?: string;
}

interface SelectOption {
  value: string;
  text?: string;      // Support both text and label
  label?: string;     // Support both text and label
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

// Status icons mapping
const statusIcons = {
  success: <PiCheckCircle />,
  warning: <PiWarning />,
  danger: <PiX />,
  info: <PiInfo />
};

// Password toggle button component
const PasswordToggleButton: React.FC<{
  showPassword: boolean;
  onToggle: () => void;
  disabled?: boolean;
}> = ({ showPassword, onToggle, disabled }) => (
  <div
    onClick={!disabled ? onToggle : undefined}
    style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}
    aria-label={showPassword ? 'Hide password' : 'Show password'}
    className='pointer hover-text-primary'
  >
    {showPassword ? <PiEyeSlash /> : <PiEye />}
  </div>
);

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

// Function to get icon from string or ReactNode
const useIcon = (iconProp: string | React.ReactNode | undefined): React.ReactNode | null => {
  const [iconNode, setIconNode] = useState<React.ReactNode | null>(null);

  useEffect(() => {
    if (!iconProp) {
      setIconNode(null);
      return;
    }

    // If it's already a ReactNode, use it directly
    if (React.isValidElement(iconProp)) {
      setIconNode(iconProp);
      return;
    }

    // If it's a string, try to get dynamic icon
    if (typeof iconProp === 'string') {
      getDynamicIcon(iconProp).then((node) => {
        if (node) {
          setIconNode(node);
        } else {
          // If dynamic icon fails, show the string as text
          setIconNode(<span>{iconProp}</span>);
        }
      });
    }
  }, [iconProp]);

  return iconNode;
};

// Iconic Input Wrapper Component
const IconicInputWrapper: React.FC<{
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  iconicBg?: string;
  funcss?: string;
  children: React.ReactNode;
}> = ({ 
  startIcon, 
  endIcon,
  iconicBg, 
  funcss,
  children 
}) => {
  const showLeftIcon = !!startIcon;
  const showRightIcon = !!endIcon;

  if (!showLeftIcon && !showRightIcon) {
    return <>{children}</>;
  }

  return (
    <div className={`icon-container ${showLeftIcon ? 'has-left-icon' : ''} ${funcss || ''}`}>
      {/* LEFT ICON */}
      {showLeftIcon && (
        <div
          className="leftIcon"
          style={{
            backgroundColor: iconicBg || '',
            border: iconicBg ? `0.1rem ${iconicBg} solid` : '',
          }}
        >
          {startIcon}
        </div>
      )}
      
      {children}
      
      {/* RIGHT ICON */}
      {showRightIcon && (
        <div className="rightIcon" style={{ backgroundColor: iconicBg || '' }}>
          {endIcon}
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
  alwaysActiveLabel?: boolean;
  required?: boolean;
}> = ({ label, status, helperText, children, isFocused, hasValue, fullWidth, id, startIcon, alwaysActiveLabel = false, required = false }) => {
  const showFloatingLabel = label && (alwaysActiveLabel || isFocused || hasValue);

  return (
    <div className={`input-wrapper ${fullWidth ? 'full-width' : ''}`}>
      <div className="input-container-with-label">
        {label && (
          <label
            htmlFor={id}
            className={`floating-label ${startIcon ? "label-left" : ""}  ${showFloatingLabel ? 'active' : ''} ${status ? `label-${status}` : ''}`}
          >
            {label}
            {required && <span className="required-indicator">*</span>}
          </label>
        )}
        {children}
      </div>
      {(helperText) && (
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
export const TextInput: React.FC<TextInputProps> = ({
  id,
  name,
  value,
  defaultValue,
  onChange,
  onBlur,
  onFocus,
  onClick,
  onKeyDown,
  onKeyUp,
  onKeyPress,
  onSubmit,
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
  
  // HTML Input Attributes
  disabled = false,
  readOnly = false,
  required = false,
  autoFocus = false,
  autoComplete,
  pattern,
  minLength,
  maxLength,
  min,
  max,
  step,
  multiple,
  accept,
  size,
  form,
  formNoValidate,
  formTarget,
  list,
  autoCapitalize,
  autoCorrect,
  spellCheck,
  inputMode,
  dirname,
  
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState<string>(value !== undefined ? String(value) : defaultValue || '');
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const isDateTimeInput = ['date', 'time', 'month', 'week', 'datetime-local'].includes(type || '');
  const isPasswordType = type === 'password';

  useEffect(() => {
    if (value !== undefined) {
      setInputValue(String(value));
    }
  }, [value]);

  const { mergeWithLocal } = useComponentConfiguration('Input', variant);

  // Determine effective icons with priority: startIcon > prefix > stringPrefix
  const effectiveStartIcon = startIcon || prefix || stringPrefix;
  
  // Determine effective icons with priority: endIcon > suffix > stringSuffix
  const effectiveEndIcon = endIcon || suffix || stringSuffix;

  // Convert string icons to ReactNode
  const startIconNode = useIcon(effectiveStartIcon);
  const endIconNode = useIcon(effectiveEndIcon);

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
    startIcon: startIconNode,
    endIcon: endIconNode,
    iconicBg,
    label,
    helperText,
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
    startIcon: startIconNode !== undefined ? startIconNode : mergedProps.startIcon,
    endIcon: endIconNode !== undefined ? endIconNode : mergedProps.endIcon,
    iconicBg: iconicBg !== undefined ? iconicBg : mergedProps.iconicBg,
  };

  // For password fields, show toggle button if no endIcon/suffix/stringSuffix is provided
  const passwordToggleIcon = isPasswordType && !effectiveEndIcon ? (
    <PasswordToggleButton
      showPassword={showPassword}
      onToggle={() => setShowPassword(!showPassword)}
      disabled={disabled}
    />
  ) : null;

  const effectiveEndIconWithPassword = passwordToggleIcon || final.endIcon;

  const showPrefix = !!final.startIcon;
  const showSuffix = !!effectiveEndIconWithPassword;

  const hasNoPrefix = !showPrefix;
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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    if (onChange) onChange(e);
  };

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    if (onFocus) onFocus(e);
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    if (onBlur) onBlur(e);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (onKeyDown) onKeyDown(e);
  };

  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    if (onKeyUp) onKeyUp(e);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (onKeyPress) onKeyPress(e);
  };

  const showPlaceholder = placeholder && label && (isFocused || !!inputValue);
  const inputType = isPasswordType ? (showPassword ? 'text' : 'password') : type;

  const inputElement = (
    <input
      ref={inputRef}
      id={id}
      name={name}
      className={className}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      onKeyPress={handleKeyPress}
      onSubmit={onSubmit}
      defaultValue={defaultValue}
      type={inputType}
      placeholder={showPlaceholder ? placeholder : (!label ? placeholder : '')}
      style={style}
      value={inputValue}
      
      // HTML Input Attributes
      disabled={disabled}
      readOnly={readOnly}
      required={required}
      autoFocus={autoFocus}
      autoComplete={autoComplete}
      pattern={pattern}
      minLength={minLength}
      maxLength={maxLength}
      min={min}
      max={max}
      step={step}
      multiple={multiple}
      accept={accept}
      size={size}
      form={form}
      formNoValidate={formNoValidate}
      formTarget={formTarget}
      list={list}
      autoCapitalize={autoCapitalize}
      autoCorrect={autoCorrect}
      spellCheck={spellCheck}
      inputMode={inputMode}
      
      {...rest}
    />
  );

  // Only use iconic wrapper when we have icons
  const wrappedInput = showPrefix || showSuffix ? (
    <IconicInputWrapper
      startIcon={final.startIcon}
      endIcon={effectiveEndIconWithPassword}
      iconicBg={final.iconicBg}
      funcss={final.funcss}
    >
      {inputElement}
    </IconicInputWrapper>
  ) : (
    inputElement
  );

  return (
    <InputContainer
      startIcon={final.startIcon}
      label={label}
      status={final.status}
      helperText={helperText}
      isFocused={isFocused}
      hasValue={!!inputValue}
      fullWidth={final.fullWidth}
      id={id}
      alwaysActiveLabel={isDateTimeInput}
      required={required}
    >
      {wrappedInput}
    </InputContainer>
  );
};

// Select Component
export const SelectInput: React.FC<SelectProps> = ({
  id,
  name,
  value,
  defaultValue,
  onChange,
  onBlur,
  onFocus,
  onClick,
  onKeyDown,
  onKeyUp,
  onKeyPress,
  onSubmit,
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
  placeholder,
  
  // HTML Select Attributes
  disabled = false,
  required = false,
  autoFocus = false,
  form,
  formNoValidate,
  formTarget,
  size,
  multiple,
  autoComplete,
  
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [selectValue, setSelectValue] = useState<string>(value !== undefined ? String(value) : defaultValue || '');
  const selectRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    if (value !== undefined) {
      setSelectValue(String(value));
    }
  }, [value]);

  const { mergeWithLocal } = useComponentConfiguration('Input', variant);

  // Determine effective icons with priority: startIcon > prefix > stringPrefix
  const effectiveStartIcon = startIcon || prefix || stringPrefix;
  
  // Determine effective icons with priority: endIcon > suffix > stringSuffix
  const effectiveEndIcon = endIcon || suffix || stringSuffix;

  // Convert string icons to ReactNode
  const startIconNode = useIcon(effectiveStartIcon);
  const endIconNode = useIcon(effectiveEndIcon);

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
    startIcon: startIconNode,
    endIcon: endIconNode,
    iconicBg,
    label,
    helperText,
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
    startIcon: startIconNode !== undefined ? startIconNode : mergedProps.startIcon,
    endIcon: endIconNode !== undefined ? endIconNode : mergedProps.endIcon,
    iconicBg: iconicBg !== undefined ? iconicBg : mergedProps.iconicBg,
  };

  // Process options to handle both text and label properties
  const processedOptions = React.useMemo(() => {
    // Add "No Option" as first option if options array exists and has items
    const optionsWithDefault = [];
    
    // Check if options array exists and has items
    if (options && options.length > 0) {
      // Add default "No Option" with empty value
      optionsWithDefault.push({ value: '', text: 'No Option' });
      
      // Map existing options to use either text or label
      options.forEach(option => {
        optionsWithDefault.push({
          value: option.value,
          text: option.text !== undefined ? option.text : (option.label || option.value)
        });
      });
    }
    
    return optionsWithDefault;
  }, [options]);

  const selectHasValue = !!selectValue;
  
  const showPrefix = !!final.startIcon;
  const showSuffix = !!final.endIcon;

  const hasNoPrefix = !showPrefix;
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

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;
    setSelectValue(newValue);
    if (onChange) onChange(e);
  };

  const handleFocus = (e: FocusEvent<HTMLSelectElement>) => {
    setIsFocused(true);
    if (onFocus) onFocus(e);
  };

  const handleBlur = (e: FocusEvent<HTMLSelectElement>) => {
    setIsFocused(false);
    if (onBlur) onBlur(e);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLSelectElement>) => {
    if (onKeyDown) onKeyDown(e);
    
    // Handle Tab key when input is empty
    if (e.key === 'Tab' && !e.shiftKey && selectRef.current && !selectValue && placeholder) {
      e.preventDefault();
      setSelectValue(placeholder);
      // Trigger change event
      if (onChange) {
        const event = {
          target: { value: placeholder }
        } as ChangeEvent<HTMLSelectElement>;
        onChange(event);
      }
    }
  };

  // Extract only valid HTML select attributes for the select element
  const selectAttributes: React.SelectHTMLAttributes<HTMLSelectElement> = {
    id,
    name,
    className,
    onChange: handleChange,
    onFocus: handleFocus,
    onBlur: handleBlur,
    onClick: onClick as any,
    onKeyDown: handleKeyDown,
    onKeyUp: onKeyUp as any,
    onKeyPress: onKeyPress as any,
    onSubmit: onSubmit as any,
    defaultValue,
    value: selectValue,
    style,
    disabled,
    required,
    autoFocus,
    form,
    size,
    multiple,
    autoComplete,
    ...rest,
  };

  const selectElement = (
    <select ref={selectRef} {...selectAttributes}>
      {processedOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.text}
        </option>
      ))}
    </select>
  );

  // Only use iconic wrapper when we have icons
  const wrappedSelect = showPrefix || showSuffix ? (
    <IconicInputWrapper
      startIcon={final.startIcon}
      endIcon={final.endIcon}
      iconicBg={final.iconicBg}
      funcss={final.funcss}
    >
      {selectElement}
    </IconicInputWrapper>
  ) : (
    selectElement
  );

  return (
    <InputContainer
      startIcon={final.startIcon}
      label={label}
      status={final.status}
      helperText={helperText}
      isFocused={isFocused}
      hasValue={selectHasValue}
      fullWidth={final.fullWidth}
      id={id}
      alwaysActiveLabel={true}
      required={required}
    >
      {wrappedSelect}
    </InputContainer>
  );
};

// Textarea Component
export const TextareaInput: React.FC<TextareaProps> = ({
  id,
  name,
  value,
  defaultValue,
  onChange,
  onBlur,
  onFocus,
  onClick,
  onKeyDown,
  onKeyUp,
  onKeyPress,
  onSubmit,
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
  cols,
  wrap,
  variant = '',
  placeholder,
  
  // HTML Textarea Attributes
  disabled = false,
  readOnly = false,
  required = false,
  autoFocus = false,
  autoComplete,
  minLength,
  maxLength,
  form,
  formNoValidate,
  formTarget,
  dirname,
  autoCapitalize,
  autoCorrect,
  spellCheck,
  inputMode,
  
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [textValue, setTextValue] = useState<string>(value !== undefined ? String(value) : defaultValue || '');

  useEffect(() => {
    if (value !== undefined) {
      setTextValue(String(value));
    }
  }, [value]);

  const { mergeWithLocal } = useComponentConfiguration('Input', variant);

  // Determine effective icons with priority: startIcon > prefix > stringPrefix
  const effectiveStartIcon = startIcon || prefix || stringPrefix;
  
  // Determine effective icons with priority: endIcon > suffix > stringSuffix
  const effectiveEndIcon = endIcon || suffix || stringSuffix;

  // Convert string icons to ReactNode
  const startIconNode = useIcon(effectiveStartIcon);
  const endIconNode = useIcon(effectiveEndIcon);

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
    startIcon: startIconNode,
    endIcon: endIconNode,
    iconicBg,
    label,
    helperText,
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
    startIcon: startIconNode !== undefined ? startIconNode : mergedProps.startIcon,
    endIcon: endIconNode !== undefined ? endIconNode : mergedProps.endIcon,
    iconicBg: iconicBg !== undefined ? iconicBg : mergedProps.iconicBg,
  };

  const showPrefix = !!final.startIcon;
  const showSuffix = !!final.endIcon;

  const hasNoPrefix = !showPrefix;
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

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setTextValue(newValue);
    if (onChange) onChange(e);
  };

  const handleFocus = (e: FocusEvent<HTMLTextAreaElement>) => {
    setIsFocused(true);
    if (onFocus) onFocus(e);
  };

  const handleBlur = (e: FocusEvent<HTMLTextAreaElement>) => {
    setIsFocused(false);
    if (onBlur) onBlur(e);
  };

  const showPlaceholder = placeholder && label && (isFocused || !!textValue);

  // Extract only valid HTML textarea attributes
  const textareaAttributes: React.TextareaHTMLAttributes<HTMLTextAreaElement> = {
    id,
    name,
    className,
    onChange: handleChange,
    onFocus: handleFocus,
    onBlur: handleBlur,
    onClick: onClick as any,
    onKeyDown: onKeyDown as any,
    onKeyUp: onKeyUp as any,
    onKeyPress: onKeyPress as any,
    onSubmit: onSubmit as any,
    defaultValue,
    placeholder: showPlaceholder ? placeholder : (!label ? placeholder : ''),
    style,
    value: textValue,
    rows,
    cols,
    wrap,
    disabled,
    readOnly,
    required,
    autoFocus,
    autoComplete,
    minLength,
    maxLength,
    form,
    autoCapitalize,
    autoCorrect,
    spellCheck,
    inputMode,
    ...rest,
  };

  const textareaElement = <textarea {...textareaAttributes} />;

  // Only use iconic wrapper when we have icons
  const wrappedTextarea = showPrefix || showSuffix ? (
    <IconicInputWrapper
      startIcon={final.startIcon}
      endIcon={final.endIcon}
      iconicBg={final.iconicBg}
      funcss={final.funcss}
    >
      {textareaElement}
    </IconicInputWrapper>
  ) : (
    textareaElement
  );

  return (
    <InputContainer
      startIcon={final.startIcon}
      label={label}
      status={final.status}
      helperText={helperText}
      isFocused={isFocused}
      hasValue={!!textValue}
      fullWidth={final.fullWidth}
      id={id}
      required={required}
    >
      {wrappedTextarea}
    </InputContainer>
  );
};

// Main Input Component
interface InputProps extends BaseInputProps {
  select?: boolean;
  multiline?: boolean;
  noBorder?: boolean;
  type?: string;
  options?: SelectOption[];
  rows?: number;
}

const Input: React.FC<InputProps> = ({
  select,
  multiline,
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
  
  // Determine effective icons with priority:
  // For start: startIcon > prefix > stringPrefix
  // For end: endIcon > suffix > stringSuffix
  const effectiveStartIcon = startIcon || prefix || stringPrefix;
  const effectiveEndIcon = endIcon || suffix || stringSuffix;

  // Create local props object including all input props
  const localProps = {
    ...props,
    startIcon: effectiveStartIcon,
    endIcon: effectiveEndIcon,
    iconicBg,
    type,
    // Ensure all event handlers are passed through
    onChange: props.onChange,
    onBlur: props.onBlur,
    onFocus: props.onFocus,
    onClick: props.onClick,
    onKeyDown: props.onKeyDown,
    onKeyUp: props.onKeyUp,
    onKeyPress: props.onKeyPress,
    onSubmit: props.onSubmit,
  };

  const { props: mergedProps } = mergeWithLocal(localProps);

  // Build the final props object
  const inputProps = {
    // First spread the merged props (which include theme configuration)
    ...mergedProps,
    // Then spread all component-specific props to ensure they override theme
    startIcon: effectiveStartIcon,
    endIcon: effectiveEndIcon,
    stringPrefix,
    stringSuffix,
    iconicBg,
    ...props,
    borderless: noBorder !== undefined ? noBorder : (props.borderless !== undefined ? props.borderless : mergedProps.borderless),
    type,
    variant,
  };

  const finalInputProps = {
    ...inputProps,
    onChange: props.onChange || inputProps.onChange,
    onBlur: props.onBlur || inputProps.onBlur,
    onFocus: props.onFocus || inputProps.onFocus,
  };

  if (select) {
    return <SelectInput {...finalInputProps} />;
  }

  if (multiline) {
    return <TextareaInput {...finalInputProps} />;
  }

  return <TextInput {...finalInputProps} />;
};

export default Input;
// 'use client';
// import React, { useState, useEffect, useRef, ChangeEvent, FocusEvent, MouseEvent, KeyboardEvent, FormEvent } from 'react';
// import { PiCheck, PiInfo, PiWarning, PiX, PiCheckCircle, PiEye, PiEyeSlash } from 'react-icons/pi';
// import { useVariant } from '../theme/theme';
// import { useComponentConfiguration } from '../../utils/componentUtils';
// import { getDynamicIcon } from '../../utils/getDynamicIcon';

// // Base types and interfaces
// interface BaseInputProps {
//   id?: string;
//   name?: string;
//   value?: any;
//   defaultValue?: string;
//   onChange?: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
//   onBlur?: (event: FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
//   onFocus?: (event: FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
//   onClick?: (event: MouseEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
//   onKeyDown?: (event: KeyboardEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
//   onKeyUp?: (event: KeyboardEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
//   onKeyPress?: (event: KeyboardEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
//   onSubmit?: (event: FormEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  
//   // HTML Input Attributes
//   type?: string;
//   placeholder?: string;
//   disabled?: boolean;
//   readOnly?: boolean;
//   required?: boolean;
//   autoFocus?: boolean;
//   autoComplete?: string;
//   pattern?: string;
//   minLength?: number;
//   maxLength?: number;
//   min?: string | number;
//   max?: string | number;
//   step?: string | number;
//   multiple?: boolean;
//   accept?: string;
//   size?: number;
//   form?: string;
//   formNoValidate?: boolean;
//   formTarget?: string;
//   list?: string;
//   autoCapitalize?: 'on' | 'off' | 'none' | 'sentences' | 'words' | 'characters';
//   autoCorrect?: 'on' | 'off';
//   spellCheck?: boolean | 'true' | 'false';
//   inputMode?: 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url';
//   dirname?: string;
  
//   // Custom styling and behavior props
//   status?: 'success' | 'warning' | 'danger' | 'info';
//   funcss?: string;
//   bg?: string;
//   fullWidth?: boolean;
//   flat?: boolean;
//   bordered?: boolean;
//   borderless?: boolean;
//   rounded?: boolean;
//   leftRounded?: boolean;
//   rightRounded?: boolean;
//   startIcon?: string | React.ReactNode; // Can be string (icon name) or ReactNode
//   endIcon?: string | React.ReactNode;   // Can be string (icon name) or ReactNode
//   prefix?: string | React.ReactNode;    // Alias for startIcon
//   suffix?: string | React.ReactNode;    // Alias for endIcon
//   stringPrefix?: string;                // String for dynamic icon (legacy support)
//   stringSuffix?: string;                // String for dynamic icon (legacy support)
//   iconicBg?: string;
//   variant?: string;
//   label?: string;
//   helperText?: string;
// }

// interface SelectOption {
//   value: string;
//   text: string;
// }

// interface TextInputProps extends BaseInputProps {
//   type?: string;
// }

// interface SelectProps extends BaseInputProps {
//   options?: SelectOption[];
// }

// interface TextareaProps extends BaseInputProps {
//   rows?: number;
//   cols?: number;
//   wrap?: 'hard' | 'soft' | 'off';
// }

// // Status icons mapping
// const statusIcons = {
//   success: <PiCheckCircle />,
//   warning: <PiWarning />,
//   danger: <PiX />,
//   info: <PiInfo />
// };

// // Password toggle button component
// const PasswordToggleButton: React.FC<{
//   showPassword: boolean;
//   onToggle: () => void;
//   disabled?: boolean;
// }> = ({ showPassword, onToggle, disabled }) => (
//   <div
//     onClick={!disabled ? onToggle : undefined}
//     style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}
//     aria-label={showPassword ? 'Hide password' : 'Show password'}
//     className='pointer hover-text-primary'
//   >
//     {showPassword ? <PiEyeSlash /> : <PiEye />}
//   </div>
// );

// // Utility function to generate CSS classes
// const generateInputClasses = ({
//   status,
//   rounded,
//   bg,
//   funcss,
//   flat,
//   leftRounded,
//   rightRounded,
//   bordered,
//   borderless,
//   additionalClasses = '',
//   hasNoPrefix = false,
//   hasNoLabel = false
// }: {
//   status?: string;
//   rounded?: boolean;
//   bg?: string;
//   funcss?: string;
//   flat?: boolean;
//   leftRounded?: boolean;
//   rightRounded?: boolean;
//   bordered?: boolean;
//   borderless?: boolean;
//   additionalClasses?: string;
//   hasNoPrefix?: boolean;
//   hasNoLabel?: boolean;
// }) => {
//   const statusClass = status ? `${status}-input` : '';
//   const roundedClass = rounded ? 'rounded' : '';
//   const bgClass = bg || '';
//   const flatClass = flat ? 'flat' : '';
//   const cornerClass = leftRounded ? 'leftRounded' : rightRounded ? 'rightRounded' : '';
//   const borderClass = bordered ? 'borderedInput' : borderless ? 'borderless' : (!bordered && !borderless ? 'borderedInput' : '');
//   const noPrefixClass = hasNoPrefix ? 'no_prefix' : '';
//   const noLabelClass = hasNoLabel ? 'no_label' : '';

//   return `
//     ${statusClass}
//     ${roundedClass}
//     ${bgClass}
//     ${funcss || ''}
//     ${flatClass}
//     ${cornerClass}
//     ${borderClass}
//     ${additionalClasses}
//     ${noPrefixClass}
//     ${noLabelClass}
//     input
//   `.trim().replace(/\s+/g, ' ');
// };

// // Function to get icon from string or ReactNode
// const useIcon = (iconProp: string | React.ReactNode | undefined): React.ReactNode | null => {
//   const [iconNode, setIconNode] = useState<React.ReactNode | null>(null);

//   useEffect(() => {
//     if (!iconProp) {
//       setIconNode(null);
//       return;
//     }

//     // If it's already a ReactNode, use it directly
//     if (React.isValidElement(iconProp)) {
//       setIconNode(iconProp);
//       return;
//     }

//     // If it's a string, try to get dynamic icon
//     if (typeof iconProp === 'string') {
//       getDynamicIcon(iconProp).then((node) => {
//         if (node) {
//           setIconNode(node);
//         } else {
//           // If dynamic icon fails, show the string as text
//           setIconNode(<span>{iconProp}</span>);
//         }
//       });
//     }
//   }, [iconProp]);

//   return iconNode;
// };

// // Iconic Input Wrapper Component
// const IconicInputWrapper: React.FC<{
//   startIcon?: React.ReactNode;
//   endIcon?: React.ReactNode;
//   iconicBg?: string;
//   funcss?: string;
//   children: React.ReactNode;
// }> = ({ 
//   startIcon, 
//   endIcon,
//   iconicBg, 
//   funcss,
//   children 
// }) => {
//   const showLeftIcon = !!startIcon;
//   const showRightIcon = !!endIcon;

//   if (!showLeftIcon && !showRightIcon) {
//     return <>{children}</>;
//   }

//   return (
//     <div className={`icon-container ${showLeftIcon ? 'has-left-icon' : ''} ${funcss || ''}`}>
//       {/* LEFT ICON */}
//       {showLeftIcon && (
//         <div
//           className="leftIcon"
//           style={{
//             backgroundColor: iconicBg || '',
//             border: iconicBg ? `0.1rem ${iconicBg} solid` : '',
//           }}
//         >
//           {startIcon}
//         </div>
//       )}
      
//       {children}
      
//       {/* RIGHT ICON */}
//       {showRightIcon && (
//         <div className="rightIcon" style={{ backgroundColor: iconicBg || '' }}>
//           {endIcon}
//         </div>
//       )}
//     </div>
//   );
// };

// // Input Container with Floating Label
// const InputContainer: React.FC<{
//   label?: string;
//   status?: string;
//   helperText?: string;
//   children: React.ReactNode;
//   isFocused: boolean;
//   hasValue: boolean;
//   fullWidth?: boolean;
//   id?: string;
//   startIcon?: React.ReactNode;
//   alwaysActiveLabel?: boolean;
//   required?: boolean;
// }> = ({ label, status, helperText, children, isFocused, hasValue, fullWidth, id, startIcon, alwaysActiveLabel = false, required = false }) => {
//   const showFloatingLabel = label && (alwaysActiveLabel || isFocused || hasValue);

//   return (
//     <div className={`input-wrapper ${fullWidth ? 'full-width' : ''}`}>
//       <div className="input-container-with-label">
//         {label && (
//           <label
//             htmlFor={id}
//             className={`floating-label ${startIcon ? "label-left" : ""}  ${showFloatingLabel ? 'active' : ''} ${status ? `label-${status}` : ''}`}
//           >
//             {label}
//             {required && <span className="required-indicator">*</span>}
//           </label>
//         )}
//         {children}
//       </div>
//       {(helperText) && (
//         <div className={`input-helper-text ${status ? `helper-${status}` : ''}`}>
//           {status && statusIcons[status as keyof typeof statusIcons] && (
//             <span className="helper-icon">{statusIcons[status as keyof typeof statusIcons]}</span>
//           )}
//           <span>{helperText}</span>
//         </div>
//       )}
//     </div>
//   );
// };

// // Text Input Component - FIXED for space key issue
// export const TextInput: React.FC<TextInputProps> = ({
//   id,
//   name,
//   value,
//   defaultValue,
//   onChange,
//   onBlur,
//   onFocus,
//   onClick,
//   onKeyDown,
//   onKeyUp,
//   onKeyPress,
//   onSubmit,
//   status,
//   funcss,
//   bg,
//   fullWidth = true,
//   flat,
//   bordered,
//   borderless,
//   rounded,
//   leftRounded,
//   rightRounded,
//   startIcon,
//   endIcon,
//   prefix,
//   suffix,
//   stringPrefix,
//   stringSuffix,
//   iconicBg,
//   type = 'text',
//   label,
//   helperText,
//   variant = '',
//   placeholder,
  
//   // HTML Input Attributes
//   disabled = false,
//   readOnly = false,
//   required = false,
//   autoFocus = false,
//   autoComplete,
//   pattern,
//   minLength,
//   maxLength,
//   min,
//   max,
//   step,
//   multiple,
//   accept,
//   size,
//   form,
//   formNoValidate,
//   formTarget,
//   list,
//   autoCapitalize,
//   autoCorrect,
//   spellCheck,
//   inputMode,
//   dirname,
  
//   ...rest
// }) => {
//   const [isFocused, setIsFocused] = useState(false);
//   const [inputValue, setInputValue] = useState<string>(value !== undefined ? String(value) : defaultValue || '');
//   const [showPassword, setShowPassword] = useState(false);
//   const inputRef = useRef<HTMLInputElement>(null);

//   const isDateTimeInput = ['date', 'time', 'month', 'week', 'datetime-local'].includes(type || '');
//   const isPasswordType = type === 'password';

//   useEffect(() => {
//     if (value !== undefined) {
//       // CRITICAL: Preserve all characters including spaces
//       setInputValue(String(value));
//     }
//   }, [value]);

//   const { mergeWithLocal } = useComponentConfiguration('Input', variant);

//   // Determine effective icons with priority: startIcon > prefix > stringPrefix
//   const effectiveStartIcon = startIcon || prefix || stringPrefix;
  
//   // Determine effective icons with priority: endIcon > suffix > stringSuffix
//   const effectiveEndIcon = endIcon || suffix || stringSuffix;

//   // Convert string icons to ReactNode
//   const startIconNode = useIcon(effectiveStartIcon);
//   const endIconNode = useIcon(effectiveEndIcon);

//   const localProps = {
//     status,
//     funcss,
//     bg,
//     fullWidth,
//     flat,
//     bordered,
//     borderless,
//     rounded,
//     leftRounded,
//     rightRounded,
//     startIcon: startIconNode,
//     endIcon: endIconNode,
//     iconicBg,
//     label,
//     helperText,
//   };

//   const { props: mergedProps } = mergeWithLocal(localProps);

//   const final = {
//     status: status !== undefined ? status : mergedProps.status,
//     funcss: funcss !== undefined ? funcss : mergedProps.funcss,
//     bg: bg !== undefined ? bg : mergedProps.bg,
//     fullWidth: fullWidth !== undefined ? fullWidth : mergedProps.fullWidth,
//     flat: flat !== undefined ? flat : mergedProps.flat,
//     bordered: bordered !== undefined ? bordered : mergedProps.bordered,
//     borderless: borderless !== undefined ? borderless : mergedProps.borderless,
//     rounded: rounded !== undefined ? rounded : mergedProps.rounded,
//     leftRounded: leftRounded !== undefined ? leftRounded : mergedProps.leftRounded,
//     rightRounded: rightRounded !== undefined ? rightRounded : mergedProps.rightRounded,
//     startIcon: startIconNode !== undefined ? startIconNode : mergedProps.startIcon,
//     endIcon: endIconNode !== undefined ? endIconNode : mergedProps.endIcon,
//     iconicBg: iconicBg !== undefined ? iconicBg : mergedProps.iconicBg,
//   };

//   // For password fields, show toggle button if no endIcon/suffix/stringSuffix is provided
//   const passwordToggleIcon = isPasswordType && !effectiveEndIcon ? (
//     <PasswordToggleButton
//       showPassword={showPassword}
//       onToggle={() => setShowPassword(!showPassword)}
//       disabled={disabled}
//     />
//   ) : null;

//   const effectiveEndIconWithPassword = passwordToggleIcon || final.endIcon;

//   const showPrefix = !!final.startIcon;
//   const showSuffix = !!effectiveEndIconWithPassword;

//   const hasNoPrefix = !showPrefix;
//   const hasNoLabel = !label;

//   const className = generateInputClasses({
//     status: final.status,
//     rounded: final.rounded,
//     bg: final.bg,
//     funcss: final.funcss,
//     flat: final.flat,
//     leftRounded: final.leftRounded,
//     rightRounded: final.rightRounded,
//     bordered: final.bordered,
//     borderless: final.borderless,
//     hasNoPrefix,
//     hasNoLabel,
//   });

//   const style = final.fullWidth ? { width: '100%' } : undefined;

//   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const newValue = e.target.value;
//     setInputValue(newValue);
//     if (onChange) onChange(e);
//   };

//   const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
//     setIsFocused(true);
//     if (onFocus) onFocus(e);
//   };

//   const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
//     setIsFocused(false);
//     if (onBlur) onBlur(e);
//   };

//   // FIXED: Handle key events properly
//   const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
//     // DO NOT prevent default for space key
//     if (onKeyDown) onKeyDown(e);
//   };

//   const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
//     if (onKeyUp) onKeyUp(e);
//   };

//   const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
//     // CRITICAL: DO NOT prevent default for any keys
//     // This allows space key to work
//     if (onKeyPress) onKeyPress(e);
//   };

//   const showPlaceholder = placeholder && label && (isFocused || !!inputValue);
//   const inputType = isPasswordType ? (showPassword ? 'text' : 'password') : type;

//   const inputElement = (
//     <input
//       ref={inputRef}
//       id={id}
//       name={name}
//       className={className}
//       onChange={handleChange}
//       onFocus={handleFocus}
//       onBlur={handleBlur}
//       onClick={onClick}
//       onKeyDown={handleKeyDown}
//       onKeyUp={handleKeyUp}
//       onKeyPress={handleKeyPress}
//       onSubmit={onSubmit}
//       defaultValue={defaultValue}
//       type={inputType}
//       placeholder={showPlaceholder ? placeholder : (!label ? placeholder : '')}
//       style={style}
//       value={inputValue}
      
//       // HTML Input Attributes
//       disabled={disabled}
//       readOnly={readOnly}
//       required={required}
//       autoFocus={autoFocus}
//       autoComplete={autoComplete}
//       pattern={pattern}
//       minLength={minLength}
//       maxLength={maxLength}
//       min={min}
//       max={max}
//       step={step}
//       multiple={multiple}
//       accept={accept}
//       size={size}
//       form={form}
//       formNoValidate={formNoValidate}
//       formTarget={formTarget}
//       list={list}
//       autoCapitalize={autoCapitalize}
//       autoCorrect={autoCorrect}
//       spellCheck={spellCheck}
//       inputMode={inputMode}
      
//       {...rest}
//     />
//   );

//   // Only use iconic wrapper when we have icons
//   const wrappedInput = showPrefix || showSuffix ? (
//     <IconicInputWrapper
//       startIcon={final.startIcon}
//       endIcon={effectiveEndIconWithPassword}
//       iconicBg={final.iconicBg}
//       funcss={final.funcss}
//     >
//       {inputElement}
//     </IconicInputWrapper>
//   ) : (
//     inputElement
//   );

//   return (
//     <InputContainer
//       startIcon={final.startIcon}
//       label={label}
//       status={final.status}
//       helperText={helperText}
//       isFocused={isFocused}
//       hasValue={!!inputValue}
//       fullWidth={final.fullWidth}
//       id={id}
//       alwaysActiveLabel={isDateTimeInput}
//       required={required}
//     >
//       {wrappedInput}
//     </InputContainer>
//   );
// };

// // Select Component
// export const SelectInput: React.FC<SelectProps> = ({
//   id,
//   name,
//   value,
//   defaultValue,
//   onChange,
//   onBlur,
//   onFocus,
//   onClick,
//   onKeyDown,
//   onKeyUp,
//   onKeyPress,
//   onSubmit,
//   status,
//   funcss,
//   bg,
//   fullWidth,
//   flat,
//   bordered,
//   borderless,
//   rounded,
//   leftRounded,
//   rightRounded,
//   startIcon,
//   endIcon,
//   prefix,
//   suffix,
//   stringPrefix,
//   stringSuffix,
//   iconicBg,
//   options = [],
//   label,
//   helperText,
//   variant = '',
  
//   // HTML Select Attributes
//   disabled = false,
//   required = false,
//   autoFocus = false,
//   form,
//   formNoValidate,
//   formTarget,
//   size,
//   multiple,
//   autoComplete,
  
//   ...rest
// }) => {
//   const [isFocused, setIsFocused] = useState(false);
//   const [selectValue, setSelectValue] = useState<string>(value !== undefined ? String(value) : defaultValue || '');

//   useEffect(() => {
//     if (value !== undefined) {
//       setSelectValue(String(value));
//     }
//   }, [value]);

//   const { mergeWithLocal } = useComponentConfiguration('Input', variant);

//   // Determine effective icons with priority: startIcon > prefix > stringPrefix
//   const effectiveStartIcon = startIcon || prefix || stringPrefix;
  
//   // Determine effective icons with priority: endIcon > suffix > stringSuffix
//   const effectiveEndIcon = endIcon || suffix || stringSuffix;

//   // Convert string icons to ReactNode
//   const startIconNode = useIcon(effectiveStartIcon);
//   const endIconNode = useIcon(effectiveEndIcon);

//   const localProps = {
//     status,
//     funcss,
//     bg,
//     fullWidth,
//     flat,
//     bordered,
//     borderless,
//     rounded,
//     leftRounded,
//     rightRounded,
//     startIcon: startIconNode,
//     endIcon: endIconNode,
//     iconicBg,
//     label,
//     helperText,
//   };

//   const { props: mergedProps } = mergeWithLocal(localProps);

//   const final = {
//     status: status !== undefined ? status : mergedProps.status,
//     funcss: funcss !== undefined ? funcss : mergedProps.funcss,
//     bg: bg !== undefined ? bg : mergedProps.bg,
//     fullWidth: fullWidth !== undefined ? fullWidth : mergedProps.fullWidth,
//     flat: flat !== undefined ? flat : mergedProps.flat,
//     bordered: bordered !== undefined ? bordered : mergedProps.bordered,
//     borderless: borderless !== undefined ? borderless : mergedProps.borderless,
//     rounded: rounded !== undefined ? rounded : mergedProps.rounded,
//     leftRounded: leftRounded !== undefined ? leftRounded : mergedProps.leftRounded,
//     rightRounded: rightRounded !== undefined ? rightRounded : mergedProps.rightRounded,
//     startIcon: startIconNode !== undefined ? startIconNode : mergedProps.startIcon,
//     endIcon: endIconNode !== undefined ? endIconNode : mergedProps.endIcon,
//     iconicBg: iconicBg !== undefined ? iconicBg : mergedProps.iconicBg,
//   };

//   const selectHasValue = !!selectValue;
  
//   const showPrefix = !!final.startIcon;
//   const showSuffix = !!final.endIcon;

//   const hasNoPrefix = !showPrefix;
//   const hasNoLabel = !label;

//   const className = generateInputClasses({
//     status: final.status,
//     rounded: final.rounded,
//     bg: final.bg,
//     funcss: final.funcss,
//     flat: final.flat,
//     leftRounded: final.leftRounded,
//     rightRounded: final.rightRounded,
//     bordered: final.bordered,
//     borderless: final.borderless,
//     hasNoPrefix,
//     hasNoLabel,
//   });

//   const style = final.fullWidth ? { width: '100%' } : undefined;

//   const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
//     const newValue = e.target.value;
//     setSelectValue(newValue);
//     if (onChange) onChange(e);
//   };

//   const handleFocus = (e: FocusEvent<HTMLSelectElement>) => {
//     setIsFocused(true);
//     if (onFocus) onFocus(e);
//   };

//   const handleBlur = (e: FocusEvent<HTMLSelectElement>) => {
//     setIsFocused(false);
//     if (onBlur) onBlur(e);
//   };

//   // Extract only valid HTML select attributes for the select element
//   const selectAttributes: React.SelectHTMLAttributes<HTMLSelectElement> = {
//     id,
//     name,
//     className,
//     onChange: handleChange,
//     onFocus: handleFocus,
//     onBlur: handleBlur,
//     onClick: onClick as any,
//     onKeyDown: onKeyDown as any,
//     onKeyUp: onKeyUp as any,
//     onKeyPress: onKeyPress as any,
//     onSubmit: onSubmit as any,
//     defaultValue,
//     value: selectValue,
//     style,
//     disabled,
//     required,
//     autoFocus,
//     form,
//     size,
//     multiple,
//     autoComplete,
//     ...rest,
//   };

//   const selectElement = (
//     <select {...selectAttributes}>
//       {options.map((option) => (
//         <option key={option.value} value={option.value}>
//           {option.text}
//         </option>
//       ))}
//     </select>
//   );

//   // Only use iconic wrapper when we have icons
//   const wrappedSelect = showPrefix || showSuffix ? (
//     <IconicInputWrapper
//       startIcon={final.startIcon}
//       endIcon={final.endIcon}
//       iconicBg={final.iconicBg}
//       funcss={final.funcss}
//     >
//       {selectElement}
//     </IconicInputWrapper>
//   ) : (
//     selectElement
//   );

//   return (
//     <InputContainer
//       startIcon={final.startIcon}
//       label={label}
//       status={final.status}
//       helperText={helperText}
//       isFocused={isFocused}
//       hasValue={selectHasValue}
//       fullWidth={final.fullWidth}
//       id={id}
//       alwaysActiveLabel={true}
//       required={required}
//     >
//       {wrappedSelect}
//     </InputContainer>
//   );
// };

// // Textarea Component
// export const TextareaInput: React.FC<TextareaProps> = ({
//   id,
//   name,
//   value,
//   defaultValue,
//   onChange,
//   onBlur,
//   onFocus,
//   onClick,
//   onKeyDown,
//   onKeyUp,
//   onKeyPress,
//   onSubmit,
//   status,
//   funcss,
//   bg,
//   fullWidth,
//   flat,
//   bordered,
//   borderless,
//   rounded,
//   leftRounded,
//   rightRounded,
//   startIcon,
//   endIcon,
//   prefix,
//   suffix,
//   stringPrefix,
//   stringSuffix,
//   iconicBg,
//   label,
//   helperText,
//   rows = 2,
//   cols,
//   wrap,
//   variant = '',
//   placeholder,
  
//   // HTML Textarea Attributes
//   disabled = false,
//   readOnly = false,
//   required = false,
//   autoFocus = false,
//   autoComplete,
//   minLength,
//   maxLength,
//   form,
//   formNoValidate,
//   formTarget,
//   dirname,
//   autoCapitalize,
//   autoCorrect,
//   spellCheck,
//   inputMode,
  
//   ...rest
// }) => {
//   const [isFocused, setIsFocused] = useState(false);
//   const [textValue, setTextValue] = useState<string>(value !== undefined ? String(value) : defaultValue || '');

//   useEffect(() => {
//     if (value !== undefined) {
//       setTextValue(String(value));
//     }
//   }, [value]);

//   const { mergeWithLocal } = useComponentConfiguration('Input', variant);

//   // Determine effective icons with priority: startIcon > prefix > stringPrefix
//   const effectiveStartIcon = startIcon || prefix || stringPrefix;
  
//   // Determine effective icons with priority: endIcon > suffix > stringSuffix
//   const effectiveEndIcon = endIcon || suffix || stringSuffix;

//   // Convert string icons to ReactNode
//   const startIconNode = useIcon(effectiveStartIcon);
//   const endIconNode = useIcon(effectiveEndIcon);

//   const localProps = {
//     status,
//     funcss,
//     bg,
//     fullWidth,
//     flat,
//     bordered,
//     borderless,
//     rounded,
//     leftRounded,
//     rightRounded,
//     startIcon: startIconNode,
//     endIcon: endIconNode,
//     iconicBg,
//     label,
//     helperText,
//   };

//   const { props: mergedProps } = mergeWithLocal(localProps);

//   const final = {
//     status: status !== undefined ? status : mergedProps.status,
//     funcss: funcss !== undefined ? funcss : mergedProps.funcss,
//     bg: bg !== undefined ? bg : mergedProps.bg,
//     fullWidth: fullWidth !== undefined ? fullWidth : mergedProps.fullWidth,
//     flat: flat !== undefined ? flat : mergedProps.flat,
//     bordered: bordered !== undefined ? bordered : mergedProps.bordered,
//     borderless: borderless !== undefined ? borderless : mergedProps.borderless,
//     rounded: rounded !== undefined ? rounded : mergedProps.rounded,
//     leftRounded: leftRounded !== undefined ? leftRounded : mergedProps.leftRounded,
//     rightRounded: rightRounded !== undefined ? rightRounded : mergedProps.rightRounded,
//     startIcon: startIconNode !== undefined ? startIconNode : mergedProps.startIcon,
//     endIcon: endIconNode !== undefined ? endIconNode : mergedProps.endIcon,
//     iconicBg: iconicBg !== undefined ? iconicBg : mergedProps.iconicBg,
//   };

//   const showPrefix = !!final.startIcon;
//   const showSuffix = !!final.endIcon;

//   const hasNoPrefix = !showPrefix;
//   const hasNoLabel = !label;

//   const className = generateInputClasses({
//     status: final.status,
//     rounded: final.rounded,
//     bg: final.bg,
//     funcss: final.funcss,
//     flat: final.flat,
//     leftRounded: final.leftRounded,
//     rightRounded: final.rightRounded,
//     bordered: final.bordered,
//     borderless: final.borderless,
//     hasNoPrefix,
//     hasNoLabel,
//   });

//   const style = final.fullWidth ? { width: '100%' } : undefined;

//   const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
//     const newValue = e.target.value;
//     setTextValue(newValue);
//     if (onChange) onChange(e);
//   };

//   const handleFocus = (e: FocusEvent<HTMLTextAreaElement>) => {
//     setIsFocused(true);
//     if (onFocus) onFocus(e);
//   };

//   const handleBlur = (e: FocusEvent<HTMLTextAreaElement>) => {
//     setIsFocused(false);
//     if (onBlur) onBlur(e);
//   };

//   const showPlaceholder = placeholder && label && (isFocused || !!textValue);

//   // Extract only valid HTML textarea attributes
//   const textareaAttributes: React.TextareaHTMLAttributes<HTMLTextAreaElement> = {
//     id,
//     name,
//     className,
//     onChange: handleChange,
//     onFocus: handleFocus,
//     onBlur: handleBlur,
//     onClick: onClick as any,
//     onKeyDown: onKeyDown as any,
//     onKeyUp: onKeyUp as any,
//     onKeyPress: onKeyPress as any,
//     onSubmit: onSubmit as any,
//     defaultValue,
//     placeholder: showPlaceholder ? placeholder : (!label ? placeholder : ''),
//     style,
//     value: textValue,
//     rows,
//     cols,
//     wrap,
//     disabled,
//     readOnly,
//     required,
//     autoFocus,
//     autoComplete,
//     minLength,
//     maxLength,
//     form,
//     autoCapitalize,
//     autoCorrect,
//     spellCheck,
//     inputMode,
//     ...rest,
//   };

//   const textareaElement = <textarea {...textareaAttributes} />;

//   // Only use iconic wrapper when we have icons
//   const wrappedTextarea = showPrefix || showSuffix ? (
//     <IconicInputWrapper
//       startIcon={final.startIcon}
//       endIcon={final.endIcon}
//       iconicBg={final.iconicBg}
//       funcss={final.funcss}
//     >
//       {textareaElement}
//     </IconicInputWrapper>
//   ) : (
//     textareaElement
//   );

//   return (
//     <InputContainer
//       startIcon={final.startIcon}
//       label={label}
//       status={final.status}
//       helperText={helperText}
//       isFocused={isFocused}
//       hasValue={!!textValue}
//       fullWidth={final.fullWidth}
//       id={id}
//       required={required}
//     >
//       {wrappedTextarea}
//     </InputContainer>
//   );
// };

// // Main Input Component
// interface InputProps extends BaseInputProps {
//   select?: boolean;
//   multiline?: boolean;
//   noBorder?: boolean;
//   type?: string;
//   options?: SelectOption[];
//   rows?: number;
// }

// const Input: React.FC<InputProps> = ({
//   select,
//   multiline,
//   noBorder,
//   startIcon,
//   endIcon,
//   prefix,
//   suffix,
//   stringPrefix,
//   stringSuffix,
//   iconicBg,
//   type,
//   variant = '',
//   ...props
// }) => {
//   const { mergeWithLocal } = useComponentConfiguration('Input', variant);
  
//   // Determine effective icons with priority:
//   // For start: startIcon > prefix > stringPrefix
//   // For end: endIcon > suffix > stringSuffix
//   const effectiveStartIcon = startIcon || prefix || stringPrefix;
//   const effectiveEndIcon = endIcon || suffix || stringSuffix;

//   // Create local props object including all input props
//   const localProps = {
//     ...props,
//     startIcon: effectiveStartIcon,
//     endIcon: effectiveEndIcon,
//     iconicBg,
//     type,
//     // Ensure all event handlers are passed through
//     onChange: props.onChange,
//     onBlur: props.onBlur,
//     onFocus: props.onFocus,
//     onClick: props.onClick,
//     onKeyDown: props.onKeyDown,
//     onKeyUp: props.onKeyUp,
//     onKeyPress: props.onKeyPress,
//     onSubmit: props.onSubmit,
//   };

//   const { props: mergedProps } = mergeWithLocal(localProps);

//   // Build the final props object
//   const inputProps = {
//     // First spread the merged props (which include theme configuration)
//     ...mergedProps,
//     // Then spread all component-specific props to ensure they override theme
//     startIcon: effectiveStartIcon,
//     endIcon: effectiveEndIcon,
//     stringPrefix,
//     stringSuffix,
//     iconicBg,
//     ...props,
//     borderless: noBorder !== undefined ? noBorder : (props.borderless !== undefined ? props.borderless : mergedProps.borderless),
//     type,
//     variant,
//   };

//   const finalInputProps = {
//     ...inputProps,
//     onChange: props.onChange || inputProps.onChange,
//     onBlur: props.onBlur || inputProps.onBlur,
//     onFocus: props.onFocus || inputProps.onFocus,
//   };

//   if (select) {
//     return <SelectInput {...finalInputProps} />;
//   }

//   if (multiline) {
//     return <TextareaInput {...finalInputProps} />;
//   }

//   return <TextInput {...finalInputProps} />;
// };

// export default Input;