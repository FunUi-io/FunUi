import * as React from 'react';
import {  PiSpinner , PiSpinnerDuotone , PiCircleNotch } from "react-icons/pi";

interface FunLoaderProps {
  funcss?: string;
  size?: number;
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
  ...rest
}: FunLoaderProps) {
  return (
    <div className={`${fixed ? 'fixedLoader' : ''} ${backdrop && fixed ? 'backdropLoader' : ''}`} {...rest}>
      
     {
        variant === 'simple'?
        <span className={`rotate ${funcss ? funcss : ''}  text-${color ? color : ''}`}>
            <PiSpinnerDuotone  style={{fontSize:size + "px" , display:'block'}}  />
          </span>
        : variant === 'duotone'?
        <span   className={`rotate ${funcss ? funcss : ''}  text-${color ? color : ''}`}>
        <PiSpinnerDuotone   
      
        style={{fontSize:size + "px" , display:'block'}}
        />     </span>
        : variant === 'circle'?
        <span  className={`rotate ${funcss ? funcss : ''}  text-${color ? color : ''}`}>
        <PiCircleNotch />
             </span>
        : <span  className={`rotate ${funcss ? funcss : ''}  text-${color ? color : ''}`}>
          <PiSpinner style={{fontSize:size + "px" , display:'block'}} />
          </span>
     }

    </div>
  );
}
