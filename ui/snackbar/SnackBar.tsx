'use client';
import * as React from 'react';

interface SnackbarProps {
  message: string;
  close?: React.ReactNode;
  open: boolean;
  setOpen: (val: boolean) => void;
  position: string;
  funcss?: string;
  animation?: string;
  duration?: number; // animation duration (in seconds)
  autoHide?: boolean; // 👈 NEW
  autoHideDuration?: number; // 👈 NEW in milliseconds
  flat?: boolean;
}

const SnackBar: React.FC<SnackbarProps> = ({
  message,
  close,
  open,
  setOpen,
  position,
  funcss,
  animation,
  duration = 0.3,
  autoHide = false,
  autoHideDuration = 3000,
  flat,
}) => {
  React.useEffect(() => {
    if (open && autoHide) {
      const timer = setTimeout(() => {
        setOpen(false);
      }, autoHideDuration);
      return () => clearTimeout(timer);
    }
  }, [open, autoHide, autoHideDuration, setOpen]);

  if (!open) return null;

  return (
    <div className={`snackbar ${position} ${funcss || ''} ${flat ? 'flat' : ''}`} style={{ animation: `${duration}s ${animation || 'SlideUp'}` }}>
      <div className="snackbar-content">
        <div className="snackbar-body">{message}</div>
        {close && (
          <div className="close-snackbar pointer" onClick={() =>setOpen ? setOpen(false) : null}>
            {close}
          </div>
        )}
      </div>
    </div>
  );
};

export default SnackBar;
