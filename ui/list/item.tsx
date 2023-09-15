import * as React from 'react';

interface ListItemProps {
  children?: React.ReactNode;
  funcss?: string;
  content?: React.ReactNode;
}

export default function ListItem({
  children,
  funcss,
  content,
  ...rest
}: ListItemProps) {
  return (
    <li className={`list ${funcss ? funcss : ''}`} {...rest}>
      {children} {content}
    </li>
  );
}
