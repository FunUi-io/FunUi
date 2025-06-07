import * as React from 'react';

interface TipProps {
  tip: string;
  funcss?: string;
  children?: React.ReactNode;
  content?: React.ReactNode;
  message?: React.ReactNode;
  animation?: string;
  duration?: number;
} 

export default function Tip({
  tip,
  funcss,
  children,
  content,
  message,
  animation,
  duration,
  ...rest
}: TipProps) {
  const text = message || content || children;
  return (
    <span
      className={`tip-${tip} tip ${funcss ? funcss : ''}`}
      style={{ animation: ` ${duration ? duration : 0}s ${animation ? animation : ''}`}}
      {...rest}
    >
      {text}
      
    </span>
  );
}
