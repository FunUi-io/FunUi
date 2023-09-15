'use client'
import { ReactNode, HTMLProps } from 'react';
import * as React from 'react'


interface Circle_Props extends HTMLProps<HTMLDivElement> {
    size?: number;
    funcss?: string;
    bg?: string;
    children?: ReactNode;
    hoverable?: boolean;
  }
  

export default function Circle({
  size,
  funcss,
  bg,
  content,
  children,
  hoverable,
}: Circle_Props) {
  return (
    <div>
      <div
        className={`pointer avatar ${funcss || ''} ${bg || ''} ${
          hoverable ? 'hoverable' : ''
        }`}
        style={{
          width: `${size + "rem" || '2.3rem'}`,
          height: `${size + "rem" || '2.3rem'}`,
        }}
      >
        <>{ children}</>
      </div>
    </div>
  );
}
