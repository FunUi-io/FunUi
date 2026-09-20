'use client';
import React, { useState, useEffect, useRef } from 'react';
import { PiCaretDown } from 'react-icons/pi';

// Mock utilities - replace with your actual imports
const getCssVariableValue = (varName : string) => {
  if (typeof window === 'undefined') return '';
  return getComputedStyle(document.documentElement).getPropertyValue(`--${varName}`).trim();
};

const useComponentConfiguration = (componentName : any, variant : any) => {
  return {
    mergeWithLocal: (localProps : any) => ({ props: localProps })
  };
};

const getDynamicIcon = async (iconString : string) => {
  // Mock implementation - replace with your actual icon loader
  return null;
};

// Define types for dynamic icons
type AccordionItemType = {
  // Core content
  title: string | React.ReactNode;
  content: React.ReactNode;
  icon?: string | React.ReactNode;
  
  // Customization per item
  itemClass?: string;
  titleClass?: string;
  iconClass?: string;
  contentClass?: string;
  activeClass?: string;
  
  // Icon customization per item
  iconColor?: string;
  iconSize?: number;
  iconClassName?: string;
  
  expandIcon?: string | React.ReactNode;
  expandIconColor?: string;
  expandIconSize?: number;
  expandIconClassName?: string;
  
  // Title styling per item
  titleSize?: string;
  titleWeight?: number;
  titleColor?: string;
  
  // Content styling per item
  contentSize?: string;
  contentWeight?: number;
  contentColor?: string;
  
  // Animation
  animationDuration?: number;
  animationEasing?: string;
  
  // Advanced
  disabled?: boolean;
  customRender?: (isOpen: boolean) => React.ReactNode;
};

type AccordionProps = {
  // Core props
  items: AccordionItemType[] | string;
  allowMultiple?: boolean;
  defaultOpenIndexes?: number[];
  variant?: string;
  
  // Icons
  icon?: string | React.ReactNode;
  iconColor?: string;
  iconSize?: number;
  iconClassName?: string;
  iconPosition?: 'left' | 'right' | 'none';
  
  expandIcon?: string | React.ReactNode;
  expandIconColor?: string;
  expandIconSize?: number;
  expandIconClassName?: string;
  expandIconRotate?: boolean;
  
  // Styling
  itemClass?: string;
  titleClass?: string;
  iconClass?: string;
  contentClass?: string;
  activeClass?: string;
  
  // Title styling
  titleSize?: string;
  titleWeight?: number;
  titleColor?: string;
  titleClassName?: string;
  
  // Content styling
  contentSize?: string;
  contentWeight?: number;
  contentColor?: string;
  contentClassName?: string;
  
  // Layout
  gap?: string;
  padding?: string;
  margin?: string;
  border?: boolean;
  borderColor?: string;
  borderRadius?: string;
  shadow?: 'sm' | 'md' | 'lg' | 'xl' | 'none';
  bg?: string;
  contentBg?: string;
  
  // Animation
  animationDuration?: number;
  animationEasing?: string;
  
  // Advanced
  className?: string;
  funcss?: string;
  style?: React.CSSProperties;
  
  // Callbacks
  onItemToggle?: (index: number, isOpen: boolean) => void;
  onAllClose?: () => void;
  onAllOpen?: () => void;
};

// Custom hook for dynamic icons
const useDynamicIcon = (iconString?: string) => {
  const [iconNode, setIconNode] = useState<React.ReactNode>(null);
  const [hasValidIcon, setHasValidIcon] = useState(false);

  useEffect(() => {
    if (!iconString || typeof iconString !== 'string' || iconString.trim() === '') {
      setIconNode(null);
      setHasValidIcon(false);
      return;
    }

    getDynamicIcon(iconString).then((node) => {
      if (node) {
        setIconNode(node);
        setHasValidIcon(true);
      } else {
        setIconNode(null);
        setHasValidIcon(false);
      }
    });
  }, [iconString]);

  return { iconNode, hasValidIcon };
};

