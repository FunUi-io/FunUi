'use client';
import * as React from 'react';

type ViewProps = {
  children?: React.ReactNode;
  content?: React.ReactNode;
  funcss?: string;
  customStyle?: React.CSSProperties;

  // Dimensions
  height?: string;
  width?: string;
  minHeight?: string;
  maxHeight?: string;
  minWidth?: string;
  maxWidth?: string;

  // Spacing
  padding?: string;
  margin?: string;
  gap?: string;

  // Layout & Display
  fit?: boolean;
  display?: React.CSSProperties['display'];
  flexDirection?: React.CSSProperties['flexDirection'];
  justifyContent?: React.CSSProperties['justifyContent'];
  alignItems?: React.CSSProperties['alignItems'];

  // Styling
  background?: string;
  color?: string;
  border?: string;
  borderRadius?: string;
  boxShadow?: string;

  // Positioning
  position?: React.CSSProperties['position'];
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  zIndex?: number;
  overflow?: React.CSSProperties['overflow'];

  // Accessibility & IDs
  id?: string;
  title?: string;
  role?: string;
  ariaLabel?: string;

  // Events
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
  onFocus?: React.FocusEventHandler<HTMLDivElement>;
  onBlur?: React.FocusEventHandler<HTMLDivElement>;
};

const View = ({
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

  background,
  color,
  border,
  borderRadius,
  boxShadow,

  position,
  top,
  left,
  right,
  bottom,
  zIndex,
  overflow,

  id,
  title,
  role,
  ariaLabel,

  onClick,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,

  ...rest
}: ViewProps) => {
  return (
    <div
      id={id}
      title={title}
      role={role}
      aria-label={ariaLabel}
      className={`${fit ? 'width-100-p height-100-p' : ''} ${funcss}`}
      style={{
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
        background,
        color,
        border,
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
      }}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onFocus}
      onBlur={onBlur}
      {...rest}
    >
      {content || children}
    </div>
  );
};

export default View;
