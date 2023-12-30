import * as React from 'react';
type SectionProps = {
    children?: React.ReactNode;
    funcss?: string;
    gap?: number;
};
declare const Section: ({ children, funcss, gap, ...rest }: SectionProps) => any;
export default Section;
