import * as React from 'react';
import {  PiSpinner , PiSpinnerDuotone , PiCircleNotch } from "react-icons/pi";

interface FunLoaderProps {
  funcss?: string;
  size?: string;
  fixed?: boolean;
  backdrop?: boolean;
  color?: string;
  variant: 'simple' | 'duotone'  | "circle"
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
        <PiSpinnerDuotone     className={`funLoader rotate ${funcss ? funcss : ''}  text-${color ? color : ''}`}
        style={{ fontSize: size ? size : '' }}
        />
        : variant === 'duotone'?
        <PiSpinnerDuotone     className={`funLoader rotate ${funcss ? funcss : ''}  text-${color ? color : ''}`}
        style={{ fontSize: size ? size : '' }}
        />
        : variant === 'circle'?
        <PiCircleNotch     className={`funLoader rotate ${funcss ? funcss : ''}  text-${color ? color : ''}`}
        style={{ fontSize: size ? size : '' }}
        />
        : <PiSpinner     className={`funLoader rotate ${funcss ? funcss : ''}  text-${color ? color : ''}`}
        style={{ fontSize: size ? size : '' }}
        />
     }
    </div>
  );
}
