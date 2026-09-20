
'use client';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Button from '../button/Button';
import Input from '../input/Input';
import Flex from '../flex/Flex';
import Text from '../text/Text';
import { PiPaperPlaneTilt, PiWarningCircle, PiWhatsappLogo } from 'react-icons/pi';
import { useComponentConfiguration } from '../../utils/componentUtils';
import { useVariant } from '../theme/theme';

// Field types supported
export type InputType = 
  | 'text'
  | 'email'
  | 'number'
  | 'tel'
  | 'textarea'
  | 'password'
  | 'date'
  | 'select'
  | 'checkbox'
  | 'radio'
  | 'file';

// Field option
export interface FieldOption {
  label: string;
  value: string;
  disabled?: boolean;
}

// Simplified field configuration
export interface FormField {
  name: string;
  label?: string;
  type: InputType;
  required?: boolean;
  placeholder?: string;
  options?: FieldOption[];
  multiple?: boolean; // For checkboxes
  value?: any; // Initial value
  disabled?: boolean;
  helperText?: string;
  // Input component props (passed directly to Input)
  inputProps?: {
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    prefix?: React.ReactNode;
    suffix?: React.ReactNode;
    stringPrefix?: string;
    stringSuffix?: string;
    iconicBg?: string;
    funcss?: string;
    bg?: string;
    flat?: boolean;
    bordered?: boolean;
    borderless?: boolean;
    rounded?: boolean;
    leftRounded?: boolean;
    rightRounded?: boolean;
    rows?: number;
    noBorder?: boolean;
    variant?: string;
    // Standard HTML attributes
    id?: string;
    autocomplete?: string;
    pattern?: string;
    min?: string | number;
    max?: string | number;
    minLength?: number;
    maxLength?: number;
    step?: string | number;
  };
}

// Form props
export interface FormProps {
  fields?: FormField[] | string; // Allow string (JSON) or array
  onSubmit?: (values: Record<string, any>, viaWhatsApp?: boolean) => void;
  defaultValues?: Record<string, any> | string; // Allow string (JSON) or object
  submitText?: string;
  submitBg?: string;
  submitPrefix?: React.ReactNode | string;
  submitSuffix?: React.ReactNode | string;
  resetText?: string;
  showReset?: boolean;
  isLoading?: boolean;
  className?: string;
  layout?: 'vertical' | 'horizontal';
  gap?: number | string;
  title?: string;
  titleSize?: string;
  titleColor?: string;
  description?: string;
  descriptionSize?: string;
  descriptionColor?: string;
  // WhatsApp props (simple, not object)
  whatsappContact?: string;
  whatsappHeader?: string;
  whatsappFooter?: string;
  // New props for fullWidth
  fullWidth?: boolean;
  width?: string;
  centered?: boolean;
  // Variant support
  variant?: string;
}

// Helper function to parse JSON input
const parseJsonInput = <T,>(input: T | string | undefined, defaultValue: T): T => {
  if (input === undefined || input === null) {
    return defaultValue;
  }

  // If it's already the correct type, return as is
  if (typeof input !== 'string') {
    return input;
  }

  try {
    // Try to parse as JSON
    const parsed = JSON.parse(input);
    return parsed;
  } catch (error) {
    console.warn('Failed to parse JSON input:', input, error);
    // If parsing fails, try to interpret as a string that might be valid
    try {
      // Try to handle common cases like arrays or objects without quotes
      const trimmed = input.trim();
      if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
        return JSON.parse(trimmed);
      } else if (trimmed.startsWith('{') && trimmed.endsWith('}')) {
        return JSON.parse(trimmed);
      }
    } catch (e) {
      // If still fails, return default
    }
    return defaultValue;
  }
};

