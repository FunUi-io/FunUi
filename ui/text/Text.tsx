import React from 'react';
import { PiQuotesLight } from 'react-icons/pi';

type TypographyProps = {
  id?: string;
  size?: "smaller" | "small" | "big" | "bigger" | "jumbo" | "minified";
  bg?: string;
  color?: string;
  children?: React.ReactNode;
  hoverBg?: string;
  hoverText?: string;
  monospace?: boolean;
  text?: string;
  heading?: "h1" | "h2" |"h3" |"h4" |"h5" |"h6" ;
  funcss?: string;
  emp?: boolean;
  bold?: boolean;
  block?: boolean;
  body?: boolean;
  article?: boolean;
  light?: boolean;
  lighter?: boolean;
  italic?: boolean;
  underline?: boolean;
  quote?:boolean;
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
};

const Text: React.FC<TypographyProps> = ({
  id,
  size,
  bg,
  color,
  children,
  hoverBg,
  hoverText,
  text,
  heading,
  funcss,
  emp,
  bold,
  block,
  body,
  article,
  light,
  lighter,
  italic,
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
  ...rest
}) => {
  const mergedStyles: React.CSSProperties = {
    display: block ? 'block' : undefined,
    fontWeight: bold ? 'bold' : undefined,
    lineHeight: lineHeight ? lineHeight : undefined,
    letterSpacing: letterSpacing ? letterSpacing : undefined,
    textTransform: textTransform ? textTransform : undefined,
    textDecoration: textDecoration ? textDecoration : undefined,
    fontFamily: fontFamily ? fontFamily : undefined,
    textShadow: textShadow ? textShadow : undefined,
    textAlign: textAlign ? textAlign : undefined,
    whiteSpace: whiteSpace ? whiteSpace : undefined,
    wordBreak: wordBreak ? wordBreak : undefined,
    transform: customStyles?.transform,
    ...customStyles,
  };

  const classNames = [
    size ? `text-${size}` : '',
    color ? `text-${color}` : '',
    align ? `text-${align}` : '',
    monospace ? 'monospace' : '',
    bg ? bg : '',
    hoverText ? `hover-text-${hoverText}` : '',
    hoverBg ? `hover-${hoverBg}` : '',
    light ? 'lightText' : lighter ? 'lighterText' : '',
    heading ? heading : '',
    italic ? 'italicText' : '',
    underline ? 'underlineText' : '',
    body ? 'body' : '',
    article ? 'article' : '',
    funcss ? funcss : '',
    emp ? 'emp' : '',
    bold ? 'bold' : '',
    uppercase ? 'uppercase' : '',
    lowercase ? 'lowercase' : '',
    capitalize ? 'capitalize' : '',
  ].filter(Boolean).join(' ');

  const HeadingTag = heading ? heading : block ? "div" : 'span';

  return (
    <HeadingTag
      id={id}
      className={classNames}
      style={mergedStyles}
      {...rest}
    >
      {quote && <div className=""><PiQuotesLight /></div>}
      {children}
      {text}
    </HeadingTag>
  );
};

export default Text;
