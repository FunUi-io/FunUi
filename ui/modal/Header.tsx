import * as React from 'react';

interface ModalHeaderProps {
  funcss?: string;
  children?: React.ReactNode;
  close?: React.ReactNode | '';
  title?:string
}

export default function ModalHeader({ funcss, children, close , title, ...rest }: ModalHeaderProps) {
  return (
    <div className={`${funcss} modal-title`} {...rest}>
        <div className="fit">{title ? title : children}</div> <div>{close ? close : ''}</div>
    </div>
  );
}
