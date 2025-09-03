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
    bordered?:boolean 
    key?:React.Key
    onClick?: ()=> void
  }
  

export default function Circle({
  size = 2,
  funcss,
  bg,
  color,
  children,
  hoverable,
  raised ,
  key , 
  onClick ,
  bordered,
  ...rest
}: Circle_Props) {
  return (
      <div
        className={` animated fade-in ${bordered ? "border" : ""} pointer avatar ${funcss || ''} ${`text-` + color?.trim() || ''} ${raised ? "raised" : ''} ${bg || 'lighter'} ${
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
