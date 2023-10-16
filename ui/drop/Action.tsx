import * as React from 'react';

type DropActionProps = {
  children: React.ReactNode;
  funcss?: string;
};

const DropAction = ({ children, funcss }: DropActionProps) => {
  return (
    <div className={`drop-button ${funcss}`}>
      {children}
    </div>
  );
};

export default DropAction; 
