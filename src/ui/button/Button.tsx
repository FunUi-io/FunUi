'use client';
import React, { ReactNode, MouseEvent, useEffect, useState } from 'react';
import { PiInfo, PiCheck, PiWarning, PiX, PiSpinner } from 'react-icons/pi';
import { useComponentConfiguration } from '../../utils/componentUtils';
import { getDynamicIcon } from '../../utils/getDynamicIcon';

interface ButtonProps {
  color?: string;
  bg?: string;
  funcss?: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  stringPrefix?: string;
  stringSuffix?: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
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
    fillAnimation: fillAnimation ?? mergedProps.fillAnimation,
    fillDirection: fillDirection ?? mergedProps.fillDirection,
    fillTextColor: fillTextColor ?? mergedProps.fillTextColor,
    funcss: funcss ?? mergedProps.funcss,
    fullWidth: fullWidth ?? mergedProps.fullWidth,
    stringPrefix: stringPrefix ?? mergedProps.stringPrefix,
    stringSuffix: stringSuffix ?? mergedProps.stringSuffix,
  };

  const [prefixNode, setPrefixNode] = useState<ReactNode>(null);
  const [suffixNode, setSuffixNode] = useState<ReactNode>(null);
  const [hasValidStringPrefix, setHasValidStringPrefix] = useState(false);
  const [hasValidStringSuffix, setHasValidStringSuffix] = useState(false);

  function isReactElement(node: any): node is React.ReactElement {
    return React.isValidElement(node);
  }

  // Handle stringPrefix - only load if we have a valid string
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

  // Handle stringSuffix - only load if we have a valid string
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

  // Determine which prefix to show with proper priority
  const showPrefix = React.useMemo(() => {
    // Priority order: status > startIcon (local) > prefix (local) > stringPrefix (dynamic)
    if (final.status) return true;
    if (startIcon) return true;
    if (prefix) return true;
    if (hasValidStringPrefix && prefixNode) return true;
    return false;
  }, [final.status, startIcon, prefix, hasValidStringPrefix, prefixNode]);

  // Determine which suffix to show with proper priority
  const showSuffix = React.useMemo(() => {
    // Priority order: endIcon (local) > suffix (local) > stringSuffix (dynamic)
    if (endIcon) return true;
    if (suffix) return true;
    if (hasValidStringSuffix && suffixNode) return true;
    return false;
  }, [endIcon, suffix, hasValidStringSuffix, suffixNode]);

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
    
    return (
      <span className={className} style={iconWrapperStyle}>
        {isReactElement(icon) ? React.cloneElement(icon, { size: iconSize }) : icon}
      </span>
    );
  };

  return (
    <span>
      <button
      disabled={disabled || final.isLoading || false}
        className={`${classNames} ${(showPrefix || showSuffix || final.isLoading) ? 'iconic' : ''}`}
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
            {/* Status icons have highest priority */}
            {final.status && (
              <span className="btn_left_icon" style={iconWrapperStyle}>
                {final.status === 'success' && <PiCheck size={iconSize} />}
                {final.status === 'info' && <PiInfo size={iconSize} />}
                {final.status === 'warning' && <PiWarning size={iconSize} />}
                {final.status === 'error' && <PiX size={iconSize} />}
              </span>
            )}
            
            {/* Regular prefix icons (only show if no status) */}
            {!final.status && showPrefix && (
              <>
                {/* Priority: startIcon > prefix > stringPrefix */}
                {startIcon && renderIcon(startIcon, 'btn_left_icon')}
                {!startIcon && prefix && renderIcon(prefix, 'btn_left_icon')}
                {!startIcon && !prefix && hasValidStringPrefix && renderIcon(prefixNode, 'btn_left_icon')}
              </>
            )}
          </>
        )}

        {final.fillAnimation && <span className={`button_fill_span ${effectiveBg}`}></span>}
        {children ? children : final.text ? final.text : ""}

        {/* Suffix icons */}
        {showSuffix && (
          <>
            {/* Priority: endIcon > suffix > stringSuffix */}
            {endIcon && renderIcon(endIcon, 'btn_right_icon')}
            {!endIcon && suffix && renderIcon(suffix, 'btn_right_icon')}
            {!endIcon && !suffix && hasValidStringSuffix && renderIcon(suffixNode, 'btn_right_icon')}
          </>
        )}
      </button>
    </span>
  );
}