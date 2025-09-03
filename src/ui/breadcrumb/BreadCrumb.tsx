'use client'; 
import * as React from 'react';
import { PiCaretLeft, PiCaretRight } from 'react-icons/pi';
interface BreadCrumbProps {
  type?: 'slash' | 'greater' | 'less' | 'straight';
  funcss?: string;
  color?: string;
}

export default function BreadCrumb({ type, funcss, color }: BreadCrumbProps) {
  return (
    <span >
      {type === 'slash' && (
        <span
        style={{lineHeight:"0"}}
          className={` ${funcss ? funcss : ''} ${color ? 'text-' + color : ''}`}
        >
          {' / '}
        </span>
      )}
      {type === 'greater' && (
        <span
          className={` ${funcss ? funcss : ''} ${color ? 'text-' + color : ''}`}
        >
          <span    style={{lineHeight:"0"}} className={`${color ?  `text-${color}` : ''}`}>
         <PiCaretRight  />
         </span>
        </span>
      )}
      {type === 'less' && (
        <span
          className={` ${funcss ? funcss : ''} ${color ? 'text-' + color : ''}`}
        > <span     style={{lineHeight:"0"}} className={`${color ?  `text-${color}` : ''}`}>
          <PiCaretLeft  />
          </span>
        </span>
      )}
      {type === 'straight' && (
        <span
        style={{lineHeight:"0"}}
          className={` ${funcss ? funcss : ''} ${color ? 'text-' + color : ''}`}
        >
          {' | '}
        </span>
      )}
    </span>
  );
}
