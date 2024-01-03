import * as React from 'react';
import NotificationHeader from './Header';
import NotificationContent from './Content';
import NotificationFooter from './Footer';

type NotificationProps = {
  position: string;
  funcss?: string;
  animation?: string;
  duration?: number;
  children: React.ReactNode;
  state: boolean;
  width?: string;
  header?: React.ReactNode;
  content?: React.ReactNode;
  footer?: React.ReactNode; 
};

export default function Notification({
  position,
  funcss,
  animation,
  duration,
  children,
  state,
  width,
  header,
  content,
  footer 
}: NotificationProps) {
  if (state) {
    return (
      <div
        className={`notification ${position} ${funcss}`}
        style={{ animation: ` ${duration ? duration : 0.2}s ${animation}`, width: width ? width : '450px' }}
      >
        {
          header && 
          <NotificationHeader>
            {header}
          </NotificationHeader>
        }
        {
          content && 
          <NotificationContent>
            {content}
          </NotificationContent>
        }
        {
          footer && 
          <NotificationFooter>
            {footer}
          </NotificationFooter>
        }
        {children}
      </div>
    );
  } else {
    return null;
  }
}
