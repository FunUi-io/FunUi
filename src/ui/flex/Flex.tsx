'use client';
import React from 'react';

interface FlexProps {
  className?: string;
  funcss?: string;
  id?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;

  // Flex container properties
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  wrap?: 'wrap' | 'nowrap' | 'wrap-reverse';
  justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
  alignItems?: 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline';
  alignContent?: 'stretch' | 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around';

  // Gap utilities
  gap?: number;
  gapX?: number;
  gapY?: number;
  gapUnit?: 'rem' | 'px' | 'em';

  // Responsive helpers
  responsiveSmall?: boolean;
  responsiveMedium?: boolean;
  responsiveLarge?: boolean;

  width?: string;
  height?: string;
  fit?: Boolean;
}

export default function Flex({
  className,
  funcss,
  id,
  children,
  style = {},

  // Flex container
  direction = 'row',
  wrap = 'wrap',
  justify,
  alignItems,
  alignContent,

  // Gap
  gap,
  gapX,
  gapY,
  gapUnit = 'rem',

  // Responsive
  responsiveSmall,
  responsiveMedium,
  responsiveLarge,
  fit,

  // Size
  width,
  height,

  ...rest
}: FlexProps) {
  const combinedClassName = [
    className,
    funcss,
    responsiveSmall && 'responsiveSmall',
    responsiveMedium && 'responsiveMedium',
    responsiveLarge && 'responsiveLarge',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      id={id}
      className={combinedClassName}
      style={{
        display: 'flex',
        flexDirection: direction,
        flexWrap: wrap,
        justifyContent: justify,
        alignItems: alignItems,
        alignContent: alignContent,
        gap: gap ? `${gap}${gapUnit}` : 0,
        columnGap: gapX  ? `${gapX}${gapUnit}` :  gap ? `${gap}${gapUnit}` : 0,
        rowGap: gapY ? `${gapY}${gapUnit}` :  gap ? `${gap}${gapUnit}` : 0,
        width: fit ? "100%" :  width ? width : 'fit-content',
        height: fit ? "100%" : height ? height : 'fit-content',
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
