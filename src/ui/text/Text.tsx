'use client'
import React from 'react';
import { PiQuotesLight } from 'react-icons/pi';
import { getCssVariableValue } from '../../utils/getCssVariable';
import { useComponentConfiguration } from '../../utils/componentUtils';

type TypographyProps = {
  id?: string;
  text?: React.ReactNode;
  funcss?: string;
  bg?: string;
  color?: string;
  hoverBg?: string;
  hoverText?: string;
  monospace?: boolean;
  emp?: boolean;
  bold?: boolean;
  block?: boolean;
  body?: boolean;
  article?: boolean;
  light?: boolean;
  lighter?: boolean;
  italic?: boolean;
  underline?: boolean;
  weight?: number;
  quote?: boolean;
  align?: "left" | "center" | "right" | "justify";
  lineHeight?: string;
  letterSpacing?: string;
  uppercase?: boolean;
  lowercase?: boolean;
  capitalize?: boolean;
  textDecoration?: "none" | "underline" | "overline" | "line-through";
  textTransform?: "none" | "capitalize" | "uppercase" | "lowercase";
  whiteSpace?: "normal" | "nowrap" | "pre" | "pre-line" | "pre-wrap";
  wordBreak?: "normal" | "break-all" | "keep-all" | "break-word";
  fontFamily?: string;
  textShadow?: string;
  textAlign?: "left" | "center" | "right" | "justify";
  opacity?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  zIndex?: number;
  truncate?: number;
  transform?: string;
  customStyles?: React.CSSProperties;
  onClick?: () => void;
  children?: React.ReactNode;
  variant?: string;
  margin?: string;
  padding?: string;
  style?: React.CSSProperties;
  size?: 
    | "xs" 
    | "sm" 
    | "base" 
    | "lg" 
    | "xl" 
    | "2xl" 
    | "3xl" 
    | "4xl" 
    | "5xl" 
    | "6xl"
    | "7xl"
    | "8xl"
    | "9xl"
    | "h1" 
    | "h2" 
    | "h3" 
    | "h4" 
    | "h5" 
    | "h6"
    | string
    ;
};

