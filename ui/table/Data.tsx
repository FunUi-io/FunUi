import * as React from 'react';

interface TableDataProps {
  children?: React.ReactNode;
  funcss?: string;
  key?: any;
}

export default function TableData({ children, funcss, key }: TableDataProps) {
  return (
    <td className={`${funcss}`} key={key}>
      {children}
    </td>
  );
}
