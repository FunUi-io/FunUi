import  { ReactNode } from 'react';
import * as React from 'react'
interface AvatarProps {
  funcss?: string;
  children?: ReactNode;
  size?: string;
  bg?: string;
  content?: ReactNode;
}

export default function Avatar({
  funcss,
  children,
  size,
  bg,
  content,
}: AvatarProps) {
  return (
    <div
      className={`avatar ${funcss || ''} ${bg || ''}`}
      style={{
        width: `${size || '2.3rem'}`,
        height: `${size || '2.3rem'}`,
      }}
    >
      <>{content ? content : children}</>
    </div>
  );
}
