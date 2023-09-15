import * as React from 'react';

interface ModalHeaderProps {
  funcss?: string;
  children: React.ReactNode;
  close?: React.ReactNode | '';
}

export default function ModalHeader({ funcss, children, close, ...rest }: ModalHeaderProps) {
  return (
    <div className={`${funcss} modal-title`} {...rest}>
      <div className="fit relative">
        {children} {close ? close : ''}
      </div>
    </div>
  );
}
