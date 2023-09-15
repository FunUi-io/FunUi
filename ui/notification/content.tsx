import * as React from 'react';

type NotificationContentProps = {
  funcss?: string;
  children: React.ReactNode;
};

export default function NotificationContent({ funcss, children }: NotificationContentProps) {
  return (
    <div className={`notificationContent ${funcss ? funcss : ''}`}>
      {children}
    </div>
  );
}
