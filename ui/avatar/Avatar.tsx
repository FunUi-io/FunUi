'use client';

import { ReactNode, MouseEventHandler } from 'react';
import * as React from 'react';

interface AvatarProps {
  funcss?: string;
  children?: ReactNode;
  size?: number;
  bg?: string;
  bordered?: boolean;
  color?: string;
  content?: ReactNode;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

export default function Avatar({
  funcss,
  children,
  size = 2,
  bordered = true,
  bg,
  content,
  color,
  onClick,
  ...rest
}: AvatarProps) {
  return (
   <div>
     <div
      className={`
        animated 
        pointer
        fade-in 
        avatar 
        ${funcss || ''} 
        ${bg || 'lighter'} 
        ${bordered ? 'border' : ''}
        ${color ? `text-${color}` : ''}
      `}
      style={{
        width: `${size}rem`,
        height: `${size}rem`,
      }}
      onClick={onClick}
      {...rest}
    >
      {content || children}
    </div>
   </div>
  );
}
