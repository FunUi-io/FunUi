import * as React from 'react';

type HrProps = {
  children: React.ReactNode;
  funcss?: string;
  style?: object
};

const FullCenteredPage = ({ children, funcss , style }: HrProps) => {
  return (
    <div className={`flex central ${funcss}`} style={{
        minHeight:"100vh" ,
        minWidth:"100vw" ,
        overflow:"auto",
        ...style
    }}>
      {children}
    </div>
  );
};

export default FullCenteredPage;
