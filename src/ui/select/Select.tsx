import React, { useState, useRef, useEffect } from 'react';

interface SelectOption {
  value: string;
  text: string;
}

interface CustomSelectProps {
  id?: string;
  name?: string;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  options: SelectOption[];
  onChange?: (value: string, option: SelectOption) => void;
  onBlur?: (event: React.FocusEvent) => void;
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
  searchAutoFocus?: boolean;
  style?: React.CSSProperties;
}

const Select: React.FC<CustomSelectProps> = ({
  id,
  name,
  value,
  defaultValue,
  placeholder = 'Select an option',
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
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<SelectOption | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [filteredOptions, setFilteredOptions] = useState(options);

  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Initialize selected option
  useEffect(() => {
    const initialValue = value || defaultValue;
    if (initialValue) {
      const option = options.find(opt => opt.value === initialValue);
      if (option) {
        setSelectedOption(option);
      }
    }
  }, [value, defaultValue, options]);

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
    if (searchable && searchInputRef.current ) {
     if(searchAutoFocus) {
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
    setSelectedOption(option);
    closeDropdown();
    onChange?.(option.value, option);
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
      bordered && 'bordered',
      borderless && 'borderless',
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
       , 
    ].filter(Boolean);

    return classes.join(' ');
  };

  return (
    <div 
      ref={containerRef} 
      className={`${funcss} ${rounded && 'round-edge'} ${getContainerClasses()}`}
      style={style}
    >
   
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
          {selectedOption ? selectedOption.text : placeholder}
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
                key={option.value}
                type="button"
                className={`select-option ${
                  selectedOption?.value === option.value ? 'selected' : ''
                } ${index === focusedIndex ? 'focused' : ''}`}
                onClick={() => selectOption(option)}
                role="option"
                aria-selected={selectedOption?.value === option.value}
              >
                {option.text}
              </button>
            ))
          )}
        </div>
      </div>

      {/* Hidden input for form submission */}
      <input
        type="hidden"
        id={id}
        name={name}
        value={selectedOption?.value || ''}
      />
    </div>
  );
};

export default Select;