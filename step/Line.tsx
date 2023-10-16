import React, { ReactNode } from 'react';

interface StepLinedProps {
  children?: ReactNode;
  funcss?: string;
}

const StepLine: React.FC<StepLinedProps> = ({ children, funcss }) => {
  return (
    <div className={`stepLined ${funcss ? funcss : ''}`}>
      {children}
    </div>
  );
};

export default StepLine;
