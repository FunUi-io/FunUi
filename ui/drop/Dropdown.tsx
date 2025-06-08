'use client';

import React, { useState, useRef, useEffect } from 'react';

type Position = 'left' | 'right';
type Direction = 'dropdown' | 'dropup';

interface DropdownItem {
  label: React.ReactNode;
  onClick?: () => void;
}

interface DropdownProps {
  direction?: Direction;
  position?: Position;
  button: React.ReactNode;
  items: DropdownItem[];
  hoverable?: boolean;
  openOnHover?: boolean;
  className?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  direction = 'dropdown',
  position = 'left',
  button,
  items,
  hoverable = true,
  openOnHover = true,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  const containerClass = `${direction} ${position} ${className}`.trim();
  const menuClass = `drop-menu${hoverable ? ' item-hoverable' : ''}`;

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

  return (
    <div
      ref={containerRef}
      className={containerClass}
      onMouseEnter={() => openOnHover && setOpen(true)}
      onMouseLeave={() => openOnHover && setOpen(false)}
    >
      <div
        className="drop-button"
        onClick={() => !openOnHover && setOpen(!open)}
        style={{ cursor: !openOnHover ? 'pointer' : undefined }}
      >
        {button}
      </div>

      <div
        className={menuClass}
        style={{ display: showMenu ? 'block' : 'none' }}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className="drop-item"
            onClick={() => {
              item.onClick?.();
              if (!openOnHover) setOpen(false);
            }}
          >
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
