import * as React from 'react';
import { useState, useEffect } from 'react';

type DropMenuProps = {
  children: React.ReactNode;
  funcss?: string;
  hoverable?: string;
  duration?: number;
  animation?: string;
  state: boolean;
  id?: string;
  width?: string;
};

export default function DropMenu({
  children,
  funcss,
  hoverable,
  duration,
  animation,
  state,
  id,
  width,
}: DropMenuProps) {
  const [show, setshow] = useState(false);
  useEffect(() => {
    setshow(state);
  }, [state]);

  return (
    <div>
      {show ? (
        <div
          id={id}
          className={`drop-menu ${funcss} item-${hoverable ? hoverable : ''}`}
          style={{
            animation: ` ${duration ? duration : 0.2}s ${animation ? animation : 'ScaleUp'}`,
            width: width ? width : '100%',
          }}
        >
          {children}
        </div>
      ) : (
        ''
      )}
    </div>
  );
}