// Custom Checkbox Component (unchanged)
const FormCheckbox: React.FC<{
  label?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  required?: boolean;
  value?: string;
  id?: string;
}> = ({ label, checked, onChange, disabled, required, value, id }) => {
  return (
    <label 
      className="funui_form-checkbox"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        cursor: disabled ? 'not-allowed' : 'pointer',
        userSelect: 'none',
        width: 'fit-content',
        padding: '0.25rem 0',
      }}
    >
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={(e) => !disabled && onChange(e.target.checked)}
        disabled={disabled}
        required={required}
        value={value}
        style={{ 
          position: 'absolute',
          opacity: 0,
          width: 0,
          height: 0,
          pointerEvents: 'none'
        }}
      />
      <div 
        className="funui_form-checkbox-box"
        style={{
          width: '1.25rem',
          height: '1.25rem',
          border: checked ? '2px solid var(--primary)' : '2px solid var(--borderColor)',
          borderRadius: '0.25rem',
          backgroundColor: checked ? 'var(--primary)' : 'transparent',
          position: 'relative',
          transition: 'all 0.2s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        {checked && (
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org2000/svg"
            style={{
              stroke: 'white',
              strokeWidth: '2',
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
            }}
          >
            <path d="M3 7L6 10L11 4" />
          </svg>
        )}
      </div>
      {label && (
        <span 
          className="funui_form-checkbox-label" 
          style={{ 
            fontSize: '0.875rem',
            color: disabled ? 'var(--text-muted)' : 'var(--text)',
            fontWeight: checked ? '500' : '400',
          }}
        >
          {label}{required && ' *'}
        </span>
      )}
    </label>
  );
};

// Custom Radio Component (unchanged)
const FormRadio: React.FC<{
  label?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  required?: boolean;
  value?: string;
  id?: string;
}> = ({ label, checked, onChange, disabled, required, value, id }) => {
  return (
    <label 
      className="funui_form-radio"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        cursor: disabled ? 'not-allowed' : 'pointer',
        userSelect: 'none',
        width: 'fit-content',
        padding: '0.25rem 0',
      }}
    >
      <input
        type="radio"
        id={id}
        checked={checked}
        onChange={(e) => !disabled && onChange(e.target.checked)}
        disabled={disabled}
        required={required}
        value={value}
        style={{ 
          position: 'absolute',
          opacity: 0,
          width: 0,
          height: 0,
          pointerEvents: 'none'
        }}
      />
      <div 
        className="funui_form-radio-circle"
        style={{
          width: '1.25rem',
          height: '1.25rem',
          border: checked ? '2px solid var(--primary)' : '2px solid var(--borderColor)',
          borderRadius: '50%',
          backgroundColor: 'transparent',
          position: 'relative',
          transition: 'all 0.2s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        {checked && (
          <div
            style={{
              width: '0.75rem',
              height: '0.75rem',
              backgroundColor: 'var(--primary)',
              borderRadius: '50%',
            }}
          />
        )}
      </div>
      {label && (
        <span 
          className="funui_form-radio-label" 
          style={{ 
            fontSize: '0.875rem',
            color: disabled ? 'var(--text-muted)' : 'var(--text)',
            fontWeight: checked ? '500' : '400',
          }}
        >
          {label}{required && ' *'}
        </span>
      )}
    </label>
  );
};

