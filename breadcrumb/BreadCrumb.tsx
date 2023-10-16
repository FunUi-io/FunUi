import * as React from 'react';
import { PiCaretLeft, PiCaretRight } from 'react-icons/pi';
interface BreadCrumbProps {
  type?: 'slash' | 'greater' | 'less' | 'straight';
  funcss?: string;
  color?: string;
}

export default function BreadCrumb({ type, funcss, color }: BreadCrumbProps) {
  return (
    <span>
      {type === 'slash' && (
        <span
          style={{
            margin: '0 0.2rem',
          }}
          className={` ${funcss ? funcss : ''} ${color ? 'text-' + color : ''}`}
        >
          {' / '}
        </span>
      )}
      {type === 'greater' && (
        <span
          style={{
            margin: '0 0.2rem',
          }}
          className={` ${funcss ? funcss : ''} ${color ? 'text-' + color : ''}`}
        >
          <span className={`${color ?  `text-${color}` : ''}`}>
         <PiCaretRight  />
         </span>
        </span>
      )}
      {type === 'less' && (
        <span
          style={{
            margin: '0 0.2rem',
          }}
          className={` ${funcss ? funcss : ''} ${color ? 'text-' + color : ''}`}
        > <span className={`${color ?  `text-${color}` : ''}`}>
          <PiCaretLeft  />
          </span>
        </span>
      )}
      {type === 'straight' && (
        <span
          style={{
            margin: '0 0.2rem',
          }}
          className={` ${funcss ? funcss : ''} ${color ? 'text-' + color : ''}`}
        >
          {' | '}
        </span>
      )}
    </span>
  );
}
