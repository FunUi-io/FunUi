import * as React from 'react';
import {  PiSpinner , PiSpinnerDuotone , PiCircleNotch } from "react-icons/pi";

interface FunLoaderProps {
  funcss?: string;
  size?: string;
  fixed?: boolean;
  backdrop?: boolean;
  color?: string;
  variant?: 'simple' | 'duotone'  | "circle"
}

export default function FunLoader({
  funcss,
  size,
  fixed,
  backdrop,
  color,
  variant ,
}: FunLoaderProps) {
  return (
    <div className={`${fixed ? 'fixedLoader' : ''} ${backdrop && fixed ? 'backdropLoader' : ''}`}>
      <span className={`funLoader rotate ${funcss ? funcss : ''}  text-${color ? color : ''}`}>
     {
        variant === 'simple'?
        <PiSpinnerDuotone size={size}    
        />
        : variant === 'duotone'?
        <PiSpinnerDuotone  size={size}   
        />
        : variant === 'circle'?
        <PiCircleNotch size={size} 
        />
        : <PiSpinner 
        />
     }
     </span>
    </div>
  );
}
