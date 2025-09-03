import * as React from 'react';

interface ListProps {
  children?: React.ReactNode;
  funcss?: string;
  dark?: boolean;
  light?: boolean;
  stripped?: boolean;
  bordered?: boolean;
  hoverable?: boolean;
  roundItems?: boolean;
  gap?:number
}

export default function List({
  children,
  funcss,
  dark,
  light,
  stripped,
  bordered,
  hoverable,
  roundItems,
  gap,
  ...rest
}: ListProps) {
  return (
    <ul
      className={`list
        ${funcss ? funcss : ''}
        ${dark ? 'dark' : ''}
        ${light ? 'light' : ''}
        ${hoverable ? 'hoverableList' : ''}
        ${stripped ? 'stripped' : ''}
        ${bordered ? 'bordered' : ''}
        ${roundItems ? 'roundItems' : ''}
      `}
      style={{gap:gap ? gap + "rem" : ''}}
      {...rest}
    
    >
      {children}
    </ul>
  );
}
