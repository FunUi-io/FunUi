import * as React from 'react';

interface RowFlexProps {
  className?: string;
  funcss?: string;
  content?: React.ReactNode;
  justify?: string;
  wrap?: 'wrap' | 'nowrap' | 'wrap-reverse';
  gap?: number;
  alignItems?: string;
  align?: string;
  responsiveSmall?: boolean;
  responsiveMedium?: boolean;
  id?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export default function RowFlex({
  className,
  funcss,
  content,
  justify,
  gap,
  alignItems,
  align,
  responsiveSmall,
  responsiveMedium,
  wrap = 'wrap',
  id,
  children,
  style,
  ...rest
}: RowFlexProps) {
  return (
    <div
      id={id ? id : ''}
      className={`
        row-flex ${className ? className : ''}
        ${funcss ? funcss : ''}
        ${responsiveSmall ? 'responsiveSmall' : responsiveMedium ? 'responsiveMedium' : ''}
      `}
      style={{
        justifyContent: justify ? justify : '',
        gap: gap ? gap + "rem": '',
        alignItems: alignItems ? alignItems : '',
        flexWrap:  wrap,
        ...style,
      }}
      {...rest}
    >
      {children} {content}
    </div>
  );
}

