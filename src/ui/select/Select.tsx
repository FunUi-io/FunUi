import React, { useState, useRef, useEffect } from 'react';
import { useVariant } from '../theme/theme';
import Flex from '../flex/Flex';

interface SelectOption {
  value: string;
  text: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
}

interface CustomSelectProps {
  id?: string;
  name?: string;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  options: SelectOption[];
  onChange?: (value: string, event?: { target: { value: string; name: string } }) => void;
  onBlur?: (event: React.FocusEvent<HTMLSelectElement>) => void;
  searchable?: boolean;
  disabled?: boolean;
  bordered?: boolean;
  borderless?: boolean;
  rounded?: boolean;
  flat?: boolean;
  fullWidth?: boolean;
  status?: 'success' | 'warning' | 'danger' | '';
  className?: string;
  funcss?: string;
  label?: string;
  searchAutoFocus?: boolean;
  style?: React.CSSProperties;
  required?: boolean;
}

const Select: React.FC<CustomSelectProps> = ({
  id,
  name,
  value,
  defaultValue,
  label = 'Select an option',
  options = [],
  onChange,
  onBlur,
  searchable = true,
  disabled = false,
  bordered = false,
  borderless = false,
  rounded = false,
  flat = false,
  fullWidth = false,
  status = '',
  className = '',
  funcss = '',
  style = {},
  searchAutoFocus = false,
  required = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [internalValue, setInternalValue] = useState(value || defaultValue || '');

  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const selectRef = useRef<HTMLSelectElement>(null);
  const { variant } = useVariant();

  const currentValue = value !== undefined ? value : internalValue;
  const selectedOption = options.find(opt => opt.value === currentValue) || null;

  // Update filtered options when search query changes
  useEffect(() => {
    if (searchQuery) {
      const filtered = options.filter(option =>
        option.text.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredOptions(filtered);
      setFocusedIndex(filtered.length > 0 ? 0 : -1);
    } else {
      setFilteredOptions(options);
      setFocusedIndex(-1);
    }
  }, [searchQuery, options]);

  // Handle outside clicks
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        closeDropdown();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const openDropdown = () => {
    if (disabled) return;
    setIsOpen(true);
    if (searchable && searchInputRef.current) {
      if (searchAutoFocus) {
        setTimeout(() => searchInputRef.current?.focus(), 100);
      }
    } else if (selectedOption) {
      const index = filteredOptions.findIndex(opt => opt.value === selectedOption.value);
      setFocusedIndex(index >= 0 ? index : 0);
    } else {
      setFocusedIndex(0);
    }
  };

  const closeDropdown = () => {
    setIsOpen(false);
    setSearchQuery('');
    setFocusedIndex(-1);
  };

  const selectOption = (option: SelectOption) => {
    setInternalValue(option.value);
    closeDropdown();
    
    // Trigger native select change
    if (selectRef.current) {
      selectRef.current.value = option.value;
      const nativeEvent = new Event('change', { bubbles: true });
      selectRef.current.dispatchEvent(nativeEvent);
    }

    // Call onChange with value as first argument and event object as second
    if (onChange) {
      const eventObject = {
        target: { value: option.value, name: name || '' }
      };
      onChange(option.value, eventObject);
    }
  };

  const handleNativeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    const option = options.find(opt => opt.value === newValue);
    
    setInternalValue(newValue);
    
    if (onChange && option) {
      const eventObject = {
        target: { value: newValue, name: name || '' }
      };
      onChange(newValue, eventObject);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (isOpen && focusedIndex >= 0) {
          selectOption(filteredOptions[focusedIndex]);
        } else {
          openDropdown();
        }
        break;
      case 'ArrowDown':
        event.preventDefault();
        if (!isOpen) {
          openDropdown();
        } else {
          setFocusedIndex(prev => Math.min(prev + 1, filteredOptions.length - 1));
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (isOpen) {
          setFocusedIndex(prev => Math.max(prev - 1, 0));
        }
        break;
      case 'Escape':
        if (isOpen) {
          event.preventDefault();
          closeDropdown();
          triggerRef.current?.focus();
        }
        break;
    }
  };

  const handleSearchKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      handleKeyDown(event);
    } else if (event.key === 'Enter' && focusedIndex >= 0) {
      event.preventDefault();
      selectOption(filteredOptions[focusedIndex]);
    } else if (event.key === 'Escape') {
      closeDropdown();
    }
  };

  const getTriggerClasses = () => {
    const classes = [
      'select-trigger',
      isOpen && 'open',
      variant === 'standard' ? 'bordered' : bordered && 'bordered',
      variant === 'minimal' ? 'borderless' : borderless && 'borderless',
      flat && 'flat',
      status && status,
      disabled && 'disabled'
    ].filter(Boolean);

    return classes.join(' ');
  };

  const getContainerClasses = () => {
    const classes = [
      'custom-select',
      fullWidth && 'fullWidth',
      className,
    ].filter(Boolean);

    return classes.join(' ');
  };

  return (
    <div 
      ref={containerRef} 
      className={`${funcss} ${rounded && 'round-edge'} ${getContainerClasses()}`}
      style={style}
    >
      {/* Native select for form compatibility */}
      <select
        ref={selectRef}
        id={id}
        name={name}
        value={currentValue}
        onChange={handleNativeChange}
        onBlur={onBlur}
        disabled={disabled}
        required={required}
        style={{
          position: 'absolute',
          opacity: 0,
          width: 0,
          height: 0,
          pointerEvents: 'none'
        }}
        tabIndex={-1}
      >
        {!label && <option value="">Select an option</option>}
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>

      <div
        ref={triggerRef}
        className={`${funcss} ${rounded && 'round-edge'}  ${getTriggerClasses()}`}
        onClick={openDropdown}
        onKeyDown={handleKeyDown}
        tabIndex={disabled ? -1 : 0}
        role="button"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className={`select-value ${!selectedOption ? 'select-placeholder' : ''}`}>
          {selectedOption ? selectedOption.text : label}
        </span>
        <div className={`select-arrow ${isOpen ? 'open' : ''}`}>
          <svg
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>

      <div className={`select-dropdown ${isOpen ? 'open' : ''} `}>
        {searchable && (
          <input
            ref={searchInputRef}
            type="text"
            className="select-search"
            placeholder="Search options..."
            style={{borderRadius:0}}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearchKeyDown}
          />
        )}
        
        <div className="select-options" role="listbox">
          {filteredOptions.length === 0 ? (
            <div className="select-option no-results">No options found</div>
          ) : (
            filteredOptions.map((option, index) => (
              <button
              style={{borderRadius:0}}
                key={option.value}
                type="button"
                className={`select-option ${
                  selectedOption?.value === option.value ? 'selected' : ''
                } ${index === focusedIndex ? 'focused' : ''}`}
                onClick={() => selectOption(option)}
                role="option"
                aria-selected={selectedOption?.value === option.value}
              >
                <Flex width='100%' gap={0.5}>
                 {option?.prefix} {option.text} {option?.suffix}
                </Flex>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Select;