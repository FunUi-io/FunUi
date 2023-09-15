import * as React from 'react';

type NotificationFooterProps = {
  funcss?: string;
  children: React.ReactNode;
};

export default function NotificationFooter({ funcss, children }: NotificationFooterProps) {
  return (
    <div className={`notificationFooter ${funcss ? funcss : ''}`}>
      {children}
    </div>
  );
}
