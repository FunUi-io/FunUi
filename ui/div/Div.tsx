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
  fit?: boolean;
  customStyle?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
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
  margin,
  fit,
  customStyle,
  ...rest
}: DivProps) => {
  return (
    <div>

        <div
          className={`${fit ? 'width-100-p height-100-p' : ''} ${funcss}`}
          style={{
            height: height || '',
            maxHeight: maxHeight || '',
            minHeight: minHeight || '',
            maxWidth: maxWidth || '',
            minWidth: minWidth || '',
            width: width || '',
            padding: padding || '',
            margin: margin || '',
            ...customStyle
          }}
          {...rest}
        >
          {content || children}
        </div>
    </div>
  );
};

export default Div;
