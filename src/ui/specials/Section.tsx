import * as React from 'react';

type SectionProps = {
  children?: React.ReactNode;
  funcss?: string;
  gap?: number
};

const Section = ({ children, funcss , gap , ...rest}: SectionProps) => {
  return (
    <div className={`${funcss}`} 
    style={{marginTop:gap ? gap  + "rem" : "0.5rem" , marginBottom:gap ? gap  + "rem" : "0.5rem" }} {...rest}>
      {children}
    </div>
  );
};

export default Section;
