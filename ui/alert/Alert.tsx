'use client'
import { PiInfo , PiCheckCircleDuotone , PiWarning , PiX , PiSpinner } from "react-icons/pi";
import React, { ReactNode, useEffect, useState } from 'react';

interface AlertProps {
  message?: string;
  funcss?: string;
  type?: 'success' | 'info' | 'warning' | 'error';
  outlined?: boolean;
  fixed?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-middle' | 'bottom-middle' | 'middle';
  fullWidth?: boolean;
  isLoading?: boolean;
  children?: ReactNode;
  animation?: string;
  duration?: string;
  raised?: boolean;
  card?: boolean;
  variant?: string;
  flat?: boolean;
  standard?: boolean;
  style?: React.CSSProperties;
  autoHide?: boolean;
  autoHideDuration?: number;
  onClose?: () => void;
}

export default function Alert({
  message,
  funcss,
  type,
  outlined,
  fixed,
  raised,
  fullWidth,
  isLoading,
  children,
  animation,
  duration,
  variant,
  flat,
  standard,
  card,
  style,
  autoHide = false,
  autoHideDuration = 3000,
  onClose,
  ...rest
}: AlertProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (autoHide) {
      timeout = setTimeout(() => {
        setVisible(false);
        onClose?.();
      }, autoHideDuration);
    }
    return () => clearTimeout(timeout);
  }, [autoHide, autoHideDuration, onClose]);

  if (!visible) return null;

  return (
    <div
      className={`${
        fixed ? 'alert-container ' : ''
      } ${fixed === 'top-left' ? 'top-left' : ''}
        ${fixed === 'top-right' ? 'top-right' : ''}
        ${fixed === 'bottom-left' ? 'bottom-left' : ''}
        ${fixed === 'bottom-right' ? 'bottom-right' : ''}
        ${fixed === 'middle' ? 'middle-alert' : ''}
        ${fixed === 'top-middle' ? 'top-middle' : ''}
        ${fixed === 'bottom-middle' ? 'bottom-middle' : ''}`}
    >
      <div
        style={{
          animation: `${duration || '0.3'}s ${animation || 'ScaleUp'}`,
          ...style,
        }}
        className={`text-${type}800 alert ${card ? 'card' : ''} ${flat ? 'flat' : ''} ${raised ? 'raised' : ''} ${
          outlined
            ? `outline-${type}500`
            : `${variant || (standard ? `top-${type}` : `${type}200`  + ` outline-${type}300 `)}`
        } ${funcss || ''} ${fullWidth ? 'width-100-p' : ''}`}
        {...rest}
      >
        <div className="alert-icon">
          {!isLoading ? (
            <div className={`text-${type}`} style={{lineHeight:"0"}}>
              {type === 'success' && <PiCheckCircleDuotone />}
              {type === 'info' && <PiInfo />}
              {type === 'warning' && <PiWarning />}
              {type === 'error' && <PiX />}
            </div>
          ) : (
            <span className="rotate">
              <PiSpinner />
            </span>
          )}
        </div>
        <div className="alert-text">{message || children}</div>
      </div>
    </div>
  );
}
