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
  status?: 'success' | 'warning' | 'info' | 'danger';
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
    outlineSize,
    isLoading,
    status,
    bold,
    stringPrefix, // Include stringPrefix in local props
    stringSuffix, // Include stringSuffix in local props
    ...rest,
  };

  // Merge with config - LOCAL PROPS OVERRIDE CONFIG
  const { props: mergedProps } = mergeWithLocal(localProps);

  // Extract final values - local props take precedence
  const final = {
    // Use local props first, fallback to merged props
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
    stringPrefix: stringPrefix ?? mergedProps.stringPrefix, // Handle both local and config
    stringSuffix: stringSuffix ?? mergedProps.stringSuffix, // Handle both local and config
  };

  const [prefixNode, setPrefixNode] = useState<ReactNode>(null);
  const [suffixNode, setSuffixNode] = useState<ReactNode>(null);

  function isReactElement(node: any): node is React.ReactElement {
    return React.isValidElement(node);
  }

  // Handle both local and config stringPrefix
  useEffect(() => {
    const effectiveStringPrefix = final.stringPrefix;
    if (effectiveStringPrefix) {
      getDynamicIcon(effectiveStringPrefix).then((node) => setPrefixNode(node));
    } else {
      setPrefixNode(null); // Clear when empty
    }
  }, [final.stringPrefix]);

  // Handle both local and config stringSuffix
  useEffect(() => {
    const effectiveStringSuffix = final.stringSuffix;
    if (effectiveStringSuffix) {
      getDynamicIcon(effectiveStringSuffix).then((node) => setSuffixNode(node));
    } else {
      setSuffixNode(null); // Clear when empty
    }
  }, [final.stringSuffix]);

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
    `${final.fillAnimation ? `${final.fillTextColor ? `hover-text-${final.fillTextColor}` : ''} button-fill fill-${final.fillDirection || 'left'}` : ''}`,
  ].join(' ');

  const iconWrapperStyle = {
    lineHeight: iconLineHeight,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  // Determine which prefix to show (priority: status > local startIcon > config stringPrefix > local stringPrefix)
  const showPrefix = final.status || prefix || startIcon || prefixNode;
  
  // Determine which suffix to show
  const showSuffix = suffix || endIcon || suffixNode;

  return (
    <span>
      <button
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
          <span className="btn_left_icon rotate" style={iconWrapperStyle}>
            <PiSpinner size={iconSize} />
          </span>
        ) : (
          <>
            {/* If status exists, show status icon and ignore other prefixes */}
            {final.status ? (
              <span className="btn_left_icon" style={iconWrapperStyle}>
                {final.status === 'success' && <PiCheck size={iconSize} />}
                {final.status === 'info' && <PiInfo size={iconSize} />}
                {final.status === 'warning' && <PiWarning size={iconSize} />}
                {final.status === 'danger' && <PiX size={iconSize} />}
              </span>
            ) : (
              /* Otherwise show regular start icons (priority: local startIcon > config stringPrefix) */
              showPrefix && (
                <span className="btn_left_icon" style={iconWrapperStyle}>
                  {isReactElement(startIcon) ? React.cloneElement(startIcon, { size: iconSize })
                    : isReactElement(prefix) ? React.cloneElement(prefix, { size: iconSize })
                    : isReactElement(prefixNode) ? React.cloneElement(prefixNode, { size: iconSize })
                    : prefix || startIcon || prefixNode
                  }
                </span>
              )
            )}
          </>
        )}

        {final.fillAnimation && <span className={`button_fill_span ${effectiveBg}`}></span>}

        {children ? children : final.text ? final.text : ""}

        {showSuffix && (
          <span className="btn_right_icon" style={iconWrapperStyle}>
            {isReactElement(endIcon) ? React.cloneElement(endIcon, { size: iconSize })
              : isReactElement(suffix) ? React.cloneElement(suffix, { size: iconSize })
              : isReactElement(suffixNode) ? React.cloneElement(suffixNode, { size: iconSize })
              : suffix || endIcon || suffixNode
            }
          </span>
        )}
      </button>
    </span>
  );
}