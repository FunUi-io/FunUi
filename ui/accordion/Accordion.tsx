'use client';
import React, { useState } from 'react';
import { PiCaretDown, PiCaretUp } from 'react-icons/pi';
import RowFlex from '../specials/RowFlex';

interface AccordionItemProps {
  title: string;
  content: React.ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
  index?: number;
  icon?: React.ReactNode;
  // Customization
  itemClass?: string;
  titleClass?: string;
  iconClass?: string;
  contentClass?: string;
  activeClass?: string;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  icon,
  title,
  content,
  isOpen,
  onToggle,
  itemClass = '',
  titleClass = '',
  iconClass = '',
  contentClass = '',
  activeClass = '',
}) => {
  return (
    <div className={`accordion-item ${itemClass} ${isOpen ? activeClass : ''}`}>
      <div className={`accordion-header ${titleClass}`} onClick={onToggle}>
       <RowFlex alignItems='center' gap={0.6}>
        {
          icon && <div style={{lineHeight:0}}>{icon}</div>
        }
       <div className='col fit'>{title}</div>
       </RowFlex>
        <div style={{lineHeight:0}} className={`${iconClass} ${isOpen ? "accordion-rotated" : ""}`}>
          <PiCaretDown />
        </div>
      </div>
      <div className={`accordion-content ${contentClass} ${isOpen ? 'open' : ''}`}>
        <div className="accordion-inner">{content}</div>
      </div>
    </div>
  );
};

interface AccordionProps {
  items: {
    title: string;
    content: React.ReactNode;
    icon?: React.ReactNode;
  }[];
  allowMultiple?: boolean; // ✅ NEW
  defaultOpenIndexes?: number[]; // optional

  // Custom styles
  itemClass?: string;
  titleClass?: string;
  iconClass?: string;
  contentClass?: string;
  activeClass?: string;
}

const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false, // ❗ default is only one open
  defaultOpenIndexes = [],
  itemClass,
  titleClass,
  iconClass,
  contentClass,
  activeClass,
}) => {
  const [openIndexes, setOpenIndexes] = useState<number[]>(
    allowMultiple ? defaultOpenIndexes : [defaultOpenIndexes[0] ?? -1]
  );

  const toggleIndex = (index: number) => {
    if (allowMultiple) {
      if (openIndexes.includes(index)) {
        setOpenIndexes(openIndexes.filter((i) => i !== index));
      } else {
        setOpenIndexes([...openIndexes, index]);
      }
    } else {
      setOpenIndexes(openIndexes.includes(index) ? [] : [index]);
    }
  };

  return (
    <div className="accordion">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          index={index}
          icon={item.icon}
          title={item.title}
          content={item.content}
          isOpen={openIndexes.includes(index)}
          onToggle={() => toggleIndex(index)}
          itemClass={itemClass}
          titleClass={titleClass}
          iconClass={iconClass}
          contentClass={contentClass}
          activeClass={activeClass}
        />
      ))}
    </div>
  );
};

export default Accordion;
