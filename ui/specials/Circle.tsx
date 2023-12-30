'use client'
import { ReactNode, HTMLProps } from 'react';
import * as React from 'react'


interface Circle_Props extends HTMLProps<HTMLDivElement> {
    size?: number;
    funcss?: string;
    bg?: string;
    children?: ReactNode;
    hoverable?: boolean;
    raised?:boolean
  }
  

export default function Circle({
  size,
  funcss,
  bg,
  children,
  hoverable,
  raised ,
  ...rest
}: Circle_Props) {
  return (
    <div>
      <div
        className={`pointer avatar ${funcss || ''}  ${raised ? "raised" : ''} ${bg || ''} ${
          hoverable ? 'hoverable' : ''
        }`}
        style={{
          width: `${size + "rem" || '2.3rem'}`,
          height: `${size + "rem" || '2.3rem'}`,
        }}
        {...rest}
      >
        <>{ children}</>
      </div>
    </div>
  );
}
