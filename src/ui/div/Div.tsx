'use client'; 
import * as React from 'react';

type DivProps = {
  children?: React.ReactNode;
  funcss?: string;
  content?: React.ReactNode;
  minHeight?: string;
  maxHeight?: string;
  maxWidth?: string;
  minWidth?: string;
  height?: string;
  width?: string;
  padding?: string;
  margin?: string;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  fit?: boolean;
  ref?: React.Ref<HTMLDivElement>;
  customStyle?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
  onMouseOver?: React.MouseEventHandler<HTMLDivElement>;
  onMouseOut?: React.MouseEventHandler<HTMLDivElement>;
};

const Div = ({
  children,
  funcss,
  content,
  minHeight,
  maxHeight,
  maxWidth,
  minWidth,
  height,
  width,
  padding,
  className,
  style,
  margin,
  id,
  fit,
  ref,
  customStyle,
  onClick,
  onMouseEnter,
  onMouseLeave,
  onMouseOver,
  onMouseOut,
  ...rest
}: DivProps) => {
  return (
    <div
      ref={ref}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      onClick={onClick}
    >
      <div
        className={`${fit ? 'width-100-p height-100-p' : ''} ${funcss} ${className || ''}`}
        style={{
          height: height || '',
          maxHeight: maxHeight || '',
          minHeight: minHeight || '',
          maxWidth: maxWidth || '',
          minWidth: minWidth || '',
          width: width || '',
          padding: padding || '',
          margin: margin || '',
          ...style,
          ...customStyle
        }}
        id={id}
        {...rest}
      >
        {content || children}
      </div>
    </div>
  );
};

export default Div;

