import React, { ReactNode } from 'react';

interface StepContainerProps {
  children?: ReactNode;
  funcss?: string;
  responsiveMedium?: boolean;
  responsiveSmall?: boolean;
}

const StepContainer: React.FC<StepContainerProps> = ({
  children,
  funcss,
  responsiveMedium,
  responsiveSmall,
}) => {
  return (
    <div
      className={`${
        funcss ? funcss : ''
      } stepContainer ${responsiveMedium ? 'stepResponsiveMedium' : responsiveSmall ? 'stepResponsiveSmall' : ''}`}
    >
      {children}
    </div>
  );
};

export default StepContainer;
