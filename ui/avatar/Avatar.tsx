'use client'; 
import  { ReactNode } from 'react';
import * as React from 'react'
interface AvatarProps {
  funcss?: string;
  children?: ReactNode;
  size?: number;
  bg?: string;
  bordered?:boolean ,
  color?: string,
  content?: ReactNode;
}

export default function Avatar({
  funcss,
  children,
  size = 2,
  bordered = true,
  bg,
  content,
  color 
}: AvatarProps) {
  return (
    <div
      className={`
        animated 
        fade-in 
        avatar 
        ${funcss || ''} 
        ${bg || 'lighter'} 
        ${bordered ? 'border' : ''}
      ${`text-${color}`}
      `}
      style={{
        width: `${size}rem`,
        height: `${size}rem`,
      }}
    >
      <>{content || children}</>
    </div>
  );
}
