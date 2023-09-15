import * as React from 'react';

type DropupProps = {
  funcss?: string;
  children: React.ReactNode;
};

const Dropup = ({ funcss, children }: DropupProps) => {
  return (
    <div className={`dropup-hover ${funcss}`}>
      {children}
    </div>
  );
};

export default Dropup;
