import React, { ReactNode } from 'react';

interface StepProps {
  children?: ReactNode;
  funcss?: string;
}

const Step: React.FC<StepProps> = ({ children, funcss  }) => {
  return (
    <div className={`step ${funcss ? funcss : ''}`}>
      {children}
    </div>
  );
};

export default Step;
