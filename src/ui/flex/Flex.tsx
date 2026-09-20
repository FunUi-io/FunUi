'use client';
import React from 'react';

interface FlexProps {
  className?: string;
  funcss?: string;
  id?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;

  // Flex container properties - support both full and shorthand values
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse' | 'col';
  wrap?: 'wrap' | 'nowrap' | 'wrap-reverse' | 'no-wrap';
  justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly' 
           | 'start' | 'end' | 'between' | 'around' | 'evenly';
  alignItems?: 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline' 
              | 'start' | 'end' | 'normal';
  alignContent?: 'stretch' | 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around'
                | 'start' | 'end' | 'between' | 'around';

  // Gap utilities
  gap?: number | string;
  gapX?: number | string;
  gapY?: number | string;
  gapUnit?: 'rem' | 'px' | 'em' | '%';

  // Responsive helpers
  responsiveSmall?: boolean;
  responsiveMedium?: boolean;
  responsiveLarge?: boolean;

  width?: string;
  height?: string;
  fit?: boolean;
  
  // Additional flex container props
  inline?: boolean;
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
  inline,

  // Size
  width,
  height,

  ...rest
}: FlexProps) {
  
  // Helper function to normalize flex values
  const normalizeFlexValue = (value: string | undefined, type: 'justify' | 'align' = 'justify'): string | undefined => {
    if (!value) return undefined;
    
    const mapping: Record<string, string> = {
      // Justify content mapping
      'start': 'flex-start',
      'end': 'flex-end',
      'between': 'space-between',
      'around': 'space-around',
      'evenly': 'space-evenly',
      // Align items/content mapping
      'normal': 'normal',
      // For alignContent, 'between' and 'around' are already correct
    };
    
    // If it's a shorthand, return the mapped value
    if (mapping[value]) {
      return mapping[value];
    }
    
    // If it's already a valid CSS value, return it as is
    return value;
  };
  
  // Normalize direction shorthand
  const getDirection = () => {
    if (direction === 'col') return 'column';
    return direction;
  };
  
  // Normalize wrap shorthand
  const getWrap = () => {
    if (wrap === 'no-wrap') return 'nowrap';
    return wrap;
  };
  
  // Helper to format gap values
  const formatGapValue = (value: number | string | undefined): string | undefined => {
    if (value === undefined || value === null) return undefined;
    
    // If it's already a string with unit, return as is
    if (typeof value === 'string' && (value.includes('px') || value.includes('rem') || value.includes('em') || value.includes('%'))) {
      return value;
    }
    
    // Otherwise, add the specified unit
    return `${value}${gapUnit}`;
  };

  const combinedClassName = [
    className,
    funcss,
    responsiveSmall && 'responsive-small',
    responsiveMedium && 'responsive-medium',
    responsiveLarge && 'responsive-large',
    inline && 'inline-flex',
  ]
    .filter(Boolean)
    .join(' ');

  // Build styles dynamically
  const flexStyles: React.CSSProperties = {
    display: inline ? 'inline-flex' : 'flex',
    flexDirection: getDirection(),
    flexWrap: getWrap(),
  };

  // Only add justify if provided
  if (justify) {
    flexStyles.justifyContent = normalizeFlexValue(justify, 'justify');
  }

  // Only add alignItems if provided
  if (alignItems) {
    flexStyles.alignItems = normalizeFlexValue(alignItems, 'align');
  }

  // Only add alignContent if provided
  if (alignContent) {
    flexStyles.alignContent = normalizeFlexValue(alignContent, 'align');
  }

  // Handle gap properties
  const formattedGap = formatGapValue(gap);
  const formattedGapX = formatGapValue(gapX);
  const formattedGapY = formatGapValue(gapY);

  if (formattedGap) {
    flexStyles.gap = formattedGap;
  }
  
  // Only set columnGap/rowGap if explicitly provided or if gap is set but gapX/gapY not
  if (formattedGapX !== undefined) {
    flexStyles.columnGap = formattedGapX;
  } else if (formattedGap) {
    flexStyles.columnGap = formattedGap;
  }
  
  if (formattedGapY !== undefined) {
    flexStyles.rowGap = formattedGapY;
  } else if (formattedGap) {
    flexStyles.rowGap = formattedGap;
  }

  // Handle width and height
  if (fit) {
    flexStyles.width = '100%';
    flexStyles.height = '100%';
  } else {
    if (width) flexStyles.width = width;
    if (height) flexStyles.height = height;
  }

  return (
    <div
      id={id}
      className={combinedClassName}
      style={{
        ...flexStyles,
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}