import { ReactNode, CSSProperties, HTMLProps } from 'react';
import * as React from 'react';

interface GridProps extends HTMLProps<HTMLDivElement> {
  children?: ReactNode;
  funcss?: string;
  gap?: number;
  justify?: CSSProperties['justifyContent'];
  align?: CSSProperties['alignItems'];
  id?: string;
  direction?: CSSProperties['flexDirection'];
}

export default  function Grid({
  children,
  funcss,
  justify,
  align,
  id,
  direction,
  ...rest
}: GridProps) {
  return (
    <div
      id={id || ''}
      className={`row ${funcss || ''}`}
      style={{
        justifyContent: justify || '',
        alignItems: align || '',
        flexDirection: direction || 'row'
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
