import * as React from 'react';

type TableBodyProps = {
  children?: React.ReactNode;
  funcss?: string;
};

export default function TableBody({ children, funcss }: TableBodyProps) {
  return <tbody className={`${funcss ? funcss : ''}`}>{children ? children : ''}</tbody>;
}
