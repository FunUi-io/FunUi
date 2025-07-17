'use client';
import React from 'react';

interface FlexProps {
  as?: keyof JSX.IntrinsicElements; // Render as any tag (e.g. section, ul)
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

  // Flex item behavior
  grow?: number;
  shrink?: number;
  basis?: string;
  flex?: string;

  // Responsive helpers
  responsiveSmall?: boolean;
  responsiveMedium?: boolean;
  responsiveLarge?: boolean;

  // Stretch helpers
  fullWidth?: boolean;
  fullHeight?: boolean;
}

export default function Flex({
  as: Component = 'div',
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

  // Flex item
  grow,
  shrink,
  basis,
  flex,

  // Responsive
  responsiveSmall,
  responsiveMedium,
  responsiveLarge,

  // Size
  fullWidth,
  fullHeight,
  ...rest
}: FlexProps) {
  const responsiveClasses = `
    ${responsiveSmall ? 'responsiveSmall' : ''}
    ${responsiveMedium ? 'responsiveMedium' : ''}
    ${responsiveLarge ? 'responsiveLarge' : ''}
  `.trim();

  return (
    <Component
      id={id}
      className={`
        ${className || ''}
        ${funcss || ''}
        ${responsiveClasses}
      `.trim()}
      style={{
        display: 'flex',
        flexDirection: direction,
        flexWrap: wrap,
        justifyContent: justify,
        alignItems: alignItems,
        alignContent: alignContent,
        gap: gap ? `${gap}${gapUnit}` : undefined,
        columnGap: gapX ? `${gapX}${gapUnit}` : undefined,
        rowGap: gapY ? `${gapY}${gapUnit}` : undefined,
        flexGrow: grow,
        flexShrink: shrink,
        flexBasis: basis,
        flex: flex,
        width: fullWidth ? '100%' : undefined,
        height: fullHeight ? '100%' : undefined,
        ...style,
      }}
      {...rest}
    >
      {children}
    </Component>
  );
}
