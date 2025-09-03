import React from 'react';
export type AccordionItemProps = {
    title: string;
    content: React.ReactNode;
    isOpen?: boolean;
    onToggle?: () => void;
    index?: number;
    icon?: React.ReactNode;
    itemClass?: string;
    titleClass?: string;
    iconClass?: string;
    contentClass?: string;
    activeClass?: string;
};
export declare const AccordionItem: React.FC<AccordionItemProps>;
export type AccordionProps = {
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
};
declare const Accordion: React.FC<AccordionProps>;
export default Accordion;
