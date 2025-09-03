import React, { ReactNode } from 'react';

interface StepTitleProps {
  children?: ReactNode;
  funcss?: string;
}

const StepTitle: React.FC<StepTitleProps> = ({ children, funcss }) => {
  return (
    <div className={`stepHeader ${funcss ? funcss : ''}`}>
      {children}
    </div>
  );
};

export default StepTitle;
