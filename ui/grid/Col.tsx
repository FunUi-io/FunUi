import  { ReactNode, HTMLProps } from 'react';
import * as React from 'react';
interface ColProps extends HTMLProps<HTMLDivElement> {
  sm?: number;
  md?: number;
  lg?: number;
  children: ReactNode;
  funcss?: string;
  id?: string;
}

export default function Col({
  sm,
  md,
  lg,
  children,
  funcss,
  id,
  ...rest
}: ColProps) {
  const classNames = [
    'col',
    sm ? `sm-${sm}` : '',
    md ? `md-${md}` : '',
    lg ? `lg-${lg}` : '',
    funcss || '',
  ].join(' ');

  return (
    <div id={id || ''} className={classNames} {...rest}>
      {children}
    </div>
  );
}
