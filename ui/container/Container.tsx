'use client'
import { ReactNode, CSSProperties, HTMLProps } from 'react';
import * as React from 'react';

interface ContainerProps extends HTMLProps<HTMLDivElement> {
  children?: ReactNode;
  funcss?: string;
  margin?: string;
  padding?: string;
  customStyle?: CSSProperties;
}

const Container: React.FC<ContainerProps> = ({
  children,
  funcss,
  margin,
  padding,
  customStyle,
  id,
  ...rest
}) => {
  return (
    <div
      id={id}
      className={`container ${funcss}`}
      style={{
        margin: margin || "",
        padding: padding || "",
        ...customStyle
      }}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Container;