// Function to format WhatsApp message - UPDATED with proper formatting
const formatWhatsAppMessage = (
  values: Record<string, any>,
  fields: FormField[],
  header?: string,
  footer?: string
): string => {
  // Build message lines
  let message = '';
  
  // Add header if provided
  if (header) {
    message += `${header}\n\n`;
  }
  
  // Filter out empty/null/undefined values
  const nonEmptyFields = fields.filter(field => {
    const value = values[field.name];
    
    // Skip if value is undefined, null, or empty string
    if (value === undefined || value === null || value === '') {
      return false;
    }
    
    // Skip if array is empty
    if (Array.isArray(value) && value.length === 0) {
      return false;
    }
    
    // Skip if checkbox is false
    if (field.type === 'checkbox' && !field.multiple && value === false) {
      return false;
    }
    
    return true;
  });
  
  // Format each field
  const fieldLines = nonEmptyFields.map(field => {
    const value = values[field.name];
    let displayValue = value;
    
    // Format array values (for multiple checkboxes)
    if (Array.isArray(value)) {
      displayValue = value.join(', ');
    }
    
    // Format checkbox values
    if (field.type === 'checkbox' && !field.multiple) {
      displayValue = value ? 'Yes' : 'No';
    }
    
    // Format select/radio values
    if ((field.type === 'select' || field.type === 'radio') && field.options) {
      const option = field.options.find(opt => opt.value === value);
      displayValue = option ? option.label : value;
    }
    
    // Ensure displayValue is a string and preserve spaces/newlines
    displayValue = String(displayValue);
    
    // WhatsApp formatting:
    // - Field label on its own line
    // - Value on next line wrapped in backticks
    // - Double newline between fields for readability
    return `${field.label || field.name}\n\`${displayValue}\``;
  });
  
  // Join with double newline for spacing
  message += fieldLines.join('\n\n');
  
  // Add footer if provided
  if (footer) {
    message += `\n\n${footer}`;
  }
  
  return encodeURIComponent(message);
};

