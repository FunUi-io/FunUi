import React, { ReactNode } from 'react';
import CardHeader from './CardHeader';
import CardBody from './CardBody';
import CardFooter from './CardFooter';

interface CardProps {
  color?: string;
  bg?: string;
  width?: string;
  height?: string;
  minHeight?: string;
  minWidth?: string;
  margin?: string;
  padding?: string;
  funcss?: string;
  children?: ReactNode;
  roundEdge?: boolean;
  maxHeight?: string;
  maxWidth?: string;
  horizontal?: boolean;
  id?: string;
  header?:ReactNode 
  body?:ReactNode 
  footer?:ReactNode 
  image?:ReactNode,
  noGap?:boolean ,
  fab?:ReactNode
}

export default function Card({
  color,
  bg,
  width,
  height,
  minHeight,
  minWidth,
  margin,
  padding,
  funcss,
  children,
  roundEdge,
  maxHeight,
  maxWidth,
  horizontal,
  id, 
  header ,
  body ,
  footer ,
  noGap,
  fab,
  image
}: CardProps) {
  return (
    <div
      id={id || ''}
      className={`card ${noGap ? 'no-gap' : ''} text-${color || ''} ${bg || ''} ${funcss || ''} ${
        roundEdge ? 'round-edge' : ''
      } ${horizontal ? 'horizontalCard' : ''}`}
      style={{
        width: `${width || ''}`,
        height: `${height || ''}`,
        minHeight: `${minHeight || ''}`,
        minWidth: `${minWidth || ''}`,
        maxHeight: maxHeight || '',
        maxWidth: maxWidth || '',
        margin: `${margin || ''}`,
        padding: `${padding || ''}`,
      }}
    >
      {image ? <div className={`${fab ? 'relative' : ''}`}>{image} {fab ? fab : ''}</div> : ''}

      {header && !horizontal ? <CardHeader>{header}</CardHeader> : ''}

      {body ? 
      <div>
      {horizontal ? <CardHeader>{header}</CardHeader> : ''}
      <CardBody>  {body} </CardBody> 
      {horizontal ? <CardFooter>{footer}</CardFooter> : ''}
      </div>
      : ''
      }

      {footer && !horizontal ? <CardFooter>{footer}</CardFooter> : ''}
      {children}
    </div>
  );
}
