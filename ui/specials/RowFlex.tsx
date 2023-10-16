import * as React from 'react';

interface RowFlexProps {
  funcss?: string;
  content?: React.ReactNode;
  justify?: string;
  gap?: number;
  alignItems?: string;
  responsiveSmall?: boolean;
  responsiveMedium?: boolean;
  id?: string;
  children?: React.ReactNode;
}

export default function RowFlex({
  funcss,
  content,
  justify,
  gap,
  alignItems,
  responsiveSmall,
  responsiveMedium,
  id,
  children,
}: RowFlexProps) {
  return (
    <div
      id={id ? id : ''}
      className={`
        row-flex ${funcss ? funcss : ''}
        ${responsiveSmall ? 'responsiveSmall' : responsiveMedium ? 'responsiveMedium' : ''}
      `}
      style={{
        justifyContent: justify ? justify : '',
        gap: gap ? gap + "rem": '',
        alignItems: alignItems ? alignItems : '',
      }}
    >
      {children} {content}
    </div>
  );
}
