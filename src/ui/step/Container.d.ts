import React, { ReactNode } from 'react';
interface StepContainerProps {
    children?: ReactNode;
    funcss?: string;
    responsiveMedium?: boolean;
    responsiveSmall?: boolean;
}
declare const StepContainer: React.FC<StepContainerProps>;
export default StepContainer;
