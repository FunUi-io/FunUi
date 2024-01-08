import { HTMLProps } from 'react';
import * as React from 'react';
import { PiX } from 'react-icons/pi';
interface CloseModalProps extends HTMLProps<HTMLDivElement> {
  funcss?: string;
}

export default function CloseModal({ funcss, ...rest }: CloseModalProps) {
  return (
    <div className={`${funcss || ''} closeModal`} {...rest}>
     <div className="height-30 width-30">
     <PiX />
     </div>
    </div>
  );
}
