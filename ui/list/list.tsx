import * as React from 'react';

interface ListProps {
  children?: React.ReactNode;
  funcss?: string;
  content?: React.ReactNode;
  dark?: boolean;
  light?: boolean;
  stripped?: boolean;
  bordered?: boolean;
  hoverable?: boolean;
  roundItems?: boolean;
}

export default function List({
  children,
  funcss,
  content,
  dark,
  light,
  stripped,
  bordered,
  hoverable,
  roundItems,
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
      {...rest}
    >
      {children} {content}
    </ul>
  );
}
