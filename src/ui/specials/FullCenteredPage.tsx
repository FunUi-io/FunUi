import * as React from 'react';

type HrProps = {
  children: React.ReactNode;
  funcss?: string;
  style?: object
};

const FullCenteredPage = ({ children, funcss , style , ...rest }: HrProps) => {
  return (
    <div className={`flex central ${funcss}`} style={{
        minHeight:"100vh" ,
        minWidth:"100%" ,
        maxWidth:"100%",
        overflow:"auto",
        ...style
    }}
    {...rest}
    >
      {children}
    </div>
  );
};

export default FullCenteredPage;