// Icon component with dynamic icon support
const AccordionIcon: React.FC<{
  icon?: string | React.ReactNode;
  iconColor?: string;
  iconSize?: number;
  iconClassName?: string;
  isExpandIcon?: boolean;
  expandIcon?: string | React.ReactNode;
  expandIconColor?: string;
  expandIconSize?: number;
  expandIconClassName?: string;
  isOpen?: boolean;
  rotate?: boolean;
}> = ({ 
  icon,
  iconColor,
  iconSize = 15,
  iconClassName = '',
  isExpandIcon = false,
  expandIcon,
  expandIconColor,
  expandIconSize = 15,
  expandIconClassName = '',
  isOpen = false,
  rotate = true
}) => {
  const iconToUse = isExpandIcon ? expandIcon : icon;
  const colorToUse = isExpandIcon ? expandIconColor : iconColor;
  const sizeToUse = isExpandIcon ? expandIconSize : iconSize;
  const classNameToUse = isExpandIcon ? expandIconClassName : iconClassName;

  const isStringIcon = iconToUse && typeof iconToUse === 'string';
  const { iconNode: dynamicIconNode, hasValidIcon: hasValidDynamicIcon } = useDynamicIcon(
    isStringIcon ? iconToUse as string : undefined
  );

  const getColorClass = (color?: string): string => {
    if (!color) return '';
    
    if (color.startsWith('text-') || color.startsWith('bg-') || color.startsWith('border-')) {
      return color;
    }
    
    const colorNames = ['primary', 'secondary', 'accent', 'success', 'warning', 'error', 'info', 'dark', 'light'];
    if (colorNames.includes(color)) {
      return `text-${color}`;
    }
    
    return '';
  };

  const colorClass = getColorClass(colorToUse);

  const renderIconWithProps = (iconElement: React.ReactNode, className: string, size?: number) => {
    if (!React.isValidElement(iconElement)) return iconElement;
    
    const props: any = {
      className: `${className} ${colorClass}`.trim(),
    };
    
    if (size !== undefined) {
      props.size = size;
    }
    
    return React.cloneElement(iconElement, props);
  };

  if (iconToUse && typeof iconToUse !== 'string' && React.isValidElement(iconToUse)) {
    return renderIconWithProps(
      iconToUse,
      `${isExpandIcon ? 'accordion-expand-icon' : 'accordion-icon'} ${classNameToUse} ${isOpen && rotate ? 'accordion-rotated' : ''}`.trim(),
      sizeToUse
    );
  }
  
  if (isStringIcon && hasValidDynamicIcon && dynamicIconNode) {
    return renderIconWithProps(
      dynamicIconNode,
      `${isExpandIcon ? 'accordion-expand-icon' : 'accordion-icon'} ${classNameToUse} ${isOpen && rotate ? 'accordion-rotated' : ''}`.trim(),
      sizeToUse
    );
  }
  
  if (isExpandIcon && !iconToUse) {
    return (
      <PiCaretDown
        className={`accordion-expand-icon ${expandIconClassName || ''} ${colorClass} ${isOpen && rotate ? 'accordion-rotated' : ''}`.trim()}
        style={{
          fontSize: expandIconSize,
          transition: 'transform 0.3s ease',
        }}
      />
    );
  }
  
  return null;
};

