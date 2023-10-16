import React, { ReactNode, HTMLProps } from 'react';

interface CardFooterProps extends HTMLProps<HTMLDivElement> {
  funcss?: string;
  children?: ReactNode;
}

export default function CardFooter({ funcss, children, ...rest }: CardFooterProps) {
  return (
    <div className={`card-footer ${funcss || ''}`} {...rest}>
      {children}
    </div>
  );
}