// Main Form Component - FIXED
const Form: React.FC<FormProps> = (props) => {
  const {
    fields: fieldsProp,
    onSubmit: onSubmitProp,
    defaultValues: defaultValuesProp = {},
    submitText: submitTextProp = 'Submit',
    submitBg: submitBgProp = 'primary',
    submitPrefix: submitPrefixProp,
    submitSuffix: submitSuffixProp,
    resetText: resetTextProp = 'Reset',
    showReset: showResetProp = true,
    isLoading: isLoadingProp = false,
    className: classNameProp = '',
    layout: layoutProp = 'vertical',
    gap: gapProp = '1.5rem',
    title: titleProp,
    titleSize: titleSizeProp,
    titleColor: titleColorProp,
    description: descriptionProp,
    descriptionSize: descriptionSizeProp,
    descriptionColor: descriptionColorProp,
    whatsappContact: whatsappContactProp,
    width: widthProp,
    centered: centeredProp,
    whatsappHeader: whatsappHeaderProp,
    whatsappFooter: whatsappFooterProp,
    fullWidth: fullWidthProp = true,
    variant = '',
  } = props;

  // Use component configuration with variant
  const { mergeWithLocal } = useComponentConfiguration('Form', variant);

  // Create local props object
  const localProps = {
    fields: fieldsProp,
    onSubmit: onSubmitProp,
    defaultValues: defaultValuesProp,
    submitText: submitTextProp,
    submitBg: submitBgProp,
    submitPrefix: submitPrefixProp,
    submitSuffix: submitSuffixProp,
    resetText: resetTextProp,
    showReset: showResetProp,
    isLoading: isLoadingProp,
    className: classNameProp,
    layout: layoutProp,
    gap: gapProp,
    title: titleProp,
    titleSize: titleSizeProp,
    titleColor: titleColorProp,
    description: descriptionProp,
    descriptionSize: descriptionSizeProp,
    descriptionColor: descriptionColorProp,
    whatsappContact: whatsappContactProp,
    width: widthProp,
    centered: centeredProp,
    whatsappHeader: whatsappHeaderProp,
    whatsappFooter: whatsappFooterProp,
    fullWidth: fullWidthProp,
    variant,
  };

  // Merge with theme configuration
  const { props: mergedProps } = mergeWithLocal(localProps);

  // Destructure with proper priority: local props override config props
  const fields = fieldsProp !== undefined ? fieldsProp : mergedProps.fields;
  const onSubmit = onSubmitProp !== undefined ? onSubmitProp : mergedProps.onSubmit;
  const defaultValues = defaultValuesProp !== undefined ? defaultValuesProp : mergedProps.defaultValues;
  const submitText = submitTextProp !== undefined ? submitTextProp : mergedProps.submitText;
  const submitBg = submitBgProp !== undefined ? submitBgProp : mergedProps.submitBg;
  const submitPrefix = submitPrefixProp !== undefined ? submitPrefixProp : mergedProps.submitPrefix;
  const submitSuffix = submitSuffixProp !== undefined ? submitSuffixProp : mergedProps.submitSuffix;
  const isLoading = isLoadingProp !== undefined ? isLoadingProp : mergedProps.isLoading;
  const className = classNameProp !== undefined ? classNameProp : mergedProps.className;
  const layout = layoutProp !== undefined ? layoutProp : mergedProps.layout;
  const gap = gapProp !== undefined ? gapProp : mergedProps.gap;
  const title = titleProp !== undefined ? titleProp : mergedProps.title;
  const titleSize = titleSizeProp !== undefined ? titleSizeProp : mergedProps.titleSize;
  const titleColor = titleColorProp !== undefined ? titleColorProp : mergedProps.titleColor;
  const description = descriptionProp !== undefined ? descriptionProp : mergedProps.description;
  const descriptionSize = descriptionSizeProp !== undefined ? descriptionSizeProp : mergedProps.descriptionSize;
  const descriptionColor = descriptionColorProp !== undefined ? descriptionColorProp : mergedProps.descriptionColor;
  const whatsappContact = whatsappContactProp !== undefined ? whatsappContactProp : mergedProps.whatsappContact;
  const width = widthProp !== undefined ? widthProp : mergedProps.width;
  const centered = centeredProp !== undefined ? centeredProp : mergedProps.centered;
  const whatsappHeader = whatsappHeaderProp !== undefined ? whatsappHeaderProp : mergedProps.whatsappHeader;
  const whatsappFooter = whatsappFooterProp !== undefined ? whatsappFooterProp : mergedProps.whatsappFooter;
  const fullWidth = fullWidthProp !== undefined ? fullWidthProp : mergedProps.fullWidth;

  // Parse JSON inputs
  const parsedFields = useMemo(() => parseJsonInput(fields, [] as FormField[]), [fields]);
  const parsedDefaultValues = useMemo(() => parseJsonInput(defaultValues, {} as Record<string, any>), [defaultValues]);

  // State management
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [formValues, setFormValues] = useState<Record<string, any>>(() => {
    // Initialize form values from defaultValues and field values
    const initialValues: Record<string, any> = {};
    parsedFields.forEach((field: any) => {
      if (field.value !== undefined) {
        initialValues[field.name] = field.value;
      } else if (parsedDefaultValues[field.name] !== undefined) {
        initialValues[field.name] = parsedDefaultValues[field.name];
      } else {
        // Set default empty values
        if (field.type === 'checkbox' && field.multiple) {
          initialValues[field.name] = [];
        } else if (field.type === 'checkbox') {
          initialValues[field.name] = false;
        } else {
          initialValues[field.name] = '';
        }
      }
    });
    return initialValues;
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Update form values when defaultValues prop changes
  useEffect(() => {
    if (Object.keys(parsedDefaultValues).length > 0) {
      setFormValues(prev => ({
        ...prev,
        ...parsedDefaultValues
      }));
    }
  }, [parsedDefaultValues]);

  // Validate a single field
  const validateField = useCallback((field: FormField, value: any): string | null => {
    // Required validation
    if (field.required) {
      if (value === undefined || value === null || value === '') {
        return `${field.label || field.name} is required`;
      }
      
      if (field.type === 'checkbox' && field.multiple && Array.isArray(value) && value.length === 0) {
        return `${field.label || field.name} is required`;
      }
      
      if (field.type === 'checkbox' && !field.multiple && value === false) {
        return `${field.label || field.name} is required`;
      }
    }

    // Type-specific validations (only for non-empty values)
    if (value && (typeof value !== 'string' || value !== '')) {
      // Email validation
      if (field.type === 'email' && typeof value === 'string') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          return 'Please enter a valid email address';
        }
      }

      // Number validation
      if (field.type === 'number') {
        let numValue: number;
        
        if (typeof value === 'string') {
          numValue = parseFloat(value);
        } else if (typeof value === 'number') {
          numValue = value;
        } else {
          return 'Please enter a valid number';
        }
        
        if (isNaN(numValue)) {
          return 'Please enter a valid number';
        }
        
        const min = field.inputProps?.min;
        const max = field.inputProps?.max;
        
        if (min !== undefined && numValue < parseFloat(min.toString())) {
          return `Minimum value is ${min}`;
        }
        
        if (max !== undefined && numValue > parseFloat(max.toString())) {
          return `Maximum value is ${max}`;
        }
      }

      // Phone validation (basic) - only for strings

// Phone validation (basic) - only for strings
if (field.type === 'tel' && typeof value === 'string') {
  // Remove all non-digit characters except + at the beginning
  const cleanedValue = value.replace(/[^\d+]/g, '');
  
  // Check if the value contains any letters (shouldn't happen after cleaning, but just in case)
  if (/[a-zA-Z]/.test(value)) {
    return 'Phone number cannot contain letters';
  }
  
  // Allow numbers starting with 0 or with country code (+)
  const phoneRegex = /^[\+]?[0-9]{0,18}$/;
  if (value && !phoneRegex.test(cleanedValue)) {
    return 'Please enter a valid phone number (digits only, can start with 0 or +)';
  }
  
  // Optional: Add minimum length check
  const minLength = field.inputProps?.minLength || 10; // Default 10 digits
  if (cleanedValue.length > 0 && cleanedValue.length < minLength) {
    return `Phone number must be at least ${minLength} digits`;
  }
  
  // Optional: Add maximum length check
  const maxLength = field.inputProps?.maxLength || 15; // Default 15 digits
  if (cleanedValue.length > maxLength) {
    return `Phone number cannot exceed ${maxLength} digits`;
  }
}

      // Length validation for strings
      if (typeof value === 'string') {
        const minLength = field.inputProps?.minLength;
        const maxLength = field.inputProps?.maxLength;
        
        if (minLength && value.length < minLength) {
          return `Minimum ${minLength} characters required`;
        }
        
        if (maxLength && value.length > maxLength) {
          return `Maximum ${maxLength} characters allowed`;
        }
      }

      // Pattern validation if provided - only for strings
      if (field.inputProps?.pattern && typeof value === 'string') {
        try {
          const regex = new RegExp(field.inputProps.pattern);
          if (!regex.test(value)) {
            return 'Invalid format';
          }
        } catch (error) {
          console.warn('Invalid regex pattern:', field.inputProps.pattern);
        }
      }
    }

    return null;
  }, []);

  // Validate form
  const validateForm = useCallback((): boolean => {
    const newErrors: Record<string, string> = {};
    let hasErrors = false;

    parsedFields.forEach((field: any) => {
      const value = formValues[field.name];
      const error = validateField(field, value);
      if (error) {
        newErrors[field.name] = error;
        hasErrors = true;
      }
    });

    setErrors(newErrors);
    return !hasErrors;
  }, [parsedFields, validateField, formValues]);

  // Handle field change for checkboxes and radios
  const handleFieldChange = useCallback((fieldName: string, newValue: any) => {
    // Update form values
    setFormValues(prev => ({
      ...prev,
      [fieldName]: newValue
    }));
    
    // Update touched state
    setTouched(prev => ({ ...prev, [fieldName]: true }));
    
    // Validate the changed field
    const field = parsedFields.find((f: any) => f.name === fieldName);
    if (!field) return;

    const error = validateField(field, newValue);
    setErrors(prev => {
      if (error) {
        return { ...prev, [fieldName]: error };
      } else {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      }
    });
  }, [parsedFields, validateField]);

  // FIXED: Handle input change - pass event directly to Input component
  const handleInputEventChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const fieldName = e.target.name;
    const value = e.target.value;
    
    // Update form values - PASS VALUE AS-IS (preserves spaces)
    setFormValues(prev => ({
      ...prev,
      [fieldName]: value
    }));
    
    // Update touched state
    setTouched(prev => ({ ...prev, [fieldName]: true }));
    
    // Validate the changed field
    const field = parsedFields.find((f: any) => f.name === fieldName);
    if (!field) return;

    const error = validateField(field, value);
    setErrors(prev => {
      if (error) {
        return { ...prev, [fieldName]: error };
      } else {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      }
    });
  }, [parsedFields, validateField]);

  // FIXED: Handle blur event - pass event directly to Input component
  const handleInputEventBlur = useCallback((e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const fieldName = e.target.name;
    setTouched(prev => ({ ...prev, [fieldName]: true }));
    
    // Validate the field
    const field = parsedFields.find((f: any) => f.name === fieldName);
    if (!field) return;

    const value = formValues[fieldName];
    const error = validateField(field, value);
    
    setErrors(prev => {
      if (error) {
        return { ...prev, [fieldName]: error };
      } else {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      }
    });
  }, [parsedFields, validateField, formValues]);

  // Handle form submission
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched
    const allTouched: Record<string, boolean> = {};
    parsedFields.forEach((field: any) => {
      allTouched[field.name] = true;
    });
    setTouched(allTouched);

    // Validate form
    const isValid = validateForm();
    if (!isValid) {
      // Scroll to first error
      const firstErrorField = Object.keys(errors)[0];
      if (firstErrorField) {
        const element = document.getElementById(`form-field-${firstErrorField}`);
        element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    // Get form data and submit
    setIsSubmitting(true);
    try {
      if (whatsappContact) {
        // Submit via WhatsApp
        const message = formatWhatsAppMessage(formValues, parsedFields, whatsappHeader, whatsappFooter);
        const cleanPhone = whatsappContact.replace(/[\s+\-()]/g, '');
        const whatsappUrl = `https://wa.me/${cleanPhone}?text=${message}`;
        window.open(whatsappUrl, '_blank');
        
        // Still call onSubmit if provided
        if (onSubmit) {
          await onSubmit(formValues, true);
        }
      } else {
        // Regular submission
        if (onSubmit) {
          await onSubmit(formValues, false);
        }
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setErrors(prev => ({
        ...prev,
        _form: 'There was an error submitting the form. Please try again.'
      }));
    } finally {
      setIsSubmitting(false);
    }
  }, [parsedFields, validateForm, formValues, whatsappContact, whatsappHeader, whatsappFooter, onSubmit, errors]);

  // Handle form reset
  const handleReset = useCallback(() => {
    // Reset to initial values
    const initialValues: Record<string, any> = {};
    parsedFields.forEach((field: any) => {
      if (field.value !== undefined) {
        initialValues[field.name] = field.value;
      } else if (parsedDefaultValues[field.name] !== undefined) {
        initialValues[field.name] = parsedDefaultValues[field.name];
      } else {
        if (field.type === 'checkbox' && field.multiple) {
          initialValues[field.name] = [];
        } else if (field.type === 'checkbox') {
          initialValues[field.name] = false;
        } else {
          initialValues[field.name] = '';
        }
      }
    });
    
    setFormValues(initialValues);
    setErrors({});
    setTouched({});
  }, [parsedFields, parsedDefaultValues]);

  // Get field status for Input component
  const getFieldStatus = useCallback((fieldName: string): 'success' | 'warning' | 'danger' | 'info' | undefined => {
    const error = errors[fieldName];
    const isTouched = touched[fieldName];

    if (error) return 'danger';
    if (isTouched && !error && formValues[fieldName] !== '') {
      return 'success';
    }
    return undefined;
  }, [errors, touched, formValues]);

  // Check if form is valid for submission
  const isFormValid = useMemo(() => {
    // Check if any required fields are empty
    const hasEmptyRequiredFields = parsedFields.some((field: any) => {
      if (!field.required) return false;
      
      const value = formValues[field.name];
      
      if (field.type === 'checkbox' && field.multiple) {
        return !Array.isArray(value) || value.length === 0;
      }
      
      if (field.type === 'checkbox') {
        return value === false;
      }
      
      return !value || value === '';
    });
    
    // Check if there are any validation errors
    const hasValidationErrors = Object.keys(errors).length > 0;
    
    return !hasEmptyRequiredFields && !hasValidationErrors;
  }, [parsedFields, formValues, errors]);

  // Submit button disabled state
  const isSubmitDisabled = isSubmitting || isLoading || !isFormValid;

  // Check if WhatsApp is configured
  const hasWhatsApp = !!whatsappContact;

  // Render field based on type - FIXED
  const renderField = useCallback((field: FormField) => {
    const status = getFieldStatus(field.name);
    const error = errors[field.name];
    const isTouched = touched[field.name];
    const showError = error && isTouched;
    const value = formValues[field.name];

    // Field wrapper classes
    const wrapperClass = `col min-w-200 field ${showError ? 'field-error' : ''}`.trim();

    // Helper text (error takes priority)
    const helperText = showError ? error : field.helperText;

    // Generate unique ID for the input
    const inputId = field.inputProps?.id || `form-field-${field.name}`;

    // Base props for Input component
    const baseProps: any = {
      id: inputId,
      name: field.name, // IMPORTANT: Make sure name is passed
      label: field.label,
      placeholder: field.placeholder,
      helperText: helperText,
      disabled: field.disabled || isLoading,
      fullWidth: fullWidth,
      ...field.inputProps,
    };

    // Only add status if it's not undefined
    if (status !== undefined) {
      baseProps.status = status;
    }

    // Render based on field type
    switch (field.type) {
      case 'checkbox':
        if (field.options?.length) {
          // Multiple checkboxes (checkbox group)
          const checkedValues = Array.isArray(value) ? value : [];
          
          return (
            <div key={field.name} className={wrapperClass}>
              {field.label && (
                <div className="form-label" style={{ marginBottom: '0.5rem' }}>
                  <Text text={field.label + (field.required ? ' *' : '')} size="sm" color="text" bold />
                </div>
              )}
              <Flex direction="column" gap="0.5rem">
                {field.options.map((option, index) => {
                  const isChecked = checkedValues.includes(option.value);
                  
                  return (
                    <FormCheckbox
                      key={`${field.name}_${index}`}
                      id={`${inputId}_${index}`}
                      label={option.label}
                      checked={isChecked}
                      onChange={(checked) => {
                        if (checked) {
                          // Add value to array
                          const newValues = [...checkedValues, option.value];
                          handleFieldChange(field.name, newValues);
                        } else {
                          // Remove value from array
                          const newValues = checkedValues.filter(v => v !== option.value);
                          handleFieldChange(field.name, newValues);
                        }
                      }}
                      disabled={field.disabled || option.disabled || isLoading}
                      required={field.required && index === 0}
                      value={option.value}
                    />
                  );
                })}
              </Flex>
            </div>
          );
        } else {
          // Single checkbox (boolean)
          return (
            <div key={field.name} className={wrapperClass}>
              <FormCheckbox
                label={field.label}
                checked={!!value}
                onChange={(checked) => handleFieldChange(field.name, checked)}
                disabled={field.disabled || isLoading}
                required={field.required}
                id={inputId}
              />
            </div>
          );
        }

      case 'radio':
        if (!field.options?.length) return null;

        return (
          <div key={field.name} className={wrapperClass}>
            {field.label && (
              <div className="form-label" style={{ marginBottom: '0.5rem' }}>
                <Text text={field.label + (field.required ? ' *' : '')} size="sm" color="text" bold />
              </div>
            )}
            <Flex direction="column" gap="0.5rem">
              {field.options.map((option, index) => (
                <FormRadio
                  key={`${field.name}_${index}`}
                  id={`${inputId}_${index}`}
                  label={option.label}
                  checked={value === option.value}
                  onChange={() => handleFieldChange(field.name, option.value)}
                  disabled={field.disabled || option.disabled || isLoading}
                  required={field.required && index === 0}
                  value={option.value}
                />
              ))}
            </Flex>
          </div>
        );

      case 'textarea':
        return (
          <div key={field.name} className={wrapperClass}>
            <Input
              multiline
              rows={field.inputProps?.rows || 4}
              value={value || ''}
              onChange={handleInputEventChange} // FIXED: Pass event handler directly
              onBlur={handleInputEventBlur} // FIXED: Pass event handler directly
              {...baseProps}
            />
          </div>
        );

      case 'select':
        return (
          <div key={field.name} className={wrapperClass}>
            <Input
              select
              options={field.options?.map(opt => ({ text: opt.label, value: opt.value })) || []}
              value={value || ''}
              onChange={handleInputEventChange} // FIXED: Pass event handler directly
              onBlur={handleInputEventBlur} // FIXED: Pass event handler directly
              {...baseProps}
            />
          </div>
        );

      default:
        // text, email, number, tel, date, file, password
        return (
          <div key={field.name} className={wrapperClass}>
            <Input
              type={field.type}
              value={value || ''}
              onChange={handleInputEventChange} // FIXED: Pass event handler directly
              onBlur={handleInputEventBlur} // FIXED: Pass event handler directly
              {...baseProps}
            />
          </div>
        );
    }
  }, [errors, touched, formValues, isLoading, getFieldStatus, handleFieldChange, handleInputEventChange, handleInputEventBlur, fullWidth]);

  // Don't render if no fields are configured
  if (parsedFields.length === 0) {
    console.warn('Form: No fields configured. Please provide fields prop or configure via theme.');
    return null;
  }

  return (
    <div className={`form-wrapper p-5 ${centered ? 'center' : ''} ${className}`} style={{ width: "100%", maxWidth: width || "450px"  }}>
      {/* Title Section */}
      {title && (
        <div className="form-header" style={{ marginBottom: '2rem' }}>
          <Text 
            text={title} 
            size={titleSize || "3xl"}
            color={titleColor || ""}
            block
          />
          {description && (
          <Text article 
          size={descriptionSize || "sm"}
          color={descriptionColor || ""}
          >
              <div 
              className="article text-sm"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </Text>
          )}
        </div>
      )}

      <form 
        className="form"
        onSubmit={handleSubmit}
        style={{ width: '100%' }}
      >
        {/* Form fields wrapped in Flex */}
        <Flex 
          direction={layout === 'horizontal' ? 'row' : 'column'}
          gap={gap}
          width='100%'
        >
          {parsedFields.map(renderField)}
        </Flex>
        
        {/* Form actions - SINGLE BUTTON */}
        <Flex direction="column" gap="1rem" style={{ marginTop: '2rem', width: fullWidth ? '100%' : undefined }}>

          
          {/* Single submit button */}
          <Button
            type="submit"
            text={hasWhatsApp ? `Send via WhatsApp` : submitText}
            bg={submitBg || "primary"}
            raised
            prefix={submitPrefix || hasWhatsApp ? <PiWhatsappLogo /> : <PiPaperPlaneTilt />}  
            suffix={submitSuffix}
            disabled={isSubmitDisabled}
            isLoading={isSubmitting || isLoading}
            fullWidth={fullWidth}
          />
        </Flex>
      </form>
    </div>
  );
};

export default Form;