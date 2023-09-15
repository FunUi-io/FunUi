import * as React from 'react';
interface ModalContentProps {
  funcss?: string;
  children: React.ReactNode;
}

export default function ModalContent({ funcss, children }: ModalContentProps) {
  return (
    <div className={`modal-body ${funcss}`}>
      {children}
    </div>
  );
}
