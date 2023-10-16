import * as React from 'react';

type SectionProps = {
  children?: React.ReactNode;
  funcss?: string;
  gap?: number
};

const Section = ({ children, funcss , gap }: SectionProps) => {
  return (
    <div className={`${funcss}`} 
    style={{marginTop:gap ? gap  + "rem" : "0.5rem" , marginBottom:gap ? gap  + "rem" : "0.5rem" }}>
      {children}
    </div>
  );
};

export default Section;
