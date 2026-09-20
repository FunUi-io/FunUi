'use client';
import React, { ReactNode, MouseEvent, useEffect, useState, useMemo } from 'react';
import { PiInfo, PiCheck, PiWarning, PiX, PiSpinner } from 'react-icons/pi';
import { useComponentConfiguration } from '../../utils/componentUtils';
import { getDynamicIcon } from '../../utils/getDynamicIcon';

interface ButtonProps {
  color?: string;
  bg?: string;
  funcss?: string;
  startIcon?: ReactNode | string;
  endIcon?: ReactNode | string;
  stringPrefix?: string;
  stringSuffix?: string;
  prefix?: ReactNode | string;
  suffix?: ReactNode | string;
  iconSize?: number | string;
  iconLineHeight?: string | number;
  text?: string;
  rounded?: boolean;
  raised?: boolean;
  height?: string;
  width?: string;
  float?: boolean;
  hoverUp?: boolean;
  fullWidth?: boolean;
  outlined?: boolean;
  small?: boolean;
  hoverless?: boolean;
  smaller?: boolean;
  big?: boolean;
  bigger?: boolean;
  jumbo?: boolean;
  flat?: boolean;
  hoverNone?: boolean;
  fillAnimation?: boolean;
  bold?: boolean;
  fillDirection?: string;
  fillTextColor?: string;
  buttonFillStyle?: React.CSSProperties;
  outlineSize?: number;
  isLoading?: boolean;
  variant?: string;
  url?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  status?: 'success' | 'warning' | 'info' | 'error';
  children?: React.ReactNode;
  style?: React.CSSProperties;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

export default function Button({
  variant = '',
  color,
  bg,
  funcss,
  startIcon,
  endIcon,
  stringPrefix,
  stringSuffix,
  prefix,
  suffix,
  iconSize,
  iconLineHeight = 0,
  text,
  rounded,
  raised,
  height,
  width,
  float,
  hoverUp,
  fullWidth,
  outlined,
  small,
  hoverless,
  smaller,
  big,
  bigger,
  jumbo,
  flat,
  hoverNone,
  fillAnimation,
  fillDirection,
  fillTextColor,
  type = 'button',
  outlineSize,
  isLoading,
  status,
  bold,
  children,
  style,
  url,
  onClick,
  disabled,
  ...rest
}: ButtonProps) {
  const { mergeWithLocal } = useComponentConfiguration('Button', variant);

  // Create local props object - these will override config props
  const localProps = {
    color,
    bg,
    funcss,
    text,
    rounded,
    raised,
    height,
    width,
    float,
    hoverUp,
    fullWidth,
    outlined,
    small,
    hoverless,
    smaller,
    big,
    bigger,
    jumbo,
    flat,
    hoverNone,
    fillAnimation,
    fillDirection,
    fillTextColor,
    disabled,
    outlineSize,
    isLoading,
    status,
    type,
    bold,
    stringPrefix,
    stringSuffix,
    ...rest,
  };

  // Merge with config - LOCAL PROPS OVERRIDE CONFIG
  const { props: mergedProps } = mergeWithLocal(localProps);

  // Extract final values - local props take precedence
  const final = {
    isLoading: isLoading ?? mergedProps.isLoading,
    status: status ?? mergedProps.status,
    text: text ?? mergedProps.text,
    outlined: outlined ?? mergedProps.outlined,
    bg: bg ?? mergedProps.bg,
    color: color ?? mergedProps.color,
    rounded: rounded ?? mergedProps.rounded,
    hoverless: hoverless ?? mergedProps.hoverless,
    bold: bold ?? mergedProps.bold,
    float: float ?? mergedProps.float,
    raised: raised ?? mergedProps.raised,
    hoverUp: hoverUp ?? mergedProps.hoverUp,
    flat: flat ?? mergedProps.flat,
    hoverNone: hoverNone ?? mergedProps.hoverNone,
    small: small ?? mergedProps.small,
    smaller: smaller ?? mergedProps.smaller,
    big: big ?? mergedProps.big,
    bigger: bigger ?? mergedProps.bigger,
    jumbo: jumbo ?? mergedProps.jumbo,
    type: type ?? mergedProps.type,
    fillAnimation: fillAnimation ?? mergedProps.fillAnimation,
    fillDirection: fillDirection ?? mergedProps.fillDirection,
    fillTextColor: fillTextColor ?? mergedProps.fillTextColor,
    funcss: funcss ?? mergedProps.funcss,
    fullWidth: fullWidth ?? mergedProps.fullWidth,
    stringPrefix: stringPrefix ?? mergedProps.stringPrefix,
    stringSuffix: stringSuffix ?? mergedProps.stringSuffix,
  };

  // State for dynamic icons
  const [dynamicStartIcon, setDynamicStartIcon] = useState<ReactNode>(null);
  const [dynamicEndIcon, setDynamicEndIcon] = useState<ReactNode>(null);
  const [dynamicPrefix, setDynamicPrefix] = useState<ReactNode>(null);
  const [dynamicSuffix, setDynamicSuffix] = useState<ReactNode>(null);
  const [dynamicStringPrefix, setDynamicStringPrefix] = useState<ReactNode>(null);
  const [dynamicStringSuffix, setDynamicStringSuffix] = useState<ReactNode>(null);

  // Function to check if a value is a string (dynamic icon)
  const isStringIcon = (icon: ReactNode | string | undefined): icon is string => {
    return typeof icon === 'string' && icon.trim() !== '';
  };

  // Function to check if a value is a ReactNode (static icon)
  const isReactNodeIcon = (icon: ReactNode | string | undefined): icon is ReactNode => {
    return icon !== undefined && !isStringIcon(icon) && React.isValidElement(icon as ReactNode);
  };

  // Load dynamic icons from string props
  useEffect(() => {
    // Handle startIcon if it's a string
    if (isStringIcon(startIcon)) {
      getDynamicIcon(startIcon).then((node) => {
        if (node) {
          setDynamicStartIcon(node);
        } else {
          setDynamicStartIcon(null);
        }
      });
    } else {
      setDynamicStartIcon(null);
    }

    // Handle endIcon if it's a string
    if (isStringIcon(endIcon)) {
      getDynamicIcon(endIcon).then((node) => {
        if (node) {
          setDynamicEndIcon(node);
        } else {
          setDynamicEndIcon(null);
        }
      });
    } else {
      setDynamicEndIcon(null);
    }

    // Handle prefix if it's a string
    if (isStringIcon(prefix)) {
      getDynamicIcon(prefix).then((node) => {
        if (node) {
          setDynamicPrefix(node);
        } else {
          setDynamicPrefix(null);
        }
      });
    } else {
      setDynamicPrefix(null);
    }

    // Handle suffix if it's a string
    if (isStringIcon(suffix)) {
      getDynamicIcon(suffix).then((node) => {
        if (node) {
          setDynamicSuffix(node);
        } else {
          setDynamicSuffix(null);
        }
      });
    } else {
      setDynamicSuffix(null);
    }
  }, [startIcon, endIcon, prefix, suffix]);

  // Load dynamic icons from stringPrefix and stringSuffix (backward compatibility)
  useEffect(() => {
    if (final.stringPrefix && final.stringPrefix.trim() !== '') {
      getDynamicIcon(final.stringPrefix).then((node) => {
        if (node) {
          setDynamicStringPrefix(node);
        } else {
          setDynamicStringPrefix(null);
        }
      });
    } else {
      setDynamicStringPrefix(null);
    }

    if (final.stringSuffix && final.stringSuffix.trim() !== '') {
      getDynamicIcon(final.stringSuffix).then((node) => {
        if (node) {
          setDynamicStringSuffix(node);
        } else {
          setDynamicStringSuffix(null);
        }
      });
    } else {
      setDynamicStringSuffix(null);
    }
  }, [final.stringPrefix, final.stringSuffix]);

  // Determine which start icon to show with proper priority
  const actualStartIcon = useMemo(() => {
    if (final.status) {
      // Status icons have highest priority for start position
      switch (final.status) {
        case 'success':
          return <PiCheck size={iconSize as any} />;
        case 'info':
          return <PiInfo size={iconSize as any} />;
        case 'warning':
          return <PiWarning size={iconSize as any} />;
        case 'error':
          return <PiX size={iconSize as any} />;
        default:
          return null;
      }
    }

    if (isStringIcon(startIcon)) {
      return dynamicStartIcon;
    }

    if (isReactNodeIcon(startIcon)) {
      return startIcon;
    }

    if (isStringIcon(prefix)) {
      return dynamicPrefix;
    }

    if (isReactNodeIcon(prefix)) {
      return prefix;
    }

    if (dynamicStringPrefix) {
      return dynamicStringPrefix;
    }

    return null;
  }, [
    final.status,
    startIcon,
    prefix,
    dynamicStartIcon,
    dynamicPrefix,
    dynamicStringPrefix,
    iconSize,
  ]);

  // Determine which end icon to show with proper priority
  const actualEndIcon = useMemo(() => {
    if (isStringIcon(endIcon)) {
      return dynamicEndIcon;
    }

    if (isReactNodeIcon(endIcon)) {
      return endIcon;
    }

    if (isStringIcon(suffix)) {
      return dynamicSuffix;
    }

    if (isReactNodeIcon(suffix)) {
      return suffix;
    }

    if (dynamicStringSuffix) {
      return dynamicStringSuffix;
    }

    return null;
  }, [endIcon, suffix, dynamicEndIcon, dynamicSuffix, dynamicStringSuffix]);

  const textColorClass = final.bg
    ? final.color
      ? final.color
      : !/\d/.test(final.bg) && !final.outlined
        ? ''
        : /[4-9]\d{2,}/.test(final.bg) && !final.outlined
          ? 'white'
          : final.bg.replace(/[0-9]/g, '')
    : final.color;

  // Determine background: status takes priority over bg prop
  const effectiveBg = final.status ? final.status : final.bg;

  const classNames = [
    'button',
    `text-${textColorClass}`,
    final.funcss || '',
    final.rounded ? 'roundBtn' : '',
    final.hoverless ? 'hoverless' : '',
    final.bold ? 'text-bold' : '',
    final.float ? 'floatBtn' : '',
    final.raised ? 'raisedBtn' : '',
    final.hoverUp ? 'hover-up' : '',
    final.flat ? 'flat' : '',
    final.hoverNone ? 'hoverNone' : '',
    final.small ? 'smallBtn' : final.smaller ? 'smallerBtn' : '',
    final.big ? 'bigBtn' : '',
    final.bigger ? 'biggerBtn' : '',
    final.jumbo ? 'jumboBtn' : '',
    final.outlined
      ? `outlined outline-${effectiveBg || ''} text-${final.color ? final.color : effectiveBg?.replace(/[0-9]/g, '')}`
      : effectiveBg || '',
    `${final.fillAnimation ? `${final.fillTextColor ? `hover-text-${final.fillTextColor}` : `hover-text-white`} button-fill fill-${final.fillDirection || 'left'}` : ''}`,
  ].join(' ');

  const iconWrapperStyle = {
    lineHeight: iconLineHeight,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  // Helper function to render icon with proper size
  const renderIcon = (icon: ReactNode, className: string = '') => {
    if (!icon) return null;
    
    // If it's a React element that we know accepts size prop
    if (React.isValidElement(icon)) {
      // Create a wrapper span and clone the icon with size prop if needed
      const iconProps: any = {};
      
      // Only add size prop if iconSize is provided and not already set
      if (iconSize && !(icon.props as any)?.size) {
        iconProps.size = iconSize;
      }
      
      // Only clone with props if we have props to add
      if (Object.keys(iconProps).length > 0) {
        return (
          <span className={className} style={iconWrapperStyle}>
            {React.cloneElement(icon, iconProps)}
          </span>
        );
      } else {
        // Otherwise just render the icon in a span
        return (
          <span className={className} style={iconWrapperStyle}>
            {icon}
          </span>
        );
      }
    }
    
    // If it's not a valid React element, just render it as is
    return (
      <span className={className} style={iconWrapperStyle}>
        {icon}
      </span>
    );
  };

  // Determine if we should show icons on left or right
  const hasStartIcon = Boolean(actualStartIcon);
  const hasEndIcon = Boolean(actualEndIcon);

  return (
    <span>
      <button
        type={final.type || 'button'}
        disabled={disabled || final.isLoading || false}
        className={`${classNames} ${(hasStartIcon || hasEndIcon || final.isLoading) ? 'iconic' : ''}`}
        style={{
          height: height ?? mergedProps.height ?? '',
          width: final.fullWidth ? '100%' : width ?? mergedProps.width ?? '',
          borderRadius: final.flat ? '0rem' : '',
          ...style,
        }}
        onClick={onClick || (url ? () => (window.location.href = url) : undefined)}
        {...mergedProps}
      >
        {/* If loading, show ONLY loading icon */}
        {final.isLoading ? (
          renderIcon(<PiSpinner className="rotate" />, 'btn_left_icon')
        ) : (
          <>
            {/* Start icon (includes status icons) */}
            {hasStartIcon && renderIcon(actualStartIcon, 'btn_left_icon')}
          </>
        )}

        {final.fillAnimation && <span className={`button_fill_span ${effectiveBg}`}></span>}
        {children ? children : final.text ? final.text : ""}

        {/* End icon */}
        {hasEndIcon && !final.isLoading && renderIcon(actualEndIcon, 'btn_right_icon')}
      </button>
    </span>
  );
}