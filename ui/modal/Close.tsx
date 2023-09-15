import { HTMLProps } from 'react';
import * as React from 'react';
import { PiX } from 'react-icons/pi';
interface CloseModalProps extends HTMLProps<HTMLDivElement> {
  funcss?: string;
  onClick?: () => void;
}

export default function CloseModal({ funcss, onClick }: CloseModalProps) {
  return (
    <div className={`${funcss || ''} closeModal`} onClick={onClick}>
      <PiX />
    </div>
  );
}
