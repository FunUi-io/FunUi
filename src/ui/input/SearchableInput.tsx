'use client'
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { PiMagnifyingGlass, PiCaretDown, PiX } from 'react-icons/pi';

interface SearchableOption {
  value: string | number;
  text: string;
  [key: string]: any; // Allow additional properties
}

interface SearchableInputProps {
  id?: string;
  name?: string;
  status?: 'error' | 'success' | 'warning' | 'default';
  funcss?: string;
  bg?: string;
  fullWidth?: boolean;
  flat?: boolean;
  rounded?: boolean;
  leftRounded?: boolean;
  rightRounded?: boolean;
  label?: string;
  placeholder?: string;
  icon?: React.ReactNode;
  extra?: React.ReactNode;
  value?: string;
  data?: SearchableOption[];
  onSelect?: (option: SearchableOption) => void;
  onChange?: (value: string) => void;
  onInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  dropDirection?: 'up' | 'down';
  maxHeight?: string;
  minChars?: number;
  clearable?: boolean;
  disabled?: boolean;
  loading?: boolean;
  noDataText?: string;
  autoComplete?: boolean;
  highlightMatch?: boolean;
}

// Mock function - replace with your actual function
const generateInputClasses = (options: any) => {
  const baseClasses = 'input-base border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500';
  const statusClasses = {
    error: 'border-red-500 focus:ring-red-500',
    success: 'border-green-500 focus:ring-green-500',
    warning: 'border-yellow-500 focus:ring-yellow-500',
    default: 'border-gray-300 focus:ring-blue-500'
  };
  
  let classes = baseClasses;
  
  if (options.status) {
    classes += ' ' + statusClasses[options.status as keyof typeof statusClasses];
  }
  
  if (options.rounded) classes += ' rounded-lg';
  if (options.leftRounded) classes += ' rounded-l-lg';
  if (options.rightRounded) classes += ' rounded-r-lg';
  if (options.flat) classes += ' shadow-none';
  if (options.fullWidth) classes += ' w-full';
  if (options.additionalClasses) classes += ' ' + options.additionalClasses;
  
  return classes;
};

 const SearchableInput: React.FC<SearchableInputProps & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'>> = ({
  id = 'searchableInput',
  name,
  status = 'default',
  funcss,
  bg,
  fullWidth = false,
  flat = false,
  rounded = false,
  leftRounded = false,
  rightRounded = false,
  label,
  placeholder = 'Search...',
  icon,
  extra,
  value = '',
  data = [],
  onSelect,
  onChange,
  onInputChange,
  dropDirection = 'up',
  maxHeight = '200px',
  minChars = 1,
  clearable = true,
  disabled = false,
  loading = false,
  noDataText = 'No results found',
  autoComplete = true,
  highlightMatch = true,
  ...rest
}) => {
  const [inputValue, setInputValue] = useState(value);
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [selectedOption, setSelectedOption] = useState<SearchableOption | null>(null);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Filter and sort options based on input
  const filteredOptions = useMemo(() => {
    if (!inputValue || inputValue.length < minChars) return [];
    
    const filtered = data.filter(option =>
      option.text.toLowerCase().includes(inputValue.toLowerCase()) ||
      option.value.toString().toLowerCase().includes(inputValue.toLowerCase())
    );
    
    // Sort by relevance (exact matches first, then starts with, then contains)
    return filtered.sort((a, b) => {
      const aText = a.text.toLowerCase();
      const bText = b.text.toLowerCase();
      const query = inputValue.toLowerCase();
      
      if (aText === query) return -1;
      if (bText === query) return 1;
      if (aText.startsWith(query) && !bText.startsWith(query)) return -1;
      if (bText.startsWith(query) && !aText.startsWith(query)) return 1;
      return 0;
    });
  }, [inputValue, data, minChars]);

  // Auto-complete logic
  useEffect(() => {
    if (autoComplete && filteredOptions.length > 0 && inputValue) {
      const exactMatch = filteredOptions.find(option => 
        option.text.toLowerCase() === inputValue.toLowerCase()
      );
      if (exactMatch) {
        setSelectedOption(exactMatch);
      }
    }
  }, [filteredOptions, inputValue, autoComplete]);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    setIsOpen(newValue.length >= minChars);
    setHighlightedIndex(-1);
    setSelectedOption(null);
    
    if (onChange) onChange(newValue);
    if (onInputChange) onInputChange(e);
  };

  // Handle option selection
  const handleOptionSelect = (option: SearchableOption) => {
    setInputValue(option.text);
    setSelectedOption(option);
    setIsOpen(false);
    setHighlightedIndex(-1);
    
    if (onSelect) onSelect(option);
    if (onChange) onChange(option.text);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || filteredOptions.length === 0) return;
    
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev < filteredOptions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev > 0 ? prev - 1 : filteredOptions.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0) {
          handleOptionSelect(filteredOptions[highlightedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setHighlightedIndex(-1);
        break;
    }
  };

  // Scroll highlighted option into view
  useEffect(() => {
    if (highlightedIndex >= 0 && optionRefs.current[highlightedIndex]) {
      optionRefs.current[highlightedIndex]?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      });
    }
  }, [highlightedIndex]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) &&
          inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setHighlightedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Clear input
  const handleClear = () => {
    setInputValue('');
    setSelectedOption(null);
    setIsOpen(false);
    if (onChange) onChange('');
    inputRef.current?.focus();
  };

  // Highlight matching text
  const highlightText = (text: string, highlight: string) => {
    if (!highlightMatch || !highlight) return text;
    
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return parts.map((part, index) => 
      part.toLowerCase() === highlight.toLowerCase() ? (
        <span key={index} className="bg-yellow-200 font-medium">{part}</span>
      ) : part
    );
  };

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
    fullWidth,
    additionalClasses: 'searchableInput'
  });

  const containerStyle = fullWidth ? { width: '100%' } : undefined;
  const dropdownClasses = `absolute z-50 bg-white border border-gray-300 rounded-md shadow-lg ${
    dropDirection === 'up' ? 'bottom-full mb-1' : 'top-full mt-1'
  } left-0 right-0`;

  return (
    <div className="searchableInput-wrapper relative" style={containerStyle}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      
      <div className="relative">
        <div className="relative flex items-center">
          {icon && (
            <div className="absolute left-3 pointer-events-none text-gray-400">
              {icon}
            </div>
          )}
          
          <input
            ref={inputRef}
            id={id}
            name={name}
            type="text"
            className={`${className} ${icon ? 'pl-10' : ''} ${
              clearable && inputValue ? 'pr-16' : 'pr-10'
            }`}
            placeholder={placeholder}
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => inputValue.length >= minChars && setIsOpen(true)}
            disabled={disabled}
            {...rest}
          />
          
          <div className="absolute right-3 flex items-center space-x-1">
            {clearable && inputValue && !disabled && (
              <button
                type="button"
                onClick={handleClear}
                className="text-gray-400 hover:text-gray-600 p-1"
                tabIndex={-1}
              >
                <PiX size={16} />
              </button>
            )}
            
            <div className="text-gray-400">
              {loading ? (
                <div className="animate-spin w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full" />
              ) : (
                <PiCaretDown
                  size={16}
                  className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
                />
              )}
            </div>
          </div>
        </div>

        {isOpen && !disabled && (
          <div ref={dropdownRef} className={dropdownClasses} style={{ maxHeight }}>
            <div className="py-1 overflow-y-auto" style={{ maxHeight }}>
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option, index) => (
                  <div
                    key={`${option.value}-${index}`}
                   ref={(el) => {
  optionRefs.current[index] = el;
}}

                    className={`px-3 py-2 cursor-pointer hover:bg-blue-50 ${
                      index === highlightedIndex ? 'bg-blue-100' : ''
                    } ${selectedOption?.value === option.value ? 'bg-blue-50' : ''}`}
                    onClick={() => handleOptionSelect(option)}
                  >
                    <div className="text-sm text-gray-900">
                      {highlightText(option.text, inputValue)}
                    </div>
                    {option.value !== option.text && (
                      <div className="text-xs text-gray-500">
                        {option.value}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="px-3 py-2 text-sm text-gray-500">
                  {noDataText}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      
      {extra && <div className="searchableInput-extra mt-1">{extra}</div>}
    </div>
  );
};


export default SearchableInput;