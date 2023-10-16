import React, { ReactNode, HTMLProps } from 'react';

interface CardBodyProps extends HTMLProps<HTMLDivElement> {
  funcss?: string;
  children?: ReactNode;
}

export default  function CardBody({ funcss, children, ...rest }: CardBodyProps) {
  return (
    <div className={`card-body ${funcss || ''}`} {...rest}>
      {children}
    </div>
  );
}
