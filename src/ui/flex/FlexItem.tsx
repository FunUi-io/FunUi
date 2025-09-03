'use client';
import React from 'react';

interface FlexItemProps {
  className?: string;
  funcss?: string;
  id?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;

  // Flex item behaviors
  flex?: string;
  grow?: number;
  shrink?: number;
  basis?: string;
  alignSelf?: 'auto' | 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';

  // Size helpers
  fullWidth?: boolean;
  fullHeight?: boolean;
}

export default function FlexItem({
  className,
  funcss,
  id,
  children,
  style = {},

  // Flex item
  flex,
  grow,
  shrink,
  basis,
  alignSelf,

  // Size
  fullWidth,
  fullHeight,

  ...rest
}: FlexItemProps) {
  const combinedClassName = [className, funcss].filter(Boolean).join(' ');

  return (
    <div
      id={id}
      className={combinedClassName}
      style={{
        flex,
        flexGrow: flex ? undefined : grow,
        flexShrink: flex ? undefined : shrink,
        flexBasis: flex ? undefined : basis,
        alignSelf,
        width: fullWidth ? '100%' : undefined,
        height: fullHeight ? '100%' : undefined,
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
