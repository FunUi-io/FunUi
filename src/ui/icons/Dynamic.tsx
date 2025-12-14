
'use client';
import React, { ReactElement, useEffect, useState } from 'react';
import { getDynamicIcon } from '../../utils/getDynamicIcon';

interface DynamicIconProps {
  iconName?: string | React.ReactNode;
  size?: number | string;
  color?: string;
  className?: string;
  funcss?: string;
  style?: React.CSSProperties;
  [key: string]: any;
}

const DynamicIcon: React.FC<DynamicIconProps> = ({
  iconName,
  size,
  color,
  className = '',
  funcss = '',
  style = {},
  ...rest
}) => {
  const [IconComponent, setIconComponent] = useState<React.ComponentType<any> | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadIcon = async () => {
      if (!iconName || typeof iconName !== 'string') {
        setIconComponent(null);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const Icon:any = await getDynamicIcon(iconName);
        setIconComponent(Icon);
      } catch (error) {
        console.error(`Failed to load icon "${iconName}":`, error);
        setIconComponent(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadIcon();
  }, [iconName]);

  // Helper function to handle React elements
  const handleReactElement = (element: ReactElement) => {
    const combinedClassName = `dynamic-icon ${funcss} ${className} ${element.props?.className || ''}`.trim();
    
    const combinedStyle: React.CSSProperties = {
      ...(element.props?.style || {}),
      ...style,
      ...(size && { fontSize: typeof size === 'number' ? `${size}px` : size }),
      ...(color && { color }),
    };

    const mergedProps = {
      ...element.props,
      ...rest,
      className: combinedClassName,
      style: combinedStyle,
    };

    return React.cloneElement(element, mergedProps);
  };

  // If no icon is provided
  if (!iconName) return null;

  // Handle React elements
  if (React.isValidElement(iconName)) {
    return handleReactElement(iconName);
  }

  // Handle string icons
  if (typeof iconName === 'string') {
    // Loading or error state
    if (isLoading || !IconComponent) {
      return (
        <span 
          className={`dynamic-icon-placeholder ${funcss} ${className}`.trim()}
          style={{ 
            ...style,
            display: 'inline-block',
            width: size ? (typeof size === 'number' ? `${size}px` : size) : '1em',
            height: size ? (typeof size === 'number' ? `${size}px` : size) : '1em',
          }}
          aria-label={isLoading ? 'Loading icon' : 'Icon not found'}
        />
      );
    }

    const combinedClassName = `dynamic-icon ${funcss} ${className}`.trim();
    const combinedStyle: React.CSSProperties = {
      ...style,
      ...(size && { fontSize: typeof size === 'number' ? `${size}px` : size }),
      ...(color && { color }),
    };

    return <IconComponent className={combinedClassName} style={combinedStyle} {...rest} />;
  }

  // Handle other React nodes (fallback)
  return iconName as React.ReactElement;
};

export default DynamicIcon;