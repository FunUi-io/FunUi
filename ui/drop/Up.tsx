import * as React from 'react';

type DropUpProps = {
  funcss?: string;
  children: React.ReactNode;
  id?: string;
  side?: string;
};

const DropUp = ({ funcss, children, id, side,  }: DropUpProps) => {
  return (
    <div className={`dropup ${side ? side : 'left'} ${funcss}`} id={id}>
      {children}
    </div>
  );
};

export default DropUp; 