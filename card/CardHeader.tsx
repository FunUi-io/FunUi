import React, { ReactNode, HTMLProps } from 'react';

interface CardHeaderProps extends HTMLProps<HTMLDivElement> {
  funcss?: string;
  children?: ReactNode;
}

export default function CardHeader({ funcss, children, ...rest }: CardHeaderProps) {
  return (
    <div className={`card-header ${funcss || ''}`} {...rest}>
      {children}
    </div>
  );
}
