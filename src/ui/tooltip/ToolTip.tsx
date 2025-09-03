import * as React from 'react';
import Tip from './Tip';

interface ToolTipProps {
  funcss?: string;
  children?: React.ReactNode;
}

export default function ToolTip({ funcss, children, ...rest }: ToolTipProps) {

  return (
    <span
 
      className={`tooltip ${funcss ?? ''}`}
      {...rest}
    >
      {children}
    </span>
  );
}
