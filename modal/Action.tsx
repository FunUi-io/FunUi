import * as React from 'react';

interface ModalActionProps extends React.HTMLProps<HTMLDivElement> {
  funcss?: string;
  children?: React.ReactNode;
}

export default function ModalAction({ funcss, children, ...rest }: ModalActionProps) {
  return (
    <div className={`${funcss} modal-action`} {...rest}>
      {children}
    </div>
  );
}
