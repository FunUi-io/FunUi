import * as React from 'react';

type DropItemProps = {
  children: React.ReactNode;
  funcss?: string;
  onClick?: () => void;
};

export default function DropItem({ children, funcss, onClick }: DropItemProps) {
  return (
    <div className={`${funcss} drop-item`} onClick={onClick}>
      {children}
    </div>
  );
}
