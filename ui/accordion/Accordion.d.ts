import React from 'react';
interface AccordionProps {
    items: {
        title: string;
        content: React.ReactNode;
        icon?: React.ReactNode;
    }[];
    allowMultiple?: boolean;
    defaultOpenIndexes?: number[];
    itemClass?: string;
    titleClass?: string;
    iconClass?: string;
    contentClass?: string;
    activeClass?: string;
}
declare const Accordion: React.FC<AccordionProps>;
export default Accordion;
