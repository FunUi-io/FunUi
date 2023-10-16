import * as React from 'react';
import ModalHeader from './Header';
import ModalContent from './Content';
import ModalAction from './Action';
import CloseModal from './Close';

interface ModalProps {
  children: React.ReactNode;
  funcss?: string;
  animation?: string;
  duration?: number;
  open: boolean;
  maxWidth?: string;
  maxHeight?: string;
  height?: string;
  width?: string;
  backdrop?: boolean;
  body?:React.ReactNode
  bodycss?:string
  title?:React.ReactNode
  titlecss?:string,
  footer?:React.ReactNode
  footercss?:string
  close?:React.ReactNode
  closecss?:string ,
  id?:string
}

export default function Modal({
  children,
  funcss,
  animation,
  duration,
  open,
  maxWidth,
  maxHeight,
  height,
  width,
  backdrop,
  title,
  titlecss,
  body,
  bodycss,
  footer,
  footercss,
  close,
  closecss,
  id,
  ...rest
}: ModalProps) {
  if (open) {
    return (
      <div className={`${funcss} modal ${backdrop ? 'backdrop' : ''}`}  id={id ? id : ''}>
        <div
          className="modal-content"
          style={{
            animation: ` ${duration}s ${animation}`,
            maxWidth: maxWidth ? maxWidth : undefined,
            maxHeight: maxHeight ? maxHeight : undefined,
            width: width ? width : undefined,
            height: height ? height : undefined,
          }}
    
          {...rest}
        >
          {
            title &&
            <ModalHeader  funcss={titlecss ? titlecss : ''}>
              {title}
              {
                close &&
                close
              }
            </ModalHeader>
          }
          {
            body &&
            <ModalContent  funcss={bodycss ? bodycss : ''} >
              {body}
            </ModalContent>
          }
          {
            footer &&
            <ModalAction   funcss={footercss ? footercss : ''}>
              {footer}
            </ModalAction>
          }
          {children}
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
}