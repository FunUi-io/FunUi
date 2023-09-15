import * as React from 'react';

type NotificationHeaderProps = {
  funcss?: string;
  children: React.ReactNode;
};

export default function NotificationHeader({ funcss, children }: NotificationHeaderProps) {
  return (
    <div className={`notificationHeader ${funcss ? funcss : ''}`}>
      {children}
    </div>
  );
}
