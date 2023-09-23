import * as React from 'react';

interface ListItemProps {
  children?: React.ReactNode;
  funcss?: string;
}

export default function ListItem({
  children,
  funcss,
  ...rest
}: ListItemProps) {
  return (
    <li className={`list ${funcss ? funcss : ''}`} {...rest}>
      {children}
    </li>
  );
}
