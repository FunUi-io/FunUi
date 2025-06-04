import React from 'react';
import { PiQuotesLight } from 'react-icons/pi';

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
  opacity?: number;
  zIndex?: number;
  transform?: string;
  customStyles?: React.CSSProperties;
  onClick?: () => void;
  children?: React.ReactNode;

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
  textShadow,
  textAlign,
  customStyles,
  monospace,
  quote,
  size = 'base', // default

  ...rest
}) => {
  const Tag = block ? 'div' : 'span';

  const sizeClass = `${size === 'h1' ? `h1` : 
    size === 'h2' ? `h2` : 
    size === 'h3' ? `h3` : 
    size === 'h4' ? `h4` : 
    size === 'h5' ? `h5` : 
    size === 'h6' ? `h6` : 
    `text-${size}`}`;

  const mergedStyles: React.CSSProperties = {
    display: block ? 'block' : undefined,
    fontWeight: bold ? 'bold' : weight ? weight : undefined,
    lineHeight,
    letterSpacing,
    textTransform,
    textDecoration,
    fontFamily,
    textShadow,
    textAlign,
    whiteSpace,
    wordBreak,
    transform: customStyles?.transform,
    ...customStyles,
  };

  const classNames = [
    funcss || '',
    sizeClass,
    color ? `text-${color}` : '',
    align ? `text-${align}` : '',
    monospace ? 'monospace' : '',
    bg || '',
    hoverText ? `hover-text-${hoverText}` : '',
    hoverBg ? `hover-${hoverBg}` : '',
    light ? 'lightText' : lighter ? 'lighterText' : '',
    italic ? 'italicText' : '',
    underline ? 'underlineText' : '',
    body ? 'body' : '',
    article ? 'article' : '',
    emp ? 'emp' : '',
    bold ? 'bold' : '',
    uppercase ? 'uppercase' : '',
    lowercase ? 'lowercase' : '',
    capitalize ? 'capitalize' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Tag id={id} className={classNames} style={mergedStyles} {...rest}>
      {quote && (
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
