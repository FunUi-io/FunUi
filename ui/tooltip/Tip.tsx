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
  // Calculate width only if content is a string
  const text = message || content || children;
  // Check if content is a plain string to calculate width
  const isString = typeof text === 'string';
  const minWidth = isString
    ? `${text.replace(/\s+/g, '').length * 8}px`
    : 'auto';
  return (
    <span
      className={`tip-${tip} tip ${funcss ? funcss : ''}`}
      style={{ animation: ` ${duration ? duration : 0}s ${animation ? animation : ''}`, minWidth: minWidth }}
      {...rest}
    >
      {text}
      
    </span>
  );
}
