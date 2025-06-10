'use client';
import * as React from 'react';
import ModalHeader from './Header';
import ModalContent from './Content';
import ModalAction from './Action';
import { PiX , PiPaperPlaneRight} from 'react-icons/pi';
import Button from '../button/Button';

interface ModalProps {
  children?: React.ReactNode;
  funcss?: string;
  animation?: string;
  duration?: number;
  open: boolean;
  hideClose: boolean;
  setOpen: (val: boolean) => void;
  maxWidth?: string;
  maxHeight?: string;
  height?: string;
  width?: string;
  backdrop?: boolean;
  body?: React.ReactNode;
  bodycss?: string;
  title?: React.ReactNode;
  okIcon?: React.ReactNode;
  titlecss?: string;
  footer?: React.ReactNode;
  footercss?: string;
  close?: React.ReactNode;
  closecss?: string;
  id?: string;
  position?: string;
  flat?: boolean;
  onOk?: () => void; // 👈 new
  onOkText?: string; // 👈 new
}

export default function Modal({
  children,
  funcss,
  animation,
  duration,
  open,
  setOpen,
  maxWidth,
  maxHeight,
  okIcon,
  height,
  hideClose = false,
  width,
  backdrop = false,
  title,
  titlecss,
  body,
  bodycss,
  footer,
  footercss,
  close,
  closecss,
  position,
  id,
  flat,
  onOk,       // 👈 added
  onOkText,   // 👈 added
  ...rest
}: ModalProps) {
  const modalId = id || '_mymodal';

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target && (e.target as HTMLElement).id === modalId) {
      setOpen(false);
    }
  };

  const handleOkClick = () => {
    if (onOk) onOk();
    else setOpen(false); // default behavior if no onOk is provided
  };

  if (!open) return null;

  return (
    <div
      className={`modal ${backdrop ? 'backdrop' : ''} ${position || ''}`}
      id={modalId}
      onClick={handleClickOutside}
    >
      <div
        className={`modal-content ${funcss || ''} ${flat ? 'flat' : ''}`}
        style={{
          animation: `${duration || 0.2}s ${animation || 'ScaleUp'}`,
          maxWidth: maxWidth || undefined,
          maxHeight: maxHeight || undefined,
          width: width || '100%',
          height: height || undefined,
        }}
        {...rest}
      >
        {title && (
          <ModalHeader
            funcss={titlecss || ''}
            title={title}
            close={!hideClose ? 
              
              <div
                onClick={() => setOpen(false)}
                className={`${closecss || ''} pointer hover-text-error`}
              >
                    {close || <PiX size={25} />}
              </div>
            : ""
            }
          />
        )}

        {body && (
          <ModalContent funcss={bodycss || ''}>
            {body}
          </ModalContent>
        )}

        {/* Show default Ok button if no custom footer */}
        {footer ? (
          <ModalAction funcss={footercss || ''}>
            {footer}
          </ModalAction>
        ) : (
          <ModalAction funcss='text-right'>
            <Button
            bg='success800'
            endIcon={okIcon || <PiPaperPlaneRight />} 
            raised
              onClick={handleOkClick}
            >
              {onOkText || 'OK'}
            </Button>
          </ModalAction>
        )}

        {children}
      </div>
    </div>
  );
}
