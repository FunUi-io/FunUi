'use client';
import React, { CSSProperties, HTMLAttributes, ReactNode } from 'react';

interface ViewProps extends Omit<HTMLAttributes<HTMLDivElement>, 'content'> {
  children?: ReactNode;
  content?: ReactNode;
  funcss?: string;
  customStyle?: CSSProperties;
  height?: string | number;
  width?: string | number;
  minHeight?: string | number;
  maxHeight?: string | number;
  minWidth?: string | number;
  maxWidth?: string | number;
  padding?: string | number;
  margin?: string | number;
  gap?: string | number;
  fit?: boolean;
  display?: CSSProperties['display'];
  flexDirection?: CSSProperties['flexDirection'];
  justifyContent?: CSSProperties['justifyContent'];
  alignItems?: CSSProperties['alignItems'];
  bg?: string;
  borderRadius?: string;
  boxShadow?: string;
  position?: CSSProperties['position'];
  top?: string | number;
  left?: string | number;
  right?: string | number;
  bottom?: string | number;
  zIndex?: number;
  overflow?: string;
}

function View(props: ViewProps) {
  const {
    children,
    content,
    funcss = '',
    customStyle = {},
    height,
    width,
    minHeight,
    maxHeight,
    minWidth,
    maxWidth,
    padding,
    margin,
    gap,
    fit,
    display,
    flexDirection,
    justifyContent,
    alignItems,
    bg,
    borderRadius,
    boxShadow,
    position,
    top,
    left,
    right,
    bottom,
    zIndex,
    overflow,
    ...rest
  } = props;

  const className = `${fit ? 'width-100-p height-100-p' : ''} ${funcss} ${bg ?? ''}`.trim();

  const style: CSSProperties = {
    display,
    flexDirection,
    justifyContent,
    alignItems,
    height,
    width,
    minHeight,
    maxHeight,
    minWidth,
    maxWidth,
    padding,
    margin,
    gap,
    borderRadius,
    boxShadow,
    position,
    top,
    left,
    right,
    bottom,
    zIndex,
    overflow,
    ...customStyle,
  };

  return (
    <div className={className} style={style} {...rest}>
      {content ?? children}
    </div>
  );
}

export default View;
