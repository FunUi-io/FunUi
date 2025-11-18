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
    | "h6";
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
  size = 'base',
  margin,
  padding,
  ...rest
}) => {
  // Only use component config if variant is provided and not empty
  const shouldUseConfig = variant !== undefined && variant !== '';
  
  // Use the component config hook only when needed
  const { 
    mergeWithLocal 
  } = useComponentConfiguration('Text', shouldUseConfig ? variant : undefined);
  
  // Create local props object
  const localProps = {
    bg,
    color,
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

  // Merge config with local props - local props override config
  const { props: mergedProps } = shouldUseConfig 
    ? mergeWithLocal(localProps)
    : { props: localProps };

  // Extract final values - local props take precedence, handle empty strings properly
  const final = {
    bg: bg !== undefined ? bg : mergedProps.bg,
    color: color !== undefined ? color : mergedProps.color,
    funcss: funcss !== undefined ? funcss : mergedProps.funcss,
    emp: emp !== undefined ? emp : mergedProps.emp,
    bold: bold !== undefined ? bold : mergedProps.bold,
    block: block !== undefined ? block : mergedProps.block,
    body: body !== undefined ? body : mergedProps.body,
    article: article !== undefined ? article : mergedProps.article,
    light: light !== undefined ? light : mergedProps.light,
    lighter: lighter !== undefined ? lighter : mergedProps.lighter,
    italic: italic !== undefined ? italic : mergedProps.italic,
    weight: weight !== undefined ? weight : mergedProps.weight,
    underline: underline !== undefined ? underline : mergedProps.underline,
    align: align !== undefined ? align : mergedProps.align,
    lineHeight: lineHeight !== undefined ? lineHeight : mergedProps.lineHeight,
    letterSpacing: letterSpacing !== undefined ? letterSpacing : mergedProps.letterSpacing,
    uppercase: uppercase !== undefined ? uppercase : mergedProps.uppercase,
    lowercase: lowercase !== undefined ? lowercase : mergedProps.lowercase,
    capitalize: capitalize !== undefined ? capitalize : mergedProps.capitalize,
    textDecoration: textDecoration !== undefined ? textDecoration : mergedProps.textDecoration,
    textTransform: textTransform !== undefined ? textTransform : mergedProps.textTransform,
    whiteSpace: whiteSpace !== undefined ? whiteSpace : mergedProps.whiteSpace,
    wordBreak: wordBreak !== undefined ? wordBreak : mergedProps.wordBreak,
    fontFamily: fontFamily !== undefined ? fontFamily : mergedProps.fontFamily,
    truncate: truncate !== undefined ? truncate : mergedProps.truncate,
    textShadow: textShadow !== undefined ? textShadow : mergedProps.textShadow,
    textAlign: textAlign !== undefined ? textAlign : mergedProps.textAlign,
    monospace: monospace !== undefined ? monospace : mergedProps.monospace,
    quote: quote !== undefined ? quote : mergedProps.quote,
    opacity: opacity !== undefined ? opacity : mergedProps.opacity,
    size: size !== undefined ? size : mergedProps.size,
    margin: margin !== undefined ? margin : mergedProps.margin,
    padding: padding !== undefined ? padding : mergedProps.padding,
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
    hoverText ? `hover-text-${hoverText}` : '',
    hoverBg ? `hover-${hoverBg}` : '',
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
    <Tag id={id} className={classNames} style={mergedStyles} {...rest}>
      {final.quote && (
        <div>
          <PiQuotesLight />
        </div>
      )}
      {children}
      {text}
    </Tag>
  );
};

export default Text;