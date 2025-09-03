import * as React from 'react';

type HrProps = {
  children: React.ReactNode;
  funcss?: string;
};

const Hr = ({ children, funcss }: HrProps) => {
  return (
    <div className={`hr ${funcss}`}>
      {children}
    </div>
  );
};

export default Hr;
