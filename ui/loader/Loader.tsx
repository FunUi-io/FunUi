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
      
     {
        variant === 'simple'?
        <span className={`rotate ${funcss ? funcss : ''}  text-${color ? color : ''}`}>
            <PiSpinnerDuotone size={size}    
        />     </span>
        : variant === 'duotone'?
        <span className={`rotate ${funcss ? funcss : ''}  text-${color ? color : ''}`}>
        <PiSpinnerDuotone  size={size}   
        />     </span>
        : variant === 'circle'?
        <span className={`rotate ${funcss ? funcss : ''}  text-${color ? color : ''}`}>
        <PiCircleNotch size={size} 
        />
             </span>
        : <span className={`rotate ${funcss ? funcss : ''}  text-${color ? color : ''}`}>
          <PiSpinner/>
          </span>
     }

    </div>
  );
}
