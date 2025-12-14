'use client'; 
import React, { useState, useRef, useEffect } from 'react';

type Position = 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

interface DropdownItem {
  label: React.ReactNode;
  onClick?: () => void;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  disabled?: boolean;
  divider?: boolean;
}

interface DropdownProps {
  position?: Position;
  button: React.ReactNode;
  items: DropdownItem[];
  hoverable?: boolean;
  openOnHover?: boolean;
  closableOnlyOutside?: boolean;
  className?: string;
  menuClassName?: string;
  width?: string;
  minWidth?: string;
  maxWidth?: string;
  height?: string;
  minHeight?: string;
  maxHeight?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  position = 'bottom',
  button,
  items,
  hoverable = true,
  openOnHover = true,
  closableOnlyOutside = false,
  className = '',
  menuClassName = '',
  width,
  minWidth,
  maxWidth,
  height,
  minHeight,
  maxHeight,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (openOnHover) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openOnHover]);

  const showMenu = openOnHover || open;

  const menuStyle: React.CSSProperties = {
    width,
    minWidth,
    maxWidth,
    height,
    minHeight,
    maxHeight,
  };

  return (
    <div
      ref={containerRef}
      className={`dropdown-container ${className}`}
      onMouseEnter={() => openOnHover && setOpen(true)}
      onMouseLeave={() => openOnHover && setOpen(false)}
    >
      <div
        onClick={() => !openOnHover && setOpen(!open)}
        style={{ cursor: !openOnHover ? 'pointer' : undefined }}
      >
        {button}
      </div>
      
      {showMenu && (
        <div
          className={`dropdown-menu ${position} ${menuClassName}`}
          style={menuStyle}
        >
          {items.map((item, index) => (
            <React.Fragment key={index}>
              {item.divider ? (
                <div className="dropdown-divider" />
              ) : (
                <div
                  className={`dropdown-item ${item.disabled ? 'disabled' : ''} ${!hoverable ? 'no-hover' : ''}`}
                  onClick={() => {
                    if (item.disabled) return;
                    if (!closableOnlyOutside) {
                      item.onClick?.();
                      if (!openOnHover) setOpen(false);
                    }
                  }}
                >
                  {item.startIcon && (
                    <span className="dropdown-item-icon">
                      {item.startIcon}
                    </span>
                  )}
                  <span className="dropdown-item-label">{item.label}</span>
                  {item.endIcon && (
                    <span className="dropdown-item-icon">
                      {item.endIcon}
                    </span>
                  )}
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;