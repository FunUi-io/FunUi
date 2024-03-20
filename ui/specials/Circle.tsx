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
    key?:React.key
    onClick?: ()=> void
  }
  

export default function Circle({
  size,
  funcss,
  bg,
  children,
  hoverable,
  raised ,
  key , 
  onClick ,
  ...rest
}: Circle_Props) {
  return (
      <div
        className={`pointer avatar ${funcss || ''}  ${raised ? "raised" : ''} ${bg || ''} ${
          hoverable ? 'hoverable' : ''
        }`}
        style={{
          width: `${size + "rem" || '2.3rem'}`,
          height: `${size + "rem" || '2.3rem'}`,
        }}
        key={key}
        onClick={onClick}
        {...rest}
      >
        <>{ children}</>
      </div>
  );
}