const Text: React.FC<TypographyProps> = ({
  id,
  bg,
  color,
  children,
  hoverBg,
  hoverText,
  text,
  funcss,
  emp,
  bold,
  block,
  body,
  article,
  light,
  lighter,
  italic,
  weight,
  underline,
  align,
  lineHeight,
  letterSpacing,
  uppercase,
  lowercase,
  capitalize,
  textDecoration,
  textTransform,
  whiteSpace,
  wordBreak,
  fontFamily,
  truncate,
  textShadow,
  textAlign,
  customStyles,
  monospace,
  quote,
  opacity,
  variant = '',
  size ,
  margin,
  style ,
  padding,
  ...rest
}) => {
  // Use component configuration (simplified - let the hook handle empty variant)
  const { mergeWithLocal } = useComponentConfiguration('Text', variant);
  
  // Create local props object - include ALL props
  const localProps = {
    bg,
    color,
    hoverBg,
    hoverText,
    funcss,
    emp,
    bold,
    block,
    body,
    article,
    light,
    lighter,
    italic,
    weight,
    underline,
    align,
    lineHeight,
    letterSpacing,
    uppercase,
    lowercase,
    capitalize,
    textDecoration,
    textTransform,
    whiteSpace,
    wordBreak,
    fontFamily,
    truncate,
    textShadow,
    textAlign,
    monospace,
    quote,
    opacity,
    size,
    margin,
    padding,
    ...rest
  };

  // Merge with config - LOCAL PROPS OVERRIDE CONFIG (consistent with Button)
  const { props: mergedProps } = mergeWithLocal(localProps);

  // Extract final values - use NULLISH COALESCING like Button component
  const final = {
    // Use local props first, fallback to merged props
    bg: bg ?? mergedProps.bg,
    color: color ?? mergedProps.color,
    hoverBg: hoverBg ?? mergedProps.hoverBg,
    hoverText: hoverText ?? mergedProps.hoverText,
    funcss: funcss ?? mergedProps.funcss,
    emp: emp ?? mergedProps.emp,
    bold: bold ?? mergedProps.bold,
    block: block ?? mergedProps.block,
    body: body ?? mergedProps.body,
    article: article ?? mergedProps.article,
    light: light ?? mergedProps.light,
    lighter: lighter ?? mergedProps.lighter,
    italic: italic ?? mergedProps.italic,
    weight: weight ?? mergedProps.weight,
    underline: underline ?? mergedProps.underline,
    align: align ?? mergedProps.align,
    lineHeight: lineHeight ?? mergedProps.lineHeight,
    letterSpacing: letterSpacing ?? mergedProps.letterSpacing,
    uppercase: uppercase ?? mergedProps.uppercase,
    lowercase: lowercase ?? mergedProps.lowercase,
    capitalize: capitalize ?? mergedProps.capitalize,
    textDecoration: textDecoration ?? mergedProps.textDecoration,
    textTransform: textTransform ?? mergedProps.textTransform,
    whiteSpace: whiteSpace ?? mergedProps.whiteSpace,
    wordBreak: wordBreak ?? mergedProps.wordBreak,
    fontFamily: fontFamily ?? mergedProps.fontFamily,
    truncate: truncate ?? mergedProps.truncate,
    textShadow: textShadow ?? mergedProps.textShadow,
    textAlign: textAlign ?? mergedProps.textAlign,
    monospace: monospace ?? mergedProps.monospace,
    quote: quote ?? mergedProps.quote,
    opacity: opacity ?? mergedProps.opacity,
    size: size ?? mergedProps.size ?? 'base',
    margin: margin ?? mergedProps.margin,
    text: text ?? mergedProps.text,
    padding: padding ?? mergedProps.padding,
  };

  // If margin is provided, force block display
  const shouldBeBlock = final.block || !!final.margin;
  const Tag = shouldBeBlock ? 'div' : 'span';

  const sizeClass = `${final.size === 'h1' ? `h1` : 
    final.size === 'h2' ? `h2` : 
    final.size === 'h3' ? `h3` : 
    final.size === 'h4' ? `h4` : 
    final.size === 'h5' ? `h5` : 
    final.size === 'h6' ? `h6` : 
    `text-${final.size}`}`;

  const mergedStyles: React.CSSProperties = {
    display: shouldBeBlock ? 'block' : undefined,
    fontWeight: final.bold ? 'bold' : final.weight ? final.weight : undefined,
    lineHeight: final.lineHeight,
    letterSpacing: final.letterSpacing,
    textTransform: final.textTransform,
    textDecoration: final.textDecoration,
    fontFamily: final.fontFamily,
    textShadow: final.textShadow,
    textAlign: final.textAlign,
    whiteSpace: final.whiteSpace,
    wordBreak: final.wordBreak,
    margin: final.margin,
    padding: final.padding,
    ...customStyles,
    ...style,
    ...(final.truncate
      ? {
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: final.truncate,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }
      : {}),
  };

  const classNames = [
    final.funcss || '',
    sizeClass,
    final.color ? ` text-${final.color} ` : '',
    final.align ? ` text-${final.align} ` : '',
    final.monospace ? 'monospace' : '',
    final.bg || '',
    final.hoverText ? `hover-text-${final.hoverText}` : '',
    final.hoverBg ? `hover-${final.hoverBg}` : '',
    final.light ? 'lightText' : final.lighter ? 'lighterText' : '',
    final.italic ? 'italicText' : '',
    final.underline ? 'underlineText' : '',
    final.body ? 'body' : '',
    final.article ? 'article' : '',
    final.emp ? 'emp' : '',
    final.bold ? 'bold' : '',
    final.uppercase ? 'uppercase' : '',
    final.lowercase ? 'lowercase' : '',
    final.capitalize ? 'capitalize' : '',
    final.opacity ? 'opacity-' + final.opacity : '',
  ]
    .filter(Boolean)
    .join(' ');
  return (
  <Tag
    id={id}
    className={classNames}
    style={mergedStyles}
    {...rest}    
  >
    {final.quote && (
      <div>
        <PiQuotesLight />
      </div>
    )}
    {children}
    {final?.text}
  </Tag>
    
  );
};

export default Text;