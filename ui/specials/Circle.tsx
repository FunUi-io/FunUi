'use client'
import { ReactNode, HTMLProps } from 'react';
import * as React from 'react'


interface Circle_Props extends HTMLProps<HTMLDivElement> {
    size?: number;
    funcss?: string;
    bg?: string;
    color?: string;
    children?: ReactNode;
    hoverable?: boolean;
    raised?:boolean 
    key?:React.Key
    onClick?: ()=> void
  }
  

export default function Circle({
  size,
  funcss,
  bg,
  color,
  children,
  hoverable,
  raised ,
  key , 
  onClick ,
  ...rest
}: Circle_Props) {
  return (
      <div
        className={`pointer avatar ${funcss || ''} ${`text-` + color?.trim() || ''} ${raised ? "raised" : ''} ${bg || ''} ${
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