// Accordion Item Component
const AccordionItem: React.FC<{
  item: AccordionItemType;
  index: number;
  isOpen: boolean;
  onToggle: (index: number) => void;
  globalProps: any;
  animationDuration?: number;
  animationEasing?: string;
}> = ({ item, index, isOpen, onToggle, globalProps, animationDuration = 300, animationEasing = 'ease' }) => {
  const mergedProps = {
    ...globalProps,
    ...item
  };

  const {
    itemClass,
    titleClass,
    iconClass,
    contentClass,
    activeClass,
    
    icon,
    iconColor,
    iconSize,
    iconClassName,
    iconPosition = 'left',
    
    expandIcon,
    expandIconColor,
    expandIconSize,
    expandIconClassName,
    expandIconRotate = true,
    
    titleSize,
    titleWeight,
    titleColor,
    
    contentSize,
    contentWeight,
    contentColor,
    
    disabled,
    customRender
  } = mergedProps;

  const getBgClass = (color?: string): string => {
    if (!color) return '';
    
    if (color.startsWith('bg-')) {
      return color;
    }
    
    const colorNames = ['primary', 'secondary', 'accent', 'success', 'warning', 'error', 'info', 'dark', 'light'];
    if (colorNames.includes(color)) {
      return `bg-${color}`;
    }
    
    return '';
  };

  const getBorderClass = (color?: string): string => {
    if (!color) return '';
    
    if (color.startsWith('border-')) {
      return color;
    }
    
    const colorNames = ['primary', 'secondary', 'accent', 'success', 'warning', 'error', 'info', 'dark', 'light'];
    if (colorNames.includes(color)) {
      return `border-${color}`;
    }
    
    if (color === 'borderColor') {
      return 'border-default';
    }
    
    return '';
  };

  const getTextSizeClass = (size?: string): string => {
    if (!size) return 'text-sm';
    
    if (size.startsWith('text-')) {
      return size;
    }
    
    const validSizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'];
    if (validSizes.includes(size)) {
      return `text-${size}`;
    }
    
    return 'text-sm';
  };

  const getTextColorClass = (color?: string): string => {
    if (!color) return 'text-default';
    
    if (color.startsWith('text-')) {
      return color;
    }
    
    const colorNames = ['primary', 'secondary', 'accent', 'success', 'warning', 'error', 'info', 'dark', 'light', 'default', 'muted'];
    if (colorNames.includes(color)) {
      return `text-${color}`;
    }
    
    return 'text-default';
  };

  const getSpacingValue = (value?: string): string => {
    if (!value) return '';
    
    if (/^\d+$/.test(value)) {
      return `${parseInt(value) * 0.25}rem`;
    }
    
    return value;
  };

  if (customRender) {
    return customRender(isOpen);
  }

  const titleContent = typeof item.title === 'string' ? (
    <div 
      className={`
        ${getTextSizeClass(titleSize)} 
        ${getTextColorClass(titleColor)}
        ${titleClass || ''}
      `.trim()}
      style={{
        fontWeight: titleWeight || 400,
      }}
    >
      {item.title}
    </div>
  ) : item.title;

  const getContainerClasses = (): string => {
    const classes = ['accordion-item' , 'fade-in-down'];
    
    if (globalProps.bg) {
      const bgClass = getBgClass(globalProps.bg);
      if (bgClass) {
        classes.push(bgClass);
      }
    }
    
    if (globalProps.border) {
      classes.push('border');
      const borderClass = getBorderClass(globalProps.borderColor);
      if (borderClass) {
        classes.push(borderClass);
      }
    }
    
    if (globalProps.borderRadius) {
      const radius = getSpacingValue(globalProps.borderRadius);
      if (radius === '0.25rem') classes.push('rounded-sm');
      else if (radius === '0.5rem') classes.push('rounded-md');
      else if (radius === '0.75rem') classes.push('rounded-lg');
      else if (radius === '1rem') classes.push('rounded-xl');
    }
    
    if (globalProps.shadow && globalProps.shadow !== 'none') {
      classes.push(`shadow-${globalProps.shadow}`);
    }
    
    if (isOpen) {
      classes.push(activeClass || 'active');
    }
    
    if (disabled) {
      classes.push('disabled');
    }
    
    if (itemClass) {
      classes.push(itemClass);
    }
    
    return classes.filter(Boolean).join(' ');
  };

  return (
    <div 
      className={getContainerClasses()}
      style={{
        marginBottom: getSpacingValue(globalProps.gap) || '0.5rem',
        overflow: 'visible',
      }}
    >
      <div
        className={`accordion-header ${titleClass || ''}`}
        onClick={!disabled ? () => onToggle(index) : undefined}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-expanded={isOpen}
        onKeyDown={(e) => {
          if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            onToggle(index);
          }
        }}
        style={{
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.6 : 1,
          padding: getSpacingValue(globalProps.padding) || '0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1 }}>
          {iconPosition === 'left' && (
            <AccordionIcon
              icon={icon}
              iconColor={iconColor}
              iconSize={iconSize}
              iconClassName={iconClass || iconClassName}
              isOpen={isOpen}
            />
          )}
          
          <div className="col" style={{ flex: 1 }}>
            {titleContent}
          </div>
          
          {iconPosition === 'right' && (
            <AccordionIcon
              icon={icon}
              iconColor={iconColor}
              iconSize={iconSize}
              iconClassName={iconClass || iconClassName}
              isOpen={isOpen}
            />
          )}
        </div>
        
        <div style={{ lineHeight: 0 }}>
          <AccordionIcon
            isExpandIcon
            expandIcon={expandIcon}
            expandIconColor={expandIconColor}
            expandIconSize={expandIconSize}
            expandIconClassName={expandIconClassName}
            isOpen={isOpen}
            rotate={expandIconRotate}
          />
        </div>
      </div>
      
      <div
        className={`accordion-content ${contentClass || ''} ${isOpen ? 'open' : ''}`}
        style={{
          maxHeight: isOpen ? '999999999999999px' : '0',
          overflow: 'visible',
          opacity: isOpen ? 1 : 0,
          visibility: isOpen ? 'visible' : 'hidden',
          transition: `max-height ${animationDuration}ms ${animationEasing}`,
          padding: isOpen ? getSpacingValue(globalProps.padding) || '0.5rem 0' : '0',
          backgroundColor: globalProps.contentBg ? getBgClass(globalProps.contentBg) : '',
          borderTop: isOpen && globalProps.border ? `1px solid ${getCssVariableValue(globalProps.borderColor) || 'var(--borderColor)'}` : 'none',
        }}
      >
        <div 
          className={`
            accordion-inner
            ${getTextSizeClass(contentSize)}
            ${getTextColorClass(contentColor)}
          `.trim()}
          style={{
            opacity: isOpen ? 1 : 0,
            transition: `opacity ${animationDuration}ms ${animationEasing}`,
            fontWeight: contentWeight || 400,
            lineHeight: 1.6,
          }}
        >
          {item.content}
        </div>
      </div>
    </div>
  );
};

// Main Accordion Component
const Accordion: React.FC<AccordionProps> = (localProps) => {
  const { mergeWithLocal } = useComponentConfiguration('Accordion', localProps.variant);
  const { props: mergedProps } = mergeWithLocal(localProps);
  const final = mergedProps;

  const [itemsArray, setItemsArray] = useState<AccordionItemType[]>([]);
  
  // Parse items from JSON string if needed
  useEffect(() => {
    if (typeof final.items === 'string') {
      try {
        const parsed = JSON.parse(final.items);
        setItemsArray(Array.isArray(parsed) ? parsed : [parsed]);
      } catch (error) {
        console.error('Error parsing items JSON:', error);
        setItemsArray([]);
      }
    } else if (Array.isArray(final.items)) {
      setItemsArray(final.items);
    } else {
      setItemsArray([]);
    }
  }, [final.items]);

  // Initialize open indexes using useMemo to compute initial value
  const initialOpenIndexes = React.useMemo(() => {
    if (final.allowMultiple) {
      return final.defaultOpenIndexes || [];
    } else {
      return final.defaultOpenIndexes && final.defaultOpenIndexes.length > 0 
        ? [final.defaultOpenIndexes[0]] 
        : [];
    }
  }, [final.allowMultiple, final.defaultOpenIndexes]);

  const [openIndexes, setOpenIndexes] = useState<number[]>(initialOpenIndexes);

  const toggleIndex = (index: number) => {
    setOpenIndexes(prevOpenIndexes => {
      let newOpenIndexes: number[] = [];
      
      if (final.allowMultiple) {
        if (prevOpenIndexes.includes(index)) {
          newOpenIndexes = prevOpenIndexes.filter((i) => i !== index);
        } else {
          newOpenIndexes = [...prevOpenIndexes, index];
        }
      } else {
        newOpenIndexes = prevOpenIndexes.includes(index) ? [] : [index];
      }
      
      // Call callback if provided
      if (final.onItemToggle) {
        final.onItemToggle(index, !prevOpenIndexes.includes(index));
      }
      
      return newOpenIndexes;
    });
  };

  const getContainerClasses = (): string => {
    const classes = ['accordion'];
    
    if (final.className) {
      classes.push(final.className);
    }
    
    if (final.funcss) {
      classes.push(final.funcss);
    }
    
    return classes.filter(Boolean).join(' ');
  };

  const getSpacingValue = (value?: string): string => {
    if (!value) return '';
    
    if (/^\d+$/.test(value)) {
      return `${parseInt(value) * 0.25}rem`;
    }
    
    return value;
  };

  const getContainerStyles = (): React.CSSProperties => {
    const styles: React.CSSProperties = {};
    
    if (final.margin) {
      const marginValue = getSpacingValue(final.margin);
      if (marginValue) {
        styles.margin = marginValue;
      }
    }
    
    if (final.style) {
      Object.assign(styles, final.style);
    }
    
    return styles;
  };

  if (itemsArray.length === 0) {
    return null;
  }

  return (
    <div 
      className={getContainerClasses()}
      style={getContainerStyles()}
    >
      {itemsArray.map((item, index) => (
        <AccordionItem
          key={index}
          item={item}
          index={index}
          isOpen={openIndexes.includes(index)}
          onToggle={toggleIndex}
          globalProps={final}
          animationDuration={final.animationDuration}
          animationEasing={final.animationEasing}
        />
      ))}
    </div>
  );
};

export default Accordion;
export type { AccordionItemType, AccordionProps };

// 'use client';
// import React, { useState, useEffect } from 'react';
// import { getCssVariableValue } from '../../utils/getCssVariable';
// import { useComponentConfiguration } from '../../utils/componentUtils';
// import RowFlex from '../specials/RowFlex';
// import { getDynamicIcon } from '../../utils/getDynamicIcon';
// import { PiCaretDown } from 'react-icons/pi';

// // Define types for dynamic icons
// type AccordionItemType = {
//   // Core content
//   title: string | React.ReactNode;
//   content: React.ReactNode;
//   icon?: string | React.ReactNode;
  
//   // Customization per item
//   itemClass?: string;
//   titleClass?: string;
//   iconClass?: string;
//   contentClass?: string;
//   activeClass?: string;
  
//   // Icon customization per item
//   iconColor?: string;
//   iconSize?: number;
//   iconClassName?: string;
  
//   expandIcon?: string | React.ReactNode;
//   expandIconColor?: string;
//   expandIconSize?: number;
//   expandIconClassName?: string;
  
//   // Title styling per item
//   titleSize?: string;
//   titleWeight?: number;
//   titleColor?: string;
  
//   // Content styling per item
//   contentSize?: string;
//   contentWeight?: number;
//   contentColor?: string;
  
//   // Animation
//   animationDuration?: number;
//   animationEasing?: string;
  
//   // Advanced
//   disabled?: boolean;
//   customRender?: (isOpen: boolean) => React.ReactNode;
// };

// type AccordionProps = {
//   // Core props
//   items: AccordionItemType[] | string; // Support JSON string
//   allowMultiple?: boolean;
//   defaultOpenIndexes?: number[];
//   variant?: string;
  
//   // Icons
//   icon?: string | React.ReactNode;
//   iconColor?: string;
//   iconSize?: number;
//   iconClassName?: string;
//   iconPosition?: 'left' | 'right' | 'none';
  
//   expandIcon?: string | React.ReactNode;
//   expandIconColor?: string;
//   expandIconSize?: number;
//   expandIconClassName?: string;
//   expandIconRotate?: boolean;
  
//   // Styling
//   itemClass?: string;
//   titleClass?: string;
//   iconClass?: string;
//   contentClass?: string;
//   activeClass?: string;
  
//   // Title styling
//   titleSize?: string;
//   titleWeight?: number;
//   titleColor?: string;
//   titleClassName?: string;
  
//   // Content styling
//   contentSize?: string;
//   contentWeight?: number;
//   contentColor?: string;
//   contentClassName?: string;
  
//   // Layout
//   gap?: string;
//   padding?: string;
//   margin?: string;
//   border?: boolean;
//   borderColor?: string;
//   borderRadius?: string;
//   shadow?: 'sm' | 'md' | 'lg' | 'xl' | 'none';
  
//   // Animation
//   animationDuration?: number;
//   animationEasing?: string;
  
//   // Advanced
//   className?: string;
//   funcss?: string;
//   style?: React.CSSProperties;
  
//   // Callbacks
//   onItemToggle?: (index: number, isOpen: boolean) => void;
//   onAllClose?: () => void;
//   onAllOpen?: () => void;
// };

// // Custom hook for dynamic icons
// const useDynamicIcon = (iconString?: string) => {
//   const [iconNode, setIconNode] = useState<React.ReactNode>(null);
//   const [hasValidIcon, setHasValidIcon] = useState(false);

//   useEffect(() => {
//     if (!iconString || typeof iconString !== 'string' || iconString.trim() === '') {
//       setIconNode(null);
//       setHasValidIcon(false);
//       return;
//     }

//     getDynamicIcon(iconString).then((node) => {
//       if (node) {
//         setIconNode(node);
//         setHasValidIcon(true);
//       } else {
//         setIconNode(null);
//         setHasValidIcon(false);
//       }
//     });
//   }, [iconString]);

//   return { iconNode, hasValidIcon };
// };

// // Icon component with dynamic icon support
// const AccordionIcon: React.FC<{
//   icon?: string | React.ReactNode;
//   iconColor?: string;
//   iconSize?: number;
//   iconClassName?: string;
//   isExpandIcon?: boolean;
//   expandIcon?: string | React.ReactNode;
//   expandIconColor?: string;
//   expandIconSize?: number;
//   expandIconClassName?: string;
//   isOpen?: boolean;
//   rotate?: boolean;
// }> = ({ 
//   icon,
//   iconColor,
//   iconSize = 15,
//   iconClassName = '',
//   isExpandIcon = false,
//   expandIcon,
//   expandIconColor,
//   expandIconSize = 15,
//   expandIconClassName = '',
//   isOpen = false,
//   rotate = true
// }) => {
//   const iconToUse = isExpandIcon ? expandIcon : icon;
//   const colorToUse = isExpandIcon ? expandIconColor : iconColor;
//   const sizeToUse = isExpandIcon ? expandIconSize : iconSize;
//   const classNameToUse = isExpandIcon ? expandIconClassName : iconClassName;

//   // Handle string icons (dynamic)
//   const isStringIcon = iconToUse && typeof iconToUse === 'string';
//   const { iconNode: dynamicIconNode, hasValidIcon: hasValidDynamicIcon } = useDynamicIcon(
//     isStringIcon ? iconToUse as string : undefined
//   );

//   // Get color class from color name
//   const getColorClass = (color?: string): string => {
//     if (!color) return '';
    
//     if (color.startsWith('text-') || color.startsWith('bg-') || color.startsWith('border-')) {
//       return color;
//     }
    
//     const colorNames = ['primary', 'secondary', 'accent', 'success', 'warning', 'error', 'info', 'dark', 'light'];
//     if (colorNames.includes(color)) {
//       return `text-${color}`;
//     }
    
//     return '';
//   };

//   const colorClass = getColorClass(colorToUse);

//   const renderIconWithProps = (iconElement: React.ReactNode, className: string, size?: number) => {
//     if (!React.isValidElement(iconElement)) return iconElement;
    
//     const props: any = {
//       className: `${className} ${colorClass}`.trim(),
//     };
    
//     if (size !== undefined) {
//       props.size = size;
//     }
    
//     return React.cloneElement(iconElement, props);
//   };

//   // If it's a React element icon
//   if (iconToUse && typeof iconToUse !== 'string' && React.isValidElement(iconToUse)) {
//     return renderIconWithProps(
//       iconToUse,
//       `${isExpandIcon ? 'accordion-expand-icon' : 'accordion-icon'} ${classNameToUse} ${isOpen && rotate ? 'accordion-rotated' : ''}`.trim(),
//       sizeToUse
//     );
//   }
  
//   // If it's a string icon (dynamic)
//   if (isStringIcon && hasValidDynamicIcon && dynamicIconNode) {
//     return renderIconWithProps(
//       dynamicIconNode,
//       `${isExpandIcon ? 'accordion-expand-icon' : 'accordion-icon'} ${classNameToUse} ${isOpen && rotate ? 'accordion-rotated' : ''}`.trim(),
//       sizeToUse
//     );
//   }
  
//   // Default expand icon (PiCaretDown)
//   if (isExpandIcon && !iconToUse) {
//     return (
//       <PiCaretDown
//         className={`accordion-expand-icon ${expandIconClassName || ''} ${colorClass} ${isOpen && rotate ? 'accordion-rotated' : ''}`.trim()}
//         style={{
//           fontSize: expandIconSize,
//           transition: 'transform 0.3s ease',
//         }}
//       />
//     );
//   }
  
//   return null;
// };

// // Accordion Item Component
// const AccordionItem: React.FC<{
//   item: AccordionItemType;
//   index: number;
//   isOpen: boolean;
//   onToggle: (index: number) => void;
//   globalProps: any;
//   animationDuration?: number;
//   animationEasing?: string;
// }> = ({ item, index, isOpen, onToggle, globalProps, animationDuration = 300, animationEasing = 'ease' }) => {
//   // Merge item props with global props (item props take precedence)
//   const mergedProps = {
//     ...globalProps,
//     ...item
//   };

//   const {
//     itemClass,
//     titleClass,
//     iconClass,
//     contentClass,
//     activeClass,
    
//     icon,
//     iconColor,
//     iconSize,
//     iconClassName,
//     iconPosition = 'left',
    
//     expandIcon,
//     expandIconColor,
//     expandIconSize,
//     expandIconClassName,
//     expandIconRotate = true,
    
//     titleSize,
//     titleWeight,
//     titleColor,
    
//     contentSize,
//     contentWeight,
//     contentColor,
    
//     disabled,
//     customRender
//   } = mergedProps;

//   // Get background class from color name
//   const getBgClass = (color?: string): string => {
//     if (!color) return '';
    
//     if (color.startsWith('bg-')) {
//       return color;
//     }
    
//     const colorNames = ['primary', 'secondary', 'accent', 'success', 'warning', 'error', 'info', 'dark', 'light'];
//     if (colorNames.includes(color)) {
//       return `bg-${color}`;
//     }
    
//     return '';
//   };

//   // Get border class from color name
//   const getBorderClass = (color?: string): string => {
//     if (!color) return '';
    
//     if (color.startsWith('border-')) {
//       return color;
//     }
    
//     const colorNames = ['primary', 'secondary', 'accent', 'success', 'warning', 'error', 'info', 'dark', 'light'];
//     if (colorNames.includes(color)) {
//       return `border-${color}`;
//     }
    
//     // Special handling for borderColor
//     if (color === 'borderColor') {
//       return 'border-default';
//     }
    
//     return '';
//   };

//   // Get text size class
//   const getTextSizeClass = (size?: string): string => {
//     if (!size) return 'text-sm';
    
//     if (size.startsWith('text-')) {
//       return size;
//     }
    
//     const validSizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'];
//     if (validSizes.includes(size)) {
//       return `text-${size}`;
//     }
    
//     return 'text-sm';
//   };

//   // Get text color class
//   const getTextColorClass = (color?: string): string => {
//     if (!color) return 'text-default';
    
//     if (color.startsWith('text-')) {
//       return color;
//     }
    
//     const colorNames = ['primary', 'secondary', 'accent', 'success', 'warning', 'error', 'info', 'dark', 'light', 'default', 'muted'];
//     if (colorNames.includes(color)) {
//       return `text-${color}`;
//     }
    
//     return 'text-default';
//   };

//   const getSpacingValue = (value?: string): string => {
//     if (!value) return '';
    
//     if (/^\d+$/.test(value)) {
//       return `${parseInt(value) * 0.25}rem`;
//     }
    
//     return value;
//   };

//   if (customRender) {
//     return customRender(isOpen);
//   }

//   const titleContent = typeof item.title === 'string' ? (
//     <div 
//       className={`
//         ${getTextSizeClass(titleSize)} 
//         ${getTextColorClass(titleColor)}
//         ${titleClass || ''}
//       `.trim()}
//       style={{
//         fontWeight: titleWeight || 400,
//       }}
//     >
//       {item.title}
//     </div>
//   ) : item.title;

//   // Get container classes
//   const getContainerClasses = (): string => {
//     const classes = ['accordion-item'];
    
//     // Background
//     if (globalProps.bg) {
//       const bgClass = getBgClass(globalProps.bg);
//       if (bgClass) {
//         classes.push(bgClass);
//       }
//     }
    
//     // Border
//     if (globalProps.border) {
//       classes.push('border');
//       const borderClass = getBorderClass(globalProps.borderColor);
//       if (borderClass) {
//         classes.push(borderClass);
//       }
//     }
    
//     // Border radius
//     if (globalProps.borderRadius) {
//       const radius = getSpacingValue(globalProps.borderRadius);
//       if (radius === '0.25rem') classes.push('rounded-sm');
//       else if (radius === '0.5rem') classes.push('rounded-md');
//       else if (radius === '0.75rem') classes.push('rounded-lg');
//       else if (radius === '1rem') classes.push('rounded-xl');
//     }
    
//     // Shadow
//     if (globalProps.shadow && globalProps.shadow !== 'none') {
//       classes.push(`shadow-${globalProps.shadow}`);
//     }
    
//     // State classes
//     if (isOpen) {
//       classes.push(activeClass || 'active');
//     }
    
//     if (disabled) {
//       classes.push('disabled');
//     }
    
//     // Custom classes
//     if (itemClass) {
//       classes.push(itemClass);
//     }
    
//     return classes.filter(Boolean).join(' ');
//   };

//   return (
//     <div 
//       className={getContainerClasses()}
//       style={{
//         marginBottom: getSpacingValue(globalProps.gap) || '0.5rem',
//         overflow: 'visible', // Add overflow hidden to prevent content overflow
//       }}
//     >
//       <div
//         className={`accordion-header ${titleClass || ''}`}
//         onClick={!disabled ? () => onToggle(index) : undefined}
//         role="button"
//         tabIndex={disabled ? -1 : 0}
//         aria-expanded={isOpen}
//         onKeyDown={(e) => {
//           if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
//             e.preventDefault();
//             onToggle(index);
//           }
//         }}
//         style={{
//           cursor: disabled ? 'not-allowed' : 'pointer',
//           opacity: disabled ? 0.6 : 1,
//           padding: getSpacingValue(globalProps.padding) || '0',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'space-between',
//         }}
//       >
//         <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1 }}>
//           {iconPosition === 'left' && (
//             <AccordionIcon
//               icon={icon}
//               iconColor={iconColor}
//               iconSize={iconSize}
//               iconClassName={iconClass || iconClassName}
//               isOpen={isOpen}
//             />
//           )}
          
//           <div className="col" style={{ flex: 1 }}>
//             {titleContent}
//           </div>
          
//           {iconPosition === 'right' && (
//             <AccordionIcon
//               icon={icon}
//               iconColor={iconColor}
//               iconSize={iconSize}
//               iconClassName={iconClass || iconClassName}
//               isOpen={isOpen}
//             />
//           )}
//         </div>
        
//         <div style={{ lineHeight: 0 }}>
//           <AccordionIcon
//             isExpandIcon
//             expandIcon={expandIcon}
//             expandIconColor={expandIconColor}
//             expandIconSize={expandIconSize}
//             expandIconClassName={expandIconClassName}
//             isOpen={isOpen}
//             rotate={expandIconRotate}
//           />
//         </div>
//       </div>
      
//       <div
//         className={`accordion-content ${contentClass || ''} ${isOpen ? 'open' : ''}`}
//         style={{
//           maxHeight: isOpen ? '10000px' : '0',
//           overflow: 'visible',
//           opacity: isOpen ? 1 : 0,
//           visibility: isOpen ? 'visible' : 'hidden',
//           transition: `max-height ${animationDuration}ms ${animationEasing}`,
//           padding: isOpen ? getSpacingValue(globalProps.padding) || '0.5rem 0' : '0',
//           backgroundColor: globalProps.contentBg ? getBgClass(globalProps.contentBg) : '',
//           borderTop: isOpen && globalProps.border ? `1px solid ${getCssVariableValue(globalProps.borderColor) || 'var(--borderColor)'}` : 'none',
//         }}
//       >
//         <div 
//           className={`
//             accordion-inner
//             ${getTextSizeClass(contentSize)}
//             ${getTextColorClass(contentColor)}
//           `.trim()}
//           style={{
//             opacity: isOpen ? 1 : 0,
//             transition: `opacity ${animationDuration}ms ${animationEasing}`,
//             fontWeight: contentWeight || 400,
//             lineHeight: 1.6,
//           }}
//         >
//           {item.content}
//         </div>
//       </div>
//     </div>
//   );
// };

// // Main Accordion Component
// const Accordion: React.FC<AccordionProps> = (localProps) => {
//   // Merge props with configuration
//   const { mergeWithLocal } = useComponentConfiguration('Accordion', localProps.variant);
//   const { props: mergedProps } = mergeWithLocal(localProps);
//   const final = mergedProps;

//   const [openIndexes, setOpenIndexes] = useState<number[]>([]);
//   const [itemsArray, setItemsArray] = useState<AccordionItemType[]>([]);

//   // Parse items from JSON string if needed
//   useEffect(() => {
//     if (typeof final.items === 'string') {
//       try {
//         const parsed = JSON.parse(final.items);
//         setItemsArray(Array.isArray(parsed) ? parsed : [parsed]);
//       } catch (error) {
//         console.error('Error parsing items JSON:', error);
//         setItemsArray([]);
//       }
//     } else if (Array.isArray(final.items)) {
//       setItemsArray(final.items);
//     } else {
//       setItemsArray([]);
//     }
//   }, [final.items]);

//   // Initialize open indexes
//   useEffect(() => {
//     if (final.allowMultiple) {
//       setOpenIndexes(final.defaultOpenIndexes || []);
//     } else {
//       setOpenIndexes(final.defaultOpenIndexes && final.defaultOpenIndexes.length > 0 
//         ? [final.defaultOpenIndexes[0]] 
//         : []);
//     }
//   }, [final.defaultOpenIndexes, final.allowMultiple]);

//   const toggleIndex = (index: number) => {
//     let newOpenIndexes: number[] = [];
    
//     if (final.allowMultiple) {
//       if (openIndexes.includes(index)) {
//         newOpenIndexes = openIndexes.filter((i) => i !== index);
//       } else {
//         newOpenIndexes = [...openIndexes, index];
//       }
//     } else {
//       newOpenIndexes = openIndexes.includes(index) ? [] : [index];
//     }
    
//     setOpenIndexes(newOpenIndexes);
    
//     // Call callback if provided
//     if (final.onItemToggle) {
//       final.onItemToggle(index, !openIndexes.includes(index));
//     }
//   };

//   const getContainerClasses = (): string => {
//     const classes = ['accordion'];
    
//     if (final.className) {
//       classes.push(final.className);
//     }
    
//     if (final.funcss) {
//       classes.push(final.funcss);
//     }
    
//     return classes.filter(Boolean).join(' ');
//   };

//   const getContainerStyles = (): React.CSSProperties => {
//     const styles: React.CSSProperties = {};
    
//     if (final.margin) {
//       const marginValue = getSpacingValue(final.margin);
//       if (marginValue) {
//         styles.margin = marginValue;
//       }
//     }
    
//     if (final.style) {
//       Object.assign(styles, final.style);
//     }
    
//     return styles;
//   };

//   const getSpacingValue = (value?: string): string => {
//     if (!value) return '';
    
//     if (/^\d+$/.test(value)) {
//       return `${parseInt(value) * 0.25}rem`;
//     }
    
//     return value;
//   };

//   if (itemsArray.length === 0) {
//     return null;
//   }

//   return (
//     <div 
//       className={getContainerClasses()}
//       style={getContainerStyles()}
//     >
//       {itemsArray.map((item, index) => (
//         <AccordionItem
//           key={index}
//           item={item}
//           index={index}
//           isOpen={openIndexes.includes(index)}
//           onToggle={toggleIndex}
//           globalProps={final}
//           animationDuration={final.animationDuration}
//           animationEasing={final.animationEasing}
//         />
//       ))}
//     </div>
//   );
// };

// export default Accordion;
// export type { AccordionItemType, AccordionProps };

// 'use client';
// import React, { useState } from 'react';
// import { PiCaretDown } from 'react-icons/pi';
// import RowFlex from '../specials/RowFlex';

// export type AccordionItemProps = {
//   title: string;
//   content: React.ReactNode;
//   isOpen?: boolean;
//   onToggle?: () => void;
//   index?: number;
//   icon?: React.ReactNode;

//   // Customization
//   itemClass?: string;
//   titleClass?: string;
//   iconClass?: string;
//   contentClass?: string;
//   activeClass?: string;
// };

// export const AccordionItem: React.FC<AccordionItemProps> = ({
//   icon,
//   title,
//   content,
//   isOpen,
//   onToggle,
//   itemClass = '',
//   titleClass = '',
//   iconClass = '',
//   contentClass = '',
//   activeClass = '',
// }) => {
//   return (
//     <div className={`accordion-item ${itemClass} ${isOpen ? activeClass : ''}`}>
//       <div
//         className={`accordion-header ${titleClass}`}
//         onClick={onToggle}
//         role="button"
//         aria-expanded={isOpen}
//       >
//         <RowFlex alignItems="center" gap={0.6}>
//           {icon && <div style={{ lineHeight: 0 }}>{icon}</div>}
//           <div className="col fit">{title}</div>
//         </RowFlex>
//         <div
//           style={{ lineHeight: 0 }}
//           className={`${iconClass} ${isOpen ? 'accordion-rotated' : ''}`}
//         >
//           <PiCaretDown />
//         </div>
//       </div>
//       <div  style={{overflow:isOpen?'visible':'hidden'}} className={`accordion-content ${contentClass} ${isOpen ? 'open' : ''}`}>
//         <div className="accordion-inner">{content}</div>
//       </div>
//     </div>
//   );
// };

// export type AccordionProps = {
//   items: {
//     title: string;
//     content: React.ReactNode;
//     icon?: React.ReactNode;
//   }[];
//   allowMultiple?: boolean;
//   defaultOpenIndexes?: number[];

//   // Custom styles
//   itemClass?: string;
//   titleClass?: string;
//   iconClass?: string;
//   contentClass?: string;
//   activeClass?: string;

//   funcss?: string;

// };

// const Accordion: React.FC<AccordionProps> = ({  
//   items,
//   allowMultiple = false,
//   defaultOpenIndexes = [],
//   itemClass,
//   titleClass,
//   iconClass,
//   contentClass,
//   activeClass,
//   funcss = '',
// }) => {
//   const [openIndexes, setOpenIndexes] = useState<number[]>(
//     allowMultiple ? defaultOpenIndexes : [defaultOpenIndexes[0] ?? -1]
//   );

//   const toggleIndex = (index: number) => {
//     if (allowMultiple) {
//       if (openIndexes.includes(index)) {
//         setOpenIndexes(openIndexes.filter((i) => i !== index));
//       } else {
//         setOpenIndexes([...openIndexes, index]);
//       }
//     } else {
//       setOpenIndexes(openIndexes.includes(index) ? [] : [index]);
//     }
//   };

//   return (
//     <div className={`accordion ${funcss}`}>
//       {items.map((item, index) => (
//         <AccordionItem
//           key={index}
//           index={index}
//           icon={item.icon}
//           title={item.title}
//           content={item.content}
//           isOpen={openIndexes.includes(index)}
//           onToggle={() => toggleIndex(index)}
//           itemClass={itemClass}
//           titleClass={titleClass}
//           iconClass={iconClass}
//           contentClass={contentClass}
//           activeClass={activeClass}
//         />
//       ))}
//     </div>
//   );
// };

// export default Accordion;
