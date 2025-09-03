import * as React from 'react';

type DropDownProps = {
  funcss?: string;
  children: React.ReactNode;
  id?: string;
  side?: string;
};

const DropDown = ({ funcss, children, id, side,  }: DropDownProps) => {
  return (
    <div className={`dropdown ${side ? side : 'left'} ${funcss}`} id={id}>
      {children}
    </div>
  );
};

export default DropDown; 