import * as React from 'react';

type NotificationProps = {
  position: string;
  funcss?: string;
  animation?: string;
  duration?: number;
  children: React.ReactNode;
  state: boolean;
  width?: string;
};

export default function Notification({
  position,
  funcss,
  animation,
  duration,
  children,
  state,
  width,
}: NotificationProps) {
  if (state) {
    return (
      <div
        className={`notification ${position} ${funcss}`}
        style={{ animation: ` ${duration ? duration : 0.2}s ${animation}`, width: width ? width : '450px' }}
      >
        {children}
      </div>
    );
  } else {
    return null;
  }
}
