'use client';
import * as React from 'react';

type TypographyProps = {
  id?: string; // Added id prop
  size?: "smaller" | "small" | "big" | "bigger" | "jumbo";
  bg?: string;
  color?: "color";
  children?: React.ReactNode;
  hoverBg?: string;
  hoverText?: "color";
  text?: string;
  heading?: "h1" | "h2" |"h3" |"h4" |"h5" |"h6" ;
  funcss?: "className";
  emp?: boolean;
  bold?: boolean;
  block?: boolean;
  body?: boolean;
  article?: boolean;
  light?: boolean;
  lighter?: boolean;
  italic?: boolean;
  underline?: boolean;
  align?: string;
  lineHeight?: string;
  letterSpacing?: string;
  monospace?: boolean;
  customStyles?: React.CSSProperties;
  onClick?: () => void; // Added onClick event
};

export default function Text({
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
  monospace,
  customStyles,
  ...rest
}: TypographyProps) {
  const mergedStyles: React.CSSProperties = {
    display: block ? 'block' : undefined,
    fontWeight: bold ? 'bold' : undefined,
    lineHeight: lineHeight ? lineHeight : undefined,
    letterSpacing: letterSpacing ? letterSpacing : undefined,
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
  ].filter(Boolean).join(' ');

 if(block){
  return (
    <div
      id={id} // Added id attribute
      className={classNames}
      style={mergedStyles}
      {...rest}
    >
      {children}
      {text}
    </div>
  );
 }else{
  return (
    <span
      id={id} // Added id attribute
      className={classNames}
      style={mergedStyles}
      {...rest}
    >
      {children}
      {text}
    </span>
  );
 }
}
