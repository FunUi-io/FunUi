'use client';
import React, { useEffect, useState } from 'react';
import NotificationHeader from './Header';
import NotificationContent from './Content';
import NotificationFooter from './Footer';

type NotificationProps = {
  position: string;
  funcss?: string;
  animation?: string;
  duration?: number; // in seconds
  autoHide?: boolean;
  autoHideDuration?: number;
  children?: React.ReactNode;
  state: boolean;
  setOpen: (state: boolean) => void; // 👈 control from parent
  width?: string;
  header?: React.ReactNode;
  content?: React.ReactNode;
  footer?: React.ReactNode;
};

export default function Notification({
  position,
  funcss = '',
  animation = 'fadeIn',
  duration = 0.2,
  autoHide = false,
  autoHideDuration = 0.2,
  children,
  state,
  setOpen, // 👈 receives the setter from parent
  width = '450px',
  header,
  content,
  footer,
}: NotificationProps) {
  useEffect(() => {
    if (state && autoHide) {
      const timer = setTimeout(() => {
        setOpen(false); // 👈 close from inside
      }, autoHideDuration * 1000);
      return () => clearTimeout(timer);
    }
  }, [state, autoHide, autoHideDuration, setOpen]);

  if (!state) return null;

  return (
    <div
      className={`notification ${position} ${funcss}`}
      style={{ animation: `${duration}s ${animation}`, width }}
    >
      {header && <NotificationHeader>{header}</NotificationHeader>}
      {content && <NotificationContent>{content}</NotificationContent>}
      {footer && <NotificationFooter>{footer}</NotificationFooter>}
      {children}
    </div>
  );
}
