'use client'
import React, { ReactNode, HTMLProps } from 'react';

interface CardFabProps extends HTMLProps<HTMLDivElement> {
  funcss?: string;
  position?: string;
  children?: ReactNode;
}

export default function CardFab({ funcss, position, children, ...rest }: CardFabProps) {
  return (
    <div className={`card-fab ${funcss || ''} ${position || ''}`} {...rest}>
      {children}
    </div>
  );
}
