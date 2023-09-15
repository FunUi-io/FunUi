import * as React from 'react';

type DropDownProps = {
  funcss?: string;
  children: React.ReactNode;
  id?: string;
  side?: string;
  drop?: string;
};

const DropDown = ({ funcss, children, id, side, drop }: DropDownProps) => {
  return (
    <div className={`${drop ? 'drop' + drop : 'dropdown'} ${side ? side : 'left'} ${funcss}`} id={id}>
      {children}
    </div>
  );
};

export default DropDown;
