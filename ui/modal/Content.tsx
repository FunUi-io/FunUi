import * as React from 'react';
interface ModalContentProps {
  funcss?: string;
  children?: React.ReactNode;
  animation?: string;
  duration?: number;

}

export default function ModalContent({ funcss, children , animation, duration }: ModalContentProps) {
  return (
    <div className={`modal-body ${funcss}`} style={{animation: ` ${duration ? duration : 0.2}s ${animation ? animation : "ScaleUp"}`,}} >
      {children}
    </div>
  );
}
